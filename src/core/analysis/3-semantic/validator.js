import _ from 'underscore';
import {Message}      from '../message';
import {MessageList}  from '../message-list';
import {Pos}          from '../pos';
import {TokenType}    from '../1-lexical/token-type';
import {TreeNodeType} from '../2-syntactic/tree-node-type';

/**
 * Validator applies semantic analysis on Text.
 * It visits Tree instance and finds semantic
 * errors depending on what rule set is currently used.
 */
export class Validator {
  constructor() {
    this.errors = new MessageList();
    //XXX start using warnings
    this.warnings = new MessageList();
  }

  /**
   * Validates a tree of nodes.
   * Also adds “id” property to each constant, variable or function,
   * which corresponds to a symbol id (and alias in the WEST Dialect)
   *
   * @param {Tree} tree
   *    Input tree.
   * @param {Symbols} symbols
   *    Symbols being used.
   * @param {ValidationRules} rules
   *    Set of validation rules being used.
   * @param {Calculator} [calculator]
   *    If present, it is attempted to calculate the value of the tree and validate it.
   *
   * @returns {boolean}
   *      true if any changes were made before the previous validation.
   */
  validate(tree, symbols, rules, calculator) {

    this.errors.clear();

    // Check for emptiness
    if (rules.acceptEmpty.isNo() && tree.root.isEmpty()) {
      this.errors.add(new Message('e_sem_forbidden_empty', tree.root.pos));
    } else {
      // Recursively validate a tree
      this.validateNode(tree.root, symbols, rules);
    }

    // Validate value if needed
    if (calculator && this.errors.isEmpty()) {
      // Calculate cached values of the tree nodes
      // to get the value of the tree if possible.
      calculator.calculateCachedValues(tree.root);

      // Apply some additional rules
      // -- if Accepting only integers
      if (rules.valueOnlyInteger.isYes()
          && isFinite(tree.root.value)
          && Math.round(tree.root.value) != tree.root.value) {
        this.errors.add(new Message(
            'e_sem_expected_int',
            tree.root.pos,
            {value: tree.root.value}
          ));

      // -- if accepting only finite numbers
      } else if (rules.valueOnlyFinite.isYes() && !isFinite(tree.root.value)) {
        this.errors.add(new Message(
            'e_sem_expected_finite',
            tree.root.pos,
            {value: tree.root.value}
          ));
      }

      // -- if accepting only a number of some range
      if (rules.valueRange.isOnly()
          && isFinite(tree.root.value)
          && (tree.root.value < rules.valueRange.min || tree.root.value > rules.valueRange.max)) {
        this.errors.add(new Message(
            'e_sem_expected_range',
            tree.root.pos,
            {value: tree.root.value,range: rules.valueRange}
          ));
      }

      // -- if Accepting only numbers more than a number
      if (rules.valueOnlyGreaterThan.isYes()
          && isFinite(tree.root.value)
          && isFinite(rules.valueOnlyGreaterThan.bound)
          && tree.root.value <= rules.valueOnlyGreaterThan.bound) {
        this.errors.add(new Message(
            'e_sem_expected_gt',
            tree.root.pos,
            {value: tree.root.value, bound: rules.valueOnlyGreaterThan.bound}
          ));
      }

      // -- if Accepting only numbers less than a number
      if (rules.valueOnlyLessThan.isYes()
          && isFinite(tree.root.value)
          && tree.root.value >= rules.valueOnlyLessThan.bound) {
        this.errors.add(new Message(
            'e_sem_expected_lt',
            tree.root.pos,
            {value: tree.root.value,bound: rules.valueOnlyLessThan.bound}
          ));
      }
    }
    return true;
  }

