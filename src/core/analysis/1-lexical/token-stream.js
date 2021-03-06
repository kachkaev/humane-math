import _ from 'underscore';
import ltrim from 'underscore.string/ltrim';
import rtrim from 'underscore.string/rtrim';
import {Message}     from '../message';
import {MessageList} from '../message-list';
import {Token}       from './token';
import {TokenType}   from './token-type';

/**
 * Converts an input stream into tokens
 */
export class TokenStream {

  // Maximum possible size of the token stream
  static MAX_TOKEN_COUNT = 500;

  // List of characters that should be interpreted as spaces
  static WHITESPACE = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
  static TOKEN_FOUND_EXCEPTION = 42;

  // Regular expressions used for converting text to tokens
  static RE_NUMBER = /^[0-9]+(\.[0-9]+)?/;
  static RE_SYMBOL = /^[a-zA-Zа-яА-ЯёЁα-ωΑ-Ω][_a-zA-Zа-яА-ЯёЁα-ωΑ-Ω0-9]*/;
  static RE_E_NUMBER_MALFORMED = /^(\.[0-9]+|[0-9]+(\.[0-9]+){2,}|([0-9]+\.([^0-9]|$)))/;
  static RE_E_NUMBER_EXPONENTIAL = /^[0-9]+(\.[0-9]+)?[EeЕе][+-]?[0-9]+/;

  constructor() {
    this.reset();
    this.errors = new MessageList();
  }

  /**
   * Calculates hash for the TokenStream to determine whether it was changed or not
   *
   * @memberOf TokenStream
   * @returns {string}
   */
  getHash() {
    var hash = '';
    for (var i = this.tokens.length - 1; i >= 0; i--) {
      hash = this.tokens[i].getHash() + hash;
    }
    return hash;
  }

  /**
   * Resets TokenStream object to default empty state
   */
  reset() {
    this.raw = null;
    this.tokens = [];
    this.cursorPos = 0;
  }

  /**
   * Skips spaces while converting text to tokens and recalculates the position of the cursor
   */
  skipSpaces() {
    for (var i = 0; i < this.temp.raw.length; i++) {
      if (this.temp.raw.charAt(i) == '\n') {
        this.temp.row++;
        this.temp.pos++;
        this.temp.col = 0;
      } else {
        if (TokenStream.WHITESPACE.indexOf(this.temp.raw.charAt(i)) === -1) {
          this.temp.raw = this.temp.raw.slice(i);
          break;
        }
        this.temp.col++;
        this.temp.pos++;
      }
    }
  }

  /**
   * Adds token into the list of tokens
   *
   * @param {number} type
   *    Type of a Token (among MathTokeType.*)
   * @param {number} length
   *    Length of a new token
   * @param {number} [value]
   *    Evaluated value of a token (for symbols and numbers).
   * @param {boolean} [dontThrowException]
   *    if is set to true, no TOKEN_FOUND_EXCEPTION is thrown.
   */
  addToken(type, length, value, dontThrowException) {
    this.tokens.push(new Token(
        type,
        this.temp.col,
        this.temp.row,
        this.temp.pos,
        this.temp.raw.slice(0, length), value)
      );
    this.temp.pos += length;
    this.temp.col += length;
    this.temp.raw = this.temp.raw.slice(length);
    if (!dontThrowException) {
      throw TokenStream.TOKEN_FOUND_EXCEPTION;
    }
  }

