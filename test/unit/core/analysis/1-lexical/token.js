import _ from 'underscore';
import {Token}       from '../../../../../src/core/analysis/1-lexical/token';
import HumaneMath    from '../../../../../src/humane-math';

// var contentSets = {
//   '': {},
//   '42': {},
//   'default text': {}
// };

var testCasesThatAreCorrect = [
  {
    constructorArgs: [Token.TYPE_EOF, 0, 0, 0],
    expectedLength: 0,
    expectedTypeAfterClone: Token.TYPE_EOF
  }, {
    constructorArgs: [Token.TYPE_EOF, 0, 0, 0],
    expectedLength: 0,
    expectedTypeAfterClone: Token.TYPE_EOF
  }, {
    constructorArgs: [Token.TYPE_E_STARSTAR, 0, 0, 0, '**'],
    expectedLength: 2,
    expectedTypeAfterClone: Token.TYPE_POWER
  }, {
    constructorArgs: [Token.TYPE_E_SB_LEFT, 0, 0, 0, '['],
    expectedLength: 1,
    expectedTypeAfterClone: Token.TYPE_RB_LEFT
  }, {
    constructorArgs: [Token.TYPE_E_CB_RIGHT, 0, 0, 0, '}'],
    expectedLength: 1,
    expectedTypeAfterClone: Token.TYPE_RB_RIGHT
  }, {
    constructorArgs: [Token.TYPE_LESS_EQUAL, 1, 2, 3, '<='],
    expectedLength: 2,
    expectedTypeAfterClone: Token.TYPE_LESS_EQUAL
  }, {
    constructorArgs: [Token.TYPE_SYMBOL, 0, 0, 0, 'test', 'test'],
    expectedLength: 4,
    expectedTypeAfterClone: Token.TYPE_SYMBOL
  }, {
    constructorArgs: [Token.TYPE_NUMBER, 0, 0, 0, '42', 42],
    expectedLength: 2,
    expectedTypeAfterClone: Token.TYPE_NUMBER
  }, {
    constructorArgs: [Token.TYPE_E_NUMBER_MALFORMED, 0, 0, 0, '42.0.0'],
    expectedLength: 6,
    expectedTypeAfterClone: Token.TYPE_NUMBER
  }, {
    constructorArgs: [Token.TYPE_E_UNKNOWN, 0, 0, 0, '----------'],
    expectedLength: 10,
    expectedTypeAfterClone: Token.TYPE_E_UNKNOWN
  }
];

var testCasesThatFailToInitialize = [
  {
    constructorArgs: [],
    throws: /Token type must be defined correctly/
  }, {
    constructorArgs: [-1],
    throws: /Token type must be defined correctly/
  }, {
    constructorArgs: ['42'],
    throws: /Token type must be defined correctly/
  }, {
    constructorArgs: [Token.TYPE_EOF],
    throws: /Position row/
  }, {
    constructorArgs: [Token.TYPE_EOF, -1, 0, 0],
    throws: /Position row/
  }, {
    constructorArgs: [Token.TYPE_EOF, 0, -1, 0],
    throws: /Position column/
  }, {
    constructorArgs: [Token.TYPE_EOF, 0, 0, -1],
    throws: /Position offset/
  }, {
    constructorArgs: [Token.TYPE_EOF, 0.5, 0, 0],
    throws: /Position row/
  }, {
    constructorArgs: [Token.TYPE_EOF, 0, 0.5, 0],
    throws: /Position column/
  }, {
    constructorArgs: [Token.TYPE_EOF, 0, 0, 0.5],
    throws: /Position offset/
  }, {
    constructorArgs: [Token.TYPE_EOF, 'test', 0, 0],
    throws: /Position row/
  }, {
    constructorArgs: [Token.TYPE_EOF, 0, 'test', 0],
    throws: /Position column/
  }, {
    constructorArgs: [Token.TYPE_EOF, 0, 0, 'test'],
    throws: /Position offset/
  }, {
    constructorArgs: [Token.TYPE_EOF, 0, 0, 0, '10'],
    throws: /Token text must be undefined/
  }, {
    constructorArgs: [Token.TYPE_RB_LEFT, 0, 0, 0],
    throws: /Token text must be a string/
  }, {
    constructorArgs: [Token.TYPE_RB_LEFT, 0, 0, 0, 42],
    throws: /Token text must be a string/
  }, {
    constructorArgs: [Token.TYPE_RB_LEFT, 0, 0, 0, 'test', 'test'],
    throws: /Token value must not be provided/
  }, {
    constructorArgs: [Token.TYPE_SYMBOL, 0, 0, 0, 'test'],
    throws: /Token value must be a string /
  }, {
    constructorArgs: [Token.TYPE_NUMBER, 0, 0, 0, 'test'],
    throws: /Token value must be a number/
  }, {
    constructorArgs: [Token.TYPE_SYMBOL, 0, 0, 0, 'test', 42],
    throws: /Token value must be a string /
  }, {
    constructorArgs: [Token.TYPE_NUMBER, 0, 0, 0, 'test', 'test'],
    throws: /Token value must be a number/
  }
];

