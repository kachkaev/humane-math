import {
    Message,
    MessageList,
    Pos,
    Token,
    TreeNodeType,
    TreeNode,
    TokenType
} from 'humane-math';

/**
 * Creates an empty instance of Tree object
 */
export class Tree {
    static MAX_NODE_COUNT = 500;

    constructor() {
        this.reset();
        this.errors = new MessageList();
    }

    /**
     * Calculates hash for the Tree to determine whether it was changed or not
     */
    getHash() {
        //TODO Implement the method
    }

    /**
     * Resets the tree to a default empty state.
     */
    reset() {
        this.tokenStream = null;
        this.root = null;
    }

    /**
     * Parses an input stream into a tree of TreeNodes
     *
     * @param {Object} tokenStream
     *        incoming token stream
     *
     * @returns {boolean}
     *          true if the tree was changed.
     */
    parse(tokenStream) {
        this.reset();
        this.errors.clear();

        this.tokenStream = tokenStream;

        // Check for missed operands between operators
        // This check is separated because actual parsing ignores errors at some token sequences
        // (e.g. MINUS PLUS) in order to collect as much more errors as possible.
        this.checkForMissedOperands();

        // Move token stream cursor to the first position
        this.tokenStream.firstToken(true);

        // Parse the distinguished symbol of the grammar
        this.root = this.subparseStatementSequence();

        // Check if an end of Token Stream was reached.
        if (this.tokenStream.currentToken().type != TokenType.EOF) {
            this.errors.add(new Message(
                'e_syn_unknown',
                this.tokenStream.currentToken().pos
            ));
        }

        //XXX return false when no change occurred
        return true;
    }

    /**
     * Parses a sequence of statements, which is
     * 'statement [SEMICOLON statement ...]'
     *
     * @returns {TreeNode}
     */
    subparseStatementSequence() {

        var currentNode = this.createEmptyTreeNode();
        var firstNodeToken = this.tokenStream.currentToken();

        // Extract the first possible sub-node (statement)
        var currentSubNode = this.subparseStatement();

        ////////////////////////////////
        // Expression matches a pattern statement [SEMICOLON statement ...]
        ////////////////////////////////
        currentNode.subNodes = [];
        currentNode.subActions = [];
        currentNode.type = TreeNodeType.SEQUENCE_OF_STATEMENTS;

        // Run till EOF to get all possible errors and statements
        while (!this.tokenStream.currentToken().isEOF()) {
            // If The statement separator is semicolon (or a comma, which is an error)
            if (this.tokenStream.currentToken().type == TokenType.SEMICOLON
                    || this.tokenStream.currentToken().type == TokenType.COMMA) {

                // Add sub-action (semicolon or comma position must be kept)
                currentNode.subActions.push(this.tokenStream.currentToken());

                // If a separator is a comma, report an error
                if (this.tokenStream.currentToken().type == TokenType.COMMA) {
                    this.errors.add(new Message(
                            'e_syn_statements_comma',
                            this.tokenStream.currentToken().pos
                        ));
                }

            // If any other token found on the way
            } else {

                // If error token found on the way, just skip to the next semicolon or to the end of the stream.
                // Otherwise add an error.

                // Case 1: Right bracket found
                if (this.tokenStream.currentToken().isRightBracket()) {
                    this.errors.add(new Message(
                            'e_syn_extra_rb',
                            this.tokenStream.currentToken().pos,
                            {currentToken: this.tokenStream.currentToken()}
                        ));
                // Case 2: Non-error token found
                } else if (!this.tokenStream.currentToken().isErrorToken()) {
                    this.errors.add(new Message(
                            'e_syn_statements_wrong_symbol',
                            this.tokenStream.currentToken().pos,
                            {currentToken: this.tokenStream.currentToken()}
                        ));
                // Case 3: Any other token found
                } else {
                    // Do nothing
                }

                // Skip to the next SEMICOLON or to the end of the stream or to the last token
                if (!this.tokenStream.findNextToken([ TokenType.SEMICOLON ], true)) {
                    this.tokenStream.lastToken(true);
                } else {
                    // Add sub-action (semicolon position must be kept)
                    currentNode.subActions.push(this.tokenStream.currentToken());
                    this.tokenStream.previousToken(true);
                }

                // If the content of the parsed part of the expression is a single
                // factor, add it as the sub-node for this expression.
                // This is made for further semantic check of it.
                if (currentSubNode.type == TreeNodeType.SYMBOL
                        || currentSubNode.type == TreeNodeType.NUMBER
                        || currentSubNode.type == TreeNodeType.FUNCTION) {
                    currentSubNode = this.wrapNode(currentSubNode);
                }

                currentSubNode.type = TreeNodeType.E_UNPARSED;
                currentSubNode.hasErrors = true;

                currentSubNode.pos = Pos.unite(currentSubNode.pos, this.tokenStream.currentToken().pos);
                if (this.tokenStream.currentToken() != this.tokenStream.lastToken()) {
                    this.tokenStream.nextToken(true);
                }
            }

            // Move forward
            this.tokenStream.nextToken(true);
            currentNode.subNodes.push(currentSubNode);
            currentSubNode = this.subparseStatement();
        }
        currentNode.subNodes.push(currentSubNode);

        ////////////////////////////////
        // Sequence is just a single statement
        ////////////////////////////////
        if (currentNode.subNodes.length == 1 || currentNode.subActions.length == 0) {
            return currentNode.subNodes[0];
        }

        // Remove empty sub-node after the last semicolon
        if (currentNode.subNodes[currentNode.subNodes.length - 1].isEmpty()) {
            delete currentNode.subNodes[currentNode.subNodes.length - 1];
        }

        // Get the position of the current node
        currentNode.pos = Pos.unite(
                firstNodeToken.pos,
                this.tokenStream.currentToken().pos
            );

        return currentNode;
    }