  /**
   *
   * @param {string} newRaw
   *    New raw string to be tokenized
   *
   * @returns {boolean}
   *      true if a stream of tokens has changed since the last function call
   */
  tokenize(newRaw) {
    // Basic check for changes
    if (newRaw === this.raw) {
      return false;
    }

    // Basic check failed – tokenize the string
    this.reset();
    this.raw = newRaw;

    // Initialize some temporary data needed while tokenizing
    this.temp = {};
    this.temp.raw = rtrim(newRaw);
    this.temp.pos = 0;
    this.temp.col = 0;
    this.temp.row = 0;

    // Extract tokens in a loop
    for (let i = TokenStream.MAX_TOKEN_COUNT; i >= 0; i--) {

      this.skipSpaces();

      // Exit if reached an end of the input string
      if (this.temp.raw == '') {
        break;
      }

      // Extract a token from the beginning of an input string.
      // #addToken throws TokenStream.TOKEN_FOUND_EXCEPTION.

      try {
        // Compound tokens part 1, see part 2 after all simple tokens
        // -- “less or equal” or “more or equal” (≤ and ≥ are below)
        if (this.temp.raw.charAt(0) == '<' || this.temp.raw.charAt(0) == '>') {
          let searchString = ltrim(this.temp.raw.slice(1));
          if (searchString.charAt(0) == '=') {
            this.addToken(
                (this.temp.raw.charAt(0) == '<')
                  ? TokenType.LESS_EQUAL
                  : TokenType.MORE_EQUAL,
                this.temp.raw.length - searchString.length + 1
              );
          }
        }
        // -- error: use of ==
        if (this.temp.raw.charAt(0) == '=') {
          let searchString = _.ltrim(this.temp.raw.slice(1));
          if (searchString.charAt(0) == '=') {
            this.addToken(
                TokenType.E_EQUALEQUAL,
                this.temp.raw.length - searchString.length + 1
              );
          }
        }

        // -- error: Use of ** for power instead of ^
        if (this.temp.raw.charAt(0) == '*') {
          let searchString = _.ltrim(this.temp.raw.slice(1));
          if (searchString.charAt(0) == '*') {
            this.addToken(
                TokenType.E_STARSTAR,
                this.temp.raw.length - searchString.length + 1
              );
          }
        }

        // simple tokens (1 character long)
        /* eslint-disable no-fallthrough */
        switch (this.temp.raw.charAt(0)) {
        // -- left bracket
        case '(':
          this.addToken(TokenType.RB_LEFT, 1);
        // -- right bracket
        case ')':
          this.addToken(TokenType.RB_RIGHT, 1);
        // -- comma
        case ',':
          this.addToken(TokenType.COMMA, 1);
        // -- semicolon
        case ';':
          this.addToken(TokenType.SEMICOLON, 1);
        // -- equal
        case '=':
          this.addToken(TokenType.EQUAL, 1);
        // -- less
        case '<':
          this.addToken(TokenType.LESS, 1);
        // -- more
        case '>':
          this.addToken(TokenType.MORE, 1);
        // -- less or equal
        case '≤':
          this.addToken(TokenType.LESS, 1);
        // -- more or equal
        case '≥':
          this.addToken(TokenType.MORE, 1);
        // -- add
        case '+':
          this.addToken(TokenType.ADD, 1);
        // -- subtract
        case '-':
        case '—':
        case '−':
        case '–':
        case '―':
          this.addToken(TokenType.SUBTRACT, 1);
        // -- multiply
        case '*':
        case '×':
        case '·':
          this.addToken(TokenType.MULTIPLY, 1);
        // -- divide
        case '/':
        case '÷':
          this.addToken(TokenType.DIVIDE, 1);
        // -- power
        case '^':
          this.addToken(TokenType.POWER, 1);
        // -- error: use of right square bracket
        case '[':
          this.addToken(TokenType.E_SB_LEFT, 1);
        // -- error: use of left square bracket
        case ']':
          this.addToken(TokenType.E_SB_RIGHT, 1);
        // -- error: use of right curly bracket
        case '{':
          this.addToken(TokenType.E_CB_LEFT, 1);
        // -- error: use of left curly bracket
        case '}':
          this.addToken(TokenType.E_CB_RIGHT, 1);
        // -- error: Use of right angle bracket
        case '⟨':
          this.addToken(TokenType.E_AB_LEFT, 1);
        // -- error: Use of left angle bracket
        case '⟩':
          this.addToken(TokenType.E_AB_RIGHT, 1);
        // -- error: use of a vertical slash to get an absolute value
        case '|':
          this.addToken(TokenType.E_VERTICAL_SLASH, 1);
        // -- error: use of a back slash to divide
        case '\\':
          this.addToken(TokenType.E_BACK_SLASH, 1);
        }
        /* eslint-enable */

        // compound tokens, part 2
        var match;

        // -- symbol
        match = this.temp.raw.match(TokenStream.RE_SYMBOL);
        if (match) {
          this.addToken(
              TokenType.SYMBOL,
              match[0].length,
              match[0].toLowerCase()
            );
        }

        // -- error: malformed number
        // (depending on output of regex match, length of the token is different)
        match = this.temp.raw.match(TokenStream.RE_E_NUMBER_MALFORMED);
        if (match && !_.isUndefined(match[4])) {
          if (!_.isUndefined(match[4]) && match[4].length > 0) {
            match[1] = match[1].slice(0, match[1].length - 1);
          }
          this.addToken(
              TokenType.E_NUMBER_MALFORMED,
              match[1].length,
              match[1].toLowerCase()
            );
        } else if (match) {
          this.addToken(
              TokenType.E_NUMBER_MALFORMED,
              match[0].length, match[0].toLowerCase()
            );
        }

        // -- error: a number in exponential notation
        match = this.temp.raw.match(TokenStream.RE_E_NUMBER_EXPONENTIAL);
        if (match) {
          this.addToken(
              TokenType.E_NUMBER_EXPONENTIAL,
              match[0].length,
              Number(match[0].replace(/[Ее]/, 'E')
            ));
        }

        // -- number
        match = this.temp.raw.match(TokenStream.RE_NUMBER);
        if (match) {
          this.addToken(
              TokenType.NUMBER,
              match[0].length,
              Number(match[0])
            );
        }

        // -- error: misplaced dot (period)
        if (this.temp.raw.charAt(0) == '.') {
          this.addToken(TokenType.E_MISPLACED_DOT, 1);
        }

        // all possible search was performed, but the token was not found
        // --> Unknown symbol
        this.addToken(TokenType.E_UNKNOWN, 1);

      } catch (e) {
        if (e != TokenStream.TOKEN_FOUND_EXCEPTION) {
          throw e;
        }
      }

      // check whether a search loop is stuck
      //TODO revise
      // if (i == 0) {
      //   Logger.log("Probably a never-ending loop during tokenizing.");
      // }
    }

    // check if the end of a sting has been reached
    // and add E_REST token if more characters remain
    if (this.temp.raw.length) {
      this.addToken(TokenType.E_REST, this.temp.raw.length, null, true);
    }

    // add last token (special EOF token)
    this.addToken(TokenType.EOF, 0, null, true);

    // delete temporary variable
    delete this.temp;

    // check for changes using hash
    var hash = this.getHash();
    if (hash == this.oldHash) {
      return false;
    }
    this.oldHash = hash;

    // form a list of errors
    this.errors.clear();

    for (let i = this.tokens.length - 1; i >= 0; i--) {
      if (this.tokens[i].isErrorToken()) {
        this.errors.add(new Message(
            'e_lex_' + this.tokens[i].type,
            this.tokens[i].pos,
            this.tokens[i]
          ));
      }
    }

    // Reaching this point means that token stream has been changed
    return true;
  }

