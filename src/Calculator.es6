/**
 * @classDescription Math Calculator can be used for calculating node values. It
 *                   is also helpful to calculate values for some nodes in a
 *                   tree in order to make further calculations faster. It does
 *                   not simplify a tree or make any other changes to it except
 *                   adding or removing “value” node property. Generally
 *                   speaking, MathCalculator is “static class” that implements
 *                   a Visitor pattern).
 * @type             MathCalculator
 * @memberOf         __MathCalculator
 */
var MathCalculator = (/** @constructor */function() {
    /**
     * This inner use exception is to be thrown anytime a calculation of subnodes
     * fails. It is caught by a caller function and NaN is returned. Such approach
     * is made to increase the speed of the calculator and avoid performing useless
     * computations.
     *
     * @memberOf __MathCalculator
     */
    var COULD_NOT_CALCULATE_EXCEPTION = 13;

    return {
        /**
         * Recursively calculates values for all nodes starting at “treeNode” where it
         * is possible and stores the result at node.value. This can be useful for
         * increasing the speed of further calculations.
         *
         * @memberOf MathCalculator
         *
         * @param {MathTreeNode} expressionNode
         *        A MathTreeNode to be calculated. Can be any type of
         *        node.
         *
         * @param {Object} variables
         *        Variables passed.
         *
         * @param {Object} userSymbols
         *        Set of user constants and functions. Not in use now.
         *
         * @return {Number} Value of the expression or NaN if calculation failed.
         */
        calculateExpression: function(expressionNode, variables,
                userSymbols) {
            if (expressionNode instanceof MathObject)
                expressionNode = expressionNode.tree.root;

            if (!variables)
                variables = {};

            var result = Number.NaN;
            try {
                result = MathCalculator.calculateValueOfTheNode(expressionNode,
                        variables, userSymbols);
            } catch (e) {
                if (e != COULD_NOT_CALCULATE_EXCEPTION)
                    throw e;
            }
            ;
            return result;
        },

        /**
         * Checks whether the given inequality is true. (Not implemented yet)
         *
         * @param {Object}
         *        inequalityNode
         * @param {Object}
         *        variables
         * @param {Object}
         *        userSymbols
         */
        checkInequality: function(inequalityNode, variables,
                userSymbols) {
        },

        /**
         * Recursively calculates values for all nodes starting at “treeNode” where it
         * is possible and stores the result at node.value. This can be useful for
         * increasing the speed of further calculations.
         *
         * @param {MathTreeNode}
         *        treeNode A MathTreeNode to be calculated. Can be any type of node.
         * @param {Object}
         *        variables Variables passed.
         * @param {Object}
         *        userSymbols Set of user constants and functions. Not in use now.
         * @return null
         */
        calculateCachedValues: function(treeNode, variables,
                userSymbols) {
            if (treeNode instanceof MathObject)
                treeNode = treeNode.tree.root;

            if (!variables)
                variables = {};

            try {
                MathCalculator.calculateValueOfTheNode(treeNode, variables,
                        userSymbols, true);
            } catch (e) {
                if (e != COULD_NOT_CALCULATE_EXCEPTION)
                    throw e;
            };
        },

        /**
         * Removes all cashed values of the nodes. For instance, if a node contained
         * (pi-3) and its value was equal to 0.14, its value becomes undefined.
         *
         * @param {Object}
         *        treeNode
         */
        clearCashedValues: function(treeNode) {
            if (treeNode instanceof MathObject)
                treeNode = treeNode.tree.root;

            // Recursively clearing child nodes.
            if (treeNode.subNodes)
                for ( var i = treeNode.subNodes.length - 1; i >= 0; i--) {
                    MathCalculator.clearCashedValues(treeNode.subNodes[i]);
                };

            // Deleting a value of the current node in case it is not a number.
            if (treeNode.type != MathTreeNodeType.NUMBER)
                delete treeNode.value;
        },

        /**
         * Calculates the value of a node and depending on the mode returns it or saves
         * as the node “value” property.
         *
         * @param {MathTreeNode}
         *        treeNode A MathTreeNode to be calculated. Can be any type of node.
         * @param {Object}
         *        variables Variables passed.
         * @param {Object}
         *        userSymbols Set of user constants and functions. Not in use now.
         * @param {Boolean}
         *        calculateCacheMode If true, the result of the function will be saved
         *        as the node “value” property.
         */
        calculateValueOfTheNode: function(treeNode, variables,
                userSymbols, calculateCacheMode) {
            // // Do nothing if the value is already calculated or this node is a number
            // (it has already got a value).
            // if ((treeNode.value !== null && !calculateCacheMode) || treeNode.type ==
            // MathTreeNodeType.NUMBER)
            // Do nothing if a value is already known, just return it.
            if (treeNode.value !== undefined)
                return treeNode.value;

            // The result is meaningless by default.
            var result = null;

            // All values of subnodes must be kept in a separate array to be then passed
            // to an executor function or processed.
            var subNodesValues = new Array();

            // Detects if the function must return NaN if any of subnodes contains NaN
            var failOnSubNodeNaN = true;
            // If is a special case. No need to return NaN if any of the arguments is
            // NaN.
            if (treeNode.type == MathTreeNodeType.FUNCTION
                    && MathStandardSymbols.functions[treeNode.id]
                    && MathStandardSymbols.functions[treeNode.id].calculateForNaNs)
                failOnSubNodeNaN = false;

            // Calculating values for all children subnodes if there are any.
            if (treeNode.subNodes) {
                for ( var i = treeNode.subNodes.length - 1; i >= 0; i--) {
                    // Trying to get the value of a subnode and saving it.
                    if (treeNode.subNodes[i].value === undefined)
                        // If failOnSubNodeNaN is false, calculations are made in
                        // try/catch block to avoid lazy finish in case of a NaN.
                        if (!failOnSubNodeNaN) {
                            try {
                                subNodesValues[i] = MathCalculator
                                        .calculateValueOfTheNode(treeNode.subNodes[i],
                                                variables, userSymbols,
                                                calculateCacheMode);
                            } catch (e) {
                                if (e != COULD_NOT_CALCULATE_EXCEPTION)
                                    throw e;
                            }
                            ;
                        } else {
                            subNodesValues[i] = MathCalculator.calculateValueOfTheNode(
                                    treeNode.subNodes[i], variables, userSymbols,
                                    calculateCacheMode);
                        }
                    else
                        subNodesValues[i] = treeNode.subNodes[i].value;

                    // If any of subnodes has a non-numeric value and failOnSubNodeNaN
                    // is not false, return.
                    if (failOnSubNodeNaN
                            && (subNodesValues[i] === undefined || subNodesValues[i] === null))
                        return NaN;
                }
            }

            // If the function is non-simplifiable and now in calculate cache mode,
            // return.
            if (calculateCacheMode
                    && treeNode.type == MathTreeNodeType.FUNCTION
                    && typeof (MathStandardSymbols.functions[treeNode.id]) != "undefined"
                    && MathStandardSymbols.functions[treeNode.id].nonSimplifiable)
                return NaN;

            var subNodesValuesCount = subNodesValues.length;

            // ///////////////////////////////////
            // Calculating a value of the current node depending on its type.
            // ///////////////////////////////////

            switch (treeNode.type) {
            // ///////////////////////////////////
            // Node is a symbol
            case MathTreeNodeType.SYMBOL:
                // A symbol is a standard constant.
                if (treeNode.subType == MathTreeNodeType.STANDARD_CONSTANT) {
                    if (typeof (MathStandardSymbols.constants[treeNode.id]) == "undefined")
                        return NaN;
                    result = MathStandardSymbols.constants[treeNode.id].value;
                    break;
                }

                // A symbol is a variable passed to the calculator.
                if (variables[treeNode.id] !== undefined) {
                    result = variables[treeNode.id];
                    break;
                }
                break;

            // ///////////////////////////////////
            // Node is a function
            case MathTreeNodeType.FUNCTION:

                // A function is standard.
                if (treeNode.subType == MathTreeNodeType.STANDARD_FUNCTION) {
                    if (typeof (MathStandardSymbols.functions[treeNode.id]) != undefined)
                        return NaN;
                    result = MathStandardSymbols.functions[treeNode.id]
                            .executor(subNodesValues);
                    break;
                }
                break;

            // ///////////////////////////////////
            // Node is an expression
            case MathTreeNodeType.EXPRESSION:
                result = subNodesValues[0];
                for ( var i = 1; i < subNodesValuesCount; i++) {
                    if (treeNode.subActions[i - 1].type == MathTokenType.ADD)
                        result += subNodesValues[i];
                    else
                        result -= subNodesValues[i];
                }
                break;

            // ///////////////////////////////////
            // Node is a term
            case MathTreeNodeType.TERM:
                result = subNodesValues[0];
                for ( var i = 1; i < subNodesValuesCount; i++) {
                    if (treeNode.subActions[i - 1].type == MathTokenType.MULTIPLY)
                        result *= subNodesValues[i];
                    else
                        result /= subNodesValues[i];
                }
                break;

            // ///////////////////////////////////
            // Node is a power
            case MathTreeNodeType.POWER:
                result = subNodesValues[0];
                for ( var i = 1; i < subNodesValuesCount; i++) {
                    result = Math.pow(result, subNodesValues[i]);
                }
                break;
            }

            // Doing something with an obtained result.

            if (isNaN(result) && !calculateCacheMode)
                throw COULD_NOT_CALCULATE_EXCEPTION;

            // Saving node result if it we are in a “calculate cache” mode.
            if (calculateCacheMode && (_.isNumber(result) && !isNaN(result)))
                treeNode.value = result;
            return result;
        }
    };
})();
