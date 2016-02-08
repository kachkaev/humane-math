import _ from 'underscore';
import {ValidationRule}      from './validation-rule';

/**
 * ValidationRules are used by Validator to find errors
 *  in a Tree. Depending on the set of rules, an output of
 *  the validator can be different.
 *
 * @see StandardValidationRules for a preset list of rules
 *
 */
export class ValidationRules {

  /**
   * All rules are NO by default.
   */
  constructor() {
    this.allowFunctions = new ValidationRule();
    this.allowConstants = new ValidationRule();
    this.allowVariables = new ValidationRule();

    // this.acceptMathOperations = new ValidationRule();
    this.acceptEquations = new ValidationRule();
    this.acceptInequalities = new ValidationRule();
    this.acceptSequenceOfStatements = new ValidationRule();
    this.acceptEmpty = new ValidationRule();
    this.acceptOnlyNumber = new ValidationRule();

    this.valueOnlyFinite = new ValidationRule();
    this.valueOnlyInteger = new ValidationRule();
    this.valueRange = new ValidationRule();
    this.valueOnlyGreaterThan = new ValidationRule();
    this.valueOnlyLessThan = new ValidationRule();
  }

  /**
   * Sets a certain rule.
   *
   * @param {string} name
   *    Name of the rule.
   * @param {number} [value]
   *    Value of a rule. NO by default.
   * @param {string[]} [list]
   *    List of exclusions.
   * @returns {ValidationRules}
   *      Current object (OK for method chaining).
   */
  setRule(name, value, list) {
    this[name] = new ValidationRule(value, list);
    return this;
  }

  /**
   * Returns a deep copy of the set of validation rules.
   *
   * @returns {ValidationRules}
   *      Current object (OK for method chaining).
   */
  clone() {
    return _.map(this, _.clone);
  }
}
