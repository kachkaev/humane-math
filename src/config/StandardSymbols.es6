import {
    Dialect,
    Symbols
} from 'humane-math';

/* eslint-disable indent */
/* See http://github.com/eslint/eslint/issues/4696 */

/**
 * The class is a standard source for properties of all standard functions,
 * constants and variables.
 */
export class StandardSymbols extends Symbols {

    construct() {
        this.addTrigonometricFunctions();
        this.addInverseTrigonometricFunctions();
        this.addHyperbolicTrigonometricFunctions();
        this.addInverseHyperbolicTrigonometricFunctions();

        this.addRoundingFunctions();
        this.addInvolutionFunctions();
        this.addMiscFunctions();
        this.addNonMathFunctions();

        this.addConstants();
        this.addVariables();

        this.addEasterEggs();
    }

    addTrigonometricFunctions() {

        // Sine
        this.addFunction({
                'sin'  : Dialect.WEST,
                'sine' : Dialect.WEST_LONG,
                'син'  : Dialect.RUS,
                'синус': Dialect.RUS_LONG
            },
            (params) => Math.sin(params[0])
        );

        // Cosine
        this.addFunction({
                'cos'    : Dialect.WEST,
                'cosine' : Dialect.WEST_LONG,
                'кос'    : Dialect.RUS,
                'косинус': Dialect.RUS_LONG
            },
            (params) => Math.cos(params[0])
        );

        // Tangent
        this.addFunction({
                'tan'    : Dialect.WEST,
                'tangent': Dialect.WEST_LONG,
                'tg'     : Dialect.EAST,
                'тан'    : Dialect.RUS,
                'тангенс': Dialect.RUS_LONG
            },
            (params) => Math.tan(params[0])
        );

        // Cotangent
        this.addFunction({
                'cot'      : Dialect.WEST,
                'cotangent': Dialect.WEST_LONG,
                'ctg'      : Dialect.EAST,
                'ctn'      : Dialect.EAST,
                'котан'    : Dialect.RUS,
                'котангенс': Dialect.RUS_LONG
            },
            (params) => 1.0 / Math.tan(params[0])
        );

        // Secant
        this.addFunction({
                'sec'   : Dialect.WEST,
                'secant': Dialect.WEST_LONG,
                'сек'   : Dialect.RUS,
                'секанс': Dialect.RUS_LONG
            },
            (params) => 1.0 / Math.cos(params[0])
        );

        // Cosecant
        this.addFunction({
                'csc'     : Dialect.WEST,
                'cosecant': Dialect.WEST_LONG,
                'cosec'   : Dialect.EAST,
                'косек'   : Dialect.RUS,
                'косеканс': Dialect.RUS_LONG
            },
            (params) => 1.0 / Math.sin(params[0])
        );
    }

    addInverseTrigonometricFunctions() {

        // Arcsine
        this.addFunction({
                'arcsin'  : Dialect.WEST,
                'arcsine' : Dialect.WEST_LONG,
                'asin'    : Dialect.PROGRAMMING,
                'арксин'  : Dialect.RUS,
                'арксинус': Dialect.RUS_LONG
            },
            (params) => Math.asin(params[0])
        );

        // Arccosine
        this.addFunction({
                'arccos'    : Dialect.WEST,
                'arccosine' : Dialect.WEST_LONG,
                'acos'      : Dialect.PROGRAMMING,
                'арккос'    : Dialect.RUS,
                'арккосинус': Dialect.RUS_LONG
            },
            (params) => Math.acos(params[0])
        );

        // Arctangent
        this.addFunction({
                'arctan'    : Dialect.WEST,
                'arctangent': Dialect.WEST_LONG,
                'arctg'     : Dialect.EAST,
                'atan'      : Dialect.PROGRAMMING,
                'арктан'    : Dialect.RUS,
                'арктангенс': Dialect.RUS_LONG
            },
            (params) => Math.atan(params[0])
        );

        // Arccotangent
        this.addFunction({
                'arccot'      : Dialect.WEST,
                'arccotangent': Dialect.WEST_LONG,
                'arcctg'      : Dialect.EAST,
                'acot'        : Dialect.PROGRAMMING,
                'арккотан'    : Dialect.RUS,
                'арккотангенс': Dialect.RUS_LONG
            },
            (params) => (params[0] < 0 ? Math.PI : 0) + Math.atan(1 / params[0])
        );

        // Arcsecant
        this.addFunction({
                'arcsec': Dialect.WEST,
                'arcsecant' : Dialect.WEST_LONG,
                'asec' : Dialect.PROGRAMMING,
                'арксек' : Dialect.RUS,
                'арксеканс' : Dialect.RUS_LONG

            },
            (params) => Math.acos(1 / params[0])
        );

        // Arccosecant
        this.addFunction({
                'arccsc': Dialect.WEST,
                'arcsecant' : Dialect.WEST_LONG,
                'arccosec' : Dialect.EAST,
                'acosec' : Dialect.PROGRAMMING,
                'арксек' : Dialect.RUS,
                'арккосеканс' : Dialect.RUS_LONG
            },
            (params) => Math.asin(1 / params[0])
        );
    }

