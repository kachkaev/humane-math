/**
 * Token types
 */
export class TokenType {

  // Acceptable tokens
  static EOF = 0; // end of string
  static RB_LEFT = 1; // (
  static RB_RIGHT = 2; // )
  static COMMA = 3;
  static EQUAL = 11;
  static LESS = 12;
  static MORE = 13;
  static LESS_EQUAL = 14;
  static MORE_EQUAL = 15;
  static ADD = 21;
  static SUBTRACT = 22;
  static MULTIPLY = 23;
  static DIVIDE = 24;
  static POWER = 25;
  static NUMBER = 31;
  static SYMBOL = 32;
  static SEMICOLON = 33;

  // Tokens that point to an error
  static E_UNKNOWN = 128; // Unknown sequence of symbols (undefined error)
  static E_NUMBER_MALFORMED = 129; // Malformed number
  static E_NUMBER_EXPONENTIAL = 130; // Number in exponential notation.
  static E_VERTICAL_SLASH = 131; // Attempt to use a vertical slash to get an absolute value
  static E_STARSTAR = 132; // Attempt to use ** for power instead of ^
  static E_EQUALEQUAL = 133; // Attempt to use == for power instead of =
  static E_MISPLACED_DOT = 134; // Misplaced dot (without a number)
  static E_SB_LEFT = 140; // Left square bracket
  static E_SB_RIGHT = 141; // Right square bracket
  static E_CB_LEFT = 142; // Right square bracket
  static E_CB_RIGHT = 143; // Right square bracket
  static E_AB_LEFT = 144; // Right angle bracket
  static E_AB_RIGHT = 145; // Right angle bracket
  static E_BACK_SLASH = 146; // Use of back slash instead of a regular slash
  static E_REST = 150; // The rest of the input string that was not converted to tokens (used when a stream contains more than MAX_TOKEN_COUNT)
}