    /**
     * Parses a statement, which is
     * 'expression [(EQUAL|LESS|MORE|MORE_EQUAL|LESS_EQUAL) expression]'
     * A statement can consist of one or two parts only.
     *
     * @returns {TreeNode}
     */
    subparseStatement() {
        var currentNode = this.createEmptyTreeNode();
        var firstNodeToken = this.tokenStream.currentToken();

        var leftPart = this.subparseExpression();
        var rightPart = null;
        var statementSign = null;

        ////////////////////////////////
        // Statement is expression (EQUAL|LESS|MORE|MORE_EQUAL|LESS_EQUAL) whatever
        ////////////////////////////////

        if (this.tokenStream.currentToken().isStatementSign()) {

            // Save the sign and parsing the right part
            statementSign = this.tokenStream.currentToken();
            this.tokenStream.nextToken(true);
            rightPart = this.subparseExpression();

            // Check both parts for emptiness
            if (leftPart.isEmpty()) {
                this.errors.add(new Message(
                    'e_syn_statement_empty_left',
                    leftPart.pos, {
                        currentToken : statementSign
                    }
                ));
            }
            if (rightPart.isEmpty()) {
                this.errors.add(new Message(
                    'e_syn_statement_empty_right',
                    rightPart.pos, {
                        currentToken : statementSign
                    }
                ));
            }

            // Add left part and right part as node sub-nodes
            currentNode.type = TreeNodeType.STATEMENT;
            currentNode.subNodes = [ leftPart, rightPart ];
            currentNode.subActions = [ statementSign ];

            ////////////////////////////////
            // Define sub-type depending on what is in the left and the right parts

            switch (statementSign.type) {
            // The statement is an inequality
            case TokenType.LESS:
            case TokenType.MORE:
            case TokenType.LESS_EQUAL:
            case TokenType.MORE_EQUAL:
                currentNode.subType = TreeNodeType.STATEMENT_INEQUALITY;
                break;

            // The statement is something separated with an EQUAL sign
            //TODO detect STATEMENT_DEFINITION_VARIABLE, STATEMENT_DEFINITION_FUNCTION
            default:
                currentNode.subType = TreeNodeType.STATEMENT_EQUATION;
                break;
            }

            // Check if there are any other statement signs (which is an error)
            while (this.tokenStream.currentToken().isStatementSign()) {
                currentNode.hasErrors = true;

                this.errors.add(new Message(
                        'e_syn_statement_extra_statement_sign',
                        this.tokenStream.currentToken().pos, {
                            currentToken : this.tokenStream.currentToken(),
                            statementSign : statementSign
                        }
                    ));

                currentNode.subActions.push(this.tokenStream.currentToken());
                this.tokenStream.nextToken(true);
                currentNode.subNodes.push(this.subparseExpression());
            }

            currentNode.pos = Pos.unite(firstNodeToken.pos, this.tokenStream
                    .previousToken().pos);
            return currentNode;

        ///////////////////////////////////
        // Statement is just a single expression
        ///////////////////////////////////
        } else {
            return leftPart;
        }
    }

