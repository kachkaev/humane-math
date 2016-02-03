/**
 * Creates an empty instance of MathTree object
 */
function MathTree() {
    this.reset();
    this.errors = new MathMessageList();
}

MathTree.prototype = {};

// Maximum number of nodes for a tree
MathTree.MAX_NODE_COUNT = 500;

/**
 * Calculates hash for the MathTree to determine whether it was changed or not.
 */
MathTree.prototype.getHash = function() {
    // TODO Implement the method
};

/**
 * Resets MathTree object to default empty state.
 */
MathTree.prototype.reset = function() {
    this.tokenStream = null;
    this.root = null;
};

/**
 * Parses an input stream into a tree of MathTreeNodes
 * 
 * @param {Object}
 *        tokenStream input Token Stream of a tree
 * @return {Boolean} true if the tree was changed.
 */
MathTree.prototype.parse = function(tokenStream) {
    this.reset();
    this.errors.clear();

    this.tokenStream = tokenStream;

    // Check for missed operands between operators.
    // This check is separated because actual parsing ignores errors at token
    // some sequences,
    // e.g. MINUS PLUS in order to collect as much more errors as possible.
    this.checkForMissedOperands();

    // Moving token stream cursor to the first position.
    this.tokenStream.firstToken(true);

    // Parsing the distinguished symbol of the grammar.
    this.root = this.subparseStatementSequence();

    // Checking if an end of Token Stream was reached.
    if (this.tokenStream.currentToken().type != MathTokenType.EOF) {
        this.errors.add(new MathMessage("e_syn_unknown", this.tokenStream
                .currentToken().pos));
        Logger.log("warning", "Unknown syntax error! "
                + $.dump(this.tokenStream.currentToken()));
    }

    // For now function always returns true.
    return true;
};

/**
 * Parses a sequence of statements which is "statement [SEMICOLON statement...]"
 */
