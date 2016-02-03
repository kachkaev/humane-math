function MathValidationRulesBase() {
}

/**
 * Returns the rule by its name.
 * @param {String} name Name of the rule. Can be lowercase.
 */
MathValidationRulesBase.get = function(name) {
    var nameUppered = name.toUpperCase();
    if (MathValidationRulesBase.hasOwnProperty(nameUppered))
        return MathValidationRulesBase[nameUppered];
    else
        throw new Error("Could not find a preset with name \""+name+"\" in MathValidationRulesBase");
};

MathValidationRulesBase.ABSTRACT_FUNCTION = (new MathValidationRules())
        .setRule("useStandardFunctions", MathValidationRule.YES).setRule(
                "useStandardConstants", MathValidationRule.YES).setRule(
                "acceptMathOperations", MathValidationRule.YES);
// .setRule("useStandardConstants", MathValidationRule.ONLY, ["e"])
// .setRule("useStandardConstants", MathValidationRule.EXCLUDING, ["pi"])

// Functions
// ** f(x)
MathValidationRulesBase.FUNCTION_Y_X = MathValidationRulesBase.ABSTRACT_FUNCTION
        .clone().setRule("useStandardVariables", MathValidationRule.ONLY,
                [ "x" ]);
// ** f(y)
MathValidationRulesBase.FUNCTION_X_Y = MathValidationRulesBase.ABSTRACT_FUNCTION
        .clone().setRule("useStandardVariables", MathValidationRule.ONLY,
                [ "y" ]);
// ** f(t)
MathValidationRulesBase.FUNCTION_X_T = MathValidationRulesBase.ABSTRACT_FUNCTION
        .clone().setRule("useStandardVariables", MathValidationRule.ONLY,
                [ "t" ]);
MathValidationRulesBase.FUNCTION_Y_T = MathValidationRulesBase.FUNCTION_X_T;
// ** f(a)
MathValidationRulesBase.FUNCTION_R_A = MathValidationRulesBase.ABSTRACT_FUNCTION
        .clone().setRule("useStandardVariables", MathValidationRule.ONLY,
                [ "a" ]);

// Arguments
// ** range
MathValidationRulesBase.ARG_RANGE = (new MathValidationRules()).setRule(
        "valueOnlyFinite", MathValidationRule.YES).setRule(
        "useStandardConstants", MathValidationRule.YES);

// ** steps
MathValidationRulesBase.ARG_STEPS = (new MathValidationRules()).setRule(
        "valueOnlyFinite", MathValidationRule.YES).setRule("valueOnlyInteger",
        MathValidationRule.YES).setRule("valueRange", MathValidationRule.ONLY,
        {
            min : 2,
            max : 100000
        });

// Canvas bound
MathValidationRulesBase.CANVAS_BOUNDS = (new MathValidationRules()).setRule(
        "valueOnlyFinite", MathValidationRule.YES).setRule("valueRange",
        MathValidationRule.ONLY, {
            min : -1000,
            max : 1000
        }).setRule("useStandardConstants", MathValidationRule.YES);