    /**
     * Parses an expression, which is
     * 'term [(ADD|SUBTRACT) term [(ADD|SUBTRACT) term ...]]'
     *
     * @returns {TreeNode}
     */
    subparseExpression() {
        var currentNode = this.createEmptyTreeNode();
        var firstNodeToken = this.tokenStream.currentToken();

        // Extract the first possible sub-node (term)
        var currentSubNode = this.subparseTerm();

        // /////////////////////////////////
        // Expression is just a single term
        // /////////////////////////////////
        if (!this.tokenStream.currentToken().isExpressionSign()) {
            return currentSubNode;
        }

        // //////////////////////////////
        // Expression matches a pattern term (ADD|) term [(ADD|SUBTRACT) term ...]
        // //////////////////////////////
        currentNode.subNodes = [ currentSubNode ];
        currentNode.subActions = [];
        currentNode.type = TreeNodeType.EXPRESSION;

        while (this.tokenStream.currentToken().isExpressionSign()) {

            // Add sub-action
            currentNode.subActions.push(this.tokenStream.currentToken());

            // If a child is empty and it is not the first term parsed,
            // mark node as one with errors
            if (currentSubNode.isEmpty() && currentNode.subNodes.length != 1) {
                currentNode.hasErrors = true;
            }

            // Move forward
            this.tokenStream.nextToken(true);
            currentSubNode = this.subparseTerm();
            currentNode.subNodes.push(currentSubNode);
        }

        // If any of sub-nodes contains errors, mark a node as the one with error
        _.each(currentNode.subNodes, function(subNode) {
            if (subNode.hasErrors) {
                currentNode.hasErrors = true;
                _.breakLoop();
            }
        });

        // Work out case SUBTRACT term.
        // Replace first empty sub-node with number (0)
        if (currentNode.subNodes[0].isEmpty()) {
            if (currentNode.subActions[0].type == TokenType.SUBTRACT) {
                currentNode.subNodes[0].type = TreeNodeType.NUMBER;
                currentNode.subNodes[0].value = 0;
            } else {
                currentNode.hasErrors = true;
            }
        }

        // Get the position of the current node
        currentNode.pos = Pos.unite(
                firstNodeToken.pos,
                this.tokenStream.previousToken().pos
            );

        return currentNode;
    }

