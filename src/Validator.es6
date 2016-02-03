/**
 * @classDescription MathValidator is a class for applying semantic analysis on
 *                   MathObject. It visits MathTree instance and finds semantic
 *                   errors depending on what rule set is currently used.
 */
function MathValidator()
{
    this.errors = new MathMessageList();
    this.warnings = new MathMessageList(); // Not currently in use.
}

/**
 * Validates a tree of nodes. Besides just validating, the function adds “id”
 * property to each constant, variable or functions, which corresponds to the
 * WEST Dialect and the id of the Symbol in the symbol base.
 * 
 * @param {Object}
 *        tree Input tree.
 * @param {Object}
 *        rules Set of rules
 * @param {Boolean}
 *        dontValidateValue (optional) If true, the value of the tree will not
 *        be validated.
 * @return {Boolean} true if any changes were made before the previous
 *         validation.
 */
MathValidator.prototype.validate = function(tree, rules, dontValidateValue)
{
    this.rules = rules;
    
    this.errors.clear();
    
    // Checking the tree for emptinesss.
    if (this.rules.acceptEmpty.isNo() && tree.root.isEmpty()) 
        this.errors.add(new MathMessage("e_sem_forbidden_empty", tree.root.pos));
    else 
        // Recursively validating a tree.
        this.validateNode(tree.root);
    
    // Validating value if needed.
    if (!dontValidateValue && this.errors.isEmpty())
    {
        // Calculating cached values of the tree nodes to get the value of the
        // tree if possible.
        Calculator.calculateCachedValues(tree.root);
    
        // Applying some additional rules.
        // // If Accepting only integers.
        if (this.rules.valueOnlyInteger.isYes() && isFinite(tree.root.value) && Math.round(tree.root.value) != tree.root.value) 
            this.errors.add(new MathMessage("e_sem_expected_int", tree.root.pos, 
            {
                value: tree.root.value
            }));
        // // If Accepting only finite numbers.
        else if (this.rules.valueOnlyFinite.isYes() && !isFinite(tree.root.value)) 
            this.errors.add(new MathMessage("e_sem_expected_finite", tree.root.pos, 
            {
                value: tree.root.value
            }));
        
        // // If Accepting only a number of some range.
        if (this.rules.valueRange.isOnly() && isFinite(tree.root.value) && (tree.root.value < this.rules.valueRange.min || tree.root.value > this.rules.valueRange.max)) 
            this.errors.add(new MathMessage("e_sem_expected_range", tree.root.pos, 
            {
                value: tree.root.value,
                range: this.rules.valueRange
            }));
        
        // // If Accepting only numbers more than a number.
        if (this.rules.valueOnlyGreaterThan.isYes() && isFinite(tree.root.value) && isFinite(this.rules.valueOnlyGreaterThan.bound) && tree.root.value <= this.rules.valueOnlyGreaterThan.bound) 
            this.errors.add(new MathMessage("e_sem_expected_greaterthan", tree.root.pos, 
            {
                value: tree.root.value,
                bound: this.rules.valueOnlyGreaterThan.bound
            }));
        
        // // If Accepting only numbers less than a number.
        if (this.rules.valueOnlyLessThan.isYes() && isFinite(tree.root.value) && tree.root.value >= this.rules.valueOnlyLessThan.bound) 
            this.errors.add(new MathMessage("e_sem_expected_lessthan", tree.root.pos, 
            {
                value: tree.root.value,
                bound: this.rules.valueOnlyLessThan.bound
            }));
    }
    return true;
};

/**
 * Recursievly validates a tree node.
 * 
 * @param {Object}
 *        treeNode
 */
