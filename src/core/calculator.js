import _ from 'underscore';
import {
  TreeNodeType,
  MathTokenType,
  MathStandardSymbols,
  Text
} from 'humane-math';

/**
 * Calculator can be used for extracting node values.
 * It is also helpful to precompute values for some nodes
 * a tree in order to make further calculations faster. The calculator
 * does not simplify a tree or make any other changes to it except
 * for adding or removing “value” property to nodes.
 * Calculator is a Visitor.
 */
export class Calculator {

  /**
   * This inner use exception is to be thrown anytime a calculation of sub-nodes
   * fails. It is caught by a caller function and NaN is returned. Such approach
   * is made to increase the speed of the calculator and avoid performing useless
   * computations.
   */
  static COULD_NOT_CALCULATE_EXCEPTION = 13;

  /**
   * Recursively calculates values for all nodes starting at “treeNode” where it
   * is possible and stores the result at node.value. This can be useful for
   * increasing the speed of further calculations.
   *
   * @param {MathTreeNode} expressionNode
   *    A MathTreeNode to be calculated. Can be any type of node.
   *
   * @param {Object} variables
   *    Variables passed.
   *
   * @param {Object} userSymbols
   *    Set of user constants and functions. Not in use now.
   *
   * @returns {number}
   *     Value of the expression or NaN if calculation failed.
   */
  calculateExpression(expressionNode, variables, userSymbols) {
    if (expressionNode instanceof Text) {
      expressionNode = expressionNode.tree.root;
    }

    if (!variables) {
      variables = {};
    }

    var result = Number.NaN;
    try {
      result = this.calculateValueOfTheNode(expressionNode, variables, userSymbols);
    } catch (e) {
      if (e != this.COULD_NOT_CALCULATE_EXCEPTION) {
        throw e;
      }
    }

    return result;
  }

  /**
   * Checks whether the given inequality is true. (Not implemented yet)
   * TODO implement
   *
   * @param {Object}
   *    inequalityNode
   * @param {Object}
   *    variables
   * @param {Object}
   *    userSymbols
   */
  //checkInequality(inequalityNode, variables, userSymbols) {
  //}

  /**
   * Recursively calculates values for all nodes starting at “treeNode” where it
   * is possible and stores the result at node.value. This can be useful for
   * increasing the speed of further calculations.
   *
   * @param {MathTreeNode} treeNode
   *    A MathTreeNode to be calculated. Can be any type of node.
   * @param {Object} variables
   *    Variables passed.
   * @param {Object} userSymbols
   *    Set of user constants and functions. Not in use now.
   */
  calculateCachedValues(treeNode, variables, userSymbols) {
    if (treeNode instanceof Text) {
      treeNode = treeNode.tree.root;
    }

    if (!variables) {
      variables = {};
    }

    try {
      this.calculateValueOfTheNode(treeNode, variables, userSymbols, true);
    } catch (e) {
      if (e != this.COULD_NOT_CALCULATE_EXCEPTION) {
        throw e;
      }
    }
  }

  /**
   * Removes all cashed values of the nodes. For instance, if a node contained
   * (pi-3) and its value was equal to 0.14, its value becomes undefined.
   *
   * @param {Object} treeNode
   *    Node to clear values in
   */
  clearCachedValues(treeNode) {
    if (treeNode instanceof Text) {
      treeNode = treeNode.tree.root;
    }

    // Recursively clear child nodes.
    if (treeNode.subNodes) {
      for (let i = treeNode.subNodes.length - 1; i >= 0; i--) {
        this.clearCachedValues(treeNode.subNodes[i]);
      }
    }

    // Delete a value of the current node in case it is not a number.
    if (treeNode.type != TreeNodeType.NUMBER) {
      delete treeNode.value;
    }
  }

