import HumaneMath from '../../src/humane-math';

describe('HumaneMath', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(HumaneMath, 'Message');
      HumaneMath.Text();
    });

    it('should have been run once', () => {
      //expect(HumaneMath.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      //expect(HumaneMath.greet).to.have.always.returned('hello');
    });
  });
});
