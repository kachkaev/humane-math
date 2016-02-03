/**
 * Token types
 */
function MathTokenType() {
}

// Correct Tokens
MathTokenType.EOF = 0; // end of string
MathTokenType.RB_LEFT = 1; // (
MathTokenType.RB_RIGHT = 2; // )
MathTokenType.COMMA = 3;
MathTokenType.EQUAL = 11;
MathTokenType.LESS = 12;
MathTokenType.MORE = 13;
MathTokenType.LESS_EQUAL = 14;
MathTokenType.MORE_EQUAL = 15;
MathTokenType.ADD = 21;
MathTokenType.SUBTRACT = 22;
MathTokenType.MULTIPLY = 23;
MathTokenType.DIVIDE = 24;
MathTokenType.POWER = 25;
MathTokenType.NUMBER = 31;
MathTokenType.SYMBOL = 32;
MathTokenType.SEMICOLON = 33;

// Tokens, pointing to an error
MathTokenType.E_UNKNOWN = 128; // Unknown sequence of symbols (undefined error)
MathTokenType.E_NUMBER_MALFORMED = 129; // Malformed number
MathTokenType.E_NUMBER_EXPONENTIAL = 130; // Number in exponential notation.
MathTokenType.E_VERTICAL_SLASH = 131; // Attempt to use a vertical slash to
// get an absolute value
MathTokenType.E_STARSTAR = 132; // Attempt to use ** for power instead of ^
MathTokenType.E_EQUALEQUAL = 133; // Attempt to use == for power instead of =
MathTokenType.E_MISPLACED_DOT = 134; // Misplaced dot (without a number)
MathTokenType.E_SB_LEFT = 140; // Left square bracket
MathTokenType.E_SB_RIGHT = 141; // Right square bracket
MathTokenType.E_CB_LEFT = 142; // Right square bracket
MathTokenType.E_CB_RIGHT = 143; // Right square bracket
MathTokenType.E_AB_LEFT = 144; // Right angle bracket
MathTokenType.E_AB_RIGHT = 145; // Right angle bracket
MathTokenType.E_BACK_SLASH = 146; // Use of back slash instead of regular a
// slash
MathTokenType.E_REST = 150; // The rest of the input string that was not
// tokenized (used when stream contains more than
// MAX_TOKEN_COUNT).

/**
 * Returns a “name of a type” (used for debug)
 * 
 * @param {Object}
 *        type
 */
MathTokenType.getAsString = function(type) {
    for ( var k in MathTokenType) {
        if (MathTokenType[k] == type)
            return k;
    }

    return "";
};