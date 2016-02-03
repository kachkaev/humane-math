/**
 * @classDescription MathValidationRules is used by MathValidator to find errors
 *                   in a MathTree. Depending on this set of rules, an output of
 *                   validator can be different.
 *
 * @see MathValidationRulesBase for a preset list of rules
 *
 * Creates a set of rules. All rules are “no” by default.
 * @constructor
 */
function MathValidationRules() {
    this.useStandardFunctions = new MathValidationRule();
    this.useStandardConstants = new MathValidationRule();
    this.useStandardVariables = new MathValidationRule();

    // this.acceptMathOperations = new MathValidationRule();
    this.acceptEquations = new MathValidationRule();
    this.acceptInequalities = new MathValidationRule();
    this.acceptSequenceOfStatements = new MathValidationRule();
    this.acceptEmpty = new MathValidationRule();
    this.acceptOnlyNumber = new MathValidationRule();

    this.valueOnlyFinite = new MathValidationRule();
    this.valueOnlyInteger = new MathValidationRule();
    this.valueRange = new MathValidationRule();
    this.valueOnlyGreaterThan = new MathValidationRule();
    this.valueOnlyLessThan = new MathValidationRule();

    this.changed = new signals.Signal();
}

MathValidationRules.prototype = {};

/**
 * Sets a certain rule.
 *
 * @param {Object}
 *        name Name of a rule.
 * @param {Object}
 *        [value] Value of a rule. NO by default.
 * @param {Object}
 *        [list] List of exclusions.
 * @return {MathValidationRules} Current object (can be used in chains).
 */
MathValidationRules.prototype.setRule = function(name, value, list) {
    this[name] = new MathValidationRule(value, list);
    return this;
};

/**
 * Returns a deep copy of the set of validation rules.
 *
 * @return {MathValidationRules} a copy of MathValidationRules object.
 */
MathValidationRules.prototype.clone = function() {
    return $.extend(true, {}, this);
};

/**
 * Avoids rules to be converted to JSON by json2 lib
 */
MathValidationRules.prototype.toJSON = function() {
    return null;
};