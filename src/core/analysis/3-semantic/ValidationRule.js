/**
 * Represents a single validation rule.
 */
export class ValidationRule {

  static NO = 0;
  static ONLY = 1;
  static EXCLUDING = 2;
  static YES = 4;

  /**
  * @param {Object} value
  *    The rule itself (yes/no/including/excluding)
  * @param {Object} listOrParams
  *    Some additional parameters of the rule or a list.
  */
  constructor(value, listOrParams) {
    if (!value) {
      value = ValidationRule.NO;
    }
    this.value = value;

    if (_.isArray(listOrParams)) {
      this.list = listOrParams;
    } else if (listOrParams != null) {
      _.extend(this, listOrParams);
    }
  }

  /**
   * Helps to determine using a short notation if the rule has type NO.
   *
   * @returns {boolean}
   */
  isNo() {
    return this.value == ValidationRule.NO;
  }

  /**
   * Helps to determine using a short notation if the rule has type ONLY.
   *
   * @returns {boolean}
   */
  isOnly() {
    return this.value == ValidationRule.ONLY;
  }

  /**
   * Helps to determine using a short notation if the rule has type EXCLUDING.
   *
   * @returns {boolean}
   */
  isExcluding() {
    return this.value == ValidationRule.EXCLUDING;
  }

  /**
   * Helps to determine using a short notation if the rule has type YES.
   *
   * @returns {boolean}
   */
  isYes() {
    return this.value == ValidationRule.YES;
  }
 }
