/**
 * Creates an empty instance of MathTokenStream.
 * 
 * @classDescription MathTokenStream provides tokenization of an input string.
 * @constructor
 */
function MathTokenStream() {
    this.reset();
    this.errors = new MathMessageList();
};

MathTokenStream.prototype = {};

// Maximum size of the token stream
MathTokenStream.MAX_TOKEN_COUNT = 500;

// List of characters that should be interpreted as spaces.
MathTokenStream.WHITESPACE = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
MathTokenStream.TOKEN_FOUND_EXCEPTION = 42;

// Regular expressions used during tokenization.
MathTokenStream.RE_NUMBER = /^[0-9]+(\.[0-9]+)?/;
MathTokenStream.RE_SYMBOL = /^[a-zA-Zа-яА-ЯёЁα-ωΑ-Ω][a-zA-Zа-яА-ЯёЁα-ωΑ-Ω0-9]*/;
MathTokenStream.RE_E_NUMBER_MALFORMED = /^(\.[0-9]+|[0-9]+(\.[0-9]+){2,}|([0-9]+\.([^0-9]|$)))/;
MathTokenStream.RE_E_NUMBER_EXPONENTIAL = /^[0-9]+(\.[0-9]+)?[EeЕе][+-]?[0-9]+/;

/**
 * Calculates hash for the MathTokenStream to determine whether it was changed
 * or not.
 * 
 * @memberOf MathTokenStream
 * @return {String}
 * @method
 */
MathTokenStream.prototype.getHash = function() {
    var hash = '';
    for ( var i = this.tokens.length - 1; i >= 0; i--) {
        hash = this.tokens[i].getHash() + hash;
    }
    ;
    return hash;
};

/**
 * Resets MathTokenStream object to default empty state.
 */
MathTokenStream.prototype.reset = function() {
    this.raw = null;
    this.tokens = [];
    this.cursorPos = 0;
};

/**
 * Skips spaces during tokenizing and recalculates the position of the cursor.
 */
MathTokenStream.prototype.skipSpaces = function() {
    for ( var i = 0; i < this.temp.raw.length; i++) {
        if (this.temp.raw.charAt(i) == '\n') {
            this.temp.row++;
            this.temp.pos++;
            this.temp.col = 0;
        } else {
            if (MathTokenStream.WHITESPACE.indexOf(this.temp.raw.charAt(i)) === -1) {
                this.temp.raw = this.temp.raw.substring(i);
                break;
            }
            this.temp.col++;
            this.temp.pos++;
        }
    }
};

/**
 * Adds token into the list of tokens.
 * 
 * @param {Object}
 *        type Type of a Token (among MathTokeType.*).
 * @param {Object}
 *        length Length of new token.
 * @param {Object}
 *        value (optional) Evaluated value of a token (for symbols and numbers).
 * @param {Boolean}
 *        dontThrowException (optional) if is set to true, no
 *        TOKEN_FOUND_EXCEPTION is thrown.
 */
MathTokenStream.prototype.addToken = function(type, length, value,
        dontThrowException) {
    this.tokens.push(new MathToken(type, this.temp.col, this.temp.row,
            this.temp.pos, this.temp.raw.substring(0, length), value));
    this.temp.pos += length;
    this.temp.col += length;
    this.temp.raw = this.temp.raw.substring(length);
    if (!dontThrowException)
        throw MathTokenStream.TOKEN_FOUND_EXCEPTION;
};
/**
 * 
 * @param {String}
 *        newRaw New raw string to be tokenized
 * 
 * @return true if a stream of tokens changed since the last tokenization
 */