MathTree.prototype.subparseStatementSequence = function() {
    /** @type MathTreeNode */
    var currentNode = this.createEmptyTreeNode();
    var firstNodeToken = this.tokenStream.currentToken();

    // Extracting the first possible subnode (statement)
    var currentSubNode = this.subparseStatement();

    // //////////////////////////////
    // Expression matches a pattern statement [SEMICOLON statement ...]
    // //////////////////////////////
    currentNode.subNodes = [];
    currentNode.subActions = [];
    currentNode.type = MathTreeNodeType.SEQUENCE_OF_STATEMENTS;

    // Running till EOF to get all possible errors and statements.
    while (!this.tokenStream.currentToken().isEOF()) {
        // If The statement separator is semicolon (or a comma, which is an
        // error)
        if (this.tokenStream.currentToken().type == MathTokenType.SEMICOLON
                || this.tokenStream.currentToken().type == MathTokenType.COMMA) {
            // Adding subaction (semicolon or comma position must be kept)
            currentNode.subActions.push(this.tokenStream.currentToken());

            // If a separator is a comma, report an error.
            if (this.tokenStream.currentToken().type == MathTokenType.COMMA)
                this.errors.add(new MathMessage("e_syn_statements_comma",
                        this.tokenStream.currentToken().pos));

        }
        // If any other token found on the way.
        else {
            // If error token found on the way,
            // just skipping to the next semicolon or to the end of the stream.
            // Otherwise add an error.

            // Case 1. Right bracket found.
            if (this.tokenStream.currentToken().isRightBracket())
                this.errors.add(new MathMessage("e_syn_extra_rb",
                        this.tokenStream.currentToken().pos, {
                            currentToken : this.tokenStream.currentToken()
                        }));
            // Case 2. Non-error token found.
            else if (!this.tokenStream.currentToken().isErrorToken())
                this.errors.add(new MathMessage(
                        "e_syn_statements_wrong_symbol", this.tokenStream
                                .currentToken().pos, {
                            currentToken : this.tokenStream.currentToken()
                        }));
            // Case 3. Any other token found.
            // Do nothing.

            // Skipping to the next SEMICOLON or to the end of the stream or to
            // the last token
            if (!this.tokenStream.findNextToken([ MathTokenType.SEMICOLON ],
                    true))
                this.tokenStream.lastToken(true);
            else {
                // Adding subaction (semicolon position must be kept)
                currentNode.subActions.push(this.tokenStream.currentToken());
                this.tokenStream.previousToken(true);
            }

            // If the content of the parsed part of the expression is a single
            // factor, adding it as the subnode for this expression.
            // This is made for further semantic check of it.
            if (currentSubNode.type == MathTreeNodeType.SYMBOL
                    || currentSubNode.type == MathTreeNodeType.NUMBER
                    || currentSubNode.type == MathTreeNodeType.FUNCTION)
                currentSubNode = this.wrapNode(currentSubNode);

            currentSubNode.type = MathTreeNodeType.E_UNPARSED;
            currentSubNode.hasErrors = true;

            currentSubNode.pos = MathPos.unite(currentSubNode.pos,
                    this.tokenStream.currentToken().pos);
            if (this.tokenStream.currentToken() != this.tokenStream.lastToken())
                this.tokenStream.nextToken(true);
        }
        // Moving forward.
        this.tokenStream.nextToken(true);
        currentNode.subNodes.push(currentSubNode);
        currentSubNode = this.subparseStatement();
    }
    currentNode.subNodes.push(currentSubNode);

    // //////////////////////////////
    // Sequence is just a single statement
    // //////////////////////////////
    if (currentNode.subNodes.length == 1 || currentNode.subActions.length == 0)
        return currentNode.subNodes[0];

    // Removing empty subnode after the last semicolon
    if (currentNode.subNodes[currentNode.subNodes.length - 1].isEmpty())
        delete currentNode.subNodes[currentNode.subNodes.length - 1];

    // Getting the position of the current node
    currentNode.pos = MathPos.unite(firstNodeToken.pos, this.tokenStream
            .currentToken().pos);

    return currentNode;
};

/**
 * Parses a statement, which is a "expression
 * [(EQUAL|LESS|MORE|MORE_EQUAL|LESS_EQUAL) expression]"
 */
MathTree.prototype.subparseStatement = function() {
    // A statement can consist of one or two parts only.

    var currentNode = this.createEmptyTreeNode();
    var firstNodeToken = this.tokenStream.currentToken();

    var leftPart = this.subparseExpression();
    var rightPart = null;
    var statementSign = null;

    // /////////////////////////////////
    // Statement is expression (EQUAL|LESS|MORE|MORE_EQUAL|LESS_EQUAL) whatever
    // /////////////////////////////////
    if (this.tokenStream.currentToken().isStatementSign()) {
        // Saving the sign and parsing the right part.
        statementSign = this.tokenStream.currentToken();
        this.tokenStream.nextToken(true);
        rightPart = this.subparseExpression();

        // Checking parts for emptiness.
        if (leftPart.isEmpty())
            this.errors.add(new MathMessage("e_syn_statement_empty_left",
                    leftPart.pos, {
                        currentToken : statementSign
                    }));
        if (rightPart.isEmpty())
            this.errors.add(new MathMessage("e_syn_statement_empty_right",
                    rightPart.pos, {
                        currentToken : statementSign
                    }));

        // Adding left part and right part as node subnodes.
        currentNode.subNodes = [ leftPart, rightPart ];
        currentNode.subActions = Array(statementSign);
        currentNode.type = MathTreeNodeType.STATEMENT;

        // //////////////////////////////////////
        // Depending on what is in the left and the right parts defining a
        // subtype
        switch (statementSign.type) {
        // The statement is an inequality.
        case MathTokenType.LESS:
        case MathTokenType.MORE:
        case MathTokenType.LESS_EQUAL:
        case MathTokenType.MORE_EQUAL:
            currentNode.subType = MathTreeNodeType.STATEMENT_INEQUALITY;
            break;

        // The statement is something separated with an EQUAL sign
        // TODO: detect STATEMENT_DEFINITION_VARIABLE,
        // STATEMENT_DEFINITION_FUNCTION
        default:
            currentNode.subType = MathTreeNodeType.STATEMENT_EQUATION;
            break;
        }

        // Checking if there are any other statement signs (which is an error)
        while (this.tokenStream.currentToken().isStatementSign()) {
            currentNode.hasErrors = true;

            this.errors.add(new MathMessage(
                    "e_syn_statement_extra_statement_sign", this.tokenStream
                            .currentToken().pos, {
                        currentToken : this.tokenStream.currentToken(),
                        statementSign : statementSign
                    }));

            currentNode.subActions.push(this.tokenStream.currentToken());
            this.tokenStream.nextToken(true);
            currentNode.subNodes.push(this.subparseExpression());
        }

        currentNode.pos = MathPos.unite(firstNodeToken.pos, this.tokenStream
                .previousToken().pos);
        return currentNode;
    }

    // /////////////////////////////////
    // Statement is just a single expression
    // /////////////////////////////////
    else {
        return leftPart;
    }
};