    addHyperbolicTrigonometricFunctions() {

        // Hyperbolic sine
        this.addFunction({
                'sinh': Dialect.WEST,
                'sh' : Dialect.EAST
            },
            (params) => (Math.exp(params[0]) - Math.exp(-params[0])) / 2.0
        );

        // Hyperbolic cosine
        this.addFunction({
                'cosh': Dialect.WEST,
                'ch' : Dialect.EAST
            },
            (params) => (Math.exp(params[0]) + Math.exp(-params[0])) / 2.0
        );

        // Hyperbolic tangent
        this.addFunction({
                'tanh': Dialect.WEST,
                'th' : Dialect.EAST
            },
            (params) => (Math.exp(2 * params[0]) - 1.0) / (Math.exp(2 * params[0]) + 1.0)
        );

        // Hyperbolic cotangent
        this.addFunction({
                'coth': Dialect.WEST,
                'сth' : Dialect.EAST
            },
            (params) => (Math.exp(2 * params[0]) + 1.0) / (Math.exp(2 * params[0]) - 1.0)
        );

        // Hyperbolic secant
        this.addFunction({
                'sech': Dialect.WEST
            },
            (params) => 2.0 / (Math.exp(params[0]) + Math.exp(-params[0]))
        );

        // Hyperbolic cosecant
        this.addFunction({
                'csch': Dialect.WEST,
                'cosech' : Dialect.EAST
            },
            (params) => 2.0 / (Math.exp(params[0]) - Math.exp(-params[0]))
        );
    }

    addInverseHyperbolicTrigonometricFunctions() {
        // Hyperbolic arcsine
        this.addFunction({
                'arcsinh': Dialect.WEST,
                'arsh' : Dialect.EAST
            },
            (params) => Math.log(params[0] + Math.sqrt(params[0] * params[0] + 1))
        );

        // Hyperbolic arccosine
        this.addFunction({
                'arccosh': Dialect.WEST,
                'arch'   : Dialect.EAST
            },
            (params) => params[0] >= 1 ? (Math.log(params[0] + Math.sqrt(params[0] * params[0] - 1))) : NaN
        );

        // Hyperbolic arctangent
        this.addFunction({
                'arctanh': Dialect.WEST,
                'arth'   : Dialect.EAST
            },
            (params) => (params[0] < 1 && params[0] > -1)
                            ? (Math.log((1 + params[0]) / (1 - params[0])) / 2)
                            : NaN
        );

        // Hyperbolic arccotangent
        this.addFunction({
                'arccoth': Dialect.WEST,
                'arcth'  : Dialect.EAST
            },
            (params) => (params[0] > 1 || params[0] < -1)
                            ? (Math.log((params[0] + 1) / (params[0]) - 1) / 2)
                            : NaN
        );

        // Hyperbolic arcsecant
        this.addFunction({
                'arcsech': Dialect.WEST,
                'arsch' : Dialect.EAST
            },
            (params) => (params[0] > 0 && params[0] <= 1)
                            ? Math.log((1 + Math.sqrt(1 - params[0] * params[0])) / params[0])
                            : NaN
        );

        // Hyperbolic arccosecant
        this.addFunction({
                'arccsch': Dialect.WEST,
                'arcsch' : Dialect.EAST
            },
            (params) => Math.log(1 / params[0] + Math.sqrt(params[0] * params[0] + 1) / Math.abs(params[0]))
        );
    }

    addRoundingFunctions() {

        this.addFunction({
                'round': Dialect.WEST
            },
            (params) => Math.round(params[0])
        );

        this.addFunction({
                'floor': Dialect.WEST
            },
            (params) => Math.floor(params[0])
        );

        this.addFunction({
                'ceil': Dialect.WEST,
                'ceiling' : Dialect.WEST_LONG
            },
            (params) => Math.ceil(params[0])
        );

        this.addFunction({
                'frac': Dialect.WEST,
                'fractional' : Dialect.WEST_LONG,
                'fract' : Dialect.MISC
            },
            (params) => params[0] - Math.floor(params[0])
        );
    }

