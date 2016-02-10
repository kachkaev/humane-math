import _ from 'underscore';
import {Position} from '../position';

export class Token {

  // Acceptable tokens
  static TYPE_EOF = 1; // end of string
  static TYPE_RB_LEFT = 2; // (
  static TYPE_RB_RIGHT = 3; // )
  static TYPE_COMMA = 4;
  static TYPE_EQUAL = 11;
  static TYPE_LESS = 12;
  static TYPE_MORE = 13;
  static TYPE_LESS_EQUAL = 14;
  static TYPE_MORE_EQUAL = 15;
  static TYPE_ADD = 21;
  static TYPE_SUBTRACT = 22;
  static TYPE_MULTIPLY = 23;
  static TYPE_DIVIDE = 24;
  static TYPE_POWER = 25;
  static TYPE_NUMBER = 31;
  static TYPE_SYMBOL = 32;
  static TYPE_SEMICOLON = 33;

  // Tokens that point to an error
  static TYPE_E_UNKNOWN = 128;            // Unknown sequence of symbols (undefined error)
  static TYPE_E_NUMBER_MALFORMED = 129;   // Malformed number
  static TYPE_E_NUMBER_EXPONENTIAL = 130; // Number in exponential notation.
  static TYPE_E_VERTICAL_SLASH = 131;     // Attempt to use a vertical slash to get an absolute value
  static TYPE_E_STARSTAR = 132;           // Attempt to use ** for power instead of ^
  static TYPE_E_EQUALEQUAL = 133;         // Attempt to use == for power instead of =
  static TYPE_E_MISPLACED_DOT = 134;      // Misplaced dot (without a number)
  static TYPE_E_SB_LEFT = 140;            // Left square bracket
  static TYPE_E_SB_RIGHT = 141;           // Right square bracket
  static TYPE_E_CB_LEFT = 142;            // Right square bracket
  static TYPE_E_CB_RIGHT = 143;           // Right square bracket
  static TYPE_E_AB_LEFT = 144;            // Right angle bracket
  static TYPE_E_AB_RIGHT = 145;           // Right angle bracket
  static TYPE_E_BACK_SLASH = 146;         // Use of back slash instead of a regular slash

  // The rest of the input string that was not converted to tokens
  // (used when a stream contains more than MAX_TOKEN_COUNT)
  static TYPE_E_REST = 150;

  /**
   * Creates a single token for its later use inside HumaneMath.TokenStream.
   *
   * @param {number} type
   *        Type of the token, one of Token.TYPE_*
   * @param {int} row
   *        Horizontal position in original text, zero-based
   * @param {int} column
   *        Vertical position in original text, zero-based
   * @param {int} offset
   *        Absolute offset from the beginning of the original text, zero-based
   * @param {string} [text]
   *        Raw token text
   * @param {number|string} [value]
   *        Numeric value or a normalized name of a symbol
   *
   * @throws {string}
   *         When arguments are invalid.
   */
  constructor(type, row, column, offset, text, value) {
    if (!_.isNumber(type) || type < 0 || type > 150) {
      throw `Token type must be defined correctly, ${type} given. See Token.TYPE_*.`;
    }
    this.type = type;

    // text
    if (type === Token.TYPE_EOF) {
      if (!_.isUndefined(text)) {
        throw `Token text must be undefined for a token of TYPE_EOF, ${text} given.`;
      }
      this.text = '';
    } else {
      if (!_.isString(text)) {
        throw `Token text must be a string, ${text} given.`;
      }
      this.text = text;
    }

    // position
    this.position = new Position(row, column, offset, this.text.length);

    // value
    if (type === Token.TYPE_SYMBOL) {
      if (!_.isString(value)) {
        throw `Token value must be a string for a token of TYPE_SYMBOL, ${value} given.`;
      }
      this.value = value;
    } else if (type === Token.TYPE_NUMBER) {
      if (!_.isNumber(value)) {
        throw `Token value must be a number for a token of TYPE_NUMBER, ${value} given.`;
      }
      this.value = value;
    } else if (!_.isUndefined(value)) {
      throw `Token value must not be provided for any token type except TYPE_SYMBOL and TYPE_NUMBER, ${value} given.`;
    }
  }

  /**
   * Returns a string digest of the token. This can be useful
   * when calculating hash of a TokenStream.
   *
   * The hash does not include the text, but does include the value if present.
   *
   * @returns {string}
   */
  getHash() {
    if (_.isUndefined(this._cachedHash)) {
      var hashParts = [this.type, this.position.row, this.position.column, this.position.offset];
      if (!_.isUndefined(this.value)) {
        hashParts.push(this.value);
      }
      this._cachedHash = hashParts.join('|');
    }
    return this._cachedHash;
  }