  /**
   * Returns a specific token defined by its position or false if it cannot be obtained.
   *
   * @param {number} tokenPos
   *    Position of a requested token.
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor position needs to be changed.
   *
   * @returns {?Token}
   *      Token or null if the search was out of range.
   */
  getToken(tokenPos, moveCursor) {
    if (moveCursor) {
      this.cursorPos = tokenPos;
    }

    if (this.cursorPos >= this.tokens.length) {
      this.cursorPos = this.tokens.length - 1;
    }

    if (_.isUndefined(this.tokens[tokenPos])) {
      return null;
    }

    return this.tokens[tokenPos];
  }

  /**
   * Returns the first token of the stream.
   *
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor position needs to be changed.
   *
   * @returns {Token}
   *      Token or null if the search was out of range.
   */
  firstToken(moveCursor) {
    return this.getToken(0, moveCursor);
  }

  /**
   * Returns the last token of the stream.
   * IMPORTANT NOTICE: The “last” token is not the EOF token, but the token before it.
   *
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor position needs to be changed.
   *
   * @returns {Token}
   *      Token or null if the search was out of range.
   */
  lastToken(moveCursor) {
    return this.getToken(this.tokens.length - 2, moveCursor);
  }

  /**
   * Returns the previous token of the stream.
   *
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor position needs to be changed.
   *
   * @returns {Token}
   *      Token or null if the search was out of range.
   */
  previousToken(moveCursor) {
    return this.getToken(this.cursorPos - 1, moveCursor);
  }

  /**
   * Returns the next token of the stream.
   *
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor position needs to be changed.
   *
   * @returns {Token}
   *      Token or null if the search was out of range.
   */
  nextToken(moveCursor) {
    return this.getToken(this.cursorPos + 1, moveCursor);
  }

  /**
   * Returns current token of the stream.
   *
   * @returns {Token}
   */
  currentToken() {
    return this.getToken(this.cursorPos);
  }

  /**
   * Searches for a token of the specific type (or types)
   * in the rest of the token stream (from cursor).
   *
   * @param {Array} tokenTypes
   *    List of tokens to be searched.
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor position needs to be changed.
   *
   * @returns {?Token} Token or null if the search was out of range.
   */
  findNextToken(tokenTypes, moveCursor) {
    if (!_.isArray(tokenTypes)) {
      tokenTypes = [tokenTypes];
    }

    for (var i = this.cursorPos; i < this.tokens.length; i++) {
      var currentToken = this.getToken(i);
      for (var type in tokenTypes) {
        if (tokenTypes[type] == currentToken.type) {
          if (moveCursor) {
            this.cursorPos = i;
          }
          return currentToken;
        }
      }
    }
    return null;
  }

  /**
   * Searches for a token of the specific type (or types) in the rest
   * of the token stream (from cursor) with respect to opening / closing brackets.
   *
   * @param {Array} tokenTypes
   *    List of tokens to be searched.
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor position needs to be changed.
   *
   * @returns {?Token} Token or null if the search was out of range.
   */
  findNextTokenAtTheSameLevel(tokenTypes, moveCursor) {
    if (!_.isArray(tokenTypes)) {
      tokenTypes = [tokenTypes];
    }

    var level = 0;

    for (var i = this.cursorPos; i < this.tokens.length; i++) {
      if (level < 0) {
        return null;
      }

      var currentToken = this.getToken(i);

      if (currentToken.isLeftBracket()) {
        ++level;
      }

      if (level == 0) {
        for (var type in tokenTypes) {
          if (tokenTypes[type] == currentToken.type) {
            if (moveCursor) {
              this.cursorPos = i;
            }
            return currentToken;
          }
        }
      }

      if (currentToken.isRightBracket()) {
        --level;
      }
    }
    return null;
  }
}