  /**
   * Recursively validates a tree node
   *
   * @param {TreeNoe} treeNode
   * @param {Symbols} symbols
   *    Symbols being used.
   * @param {ValidationRules} rules
   *    Set of validation rules being used.
   */
  validateNode(treeNode, symbols, rules) {
    var symbolId;
    var possibleMessageParams;

    switch (treeNode.type) {
    /////////////////////////////
    // Constant, variable or a misused function name / unknown symbol
    /////////////////////////////

    case TreeNodeType.SYMBOL:

      ///////////
      // Constant

      // Check a symbol in a list of standard constants
      symbolId = symbols.findConstant(treeNode.name);
      possibleMessageParams =
      {
        name: treeNode.nameRaw,
        id: symbolId
      };

      if (symbolId) {

        // Keep node sub-type and the id of the constant in the node.
        treeNode.id = symbolId;
        treeNode.subType = TreeNodeType.STANDARD_CONSTANT;

        // All constants are forbidden here.
        if (rules.allowConstants.isNo()) {
          this.errors.add(new Message('e_sem_constant_forbidden_all', treeNode.pos, possibleMessageParams));

        // This constant is forbidden here.
        } else if ((rules.allowConstants.isOnly() && _.indexOf(rules.allowConstants.list, symbolId) == -1)
            || (rules.allowConstants.isExcluding() && _.indexOf(rules.allowConstants.list, symbolId) !== -1)) {
          this.errors.add(new Message('e_sem_constant_forbidden_this', treeNode.pos, possibleMessageParams));
        }

        return;
      }

      /////////////////////////////
      // Variable
      // Check a symbol in a list of variables
      symbolId = symbols.findVariable(treeNode.name);
      possibleMessageParams =
      {
        name: treeNode.nameRaw,
        id: symbolId
      };

      if (symbolId) {

        // Keep node sub-type and the id of the variable in the node.
        treeNode.id = symbolId;
        treeNode.subType = TreeNodeType.STANDARD_VARIABLE;

        // All variables are forbidden here.
        if (rules.allowVariables.isNo()) {
          this.errors.add(new Message('e_sem_variable_forbidden_all', treeNode.pos, possibleMessageParams));

        // This variable is forbidden here.
        } else if ((rules.allowVariables.isOnly() && _.indexOf(rules.allowVariables.list, symbolId) == -1)
            || (rules.allowVariables.isExcluding() && _.indexOf(rules.allowVariables.list, symbolId) !== -1)) {
          this.errors.add(new Message('e_sem_variable_forbidden_this', treeNode.pos, possibleMessageParams));
        }
        return;
      }

      /////////////////////////////
      // Function name as a symbol
      // Check a symbol in a list of standard functions
      symbolId = symbols.findFunction(treeNode.name);
      if (symbolId) {
        this.errors.add(new Message('e_sem_function_as_symbol', treeNode.pos,{name: treeNode.nameRaw, id: symbolId}));
        return;
      }

      /////////////////////////////
      // Unknown symbol
      this.errors.add(new Message('e_sem_unknown_symbol', treeNode.pos, {name: treeNode.nameRaw}));
      return;

    /////////////////////////////
    // Function (or a misused constant or variable name)
    /////////////////////////////
    case TreeNodeType.FUNCTION:

      // Validate subNodes of a function
      this.validateSubNodes(treeNode, symbols, rules);

      // Check a function name in a list of standard functions
      symbolId = symbols.findFunction(treeNode.name);
      possibleMessageParams =
      {
        name: treeNode.nameRaw,
        id: symbolId
      };

      if (symbolId) {

        // Keep node sub-type and the ID of the function in the node.
        treeNode.id = symbolId;
        treeNode.subType = TreeNodeType.STANDARD_FUNCTION;

        // All functions are forbidden here.
        if (rules.allowFunctions.isNo()) {
          this.errors.add(new Message(
              'e_sem_function_forbidden_all',
              treeNode.namePos,
              possibleMessageParams
          ));

        // This function is forbidden here.
        } else if ((rules.allowFunctions.isOnly()
                && _.indexOf(rules.allowFunctions.list, symbolId) == -1)
            || (rules.allowFunctions.isExcluding()
                && _.indexOf(rules.allowFunctions.list, symbolId) !== -1)) {
          this.errors.add(new Message(
              'e_sem_function_forbidden_this',
              treeNode.namePos,
              possibleMessageParams
            ));
        }

        // Check argument count for the function.
        var argumentCount = symbols.functions[symbolId].argumentCount;
        var realArgumentCount = treeNode.subNodes.length;
        var errorPos;

        possibleMessageParams = {
          name: treeNode.nameRaw,
          argumentCount: argumentCount,
          realArgumentCount: realArgumentCount
        };
        // -- Case 1: function accepts exactly argumentCount arguments.
        if (_.isNumber(argumentCount)) {
          // Passed too much arguments.
          if (realArgumentCount > argumentCount) {
            if (treeNode.subNodes[argumentCount - 1]) {
              errorPos = Pos.unite(
                  Pos.ending(treeNode.subNodes[argumentCount - 1].pos),
                  Pos.ending(treeNode.argumentPos)
              );
            } else {
              errorPos = treeNode.argumentPos;
            }
            this.errors.add(new Message(
                'e_sem_function_arguments_extra_exact',
                errorPos,
                possibleMessageParams
              ));

          // Passed too few arguments.
          } else if (realArgumentCount < argumentCount) {
            errorPos = realArgumentCount
                  ? Pos.unite(Pos.ending(
                      treeNode.subNodes[realArgumentCount - 1].pos),
                      Pos.ending(treeNode.argumentPos)
                    )
                  : treeNode.argumentPos;
            this.errors.add(new Message(
                'e_sem_function_arguments_few_exact',
                errorPos,
                possibleMessageParams
              ));
          }

        // -- Case 2: Function accepts from argumentCount.min to argumentCount.max arguments.
        } else {
          // -- Case 2.1: Upper bound for argument count in Infinity.
          if (argumentCount.max == Infinity) {
            // Passed too few arguments
            if (realArgumentCount < argumentCount.min) {
              errorPos = realArgumentCount
                  ? Pos.unite(
                      Pos.ending(treeNode.subNodes[realArgumentCount - 1].pos),
                      Pos.ending(treeNode.argumentPos)
                    )
                  : treeNode.argumentPos;
              this.errors.add(new Message(
                  'e_sem_function_arguments_few_range_n_inf',
                  errorPos,
                  possibleMessageParams
                ));
            }

          // -- Case 2.2: Both Upper bound and lower bound are numbers.
          } else {
            if (realArgumentCount < argumentCount.min) {
              errorPos = realArgumentCount
                  ? Pos.unite(
                      Pos.ending(treeNode.subNodes[realArgumentCount - 1].pos),
                      Pos.ending(treeNode.argumentPos)
                    )
                  : treeNode.argumentPos;
              this.errors.add(new Message(
                  'e_sem_function_arguments_few_range_n_n',
                  errorPos,
                  possibleMessageParams
                ));
            } if (realArgumentCount > argumentCount.max) {
              errorPos = Pos.unite(
                  Pos.ending(treeNode.subNodes[argumentCount.max - 1].pos),
                  Pos.ending(treeNode.argumentPos)
                );
              this.errors.add(new Message(
                  'e_sem_function_arguments_extra_range_n_n',
                  errorPos,
                  possibleMessageParams
                ));
            }
          }
        }
        return;
      }

      /////////////////////////////
      // Constant name as a function
      // Check a symbol in a list of standard constants
      symbolId = symbols.findConstant(treeNode.name);
      if (symbolId) {
        this.errors.add(new Message(
            'e_sem_constant_as_function',
            treeNode.namePos,
            {name: treeNode.nameRaw, id: symbolId}
          ));
        return;
      }
      /////////////////////////////
      // Variable name as a function
      // Check a symbol in a list of standard variables
      symbolId = symbols.findVariable(treeNode.name);
      if (symbolId) {
        this.errors.add(new Message(
            'e_sem_variable_as_function',
            treeNode.namePos,
            {name: treeNode.nameRaw, id: symbolId}
          ));
        return;
      }

      /////////////////////////////
      // Unknown function
      this.errors.add(new Message(
          'e_sem_unknown_function',
          treeNode.namePos,
          {name: treeNode.nameRaw}
        ));
      return;

    /////////////////////////////
    // Inequality or equation
    /////////////////////////////
    case TreeNodeType.STATEMENT:
      if (treeNode.subType == TreeNodeType.STATEMENT_EQUATION && rules.acceptEquations.isNo()) {
        this.errors.add(new Message('e_sem_forbidden_equation', treeNode.subActions[0].pos));
      } else if (treeNode.subType == TreeNodeType.STATEMENT_INEQUALITY && rules.acceptInequalities.isNo()) {
        this.errors.add(new Message('e_sem_forbidden_inequality', treeNode.subActions[0].pos));
      }

      this.validateSubNodes(treeNode, symbols, rules);
      return;

    /////////////////////////////
    // Sequence of statements
    /////////////////////////////
    case TreeNodeType.SEQUENCE_OF_STATEMENTS:
      if (rules.acceptSequenceOfStatements.isNo() && treeNode.subActions[0].type == TokenType.SEMICOLON) {
        if (treeNode.subNodes.length == 1) {
          this.errors.add(new Message(
              'e_sem_forbidden_semicolon',
              treeNode.subActions[0].pos
            ));
        } else {
          this.errors.add(new Message(
              'e_sem_forbidden_sequence_of_statements',
              treeNode.subActions[0].pos
            ));
        }
      }

      this.validateSubNodes(treeNode, symbols, rules);
      return;

    ////////////////////////////
    // Expression, term or power
    ////////////////////////////
    default:
      this.validateSubNodes(treeNode, symbols, rules);
    }
  }

  /**
   * Validates sub-nodes of a given node.
   *
   * @param {Object} treeNode
   *        Node to work with.
   * @param {Symbols} symbols
   *        Symbols being used.
   * @param {ValidationRules} rules
   *        Set of validation rules being used.
   */
  validateSubNodes(treeNode, symbols, rules) {
    var subNode;
    for (var i in treeNode.subNodes) {
      if (!treeNode.subNodes.hasOwnProperty(i)) {
        continue;
      }
      subNode = treeNode.subNodes[i];
      if (!subNode.isEmpty() && !subNode.isUnparsed()) {
        this.validateNode(subNode, symbols, rules);
      }
    }
  }
}
