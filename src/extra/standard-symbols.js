import {HumaneMath} from '../core/core';

/* eslint-disable indent, spellcheck/spell-checker */
/* See http://github.com/eslint/eslint/issues/4696 */

/**
 * The class is a standard source for properties of all standard functions,
 * constants and variables.
 */

class StandardSymbols extends HumaneMath.Symbols {

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
        'sin':   HumaneMath.Dialect.WEST,
        'sine':  HumaneMath.Dialect.WEST_LONG,
        'син':   HumaneMath.Dialect.RUS,
        'синус': HumaneMath.Dialect.RUS_LONG
      },
      (params) => Math.sin(params[0])
    );

    // Cosine
    this.addFunction({
        'cos':     HumaneMath.Dialect.WEST,
        'cosine':  HumaneMath.Dialect.WEST_LONG,
        'кос':     HumaneMath.Dialect.RUS,
        'косинус': HumaneMath.Dialect.RUS_LONG
      },
      (params) => Math.cos(params[0])
    );

    // Tangent
    this.addFunction({
        'tan':     HumaneMath.Dialect.WEST,
        'tangent': HumaneMath.Dialect.WEST_LONG,
        'tg':      HumaneMath.Dialect.EAST,
        'тан':     HumaneMath.Dialect.RUS,
        'тангенс': HumaneMath.Dialect.RUS_LONG
      },
      (params) => Math.tan(params[0])
    );

    // Cotangent
    this.addFunction({
        'cot':       HumaneMath.Dialect.WEST,
        'cotangent': HumaneMath.Dialect.WEST_LONG,
        'ctg':       HumaneMath.Dialect.EAST,
        'ctn':       HumaneMath.Dialect.EAST,
        'котан':     HumaneMath.Dialect.RUS,
        'котангенс': HumaneMath.Dialect.RUS_LONG
      },
      (params) => 1.0 / Math.tan(params[0])
    );

    // Secant
    this.addFunction({
        'sec':    HumaneMath.Dialect.WEST,
        'secant': HumaneMath.Dialect.WEST_LONG,
        'сек':    HumaneMath.Dialect.RUS,
        'секанс': HumaneMath.Dialect.RUS_LONG
      },
      (params) => 1.0 / Math.cos(params[0])
    );

    // Cosecant
    this.addFunction({
        'csc':      HumaneMath.Dialect.WEST,
        'cosecant': HumaneMath.Dialect.WEST_LONG,
        'cosec':    HumaneMath.Dialect.EAST,
        'косек':    HumaneMath.Dialect.RUS,
        'косеканс': HumaneMath.Dialect.RUS_LONG
      },
      (params) => 1.0 / Math.sin(params[0])
    );
  }

  addInverseTrigonometricFunctions() {

    // Arcsine
    this.addFunction({
        'arcsin':   HumaneMath.Dialect.WEST,
        'arcsine':  HumaneMath.Dialect.WEST_LONG,
        'asin':     HumaneMath.Dialect.PROGRAMMING,
        'арксин':   HumaneMath.Dialect.RUS,
        'арксинус': HumaneMath.Dialect.RUS_LONG
      },
      (params) => Math.asin(params[0])
    );

    // Arccosine
    this.addFunction({
        'arccos':     HumaneMath.Dialect.WEST,
        'arccosine':  HumaneMath.Dialect.WEST_LONG,
        'acos':       HumaneMath.Dialect.PROGRAMMING,
        'арккос':     HumaneMath.Dialect.RUS,
        'арккосинус': HumaneMath.Dialect.RUS_LONG
      },
      (params) => Math.acos(params[0])
    );

    // Arctangent
    this.addFunction({
        'arctan':     HumaneMath.Dialect.WEST,
        'arctangent': HumaneMath.Dialect.WEST_LONG,
        'arctg':      HumaneMath.Dialect.EAST,
        'atan':       HumaneMath.Dialect.PROGRAMMING,
        'арктан':     HumaneMath.Dialect.RUS,
        'арктангенс': HumaneMath.Dialect.RUS_LONG
      },
      (params) => Math.atan(params[0])
    );

    // Arccotangent
    this.addFunction({
        'arccot':       HumaneMath.Dialect.WEST,
        'arccotangent': HumaneMath.Dialect.WEST_LONG,
        'arcctg':       HumaneMath.Dialect.EAST,
        'acot':         HumaneMath.Dialect.PROGRAMMING,
        'арккотан':     HumaneMath.Dialect.RUS,
        'арккотангенс': HumaneMath.Dialect.RUS_LONG
      },
      (params) => (params[0] < 0 ? Math.PI : 0) + Math.atan(1 / params[0])
    );

    // Arcsecant
    this.addFunction({
        'arcsec':    HumaneMath.Dialect.WEST,
        'arcsecant': HumaneMath.Dialect.WEST_LONG,
        'asec':      HumaneMath.Dialect.PROGRAMMING,
        'арксек':    HumaneMath.Dialect.RUS,
        'арксеканс': HumaneMath.Dialect.RUS_LONG

      },
      (params) => Math.acos(1 / params[0])
    );

    // Arccosecant
    this.addFunction({
        'arccsc':      HumaneMath.Dialect.WEST,
        'arcsecant':   HumaneMath.Dialect.WEST_LONG,
        'arccosec':    HumaneMath.Dialect.EAST,
        'acosec':      HumaneMath.Dialect.PROGRAMMING,
        'арксек':      HumaneMath.Dialect.RUS,
        'арккосеканс': HumaneMath.Dialect.RUS_LONG
      },
      (params) => Math.asin(1 / params[0])
    );
  }

  addHyperbolicTrigonometricFunctions() {

    // Hyperbolic sine
    this.addFunction({
        'sinh': HumaneMath.Dialect.WEST,
        'sh':   HumaneMath.Dialect.EAST
      },
      (params) => (Math.exp(params[0]) - Math.exp(-params[0])) / 2.0
    );

    // Hyperbolic cosine
    this.addFunction({
        'cosh': HumaneMath.Dialect.WEST,
        'ch':   HumaneMath.Dialect.EAST
      },
      (params) => (Math.exp(params[0]) + Math.exp(-params[0])) / 2.0
    );

    // Hyperbolic tangent
    this.addFunction({
        'tanh': HumaneMath.Dialect.WEST,
        'th':   HumaneMath.Dialect.EAST
      },
      (params) => (Math.exp(2 * params[0]) - 1.0) / (Math.exp(2 * params[0]) + 1.0)
    );

    // Hyperbolic cotangent
    this.addFunction({
        'coth': HumaneMath.Dialect.WEST,
        'сth':  HumaneMath.Dialect.EAST
      },
      (params) => (Math.exp(2 * params[0]) + 1.0) / (Math.exp(2 * params[0]) - 1.0)
    );

    // Hyperbolic secant
    this.addFunction({
        'sech': HumaneMath.Dialect.WEST
      },
      (params) => 2.0 / (Math.exp(params[0]) + Math.exp(-params[0]))
    );

    // Hyperbolic cosecant
    this.addFunction({
        'csch':   HumaneMath.Dialect.WEST,
        'cosech': HumaneMath.Dialect.EAST
      },
      (params) => 2.0 / (Math.exp(params[0]) - Math.exp(-params[0]))
    );
  }

  addInverseHyperbolicTrigonometricFunctions() {
    // Hyperbolic arcsine
    this.addFunction({
        'arcsinh': HumaneMath.Dialect.WEST,
        'arsh':    HumaneMath.Dialect.EAST
      },
      (params) => Math.log(params[0] + Math.sqrt(params[0] * params[0] + 1))
    );

    // Hyperbolic arccosine
    this.addFunction({
        'arccosh': HumaneMath.Dialect.WEST,
        'arch':    HumaneMath.Dialect.EAST
      },
      (params) => params[0] >= 1 ? (Math.log(params[0] + Math.sqrt(params[0] * params[0] - 1))) : NaN
    );

    // Hyperbolic arctangent
    this.addFunction({
        'arctanh': HumaneMath.Dialect.WEST,
        'arth':    HumaneMath.Dialect.EAST
      },
      (params) => (params[0] < 1 && params[0] > -1)
              ? (Math.log((1 + params[0]) / (1 - params[0])) / 2)
              : NaN
    );

    // Hyperbolic arccotangent
    this.addFunction({
        'arccoth': HumaneMath.Dialect.WEST,
        'arcth':   HumaneMath.Dialect.EAST
      },
      (params) => (params[0] > 1 || params[0] < -1)
              ? (Math.log((params[0] + 1) / (params[0]) - 1) / 2)
              : NaN
    );

    // Hyperbolic arcsecant
    this.addFunction({
        'arcsech': HumaneMath.Dialect.WEST,
        'arsch':   HumaneMath.Dialect.EAST
      },
      (params) => (params[0] > 0 && params[0] <= 1)
              ? Math.log((1 + Math.sqrt(1 - params[0] * params[0])) / params[0])
              : NaN
    );

    // Hyperbolic arccosecant
    this.addFunction({
        'arccsch': HumaneMath.Dialect.WEST,
        'arcsch':  HumaneMath.Dialect.EAST
      },
      (params) => Math.log(1 / params[0] + Math.sqrt(params[0] * params[0] + 1) / Math.abs(params[0]))
    );
  }

  addRoundingFunctions() {

    this.addFunction({
        'round': HumaneMath.Dialect.WEST
      },
      (params) => Math.round(params[0])
    );

    this.addFunction({
        'floor': HumaneMath.Dialect.WEST
      },
      (params) => Math.floor(params[0])
    );

    this.addFunction({
        'ceil':    HumaneMath.Dialect.WEST,
        'ceiling': HumaneMath.Dialect.WEST_LONG
      },
      (params) => Math.ceil(params[0])
    );

    this.addFunction({
        'frac':       HumaneMath.Dialect.WEST,
        'fractional': HumaneMath.Dialect.WEST_LONG,
        'fract':      HumaneMath.Dialect.MISC
      },
      (params) => params[0] - Math.floor(params[0])
    );
  }

  addInvolutionFunctions() {

    // Power
    this.addFunction({
        'pow':     HumaneMath.Dialect.WEST,
        'power':   HumaneMath.Dialect.WEST_LONG,
        'степень': HumaneMath.Dialect.RUS_LONG
      },
      (params) => Math.pow(params[0], params[1]),
      2
    );

    // Argument to the power 2
    this.addFunction({
        'sqr':     HumaneMath.Dialect.WEST,
        'квадрат': HumaneMath.Dialect.RUS_LONG
      },
      (params) => Math.pow(params[0], 2)
    );

    // Square root
    this.addFunction({
        'sqrt': HumaneMath.Dialect.WEST,
        'кк':   HumaneMath.Dialect.RUS
      },
      (params) => Math.sqrt(params[0])
    );

    // Cubic root
    this.addFunction({
        'cbrt': HumaneMath.Dialect.WEST
        /*'кубкорень': HumaneMath.Dialect.RUS_LONG*/
      },
      (params) => params[0] >= 0
              ? Math.pow(params[0], 1 / 3)
              : -Math.pow(-params[0], 1 / 3)
    );

    // Root
    this.addFunction({
        'root':   HumaneMath.Dialect.WEST,
        'корень': HumaneMath.Dialect.RUS_LONG
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
        'exp': HumaneMath.Dialect.WEST
      },
      (params) => Math.exp(params)
    );

    // Logarithm
    this.addFunction({
        'log':      HumaneMath.Dialect.WEST,
        'лог':      HumaneMath.Dialect.RUS,
        'логарифм': HumaneMath.Dialect.RUS_LONG
      },
      (params) => Math.log(params[1]) / Math.log(params[0]),
      2
    );

    // Natural logarithm
    this.addFunction({
        'ln': HumaneMath.Dialect.WEST
      },
      (params) => Math.log(params[0])
    );

    // Common logarithm
    this.addFunction({
        'lg': HumaneMath.Dialect.WEST
      },
      (params) => Math.log(params[0]) / Math.LN10
    );
  }

  addMiscFunctions() {
    // Abs
    this.addFunction({
        'abs':     HumaneMath.Dialect.WEST,
        'modulus': HumaneMath.Dialect.MISC,
        'модуль':  HumaneMath.Dialect.RUS_LONG
      },
        (params) => Math.abs(params[0])
    );

    // Random number from 0 to 1. Calculated every time (no caching)
    this.addFunction({
        'random': HumaneMath.Dialect.WEST
      },
      () => Math.random(),
      0,
      true
    );

    // Random number from 0 to 1. Calculated once
    this.addFunction({
        'random2': HumaneMath.Dialect.WEST
      },
      () => Math.random(),
      0
    );

    // Sign of the argument
    this.addFunction({
        'sgn':  HumaneMath.Dialect.WEST,
        'sign': HumaneMath.Dialect.WEST_LONG
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
        'max':      HumaneMath.Dialect.WEST,
        'maximum':  HumaneMath.Dialect.WEST_LONG,
        'макс':     HumaneMath.Dialect.RUS,
        'максимум': HumaneMath.Dialect.RUS_LONG
      },
      (params) => {
        var result = params[0];
        for (var i = 1; i < params.length; i++) {
          result = Math.max(result, params[i]);
        }
        return result;
      },
      [2]
    );

    // Minimum value
    this.addFunction({
        'min': HumaneMath.Dialect.WEST,
        'minimum':  HumaneMath.Dialect.WEST_LONG,
        'мин':  HumaneMath.Dialect.RUS,
        'минимум':  HumaneMath.Dialect.RUS_LONG
      },
      (params) => {
        var result = params[0];
        for (var i = 1; i < params.length; i++) {
          result = Math.min(result, params[i]);
        }
        return result;
      },
      [2]
    );

    // Condition
    this.addFunction({
        'if': HumaneMath.Dialect.WEST,
        'если':  HumaneMath.Dialect.RUS
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
      'pi':  HumaneMath.Dialect.WEST,
      'π':   HumaneMath.Dialect.GREEK,
      'пи':  HumaneMath.Dialect.RUS
    }, Math.PI);

    // Euler's number
    this.addConstant({
      'e':  HumaneMath.Dialect.WEST,
      'е':  HumaneMath.Dialect.RUS
    }, Math.E);

    // The golden ratio
    this.addConstant({
      'phi': HumaneMath.Dialect.WEST,
      'ph':  HumaneMath.Dialect.MISC,
      'φ':   HumaneMath.Dialect.GREEK,
      'фи':  HumaneMath.Dialect.RUS
    }, 1.6180339887);
  }

  /**
   * Loads standard variables Variables are implemented just for keeping aliases
   */
  addVariables() {

    this.addVariable('x', {
      'х': HumaneMath.Dialect.RUS
    });

    this.addVariable('y', {
      'у': HumaneMath.Dialect.RUS
    });

    this.addVariable('t', {});

    this.addVariable('a', {
      'а': HumaneMath.Dialect.RUS
    });
  }

  addEasterEggs() {
    // Easter eggs

    // 42 — See
    // http://en.wikipedia.org/wiki/Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything
    this.addConstant({
        'answer_to_the_ultimate_question_of_life_the_universe_and_everything': HumaneMath.Dialect.WEST,
        'ответ_на_главный_вопрос_жизни_вселенной_и_всего_такого':              HumaneMath.Dialect.RUS
      },
      42);
  }
}

HumaneMath.StandardSymbols = StandardSymbols;
HumaneMath.symbols.STANDARD = new StandardSymbols();
