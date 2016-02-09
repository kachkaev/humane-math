import HumaneMath from '../../../src/humane-math';

describe('HumaneMath', () => {
  describe('Text', () => {
    it(`should work`, () => {
      var text = new HumaneMath.Text(HumaneMath.symbols.STANDARD, HumaneMath.validationRules.ABSTRACT_FUNCTION);
      expect(text).to.be.instanceOf(HumaneMath.Text);

      //console.log(HumaneMath.Text, text);
      //expect(text).to.include.keys('setContent');
    });
  });
});