    /**
     * Parses a term, which is
     * 'power [(MULTIPLY/DIVIDE) power [(MULTIPLY/DIVIDE) power ...]]'
     *
     * @returns {TreeNode}
     */
    subparseTerm() {
        var currentNode = this.createEmptyTreeNode();
        var firstNodeToken = this.tokenStream.currentToken();
        currentNode.type = TreeNodeType.TERM;

        // Extract the first possible sub-node (power)
        var currentSubNode = this.subparsePower();

        ////////////////////////////////
        // Term matches pattern 'power(MULTIPLY|DIVIDE|)power [...]'
        ////////////////////////////////
        currentNode.subNodes = [ currentSubNode ];
        currentNode.subActions = [];

        for (;;) {
            // If the next token is a (MULTIPLY|DIVIDE)
            // or any error token but those that subdivide statements
            if (this.tokenStream.currentToken().isTermSign()
                    || (this.tokenStream.currentToken().isErrorToken()
                            && !this.tokenStream.currentToken().isStatementSign()
                            && !this.tokenStream.currentToken().isNumber()
                            && !this.tokenStream.currentToken().isLeftBracket() && !this.tokenStream
                            .currentToken().isRightBracket())) {
                if (this.tokenStream.currentToken().isErrorToken()) {
                    currentNode.hasErrors = true;
                }
                currentNode.subActions.push(this.tokenStream.currentToken());

                this.tokenStream.nextToken(true);
                currentSubNode = this.subparsePower();
                currentNode.subNodes.push(currentSubNode);

            // Check the case of missing sign MULTIPLE,
            // e.g NUMBER SYMBOL or NUMBER LB
            } else if (this.tokenStream.currentToken().isNumber()
                    || this.tokenStream.currentToken().isLeftBracket()
                    || this.tokenStream.currentToken().isSymbol()) {
                if (this.tokenStream.previousToken().isNumber()
                        && (this.tokenStream.currentToken().isSymbol()
                            || this.tokenStream.currentToken().isLeftBracket())) {
                    // It is still not an error in case NUMBER SYMBOL or NUMBER LB
                    // or the previous token is an error token
                } else {
                    currentNode.hasErrors = true;

                    // An error will show up only if the previous token
                    //  is not an error token or any number token
                    if (!(this.tokenStream.previousToken().isErrorToken() && !this.tokenStream.previousToken().isMathOperator())
                            || this.tokenStream.previousToken().isNumber()) {
                        this.errors.add(new Message('e_syn_missing_multiply',
                                Pos.between(
                                    this.tokenStream.previousToken().pos,
                                    this.tokenStream.currentToken().pos), {
                                        previousToken : this.tokenStream
                                        .previousToken()
                                        .cloneWithCorrectedType(),
                                        currentToken : this.tokenStream.currentToken()
                                        .cloneWithCorrectedType()
                                    }));
                    }
                }

                var pseudoMultiplyToken = new Token(TokenType.MULTIPLY);
                pseudoMultiplyToken.pos = Pos.between(
                        this.tokenStream.previousToken().pos,
                        this.tokenStream.currentToken().pos
                    );

                currentNode.subActions.push(pseudoMultiplyToken);
                currentSubNode = this.subparsePower();
                currentNode.subNodes.push(currentSubNode);

            // If any error token found, use it to split sub-nodes and parse further nodes
            } else {
                break;

            }
        }

        ///////////////////////////////
        // Term is a single power (only one sub-node found)
        ///////////////////////////////
        if (currentNode.subNodes.length == 1) {
            return currentNode.subNodes[0];
        }

        // If any of sub-nodes is empty or contains error,
        // mark a node as the one with error.
        _.each(currentNode.subNodes, function(subNode) {
            if (subNode.hasErrors || subNode.type == TreeNodeType.EMPTY) {
                currentNode.hasErrors = true;
                _.breakLoop();
            }
        });

        // Get the position of the current node
        currentNode.pos = Pos.unite(
            firstNodeToken.pos,
            this.tokenStream.previousToken().pos
        );

        currentNode.type = TreeNodeType.TERM;
        return currentNode;
    }

