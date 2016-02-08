import {
  Pos,
  TokenType
} from 'humane-math';

export class Token {
  /**
   * Creates a single token for use in the MathTokenStream
   *
   * @param {number} type
   *    Type of a token
   * @param {number} col
   *    Position — Column
   * @param {number} row
   *    Position — Row
   * @param {number} pos
   *    Absolute Position
   * @param {string} raw
   *    Raw (unchanged) data
   * @param {Numeric} value
   *    (Optional) Value (calculated data) for some token types
   */
  constructor (type, col, row, pos, raw, value) {
    this.type = type;
    if (!_.isUndefined(raw)) {
      this.pos = new Pos(col, row, pos, raw.length);
      this.raw = raw;
    }
    if (!_.isUndefined(value)) {
      this.value = value;
    }
  }

  /**
   * Returns a string digest of a token. This can be useful when calculating hash of a TokenStream.
   *
   * @returns {string}
   */
  getHash() {
    return `${this.type}|${this.pos.pos}|${this.pos.row}|${(_.isUndefined(this.value) ? '' : this.value)}$`;
  }

  /**
   * Returns true if the token corresponds to an end of an input string.
   *
   * @returns {boolean}
   */
  isEOF() {
    return this.type == TokenType.EOF;
  }

  /**
   * Returns true if requested token is an error token.
   *
   * @returns {boolean}
   */
  isErrorToken() {
    return this.type >= TokenType.E_UNKNOWN;
  }

  /**
   * Checks if a token is a left bracket of any kind
   *
   * @returns {boolean}
   */
  isLeftBracket() {
    return this.type == TokenType.RB_LEFT
        || this.type == TokenType.E_SB_LEFT
        || this.type == TokenType.E_CB_LEFT
        || this.type == TokenType.E_AB_LEFT;
  }

  /**
   * Checks if a token is a right bracket of any kind
   *
   * @returns {boolean}
   */
  isRightBracket() {
    return this.type == TokenType.RB_RIGHT
        || this.type == TokenType.E_SB_RIGHT
        || this.type == TokenType.E_CB_RIGHT
        || this.type == TokenType.E_AB_RIGHT;
  }

  /**
   * Checks if a token is numeric
   *
   * @returns {boolean}
   */
  isNumber() {
    return this.type == TokenType.NUMBER
        || this.type == TokenType.E_NUMBER_MALFORMED
        || this.type == TokenType.E_NUMBER_EXPONENTIAL;
  }

  /**
   * Checks if a token is a symbol
   *
   * @returns {boolean}
   */
  isSymbol() {
    return this.type == TokenType.SYMBOL;
  }

  /**
   * Checks if a token is a power sign (^ or **)
   *
   * @returns {boolean}
   */
  isPowerSign() {
    return this.type == TokenType.POWER
        || this.type == TokenType.E_STARSTAR;
  }

  /**
   * Checks if a token is a term sign (MULTIPLY or DIVIDE)
   *
   * @returns {boolean}
   */
  isTermSign() {
    return this.type == TokenType.MULTIPLY
        || this.type == TokenType.DIVIDE
        || this.type == TokenType.E_MISPLACED_DOT
        || this.type == TokenType.E_BACK_SLASH;
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
    return this.type == TokenType.ADD || this.type == TokenType.SUBTRACT;
  }

  /**
   * Checks if a token is an statement sign
   * (EQUAL|LESS|MORE|MORE_EQUAL|LESS_EQUAL)
   *
   * @returns {boolean}
   */
  isStatementSign() {
    return this.type == TokenType.EQUAL
      || this.type == TokenType.LESS
      || this.type == TokenType.MORE
      || this.type == TokenType.MORE_EQUAL
      || this.type == TokenType.LESS_EQUAL
      || this.type == TokenType.E_EQUALEQUAL;
  }

  /**
   * Makes a shallow copy of a token object with the type changed to the correct
   * one in case it is an special error token. This is useful for passing data to
   * language templates in order to avoid redundancy in them.
   *
   * @returns {boolean}
   *
   * @example E_NUMBER_MALFORMED changes to NUMBER
   */
  cloneWithCorrectedType() {
    var clone = _.clone(this);

    // Substitution of a type for error tokens
    if (clone.isErrorToken()) {
      if (clone.isRightBracket()) {
        clone.type = TokenType.RB_LEFT;
      } else if (clone.isLeftBracket()) {
        clone.type = TokenType.LB_LEFT;
      } else if (clone.isNumber()) {
        clone.type = TokenType.NUMBER;
      } else if (clone.isPowerSign()) {
        clone.type = TokenType.POWER;
      }
    }

    return clone;
  }
}