MathTokenStream.prototype.tokenize = function(newRaw) {
    // Basic check for changes
    if (newRaw === this.raw)
        return false;

    // Basic check failed. Tokenize the string then.
    this.reset();
    this.raw = newRaw;

    // Initializing some temporary data needed while tokenization.
    this.temp = {};
    this.temp.raw = _.rtrim(newRaw);
    this.temp.pos = 0;
    this.temp.col = 0;
    this.temp.row = 0;

    // Getting tokens in a loop
    for ( var i = MathTokenStream.MAX_TOKEN_COUNT; i >= 0; i--) {

        this.skipSpaces();

        // Exit if reached an end of the input string.
        if (this.temp.raw == '')
            break;

        // Extracting a token from the beginning of an input string.
        try {
            // // Compound tokens (part 1, see 2nd part after all simple
            // tokens).
            // Compound “Less or Equal” or “More or Equal” (≤ and ≥ are listed
            // further)
            if (this.temp.raw.charAt(0) == '<'
                    || this.temp.raw.charAt(0) == '>') {
                var searchString = _.ltrim(this.temp.raw.substr(1));
                if (searchString.charAt(0) == '=')
                    this
                            .addToken(
                                    (this.temp.raw.charAt(0) == '<') ? MathTokenType.LESS_EQUAL
                                            : MathTokenType.MORE_EQUAL,
                                    this.temp.raw.length - searchString.length
                                            + 1);
            }
            // Error: use of ==
            if (this.temp.raw.charAt(0) == '=') {
                var searchString = _.ltrim(this.temp.raw.substr(1));
                if (searchString.charAt(0) == '=')
                    this.addToken(MathTokenType.E_EQUALEQUAL,
                            this.temp.raw.length - searchString.length + 1);
            }
            ;
            // Error: Use of ** for power instead of ^
            if (this.temp.raw.charAt(0) == '*') {
                var searchString = _.ltrim(this.temp.raw.substr(1));
                if (searchString.charAt(0) == '*')
                    this.addToken(MathTokenType.E_STARSTAR,
                            this.temp.raw.length - searchString.length + 1);
            }
            ;

            // // Simple tokens
            // //// 1 char long
            switch (this.temp.raw.charAt(0)) { // break is not used here as
            // addToken throws
            // MathTokenStream.TOKEN_FOUND_EXCEPTION
            // Left bracket
            case '(':
                this.addToken(MathTokenType.RB_LEFT, 1);
                // Right bracket
            case ')':
                this.addToken(MathTokenType.RB_RIGHT, 1);
                // Comma
            case ',':
                this.addToken(MathTokenType.COMMA, 1);
                // Semicolon
            case ';':
                this.addToken(MathTokenType.SEMICOLON, 1);
                // Equal
            case '=':
                this.addToken(MathTokenType.EQUAL, 1);
                // Less
            case '<':
                this.addToken(MathTokenType.LESS, 1);
                // More
            case '>':
                this.addToken(MathTokenType.MORE, 1);
                // Less or Equal
            case '≤':
                this.addToken(MathTokenType.LESS, 1);
                // More or Equal
            case '≥':
                this.addToken(MathTokenType.MORE, 1);
                // Add
            case '+':
                this.addToken(MathTokenType.ADD, 1);
                // Subtract
            case '-':
            case '—':
            case '−':
            case '–':
            case '―':
                this.addToken(MathTokenType.SUBTRACT, 1);
                // Multiply
            case '*':
            case '×':
            case '·':
                this.addToken(MathTokenType.MULTIPLY, 1);
                // Divide
            case '/':
            case '÷':
                this.addToken(MathTokenType.DIVIDE, 1);
                // Power
            case '^':
                this.addToken(MathTokenType.POWER, 1);
                // Error: Use of right square bracket
            case '[':
                this.addToken(MathTokenType.E_SB_LEFT, 1);
                // Error: Use of left square bracket
            case ']':
                this.addToken(MathTokenType.E_SB_RIGHT, 1);
                // Error: Use of right curly bracket
            case '{':
                this.addToken(MathTokenType.E_CB_LEFT, 1);
                // Error: Use of left curly bracket
            case '}':
                this.addToken(MathTokenType.E_CB_RIGHT, 1);
                // Error: Use of right angle bracket
            case '⟨':
                this.addToken(MathTokenType.E_AB_LEFT, 1);
                // Error: Use of left angle bracket
            case '⟩':
                this.addToken(MathTokenType.E_AB_RIGHT, 1);
                // Error: Use of a vertical slash to get an absolute value
            case '|':
                this.addToken(MathTokenType.E_VERTICAL_SLASH, 1);
                // Error: Use of a back slash to divide
            case '\\':
                this.addToken(MathTokenType.E_BACK_SLASH, 1);
            }

            // // Compound tokens (part 2, see 1st right after “try”).
            var match;

            // Symbol
            match = this.temp.raw.match(MathTokenStream.RE_SYMBOL);
            if (match)
                this.addToken(MathTokenType.SYMBOL, match[0].length, match[0]
                        .toLowerCase());

            // Error: Malformed Number (depending on output of regex match,
            // length of the token is different.
            match = this.temp.raw.match(MathTokenStream.RE_E_NUMBER_MALFORMED);
            if (match && !_.isUndefined(match[4])) {
                if (!_.isUndefined(match[4]) && match[4].length > 0)
                    match[1] = match[1].substr(0, match[1].length - 1);
                this.addToken(MathTokenType.E_NUMBER_MALFORMED,
                        match[1].length, match[1].toLowerCase());
            } else if (match)
                this.addToken(MathTokenType.E_NUMBER_MALFORMED,
                        match[0].length, match[0].toLowerCase());

            // Error: Number in exponential notation
            match = this.temp.raw
                    .match(MathTokenStream.RE_E_NUMBER_EXPONENTIAL);
            if (match)
                this.addToken(MathTokenType.E_NUMBER_EXPONENTIAL,
                        match[0].length, Number(match[0].replace(/[Ее]/, 'E')));

            // Number
            match = this.temp.raw.match(MathTokenStream.RE_NUMBER);
            if (match)
                this.addToken(MathTokenType.NUMBER, match[0].length,
                        Number(match[0]));

            // Error: Misplaced dot
            if (this.temp.raw.charAt(0) == '.')
                this.addToken(MathTokenType.E_MISPLACED_DOT, 1);

            // All possible search was performed, but the token was not found
            // --> Unknown symbol.
            this.addToken(MathTokenType.E_UNKNOWN, 1);

        } catch (e) {
            if (e != MathTokenStream.TOKEN_FOUND_EXCEPTION)
                throw e;
        }
        ;

        // Checking whether a search loop is stuck.
        if (i == 0)
            Logger.log("Propably neverending loop at tokenizer.");
    }

    // Checking if the end of a sting was reached and adding E_REST token if it
    // was too long to be completely parsed.
    if (this.temp.raw != '')
        this.addToken(MathTokenType.E_REST, this.temp.raw.length, null, true);

    // Adding last token (special EOF token).
    this.addToken(MathTokenType.EOF, 0, null, true);

    // Deleting temporary variable.
    delete this.temp;

    // Checking for changes using hash method.
    var hash = this.getHash();
    if (hash == this.old_hash)
        return false;
    this.old_hash = hash;

    // Forming list of errors.
    this.errors.clear();

    for ( var i = this.tokens.length - 1; i >= 0; i--) {
        if (this.tokens[i].isErrorToken()) {
            this.errors.add(new MathMessage("e_lex_" + this.tokens[i].type,
                    this.tokens[i].pos, this.tokens[i]));
        }
    }
    ;

    // Reaching this point means that token stream was changed.
    return true;
};

