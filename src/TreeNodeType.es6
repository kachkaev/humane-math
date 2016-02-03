/**
 * Types of nodes in a syntax tree
 */
function MathTreeNodeType() {
}

MathTreeNodeType.EMPTY = 0;

MathTreeNodeType.SEQUENCE_OF_STATEMENTS = 1;
MathTreeNodeType.STATEMENT = 2;
MathTreeNodeType.EXPRESSION = 3;
MathTreeNodeType.TERM = 4;
MathTreeNodeType.POWER = 5;
MathTreeNodeType.SYMBOL = 6;
MathTreeNodeType.NUMBER = 7;
MathTreeNodeType.FUNCTION = 8;

// Symbol subtypes (detected during semantic analysis).
MathTreeNodeType.STANDARD_CONSTANT = 32;
MathTreeNodeType.STANDARD_VARIABLE = 33;
MathTreeNodeType.STANDARD_FUNCTION = 34;

// These are statement subtypes (detected during lexical analysis)
// MathTreeNodeType.STATEMENT_DEFINITION_VARIABLE = 64
// MathTreeNodeType.STATEMENT_DEFINITION_FUNCTION = 65;
MathTreeNodeType.STATEMENT_EQUATION = 66;
MathTreeNodeType.STATEMENT_INEQUALITY = 67;

MathTreeNodeType.E_UNPARSED = 128;

/**
 * Returns a “name of a type” (used for debug)
 * 
 * @param {Object}
 *        type
 */
MathTreeNodeType.getAsString = function(type) {
    for ( var k in MathTreeNodeType) {
        if (MathTreeNodeType[k] == type)
            return k;
    }
    return "";
};