    /**
     * Parses a power, which is
     * 'factor [(POWER) factor [(POWER) factor ...]]'
     *
     * @returns {TreeNode}
     */
    subparsePower() {
        var currentNode = this.createEmptyTreeNode();
        var firstNodeToken = this.tokenStream.currentToken();

        // Extract the first possible sub-node (power)
        var currentSubNode = this.subparseFactor();

        //////////////////////////////
        // Power is just a single factor
        //////////////////////////////
        if (!this.tokenStream.currentToken().isPowerSign()) {
            return currentSubNode;
        }

        //////////////////////////////
        // Power matches a pattern factor (POWER) factor [(POWER)factor) ...]
        //////////////////////////////
        currentNode.subNodes = [ currentSubNode ];
        currentNode.subActions = [];

        while (this.tokenStream.currentToken().isPowerSign()) {
            currentNode.subActions.push(this.tokenStream.currentToken().type);

            this.tokenStream.nextToken(true);
            currentSubNode = this.subparseFactor();
            currentNode.subNodes.push(currentSubNode);
        }

        // If any of sub-nodes is empty or contains error,
        // mark a node as the one with error
        _.each(currentNode.subNodes, function(subNode) {
            if (subNode.hasErrors || subNode.type == TreeNodeType.EMPTY) {
                currentNode.hasErrors = true;
                _.breakLoop();
            }
        });

        // Get the position of the current node
        currentNode.pos = Pos.unite(
                firstNodeToken.pos,
                this.tokenStream.previousToken().pos
            );

        currentNode.type = TreeNodeType.POWER;
        return currentNode;
    }

