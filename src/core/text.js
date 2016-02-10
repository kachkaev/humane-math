//import Signal from 'signals';
import _ from 'underscore';
import {MessageList}     from './analysis/message-list';
import {TokenStream}     from './analysis/1-lexical/token-stream';
import {Tree}            from './analysis/2-syntactic/tree';
import {Validator}       from './analysis/3-semantic/validator';
import {ValidationRules} from './analysis/3-semantic/validation-rules';
//import {Symbols}         from './config/symbols';

/**
 * Text is a main class used for keeping mathematical statements, expressions, etc.
 */
export class Text {
  /**
   * @param {Symbols} symbols
   * @param {ValidationRules} validationRules
   * @param {string} [defaultContent='']
   */
  constructor(symbols, validationRules, defaultContent = '') {

    this.setSymbols(symbols);
    this.setValidationRules(validationRules);

    this._tokenStream = new TokenStream();
    this._tree = new Tree(); this._validator = new Validator();

    this.errors = new MessageList();
    this.warnings = new MessageList();

    //this.changed = new Signal();

    this.setContent(defaultContent);
  }

  /**
   * Updates an object with new text (formula).
   *
   * @param {string} newContent
   *    new mathematical expression that needs to be interpreted.
   *
   * @returns {boolean}
   *     true if the formula was really changed.
   */
  setContent(newContent = '') {

    // Basic check on changes
    if (this._content === newContent) {
      return false;
    }

    // var messages = new MessageList();
    // var tokenStream = lexer.process(text, messages);
    // var tree = parser.process(tokenStream, messages);
    //
    // var validatorMessages = new MessageList();
    // validator.process(tree, this.getSymbols(), this.getValidationRules(), validatorMessages);

    this._content = newContent;

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
      this._symbols,
      this._validationRules,
      !this._tokenStream.errors.isEmpty() || !this._tree.errors.isEmpty()
    );

    // Collect errors
    this.errors = (new MessageList(this._tokenStream.errors,
        this._tree.errors, this._validator.errors)).sort();

    //this.changed.dispatch();

    // Return true as the text was changed
    return true;
  }

  getContent() {
    return this._content;
  }

  // setSymbols(symbols) {
  //
  // }

  /**
   * Re-validates the math object according to new validation rule set.
   *
   * @param {ValidationRules} validationRules
   *
   * @returns {boolean} True if anything was changed.
   */
  setValidationRules(validationRules) {
    if (validationRules instanceof ValidationRules) {
      throw `Validation rules are expected to be an instance of HumaneMath.ValidationRules, ${ValidationRules} given`;
    }

    if (this._validationRules === validationRules) {
      return false;
    }
    this._validationRules = validationRules;

    // Do not revalidate if the method is called from the constructor
    if (_.isUndefined(this._content)) {
      return false;
    }

    return this._revalidate();
  }
  //XXX remove or restore
  // dump() {
  //   return `text: "${this._content}", errors: ${this.errors.count()} (${this._tokenStream.errors.count()}, ${this._tree.errors.count()}, ${this._validator.errors.count()})`;
  // //    + ' Warnings: ' + this.warnings.count()
  // //        + '(' + this._tokenStream.warnings.count() + ', '
  // //            + this._tree.warnings.count()    + ', '
  // //            + this._validator.warnings.count()   + ')'
  //     ;
  // }

  _revalidate() {
    if (!this._validator.validate(this._tree, this._symbols, this._validationRules)) {
      return false;
    }

    // Collect errors
    this.errors = (new MessageList(
        this._tokenStream.errors,
        this._tree.errors,
        this._validator.errors
      )).sort();

    //this.changed.dispatch();
    return true;
  }
}
