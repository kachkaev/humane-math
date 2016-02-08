import {
    MessageList,
    TokenStream,
    Tree,
    Validator
} from 'humane-math';
import Signal from 'signals';

/**
 * Text is a main class used for keeping mathematical statements, expressions, etc.
 */
export class Text {
    /**
     * @param {Symbols} symbols
     * @param {ValidationRules} validationRules
     * @param {string} [defaultContent='']
     */
    construct(symbols, validationRules, defaultContent = '') {

        this._tokenStream = new TokenStream();
        this._tree = new Tree();
        this._validator = new Validator();

        this._validationRules = validationRules;

        this.errors = new MessageList();
        this.warnings = new MessageList();
        this.hasErrors = false;
        this.hasWarnings = false;

        this.changed = new Signal();

        this.setContent(defaultContent);
    }

    /**
     * Updates an object with new text (formula).
     *
     * @param {string} newContent
     *        new mathematical expression that needs to be interpreted.
     *
     * @returns {boolean}
     *         true if the formula was really changed.
     */
    setContent(newContent = '') {

        // var time_start = new Date().getTime();

        // Basic check on changes
        if (this.content === newContent) {
            return false;
        }

        this.content = newContent;

        // Perform lexical analysis
        if (!this._tokenStream.tokenize(newContent)) {
            return false;
        }

        // Perform syntactic analysis
        if (!this._tree.parse(this._tokenStream)) {
            return false;
        }

        // Perform semantic analysis
        this._validator.validate(
            this._tree,
            this._validationRules,
            !this._tokenStream.errors.isEmpty() || !this._tree.errors.isEmpty()
        );

        // Collect errors
        this.errors = (new MessageList(this._tokenStream.errors,
                this._tree.errors, this._validator.errors)).sort();

        this.changed.dispatch();

        // Return true as the text was changed
        return true;
    }

    /**
     * Re-validates the math object according to new validation rule set.
     *
     * @param {Object} validationRules
     *
     * @returns {boolean} True if anything was changed.
     */
    setValidationRules(validationRules) {
        if (this._validationRules == validationRules) {
            return false;
        }

        this._validationRules = validationRules;

        // Perform semantic analysis
        if (!this._validator.validate(this._tree, this._validationRules)) {
            return false;
        }

        // Collect errors
        this.errors = (new MessageList(
                this._tokenStream.errors,
                this._tree.errors,
                this._validator.errors
            )).sort();

        this.changed.dispatch();
        return true;
    }
    //XXX remove or restore
    // dump() {
    //     return `text: "${this.content}", errors: ${this.errors.count()} (${this._tokenStream.errors.count()}, ${this._tree.errors.count()}, ${this._validator.errors.count()})`;
    // //        + ' Warnings: ' + this.warnings.count()
    // //                + '(' + this._tokenStream.warnings.count() + ', '
    // //                      + this._tree.warnings.count()        + ', '
    // //                      + this._validator.warnings.count()   + ')'
    //         ;
    // }
}
