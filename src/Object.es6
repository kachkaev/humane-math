/**
 * Math Object is a main class used for keeping statements, expressions, etc.
 * 
 * @param {MathValidationRules}
 *        validationRules
 * @constructor
 */
function MathObject(validationRules, defaultText) {

    this.tokenStream = new MathTokenStream();
    this.tree = new MathTree();
    this.validator = new MathValidator();

    this.validationRules = validationRules;

    this.errors = new MathMessageList();
    this.warnings = new MathMessageList();
    this.hasErrors = false;
    this.hasWarnings = false;
    
    this.changed = new signals.Signal();

    this.setText(defaultText);
}

MathObject.prototype = {};

/**
 * Updates an object with new text (formula).
 * 
 * @param {String}
 *        text new mathematical expression that needs to be interpreted.
 * @return {Boolean} true if the formula was really changed.
 */
MathObject.prototype.setText = function(text) {
    var newText = !text ? "" : text.toString();

    // var time_start = new Date().getTime();

    // Basic check on changes
    if (this.text === newText)
        return false;

    this.text = newText;

    // Performing lexical analysis
    if (!this.tokenStream.tokenize(newText))
        return false;
    
    // var time_lex = new Date().getTime();
    // Logger.log('Formula was tokenized in ' + (time_lex - time_start) +'
    // ms.');

    // Performing syntactic analysis
    if (!this.tree.parse(this.tokenStream))
        return false;

    // var time_syn = new Date().getTime();
    // Logger.log('Formula was parsed in ' + (time_syn - time_lex) +' ms.');

    // Performing semantic analysis
    this.validator
            .validate(this.tree, this.validationRules,
                    !this.tokenStream.errors.isEmpty()
                            || !this.tree.errors.isEmpty());

    // var time_sem = new Date().getTime();
    // Logger.log('Formula was validated in ' + (time_sem - time_syn) +' ms.');

    // Collecting errors
    this.errors = (new MathMessageList(this.tokenStream.errors,
            this.tree.errors, this.validator.errors)).sort();
    this.hasErrors = !this.errors.isEmpty();

    //var time_total = new Date().getTime();

    this.changed.dispatch();

    // Returning true as the formula was changed
    return true;
};

/**
 * Revalidates the math object according to new validation rule set. Not
 * implemented yet.
 * 
 * @param {Object}
 *        newText
 * @return {Boolean} True if anything was changed.
 */
MathObject.prototype.setValidationRules = function(validationRules) {
    if (this.validationRules == validationRules)
        return false;

    this.validationRules = validationRules;

    // Performing semantic analysis
    if (!this.validator.validate(this.tree, this.validationRules))
        return false;

    // Collecting errors
    this.errors = (new MathMessageList(this.tokenStream.errors,
            this.tree.errors, this.validator.errors)).sort();

    this.changed.dispatch();
    return true;
};

MathObject.prototype.dump = function() {
    return "MathObject: text:\"" + this.text
        + '" errors: '   + this.errors.count()
                + '(' + this.tokenStream.errors.count()   + ', '
                      + this.tree.errors.count()          + ', '
                      + this.validator.errors.count()     + ') '
//        + ' Warnings: ' + this.warnings.count()
//                + '(' + this.tokenStream.warnings.count() + ', '
//                      + this.tree.warnings.count()        + ', '
//                      + this.validator.warnings.count()   + ')'
        ;
};