  /**
   * Calculates the value of a node and depending on the mode returns it or saves
   * as the node “value” property.
   *
   * @param {MathTreeNode} treeNode
   *    A MathTreeNode to be calculated. Can be any type of node.
   * @param {Object} variables
   *    Variables passed.
   * @param {Object} userSymbols
   *    Set of user constants and functions. Not in use now.
   * @param {boolean} calculateCacheMode
   *    If true, the result of the function will be saved as the node “value” property.
   * @returns {number|NaN}
   *      xxx
   */
  calculateValueOfTheNode(treeNode, variables, userSymbols, calculateCacheMode) {

    //FIXME revise
    //// Do nothing if the value is already calculated or this node is a number (it has already got a value).
    // if ((treeNode.value !== null && !calculateCacheMode) || treeNode.type == TreeNodeType.NUMBER)

    // Do nothing if a value is already known, just return it.
    if (treeNode.value !== undefined) {
      return treeNode.value;
    }

    // The result is meaningless by default.
    var result = null;

    // All values of sub-nodes must be kept in a separate array to be then passed
    // to an executor function or processed.
    var subNodesValues = new Array();

    // Detects if the function must return NaN if any of sub-nodes contains NaN.
    var failOnSubNodeNaN = true;

    // If is a special case. No need to return NaN if any of the arguments is NaN.
    if (treeNode.type == TreeNodeType.FUNCTION
        && MathStandardSymbols.functions[treeNode.id]
        && MathStandardSymbols.functions[treeNode.id].calculateForNaNs) {
      failOnSubNodeNaN = false;
    }

    // Calculate values for all children sub-nodes if there are any.
    if (treeNode.subNodes) {
      for (let i = treeNode.subNodes.length - 1; i >= 0; i--) {
        // Try to get the value of a sub-node and saving it.
        if (treeNode.subNodes[i].value === undefined) {
          // If failOnSubNodeNaN is false, calculations are made in
          // try/catch block to avoid lazy finish in case of a NaN.
          if (!failOnSubNodeNaN) {
            try {
              subNodesValues[i] = this.calculateValueOfTheNode(
                  treeNode.subNodes[i], variables,
                  userSymbols, calculateCacheMode
                );
            } catch (e) {
              if (e != this.COULD_NOT_CALCULATE_EXCEPTION) {
                throw e;
              }
            }
          } else {
            subNodesValues[i] = this.calculateValueOfTheNode(
                treeNode.subNodes[i], variables, userSymbols,
                calculateCacheMode);
          }
        } else {
          subNodesValues[i] = treeNode.subNodes[i].value;
        }

        // If any of sub-nodes has a non-numeric value and failOnSubNodeNaN
        // is not false, return.
        if (failOnSubNodeNaN
            && (subNodesValues[i] === undefined || subNodesValues[i] === null)) {
          return NaN;
        }
      }
    }

    // If the function cannot be simplified and now in calculate cache mode, return.
    if (calculateCacheMode
        && treeNode.type == TreeNodeType.FUNCTION
        && typeof (MathStandardSymbols.functions[treeNode.id]) != 'undefined'
        && MathStandardSymbols.functions[treeNode.id].nonSimplifiable) {
      return NaN;
    }

    var subNodesValuesCount = subNodesValues.length;

    /////////////////////////////////////
    // Calculate a value of the current node depending on its type.
    /////////////////////////////////////

    switch (treeNode.type) {

    /////////////////////////////////////
    // Node is a symbol
    case TreeNodeType.SYMBOL:
      // A symbol is a standard constant.
      if (treeNode.subType == TreeNodeType.STANDARD_CONSTANT) {
        if (typeof (MathStandardSymbols.constants[treeNode.id]) == 'undefined') {
          return NaN;
        }
        result = MathStandardSymbols.constants[treeNode.id].value;
        break;
      }

      // A symbol is a variable passed to the calculator.
      if (variables[treeNode.id] !== undefined) {
        result = variables[treeNode.id];
        break;
      }
      //FIXME check this
      break;

    /////////////////////////////////////
    // Node is a function
    case TreeNodeType.FUNCTION:

      // A function is standard.
      if (treeNode.subType == TreeNodeType.STANDARD_FUNCTION) {
        if (typeof (MathStandardSymbols.functions[treeNode.id]) != undefined) {
          return NaN;
        }
        result = MathStandardSymbols.functions[treeNode.id].executor(subNodesValues);
        break;
      }
      break;

    /////////////////////////////////////
    // Node is an expression
    case TreeNodeType.EXPRESSION:
      result = subNodesValues[0];
      for (let i = 1; i < subNodesValuesCount; i++) {
        if (treeNode.subActions[i - 1].type == MathTokenType.ADD) {
          result += subNodesValues[i];
        } else {
          result -= subNodesValues[i];
        }
      }
      break;

    /////////////////////////////////////
    // Node is a term
    case TreeNodeType.TERM:
      result = subNodesValues[0];
      for (let i = 1; i < subNodesValuesCount; i++) {
        if (treeNode.subActions[i - 1].type == MathTokenType.MULTIPLY) {
          result *= subNodesValues[i];
        } else {
          result /= subNodesValues[i];
        }
      }
      break;

    /////////////////////////////////////
    // Node is a power
    case TreeNodeType.POWER:
      result = subNodesValues[0];
      for (let i = 1; i < subNodesValuesCount; i++) {
        result = Math.pow(result, subNodesValues[i]);
      }
      break;
    }

    // Do something with an obtained result

    if (isNaN(result) && !calculateCacheMode) {
      throw this.COULD_NOT_CALCULATE_EXCEPTION;
    }

    // Saving node result if it we are in a “calculate cache” mode
    if (calculateCacheMode && (_.isNumber(result) && !isNaN(result))) {
      treeNode.value = result;
    }
    return result;
  }
}
