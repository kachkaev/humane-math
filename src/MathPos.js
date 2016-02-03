/**
 * Creates an object, that saves the position of a token/tree
 * node/error/warning, etc.
 * 
 * @param {Object}
 *        col Position — Column
 * @param {Object}
 *        row Position — Row
 * @param {Object}
 *        pos Absolute Position.
 * @param {Object}
 *        len Length of an object.
 */
function MathPos(col, row, pos, length) {
    this.col = col;
    this.row = row;
    this.pos = pos;
    this.len = length;
};

MathPos.prototype = {};

/**
 * Creates a new MathPos object which contains the whole range of characters
 * from the beginning of mathPos1 to the end of mathPos2.
 * 
 * @param {Object}
 *        mathPos1
 * @param {Object}
 *        mathPos2
 * @return {MathPos} new MathPos object.
 */
MathPos.unite = function(mathPos1, mathPos2) {
    return new MathPos(mathPos1.col, mathPos1.row, mathPos1.pos, mathPos2.len
            + mathPos2.pos - mathPos1.pos);
};

/**
 * Creates a new MathPos object which contains the range of characters between
 * end of mathPos1 to the beginning of mathPos2.
 * 
 * @param {Object}
 *        mathPos1
 * @param {Object}
 *        mathPos2
 * @return {MathPos} new MathPos object.
 */
MathPos.between = function(mathPos1, mathPos2) {
    return new MathPos(mathPos1.col + mathPos1.len, mathPos1.row, mathPos1.pos
            + mathPos1.len, mathPos2.pos - mathPos1.pos - mathPos1.len);
};

/**
 * Creates a new MathPos object with zero length at the beginning of mathPos.
 * 
 * @param {Object}
 *        mathPos
 * @return {MathPos} new MathPos object.
 */
MathPos.beginning = function(mathPos) {
    return new MathPos(mathPos.col, mathPos.row, mathPos.pos, 0);
};
/**
 * Creates a new MathPos object with zero length at the ending of mathPos.
 * 
 * @param {Object}
 *        mathPos
 * @return {MathPos} new MathPos object.
 */
MathPos.ending = function(mathPos) {
    return new MathPos(mathPos.col + mathPos.len, mathPos.row, mathPos.pos
            + mathPos.len, 0);
};

/**
 * Avoids token streams to be converted to JSON by json2 lib
 */
MathPos.prototype.toJSON = function() {
    return null;
};