/**
 * Returns a specific token defined by its position or false if it cannot be
 * got.
 * 
 * @param {Number}
 *        tokenPos Position of a requested token.
 * @param {Boolean}
 *        [moveCursor=false] Set to true if cursor position needs to be changed.
 * @return {MathToken} MathToken or null if the search was out of range.
 */
MathTokenStream.prototype.getToken = function(tokenPos, moveCursor) {
    if (moveCursor)
        this.cursorPos = tokenPos;

    if (this.cursorPos >= this.tokens.length)
        this.cursorPos = this.tokens.length - 1;

    if (_.isUndefined(this.tokens[tokenPos]))
        return null;
    // return new MathToken();
    return this.tokens[tokenPos];
};

/**
 * Returns the first token of the stream.
 * 
 * @param {Boolean}
 *        [moveCursor=false] Set to true if cursor position needs to be changed.
 * @return {MathToken} MathToken or null if the search was out of range.
 */
MathTokenStream.prototype.firstToken = function(moveCursor) {
    return this.getToken(0, moveCursor);
};

/**
 * Returns the last token of the stream. IMPORTANT NOTICE: The “last” token a
 * not the EOF token, but the token before it.
 * 
 * @param {Boolean}
 *        [moveCursor=false] Set to true if cursor position needs to be changed.
 * @return {MathToken} MathToken or null if the search was out of range.
 */
