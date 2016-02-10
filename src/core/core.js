import {Message}     from './analysis/message';
import {MessageList} from './analysis/message-list';
import {Position}         from './analysis/position';

import {Token}       from './analysis/1-lexical/token';
import {TokenStream} from './analysis/1-lexical/token-stream';

import {TreeNodeType} from './analysis/2-syntactic/tree-node-type';
import {TreeNode}     from './analysis/2-syntactic/tree-node';
import {Tree}         from './analysis/2-syntactic/tree';

import {ValidationRule}  from './analysis/3-semantic/validation-rule';
import {ValidationRules} from './analysis/3-semantic/validation-rules';
import {Validator}       from './analysis/3-semantic/validator';

import {Dialect} from './config/dialect';
import {Locale}  from './config/locale';
import {Symbols} from './config/symbols';

import {Text}       from './text';
import {Calculator} from './calculator';

var HumaneMath = {
  Message,
  MessageList,
  Position,

  Token,
  TokenStream,

  TreeNodeType,
  TreeNode,
  Tree,

  ValidationRule,
  ValidationRules,
  Validator,

  Dialect,
  Locale,
  Symbols,

  Text,
  Calculator,

  symbols: {},
  validationRules: {},
  locales: {}
};

HumaneMath.addLocale = function(locale, data) {
  HumaneMath.locales[locale] = new Locale(data);
};

HumaneMath.setLocale = function(locale) {
  HumaneMath.currentLocale = locale;
};

export {HumaneMath};