var testCasesForGetHash = [
  {
    constructorArgs1: [Token.TYPE_EOF, 0, 0, 0],
    constructorArgs2: [Token.TYPE_EOF, 0, 0, 0],
    expectedHashEquality: true
  }, {
    constructorArgs1: [Token.TYPE_RB_LEFT, 0, 0, 0, '('],
    constructorArgs2: [Token.TYPE_RB_LEFT, 0, 0, 0, '('],
    expectedHashEquality: true
  }, {
    constructorArgs1: [Token.TYPE_RB_LEFT, 10, 0, 0, '('],
    constructorArgs2: [Token.TYPE_RB_LEFT, 11, 0, 0, '('],
    expectedHashEquality: false
  }, {
    constructorArgs1: [Token.TYPE_RB_LEFT, 0, 10, 0, '('],
    constructorArgs2: [Token.TYPE_RB_LEFT, 0, 11, 0, '('],
    expectedHashEquality: false
  }, {
    constructorArgs1: [Token.TYPE_RB_LEFT, 5, 6, 10, '('],
    constructorArgs2: [Token.TYPE_RB_LEFT, 5, 6, 11, '('],
    expectedHashEquality: false
  }, {
    constructorArgs1: [Token.TYPE_LESS_EQUAL, 0, 0, 0, '≤'],
    constructorArgs2: [Token.TYPE_LESS_EQUAL, 0, 0, 0, '<='],
    expectedHashEquality: true
  }, {
    constructorArgs1: [Token.TYPE_NUMBER, 2, 5, 10, '42', 42],
    constructorArgs2: [Token.TYPE_NUMBER, 2, 5, 10, '42.000', 42],
    expectedHashEquality: true
  }, {
    constructorArgs1: [Token.TYPE_NUMBER, 2, 5, 10, '42', 42],
    constructorArgs2: [Token.TYPE_NUMBER, 2, 5, 11, '42', 42],
    expectedHashEquality: false
  }, {
    constructorArgs1: [Token.TYPE_SYMBOL, 0, 10, 1, 'test', 'test'],
    constructorArgs2: [Token.TYPE_SYMBOL, 0, 10, 1, 'tEst', 'test'],
    expectedHashEquality: true
  }
];

var testCasesForIsXXX = [
  {
    methodName: 'isEOF',
    applicableTypes: [Token.TYPE_EOF]
  }, {
    methodName: 'isErrorToken',
    applicableTypes: [
      Token.TYPE_E_UNKNOWN,
      Token.TYPE_E_NUMBER_MALFORMED,
      Token.TYPE_E_NUMBER_EXPONENTIAL,
      Token.TYPE_E_VERTICAL_SLASH,
      Token.TYPE_E_STARSTAR,
      Token.TYPE_E_EQUALEQUAL,
      Token.TYPE_E_MISPLACED_DOT,
      Token.TYPE_E_SB_LEFT,
      Token.TYPE_E_SB_RIGHT,
      Token.TYPE_E_CB_LEFT,
      Token.TYPE_E_CB_RIGHT,
      Token.TYPE_E_AB_LEFT,
      Token.TYPE_E_AB_RIGHT,
      Token.TYPE_E_BACK_SLASH,
      Token.TYPE_E_REST
    ]
  }, {
    methodName: 'isLeftBracket',
    applicableTypes: [Token.TYPE_RB_LEFT, Token.TYPE_E_SB_LEFT, Token.TYPE_E_CB_LEFT, Token.TYPE_E_AB_LEFT]
  }, {
    methodName: 'isRightBracket',
    applicableTypes: [Token.TYPE_RB_RIGHT, Token.TYPE_E_SB_RIGHT, Token.TYPE_E_CB_RIGHT, Token.TYPE_E_AB_RIGHT]
  }, {
    methodName: 'isNumber',
    applicableTypes: [Token.TYPE_NUMBER, Token.TYPE_E_NUMBER_MALFORMED, Token.TYPE_E_NUMBER_EXPONENTIAL]
  }, {
    methodName: 'isSymbol',
    applicableTypes: [Token.TYPE_SYMBOL]
  }, {
    methodName: 'isPowerSign',
    applicableTypes: [Token.TYPE_POWER, Token.TYPE_E_STARSTAR]
  }, {
    methodName: 'isTermSign',
    applicableTypes: [Token.TYPE_MULTIPLY, Token.TYPE_DIVIDE, Token.TYPE_E_MISPLACED_DOT, Token.TYPE_E_BACK_SLASH]
  }, {
    methodName: 'isExpressionSign',
    applicableTypes: [Token.TYPE_ADD, Token.TYPE_SUBTRACT]
  }, {
    methodName: 'isMathOperator',
    applicableTypes: [
      Token.TYPE_POWER, Token.TYPE_E_STARSTAR,
      Token.TYPE_MULTIPLY, Token.TYPE_DIVIDE, Token.TYPE_E_MISPLACED_DOT, Token.TYPE_E_BACK_SLASH,
      Token.TYPE_ADD, Token.TYPE_SUBTRACT
    ]
  }, {
    methodName: 'isStatementSign',
    applicableTypes: [Token.TYPE_EQUAL, Token.TYPE_LESS, Token.TYPE_MORE, Token.TYPE_MORE_EQUAL, Token.TYPE_LESS_EQUAL, Token.TYPE_E_EQUALEQUAL]
  }
];