MathTokenStream.prototype.lastToken = function(moveCursor) {
    return this.getToken(this.tokens.length - 2, moveCursor);
};

/**
 * Returns the previous token of the stream.
 * 
 * @param {Boolean}
 *        [moveCursor=false] Set to true if cursor position needs to be changed.
 * @return {MathToken} MathToken or null if the search was out of range.
 */
MathTokenStream.prototype.previousToken = function(moveCursor) {
    return this.getToken(this.cursorPos - 1, moveCursor);
};

/**
 * Returns the next token of the stream.
 * 
 * @param {Boolean}
 *        [moveCursor=false] Set to true if cursor position needs to be changed.
 * @return {MathToken} MathToken or null if the search was out of range.
 */
MathTokenStream.prototype.nextToken = function(moveCursor) {
    return this.getToken(this.cursorPos + 1, moveCursor);
};

/**
 * Returns current token of the stream.
 */
MathTokenStream.prototype.currentToken = function() {
    return this.getToken(this.cursorPos);
};

/**
 * Searches for a token of the specific type (or types) in the rest of the token
 * stream (from cursor).
 * 
 * @param {Arrray}
 *        tokenTypes list of tokens to be searched
 * @param {Boolean}
 *        moveCursor (=false) Set to true if cursor position needs to be
 *        changed.
 * @return {MathToken} MathToken or null if the search was out of range.
 */
MathTokenStream.prototype.findNextToken = function(tokenTypes, moveCursor) {
    if (!_.isArray(tokenTypes))
        tokenTypes = [ tokenTypes ];

    for ( var i = this.cursorPos; i < this.tokens.length; i++) {
        currentToken = this.getToken(i);
        for (type in tokenTypes) {
            if (tokenTypes[type] == currentToken.type) {
                if (moveCursor)
                    this.cursorPos = i;
                return currentToken;
            }
        }
    }
    return null;
};

/**
 * Searches for a token of the specific type (or types) in the rest of the token
 * stream (from cursor). Brackets level matters.
 * 
 * @param {Arrray}
 *        tokenTypes list of tokens to be searched
 * @param {Boolean}
 *        moveCursor (=false) Set to true if cursor position needs to be
 *        changed.
 * @return {MathToken} MathToken or null if the search was out of range.
 */
MathTokenStream.prototype.findNextTokenAtTheSameLevel = function(tokenTypes,
        moveCursor) {
    if (!_.isArray(tokenTypes))
        tokenTypes = [ tokenTypes ];

    var level = 0;

    for ( var i = this.cursorPos; i < this.tokens.length; i++) {
        if (level < 0)
            return null;

        currentToken = this.getToken(i);

        if (currentToken.isLeftBracket())
            ++level;

        if (level == 0)
            for (type in tokenTypes) {
                if (tokenTypes[type] == currentToken.type) {
                    if (moveCursor)
                        this.cursorPos = i;
                    return currentToken;
                }
            }
        ;

        if (currentToken.isRightBracket())
            --level;
    }
    return null;
};

/**
 * Avoids token streams to be converted to JSON by json2 lib
 */
MathTokenStream.prototype.toJSON = function() {
    return null;
};
