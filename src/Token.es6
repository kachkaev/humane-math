/**
 * Creates a single token for use in the MathTokenStream
 * 
 * @param {Object}
 *        type Type of a token
 * @param {Object}
 *        col Position — Column
 * @param {Object}
 *        row Position — Row
 * @param {Object}
 *        pos Absolute Position.
 * @param {Object}
 *        raw Raw (unchanged) data
 * @param {Object}
 *        value (optional) Value (calculated data) for some token types.
 * @constructor
 */
function MathToken(type, col, row, pos, raw, value) {
    this.type = type;
    if (!_.isUndefined(raw)) {
        this.pos = new MathPos(col, row, pos, raw.length);
        this.raw = raw;
    }
    if (!_.isUndefined(value))
        this.value = value;
};

MathToken.prototype = {};

/**
 * Returns a string digest of a token. This can be useful when calculating hash
 * of a TokenStream.
 */
MathToken.prototype.getHash = function() {
    return "" + this.type + "|" + this.pos.pos + "|" + this.pos.row + "|"
            + (_.isUndefined(this.value) ? '' : this.value) + "$";
};

/**
 * Returns true if requested token corresponds to an end of an input string.
 */
MathToken.prototype.isEOF = function() {
    return this.type == MathTokenType.EOF;
};

/**
 * Returns true if requested token is an error token.
 */
MathToken.prototype.isErrorToken = function() {
    return this.type >= MathTokenType.E_UNKNOWN;
};

/**
 * Checks if a token is a left bracket
 */
MathToken.prototype.isLeftBracket = function() {
    return this.type == MathTokenType.RB_LEFT
            || this.type == MathTokenType.E_SB_LEFT
            || this.type == MathTokenType.E_CB_LEFT
            || this.type == MathTokenType.E_AB_LEFT;
};

/**
 * Checks if a token is a right bracket
 */
MathToken.prototype.isRightBracket = function() {
    return this.type == MathTokenType.RB_RIGHT
            || this.type == MathTokenType.E_SB_RIGHT
            || this.type == MathTokenType.E_CB_RIGHT
            || this.type == MathTokenType.E_AB_RIGHT;
};

/**
 * Checks if a token is a number
 */
MathToken.prototype.isNumber = function() {
    return this.type == MathTokenType.NUMBER
            || this.type == MathTokenType.E_NUMBER_MALFORMED
            || this.type == MathTokenType.E_NUMBER_EXPONENTIAL;
};

/**
 * Checks if a token is a symbol
 */
MathToken.prototype.isSymbol = function() {
    return this.type == MathTokenType.SYMBOL;
};

/**
 * Checks if a token is a power sign (^ or **)
 */
MathToken.prototype.isPowerSign = function() {
    return this.type == MathTokenType.POWER
            || this.type == MathTokenType.E_STARSTAR;
};

/**
 * Checks if a token is a term sign (MULTIPLY or DIVIDE)
 */
MathToken.prototype.isTermSign = function() {
    return this.type == MathTokenType.MULTIPLY
            || this.type == MathTokenType.DIVIDE
            || this.type == MathTokenType.E_MISPLACED_DOT
            || this.type == MathTokenType.E_BACK_SLASH;
};

/**
 * Checks if a token is a mathematical operator (any of those that are used in
 * parsing expressions, terms and powers).
 */
MathToken.prototype.isMathOperator = function() {
    return this.isExpressionSign() || this.isTermSign() || this.isPowerSign();
};

/**
 * Checks if a token is an expression sign (ADD or SUBTRACT)
 */
MathToken.prototype.isExpressionSign = function() {
    return this.type == MathTokenType.ADD
            || this.type == MathTokenType.SUBTRACT;
};

/**
 * Checks if a token is an statemnet sign
 * (EQUAL|LESS|MORE|MORE_EQUAL|LESS_EQUAL)
 */
MathToken.prototype.isStatementSign = function() {
    return this.type == MathTokenType.EQUAL || this.type == MathTokenType.LESS
            || this.type == MathTokenType.MORE
            || this.type == MathTokenType.MORE_EQUAL
            || this.type == MathTokenType.LESS_EQUAL
            || this.type == MathTokenType.E_EQUALEQUAL;
};

/**
 * Makes a shallow copy of a token object with the type, changed to the correct
 * one in case it is an special error token. This is useful for passing data to
 * Lang.str function in order to simplify language files.
 * 
 * @example E_NUMBER_MALFORMED changes to NUMBER.
 */
MathToken.prototype.cloneWithCorrectedType = function() {
    var clone = _.clone(this);

    // Substitution of a type for error tokens
    if (clone.isErrorToken()) {
        if (clone.isRightBracket())
            clone.type = MathTokenType.RB_LEFT;
        else if (clone.isLeftBracket())
            clone.type = MathTokenType.LB_LEFT;
        else if (clone.isNumber())
            clone.type = MathTokenType.NUMBER;
        else if (clone.isPowerSign())
            clone.type = MathTokenType.POWER;
    }

    return clone;
};

/**
 * Avoids tokens to be fully converted to JSON by json2 lib
 */
MathToken.prototype.toJSON = function() {
    return this.type;
};