MathValidator.prototype.validateNode = function(treeNode)
{
    switch (treeNode.type)
    {
        // ///////////////////////////
        // Constant or a variable (or even a misused function name or an unknown
        // symbol)
        // ///////////////////////////
        case MathTreeNodeType.SYMBOL:
            var symbolID;
            var possibleMessageParams;
            
            // ///////////////////////////
            // Constant
            
            // Checking a symbol in a list of standard constants
            symbolID = MathStandardSymbols.findConstant(treeNode.name);
            possibleMessageParams = 
            {
                name: treeNode.nameRaw,
                id: symbolID
            };
            
            if (symbolID) {
                
                // Keeping node subtype and the ID of the constant in the node.
                treeNode.id = symbolID;
                treeNode.subType = MathTreeNodeType.STANDARD_CONSTANT;
                            
                // All constants are forbidden here.
                if (this.rules.useStandardConstants.isNo()) 
                    this.errors.add(new MathMessage("e_sem_constant_forbidden_all", treeNode.pos, possibleMessageParams));
                
                // This constant is forbidden here.
                else if ((this.rules.useStandardConstants.isOnly() && _.indexOf(this.rules.useStandardConstants.list, symbolID) == -1) ||
                (this.rules.useStandardConstants.isExcluding() && _.indexOf(this.rules.useStandardConstants.list, symbolID) !== -1)) 
                    this.errors.add(new MathMessage("e_sem_constant_forbidden_this", treeNode.pos, possibleMessageParams));
                
                return;
            }
            
            // ///////////////////////////
            // Variable
            // Checking a symbol in a list of standard variable
            symbolID = MathStandardSymbols.findVariable(treeNode.name);
            possibleMessageParams = 
            {
                name: treeNode.nameRaw,
                id: symbolID
            };
            
            if (symbolID) {
                
                // Keeping node subtype and the ID of the variable in the node.
                treeNode.id = symbolID;
                treeNode.subType = MathTreeNodeType.STANDARD_VARIABLE;
                
                // All variables are forbidden here.
                if (this.rules.useStandardVariables.isNo()) 
                    this.errors.add(new MathMessage("e_sem_variable_forbidden_all", treeNode.pos, possibleMessageParams));
                
                // This variable is forbidden here.
                else if ((this.rules.useStandardVariables.isOnly() && _.indexOf(this.rules.useStandardVariables.list, symbolID) == -1) ||
                (this.rules.useStandardVariables.isExcluding() && _.indexOf(this.rules.useStandardVariables.list, symbolID) !== -1)) 
                    this.errors.add(new MathMessage("e_sem_variable_forbidden_this", treeNode.pos, possibleMessageParams));
                
                return;
            }
            
            // ///////////////////////////
            // Function name as a symbol
            // Checking a symbol in a list of standard functions
            symbolID = MathStandardSymbols.findFunction(treeNode.name);
            if (symbolID) {
                
                this.errors.add(new MathMessage("e_sem_function_as_symbol", treeNode.pos,{name: treeNode.nameRaw, id: symbolID}));
                return;
            }

            // ///////////////////////////
            // Unknown symbol
            this.errors.add(new MathMessage("e_sem_unknown_symbol", treeNode.pos, {name:treeNode.nameRaw}));
            return
                        
            
        // ///////////////////////////
        // Function (or a misused constant or variable name)
        // ///////////////////////////
        case MathTreeNodeType.FUNCTION:
            var symbolID;
            var possibleMessageParams;
        
            // Validate subNodes of a function
            this.validateSubNodes(treeNode);
                
            // Checking a function name in a list of standard functions
            symbolID = MathStandardSymbols.findFunction(treeNode.name);
            possibleMessageParams = 
            {
                name: treeNode.nameRaw,
                id: symbolID
            };
            
            if (symbolID) {
            
                // Keeping node subtype and the ID of the function in the node.
                treeNode.id = symbolID;
                treeNode.subType = MathTreeNodeType.STANDARD_FUNCTION;
                
                // All functions are forbidden here.
                if (this.rules.useStandardFunctions.isNo()) 
                    this.errors.add(new MathMessage("e_sem_function_forbidden_all", treeNode.namePos, possibleMessageParams));
                
                // This function is forbidden here.
                else if ((this.rules.useStandardFunctions.isOnly() && _.indexOf(this.rules.useStandardFunctions.list, symbolID) == -1) ||
                (this.rules.useStandardFunctions.isExcluding() && _.indexOf(this.rules.useStandardFunctions.list, symbolID) !== -1)) 
                    this.errors.add(new MathMessage("e_sem_function_forbidden_this", treeNode.namePos, possibleMessageParams));
                
                // Checking argument count for the function.
                var argumentCount = MathStandardSymbols.functions[symbolID].argumentCount;
                var realArgumentCount = treeNode.subNodes.length;
                var errorPos;
                
                possibleMessageParams = {
                    name: treeNode.nameRaw,
                    argumentCount: argumentCount,
                    realArgumentCount: realArgumentCount
                };
                // // Case 1: function accepts exactly argumentCount arguments.
                if (_.isNumber(argumentCount))
                {
                    // Passed too much arguments.
                    if (realArgumentCount > argumentCount)
                    {
                        if (treeNode.subNodes[argumentCount - 1])
                            errorPos = MathPos.unite(MathPos.ending(treeNode.subNodes[argumentCount - 1].pos), MathPos.ending(treeNode.argumentPos));
                        else
                            errorPos = treeNode.argumentPos;
                        this.errors.add(new MathMessage("e_sem_function_arguments_extra_exact", errorPos, possibleMessageParams));
                    }
                    // Passed too few arguments.
                    else if (realArgumentCount < argumentCount)
                    {
                        errorPos = realArgumentCount ? MathPos.unite(MathPos.ending(treeNode.subNodes[realArgumentCount - 1].pos), MathPos.ending(treeNode.argumentPos)) : treeNode.argumentPos;
                        this.errors.add(new MathMessage("e_sem_function_arguments_few_exact", errorPos, possibleMessageParams));
                    }
                    
                // // Case 2: Function accepts from argumentCount.min to
                // argumentCount.max arguments.
                }else{
                    // // Case 2.1: Upper bound for argument count in Infinity.
                    if (argumentCount.max == Infinity)
                    {
                        // Passed too few arguments
                        if (realArgumentCount < argumentCount.min)
                        {
                            errorPos = realArgumentCount ? MathPos.unite(MathPos.ending(treeNode.subNodes[realArgumentCount - 1].pos), MathPos.ending(treeNode.argumentPos)) : treeNode.argumentPos;
                            this.errors.add(new MathMessage("e_sem_function_arguments_few_range_n_inf", errorPos, possibleMessageParams));
                        }    
                
                    // // Case 2.2: Both Upper bound and lower bound are
                    // numbers.
                    }else{
                        if (realArgumentCount < argumentCount.min) 
                        {
                            errorPos = realArgumentCount ? MathPos.unite(MathPos.ending(treeNode.subNodes[realArgumentCount - 1].pos), MathPos.ending(treeNode.argumentPos)) : treeNode.argumentPos;
                            this.errors.add(new MathMessage("e_sem_function_arguments_few_range_n_n", errorPos, possibleMessageParams));
                        }if (realArgumentCount > argumentCount.max) 
                        {
                            errorPos = MathPos.unite(MathPos.ending(treeNode.subNodes[argumentCount.max - 1].pos), MathPos.ending(treeNode.argumentPos));
                            this.errors.add(new MathMessage("e_sem_function_arguments_extra_range_n_n", errorPos, possibleMessageParams));
                        }
                    }
                }
                return;
            }
            
            // ///////////////////////////
            // Constant name as a function
            // Checking a symbol in a list of standard constants
            symbolID = MathStandardSymbols.findConstant(treeNode.name);
            if (symbolID) {
                this.errors.add(new MathMessage("e_sem_constant_as_function", treeNode.namePos,{name: treeNode.nameRaw, id: symbolID}));
                return;
            }
            // ///////////////////////////
            // Variable name as a function
            // Checking a symbol in a list of standard variables
            symbolID = MathStandardSymbols.findVariable(treeNode.name);
            if (symbolID) {
                this.errors.add(new MathMessage("e_sem_variable_as_function", treeNode.namePos,{name: treeNode.nameRaw, id: symbolID}));
                return;
            }

            // ///////////////////////////
            // Unknown function
            this.errors.add(new MathMessage("e_sem_unknown_function", treeNode.namePos, {name:treeNode.nameRaw}));
            return;
                

        // ///////////////////////////
        // Inequality or equation
        // ///////////////////////////
        case MathTreeNodeType.STATEMENT:
            if (treeNode.subType == MathTreeNodeType.STATEMENT_EQUATION && this.rules.acceptEquations.isNo())
                this.errors.add(new MathMessage("e_sem_forbidden_equation", treeNode.subActions[0].pos));
            else if (treeNode.subType == MathTreeNodeType.STATEMENT_INEQUALITY && this.rules.acceptInequalities.isNo())
                this.errors.add(new MathMessage("e_sem_forbidden_inequality", treeNode.subActions[0].pos));
    
            this.validateSubNodes(treeNode);
            return;
        
        // ///////////////////////////
        // Sequence of statements
        // ///////////////////////////
        case MathTreeNodeType.SEQUENCE_OF_STATEMENTS:
            if (this.rules.acceptSequenceOfStatements.isNo() && treeNode.subActions[0].type == MathTokenType.SEMICOLON)
            {
                if (treeNode.subNodes.length == 1)
                    this.errors.add(new MathMessage("e_sem_forbidden_semicolon", treeNode.subActions[0].pos));
                else
                    this.errors.add(new MathMessage("e_sem_forbidden_sequence_of_statements", treeNode.subActions[0].pos));
            }
    
            this.validateSubNodes(treeNode);
            return;

        // ///////////////////////////
        // Expression, term or power
        // ///////////////////////////
        default:
            this.validateSubNodes(treeNode);
    }
};

/**
 * Validates subnodes of a given node.
 * 
 * @param {Object}
 *        treeNode
 */
MathValidator.prototype.validateSubNodes = function(treeNode)
{
    var subNode;
    for (var i in treeNode.subNodes) 
    {
        subNode = treeNode.subNodes[i];
        if (!subNode.isEmpty() && !subNode.isUnparsed()) 
        {
            this.validateNode(subNode);
        }
    }
};