/**
 * Parses an expression, which is a "term [(ADD|SUBTRACT) term [(ADD|SUBTRACT)
 * term ...]]"
 * 
 * @return {MathTreeNode}
 */
MathTree.prototype.subparseExpression = function() {
    var currentNode = this.createEmptyTreeNode();
    var firstNodeToken = this.tokenStream.currentToken();

    // Extracting the first possible subnode (term)
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
    currentNode.subActions = Array();
    currentNode.type = MathTreeNodeType.EXPRESSION;

    while (this.tokenStream.currentToken().isExpressionSign()) {
        // Adding subaction.
        currentNode.subActions.push(this.tokenStream.currentToken());

        // If a child is empty and it is not the first term parsed, mark node as
        // one with errors.
        if (currentSubNode.isEmpty() && currentNode.subNodes.length != 1)
            currentNode.hasErrors = true;

        // Moving forward.
        this.tokenStream.nextToken(true);
        currentSubNode = this.subparseTerm();
        currentNode.subNodes.push(currentSubNode);
    }

    // If any of subnodes contains errors, mark a node as the one with error.
    _.each(currentNode.subNodes, function(subNode) {
        if (subNode.hasErrors) {
            currentNode.hasErrors = true;
            _.breakLoop();
        }
    });

    // Working out case SUBTRACT term. Replacing first empty subnode with number
    // (0)
    if (currentNode.subNodes[0].isEmpty()) {
        if (currentNode.subActions[0].type == MathTokenType.SUBTRACT) {
            currentNode.subNodes[0].type = MathTreeNodeType.NUMBER;
            currentNode.subNodes[0].value = 0;
        } else {
            currentNode.hasErrors = true;
        }
    }

    // Getting the position of the current node
    currentNode.pos = MathPos.unite(firstNodeToken.pos, this.tokenStream
            .previousToken().pos);

    return currentNode;
};

/**
 * Parses a term, which is a "power [(MULTIPLY/DIVIDE) power [(MULTIPLY/DIVIDE)
 * power ...]]"
 */