    addInvolutionFunctions() {

        // Power
        this.addFunction({
                'pow': Dialect.WEST,
                'power' : Dialect.WEST_LONG,
                'степень' : Dialect.RUS_LONG
            },
            (params) => Math.pow(params[0], params[1]),
            2
        );

        // Argument to the power 2
        this.addFunction({
            'sqr': Dialect.WEST,
            'квадрат' : Dialect.RUS_LONG
            },
            (params) => Math.pow(params[0], 2)
        );

        // Square root
        this.addFunction({
                'sqrt': Dialect.WEST,
                'кк' : Dialect.RUS
            },
            (params) => Math.sqrt(params[0])
        );

        // Cubic root
        this.addFunction({
                'cbrt': Dialect.WEST
                /*'кубкорень': Dialect.RUS_LONG*/
            },
            (params) => params[0] >= 0
                            ? Math.pow(params[0], 1 / 3)
                            : -Math.pow(-params[0], 1 / 3)
        );

        // Root
        this.addFunction({
                'root': Dialect.WEST,
                'корень' : Dialect.RUS_LONG
            },
            (params) => {
                if (Math.floor(params[0]) != params[0] || params[0] < 1) {
                    return NaN;
                }
                return params[1] >= 0
                    ? Math.pow(params[1], 1 / params[0])
                    : (Math.floor(params[0] / 2) == params[0] / 2
                        ? NaN
                        : -Math.pow(-params[1], 1 / params[0]));
            }
        );

        // E power argument
        this.addFunction({
                'exp': Dialect.WEST
            },
            (params) => Math.exp(params)
        );

        // Logarithm
        this.addFunction({
                'log': Dialect.WEST,
                'лог' : Dialect.RUS,
                'логарифм' : Dialect.RUS_LONG
            },
            (params) => Math.log(params[1]) / Math.log(params[0]),
            2
        );

        // Natural logarithm
        this.addFunction({
                'ln': Dialect.WEST
            },
            (params) => Math.log(params[0])
        );

        // Common logarithm
        this.addFunction({
                'lg': Dialect.WEST
            },
            (params) => Math.log(params[0]) / Math.LN10
        );
    }

    addMiscFunctions() {
        // Abs
        this.addFunction({
                'abs'    : Dialect.WEST,
                'modulus': Dialect.MISC,
                'модуль' : Dialect.RUS_LONG
            },
                (params) => Math.abs(params[0])
        );

        // Random number from 0 to 1. Calculated every time (no caching)
        this.addFunction({
                'random': Dialect.WEST
            },
            () => Math.random(),
            0,
            true
        );

        // Random number from 0 to 1. Calculated once
        this.addFunction({
                'random2': Dialect.WEST
            },
            () => Math.random(),
            0
        );

        // Sign of the argument
        this.addFunction({
                'sgn': Dialect.WEST,
                'sign': Dialect.WEST_LONG
            },
            (params) => {
                if (isNaN(params[0])) {
                    return NaN;
                }
                return params[0] == 0
                        ? 0
                        : (params[0] > 0 ? 1 : -1);
            }
        );
    }

    addNonMathFunctions() {

        // Maximum value
        this.addFunction({
                'max': Dialect.WEST,
                'maximum' : Dialect.WEST_LONG,
                'макс' : Dialect.RUS,
                'максимум' : Dialect.RUS_LONG
            },
            (params) => {
                var result = params[0];
                for ( var i = 1; i < params.length; i++) {
                    result = Math.max(result, params[i]);
                }
                return result;
            },
            [2]
        );

        // Minimum value
        this.addFunction({
                'min': Dialect.WEST,
                'minimum' : Dialect.WEST_LONG,
                'мин' : Dialect.RUS,
                'минимум' : Dialect.RUS_LONG
            },
            (params) => {
                var result = params[0];
                for ( var i = 1; i < params.length; i++) {
                    result = Math.min(result, params[i]);
                }
                return result;
            },
            [2]
        );

        // Condition
        this.addFunction({
                'if': Dialect.WEST,
                'если' : Dialect.RUS
            },
            (params) => {
                return params[0] > 0
                    ? params[1]
                    : params[2];
            },
            [2],
            false,
            true
        );
    }

    addConstants() {

        // Constant equal to a circle's circumference divided by its diameter
        this.addConstant({
            'pi' : Dialect.WEST,
            'π'  : Dialect.GREEK,
            'пи' : Dialect.RUS
        }, Math.PI);

        // Euler's number
        this.addConstant({
            'e' : Dialect.WEST,
            'е' : Dialect.RUS
        }, Math.E);

        // The golden ratio
        this.addConstant({
            'phi' : Dialect.WEST,
            'ph' : Dialect.MISC,
            'φ'  : Dialect.GREEK,
            'фи' : Dialect.RUS
        }, 1.6180339887);
    }

    /**
     * Loads standard variables Variables are implemented just for keeping aliases
     */
    addVariables() {

        this.addVariable('x', {
            'х' : Dialect.RUS
        });

        this.addVariable('y', {
            'у' : Dialect.RUS
        });

        this.addVariable('t', {});

        this.addVariable('a', {
            'а' : Dialect.RUS
        });
    }

    addEasterEggs() {
        // Easter eggs

        // 42 — See
        // http://en.wikipedia.org/wiki/Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything
        this.addConstant({
                'answer_to_the_ultimate_question_of_life_the_universe_and_everything': Dialect.WEST,
                'ответ_на_главный_вопрос_жизни_вселенной_и_всего_такого' : Dialect.RUS
            },
            42);
    }
}
