/**
 * Types of nodes in a syntax tree
 */
export class TreeNodeType {

    static EMPTY = 0;

    static SEQUENCE_OF_STATEMENTS = 1;
    static STATEMENT = 2;
    static EXPRESSION = 3;
    static TERM = 4;
    static POWER = 5;
    static SYMBOL = 6;
    static NUMBER = 7;
    static FUNCTION = 8;

    // Symbol sub-types (detected during semantic analysis).
    static STANDARD_CONSTANT = 32;
    static STANDARD_VARIABLE = 33;
    static STANDARD_FUNCTION = 34;

    // These are statement sub-types (detected during lexical analysis)
    // static STATEMENT_DEFINITION_VARIABLE = 64
    // static STATEMENT_DEFINITION_FUNCTION = 65;
    static STATEMENT_EQUATION = 66;
    static STATEMENT_INEQUALITY = 67;

    static E_UNPARSED = 128;
}
