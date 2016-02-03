/**
 * Creates a single MathTreeNode for use in MathTree
 * @constructor
 */
function MathTreeNode() {
    this.type = MathTreeNodeType.EMPTY;
    this.brackets = false;
    this.hasErrors = false;
}

MathTreeNode.prototype = {};

/**
 * Checks if the node is empty.
 * 
 * @return {Boolean}
 */
MathTreeNode.prototype.isEmpty = function() {
    return this.type == MathTreeNodeType.EMPTY;
};

/**
 * Checks if the node is unparsed.
 * 
 * @return {Boolean}
 */
MathTreeNode.prototype.isUnparsed = function() {
    return this.type == MathTreeNodeType.UNPARSED;
};

/**
 * Avoids nodes with known values to be converted to JSON by json2 lib
 */
MathTreeNode.prototype.toJSON = function() {
    if (this.value !== undefined)
        return {
            value : this.value
        };
    return this;
};