MathTree.prototype.subparseTerm = function() {
    var currentNode = this.createEmptyTreeNode();
    var firstNodeToken = this.tokenStream.currentToken();
    currentNode.type = MathTreeNodeType.TERM;

    // Extracting the first possible subnode (power)
    var currentSubNode = this.subparsePower();

    // ///////////////////////////////////////////////////////////
    // Term matches a pattern power(MULTIPLY|DIVIDE|)power [...]
    // ///////////////////////////////////////////////////////////
    currentNode.subNodes = [ currentSubNode ];
    currentNode.subActions = Array();

    for (;;) {
        // If the next token is a (MULTIPLY|DIVIDE) or any error token but those
        // that subdivide statements
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
        }

        // Checking the case of missing sign MULTIPLE, e.g NUMBER SYMBOL or
        // NUMBER LB
        else if (this.tokenStream.currentToken().isNumber()
                || this.tokenStream.currentToken().isLeftBracket()
                || this.tokenStream.currentToken().isSymbol()) {
            // It is still not an error in case NUMBER SYMBOL or NUMBER LB or
            // the previous token is an error token.
            if (this.tokenStream.previousToken().isNumber()
                    && (this.tokenStream.currentToken().isSymbol() || this.tokenStream
                            .currentToken().isLeftBracket())) {
            } else {
                currentNode.hasErrors = true;

                // An error will show up only if the previous token is not an
                // error token or any number token
                if (!(this.tokenStream.previousToken().isErrorToken() && !this.tokenStream
                        .previousToken().isMathOperator())
                        || this.tokenStream.previousToken().isNumber())
                    this.errors.add(new MathMessage("e_syn_missing_multiply",
                            MathPos.between(
                                    this.tokenStream.previousToken().pos,
                                    this.tokenStream.currentToken().pos), {
                                previousToken : this.tokenStream
                                        .previousToken()
                                        .cloneWithCorrectedType(),
                                currentToken : this.tokenStream.currentToken()
                                        .cloneWithCorrectedType()
                            }));
            }

            var pseudoMultiplyToken = new MathToken(MathTokenType.MULTIPLY);
            pseudoMultiplyToken.pos = MathPos.between(this.tokenStream
                    .previousToken().pos, this.tokenStream.currentToken().pos);

            currentNode.subActions.push(pseudoMultiplyToken);
            currentSubNode = this.subparsePower();
            currentNode.subNodes.push(currentSubNode);
        }
        // If any error token found, use it to split subnodes and parse further
        // nodes.
        else
            break;
    }

    // /////////////////////////////
    // Term is a single power (only one subnode found)
    // /////////////////////////////
    if (currentNode.subNodes.length == 1) {
        return currentNode.subNodes[0];
    }

    // If any of subnodes is empty or contains error, mark a node as the one
    // with error.
    _.each(currentNode.subNodes, function(subNode) {
        if (subNode.hasErrors || subNode.type == MathTreeNodeType.EMPTY) {
            currentNode.hasErrors = true;
            _.breakLoop();
        }
    });

    // Getting the position of the current node
    currentNode.pos = MathPos.unite(firstNodeToken.pos, this.tokenStream
            .previousToken().pos);

    currentNode.type = MathTreeNodeType.TERM;
    return currentNode;
};

/**
 * Parses a power, which is a "factor [(POWER) factor [(POWER) factor ...]]"
 */
MathTree.prototype.subparsePower = function() {
    var currentNode = this.createEmptyTreeNode();
    var firstNodeToken = this.tokenStream.currentToken();

    // Extracting the first possible subnode (power)
    var currentSubNode = this.subparseFactor();

    // ////////////////////////////
    // Power is just a single factor
    // ////////////////////////////
    if (!this.tokenStream.currentToken().isPowerSign()) {
        return currentSubNode;
    }
    // ///////////////////////////////////////////////////////////
    // Power matches a pattern factor (POWER) factor [(POWER)factor) ...]
    // ///////////////////////////////////////////////////////////
    currentNode.subNodes = [ currentSubNode ];
    currentNode.subActions = Array();

    while (this.tokenStream.currentToken().isPowerSign()) {
        currentNode.subActions.push(this.tokenStream.currentToken().type);

        this.tokenStream.nextToken(true);
        currentSubNode = this.subparseFactor();
        currentNode.subNodes.push(currentSubNode);
    }

    // If any of subnodes is empty or contains error, mark a node as the one
    // with error.
    _.each(currentNode.subNodes, function(subNode) {
        if (subNode.hasErrors || subNode.type == MathTreeNodeType.EMPTY) {
            currentNode.hasErrors = true;
            _.breakLoop();
        }
    });

    // Getting the position of the current node
    currentNode.pos = MathPos.unite(firstNodeToken.pos, this.tokenStream
            .previousToken().pos);

    currentNode.type = MathTreeNodeType.POWER;
    return currentNode;
};

