/**
 * @classDescription Standard Symbols class (static class)
 * 
 * The class is a source for properties of all standard functions, constants and
 * variables.
 * 
 */
MathStandardSymbols = (function() {
    /**
     * Loads standard functions
     */
    var loadFunctions = function() {
        // Notice: “(function(){})() notation used to enable folding.

        // =======================
        // Trigonometric functions
        (function() {
            // Sine
            addF('sin', {
                'sine' : MathDialect.WEST_LONG,
                'син' : MathDialect.RUS,
                'синус' : MathDialect.RUS_LONG
            }, 1, function() {
                return Math.sin(arguments[0][0]);
            });
            // Cosine
            addF('cos', {
                'cosine' : MathDialect.WEST_LONG,
                'кос' : MathDialect.RUS,
                'косинус' : MathDialect.RUS_LONG
            }, 1, function() {
                return Math.cos(arguments[0][0]);
            });
            // Tangent
            addF('tan', {
                'tangent' : MathDialect.WEST_LONG,
                'tg' : MathDialect.EAST,
                'тан' : MathDialect.RUS,
                'тангенс' : MathDialect.RUS_LONG
            }, 1, function() {
                return Math.tan(arguments[0][0]);
            });
            // Cotangent
            addF('cot', {
                'cotangent' : MathDialect.WEST_LONG,
                'ctg' : MathDialect.EAST,
                'ctn' : MathDialect.EAST,
                'котан' : MathDialect.RUS,
                'котангенс' : MathDialect.RUS_LONG
            }, 1, function() {
                return 1.0 / Math.tan(arguments[0][0]);
            });
            // Secant
            addF('sec', {
                'secant' : MathDialect.WEST_LONG,
                'сек' : MathDialect.RUS,
                'секанс' : MathDialect.RUS_LONG
            }, 1, function() {
                return 1.0 / Math.cos(arguments[0][0]);
            });
            // Cosecant
            addF('csc', {
                'сosecant' : MathDialect.WEST_LONG,
                'cosec' : MathDialect.EAST,
                'косек' : MathDialect.RUS,
                'косеканс' : MathDialect.RUS_LONG
            }, 1, function() {
                return 1.0 / Math.sin(arguments[0][0]);
            });
        })();

        // ===============================
        // Inverse trigonometric functions
        (function() {
            // Arcsine
            addF('arcsin', {
                'arcsine' : MathDialect.WEST_LONG,
                'asin' : MathDialect.PROGRAMMING,
                'арксин' : MathDialect.RUS,
                'арксинус' : MathDialect.RUS_LONG
            }, 1, function() {
                return Math.asin(arguments[0][0]);
            });
            // Arccosine
            addF('arccos', {
                'arccosine' : MathDialect.WEST_LONG,
                'acos' : MathDialect.PROGRAMMING,
                'арккос' : MathDialect.RUS,
                'арккосинус' : MathDialect.RUS_LONG
            }, 1, function() {
                return Math.acos(arguments[0][0]);
            });
            // Arctangent
            addF('arctan', {
                'arctangent' : MathDialect.WEST_LONG,
                'arctg' : MathDialect.EAST,
                'atan' : MathDialect.PROGRAMMING,
                'арктан' : MathDialect.RUS,
                'арктангенс' : MathDialect.RUS_LONG
            }, 1, function() {
                return Math.atan(arguments[0][0]);
            });
            // Arccotangent
            addF('arccot', {
                'arccotangent' : MathDialect.WEST_LONG,
                'arcctg' : MathDialect.EAST,
                'acot' : MathDialect.PROGRAMMING,
                'арккотан' : MathDialect.RUS,
                'арккотангенс' : MathDialect.RUS_LONG
            }, 1, function() {
                return (arguments[0][0] < 0 ? Math.PI : 0)
                        + Math.atan(1 / arguments[0][0]);
            });
            // Arcsecant
            addF('arcsec', {
                'arcsecant' : MathDialect.WEST_LONG,
                'asec' : MathDialect.PROGRAMMING,
                'арксек' : MathDialect.RUS,
                'арксеканс' : MathDialect.RUS_LONG

            }, 1, function() {
                return Math.acos(1 / arguments[0][0]);
            });
            // Arccosecant
            addF('arccsc', {
                'arcsecant' : MathDialect.WEST_LONG,
                'arccosec' : MathDialect.EAST,
                'acosec' : MathDialect.PROGRAMMING,
                'арксек' : MathDialect.RUS,
                'арккосеканс' : MathDialect.RUS_LONG

            }, 1, function() {
                return Math.asin(1 / arguments[0][0]);
            });

        })();

        // /////////////////////
        // Hyperbolic functions
        (function() {
            // // Hyperbolic sine
            addF('sinh', {
                'sh' : MathDialect.EAST
            }, 1,
                    function() {
                        return (Math.exp(arguments[0][0]) - Math
                                .exp(-arguments[0][0])) / 2.0;
                    });
            // // Hyperbolic cosine
            addF('cosh', {
                'ch' : MathDialect.EAST
            }, 1,
                    function() {
                        return (Math.exp(arguments[0][0]) + Math
                                .exp(-arguments[0][0])) / 2.0;
                    });
            // // Hyperbolic tangent
            addF('tanh', {
                'th' : MathDialect.EAST
            }, 1, function() {
                return (Math.exp(2 * arguments[0][0]) - 1.0)
                        / (Math.exp(2 * arguments[0][0]) + 1.0);
            });
            // // Hyperbolic cotangent
            addF('coth', {
                'сth' : MathDialect.EAST
            }, 1, function() {
                return (Math.exp(2 * arguments[0][0]) + 1.0)
                        / (Math.exp(2 * arguments[0][0]) - 1.0);
            });
            // // Hyperbolic secant
            addF('sech', {}, 1, function() {
                return 2.0 / (Math.exp(arguments[0][0]) + Math
                        .exp(-arguments[0][0]));
            });
            // // Hyperbolic cosecant
            addF('csch', {
                'cosech' : MathDialect.EAST
            }, 1, function() {
                return 2.0 / (Math.exp(arguments[0][0]) - Math
                        .exp(-arguments[0][0]));
            });
        })();

        // /////////////////////
        // Inverse hyperbolic functions
        // Hyperbolic arcsine
        (function() {
            // Hyperbolic arcsine
            addF('arcsinh', {
                'arsh' : MathDialect.EAST
            }, 1, function() {
                return Math.log(arguments[0][0]
                        + Math.sqrt(arguments[0][0] * arguments[0][0] + 1));
            });
            // Hyperbolic arccosine
            addF('arccosh', {
                'arch' : MathDialect.EAST
            }, function() {
                return arguments[0][0] >= 1 ? (Math.log(arguments[0][0]
                        + Math.sqrt(arguments[0][0] * arguments[0][0] - 1)))
                        : NaN;
            });
            // Hyperbolic arctangent
            addF(
                    'arctanh',
                    {
                        'arth' : MathDialect.EAST
                    },
                    1,
                    function() {
                        return (arguments[0][0] < 1 && arguments[0][0] > -1) ? (Math
                                .log((1 + arguments[0][0])
                                        / (1 - arguments[0][0])) / 2)
                                : NaN;
                    });
            // Hyperbolic arccotangent
            addF(
                    'arccoth',
                    {
                        'arcth' : MathDialect.EAST
                    },
                    1,
                    function() {
                        return (arguments[0][0] > 1 || arguments[0][0] < -1) ? (Math
                                .log((arguments[0][0] + 1) / (arguments[0][0])
                                        - 1) / 2)
                                : NaN;
                    });
            // Hyperbolic arcsecant
            addF('arcsech', {
                'arsch' : MathDialect.EAST
            }, 1, function() {
                return (arguments[0][0] > 0 && arguments[0][0] <= 1) ? Math
                        .log((1 + Math.sqrt(1 - arguments[0][0]
                                * arguments[0][0]))
                                / arguments[0][0]) : NaN;
            });
            // Hyperbolic arccosecant
            addF('arccsch', {
                'arcsch' : MathDialect.EAST
            }, 1, function() {
                return Math.log(1 / arguments[0][0]
                        + Math.sqrt(arguments[0][0] * arguments[0][0] + 1)
                        / Math.abs(arguments[0][0]));
            });
        })();

        // ////////////////////////
        // Rounding
        (function() {
            addF('round', {}, 1, function() {
                return Math.round(arguments[0][0]);
            });
            addF('floor', {}, 1, function() {
                return Math.floor(arguments[0][0]);
            });
            addF('ceil', {
                'ceiling' : MathDialect.WEST_LONG
            }, 1, function() {
                return Math.ceil(arguments[0][0]);
            });
            addF('frac', {
                'fractional' : MathDialect.WEST_LONG,
                'fract' : MathDialect.MISC
            }, 1, function() {
                return arguments[0][0] - Math.floor(arguments[0][0]);
            });

        })();

        // ////////////////////////
        // Exponentiation and Logarithms
        (function() {
            // Power
            addF('pow', {
                'power' : MathDialect.WEST_LONG,
                'степень' : MathDialect.RUS_LONG
            }, 2, function() {
                return Math.pow(arguments[0][0], arguments[0][1]);
            });
            // Argument to the power 2
            addF('sqr', {
                'квадрат' : MathDialect.RUS_LONG
            }, 1, function() {
                return Math.pow(arguments[0][0], 2);
            });
            // Square root
            addF('sqrt', {
                'кк' : MathDialect.RUS
            }, 1, function() {
                return Math.sqrt(arguments[0][0]);
            });
            // Cubic root
            addF('cbrt', {
            /*'кубкорень': MathDialect.RUS_LONG*/
            }, 1, function() {
                return arguments[0][0] >= 0 ? Math.pow(arguments[0][0], 1 / 3)
                        : -Math.pow(-arguments[0][0], 1 / 3);
            });
            // Root
            addF(
                    'root',
                    {
                        'корень' : MathDialect.RUS_LONG
                    },
                    1,
                    function() {
                        if (Math.floor(arguments[0][0]) != arguments[0][0]
                                || arguments[0][0] < 1)
                            return NaN;
                        return arguments[0][1] >= 0 ? Math.pow(arguments[0][1],
                                1 / arguments[0][0])
                                : (Math.floor(arguments[0][0] / 2) == arguments[0][0] / 2 ? NaN
                                        : -Math.pow(-arguments[0][1],
                                                1 / arguments[0][0]));
                    });

            // E power argument
            addF('exp', {}, 1, function() {
                return Math.exp(arguments[0]);
            });

            // Logarithm
            addF('log', {
                'лог' : MathDialect.RUS,
                'логарифм' : MathDialect.RUS_LONG
            }, 2, function() {
                return Math.log(arguments[0][1]) / Math.log(arguments[0][0]);
            });
            // Natural logarithm
            addF('ln', {}, 1, function() {
                return Math.log(arguments[0][0]);
            });
            // Common logarithm
            addF('lg', {}, 1, function() {
                return Math.log(arguments[0][0]) / Math.LN10;
            });

        })();

        // ////////////////////////
        // Miscellaneous

        (function() {
            // Abs
            addF('abs', {
                'modulus' : MathDialect.MISC,
                'модуль' : MathDialect.RUS_LONG
            }, 1, function() {
                return Math.abs(arguments[0][0]);
            });
            // Random number from 0 to 1. Calculated every time a dot is placed.
            addF('random', {}, 0, function() {
                return Math.random();
            }, true);
            // Random number from 0 to 1. Calculated once before plotting.
            addF('random2', {}, 0, function() {
                return Math.random();
            });
            // Sign of the argument
            addF('sgn', {}, 1, function() {
                if (isNaN(arguments[0][0]))
                    return NaN;
                return arguments[0][0] == 0 ? 0
                        : (arguments[0][0] > 0 ? 1 : -1);
            });
        })();

        // /////////////////
        // Non-mathematical

        (function() {
            // Maximum value
            addF('max', {
                'maximum' : MathDialect.WEST_LONG,
                'макс' : MathDialect.RUS,
                'максимум' : MathDialect.RUS_LONG
            }, [ 2 ], function() {
                var result = arguments[0][0];
                for ( var i = 1; i < arguments[0].length; i++) {
                    result = Math.max(result, arguments[0][i]);
                }
                return result;
            });
            // Minimum value
            addF('min', {
                'minimun' : MathDialect.WEST_LONG,
                'мин' : MathDialect.RUS,
                'минимум' : MathDialect.RUS_LONG
            }, [ 2 ], function() {
                var result = arguments[0][0];
                for ( var i = 1; i < arguments[0].length; i++) {
                    result = Math.min(result, arguments[0][i]);
                }
                return result;
            });
            // Condition
            addF('if', {
                'если' : MathDialect.RUS
            }, 3,
                    function() {
                        return arguments[0][0] >= 0 ? arguments[0][1]
                                : arguments[0][2];
                    }, false, true);
        })();

        // TODO: Add easter eggs function
    };

    /**
     * Loads standard constants
     */
    var loadConstants = function() {

        // Constant equal to a circle's circumference divided by its diameter
        addC('pi', {
            'π' : MathDialect.GREEK,
            'пи' : MathDialect.RUS
        }, Math.PI);
        // Euler's number
        addC('e', {
            'e' : MathDialect.GREEK,
            'е' : MathDialect.RUS
        }, Math.E);
        // The golden ratio
        addC('phi', {
            'ph' : MathDialect.MISC,
            'φ' : MathDialect.GREEK,
            'фи' : MathDialect.RUS
        }, 1.6180339887);

        // Easter eggs
        // TODO: Add underscore support in tokenizer so the varialbe 42 could be
        // read.
        // 42 — See
        // http://en.wikipedia.org/wiki/Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything
        addC(
                'answer_to_the_ultimate_question_of_life_the_universe_and_everything',
                {
                    'ответ_на_главный_вопрос_жизни_вселенной_и_всего_такого' : MathDialect.RUS
                }, 42);

    };

    /**
     * Loads standard variables Variables are implemented just for keeping
     * aliases.
     */
    var loadVariables = function() {

        addV('x', {
            'х' : MathDialect.RUS
        });
        addV('y', {
            'у' : MathDialect.RUS
        });
        addV('t', {});
        addV('a', {
            'а' : MathDialect.RUS
        });

    };

    /**
     * Registers a function (is just used to help to shorten the code of
     * loadFunctions function).
     * 
     * @private
     * 
     * @param {String}
     *        ID ID of a function that needs to be registered
     * @param {Array}
     *        aliases Alternative names for the function
     * @param {Number}
     *        or {Array} argumentCount Can be both an integer positive number
     *        and an Array of one or 2 numbers. If the number in an array is
     *        single, it corresponds to minimum number of arguments, otherwise
     *        the first one means minimum argument count, and another one —
     *        maximum count.
     * @param {Function}
     *        executor Function object that executes the function. Is now
     *        ignored. Left for further possible use.
     * @param {Boolean}
     *        nonSimplifiable Defines whether a function can be a subject to
     *        simplification. Is true for random generator functions.
     * @param {Boolean}
     *        calculateForNaNs Set to true to avoid “lazy calculating” for the
     *        function. Even if any of the arguments is NaN, calculations will
     *        not be aborted (e.g. useful for “if”).
     */
    var addF = function(ID, aliases, argumentCount, executor, nonSimplifiable,
            calculateForNaNs) {
        this.functions[ID] = {};
        var currentFunction = this.functions[ID];

        // Adding aliases
        if (aliases instanceof Object)
            currentFunction.aliases = aliases;

        // Adding argumentCount
        if (_.isNumber(argumentCount))
            currentFunction.argumentCount = argumentCount;
        else if (_.isArray(argumentCount)) {
            currentFunction.argumentCount = {};
            if (argumentCount.length == 1) {
                currentFunction.argumentCount.min = argumentCount[0];
                currentFunction.argumentCount.max = Number.POSITIVE_INFINITY;
            } else {
                currentFunction.argumentCount.min = argumentCount[0];
                currentFunction.argumentCount.max = argumentCount[1];
            }
        }

        // Adding executor function
        if (executor)
            currentFunction.executor = executor;
        else
            executor = function() {
                Logger.log("Standard function “" + ID
                        + "” executor not defined!");
                return 42;
            };

            // Adding non-simplifiable parameter
        currentFunction.nonSimplifiable = !!nonSimplifiable;
    };

    /**
     * Registers a constant (is just used to help to shorten the code of
     * loadConstants function).
     * 
     * @private
     * 
     * @param {String}
     *        ID ID of a constant that needs to be registered
     * @param {Array}
     *        aliases Alternative names for the constant
     * @param {Number}
     *        value Value of a constant
     */
    var addC = function(ID, aliases, value) {
        this.constants[ID] = {};
        var currentConstant = this.constants[ID];

        // Adding aliases
        if (aliases instanceof Object)
            currentConstant.aliases = aliases;

        // Adding Value
        currentConstant.value = value;

    };

    /**
     * Registers a variable (is just used to help to shorten the code of
     * loadVariables function).
     * 
     * @private
     * 
     * @param {String}
     *        ID ID of a variable that needs to be registered
     * @param {Array}
     *        aliases Alternative names for the variable
     */
    var addV = function(ID, aliases) {
        this.variables[ID] = {};
        var currentVariable = this.variables[ID];

        // Adding aliases
        if (aliases instanceof Object)
            currentVariable.aliases = aliases;
    };

    /**
     * Creates a helpful index array of aliases. This helps to find a function
     * or an constant by its alias
     * 
     * @private
     * 
     * @param {Object}
     *        whatToIndex reference to a list of functions/constants
     * @param {Object}
     *        whereToPut reference to a list with indexes.
     */
    var createAliasesIndex = function(whatToIndex, whereToPut) {
        for ( var ID in whatToIndex) {
            if (whatToIndex[ID].aliases)
                for ( var alias in whatToIndex[ID].aliases)
                    whereToPut[alias] = ID;
        }
    };

    /**
     * Performs a search for a requested function.
     * 
     * @method findFunction
     * 
     * @param {String}
     *        functionName name of a function that need to be found
     * @return ID of a function (substitutes alias with the default name) or
     *         false if a function was not found.
     * 
     */
    this.findFunction = function(functionName) {
        // Searching within functions (case constantName matches ID)
        var answer = this.functions[functionName];
        if (answer)
            return functionName;

        // Searching within aliases in the index array
        answer = functionAliasesIndex[functionName];
        if (answer)
            return answer;

        // If no match was found, return false
        return false;
    };

    /**
     * Performs a search for a requested constant.
     * 
     * @param {String}
     *        constantName name of a constant that need to be found
     * @return ID of a constant (substitutes alias with the default name) or
     *         false if a constant was not found.
     * 
     */
    this.findConstant = function(constantName) {
        // Searching within constants (case constantName matches ID)
        var answer = this.constants[constantName];
        if (answer)
            return constantName;

        // Searching within aliases in the index array
        answer = constantAliasesIndex[constantName];
        if (answer)
            return answer;

        // If no match was found, return false
        return false;
    };

    /**
     * Performs a search for a requested variable.
     * 
     * @param {String}
     *        variableName name of a variable that need to be found
     * @return ID of a variable (substitutes alias with the default name) or
     *         false if a variable was not found.
     * 
     */
    this.findVariable = function(variableName) {
        // Searching within constants (case variableName matches ID)
        var answer = this.variables[variableName];
        if (answer)
            return variableName;

        // Searching within aliases in the index array
        answer = variableAliasesIndex[variableName];
        if (answer)
            return answer;

        // If no match was found, return false
        return false;
    };

    // Reserving object variables for storing functions and constants
    // and indexes for their aliases.
    this.functions = new Object();
    this.constants = new Object();
    this.variables = new Object();
    var functionAliasesIndex = new Object();
    var constantAliasesIndex = new Object();
    var variableAliasesIndex = new Object();

    // Loading functions, constants and variables.
    loadFunctions();
    loadConstants();
    loadVariables();

    // Generating indexes for aliases.
    createAliasesIndex(this.functions, functionAliasesIndex);
    createAliasesIndex(this.constants, constantAliasesIndex);
    createAliasesIndex(this.variables, variableAliasesIndex);
    return this;
})();
