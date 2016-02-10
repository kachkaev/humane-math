//import _ from 'underscore';
//import {Token}       from '../../../../src/core/analysis/1-lexical/token';
import {TokenStream} from '../../../../../src/core/analysis/1-lexical/token-stream';
import HumaneMath    from '../../../../../src/humane-math';

describe('Lexical analysis → TokenStream', () => {
  it('should be accessible from the library entry point as class', () => {
    expect(HumaneMath.TokenStream).to.equal(TokenStream);
  });

  it('should be initializable', () => {
    var tokenStream = new TokenStream();
    expect(tokenStream).to.be.instanceOf(TokenStream);
  });
});
