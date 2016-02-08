import _ from 'underscore';

/**
 * Container for functions, constants and variables
 */
export class Symbols {

  constructor() {
    this.functionDefinitionsById = [];
    this.constantDefinitionsById = [];
    this.variableDefinitionsById = [];
    this.functionIdsByAlias = {};
    this.constantIdsByAlias = {};
    this.variableIdsByAlias = {};

    this.disableAutoIndexing();
    this.initialize();
    this.enableAutoIndexing();

    this.indexAliases(this.functionDefinitionsById, this.functionIdsByAlias);
    this.indexAliases(this.constantDefinitionsById, this.constantIdsByAlias);
    this.indexAliases(this.variableDefinitionsById, this.variableIdsByAlias);
  }

  initialize() {
  }

  disableAutoIndexing() {
    this.autoIndexingDisabled = true;
  }

  enableAutoIndexing() {
    delete this.autoIndexingDisabled;
  }

  /**
   * Registers a function.
   *
   * @private
   *
   * @param {Array} aliases
   *    Alternative names for the function
   * @param {Function} executor
   *    Function object that executes the function.
   * @param {number|Array} [argumentCount=1]
   *    Can be both an integer positive number and an Array of one
   *    or 2 numbers. If the number in an array is
   *    single, it corresponds to minimum number of arguments, otherwise
   *    the first one means minimum argument count, and another one —
   *    maximum count.
   * @param {boolean} [nonSimplifiable=false]
   *    Defines whether a function can be a subject to
   *    simplification. Is true for random generator functions.
   * @param {boolean} [calculateForNaNs=false]
   *    Set to true to avoid “lazy calculating” for the
   *    function. Even if any of the arguments is NaN, calculations will
   *    not be aborted (e.g. useful for “if”).
   */
  addFunction(aliases, executor, argumentCount = 1, nonSimplifiable = false, calculateForNaNs = false) {
    var currentFunctionDefinition = {};
    currentFunctionDefinition.id = this.extractIdFromAliases(aliases);

    currentFunctionDefinition.aliases = aliases;

    if (!_.isFunction(executor)) {
      throw new Error(`Function ${currentFunctionDefinition.id} does not have a valid executor`);
    }
    currentFunctionDefinition.executor = executor;

    // Add argumentCount
    if (_.isNumber(argumentCount)) {
      currentFunctionDefinition.argumentCount = argumentCount;
    } else if (_.isArray(argumentCount)) {
      currentFunctionDefinition.argumentCount = {
        min: argumentCount[0],
        max: argumentCount.length == 1 ? Number.POSITIVE_INFINITY : argumentCount[1]
      };
    }

    currentFunctionDefinition.nonSimplifiable = !!nonSimplifiable;
    currentFunctionDefinition.calculateForNaNs = !!calculateForNaNs;

    this.functionDefinitionsById[currentFunctionDefinition.id] = currentFunctionDefinition;

    if (!this.autoIndexingDisabled) {
      this.indexAliases(this.functionDefinitionsById, this.functionIdsByAlias);
    }
  }

  /**
   * Registers a constant.
   *
   * @private
   *
   * @param {Array} aliases
   *    Alternative names for the constant
   * @param {number} value
   *    Value of a constant
   */
  addConstant(aliases, value) {
    var currentConstantDefinition = {};
    currentConstantDefinition.id = this.extractIdFromAliases(aliases);
    currentConstantDefinition.aliases = aliases;
    currentConstantDefinition.value = value;

    this.constantDefinitionsById[currentConstantDefinition.id] = currentConstantDefinition;

    if (!this.autoIndexingDisabled) {
      this.indexAliases(this.constantDefinitionsById, this.constantIdsByAlias);
    }
  }

  /**
   * Registers a variable.
   *
   * @param {Object} aliases
   *    Alternative names for the variable.
   */
  addVariable(aliases) {
    var currentVariableDefinition = [];
    currentVariableDefinition.id = this.extractIdFromAliases(aliases);
    currentVariableDefinition.aliases = aliases;

    this.variableDefinitionsById[currentVariableDefinition.id] = currentVariableDefinition;

    if (!this.autoIndexingDisabled) {
      this.indexAliases(this.functionDefinitionsById, this.functionIdsByAlias);
    }
  }

  /**
   * Performs a search for a requested function.
   *
   * @param {string} functionName
   *        Name of a function that need to be found.
   *
   * @returns {?string}
   *          id of a function (substitutes alias with the default name)
   *          or null if it was not found.
   */
  findFunction(functionName) {
    return this.functionIdsByAlias[functionName] || null;
  }

  /**
   * Performs a search for a requested constant.
   *
   * @param {string} constantName
   *        Name of a constant that need to be found.
   *
   * @returns {?string}
   *          id of a constant (substitutes alias with the default name)
   *          or null if it was not found.
   *
   */
  findConstant(constantName) {
    return this.constantIdsByAlias[constantName] || null;
  }

  /**
   * Performs a search for a requested variable.
   *
   * @param {string} variableName
   *        Name of a variable that need to be found.
   *
   * @returns {?string}
   *          id of a variable (substitutes alias with the default name)
   *          or null if it was not found.
   */
  findVariable(variableName) {
    return this.variableIdsByAlias[variableName] || false;
  }

  /**
   * Creates a helpful index array of aliases. This helps to find a function
   * or an constant by its alias
   *
   * @private
   *
   * @param {Object} whatToIndex
   *    reference to a list of functions/constants.
   * @param {Object} whereToPut
   *    reference to a list with indexes.
   */
  indexAliases(whatToIndex, whereToPut) {
    _.each(whatToIndex, (symbolDefinition, symbolId) => {
      _.each(symbolDefinition.aliases, (alias) => {
        whereToPut[alias] = symbolId;
      });
    });
  }

  /**
   *
   * @private
   *
   * @param {Object} aliases
   *        key/value pairs
   *
   * @returns {string}
   */
  extractIdFromAliases(aliases) {
    return _.keys(aliases)[0];
  }
}