/**
 * Parses a factor, which can be a number, a symbol, a function (symbol with the
 * following left bracket) or an expression in braces.
 * 
 * @return {MathTreeNode}
 */
MathTree.prototype.subparseFactor = function() {
    /** @type MathTreeNode */
    var currentNode = this.createEmptyTreeNode();
    var firstNodeToken = this.tokenStream.currentToken();

    // Depending on the type of a token, parsing a factor differently
    if (firstNodeToken.isNumber()) {
        // ///////////////////
        // Factor is a Number
        // ///////////////////

        currentNode.type = MathTreeNodeType.NUMBER;
        currentNode.pos = this.tokenStream.currentToken().pos;
        currentNode.value = this.tokenStream.currentToken().value;
        this.tokenStream.nextToken(true);

        return currentNode;

    } else if (firstNodeToken.type == MathTokenType.SYMBOL) // Factor is a
    // function or a
    // symbol
    {
        // Checking a left bracket after the symbol
        if (this.tokenStream.nextToken().isLeftBracket()) {
            // /////////////////////
            // Factor is a function
            // /////////////////////

            currentNode.type = MathTreeNodeType.FUNCTION;
            currentNode.name = this.tokenStream.currentToken().value;
            currentNode.namePos = this.tokenStream.currentToken().pos;
            currentNode.nameRaw = this.tokenStream.currentToken().raw;
            currentNode.subNodes = Array();

            // Skipping over a left bracket and remembering the position of the
            // beginning of the arguments.
            this.tokenStream.nextToken(true);
            currentNode.argumentPos = MathPos.ending(this.tokenStream
                    .currentToken().pos);
            this.tokenStream.nextToken(true);

            // Parsing arguments
            if (this.tokenStream.currentToken().isRightBracket()) {
                // ////////////////////////////////////
                // Case one: Function has no arguments

                // Getting the position of the current node.
                currentNode.pos = MathPos.unite(firstNodeToken.pos,
                        this.tokenStream.currentToken().pos);

                // Updating the position of the arguments.
                currentNode.argumentPos = MathPos.between(
                        currentNode.argumentPos, this.tokenStream
                                .currentToken().pos);

                // Moving cursor one token right
                this.tokenStream.nextToken(true);

                return currentNode;
            } else {
                // ////////////////////////////////////
                // Case two: There is no right bracket after the left one.
                // Trying to parse arguments.

                /** @type MathTreeNode */
                var currentArgument;

                for (;;) {
                    // Getting an argument, which is an expression
                    currentArgument = this.subparseExpression();

                    // Adding an argument as a subnode.
                    currentNode.subNodes.push(currentArgument);

                    if (this.tokenStream.currentToken().isRightBracket()
                            || this.tokenStream.currentToken().type == MathTokenType.COMMA
                            || this.tokenStream.currentToken().type == MathTokenType.SEMICOLON) {
                        // Checking if an argument is empty and adding an error
                        // if so.
                        if (currentArgument.type == MathTreeNodeType.EMPTY) {
                            currentArgument.pos = MathPos.between(
                                    this.tokenStream.previousToken().pos,
                                    this.tokenStream.currentToken().pos);
                            currentNode.hasErrors = true;
                            this.errors.add(new MathMessage(
                                    "e_syn_funcion_argument_empty",
                                    currentArgument.pos));
                        }
                    }

                    // Checking for a right bracket.
                    if (this.tokenStream.currentToken().isRightBracket()) {
                        // Getting the position of the current node.
                        currentNode.pos = MathPos.unite(firstNodeToken.pos,
                                this.tokenStream.currentToken().pos);

                        // Updating the position of the arguments.
                        currentNode.argumentPos = MathPos.between(
                                currentNode.argumentPos, this.tokenStream
                                        .currentToken().pos);

                        // Skipping a bracket and returning a node.
                        this.tokenStream.nextToken(true);
                        return currentNode;
                    }

                    // Right bracket not found. Checking for a comma or a
                    // semicolon.
                    if (this.tokenStream.currentToken().type == MathTokenType.COMMA
                            || this.tokenStream.currentToken().type == MathTokenType.SEMICOLON) {
                        // It is an error if it is a semicolon.
                        if (this.tokenStream.currentToken().type == MathTokenType.SEMICOLON) {
                            this.errors.add(new MathMessage(
                                    "e_syn_funcion_argument_semicolon",
                                    this.tokenStream.currentToken().pos));
                            currentNode.hasErrors = true;
                        }
                        // Skipping over a comma / semicolon.
                        this.tokenStream.nextToken(true);
                        continue;
                    }

                    // Any other token is unexpected here.
                    currentNode.hasErrors = true;
                    // currentArgument.hasErrors = true;
                    if (!this.tokenStream.currentToken().isEOF()) {
                        // If the content of the parsed part of the expression
                        // is a single factor, adding it as the subnode for this
                        // expression.
                        // This is made for further semantic check of it.
                        if (currentArgument.type == MathTreeNodeType.SYMBOL
                                || currentArgument.type == MathTreeNodeType.NUMBER
                                || currentArgument.type == MathTreeNodeType.FUNCTION) {
                            currentArgument = this.wrapNode(currentArgument);
                            currentArgument.hasErrors = true;
                            currentNode.subNodes.pop();
                            currentNode.subNodes.push(currentArgument);

                        }

                        currentArgument.type = MathTreeNodeType.E_UNPARSED;
                        if (!this.tokenStream.currentToken().isErrorToken())
                            this.errors.add(new MathMessage(
                                    "e_syn_funcion_argument_wrong_symbol",
                                    this.tokenStream.currentToken().pos, {
                                        currentToken : this.tokenStream
                                                .currentToken()
                                    }));
                    }

                    // Looking for the stop-symbol (next right bracket of the
                    // same level or a comma) to continue parsing after it.
                    var stopSymbol = this.tokenStream
                            .findNextTokenAtTheSameLevel([
                                    MathTokenType.RB_RIGHT,
                                    MathTokenType.E_SB_RIGHT,
                                    MathTokenType.COMMA,
                                    MathTokenType.SEMICOLON ], true);
                    if (stopSymbol) // A stop-symbol was found
                    {
                        currentArgument.pos = MathPos.unite(
                                currentArgument.pos, this.tokenStream
                                        .previousToken().pos);

                        // Continue if a stop-symbol is comma
                        if (stopSymbol.type == MathTokenType.COMMA) {
                            // Skipping over a comma.
                            this.tokenStream.nextToken(true);
                            continue;
                        }
                        currentNode.pos = MathPos.unite(firstNodeToken.pos,
                                this.tokenStream.currentToken().pos);
                        this.tokenStream.nextToken(true);
                    } else // A stop symbol was not found. Moving to the end of
                    // the TokenStream.
                    {
                        this.tokenStream.lastToken(true);
                        currentNode.pos = MathPos.unite(firstNodeToken.pos,
                                this.tokenStream.lastToken().pos);
                        this.errors
                                .add(new MathMessage("e_syn_missing_rb",
                                        MathPos.ending(this.tokenStream
                                                .currentToken().pos)));
                        this.tokenStream.nextToken(true);
                    }

                    // Updating the position of the arguments.
                    currentNode.argumentPos = MathPos.between(
                            currentNode.argumentPos, this.tokenStream
                                    .previousToken().pos);
                    return currentNode;
                }
            }
        } else {
            // ////////////////////////
            // Factor is just a symbol
            // ////////////////////////

            currentNode.type = MathTreeNodeType.SYMBOL;
            currentNode.pos = this.tokenStream.currentToken().pos;
            currentNode.name = this.tokenStream.currentToken().value;
            currentNode.nameRaw = this.tokenStream.currentToken().raw;
            this.tokenStream.nextToken(true);

            return currentNode;
        }
    }

    else if (this.tokenStream.currentToken().isLeftBracket()) {
        // ////////////////////////////////////
        // Factor is an expression in brackets
        // ////////////////////////////////////

        // Skipping left bracket
        this.tokenStream.nextToken(true);

        // Extracting an expression from the inside of the brackets
        currentNode = this.subparseExpression();

        // Checking for the right bracket
        if (this.tokenStream.currentToken().isRightBracket()) // A Bracket was
        // found
        {
            // Error if expression in brackets is empty.
            if (currentNode.type == MathTreeNodeType.EMPTY
                    && !currentNode.brackets) {
                this.errors.add(new MathMessage("e_syn_brackets_empty", MathPos
                        .unite(this.tokenStream.previousToken().pos,
                                this.tokenStream.currentToken().pos)));
                this.hasErrors = true;
            }
            currentNode.brackets = true;
            this.tokenStream.nextToken(true);
            return currentNode;
        } else // Any other token found.
        {
            // If the content of the parsed part of the expression is a single
            // factor, adding it as the subnode for this expression.
            // This is made for further semantic check of it.
            if (currentNode.type == MathTreeNodeType.SYMBOL
                    || currentNode.type == MathTreeNodeType.NUMBER
                    || currentNode.type == MathTreeNodeType.FUNCTION)
                currentNode = this.wrapNode(currentNode);

            currentNode.hasErrors = true;
            currentNode.type = MathTreeNodeType.E_UNPARSED;

            if (!this.tokenStream.currentToken().isErrorToken()
                    && !this.tokenStream.currentToken().isEOF()
                    && this.tokenStream.currentToken().type != MathTokenType.SEMICOLON)
                this.errors.add(new MathMessage("e_syn_brackets_wrong_symbol",
                        this.tokenStream.currentToken().pos, {
                            currentToken : this.tokenStream.currentToken()
                        }));

            // Looking for the stop-symbol (next right bracket of the same
            // level) to continue parsing after it.
            var stopSymbol = this.tokenStream.findNextTokenAtTheSameLevel([
                    MathTokenType.RB_RIGHT, MathTokenType.E_SB_RIGHT,
                    MathTokenType.SEMICOLON ], true);
            if (stopSymbol) // Stop-symbol was found.
            {
                if (stopSymbol.isRightBracket()) // A bracket was found
                {
                    currentNode.pos = MathPos.unite(firstNodeToken.pos,
                            this.tokenStream.currentToken().pos);
                    this.tokenStream.nextToken(true);
                } else // A SEMICOLON was found.
                {
                    currentNode.pos = MathPos.unite(firstNodeToken.pos,
                            this.tokenStream.previousToken().pos);
                    this.errors.add(new MathMessage("e_syn_missing_rb", MathPos
                            .ending(currentNode.pos)));
                }
            } else // A bracket was not found. Moving to the end of the
            // TokenStream.
            {
                this.tokenStream.lastToken(true);
                currentNode.pos = MathPos.unite(firstNodeToken.pos,
                        this.tokenStream.lastToken().pos);
                this.errors.add(new MathMessage("e_syn_missing_rb", MathPos
                        .ending(currentNode.pos)));
                this.tokenStream.nextToken(true);
            }
        }
    }

    // ////////////////////////////////////////
    // Factor is malformed
    // ////////////////////////////////////////

    // Trying to unite all unknown tokens into the factor together with numbers
    // and symbols between them
    if ((this.tokenStream.currentToken().isErrorToken()
            && !this.tokenStream.currentToken().isMathOperator() && !this.tokenStream
            .currentToken().isRightBracket())) {
        currentNode.type = MathTreeNodeType.UNPARSED;
        while ((this.tokenStream.currentToken().isErrorToken() && !this.tokenStream
                .currentToken().isMathOperator())
                || ((this.tokenStream.currentToken().isNumber() || this.tokenStream
                        .currentToken().isSymbol())
                        && this.tokenStream.nextToken().isErrorToken() && !this.tokenStream
                        .nextToken().isMathOperator())) {
            this.tokenStream.nextToken(true);
        }
        currentNode.pos = MathPos.unite(firstNodeToken.pos, this.tokenStream
                .currentToken().pos);
    }

    return currentNode;
};

