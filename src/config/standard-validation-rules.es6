import {
  ValidationRule,
  ValidationRules
} from 'humane-math';

export var StandardValidationRules = {};

StandardValidationRules.ABSTRACT_FUNCTION = (new ValidationRules())
  .setRule('allowFunctions', ValidationRule.YES)
  .setRule('allowConstants', ValidationRule.YES)
  .setRule('acceptMathOperations', ValidationRule.YES);
//  .setRule('allowConstants', ValidationRule.ONLY, ['e'])
//  .setRule('allowConstants', ValidationRule.EXCLUDING, ['pi'])

// Functions
// -- f(x)
StandardValidationRules.FUNCTION_Y_X = StandardValidationRules.ABSTRACT_FUNCTION
    .clone()
    .setRule('allowVariables', ValidationRule.ONLY, [ 'x' ]);

// -- f(y)
StandardValidationRules.FUNCTION_X_Y = StandardValidationRules.ABSTRACT_FUNCTION
    .clone()
    .setRule('allowVariables', ValidationRule.ONLY, [ 'y' ]);

// -- f(t)
StandardValidationRules.FUNCTION_X_T = StandardValidationRules.ABSTRACT_FUNCTION
    .clone()
    .setRule('allowVariables', ValidationRule.ONLY, [ 't' ]);

StandardValidationRules.FUNCTION_Y_T = StandardValidationRules.FUNCTION_X_T;

// -- f(a)
StandardValidationRules.FUNCTION_R_A = StandardValidationRules.ABSTRACT_FUNCTION
    .clone()
    .setRule('allowVariables', ValidationRule.ONLY, [ 'a' ]);

// Arguments
// -- range
StandardValidationRules.ARG_RANGE = (new ValidationRules())
    .setRule('valueOnlyFinite', ValidationRule.YES)
    .setRule('allowConstants', ValidationRule.YES);

// -- steps
StandardValidationRules.ARG_STEPS = (new ValidationRules())
    .setRule('valueOnlyFinite', ValidationRule.YES)
    .setRule('valueOnlyInteger', ValidationRule.YES)
    .setRule('valueRange', ValidationRule.ONLY, {
      min : 2,
      max : 100000
    });

// Canvas bound
StandardValidationRules.CANVAS_BOUNDS = (new ValidationRules())
    .setRule('valueOnlyFinite', ValidationRule.YES)
    .setRule('allowConstants', ValidationRule.YES)
    .setRule('valueRange', ValidationRule.ONLY, {
      min : -1000,
      max : 1000
    });