    /**
     * Parses a factor, which can be a number, a symbol, a function
     * (symbol with the following left bracket) or an expression in braces.
     *
     * @returns {TreeNode}
     */
    subparseFactor() {
        var currentNode = this.createEmptyTreeNode();
        var firstNodeToken = this.tokenStream.currentToken();

        // Depending on the type of a token, parse a factor differently
        if (firstNodeToken.isNumber()) {

            /////////////////////
            // Factor is a Number
            /////////////////////

            currentNode.type = TreeNodeType.NUMBER;
            currentNode.pos = this.tokenStream.currentToken().pos;
            currentNode.value = this.tokenStream.currentToken().value;
            this.tokenStream.nextToken(true);

            return currentNode;

        // Factor is a function or a symbol
        } else if (firstNodeToken.type == TokenType.SYMBOL) {

            // Check for a left bracket after the symbol
            if (this.tokenStream.nextToken().isLeftBracket()) {

                ///////////////////////
                // Factor is a function
                ///////////////////////

                currentNode.type = TreeNodeType.FUNCTION;
                currentNode.name = this.tokenStream.currentToken().value;
                currentNode.namePos = this.tokenStream.currentToken().pos;
                currentNode.nameRaw = this.tokenStream.currentToken().raw;
                currentNode.subNodes = [];

                // Skip over a left bracket and remember the position
                // of the beginning of the arguments
                this.tokenStream.nextToken(true);
                currentNode.argumentPos = Pos.ending(
                        this.tokenStream.currentToken().pos
                    );
                this.tokenStream.nextToken(true);

                // Parse arguments
                if (this.tokenStream.currentToken().isRightBracket()) {

                    //////////////////////////////////////
                    // Case one: Function has no arguments

                    // Get the position of the current node
                    currentNode.pos = Pos.unite(
                            firstNodeToken.pos,
                            this.tokenStream.currentToken().pos
                        );

                    // Update the position of the arguments
                    currentNode.argumentPos = Pos.between(
                            currentNode.argumentPos,
                            this.tokenStream.currentToken().pos
                        );

                    // Move cursor one token right
                    this.tokenStream.nextToken(true);

                    return currentNode;

                } else {

                    //////////////////////////////////////
                    // Case two: There is no right bracket after the left one
                    // Try to parse arguments

                    var currentArgument;

                    for (;;) {
                        // Get an argument, which is an expression
                        currentArgument = this.subparseExpression();

                        // Add an argument as a sub-node.
                        currentNode.subNodes.push(currentArgument);

                        if (this.tokenStream.currentToken().isRightBracket()
                                || this.tokenStream.currentToken().type == TokenType.COMMA
                                || this.tokenStream.currentToken().type == TokenType.SEMICOLON) {
                            // Check if an argument is empty and add an error if so
                            if (currentArgument.type == TreeNodeType.EMPTY) {
                                currentArgument.pos = Pos.between(
                                        this.tokenStream.previousToken().pos,
                                        this.tokenStream.currentToken().pos
                                    );
                                currentNode.hasErrors = true;
                                this.errors.add(new Message(
                                        'e_syn_function_argument_empty',
                                        currentArgument.pos
                                    ));
                            }
                        }

                        // Check for a right bracket
                        if (this.tokenStream.currentToken().isRightBracket()) {
                            // Get the position of the current node
                            currentNode.pos = Pos.unite(
                                    firstNodeToken.pos,
                                    this.tokenStream.currentToken().pos
                                );

                            // Update the position of the arguments
                            currentNode.argumentPos = Pos.between(
                                    currentNode.argumentPos,
                                    this.tokenStream.currentToken().pos
                                );

                            // Skip a bracket and return a node
                            this.tokenStream.nextToken(true);
                            return currentNode;
                        }

                        // Right bracket not found – check for a comma or a semicolon
                        if (this.tokenStream.currentToken().type == TokenType.COMMA
                                || this.tokenStream.currentToken().type == TokenType.SEMICOLON) {
                            // It is an error if it is a semicolon
                            if (this.tokenStream.currentToken().type == TokenType.SEMICOLON) {
                                this.errors.add(new Message(
                                        'e_syn_function_argument_semicolon',
                                        this.tokenStream.currentToken().pos
                                    ));
                                currentNode.hasErrors = true;
                            }
                            // Skip over a comma / semicolon
                            this.tokenStream.nextToken(true);
                            continue;
                        }

                        // Any other token is unexpected here
                        currentNode.hasErrors = true;

                        if (!this.tokenStream.currentToken().isEOF()) {
                            // If the content of the parsed part of the expression
                            // is a single factor, add it as the sub-node for this expression.
                            // This is made for further semantic check of it.
                            if (currentArgument.type == TreeNodeType.SYMBOL
                                    || currentArgument.type == TreeNodeType.NUMBER
                                    || currentArgument.type == TreeNodeType.FUNCTION) {
                                currentArgument = this.wrapNode(currentArgument);
                                currentArgument.hasErrors = true;
                                currentNode.subNodes.pop();
                                currentNode.subNodes.push(currentArgument);
                            }

                            currentArgument.type = TreeNodeType.E_UNPARSED;
                            if (!this.tokenStream.currentToken().isErrorToken()) {
                                this.errors.add(new Message(
                                        'e_syn_function_argument_wrong_symbol',
                                        this.tokenStream.currentToken().pos,
                                        {currentToken: this.tokenStream.currentToken()}
                                    ));
                            }
                        }

                        // Look for the stop-symbol (next right bracket of the
                        // same level or a comma) to continue parsing after it
                        var stopSymbol = this.tokenStream.findNextTokenAtTheSameLevel([
                            TokenType.RB_RIGHT,
                            TokenType.E_SB_RIGHT,
                            TokenType.COMMA,
                            TokenType.SEMICOLON
                        ], true);

                        // A stop symbol was found
                        if (stopSymbol) {
                            currentArgument.pos = Pos.unite(
                                    currentArgument.pos,
                                    this.tokenStream.previousToken().pos
                                );

                            // Continue if a stop-symbol is comma
                            if (stopSymbol.type == TokenType.COMMA) {
                                // Skip a comma
                                this.tokenStream.nextToken(true);
                                continue;
                            }
                            currentNode.pos = Pos.unite(
                                    firstNodeToken.pos,
                                    this.tokenStream.currentToken().pos
                                );
                            this.tokenStream.nextToken(true);

                        // A stop symbol was not found – move to the end of the TokenStream
                        } else {
                            this.tokenStream.lastToken(true);
                            currentNode.pos = Pos.unite(
                                    firstNodeToken.pos,
                                    this.tokenStream.lastToken().pos
                                );
                            this.errors.add(new Message(
                                    'e_syn_missing_rb',
                                    Pos.ending(this.tokenStream.currentToken().pos)
                                ));
                            this.tokenStream.nextToken(true);
                        }

                        // Update the position of the arguments
                        currentNode.argumentPos = Pos.between(
                                currentNode.argumentPos,
                                this.tokenStream.previousToken().pos
                            );
                        return currentNode;
                    }
                }
            } else {

                //////////////////////////
                // Factor is just a symbol
                //////////////////////////

                currentNode.type = TreeNodeType.SYMBOL;
                currentNode.pos = this.tokenStream.currentToken().pos;
                currentNode.name = this.tokenStream.currentToken().value;
                currentNode.nameRaw = this.tokenStream.currentToken().raw;
                this.tokenStream.nextToken(true);

                return currentNode;
            }
        } else if (this.tokenStream.currentToken().isLeftBracket()) {

            //////////////////////////////////////
            // Factor is an expression in brackets
            //////////////////////////////////////

            // Skip left bracket
            this.tokenStream.nextToken(true);

            // Extract an expression inside the brackets
            currentNode = this.subparseExpression();

            // Check for the right bracket
            // -- A Bracket was found
            if (this.tokenStream.currentToken().isRightBracket())
            {
                // Error if expression in brackets is empty
                if (currentNode.type == TreeNodeType.EMPTY && !currentNode.brackets) {
                    this.errors.add(new Message(
                            'e_syn_brackets_empty',
                            Pos.unite(
                                    this.tokenStream.previousToken().pos,
                                    this.tokenStream.currentToken().pos
                                )
                        ));
                    this.hasErrors = true;
                }
                currentNode.brackets = true;
                this.tokenStream.nextToken(true);
                return currentNode;

            // -- Any other token found
            } else {

                // If the content of the parsed part of the expression is a single
                // factor, add it as the sub-node to this expression
                // This is made for further semantic check of it
                if (currentNode.type == TreeNodeType.SYMBOL
                        || currentNode.type == TreeNodeType.NUMBER
                        || currentNode.type == TreeNodeType.FUNCTION) {
                    currentNode = this.wrapNode(currentNode);
                }

                currentNode.hasErrors = true;
                currentNode.type = TreeNodeType.E_UNPARSED;

                if (!this.tokenStream.currentToken().isErrorToken()
                        && !this.tokenStream.currentToken().isEOF()
                        && this.tokenStream.currentToken().type != TokenType.SEMICOLON) {
                    this.errors.add(new Message(
                        'e_syn_brackets_wrong_symbol',
                        this.tokenStream.currentToken().pos,
                        {currentToken : this.tokenStream.currentToken()}
                    ));
                }

                // Look for a stop-symbol (next right bracket of the same level)
                // to continue parsing after it
                let stopSymbol = this.tokenStream.findNextTokenAtTheSameLevel([
                    TokenType.RB_RIGHT,
                    TokenType.E_SB_RIGHT,
                    TokenType.SEMICOLON
                ], true);

                // Stop-symbol was found
                if (stopSymbol) {
                    // A bracket was found
                    if (stopSymbol.isRightBracket()) {
                        currentNode.pos = Pos.unite(
                                firstNodeToken.pos,
                                this.tokenStream.currentToken().pos
                            );
                        this.tokenStream.nextToken(true);
                    // A SEMICOLON was found
                    } else {
                        currentNode.pos = Pos.unite(
                                firstNodeToken.pos,
                                this.tokenStream.previousToken().pos
                            );
                        this.errors.add(
                            new Message('e_syn_missing_rb',
                            Pos.ending(currentNode.pos)
                        ));
                    }
                // A bracket was not found – move to the end of the TokenStream
                } else {
                    this.tokenStream.lastToken(true);
                    currentNode.pos = Pos.unite(
                            firstNodeToken.pos,
                            this.tokenStream.lastToken().pos
                        );
                    this.errors.add(new Message(
                            'e_syn_missing_rb',
                            Pos.ending(currentNode.pos)
                        ));
                    this.tokenStream.nextToken(true);
                }
            }
        }

        //////////////////////
        // Factor is malformed
        //////////////////////

        // Try to unite all unknown tokens into the factor together with numbers and symbols between them
        if (this.tokenStream.currentToken().isErrorToken()
                && !this.tokenStream.currentToken().isMathOperator()
                && !this.tokenStream.currentToken().isRightBracket()) {
            currentNode.type = TreeNodeType.UNPARSED;
            while ((
                        this.tokenStream.currentToken().isErrorToken()
                        && !this.tokenStream.currentToken().isMathOperator()
                    ) || (
                        (this.tokenStream.currentToken().isNumber() || this.tokenStream.currentToken().isSymbol())
                        && this.tokenStream.nextToken().isErrorToken() && !this.tokenStream.nextToken().isMathOperator()
                    )) {
                this.tokenStream.nextToken(true);
            }
            currentNode.pos = Pos.unite(
                    firstNodeToken.pos,
                    this.tokenStream.currentToken().pos
                );
        }

        return currentNode;
    }

