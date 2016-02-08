import _ from 'underscore';
import HumaneMath from '../../src/humane-math';

var listOfRequiredClassNames = [
  'Message',
  'MessageList',
  'Pos',

  'TokenType',
  'Token',
  'TokenStream',

  'TreeNodeType',
  'TreeNode',
  'Tree',

  'ValidationRule',
  'ValidationRules',
  'Validator',

  'Dialect',
  'Locale',
  'Symbols',

  'Text',
  'Calculator'
];

var listOfRequiredObjectNames = [
  'symbols',
  'validationRules',
  'locales'
];

var listOfRequiredMethodNames = [
  'addLocale',
  'setLocale'
];

describe('HumaneMath', () => {
  describe('Structure', () => {
    it(`should have all required classes (${listOfRequiredClassNames.join(', ')})`, () => {
      _.each(listOfRequiredClassNames, function(requiredClassName) {
        expect(HumaneMath[requiredClassName], requiredClassName).not.to.be.undefined;
        var obj = new HumaneMath[requiredClassName];
        expect(obj, requiredClassName).to.be.an.instanceOf(HumaneMath[requiredClassName]);
      });
    });

    it(`should have all required objects (${listOfRequiredObjectNames.join(', ')})`, () => {
      _.each(listOfRequiredObjectNames, function(requiredObjectName) {
        expect(HumaneMath[requiredObjectName], requiredObjectName).not.to.be.undefined;
        expect(HumaneMath[requiredObjectName], requiredObjectName).to.be.an.instanceOf(Object);
      });
    });

    it(`should have all required methods (${listOfRequiredMethodNames.join(', ')})`, () => {
      _.each(listOfRequiredMethodNames, function(requiredMethodName) {
        expect(HumaneMath[requiredMethodName], requiredMethodName).not.to.be.undefined;
        expect(HumaneMath[requiredMethodName], requiredMethodName).to.be.an.instanceOf(Function);
      });
    });
  });
});
