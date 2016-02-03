/**
 * Creates a single rule.
 *
 * @param {Object}
 *        value The rule itself (yes/no/including/excluding)
 * @param {Object}
 *        listOrParams Some additional parameters of the rule or a list.
 * @constructor
 */
function MathValidationRule(value, listOrParams) {
    if (!value)
        value = MathValidationRule.NO;
    this.value = value;

    if (_.isArray(listOrParams))
        this.list = listOrParams;
    else if (listOrParams != null)
        $.extend(this, listOrParams);
}

// / Some helpful constants
MathValidationRule.NO = 0;
MathValidationRule.ONLY = 1;
MathValidationRule.EXCLUDING = 2;
MathValidationRule.YES = 4;

/**
 * Helps to determine using a short notation if the rule has type NO.
 *
 * @return {Boolean}
 */
MathValidationRule.prototype.isNo = function() {
    return this.value == MathValidationRule.NO;
};

/**
 * Helps to determine using a short notation if the rule has type ONLY
 *
 * @return {Boolean}
 */
MathValidationRule.prototype.isOnly = function() {
    return this.value == MathValidationRule.ONLY;
};

/**
 * Helps to determine using a short notation if the rule has type EXCLUDING.
 *
 * @return {Boolean}
 */
MathValidationRule.prototype.isExcluding = function() {
    return this.value == MathValidationRule.EXCLUDING;
};

/**
 * Helps to determine using a short notation if the rule has type YES.
 *
 * @return {Boolean}
 */
MathValidationRule.prototype.isYes = function() {
    return this.value == MathValidationRule.YES;
};