    /**
     * Creates a blank tree node.
     * This function helps at the beginning of each subparseXXX function.
     *
     * @returns {TreeNode}
     */
    createEmptyTreeNode() {
        //TODO Add a counter to catch “too long math stuff” error
        /** @type TreeNode */
        var result = new TreeNode();
        if (this.tokenStream.currentToken() == this.tokenStream.firstToken()) {
            result.pos = Pos.between(
                    new Pos(0, 0, 0, 0),
                    this.tokenStream.currentToken().pos
                );
        } else {
            result.pos = Pos.between(
                    this.tokenStream.previousToken().pos,
                    this.tokenStream.currentToken().pos
                );
        }
        return result;
    }

    /**
     * Is used in sub-parsing expressions, terms and powers.
     * Detects empty operands in the entire token stream.
     */
    checkForMissedOperands() {
        this.tokenStream.firstToken(true);
        var previousToken;
        var currentToken;
        var nextToken;

        do {
            currentToken = this.tokenStream.currentToken();

            // The check applies to any mathematical operator in a token stream.
            if (currentToken.isMathOperator() && !currentToken.isErrorToken()) {
                previousToken = this.tokenStream.previousToken();
                nextToken = this.tokenStream.nextToken();

                // Case an operator appears at the beginning of something (except SUBTRACTION sign)
                if (currentToken.type != TokenType.SUBTRACT
                        && (!previousToken || !(previousToken.isMathOperator()
                                || previousToken.isRightBracket()
                                || previousToken.isNumber() || previousToken
                                .isSymbol()))) {
                    this.errors.add(new Message(
                            'e_syn_missing_operand_at_begin',
                            Pos.beginning(this.tokenStream.currentToken().pos),
                            {currentToken : currentToken}
                        ));
                }

                // Case an operator is followed by another operator
                if (nextToken && nextToken.isMathOperator()
                        && !nextToken.isErrorToken()) {
                    this.errors.add(new Message(
                            'e_syn_missing_operand',
                            Pos.between(currentToken.pos, nextToken.pos), {
                                previousToken : currentToken,
                                currentToken : nextToken
                            }
                        ));
                }

                // Case an operator appears at the end of something
                if (!nextToken
                        || !(nextToken.isMathOperator() || nextToken.isNumber()
                                || nextToken.isSymbol() || nextToken
                                .isLeftBracket())
                        && nextToken.type !== TokenType.E_REST) {
                    this.errors.add(new Message(
                            'e_syn_missing_operand_at_end',
                            Pos.between(currentToken.pos, nextToken.pos), {
                                currentToken : currentToken
                            }
                        ));
                }
            }
        } while (this.tokenStream.nextToken(true));
    }

    /**
     * Wraps a node with another node.
     *
     * @param {TreeNode} nodeToBeWrapped
     *        source node
     *
     * @returns {TreeNode}
     */
    wrapNode(nodeToBeWrapped) {
        var wrapperNode = this.createEmptyTreeNode();
        wrapperNode.subNodes = [ nodeToBeWrapped ];
        wrapperNode.pos = nodeToBeWrapped.pos;
        wrapperNode.hasErrors = nodeToBeWrapped.hasErrors;
        return wrapperNode;
    }
}