  /**
   * Returns true if the token corresponds to an end of an input string.
   *
   * @returns {boolean}
   */
  isEOF() {
    return this.type == Token.TYPE_EOF;
  }

  /**
   * Returns true if requested token is an error token.
   *
   * @returns {boolean}
   */
  isErrorToken() {
    return this.type >= Token.TYPE_E_UNKNOWN;
  }

  /**
   * Checks if a token is a left bracket of any kind
   *
   * @returns {boolean}
   */
  isLeftBracket() {
    return this.type == Token.TYPE_RB_LEFT
        || this.type == Token.TYPE_E_SB_LEFT
        || this.type == Token.TYPE_E_CB_LEFT
        || this.type == Token.TYPE_E_AB_LEFT;
  }

  /**
   * Checks if a token is a right bracket of any kind
   *
   * @returns {boolean}
   */
  isRightBracket() {
    return this.type == Token.TYPE_RB_RIGHT
        || this.type == Token.TYPE_E_SB_RIGHT
        || this.type == Token.TYPE_E_CB_RIGHT
        || this.type == Token.TYPE_E_AB_RIGHT;
  }

  /**
   * Checks if a token is numeric
   *
   * @returns {boolean}
   */
  isNumber() {
    return this.type == Token.TYPE_NUMBER
        || this.type == Token.TYPE_E_NUMBER_MALFORMED
        || this.type == Token.TYPE_E_NUMBER_EXPONENTIAL;
  }

  /**
   * Checks if a token is a symbol
   *
   * @returns {boolean}
   */
  isSymbol() {
    return this.type == Token.TYPE_SYMBOL;
  }

  /**
   * Checks if a token is a power sign (^ or **)
   *
   * @returns {boolean}
   */
  isPowerSign() {
    return this.type == Token.TYPE_POWER
        || this.type == Token.TYPE_E_STARSTAR;
  }

  /**
   * Checks if a token is a term sign (MULTIPLY or DIVIDE)
   *
   * @returns {boolean}
   */
  isTermSign() {
    return this.type == Token.TYPE_MULTIPLY
        || this.type == Token.TYPE_DIVIDE
        || this.type == Token.TYPE_E_MISPLACED_DOT
        || this.type == Token.TYPE_E_BACK_SLASH;
  }

  /**
   * Checks if a token is a mathematical operator
   * (any of those that are used in parsing expressions, terms and powers).
   *
   * @returns {boolean}
   */
  isMathOperator() {
    return this.isExpressionSign() || this.isTermSign() || this.isPowerSign();
  }

  /**
   * Checks if a token is an expression sign (ADD or SUBTRACT)
   *
   * @returns {boolean}
   */
  isExpressionSign() {
    return this.type == Token.TYPE_ADD || this.type == Token.TYPE_SUBTRACT;
  }

  /**
   * Checks if a token is an statement sign
   * (EQUAL|LESS|MORE|MORE_EQUAL|LESS_EQUAL)
   *
   * @returns {boolean}
   */
  isStatementSign() {
    return this.type == Token.TYPE_EQUAL
      || this.type == Token.TYPE_LESS
      || this.type == Token.TYPE_MORE
      || this.type == Token.TYPE_MORE_EQUAL
      || this.type == Token.TYPE_LESS_EQUAL
      || this.type == Token.TYPE_E_EQUALEQUAL;
  }

  /**
   * Makes a shallow copy of a token object with the type changed to the correct
   * one in case it is an special error token. This is useful for passing data
   * to language templates in order to avoid the redundancy.
   *
   * @returns {boolean}
   *
   * @example E_NUMBER_MALFORMED changes to NUMBER
   */
  cloneWithCorrectedType() {
    var result = new Token();
    _.extend(result, _.map(this, _.clone));

    // Substitution of a type for error tokens
    if (result.isErrorToken()) {
      if (result.isRightBracket()) {
        result.type = Token.TYPE_RB_LEFT;
      } else if (result.isLeftBracket()) {
        result.type = Token.TYPE_LB_LEFT;
      } else if (result.isNumber()) {
        result.type = Token.TYPE_NUMBER;
      } else if (result.isPowerSign()) {
        result.type = Token.TYPE_POWER;
      }
    }

    return result;
  }
}
