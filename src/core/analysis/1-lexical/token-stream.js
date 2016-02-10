import _ from 'underscore';
import {MessageList} from '../message-list';
import {Token}       from './token';

/**
 * Converts an input stream into tokens
 */
export class TokenStream {

  constructor(text) {
    this._text = text;
    this._tokens = [];
    this._messages = new MessageList();
    this._cursorIndex = 0;
    this._finalized = false;
  }

  /**
   * Adds token into the list of tokens.
   * Finalizes the TokenStream once TYPE_EOF is received.
   *
   * @param {Token} token
   *        Token to append
   */
  addToken(token) {
    this._assertNotFinalized();
    this._tokens.push(token);

    if (token.type == Token.TYPE_EOF) {
      this._finalized = true;
    }
    delete this._cacheHash;
  }

  /**
   * Calculates a unique string that describes the current state of the stream.
   *
   * @returns {string}
   */
  getHash() {
    if (_.isUndefined(this._cachedHash)) {
      var hash = [];
      for (var i = 0; i < this._tokens.length; ++i) {
        hash.push(this._tokens[i].getHash());
      }
      this._cachedHash = this._text + '||' + hash.implode('|');
    }
    return this._cachedHash;
  }

  /**
   * Returns a token by its index.
   *
   * @param {number} tokenIndex
   *    Position of a requested token.
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor index needs to be changed.
   *
   * @returns {Token}
   *
   * @throws {string}
   *         When the token stream is not finalized.
   * @throws {string}
   *         When index is out of bounds.
   */
  getToken(tokenIndex, moveCursor = false) {
    this._assertFinalized();
    let result = this._tokens[tokenIndex];

    if (!result) {
      throw `No token found at index ${tokenIndex}. Value should be between 0 and ${this._tokens.length - 1}.`;
    }
    if (moveCursor) {
      this._cursorIndex = tokenIndex;
    }
    return result;
  }

  /**
   * Returns the first token in the stream.
   *
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor index needs to be changed.
   *
   * @returns {Token}
   *
   * @throws {string}
   *         When the token stream is not finalized.
   * @throws {string}
   *         When index is out of bounds.
   */
  firstToken(moveCursor = false) {
    return this.getToken(0, moveCursor);
  }

  /**
   * Returns the last token of the stream (the one between TYPE_EOF).
   *
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor position needs to be changed.
   *
   * @returns {Token}
   *
   * @throws {string}
   *         When the token stream is not finalized.
   * @throws {string}
   *         When index is out of bounds.
   */
  lastToken(moveCursor = false) {
    return this.getToken(this.tokens.length - 2, moveCursor);
  }

  /**
   * Returns the previous token of the stream.
   *
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor position needs to be changed.
   *
   * @returns {Token}
   *
   * @throws {string}
   *         When the token stream is not finalized.
   * @throws {string}
   *         When index is out of bounds.
   */
  previousToken(moveCursor = false) {
    return this.getToken(this._cursorIndex - 1, moveCursor);
  }

  /**
   * Returns the next token of the stream.
   *
   * @param {boolean} [moveCursor=false]
   *    Set to true if cursor position needs to be changed.
   *
   * @returns {Token}
   *
   * @throws {string}
   *         When the token stream is not finalized.
   * @throws {string}
   *         When index is out of bounds.
   */
  nextToken(moveCursor = false) {
    return this.getToken(this._cursorIndex + 1, moveCursor);
  }

  /**
   * Returns current token of the stream.
   *
   * @returns {Token}
   */
  currentToken() {
    return this.getToken(this._cursorIndex);
  }

  /**
   * Searches for a token of the specific type (or types)
   * in the rest of the token stream (from cursor).
   *
   * @param {Array<int>} tokenTypes
   *        List of token types to be searched.
   * @param {boolean} [moveCursor=false]
   *        Set to true if cursor position needs to be changed upon success.
   *
   * @returns {?Token}
   *          Token or null if the search was not successful.
   */
  findNextToken(tokenTypes, moveCursor) {
    this._assertFinalized();

    for (var i = this._cursorIndex; i < this.tokens.length; ++i) {
      var currentToken = this.getToken(i);
      for (var j = 0; j < tokenTypes.length; ++j) {
        if (tokenTypes[j] == currentToken.type) {
          if (moveCursor) {
            this._cursorIndex = i;
          }
          return currentToken;
        }
      }
    }
    return null;
  }

  /**
   * Searches for a token of the specific type (or types)
   * in the rest of the token stream (from cursor)
   * with respect to opening / closing brackets.
   *
   * @param {Array<int>} tokenTypes
   *        List of token types to be searched.
   * @param {boolean} [moveCursor=false]
   *        Set to true if cursor position needs to be changed upon success.
   *
   * @returns {?Token}
   *          Token or null if the search was not successful.
   */
  findNextTokenAtTheSameLevel(tokenTypes, moveCursor) {
    this._assertFinalized();

    var level = 0;

    for (var i = this._cursorIndex; i < this.tokens.length; ++i) {
      if (level < 0) {
        return null;
      }
      if (currentToken.isLeftBracket()) {
        ++level;
      }
      var currentToken = this.getToken(i);

      if (level == 0) {
        for (var j = 0; j < tokenTypes.length; ++j) {
          if (tokenTypes[j] == currentToken.type) {
            if (moveCursor) {
              this._cursorIndex = i;
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

  _assertFinalized() {
    if (!this._finalized) {
      throw 'TokenStream must not be finalized yet';
    }
  }

  _assertNotFinalized() {
    if (this._finalized) {
      throw 'TokenStream must be finalized';
    }
  }
}