describe('Lexical analysis → Token', () => {
  it('should be accessible from the library entry point as class', () => {
    expect(HumaneMath.Token).to.equal(Token);
  });

  it('should not be initializable with incorrect combinations of arguments', () => {
    _.each(testCasesThatFailToInitialize, (testCase, index) => {
      var testCaseLabel = JSON.stringify(testCase.name) || ('case ' + index);
      expect(
          () => {new Token(
              testCase.constructorArgs[0],
              testCase.constructorArgs[1],
              testCase.constructorArgs[2],
              testCase.constructorArgs[3],
              testCase.constructorArgs[4],
              testCase.constructorArgs[5]
            );
          }, testCaseLabel
        ).to.throw(testCase.throws);
    });
  });

  it('should be initializable with correct combinations of arguments', () => {
    _.each(testCasesThatAreCorrect, (testCase, index) => {
      var testCaseLabel = JSON.stringify(testCase.name) || ('case ' + index);
      expect(
          () => {new Token(
              testCase.constructorArgs[0],
              testCase.constructorArgs[1],
              testCase.constructorArgs[2],
              testCase.constructorArgs[3],
              testCase.constructorArgs[4],
              testCase.constructorArgs[5]
            );
          }, testCaseLabel
        ).to.not.throw();
    });
  });

  it('should have all properties available and set correctly', () => {
    _.each(testCasesThatAreCorrect, (testCase, index) => {
      var testCaseLabel = JSON.stringify(testCase.name) || ('case ' + index);
      var token = null;
      expect(
          () => {token = new Token(
              testCase.constructorArgs[0],
              testCase.constructorArgs[1],
              testCase.constructorArgs[2],
              testCase.constructorArgs[3],
              testCase.constructorArgs[4],
              testCase.constructorArgs[5]
            );
          }, testCaseLabel
        ).to.not.throw();

      expect(token.type, testCaseLabel).equal(testCase.constructorArgs[0]);
      expect(token.position.row, testCaseLabel).equal(testCase.constructorArgs[1]);
      expect(token.position.column, testCaseLabel).equal(testCase.constructorArgs[2]);
      expect(token.position.offset, testCaseLabel).equal(testCase.constructorArgs[3]);
      expect(token.position.length, testCaseLabel).equal(testCase.expectedLength);
      expect(token.text, testCaseLabel).equal(testCase.constructorArgs[4] || '');
      expect(token.value, testCaseLabel).equal(testCase.constructorArgs[5]);
    });
  });

  it('should have getHash() method working', () => {
    _.each(testCasesForGetHash, (testCase, index) => {
      var testCaseLabel = JSON.stringify(testCase.name) || ('case ' + index);
      var token1 = null;
      var token2 = null;
      expect(
          () => {
            token1 = new Token(
              testCase.constructorArgs1[0],
              testCase.constructorArgs1[1],
              testCase.constructorArgs1[2],
              testCase.constructorArgs1[3],
              testCase.constructorArgs1[4],
              testCase.constructorArgs1[5]
            );
            token2 = new Token(
              testCase.constructorArgs2[0],
              testCase.constructorArgs2[1],
              testCase.constructorArgs2[2],
              testCase.constructorArgs2[3],
              testCase.constructorArgs2[4],
              testCase.constructorArgs2[5]
            );
          }, testCaseLabel
        ).to.not.throw();

      var token1Hash = null;
      var token2Hash = null;
      _.each(['initial', 'repetitive'],
        (subCase) => {
          var testSubCaseLabel = `${testCaseLabel}/${subCase}`;
          expect(
            () => {
              token1Hash = token1.getHash();
              token2Hash = token2.getHash();
            }, testCaseLabel
          ).to.not.throw();

          if (testCase.expectedHashEquality) {
            expect(token1Hash, testSubCaseLabel).equal(token2Hash);
          } else {
            expect(token1Hash, testSubCaseLabel).not.equal(token2Hash);
          }
        });
    });
  });

  it('should have correctly working isXXX methods', () => {
    var allTokenTypes = {};
    _.each(_.keys(Token), function(key) {
      if (key.indexOf('TYPE_') === 0) {
        allTokenTypes[key] = Token[key];
      }
    });
    var allTokenTypeNames = _.invert(allTokenTypes);

    var tokenTypesArgs = {
      'TYPE_EOF': {},
      'TYPE_NUMBER': {text: '42.0', value: 42},
      'TYPE_SYMBOL': {text: 'test', value: 'test'}
    };

    var tokensByType = {};
    _.each(allTokenTypes, (tokenType, tokenTypeAsString) => {
      var constructorArgs = [tokenType, 0, 0, 0, 'x'];
      var tokenTypeArgs = tokenTypesArgs[tokenTypeAsString];
      if (tokenTypeArgs) {
        constructorArgs[4] = tokenTypeArgs.text;
        constructorArgs[5] = tokenTypeArgs.value;
      }
      expect(
          () => {
            tokensByType[tokenType] = new Token(
              constructorArgs[0],
              constructorArgs[1],
              constructorArgs[2],
              constructorArgs[3],
              constructorArgs[4],
              constructorArgs[5]
            );
          }, tokenTypeAsString
        ).to.not.throw();

    });
    _.each(testCasesForIsXXX, (testCase) => {
      var applicableTypes = testCase.applicableTypes;
      var notApplicableTypes = _.difference(_.values(allTokenTypes), applicableTypes);

      _.each(applicableTypes, function(applicableType) {
        var caseLabel = `${testCase.methodName}/${allTokenTypeNames[applicableType]}`;
        var result;
        expect(() => {
          result = tokensByType[applicableType][testCase.methodName]();
        },caseLabel).to.not.throw();
        expect(result, caseLabel).equal(true);
      });

      _.each(notApplicableTypes, function(notApplicableType) {
        var caseLabel = `${testCase.methodName}/${allTokenTypeNames[notApplicableType]}`;
        var result;
        expect(() => {
          result = tokensByType[notApplicableType][testCase.methodName]();
        },caseLabel).to.not.throw();
        expect(result, caseLabel).equal(false);
      });
    });
  });

  it('should be clonable for messages using cloneWithCorrectedType()', () => {
    _.each(testCasesThatAreCorrect, (testCase, index) => {
      var testCaseLabel = JSON.stringify(testCase.name) || ('case ' + index);
      var token1 = null;
      var token2 = null;
      expect(
          () => {
            token1 = new Token(
              testCase.constructorArgs[0],
              testCase.constructorArgs[1],
              testCase.constructorArgs[2],
              testCase.constructorArgs[3],
              testCase.constructorArgs[4],
              testCase.constructorArgs[5]
            );
          }, testCaseLabel
        ).to.not.throw();
      expect(
          () => {
            token2 = token1.cloneWithCorrectedType();
          }, testCaseLabel
        ).to.not.throw();

      expect(token1, testCaseLabel).not.equal(token2);
      expect(token2, testCaseLabel).instanceOf(Token);
      expect(token2.type, testCaseLabel).equal(testCase.expectedTypeAfterClone);
      expect(token2.position.row, testCaseLabel).equal(testCase.constructorArgs[1]);
      expect(token2.position.column, testCaseLabel).equal(testCase.constructorArgs[2]);
      expect(token2.position.offset, testCaseLabel).equal(testCase.constructorArgs[3]);
      expect(token2.position.length, testCaseLabel).equal(testCase.expectedLength);
      expect(token2.text, testCaseLabel).equal(testCase.constructorArgs[4] || '');
      // expect(token2.value, testCaseLabel).equal(testCase.constructorArgs[5]);
    });
  });
});
