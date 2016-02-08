import {TokenType} from '../core/analysis/1-lexical/token-type';
import {config} from '../core/config/index';

config.addLocale('en', {
  tokenNames: {
    [TokenType.RB_LEFT   ]: 'a left bracket',
    [TokenType.RB_RIGHT  ]: 'a right bracket',
    [TokenType.COMMA     ]: 'a comma',
    [TokenType.EQUAL     ]: 'an equality sign',
    [TokenType.LESS      ]: 'a “less than” sign',
    [TokenType.MORE      ]: 'a “more than” sign',
    [TokenType.LESS_EQUAL]: 'a “less than or equal” sign',
    [TokenType.MORE_EQUAL]: 'a “more than or equal” sign',
    [TokenType.ADD       ]: 'an addition sign',
    [TokenType.SUBTRACT  ]: 'a subtraction sign',
    [TokenType.MULTIPLY  ]: 'a multiplication sign',
    [TokenType.DIVIDE    ]: 'a division sign',
    [TokenType.POWER     ]: 'an exponentiation sign',
    [TokenType.NUMBER    ]: 'a number',
    [TokenType.SYMBOL    ]: 'a name of a variable or a function',
    [TokenType.SEMICOLON ]: 'a semicolon'
  },
  messages: {

    //################################
    // Lexical errors

    // A token is passed to some errors
    ['e_lex_' + TokenType.E_UNKNOWN           ]: (token) => `You cannot use symbol __${token.raw}__ in formulas.`,
    ['e_lex_' + TokenType.E_NUMBER_MALFORMED  ]: 'Malformed number. A number can contain only one dot and the dot must be surrounded with digits, e.g. _“3.14”_.',
    ['e_lex_' + TokenType.E_NUMBER_EXPONENTIAL]: 'It is not allowed to use an exponential form for numbers. Please, reformat it.',
    ['e_lex_' + TokenType.E_VERTICAL_SLASH    ]: 'It is not allowed to use vertical slash in formulas. To calculate absolute values, please use function _abs(argument)_.',
    ['e_lex_' + TokenType.E_STARSTAR          ]: 'It is not allowed to use __“**”__. To exponentiate a number, use _caret sign (“^”)_ or function _power(base, exponent)_.',
    ['e_lex_' + TokenType.E_EQUALEQUAL        ]: 'It is not allowed to use __“==”__. Use a _single_ equality sign for comparison and assignments.',
    ['e_lex_' + TokenType.E_MISPLACED_DOT     ]: 'The dot can be used only to separate digits in real numbers. For multiplication use _star sign (“*”)_.',
    ['e_lex_' + TokenType.E_SB_LEFT           ]: 'Square brackets can not be used. Use a left round bracket instead.',
    ['e_lex_' + TokenType.E_SB_RIGHT          ]: 'Square brackets can not be used. Use a right round bracket instead.',
    ['e_lex_' + TokenType.E_CB_LEFT           ]: 'Curly brackets can not be used. Use a left round bracket instead.',
    ['e_lex_' + TokenType.E_CB_RIGHT          ]: 'Curly brackets can not be used. Use a right round bracket instead.',
    ['e_lex_' + TokenType.E_AB_LEFT           ]: 'Angle brackets can not be used. Use a left round bracket instead.',
    ['e_lex_' + TokenType.E_AB_RIGHT          ]: 'Angle brackets can not be used. Use a right round bracket instead.',
    ['e_lex_' + TokenType.E_BACK_SLASH        ]: 'Use of backslash is not allowed. To divide use _forward slash (“/”)_.',
    ['e_lex_' + TokenType.E_REST              ]: 'The input string is too long and it can’t be read completely.',

    //################################
    // Syntax errors

    // Variables passed to some errors (fields of params):
    //     currentToken
    //      .type
    //      .raw
    //    previousToken

    ['e_syn_unknown'                       ]: 'Unknown syntax error detected.',

    ['e_syn_function_argument_empty'       ]: 'Function argument must not be empty.',
    ['e_syn_function_argument_wrong_symbol']: (params) => `It is not allowed to use ${this.tokenNames[params.currentToken.type]} in a function argument.`,
    ['e_syn_function_argument_semicolon'   ]: 'It is not allowed to use a semicolon to separate function arguments. Use a comma instead.',

    ['e_syn_missing_rb'                    ]: 'Missing right bracket.',
    ['e_syn_missing_multiply'              ]: (params) => `It is not allowed to write ${this.tokenNames[params.currentToken.type]} right after ${this.tokenNames[params.previousToken.type]} Multiplication sign or any other mathematical operation is probably missing.`,
    ['e_syn_missing_operand'               ]: (params) => `An operand (number, constant, function, etc.) is missing between ${params.previousToken.raw} and ${params.currentToken.raw}”.`,
    ['e_syn_missing_operand_at_begin'      ]: (params) => `An operand must go before ${this.tokenNames[params.currentToken.type]}.`,
    ['e_syn_missing_operand_at_end'        ]: (params) => `Mathematical operator (${this.tokenNames[params.currentToken.type]}) must be followed by an operand (number, constant, function, etc.).`,
    ['e_syn_extra_rb'                      ]: 'An extra right bracket found.',

    ['e_syn_brackets_empty'                ]: 'Empty brackets are allowed only for function calls with no arguments.',
    ['e_syn_brackets_wrong_symbol'         ]: (params) => `It is not allowed to use ${this.tokenNames[params.currentToken.type]} inside of an expression in brackets.`,

    ['e_syn_statements_wrong_symbol'       ]: (params) => `It is not allowed to use ${this.tokenNames[params.currentToken.type]} here.`,
    ['e_syn_statements_comma'              ]: 'It is not allowed to use a comma here as it is acceptable only in function arguments. To separate statements use semicolons.',

    ['e_syn_statement_empty_left'          ]: (params) => `An expression expected before ${this.tokenNames[params.currentToken.type]}.`,
    ['e_syn_statement_empty_right'         ]: (params) => `An expression expected after ${this.tokenNames[params.currentToken.type]}.`,
    ['e_syn_statement_extra_statement_sign']: (params) => `It is not allowed to use ${this.tokenNames[params.currentToken.type]} here. A statement has already got ${this.tokenNames[params.statementSign.type]}.`,

    //################################
    // Semantic errors
    // Variables passed to some errors (fields of params):
    //    name  name of a symbol (with keeping letters case and dialect)
    //    id    id if a symbol
    //    argumentCount              Required number of arguments for functions.
    //    argumentCount.min, argumentCount.max  Required number of arguments  for functions with various number of arguments.
    //    realArgumentCount            Number of arguments passed to a function.

    ['e_sem_constant_forbidden_all'            ]: 'It is not allowed to use constants in this input field.',
    ['e_sem_constant_forbidden_this'           ]: (params) => `It is not allowed to use constant __${params.name}__ in this input field.`,
    ['e_sem_constant_as_function'              ]: (params) => `You are trying to use a constant __${params.name}__ as a function. Remove following brackets or add a mathematical operation after the constant.`,

    ['e_sem_variable_forbidden_all'            ]: 'It is not allowed to use variables in this input field.',
    ['e_sem_variable_forbidden_this'           ]: (params) => `It is not allowed to use variable __${params.name}__ in this input field.`,
    ['e_sem_variable_as_function'              ]: (params) => `You are trying to use a variable __${params.name}__ as a function. Remove following brackets or add a mathematical operation after the variable.`,

    ['e_sem_function_forbidden_all'            ]: 'It is not allowed to use functions in this input field.',
    ['e_sem_function_forbidden_this'           ]: (params) => `It is not allowed to use function __${params.name}__ in this input field.`,
    ['e_sem_function_as_symbol'                ]: (params) => `You are trying to use function __${params.name}__ without brackets. Put the brackets after a function name.`,

    ['e_sem_function_arguments_few_exact'      ]: 'Function __${params.name}__ has too few arguments (${params.argumentCount} expected, but found ${params.realArgumentCount}).',
    ['e_sem_function_arguments_extra_exact'    ]: (params) => `Function __${params.name}__ has too many arguments (${params.argumentCount} expected, but found ${params.realArgumentCount}).`,
    ['e_sem_function_arguments_extra_0'        ]: (params) => `Function __${params.name}__ has does not need any arguments, remove them all.`,
    ['e_sem_function_arguments_few_range_n_inf']: (params) => `Function __${params.name}__ has too few arguments (more than ${params.argumentCount.min} expected, but found ${params.realArgumentCount}).`,
    ['e_sem_function_arguments_few_range_n_n'  ]: (params) => `Function __${params.name}__ has too few arguments (from ${params.argumentCount.min} to ${params.argumentCount.max} expected, but found ${params.realArgumentCount}).`,
    ['e_sem_function_arguments_extra_range_n_n']: (params) => `Function __${params.name}__ has too many arguments (from ${params.argumentCount.min} to ${params.argumentCount.max} expected, but found ${params.realArgumentCount}).`,

    ['e_sem_unknown_symbol'                    ]: (params) => `Constant or variable __${params.name}__ is unknown.`,
    ['e_sem_unknown_function'                  ]: (params) => `Function with name __${params.name}__ is unknown.`,

    ['e_sem_forbidden_equation'                ]: 'It is not allowed to use equations in this input field.',
    ['e_sem_forbidden_inequality'              ]: 'It is not allowed to use inequalities in this input field.',
    ['e_sem_forbidden_semicolon'               ]: 'It is not allowed to use a semicolon in this input field.',
    ['e_sem_forbidden_sequence_of_statements'  ]: 'Semicolons can be used only to separate statements and it is not allowed to use more than one statement in this input field.',
    ['e_sem_forbidden_empty'                   ]: 'The field must not be empty.',

    ['e_sem_expected_finite'                   ]: 'The value of the field must be finite.', //, but is equal to ${params.value}.',
    ['e_sem_expected_int'                      ]: (params) => `The value of the field must be integer, but is equal to ${params.value}.`,
    ['e_sem_expected_range'                    ]: (params) => `The value of the field is supposed to be in the range between ${params.range.min} and ${params.range.max}, but is equal to ${params.value}.`,
    ['e_sem_expected_gt'                       ]: (params) => `The value of the field is supposed to be greater than ${params.bound}, but is equal to ${params.value}.`,
    ['e_sem_expected_lt'                       ]: (params) => `The value of the field is supposed to be less than ${params.bound}, but is equal to ${params.value}.`
  }
});

config.currentLocale = 'en';