/**
 * Creates a blank tree node. This function helps to avoid some routine at the
 * beginning of each subparseXXX function.
 * 
 * @return {MathTreeNode}
 */
MathTree.prototype.createEmptyTreeNode = function() {
    // TODO Add a counter to catch “too long math stuff” error.
    /** @type MathTreeNode */
    var result = new MathTreeNode();
    if (this.tokenStream.currentToken() == this.tokenStream.firstToken())
        result.pos = MathPos.between(new MathPos(0, 0, 0, 0), this.tokenStream
                .currentToken().pos);
    else
        result.pos = MathPos.between(this.tokenStream.previousToken().pos,
                this.tokenStream.currentToken().pos);
    return result;
};

/**
 * Is used in subparsing expressions, terms and powers. Detects empty operands
 * in the entire token stream.
 * 
 * @param {Object}
 *        currentSubNode
 */
MathTree.prototype.checkForMissedOperands = function() {
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

            // Case an operator appears at the beginning of something (except
            // SUBTRACTION sign).
            if (currentToken.type != MathTokenType.SUBTRACT
                    && (!previousToken || !(previousToken.isMathOperator()
                            || previousToken.isRightBracket()
                            || previousToken.isNumber() || previousToken
                            .isSymbol()))) {
                this.errors.add(new MathMessage(
                        "e_syn_missing_operand_at_begin",
                        MathPos.beginning(this.tokenStream.currentToken().pos),
                        {
                            currentToken : currentToken
                        }));
            }

            // Case an operator is followed by another operator.
            if (nextToken && nextToken.isMathOperator()
                    && !nextToken.isErrorToken()) {
                this.errors.add(new MathMessage("e_syn_missing_operand",
                        MathPos.between(currentToken.pos, nextToken.pos), {
                            previousToken : currentToken,
                            currentToken : nextToken
                        }));
            }

            // Case an operator appears at the end of something.
            if (!nextToken
                    || !(nextToken.isMathOperator() || nextToken.isNumber()
                            || nextToken.isSymbol() || nextToken
                            .isLeftBracket())
                    && nextToken.type !== MathTokenType.E_REST) {
                this.errors.add(new MathMessage("e_syn_missing_operand_at_end",
                        MathPos.between(currentToken.pos, nextToken.pos), {
                            currentToken : currentToken
                        }));
            }
        }
    } while (this.tokenStream.nextToken(true));
};

/**
 * Wraps a node with another node.
 * @return {MathTreeNode}
 */
MathTree.prototype.wrapNode = function(nodeToBeWrapped) {
    /** @type MathTreeNode */
    var wrapperNode = this.createEmptyTreeNode();
    wrapperNode.subNodes = [ nodeToBeWrapped ];
    wrapperNode.pos = nodeToBeWrapped.pos;
    wrapperNode.hasErrors = nodeToBeWrapped.hasErrors;
    return wrapperNode;
};