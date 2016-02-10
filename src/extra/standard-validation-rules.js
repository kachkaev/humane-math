import {HumaneMath} from '../core/core';

HumaneMath.validationRules.ABSTRACT_FUNCTION = (new HumaneMath.ValidationRules())
    .setRule('allowFunctions', HumaneMath.ValidationRule.YES)
    .setRule('allowConstants', HumaneMath.ValidationRule.YES)
    .setRule('acceptMathOperations', HumaneMath.ValidationRule.YES);
//  .setRule('allowConstants', HumaneMath.ValidationRule.ONLY, ['e'])
//  .setRule('allowConstants', HumaneMath.ValidationRule.EXCLUDING, ['pi'])

// Functions
// -- f(x)
HumaneMath.validationRules.FUNCTION_Y_X = HumaneMath.validationRules.ABSTRACT_FUNCTION
    .clone()
    .setRule('allowVariables', HumaneMath.ValidationRule.ONLY, ['x']);

// -- f(y)
HumaneMath.validationRules.FUNCTION_X_Y = HumaneMath.validationRules.ABSTRACT_FUNCTION
    .clone()
    .setRule('allowVariables', HumaneMath.ValidationRule.ONLY, ['y']);

// -- f(t)
HumaneMath.validationRules.FUNCTION_X_T = HumaneMath.validationRules.ABSTRACT_FUNCTION
    .clone()
    .setRule('allowVariables', HumaneMath.ValidationRule.ONLY, ['t']);

HumaneMath.validationRules.FUNCTION_Y_T = HumaneMath.validationRules.FUNCTION_X_T;

// -- f(a)
HumaneMath.validationRules.FUNCTION_R_A = HumaneMath.validationRules.ABSTRACT_FUNCTION
    .clone()
    .setRule('allowVariables', HumaneMath.ValidationRule.ONLY, ['a']);

// Arguments
// -- range
HumaneMath.validationRules.ARG_RANGE = (new HumaneMath.ValidationRules())
    .setRule('valueOnlyFinite', HumaneMath.ValidationRule.YES)
    .setRule('allowConstants', HumaneMath.ValidationRule.YES);

// -- steps
HumaneMath.validationRules.ARG_STEPS = (new HumaneMath.ValidationRules())
    .setRule('valueOnlyFinite', HumaneMath.ValidationRule.YES)
    .setRule('valueOnlyInteger', HumaneMath.ValidationRule.YES)
    .setRule('valueRange', HumaneMath.ValidationRule.ONLY, {
      min: 2,
      max: 100000
    });

// Canvas bound
HumaneMath.validationRules.CANVAS_BOUNDS = (new HumaneMath.ValidationRules())
    .setRule('valueOnlyFinite', HumaneMath.ValidationRule.YES)
    .setRule('allowConstants', HumaneMath.ValidationRule.YES)
    .setRule('valueRange', HumaneMath.ValidationRule.ONLY, {
      min: -1000,
      max: 1000
    });
