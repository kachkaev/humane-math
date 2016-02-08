(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("_"));
	else if(typeof define === 'function' && define.amd)
		define(["_"], factory);
	else if(typeof exports === 'object')
		exports["HumaneMath"] = factory(require("_"));
	else
		root["HumaneMath"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _core = __webpack_require__(1);

	__webpack_require__(26);

	__webpack_require__(27);

	__webpack_require__(28);

	exports.default = _core.HumaneMath;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HumaneMath = undefined;
	
	var _message = __webpack_require__(2);
	
	var _messageList = __webpack_require__(3);
	
	var _pos = __webpack_require__(5);
	
	var _tokenType = __webpack_require__(6);
	
	var _token = __webpack_require__(7);
	
	var _tokenStream = __webpack_require__(8);
	
	var _treeNodeType = __webpack_require__(14);
	
	var _treeNode = __webpack_require__(15);
	
	var _tree = __webpack_require__(16);
	
	var _validationRule = __webpack_require__(17);
	
	var _validationRules = __webpack_require__(18);
	
	var _validator = __webpack_require__(19);
	
	var _dialect = __webpack_require__(20);
	
	var _locale = __webpack_require__(21);
	
	var _symbols = __webpack_require__(23);
	
	var _text = __webpack_require__(24);
	
	var _calculator = __webpack_require__(25);
	
	var HumaneMath = {
	  Message: _message.Message,
	  MessageList: _messageList.MessageList,
	  Pos: _pos.Pos,
	
	  TokenType: _tokenType.TokenType,
	  Token: _token.Token,
	  TokenStream: _tokenStream.TokenStream,
	
	  TreeNodeType: _treeNodeType.TreeNodeType,
	  TreeNode: _treeNode.TreeNode,
	  Tree: _tree.Tree,
	
	  ValidationRule: _validationRule.ValidationRule,
	  ValidationRules: _validationRules.ValidationRules,
	  Validator: _validator.Validator,
	
	  Dialect: _dialect.Dialect,
	  Locale: _locale.Locale,
	  Symbols: _symbols.Symbols,
	
	  Text: _text.Text,
	  Calculator: _calculator.Calculator,
	
	  symbols: {},
	  validationRules: {},
	  locales: {}
	};
	
	HumaneMath.addLocale = function (locale, data) {
	  HumaneMath.locales[locale] = new _locale.Locale(data);
	};
	
	HumaneMath.setLocale = function (locale) {
	  HumaneMath.currentLocale = locale;
	};
	
	exports.HumaneMath = HumaneMath;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * Message keeps information about an error or a warning in a math text
	 */
	
	var Message = exports.Message = function () {
	  function Message() {
	    _classCallCheck(this, Message);
	  }
	
	  _createClass(Message, [{
	    key: "construct",
	
	
	    /**
	     * Creates a message
	     *
	     * @param {string} type
	     *    Unique textual identifier of a message type.
	     * @param {Pos} pos
	     *    Part of the Text the message is related to.
	     * @param {Object} params
	     *    Additional parameters of the message that clarify its context.
	     */
	    value: function construct(type, pos) {
	      var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      this._type = type;
	      this._pos = pos;
	      this._params = params;
	      //this.strCache = null;
	    }
	  }, {
	    key: "type",
	    get: function get() {
	      return this._type;
	    }
	  }, {
	    key: "pos",
	    get: function get() {
	      return this._pos;
	    }
	  }, {
	    key: "params",
	    get: function get() {
	      return this._params;
	    }
	  }]);
	
	  return Message;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MessageList = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * MessageList is used to store lists of errors or warnings in Math classes.
	 */
	
	var MessageList = exports.MessageList = function () {
	
	  /**
	   * Creates an empty list of Math Messages
	   *
	   * @param {MathMessageList} [MathMessageList1], [MathMessageList2], [...]
	   *    Lists to be joined.
	   */
	
	  function MessageList() {
	    for (var _len = arguments.length, listsToJoin = Array(_len), _key = 0; _key < _len; _key++) {
	      listsToJoin[_key] = arguments[_key];
	    }
	
	    _classCallCheck(this, MessageList);
	
	    this.clear();
	
	    // Join input argument lists if any arguments were passed.
	    if (listsToJoin.length) {
	
	      for (var i = listsToJoin.length - 1; i >= 0; i--) {
	        if (arguments[i]) {
	          this._list = this._list.concat(listsToJoin[i]._list);
	        }
	      }
	    }
	  }
	
	  /**
	   * Clears the list of Math Messages
	   *
	   * @returns {MathMessageList} current object.
	   */
	
	
	  _createClass(MessageList, [{
	    key: 'clear',
	    value: function clear() {
	      this._list = [];
	      return this;
	    }
	
	    /**
	     * Adds a message into the list.
	     *
	     * @param {Message} message
	     *    message Message that needs to be added.
	     *
	     * @returns {MessageList}
	     *     current object
	     */
	
	  }, {
	    key: 'add',
	    value: function add(message) {
	      this._list.push(message);
	      return this;
	    }
	
	    /**
	     * Helps to verify whether a list of messages is empty.
	     *
	     * @returns {boolean}
	     *     true if the list is empty.
	     */
	
	  }, {
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this._list.length == 0;
	    }
	
	    /**
	     * Returns the number of messages in the list.
	     *
	     * @returns {number}
	     */
	
	  }, {
	    key: 'count',
	    value: function count() {
	      return this._list.length;
	    }
	
	    /**
	     * Sorts the list by message positions.
	     *
	     * @returns {MessageList}
	     *     current object
	     */
	
	  }, {
	    key: 'sort',
	    value: function sort() {
	      this._list = _underscore2.default.sortBy(this._list, function (mathMessage) {
	        if (mathMessage.pos) {
	          return mathMessage.pos.pos + 0.0001 * mathMessage.pos.len;
	        } else {
	          return Infinity;
	        }
	      });
	      return this;
	    }
	  }]);
	
	  return MessageList;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Saves the position of a token / tree / node / error / warning, etc.
	 */
	
	var Pos = exports.Pos = function () {
	  function Pos() {
	    _classCallCheck(this, Pos);
	  }
	
	  _createClass(Pos, [{
	    key: "construct",
	
	
	    /**
	     * Creates an object that saves the position of
	     * token / tree / node / error / warning / etc.
	     *
	     * @param {int} col
	     *    Position — Column
	     * @param {int} row
	     *    Position — Row
	     * @param {int} pos
	     *    Absolute Position
	     * @param {int} length
	     *    Length of an object
	     */
	    value: function construct(col, row, pos, length) {
	      this.col = col;
	      this.row = row;
	      this.pos = pos;
	      this.len = length;
	    }
	
	    /**
	     * Creates a new Pos object which contains the whole range of characters
	     * from the beginning of pos1 to the end of pos2.
	     *
	     * @param {Pos} pos1
	     * @param {Pos} pos2
	     *
	     * @returns {Pos}
	     *      new Pos object.
	     */
	
	  }, {
	    key: "unite",
	    value: function unite(pos1, pos2) {
	      return new Pos(pos1.col, pos1.row, pos1.pos, pos2.len + pos2.pos - pos1.pos);
	    }
	
	    /**
	     * Creates a new Pos object which contains the range of characters between
	     * end of pos1 to the beginning of pos2.
	     *
	     * @param {Pos} pos1
	     * @param {Pos} pos2
	     *
	     * @returns {Pos}
	     *      new Pos object.
	     */
	
	  }, {
	    key: "between",
	    value: function between(pos1, pos2) {
	      return new Pos(pos1.col + pos1.len, pos1.row, pos1.pos + pos1.len, pos2.pos - pos1.pos - pos1.len);
	    }
	
	    /**
	     * Creates a new Pos object with zero length at the beginning of the given pos.
	     *
	     * @param {Pos} pos
	     *
	     * @returns {Pos}
	     */
	
	  }, {
	    key: "beginning",
	    value: function beginning(pos) {
	      return new Pos(pos.col, pos.row, pos.pos, 0);
	    }
	
	    /**
	     * Creates a new Pos object with zero length at the ending of the given pos.
	     *
	     * @param {Pos} pos
	     *
	     * @returns {Pos}
	     */
	
	  }, {
	    key: "ending",
	    value: function ending(pos) {
	      return new Pos(pos.col + pos.len, pos.row, pos.pos + pos.len, 0);
	    }
	  }]);
	
	  return Pos;
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Token types
	 */
	
	var TokenType = exports.TokenType = function TokenType() {
	  _classCallCheck(this, TokenType);
	};
	
	TokenType.EOF = 0;
	TokenType.RB_LEFT = 1;
	TokenType.RB_RIGHT = 2;
	TokenType.COMMA = 3;
	TokenType.EQUAL = 11;
	TokenType.LESS = 12;
	TokenType.MORE = 13;
	TokenType.LESS_EQUAL = 14;
	TokenType.MORE_EQUAL = 15;
	TokenType.ADD = 21;
	TokenType.SUBTRACT = 22;
	TokenType.MULTIPLY = 23;
	TokenType.DIVIDE = 24;
	TokenType.POWER = 25;
	TokenType.NUMBER = 31;
	TokenType.SYMBOL = 32;
	TokenType.SEMICOLON = 33;
	TokenType.E_UNKNOWN = 128;
	TokenType.E_NUMBER_MALFORMED = 129;
	TokenType.E_NUMBER_EXPONENTIAL = 130;
	TokenType.E_VERTICAL_SLASH = 131;
	TokenType.E_STARSTAR = 132;
	TokenType.E_EQUALEQUAL = 133;
	TokenType.E_MISPLACED_DOT = 134;
	TokenType.E_SB_LEFT = 140;
	TokenType.E_SB_RIGHT = 141;
	TokenType.E_CB_LEFT = 142;
	TokenType.E_CB_RIGHT = 143;
	TokenType.E_AB_LEFT = 144;
	TokenType.E_AB_RIGHT = 145;
	TokenType.E_BACK_SLASH = 146;
	TokenType.E_REST = 150;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Token = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _pos = __webpack_require__(5);
	
	var _tokenType = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Token = exports.Token = function () {
	  /**
	   * Creates a single token for use in the MathTokenStream
	   *
	   * @param {number} type
	   *    Type of a token
	   * @param {number} col
	   *    Position — Column
	   * @param {number} row
	   *    Position — Row
	   * @param {number} pos
	   *    Absolute Position
	   * @param {string} raw
	   *    Raw (unchanged) data
	   * @param {Numeric} value
	   *    (Optional) Value (calculated data) for some token types
	   */
	
	  function Token(type, col, row, pos, raw, value) {
	    _classCallCheck(this, Token);
	
	    this.type = type;
	    if (!_underscore2.default.isUndefined(raw)) {
	      this.pos = new _pos.Pos(col, row, pos, raw.length);
	      this.raw = raw;
	    }
	    if (!_underscore2.default.isUndefined(value)) {
	      this.value = value;
	    }
	  }
	
	  /**
	   * Returns a string digest of a token. This can be useful when calculating hash of a TokenStream.
	   *
	   * @returns {string}
	   */
	
	
	  _createClass(Token, [{
	    key: 'getHash',
	    value: function getHash() {
	      return this.type + '|' + this.pos.pos + '|' + this.pos.row + '|' + (_underscore2.default.isUndefined(this.value) ? '' : this.value) + '$';
	    }
	
	    /**
	     * Returns true if the token corresponds to an end of an input string.
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isEOF',
	    value: function isEOF() {
	      return this.type == _tokenType.TokenType.EOF;
	    }
	
	    /**
	     * Returns true if requested token is an error token.
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isErrorToken',
	    value: function isErrorToken() {
	      return this.type >= _tokenType.TokenType.E_UNKNOWN;
	    }
	
	    /**
	     * Checks if a token is a left bracket of any kind
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isLeftBracket',
	    value: function isLeftBracket() {
	      return this.type == _tokenType.TokenType.RB_LEFT || this.type == _tokenType.TokenType.E_SB_LEFT || this.type == _tokenType.TokenType.E_CB_LEFT || this.type == _tokenType.TokenType.E_AB_LEFT;
	    }
	
	    /**
	     * Checks if a token is a right bracket of any kind
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isRightBracket',
	    value: function isRightBracket() {
	      return this.type == _tokenType.TokenType.RB_RIGHT || this.type == _tokenType.TokenType.E_SB_RIGHT || this.type == _tokenType.TokenType.E_CB_RIGHT || this.type == _tokenType.TokenType.E_AB_RIGHT;
	    }
	
	    /**
	     * Checks if a token is numeric
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isNumber',
	    value: function isNumber() {
	      return this.type == _tokenType.TokenType.NUMBER || this.type == _tokenType.TokenType.E_NUMBER_MALFORMED || this.type == _tokenType.TokenType.E_NUMBER_EXPONENTIAL;
	    }
	
	    /**
	     * Checks if a token is a symbol
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isSymbol',
	    value: function isSymbol() {
	      return this.type == _tokenType.TokenType.SYMBOL;
	    }
	
	    /**
	     * Checks if a token is a power sign (^ or **)
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isPowerSign',
	    value: function isPowerSign() {
	      return this.type == _tokenType.TokenType.POWER || this.type == _tokenType.TokenType.E_STARSTAR;
	    }
	
	    /**
	     * Checks if a token is a term sign (MULTIPLY or DIVIDE)
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isTermSign',
	    value: function isTermSign() {
	      return this.type == _tokenType.TokenType.MULTIPLY || this.type == _tokenType.TokenType.DIVIDE || this.type == _tokenType.TokenType.E_MISPLACED_DOT || this.type == _tokenType.TokenType.E_BACK_SLASH;
	    }
	
	    /**
	     * Checks if a token is a mathematical operator
	     * (any of those that are used in parsing expressions, terms and powers).
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isMathOperator',
	    value: function isMathOperator() {
	      return this.isExpressionSign() || this.isTermSign() || this.isPowerSign();
	    }
	
	    /**
	     * Checks if a token is an expression sign (ADD or SUBTRACT)
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isExpressionSign',
	    value: function isExpressionSign() {
	      return this.type == _tokenType.TokenType.ADD || this.type == _tokenType.TokenType.SUBTRACT;
	    }
	
	    /**
	     * Checks if a token is an statement sign
	     * (EQUAL|LESS|MORE|MORE_EQUAL|LESS_EQUAL)
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isStatementSign',
	    value: function isStatementSign() {
	      return this.type == _tokenType.TokenType.EQUAL || this.type == _tokenType.TokenType.LESS || this.type == _tokenType.TokenType.MORE || this.type == _tokenType.TokenType.MORE_EQUAL || this.type == _tokenType.TokenType.LESS_EQUAL || this.type == _tokenType.TokenType.E_EQUALEQUAL;
	    }
	
	    /**
	     * Makes a shallow copy of a token object with the type changed to the correct
	     * one in case it is an special error token. This is useful for passing data to
	     * language templates in order to avoid redundancy in them.
	     *
	     * @returns {boolean}
	     *
	     * @example E_NUMBER_MALFORMED changes to NUMBER
	     */
	
	  }, {
	    key: 'cloneWithCorrectedType',
	    value: function cloneWithCorrectedType() {
	      var clone = _underscore2.default.clone(this);
	
	      // Substitution of a type for error tokens
	      if (clone.isErrorToken()) {
	        if (clone.isRightBracket()) {
	          clone.type = _tokenType.TokenType.RB_LEFT;
	        } else if (clone.isLeftBracket()) {
	          clone.type = _tokenType.TokenType.LB_LEFT;
	        } else if (clone.isNumber()) {
	          clone.type = _tokenType.TokenType.NUMBER;
	        } else if (clone.isPowerSign()) {
	          clone.type = _tokenType.TokenType.POWER;
	        }
	      }
	
	      return clone;
	    }
	  }]);
	
	  return Token;
	}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TokenStream = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _ltrim = __webpack_require__(9);
	
	var _ltrim2 = _interopRequireDefault(_ltrim);
	
	var _rtrim = __webpack_require__(13);
	
	var _rtrim2 = _interopRequireDefault(_rtrim);
	
	var _message = __webpack_require__(2);
	
	var _messageList = __webpack_require__(3);
	
	var _token = __webpack_require__(7);
	
	var _tokenType = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Converts an input stream into tokens
	 */
	
	var TokenStream = exports.TokenStream = function () {
	
	  // Regular expressions used for converting text to tokens
	
	
	  // List of characters that should be interpreted as spaces
	
	  function TokenStream() {
	    _classCallCheck(this, TokenStream);
	
	    this.reset();
	    this.errors = new _messageList.MessageList();
	  }
	
	  /**
	   * Calculates hash for the TokenStream to determine whether it was changed or not
	   *
	   * @memberOf TokenStream
	   * @returns {string}
	   */
	
	
	  // Maximum possible size of the token stream
	
	
	  _createClass(TokenStream, [{
	    key: 'getHash',
	    value: function getHash() {
	      var hash = '';
	      for (var i = this.tokens.length - 1; i >= 0; i--) {
	        hash = this.tokens[i].getHash() + hash;
	      }
	      return hash;
	    }
	
	    /**
	     * Resets TokenStream object to default empty state
	     */
	
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.raw = null;
	      this.tokens = [];
	      this.cursorPos = 0;
	    }
	
	    /**
	     * Skips spaces while converting text to tokens and recalculates the position of the cursor
	     */
	
	  }, {
	    key: 'skipSpaces',
	    value: function skipSpaces() {
	      for (var i = 0; i < this.temp.raw.length; i++) {
	        if (this.temp.raw.charAt(i) == '\n') {
	          this.temp.row++;
	          this.temp.pos++;
	          this.temp.col = 0;
	        } else {
	          if (TokenStream.WHITESPACE.indexOf(this.temp.raw.charAt(i)) === -1) {
	            this.temp.raw = this.temp.raw.slice(i);
	            break;
	          }
	          this.temp.col++;
	          this.temp.pos++;
	        }
	      }
	    }
	
	    /**
	     * Adds token into the list of tokens
	     *
	     * @param {number} type
	     *    Type of a Token (among MathTokeType.*)
	     * @param {number} length
	     *    Length of a new token
	     * @param {number} [value]
	     *    Evaluated value of a token (for symbols and numbers).
	     * @param {boolean} [dontThrowException]
	     *    if is set to true, no TOKEN_FOUND_EXCEPTION is thrown.
	     */
	
	  }, {
	    key: 'addToken',
	    value: function addToken(type, length, value, dontThrowException) {
	      this.tokens.push(new _token.Token(type, this.temp.col, this.temp.row, this.temp.pos, this.temp.raw.slice(0, length), value));
	      this.temp.pos += length;
	      this.temp.col += length;
	      this.temp.raw = this.temp.raw.slice(length);
	      if (!dontThrowException) {
	        throw TokenStream.TOKEN_FOUND_EXCEPTION;
	      }
	    }
	
	    /**
	     *
	     * @param {string} newRaw
	     *    New raw string to be tokenized
	     *
	     * @returns {boolean}
	     *      true if a stream of tokens has changed since the last function call
	     */
	
	  }, {
	    key: 'tokenize',
	    value: function tokenize(newRaw) {
	      // Basic check for changes
	      if (newRaw === this.raw) {
	        return false;
	      }
	
	      // Basic check failed – tokenize the string
	      this.reset();
	      this.raw = newRaw;
	
	      // Initialize some temporary data needed while tokenizing
	      this.temp = {};
	      this.temp.raw = (0, _rtrim2.default)(newRaw);
	      this.temp.pos = 0;
	      this.temp.col = 0;
	      this.temp.row = 0;
	
	      // Extract tokens in a loop
	      for (var i = TokenStream.MAX_TOKEN_COUNT; i >= 0; i--) {
	
	        this.skipSpaces();
	
	        // Exit if reached an end of the input string
	        if (this.temp.raw == '') {
	          break;
	        }
	
	        // Extract a token from the beginning of an input string.
	        // #addToken throws TokenStream.TOKEN_FOUND_EXCEPTION.
	
	        try {
	          // Compound tokens part 1, see part 2 after all simple tokens
	          // -- “less or equal” or “more or equal” (≤ and ≥ are below)
	          if (this.temp.raw.charAt(0) == '<' || this.temp.raw.charAt(0) == '>') {
	            var searchString = (0, _ltrim2.default)(this.temp.raw.slice(1));
	            if (searchString.charAt(0) == '=') {
	              this.addToken(this.temp.raw.charAt(0) == '<' ? _tokenType.TokenType.LESS_EQUAL : _tokenType.TokenType.MORE_EQUAL, this.temp.raw.length - searchString.length + 1);
	            }
	          }
	          // -- error: use of ==
	          if (this.temp.raw.charAt(0) == '=') {
	            var searchString = _underscore2.default.ltrim(this.temp.raw.slice(1));
	            if (searchString.charAt(0) == '=') {
	              this.addToken(_tokenType.TokenType.E_EQUALEQUAL, this.temp.raw.length - searchString.length + 1);
	            }
	          }
	
	          // -- error: Use of ** for power instead of ^
	          if (this.temp.raw.charAt(0) == '*') {
	            var searchString = _underscore2.default.ltrim(this.temp.raw.slice(1));
	            if (searchString.charAt(0) == '*') {
	              this.addToken(_tokenType.TokenType.E_STARSTAR, this.temp.raw.length - searchString.length + 1);
	            }
	          }
	
	          // simple tokens (1 character long)
	          /* eslint-disable no-fallthrough */
	          switch (this.temp.raw.charAt(0)) {
	            // -- left bracket
	            case '(':
	              this.addToken(_tokenType.TokenType.RB_LEFT, 1);
	            // -- right bracket
	            case ')':
	              this.addToken(_tokenType.TokenType.RB_RIGHT, 1);
	            // -- comma
	            case ',':
	              this.addToken(_tokenType.TokenType.COMMA, 1);
	            // -- semicolon
	            case ';':
	              this.addToken(_tokenType.TokenType.SEMICOLON, 1);
	            // -- equal
	            case '=':
	              this.addToken(_tokenType.TokenType.EQUAL, 1);
	            // -- less
	            case '<':
	              this.addToken(_tokenType.TokenType.LESS, 1);
	            // -- more
	            case '>':
	              this.addToken(_tokenType.TokenType.MORE, 1);
	            // -- less or equal
	            case '≤':
	              this.addToken(_tokenType.TokenType.LESS, 1);
	            // -- more or equal
	            case '≥':
	              this.addToken(_tokenType.TokenType.MORE, 1);
	            // -- add
	            case '+':
	              this.addToken(_tokenType.TokenType.ADD, 1);
	            // -- subtract
	            case '-':
	            case '—':
	            case '−':
	            case '–':
	            case '―':
	              this.addToken(_tokenType.TokenType.SUBTRACT, 1);
	            // -- multiply
	            case '*':
	            case '×':
	            case '·':
	              this.addToken(_tokenType.TokenType.MULTIPLY, 1);
	            // -- divide
	            case '/':
	            case '÷':
	              this.addToken(_tokenType.TokenType.DIVIDE, 1);
	            // -- power
	            case '^':
	              this.addToken(_tokenType.TokenType.POWER, 1);
	            // -- error: use of right square bracket
	            case '[':
	              this.addToken(_tokenType.TokenType.E_SB_LEFT, 1);
	            // -- error: use of left square bracket
	            case ']':
	              this.addToken(_tokenType.TokenType.E_SB_RIGHT, 1);
	            // -- error: use of right curly bracket
	            case '{':
	              this.addToken(_tokenType.TokenType.E_CB_LEFT, 1);
	            // -- error: use of left curly bracket
	            case '}':
	              this.addToken(_tokenType.TokenType.E_CB_RIGHT, 1);
	            // -- error: Use of right angle bracket
	            case '⟨':
	              this.addToken(_tokenType.TokenType.E_AB_LEFT, 1);
	            // -- error: Use of left angle bracket
	            case '⟩':
	              this.addToken(_tokenType.TokenType.E_AB_RIGHT, 1);
	            // -- error: use of a vertical slash to get an absolute value
	            case '|':
	              this.addToken(_tokenType.TokenType.E_VERTICAL_SLASH, 1);
	            // -- error: use of a back slash to divide
	            case '\\':
	              this.addToken(_tokenType.TokenType.E_BACK_SLASH, 1);
	          }
	          /* eslint-enable */
	
	          // compound tokens, part 2
	          var match;
	
	          // -- symbol
	          match = this.temp.raw.match(TokenStream.RE_SYMBOL);
	          if (match) {
	            this.addToken(_tokenType.TokenType.SYMBOL, match[0].length, match[0].toLowerCase());
	          }
	
	          // -- error: malformed number
	          // (depending on output of regex match, length of the token is different)
	          match = this.temp.raw.match(TokenStream.RE_E_NUMBER_MALFORMED);
	          if (match && !_underscore2.default.isUndefined(match[4])) {
	            if (!_underscore2.default.isUndefined(match[4]) && match[4].length > 0) {
	              match[1] = match[1].slice(0, match[1].length - 1);
	            }
	            this.addToken(_tokenType.TokenType.E_NUMBER_MALFORMED, match[1].length, match[1].toLowerCase());
	          } else if (match) {
	            this.addToken(_tokenType.TokenType.E_NUMBER_MALFORMED, match[0].length, match[0].toLowerCase());
	          }
	
	          // -- error: a number in exponential notation
	          match = this.temp.raw.match(TokenStream.RE_E_NUMBER_EXPONENTIAL);
	          if (match) {
	            this.addToken(_tokenType.TokenType.E_NUMBER_EXPONENTIAL, match[0].length, Number(match[0].replace(/[Ее]/, 'E')));
	          }
	
	          // -- number
	          match = this.temp.raw.match(TokenStream.RE_NUMBER);
	          if (match) {
	            this.addToken(_tokenType.TokenType.NUMBER, match[0].length, Number(match[0]));
	          }
	
	          // -- error: misplaced dot (period)
	          if (this.temp.raw.charAt(0) == '.') {
	            this.addToken(_tokenType.TokenType.E_MISPLACED_DOT, 1);
	          }
	
	          // all possible search was performed, but the token was not found
	          // --> Unknown symbol
	          this.addToken(_tokenType.TokenType.E_UNKNOWN, 1);
	        } catch (e) {
	          if (e != TokenStream.TOKEN_FOUND_EXCEPTION) {
	            throw e;
	          }
	        }
	
	        // check whether a search loop is stuck
	        //TODO revise
	        // if (i == 0) {
	        //   Logger.log("Probably a never-ending loop during tokenizing.");
	        // }
	      }
	
	      // check if the end of a sting has been reached
	      // and add E_REST token if more characters remain
	      if (this.temp.raw.length) {
	        this.addToken(_tokenType.TokenType.E_REST, this.temp.raw.length, null, true);
	      }
	
	      // add last token (special EOF token)
	      this.addToken(_tokenType.TokenType.EOF, 0, null, true);
	
	      // delete temporary variable
	      delete this.temp;
	
	      // check for changes using hash
	      var hash = this.getHash();
	      if (hash == this.oldHash) {
	        return false;
	      }
	      this.oldHash = hash;
	
	      // form a list of errors
	      this.errors.clear();
	
	      for (var i = this.tokens.length - 1; i >= 0; i--) {
	        if (this.tokens[i].isErrorToken()) {
	          this.errors.add(new _message.Message('e_lex_' + this.tokens[i].type, this.tokens[i].pos, this.tokens[i]));
	        }
	      }
	
	      // Reaching this point means that token stream has been changed
	      return true;
	    }
	
	    /**
	     * Returns a specific token defined by its position or false if it cannot be obtained.
	     *
	     * @param {number} tokenPos
	     *    Position of a requested token.
	     * @param {boolean} [moveCursor=false]
	     *    Set to true if cursor position needs to be changed.
	     *
	     * @returns {?Token}
	     *      Token or null if the search was out of range.
	     */
	
	  }, {
	    key: 'getToken',
	    value: function getToken(tokenPos, moveCursor) {
	      if (moveCursor) {
	        this.cursorPos = tokenPos;
	      }
	
	      if (this.cursorPos >= this.tokens.length) {
	        this.cursorPos = this.tokens.length - 1;
	      }
	
	      if (_underscore2.default.isUndefined(this.tokens[tokenPos])) {
	        return null;
	      }
	
	      return this.tokens[tokenPos];
	    }
	
	    /**
	     * Returns the first token of the stream.
	     *
	     * @param {boolean} [moveCursor=false]
	     *    Set to true if cursor position needs to be changed.
	     *
	     * @returns {Token}
	     *      Token or null if the search was out of range.
	     */
	
	  }, {
	    key: 'firstToken',
	    value: function firstToken(moveCursor) {
	      return this.getToken(0, moveCursor);
	    }
	
	    /**
	     * Returns the last token of the stream.
	     * IMPORTANT NOTICE: The “last” token is not the EOF token, but the token before it.
	     *
	     * @param {boolean} [moveCursor=false]
	     *    Set to true if cursor position needs to be changed.
	     *
	     * @returns {Token}
	     *      Token or null if the search was out of range.
	     */
	
	  }, {
	    key: 'lastToken',
	    value: function lastToken(moveCursor) {
	      return this.getToken(this.tokens.length - 2, moveCursor);
	    }
	
	    /**
	     * Returns the previous token of the stream.
	     *
	     * @param {boolean} [moveCursor=false]
	     *    Set to true if cursor position needs to be changed.
	     *
	     * @returns {Token}
	     *      Token or null if the search was out of range.
	     */
	
	  }, {
	    key: 'previousToken',
	    value: function previousToken(moveCursor) {
	      return this.getToken(this.cursorPos - 1, moveCursor);
	    }
	
	    /**
	     * Returns the next token of the stream.
	     *
	     * @param {boolean} [moveCursor=false]
	     *    Set to true if cursor position needs to be changed.
	     *
	     * @returns {Token}
	     *      Token or null if the search was out of range.
	     */
	
	  }, {
	    key: 'nextToken',
	    value: function nextToken(moveCursor) {
	      return this.getToken(this.cursorPos + 1, moveCursor);
	    }
	
	    /**
	     * Returns current token of the stream.
	     *
	     * @returns {Token}
	     */
	
	  }, {
	    key: 'currentToken',
	    value: function currentToken() {
	      return this.getToken(this.cursorPos);
	    }
	
	    /**
	     * Searches for a token of the specific type (or types)
	     * in the rest of the token stream (from cursor).
	     *
	     * @param {Array} tokenTypes
	     *    List of tokens to be searched.
	     * @param {boolean} [moveCursor=false]
	     *    Set to true if cursor position needs to be changed.
	     *
	     * @returns {?Token} Token or null if the search was out of range.
	     */
	
	  }, {
	    key: 'findNextToken',
	    value: function findNextToken(tokenTypes, moveCursor) {
	      if (!_underscore2.default.isArray(tokenTypes)) {
	        tokenTypes = [tokenTypes];
	      }
	
	      for (var i = this.cursorPos; i < this.tokens.length; i++) {
	        var currentToken = this.getToken(i);
	        for (var type in tokenTypes) {
	          if (tokenTypes[type] == currentToken.type) {
	            if (moveCursor) {
	              this.cursorPos = i;
	            }
	            return currentToken;
	          }
	        }
	      }
	      return null;
	    }
	
	    /**
	     * Searches for a token of the specific type (or types) in the rest
	     * of the token stream (from cursor) with respect to opening / closing brackets.
	     *
	     * @param {Array} tokenTypes
	     *    List of tokens to be searched.
	     * @param {boolean} [moveCursor=false]
	     *    Set to true if cursor position needs to be changed.
	     *
	     * @returns {?Token} Token or null if the search was out of range.
	     */
	
	  }, {
	    key: 'findNextTokenAtTheSameLevel',
	    value: function findNextTokenAtTheSameLevel(tokenTypes, moveCursor) {
	      if (!_underscore2.default.isArray(tokenTypes)) {
	        tokenTypes = [tokenTypes];
	      }
	
	      var level = 0;
	
	      for (var i = this.cursorPos; i < this.tokens.length; i++) {
	        if (level < 0) {
	          return null;
	        }
	
	        var currentToken = this.getToken(i);
	
	        if (currentToken.isLeftBracket()) {
	          ++level;
	        }
	
	        if (level == 0) {
	          for (var type in tokenTypes) {
	            if (tokenTypes[type] == currentToken.type) {
	              if (moveCursor) {
	                this.cursorPos = i;
	              }
	              return currentToken;
	            }
	          }
	        }
	
	        if (currentToken.isRightBracket()) {
	          --level;
	        }
	      }
	      return null;
	    }
	  }]);
	
	  return TokenStream;
	}();
	
	TokenStream.MAX_TOKEN_COUNT = 500;
	TokenStream.WHITESPACE = ' \n\r\t\f\u000b            ​\u2028\u2029　';
	TokenStream.TOKEN_FOUND_EXCEPTION = 42;
	TokenStream.RE_NUMBER = /^[0-9]+(\.[0-9]+)?/;
	TokenStream.RE_SYMBOL = /^[a-zA-Zа-яА-ЯёЁα-ωΑ-Ω][_a-zA-Zа-яА-ЯёЁα-ωΑ-Ω0-9]*/;
	TokenStream.RE_E_NUMBER_MALFORMED = /^(\.[0-9]+|[0-9]+(\.[0-9]+){2,}|([0-9]+\.([^0-9]|$)))/;
	TokenStream.RE_E_NUMBER_EXPONENTIAL = /^[0-9]+(\.[0-9]+)?[EeЕе][+-]?[0-9]+/;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var makeString = __webpack_require__(10);
	var defaultToWhiteSpace = __webpack_require__(11);
	var nativeTrimLeft = String.prototype.trimLeft;
	
	module.exports = function ltrim(str, characters) {
	  str = makeString(str);
	  if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
	  characters = defaultToWhiteSpace(characters);
	  return str.replace(new RegExp('^' + characters + '+'), '');
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Ensure some object is a coerced to a string
	 **/
	module.exports = function makeString(object) {
	  if (object == null) return '';
	  return '' + object;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var escapeRegExp = __webpack_require__(12);
	
	module.exports = function defaultToWhiteSpace(characters) {
	  if (characters == null)
	    return '\\s';
	  else if (characters.source)
	    return characters.source;
	  else
	    return '[' + escapeRegExp(characters) + ']';
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var makeString = __webpack_require__(10);
	
	module.exports = function escapeRegExp(str) {
	  return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var makeString = __webpack_require__(10);
	var defaultToWhiteSpace = __webpack_require__(11);
	var nativeTrimRight = String.prototype.trimRight;
	
	module.exports = function rtrim(str, characters) {
	  str = makeString(str);
	  if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
	  characters = defaultToWhiteSpace(characters);
	  return str.replace(new RegExp(characters + '+$'), '');
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Types of nodes in a syntax tree
	 */
	
	var TreeNodeType = exports.TreeNodeType = function TreeNodeType() {
	  _classCallCheck(this, TreeNodeType);
	};
	
	TreeNodeType.EMPTY = 0;
	TreeNodeType.SEQUENCE_OF_STATEMENTS = 1;
	TreeNodeType.STATEMENT = 2;
	TreeNodeType.EXPRESSION = 3;
	TreeNodeType.TERM = 4;
	TreeNodeType.POWER = 5;
	TreeNodeType.SYMBOL = 6;
	TreeNodeType.NUMBER = 7;
	TreeNodeType.FUNCTION = 8;
	TreeNodeType.STANDARD_CONSTANT = 32;
	TreeNodeType.STANDARD_VARIABLE = 33;
	TreeNodeType.STANDARD_FUNCTION = 34;
	TreeNodeType.STATEMENT_EQUATION = 66;
	TreeNodeType.STATEMENT_INEQUALITY = 67;
	TreeNodeType.E_UNPARSED = 128;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TreeNode = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _treeNodeType = __webpack_require__(14);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Part of Tree
	 */
	
	var TreeNode = exports.TreeNode = function () {
	  function TreeNode() {
	    _classCallCheck(this, TreeNode);
	
	    this.type = _treeNodeType.TreeNodeType.EMPTY;
	    this.brackets = false;
	    this.hasErrors = false;
	  }
	
	  /**
	   * Checks if the node is empty.
	   *
	   * @returns {boolean}
	   */
	
	
	  _createClass(TreeNode, [{
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.type == _treeNodeType.TreeNodeType.EMPTY;
	    }
	
	    /**
	     * Checks if the node is unparsed
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isUnparsed',
	    value: function isUnparsed() {
	      return this.type == _treeNodeType.TreeNodeType.UNPARSED;
	    }
	  }]);
	
	  return TreeNode;
	}();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tree = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _message = __webpack_require__(2);
	
	var _messageList = __webpack_require__(3);
	
	var _pos = __webpack_require__(5);
	
	var _tokenType = __webpack_require__(6);
	
	var _token = __webpack_require__(7);
	
	var _treeNodeType = __webpack_require__(14);
	
	var _treeNode = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Creates an empty instance of Tree object
	 */
	
	var Tree = exports.Tree = function () {
	  function Tree() {
	    _classCallCheck(this, Tree);
	
	    this.reset();
	    this.errors = new _messageList.MessageList();
	  }
	
	  /**
	   * Calculates hash for the Tree to determine whether it was changed or not
	   */
	
	
	  _createClass(Tree, [{
	    key: 'getHash',
	    value: function getHash() {}
	    //TODO Implement the method
	
	
	    /**
	     * Resets the tree to a default empty state.
	     */
	
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.tokenStream = null;
	      this.root = null;
	    }
	
	    /**
	     * Parses an input stream into a tree of TreeNodes
	     *
	     * @param {Object} tokenStream
	     *    incoming token stream
	     *
	     * @returns {boolean}
	     *      true if the tree was changed.
	     */
	
	  }, {
	    key: 'parse',
	    value: function parse(tokenStream) {
	      this.reset();
	      this.errors.clear();
	
	      this.tokenStream = tokenStream;
	
	      // Check for missed operands between operators
	      // This check is separated because actual parsing ignores errors at some token sequences
	      // (e.g. MINUS PLUS) in order to collect as much more errors as possible.
	      this.checkForMissedOperands();
	
	      // Move token stream cursor to the first position
	      this.tokenStream.firstToken(true);
	
	      // Parse the distinguished symbol of the grammar
	      this.root = this.subparseStatementSequence();
	
	      // Check if an end of Token Stream was reached.
	      if (this.tokenStream.currentToken().type != _tokenType.TokenType.EOF) {
	        this.errors.add(new _message.Message('e_syn_unknown', this.tokenStream.currentToken().pos));
	      }
	
	      //XXX return false when no change occurred
	      return true;
	    }
	
	    /**
	     * Parses a sequence of statements, which is
	     * 'statement [SEMICOLON statement ...]'
	     *
	     * @returns {TreeNode}
	     */
	
	  }, {
	    key: 'subparseStatementSequence',
	    value: function subparseStatementSequence() {
	
	      var currentNode = this.createEmptyTreeNode();
	      var firstNodeToken = this.tokenStream.currentToken();
	
	      // Extract the first possible sub-node (statement)
	      var currentSubNode = this.subparseStatement();
	
	      ////////////////////////////////
	      // Expression matches a pattern statement [SEMICOLON statement ...]
	      ////////////////////////////////
	      currentNode.subNodes = [];
	      currentNode.subActions = [];
	      currentNode.type = _treeNodeType.TreeNodeType.SEQUENCE_OF_STATEMENTS;
	
	      // Run till EOF to get all possible errors and statements
	      while (!this.tokenStream.currentToken().isEOF()) {
	        // If The statement separator is semicolon (or a comma, which is an error)
	        if (this.tokenStream.currentToken().type == _tokenType.TokenType.SEMICOLON || this.tokenStream.currentToken().type == _tokenType.TokenType.COMMA) {
	
	          // Add sub-action (semicolon or comma position must be kept)
	          currentNode.subActions.push(this.tokenStream.currentToken());
	
	          // If a separator is a comma, report an error
	          if (this.tokenStream.currentToken().type == _tokenType.TokenType.COMMA) {
	            this.errors.add(new _message.Message('e_syn_statements_comma', this.tokenStream.currentToken().pos));
	          }
	
	          // If any other token found on the way
	        } else {
	
	            // If error token found on the way, just skip to the next semicolon or to the end of the stream.
	            // Otherwise add an error.
	
	            // Case 1: Right bracket found
	            if (this.tokenStream.currentToken().isRightBracket()) {
	              this.errors.add(new _message.Message('e_syn_extra_rb', this.tokenStream.currentToken().pos, { currentToken: this.tokenStream.currentToken() }));
	              // Case 2: Non-error token found
	            } else if (!this.tokenStream.currentToken().isErrorToken()) {
	                this.errors.add(new _message.Message('e_syn_statements_wrong_symbol', this.tokenStream.currentToken().pos, { currentToken: this.tokenStream.currentToken() }));
	                // Case 3: Any other token found
	              } else {}
	                // Do nothing
	
	
	                // Skip to the next SEMICOLON or to the end of the stream or to the last token
	            if (!this.tokenStream.findNextToken([_tokenType.TokenType.SEMICOLON], true)) {
	              this.tokenStream.lastToken(true);
	            } else {
	              // Add sub-action (semicolon position must be kept)
	              currentNode.subActions.push(this.tokenStream.currentToken());
	              this.tokenStream.previousToken(true);
	            }
	
	            // If the content of the parsed part of the expression is a single
	            // factor, add it as the sub-node for this expression.
	            // This is made for further semantic check of it.
	            if (currentSubNode.type == _treeNodeType.TreeNodeType.SYMBOL || currentSubNode.type == _treeNodeType.TreeNodeType.NUMBER || currentSubNode.type == _treeNodeType.TreeNodeType.FUNCTION) {
	              currentSubNode = this.wrapNode(currentSubNode);
	            }
	
	            currentSubNode.type = _treeNodeType.TreeNodeType.E_UNPARSED;
	            currentSubNode.hasErrors = true;
	
	            currentSubNode.pos = _pos.Pos.unite(currentSubNode.pos, this.tokenStream.currentToken().pos);
	            if (this.tokenStream.currentToken() != this.tokenStream.lastToken()) {
	              this.tokenStream.nextToken(true);
	            }
	          }
	
	        // Move forward
	        this.tokenStream.nextToken(true);
	        currentNode.subNodes.push(currentSubNode);
	        currentSubNode = this.subparseStatement();
	      }
	      currentNode.subNodes.push(currentSubNode);
	
	      ////////////////////////////////
	      // Sequence is just a single statement
	      ////////////////////////////////
	      if (currentNode.subNodes.length == 1 || currentNode.subActions.length == 0) {
	        return currentNode.subNodes[0];
	      }
	
	      // Remove empty sub-node after the last semicolon
	      if (currentNode.subNodes[currentNode.subNodes.length - 1].isEmpty()) {
	        delete currentNode.subNodes[currentNode.subNodes.length - 1];
	      }
	
	      // Get the position of the current node
	      currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.currentToken().pos);
	
	      return currentNode;
	    }
	
	    /**
	     * Parses a statement, which is
	     * 'expression [(EQUAL|LESS|MORE|MORE_EQUAL|LESS_EQUAL) expression]'
	     * A statement can consist of one or two parts only.
	     *
	     * @returns {TreeNode}
	     */
	
	  }, {
	    key: 'subparseStatement',
	    value: function subparseStatement() {
	      var currentNode = this.createEmptyTreeNode();
	      var firstNodeToken = this.tokenStream.currentToken();
	
	      var leftPart = this.subparseExpression();
	      var rightPart = null;
	      var statementSign = null;
	
	      ////////////////////////////////
	      // Statement is expression (EQUAL|LESS|MORE|MORE_EQUAL|LESS_EQUAL) whatever
	      ////////////////////////////////
	
	      if (this.tokenStream.currentToken().isStatementSign()) {
	
	        // Save the sign and parsing the right part
	        statementSign = this.tokenStream.currentToken();
	        this.tokenStream.nextToken(true);
	        rightPart = this.subparseExpression();
	
	        // Check both parts for emptiness
	        if (leftPart.isEmpty()) {
	          this.errors.add(new _message.Message('e_syn_statement_empty_left', leftPart.pos, {
	            currentToken: statementSign
	          }));
	        }
	        if (rightPart.isEmpty()) {
	          this.errors.add(new _message.Message('e_syn_statement_empty_right', rightPart.pos, {
	            currentToken: statementSign
	          }));
	        }
	
	        // Add left part and right part as node sub-nodes
	        currentNode.type = _treeNodeType.TreeNodeType.STATEMENT;
	        currentNode.subNodes = [leftPart, rightPart];
	        currentNode.subActions = [statementSign];
	
	        ////////////////////////////////
	        // Define sub-type depending on what is in the left and the right parts
	
	        switch (statementSign.type) {
	          // The statement is an inequality
	          case _tokenType.TokenType.LESS:
	          case _tokenType.TokenType.MORE:
	          case _tokenType.TokenType.LESS_EQUAL:
	          case _tokenType.TokenType.MORE_EQUAL:
	            currentNode.subType = _treeNodeType.TreeNodeType.STATEMENT_INEQUALITY;
	            break;
	
	          // The statement is something separated with an EQUAL sign
	          //TODO detect STATEMENT_DEFINITION_VARIABLE, STATEMENT_DEFINITION_FUNCTION
	          default:
	            currentNode.subType = _treeNodeType.TreeNodeType.STATEMENT_EQUATION;
	            break;
	        }
	
	        // Check if there are any other statement signs (which is an error)
	        while (this.tokenStream.currentToken().isStatementSign()) {
	          currentNode.hasErrors = true;
	
	          this.errors.add(new _message.Message('e_syn_statement_extra_statement_sign', this.tokenStream.currentToken().pos, {
	            currentToken: this.tokenStream.currentToken(),
	            statementSign: statementSign
	          }));
	
	          currentNode.subActions.push(this.tokenStream.currentToken());
	          this.tokenStream.nextToken(true);
	          currentNode.subNodes.push(this.subparseExpression());
	        }
	
	        currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.previousToken().pos);
	        return currentNode;
	
	        ///////////////////////////////////
	        // Statement is just a single expression
	        ///////////////////////////////////
	      } else {
	          return leftPart;
	        }
	    }
	
	    /**
	     * Parses an expression, which is
	     * 'term [(ADD|SUBTRACT) term [(ADD|SUBTRACT) term ...]]'
	     *
	     * @returns {TreeNode}
	     */
	
	  }, {
	    key: 'subparseExpression',
	    value: function subparseExpression() {
	      var currentNode = this.createEmptyTreeNode();
	      var firstNodeToken = this.tokenStream.currentToken();
	
	      // Extract the first possible sub-node (term)
	      var currentSubNode = this.subparseTerm();
	
	      // /////////////////////////////////
	      // Expression is just a single term
	      // /////////////////////////////////
	      if (!this.tokenStream.currentToken().isExpressionSign()) {
	        return currentSubNode;
	      }
	
	      // //////////////////////////////
	      // Expression matches a pattern term (ADD|) term [(ADD|SUBTRACT) term ...]
	      // //////////////////////////////
	      currentNode.subNodes = [currentSubNode];
	      currentNode.subActions = [];
	      currentNode.type = _treeNodeType.TreeNodeType.EXPRESSION;
	
	      while (this.tokenStream.currentToken().isExpressionSign()) {
	
	        // Add sub-action
	        currentNode.subActions.push(this.tokenStream.currentToken());
	
	        // If a child is empty and it is not the first term parsed,
	        // mark node as one with errors
	        if (currentSubNode.isEmpty() && currentNode.subNodes.length != 1) {
	          currentNode.hasErrors = true;
	        }
	
	        // Move forward
	        this.tokenStream.nextToken(true);
	        currentSubNode = this.subparseTerm();
	        currentNode.subNodes.push(currentSubNode);
	      }
	
	      // If any of sub-nodes contains errors, mark a node as the one with error
	      _underscore2.default.each(currentNode.subNodes, function (subNode) {
	        if (subNode.hasErrors) {
	          currentNode.hasErrors = true;
	          _underscore2.default.breakLoop();
	        }
	      });
	
	      // Work out case SUBTRACT term.
	      // Replace first empty sub-node with number (0)
	      if (currentNode.subNodes[0].isEmpty()) {
	        if (currentNode.subActions[0].type == _tokenType.TokenType.SUBTRACT) {
	          currentNode.subNodes[0].type = _treeNodeType.TreeNodeType.NUMBER;
	          currentNode.subNodes[0].value = 0;
	        } else {
	          currentNode.hasErrors = true;
	        }
	      }
	
	      // Get the position of the current node
	      currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.previousToken().pos);
	
	      return currentNode;
	    }
	
	    /**
	     * Parses a term, which is
	     * 'power [(MULTIPLY/DIVIDE) power [(MULTIPLY/DIVIDE) power ...]]'
	     *
	     * @returns {TreeNode}
	     */
	
	  }, {
	    key: 'subparseTerm',
	    value: function subparseTerm() {
	      var currentNode = this.createEmptyTreeNode();
	      var firstNodeToken = this.tokenStream.currentToken();
	      currentNode.type = _treeNodeType.TreeNodeType.TERM;
	
	      // Extract the first possible sub-node (power)
	      var currentSubNode = this.subparsePower();
	
	      ////////////////////////////////
	      // Term matches pattern 'power(MULTIPLY|DIVIDE|)power [...]'
	      ////////////////////////////////
	      currentNode.subNodes = [currentSubNode];
	      currentNode.subActions = [];
	
	      for (;;) {
	        // If the next token is a (MULTIPLY|DIVIDE)
	        // or any error token but those that subdivide statements
	        if (this.tokenStream.currentToken().isTermSign() || this.tokenStream.currentToken().isErrorToken() && !this.tokenStream.currentToken().isStatementSign() && !this.tokenStream.currentToken().isNumber() && !this.tokenStream.currentToken().isLeftBracket() && !this.tokenStream.currentToken().isRightBracket()) {
	          if (this.tokenStream.currentToken().isErrorToken()) {
	            currentNode.hasErrors = true;
	          }
	          currentNode.subActions.push(this.tokenStream.currentToken());
	
	          this.tokenStream.nextToken(true);
	          currentSubNode = this.subparsePower();
	          currentNode.subNodes.push(currentSubNode);
	
	          // Check the case of missing sign MULTIPLE,
	          // e.g NUMBER SYMBOL or NUMBER LB
	        } else if (this.tokenStream.currentToken().isNumber() || this.tokenStream.currentToken().isLeftBracket() || this.tokenStream.currentToken().isSymbol()) {
	            if (this.tokenStream.previousToken().isNumber() && (this.tokenStream.currentToken().isSymbol() || this.tokenStream.currentToken().isLeftBracket())) {
	              // It is still not an error in case NUMBER SYMBOL or NUMBER LB
	              // or the previous token is an error token
	            } else {
	                currentNode.hasErrors = true;
	
	                // An error will show up only if the previous token
	                //  is not an error token or any number token
	                if (!(this.tokenStream.previousToken().isErrorToken() && !this.tokenStream.previousToken().isMathOperator()) || this.tokenStream.previousToken().isNumber()) {
	                  this.errors.add(new _message.Message('e_syn_missing_multiply', _pos.Pos.between(this.tokenStream.previousToken().pos, this.tokenStream.currentToken().pos), {
	                    previousToken: this.tokenStream.previousToken().cloneWithCorrectedType(),
	                    currentToken: this.tokenStream.currentToken().cloneWithCorrectedType()
	                  }));
	                }
	              }
	
	            var pseudoMultiplyToken = new _token.Token(_tokenType.TokenType.MULTIPLY);
	            pseudoMultiplyToken.pos = _pos.Pos.between(this.tokenStream.previousToken().pos, this.tokenStream.currentToken().pos);
	
	            currentNode.subActions.push(pseudoMultiplyToken);
	            currentSubNode = this.subparsePower();
	            currentNode.subNodes.push(currentSubNode);
	
	            // If any error token found, use it to split sub-nodes and parse further nodes
	          } else {
	              break;
	            }
	      }
	
	      ///////////////////////////////
	      // Term is a single power (only one sub-node found)
	      ///////////////////////////////
	      if (currentNode.subNodes.length == 1) {
	        return currentNode.subNodes[0];
	      }
	
	      // If any of sub-nodes is empty or contains error,
	      // mark a node as the one with error.
	      _underscore2.default.each(currentNode.subNodes, function (subNode) {
	        if (subNode.hasErrors || subNode.type == _treeNodeType.TreeNodeType.EMPTY) {
	          currentNode.hasErrors = true;
	          _underscore2.default.breakLoop();
	        }
	      });
	
	      // Get the position of the current node
	      currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.previousToken().pos);
	
	      currentNode.type = _treeNodeType.TreeNodeType.TERM;
	      return currentNode;
	    }
	
	    /**
	     * Parses a power, which is
	     * 'factor [(POWER) factor [(POWER) factor ...]]'
	     *
	     * @returns {TreeNode}
	     */
	
	  }, {
	    key: 'subparsePower',
	    value: function subparsePower() {
	      var currentNode = this.createEmptyTreeNode();
	      var firstNodeToken = this.tokenStream.currentToken();
	
	      // Extract the first possible sub-node (power)
	      var currentSubNode = this.subparseFactor();
	
	      //////////////////////////////
	      // Power is just a single factor
	      //////////////////////////////
	      if (!this.tokenStream.currentToken().isPowerSign()) {
	        return currentSubNode;
	      }
	
	      //////////////////////////////
	      // Power matches a pattern factor (POWER) factor [(POWER)factor) ...]
	      //////////////////////////////
	      currentNode.subNodes = [currentSubNode];
	      currentNode.subActions = [];
	
	      while (this.tokenStream.currentToken().isPowerSign()) {
	        currentNode.subActions.push(this.tokenStream.currentToken().type);
	
	        this.tokenStream.nextToken(true);
	        currentSubNode = this.subparseFactor();
	        currentNode.subNodes.push(currentSubNode);
	      }
	
	      // If any of sub-nodes is empty or contains error,
	      // mark a node as the one with error
	      _underscore2.default.each(currentNode.subNodes, function (subNode) {
	        if (subNode.hasErrors || subNode.type == _treeNodeType.TreeNodeType.EMPTY) {
	          currentNode.hasErrors = true;
	          _underscore2.default.breakLoop();
	        }
	      });
	
	      // Get the position of the current node
	      currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.previousToken().pos);
	
	      currentNode.type = _treeNodeType.TreeNodeType.POWER;
	      return currentNode;
	    }
	
	    /**
	     * Parses a factor, which can be a number, a symbol, a function
	     * (symbol with the following left bracket) or an expression in braces.
	     *
	     * @returns {TreeNode}
	     */
	
	  }, {
	    key: 'subparseFactor',
	    value: function subparseFactor() {
	      var currentNode = this.createEmptyTreeNode();
	      var firstNodeToken = this.tokenStream.currentToken();
	
	      // Depending on the type of a token, parse a factor differently
	      if (firstNodeToken.isNumber()) {
	
	        /////////////////////
	        // Factor is a Number
	        /////////////////////
	
	        currentNode.type = _treeNodeType.TreeNodeType.NUMBER;
	        currentNode.pos = this.tokenStream.currentToken().pos;
	        currentNode.value = this.tokenStream.currentToken().value;
	        this.tokenStream.nextToken(true);
	
	        return currentNode;
	
	        // Factor is a function or a symbol
	      } else if (firstNodeToken.type == _tokenType.TokenType.SYMBOL) {
	
	          // Check for a left bracket after the symbol
	          if (this.tokenStream.nextToken().isLeftBracket()) {
	
	            ///////////////////////
	            // Factor is a function
	            ///////////////////////
	
	            currentNode.type = _treeNodeType.TreeNodeType.FUNCTION;
	            currentNode.name = this.tokenStream.currentToken().value;
	            currentNode.namePos = this.tokenStream.currentToken().pos;
	            currentNode.nameRaw = this.tokenStream.currentToken().raw;
	            currentNode.subNodes = [];
	
	            // Skip over a left bracket and remember the position
	            // of the beginning of the arguments
	            this.tokenStream.nextToken(true);
	            currentNode.argumentPos = _pos.Pos.ending(this.tokenStream.currentToken().pos);
	            this.tokenStream.nextToken(true);
	
	            // Parse arguments
	            if (this.tokenStream.currentToken().isRightBracket()) {
	
	              //////////////////////////////////////
	              // Case one: Function has no arguments
	
	              // Get the position of the current node
	              currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.currentToken().pos);
	
	              // Update the position of the arguments
	              currentNode.argumentPos = _pos.Pos.between(currentNode.argumentPos, this.tokenStream.currentToken().pos);
	
	              // Move cursor one token right
	              this.tokenStream.nextToken(true);
	
	              return currentNode;
	            } else {
	
	              //////////////////////////////////////
	              // Case two: There is no right bracket after the left one
	              // Try to parse arguments
	
	              var currentArgument;
	
	              for (;;) {
	                // Get an argument, which is an expression
	                currentArgument = this.subparseExpression();
	
	                // Add an argument as a sub-node.
	                currentNode.subNodes.push(currentArgument);
	
	                if (this.tokenStream.currentToken().isRightBracket() || this.tokenStream.currentToken().type == _tokenType.TokenType.COMMA || this.tokenStream.currentToken().type == _tokenType.TokenType.SEMICOLON) {
	                  // Check if an argument is empty and add an error if so
	                  if (currentArgument.type == _treeNodeType.TreeNodeType.EMPTY) {
	                    currentArgument.pos = _pos.Pos.between(this.tokenStream.previousToken().pos, this.tokenStream.currentToken().pos);
	                    currentNode.hasErrors = true;
	                    this.errors.add(new _message.Message('e_syn_function_argument_empty', currentArgument.pos));
	                  }
	                }
	
	                // Check for a right bracket
	                if (this.tokenStream.currentToken().isRightBracket()) {
	                  // Get the position of the current node
	                  currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.currentToken().pos);
	
	                  // Update the position of the arguments
	                  currentNode.argumentPos = _pos.Pos.between(currentNode.argumentPos, this.tokenStream.currentToken().pos);
	
	                  // Skip a bracket and return a node
	                  this.tokenStream.nextToken(true);
	                  return currentNode;
	                }
	
	                // Right bracket not found – check for a comma or a semicolon
	                if (this.tokenStream.currentToken().type == _tokenType.TokenType.COMMA || this.tokenStream.currentToken().type == _tokenType.TokenType.SEMICOLON) {
	                  // It is an error if it is a semicolon
	                  if (this.tokenStream.currentToken().type == _tokenType.TokenType.SEMICOLON) {
	                    this.errors.add(new _message.Message('e_syn_function_argument_semicolon', this.tokenStream.currentToken().pos));
	                    currentNode.hasErrors = true;
	                  }
	                  // Skip over a comma / semicolon
	                  this.tokenStream.nextToken(true);
	                  continue;
	                }
	
	                // Any other token is unexpected here
	                currentNode.hasErrors = true;
	
	                if (!this.tokenStream.currentToken().isEOF()) {
	                  // If the content of the parsed part of the expression
	                  // is a single factor, add it as the sub-node for this expression.
	                  // This is made for further semantic check of it.
	                  if (currentArgument.type == _treeNodeType.TreeNodeType.SYMBOL || currentArgument.type == _treeNodeType.TreeNodeType.NUMBER || currentArgument.type == _treeNodeType.TreeNodeType.FUNCTION) {
	                    currentArgument = this.wrapNode(currentArgument);
	                    currentArgument.hasErrors = true;
	                    currentNode.subNodes.pop();
	                    currentNode.subNodes.push(currentArgument);
	                  }
	
	                  currentArgument.type = _treeNodeType.TreeNodeType.E_UNPARSED;
	                  if (!this.tokenStream.currentToken().isErrorToken()) {
	                    this.errors.add(new _message.Message('e_syn_function_argument_wrong_symbol', this.tokenStream.currentToken().pos, { currentToken: this.tokenStream.currentToken() }));
	                  }
	                }
	
	                // Look for the stop-symbol (next right bracket of the
	                // same level or a comma) to continue parsing after it
	                var stopSymbol = this.tokenStream.findNextTokenAtTheSameLevel([_tokenType.TokenType.RB_RIGHT, _tokenType.TokenType.E_SB_RIGHT, _tokenType.TokenType.COMMA, _tokenType.TokenType.SEMICOLON], true);
	
	                // A stop symbol was found
	                if (stopSymbol) {
	                  currentArgument.pos = _pos.Pos.unite(currentArgument.pos, this.tokenStream.previousToken().pos);
	
	                  // Continue if a stop-symbol is comma
	                  if (stopSymbol.type == _tokenType.TokenType.COMMA) {
	                    // Skip a comma
	                    this.tokenStream.nextToken(true);
	                    continue;
	                  }
	                  currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.currentToken().pos);
	                  this.tokenStream.nextToken(true);
	
	                  // A stop symbol was not found – move to the end of the TokenStream
	                } else {
	                    this.tokenStream.lastToken(true);
	                    currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.lastToken().pos);
	                    this.errors.add(new _message.Message('e_syn_missing_rb', _pos.Pos.ending(this.tokenStream.currentToken().pos)));
	                    this.tokenStream.nextToken(true);
	                  }
	
	                // Update the position of the arguments
	                currentNode.argumentPos = _pos.Pos.between(currentNode.argumentPos, this.tokenStream.previousToken().pos);
	                return currentNode;
	              }
	            }
	          } else {
	
	            //////////////////////////
	            // Factor is just a symbol
	            //////////////////////////
	
	            currentNode.type = _treeNodeType.TreeNodeType.SYMBOL;
	            currentNode.pos = this.tokenStream.currentToken().pos;
	            currentNode.name = this.tokenStream.currentToken().value;
	            currentNode.nameRaw = this.tokenStream.currentToken().raw;
	            this.tokenStream.nextToken(true);
	
	            return currentNode;
	          }
	        } else if (this.tokenStream.currentToken().isLeftBracket()) {
	
	          //////////////////////////////////////
	          // Factor is an expression in brackets
	          //////////////////////////////////////
	
	          // Skip left bracket
	          this.tokenStream.nextToken(true);
	
	          // Extract an expression inside the brackets
	          currentNode = this.subparseExpression();
	
	          // Check for the right bracket
	          // -- A Bracket was found
	          if (this.tokenStream.currentToken().isRightBracket()) {
	            // Error if expression in brackets is empty
	            if (currentNode.type == _treeNodeType.TreeNodeType.EMPTY && !currentNode.brackets) {
	              this.errors.add(new _message.Message('e_syn_brackets_empty', _pos.Pos.unite(this.tokenStream.previousToken().pos, this.tokenStream.currentToken().pos)));
	              this.hasErrors = true;
	            }
	            currentNode.brackets = true;
	            this.tokenStream.nextToken(true);
	            return currentNode;
	
	            // -- Any other token found
	          } else {
	
	              // If the content of the parsed part of the expression is a single
	              // factor, add it as the sub-node to this expression
	              // This is made for further semantic check of it
	              if (currentNode.type == _treeNodeType.TreeNodeType.SYMBOL || currentNode.type == _treeNodeType.TreeNodeType.NUMBER || currentNode.type == _treeNodeType.TreeNodeType.FUNCTION) {
	                currentNode = this.wrapNode(currentNode);
	              }
	
	              currentNode.hasErrors = true;
	              currentNode.type = _treeNodeType.TreeNodeType.E_UNPARSED;
	
	              if (!this.tokenStream.currentToken().isErrorToken() && !this.tokenStream.currentToken().isEOF() && this.tokenStream.currentToken().type != _tokenType.TokenType.SEMICOLON) {
	                this.errors.add(new _message.Message('e_syn_brackets_wrong_symbol', this.tokenStream.currentToken().pos, { currentToken: this.tokenStream.currentToken() }));
	              }
	
	              // Look for a stop-symbol (next right bracket of the same level)
	              // to continue parsing after it
	              var _stopSymbol = this.tokenStream.findNextTokenAtTheSameLevel([_tokenType.TokenType.RB_RIGHT, _tokenType.TokenType.E_SB_RIGHT, _tokenType.TokenType.SEMICOLON], true);
	
	              // Stop-symbol was found
	              if (_stopSymbol) {
	                // A bracket was found
	                if (_stopSymbol.isRightBracket()) {
	                  currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.currentToken().pos);
	                  this.tokenStream.nextToken(true);
	                  // A SEMICOLON was found
	                } else {
	                    currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.previousToken().pos);
	                    this.errors.add(new _message.Message('e_syn_missing_rb', _pos.Pos.ending(currentNode.pos)));
	                  }
	                // A bracket was not found – move to the end of the TokenStream
	              } else {
	                  this.tokenStream.lastToken(true);
	                  currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.lastToken().pos);
	                  this.errors.add(new _message.Message('e_syn_missing_rb', _pos.Pos.ending(currentNode.pos)));
	                  this.tokenStream.nextToken(true);
	                }
	            }
	        }
	
	      //////////////////////
	      // Factor is malformed
	      //////////////////////
	
	      // Try to unite all unknown tokens into the factor together with numbers and symbols between them
	      if (this.tokenStream.currentToken().isErrorToken() && !this.tokenStream.currentToken().isMathOperator() && !this.tokenStream.currentToken().isRightBracket()) {
	        currentNode.type = _treeNodeType.TreeNodeType.UNPARSED;
	        while (this.tokenStream.currentToken().isErrorToken() && !this.tokenStream.currentToken().isMathOperator() || (this.tokenStream.currentToken().isNumber() || this.tokenStream.currentToken().isSymbol()) && this.tokenStream.nextToken().isErrorToken() && !this.tokenStream.nextToken().isMathOperator()) {
	          this.tokenStream.nextToken(true);
	        }
	        currentNode.pos = _pos.Pos.unite(firstNodeToken.pos, this.tokenStream.currentToken().pos);
	      }
	
	      return currentNode;
	    }
	
	    /**
	     * Creates a blank tree node.
	     * This function helps at the beginning of each subparseXXX function.
	     *
	     * @returns {TreeNode}
	     */
	
	  }, {
	    key: 'createEmptyTreeNode',
	    value: function createEmptyTreeNode() {
	      //TODO Add a counter to catch “too long math stuff” error
	      /** @type TreeNode */
	      var result = new _treeNode.TreeNode();
	      if (this.tokenStream.currentToken() == this.tokenStream.firstToken()) {
	        result.pos = _pos.Pos.between(new _pos.Pos(0, 0, 0, 0), this.tokenStream.currentToken().pos);
	      } else {
	        result.pos = _pos.Pos.between(this.tokenStream.previousToken().pos, this.tokenStream.currentToken().pos);
	      }
	      return result;
	    }
	
	    /**
	     * Is used in sub-parsing expressions, terms and powers.
	     * Detects empty operands in the entire token stream.
	     */
	
	  }, {
	    key: 'checkForMissedOperands',
	    value: function checkForMissedOperands() {
	      this.tokenStream.firstToken(true);
	      var previousToken;
	      var currentToken;
	      var nextToken;
	
	      do {
	        currentToken = this.tokenStream.currentToken();
	
	        // The check applies to any mathematical operator in a token stream.
	        if (currentToken.isMathOperator() && !currentToken.isErrorToken()) {
	          previousToken = this.tokenStream.previousToken();
	          nextToken = this.tokenStream.nextToken();
	
	          // Case an operator appears at the beginning of something (except SUBTRACTION sign)
	          if (currentToken.type != _tokenType.TokenType.SUBTRACT && (!previousToken || !(previousToken.isMathOperator() || previousToken.isRightBracket() || previousToken.isNumber() || previousToken.isSymbol()))) {
	            this.errors.add(new _message.Message('e_syn_missing_operand_at_begin', _pos.Pos.beginning(this.tokenStream.currentToken().pos), { currentToken: currentToken }));
	          }
	
	          // Case an operator is followed by another operator
	          if (nextToken && nextToken.isMathOperator() && !nextToken.isErrorToken()) {
	            this.errors.add(new _message.Message('e_syn_missing_operand', _pos.Pos.between(currentToken.pos, nextToken.pos), {
	              previousToken: currentToken,
	              currentToken: nextToken
	            }));
	          }
	
	          // Case an operator appears at the end of something
	          if (!nextToken || !(nextToken.isMathOperator() || nextToken.isNumber() || nextToken.isSymbol() || nextToken.isLeftBracket()) && nextToken.type !== _tokenType.TokenType.E_REST) {
	            this.errors.add(new _message.Message('e_syn_missing_operand_at_end', _pos.Pos.between(currentToken.pos, nextToken.pos), {
	              currentToken: currentToken
	            }));
	          }
	        }
	      } while (this.tokenStream.nextToken(true));
	    }
	
	    /**
	     * Wraps a node with another node.
	     *
	     * @param {TreeNode} nodeToBeWrapped
	     *    source node
	     *
	     * @returns {TreeNode}
	     */
	
	  }, {
	    key: 'wrapNode',
	    value: function wrapNode(nodeToBeWrapped) {
	      var wrapperNode = this.createEmptyTreeNode();
	      wrapperNode.subNodes = [nodeToBeWrapped];
	      wrapperNode.pos = nodeToBeWrapped.pos;
	      wrapperNode.hasErrors = nodeToBeWrapped.hasErrors;
	      return wrapperNode;
	    }
	  }]);
	
	  return Tree;
	}();
	
	Tree.MAX_NODE_COUNT = 500;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ValidationRule = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Represents a single validation rule.
	 */
	
	var ValidationRule = exports.ValidationRule = function () {
	
	  /**
	  * @param {Object} value
	  *    The rule itself (yes/no/including/excluding)
	  * @param {Object} listOrParams
	  *    Some additional parameters of the rule or a list.
	  */
	
	  function ValidationRule(value, listOrParams) {
	    _classCallCheck(this, ValidationRule);
	
	    if (!value) {
	      value = ValidationRule.NO;
	    }
	    this.value = value;
	
	    if (_underscore2.default.isArray(listOrParams)) {
	      this.list = listOrParams;
	    } else if (listOrParams != null) {
	      _underscore2.default.extend(this, listOrParams);
	    }
	  }
	
	  /**
	   * Helps to determine using a short notation if the rule has type NO.
	   *
	   * @returns {boolean}
	   */
	
	
	  _createClass(ValidationRule, [{
	    key: 'isNo',
	    value: function isNo() {
	      return this.value == ValidationRule.NO;
	    }
	
	    /**
	     * Helps to determine using a short notation if the rule has type ONLY.
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isOnly',
	    value: function isOnly() {
	      return this.value == ValidationRule.ONLY;
	    }
	
	    /**
	     * Helps to determine using a short notation if the rule has type EXCLUDING.
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isExcluding',
	    value: function isExcluding() {
	      return this.value == ValidationRule.EXCLUDING;
	    }
	
	    /**
	     * Helps to determine using a short notation if the rule has type YES.
	     *
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isYes',
	    value: function isYes() {
	      return this.value == ValidationRule.YES;
	    }
	  }]);
	
	  return ValidationRule;
	}();
	
	ValidationRule.NO = 0;
	ValidationRule.ONLY = 1;
	ValidationRule.EXCLUDING = 2;
	ValidationRule.YES = 4;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ValidationRules = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _validationRule = __webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * ValidationRules are used by Validator to find errors
	 *  in a Tree. Depending on the set of rules, an output of
	 *  the validator can be different.
	 *
	 * @see StandardValidationRules for a preset list of rules
	 *
	 */
	
	var ValidationRules = exports.ValidationRules = function () {
	
	  /**
	   * All rules are NO by default.
	   */
	
	  function ValidationRules() {
	    _classCallCheck(this, ValidationRules);
	
	    this.allowFunctions = new _validationRule.ValidationRule();
	    this.allowConstants = new _validationRule.ValidationRule();
	    this.allowVariables = new _validationRule.ValidationRule();
	
	    // this.acceptMathOperations = new ValidationRule();
	    this.acceptEquations = new _validationRule.ValidationRule();
	    this.acceptInequalities = new _validationRule.ValidationRule();
	    this.acceptSequenceOfStatements = new _validationRule.ValidationRule();
	    this.acceptEmpty = new _validationRule.ValidationRule();
	    this.acceptOnlyNumber = new _validationRule.ValidationRule();
	
	    this.valueOnlyFinite = new _validationRule.ValidationRule();
	    this.valueOnlyInteger = new _validationRule.ValidationRule();
	    this.valueRange = new _validationRule.ValidationRule();
	    this.valueOnlyGreaterThan = new _validationRule.ValidationRule();
	    this.valueOnlyLessThan = new _validationRule.ValidationRule();
	  }
	
	  /**
	   * Sets a certain rule.
	   *
	   * @param {string} name
	   *    Name of the rule.
	   * @param {number} [value]
	   *    Value of a rule. NO by default.
	   * @param {string[]} [list]
	   *    List of exclusions.
	   * @returns {ValidationRules}
	   *      Current object (OK for method chaining).
	   */
	
	
	  _createClass(ValidationRules, [{
	    key: 'setRule',
	    value: function setRule(name, value, list) {
	      this[name] = new _validationRule.ValidationRule(value, list);
	      return this;
	    }
	
	    /**
	     * Returns a deep copy of the set of validation rules.
	     *
	     * @returns {ValidationRules}
	     *      Current object (OK for method chaining).
	     */
	
	  }, {
	    key: 'clone',
	    value: function clone() {
	      var result = new ValidationRules();
	      _underscore2.default.extend(result, _underscore2.default.map(this, _underscore2.default.clone));
	      return result;
	    }
	  }]);
	
	  return ValidationRules;
	}();

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Validator = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _message = __webpack_require__(2);
	
	var _messageList = __webpack_require__(3);
	
	var _pos = __webpack_require__(5);
	
	var _tokenType = __webpack_require__(6);
	
	var _treeNodeType = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Validator applies semantic analysis on Text.
	 * It visits Tree instance and finds semantic
	 * errors depending on what rule set is currently used.
	 */
	
	var Validator = exports.Validator = function () {
	  function Validator() {
	    _classCallCheck(this, Validator);
	
	    this.errors = new _messageList.MessageList();
	    //XXX start using warnings
	    this.warnings = new _messageList.MessageList();
	  }
	
	  /**
	   * Validates a tree of nodes.
	   * Also adds “id” property to each constant, variable or function,
	   * which corresponds to a symbol id (and alias in the WEST Dialect)
	   *
	   * @param {Tree} tree
	   *    Input tree.
	   * @param {Symbols} symbols
	   *    Symbols being used.
	   * @param {ValidationRules} rules
	   *    Set of validation rules being used.
	   * @param {Calculator} [calculator]
	   *    If present, it is attempted to calculate the value of the tree and validate it.
	   *
	   * @returns {boolean}
	   *      true if any changes were made before the previous validation.
	   */
	
	
	  _createClass(Validator, [{
	    key: 'validate',
	    value: function validate(tree, symbols, rules, calculator) {
	
	      this.errors.clear();
	
	      // Check for emptiness
	      if (rules.acceptEmpty.isNo() && tree.root.isEmpty()) {
	        this.errors.add(new _message.Message('e_sem_forbidden_empty', tree.root.pos));
	      } else {
	        // Recursively validate a tree
	        this.validateNode(tree.root, symbols, rules);
	      }
	
	      // Validate value if needed
	      if (calculator && this.errors.isEmpty()) {
	        // Calculate cached values of the tree nodes
	        // to get the value of the tree if possible.
	        calculator.calculateCachedValues(tree.root);
	
	        // Apply some additional rules
	        // -- if Accepting only integers
	        if (rules.valueOnlyInteger.isYes() && isFinite(tree.root.value) && Math.round(tree.root.value) != tree.root.value) {
	          this.errors.add(new _message.Message('e_sem_expected_int', tree.root.pos, { value: tree.root.value }));
	
	          // -- if accepting only finite numbers
	        } else if (rules.valueOnlyFinite.isYes() && !isFinite(tree.root.value)) {
	            this.errors.add(new _message.Message('e_sem_expected_finite', tree.root.pos, { value: tree.root.value }));
	          }
	
	        // -- if accepting only a number of some range
	        if (rules.valueRange.isOnly() && isFinite(tree.root.value) && (tree.root.value < rules.valueRange.min || tree.root.value > rules.valueRange.max)) {
	          this.errors.add(new _message.Message('e_sem_expected_range', tree.root.pos, { value: tree.root.value, range: rules.valueRange }));
	        }
	
	        // -- if Accepting only numbers more than a number
	        if (rules.valueOnlyGreaterThan.isYes() && isFinite(tree.root.value) && isFinite(rules.valueOnlyGreaterThan.bound) && tree.root.value <= rules.valueOnlyGreaterThan.bound) {
	          this.errors.add(new _message.Message('e_sem_expected_gt', tree.root.pos, { value: tree.root.value, bound: rules.valueOnlyGreaterThan.bound }));
	        }
	
	        // -- if Accepting only numbers less than a number
	        if (rules.valueOnlyLessThan.isYes() && isFinite(tree.root.value) && tree.root.value >= rules.valueOnlyLessThan.bound) {
	          this.errors.add(new _message.Message('e_sem_expected_lt', tree.root.pos, { value: tree.root.value, bound: rules.valueOnlyLessThan.bound }));
	        }
	      }
	      return true;
	    }
	
	    /**
	     * Recursively validates a tree node
	     *
	     * @param {TreeNoe} treeNode
	     * @param {Symbols} symbols
	     *    Symbols being used.
	     * @param {ValidationRules} rules
	     *    Set of validation rules being used.
	     */
	
	  }, {
	    key: 'validateNode',
	    value: function validateNode(treeNode, symbols, rules) {
	      var symbolId;
	      var possibleMessageParams;
	
	      switch (treeNode.type) {
	        /////////////////////////////
	        // Constant, variable or a misused function name / unknown symbol
	        /////////////////////////////
	
	        case _treeNodeType.TreeNodeType.SYMBOL:
	
	          ///////////
	          // Constant
	
	          // Check a symbol in a list of standard constants
	          symbolId = symbols.findConstant(treeNode.name);
	          possibleMessageParams = {
	            name: treeNode.nameRaw,
	            id: symbolId
	          };
	
	          if (symbolId) {
	
	            // Keep node sub-type and the id of the constant in the node.
	            treeNode.id = symbolId;
	            treeNode.subType = _treeNodeType.TreeNodeType.STANDARD_CONSTANT;
	
	            // All constants are forbidden here.
	            if (rules.allowConstants.isNo()) {
	              this.errors.add(new _message.Message('e_sem_constant_forbidden_all', treeNode.pos, possibleMessageParams));
	
	              // This constant is forbidden here.
	            } else if (rules.allowConstants.isOnly() && _underscore2.default.indexOf(rules.allowConstants.list, symbolId) == -1 || rules.allowConstants.isExcluding() && _underscore2.default.indexOf(rules.allowConstants.list, symbolId) !== -1) {
	                this.errors.add(new _message.Message('e_sem_constant_forbidden_this', treeNode.pos, possibleMessageParams));
	              }
	
	            return;
	          }
	
	          /////////////////////////////
	          // Variable
	          // Check a symbol in a list of variables
	          symbolId = symbols.findVariable(treeNode.name);
	          possibleMessageParams = {
	            name: treeNode.nameRaw,
	            id: symbolId
	          };
	
	          if (symbolId) {
	
	            // Keep node sub-type and the id of the variable in the node.
	            treeNode.id = symbolId;
	            treeNode.subType = _treeNodeType.TreeNodeType.STANDARD_VARIABLE;
	
	            // All variables are forbidden here.
	            if (rules.allowVariables.isNo()) {
	              this.errors.add(new _message.Message('e_sem_variable_forbidden_all', treeNode.pos, possibleMessageParams));
	
	              // This variable is forbidden here.
	            } else if (rules.allowVariables.isOnly() && _underscore2.default.indexOf(rules.allowVariables.list, symbolId) == -1 || rules.allowVariables.isExcluding() && _underscore2.default.indexOf(rules.allowVariables.list, symbolId) !== -1) {
	                this.errors.add(new _message.Message('e_sem_variable_forbidden_this', treeNode.pos, possibleMessageParams));
	              }
	            return;
	          }
	
	          /////////////////////////////
	          // Function name as a symbol
	          // Check a symbol in a list of standard functions
	          symbolId = symbols.findFunction(treeNode.name);
	          if (symbolId) {
	            this.errors.add(new _message.Message('e_sem_function_as_symbol', treeNode.pos, { name: treeNode.nameRaw, id: symbolId }));
	            return;
	          }
	
	          /////////////////////////////
	          // Unknown symbol
	          this.errors.add(new _message.Message('e_sem_unknown_symbol', treeNode.pos, { name: treeNode.nameRaw }));
	          return;
	
	        /////////////////////////////
	        // Function (or a misused constant or variable name)
	        /////////////////////////////
	        case _treeNodeType.TreeNodeType.FUNCTION:
	
	          // Validate subNodes of a function
	          this.validateSubNodes(treeNode, symbols, rules);
	
	          // Check a function name in a list of standard functions
	          symbolId = symbols.findFunction(treeNode.name);
	          possibleMessageParams = {
	            name: treeNode.nameRaw,
	            id: symbolId
	          };
	
	          if (symbolId) {
	
	            // Keep node sub-type and the ID of the function in the node.
	            treeNode.id = symbolId;
	            treeNode.subType = _treeNodeType.TreeNodeType.STANDARD_FUNCTION;
	
	            // All functions are forbidden here.
	            if (rules.allowFunctions.isNo()) {
	              this.errors.add(new _message.Message('e_sem_function_forbidden_all', treeNode.namePos, possibleMessageParams));
	
	              // This function is forbidden here.
	            } else if (rules.allowFunctions.isOnly() && _underscore2.default.indexOf(rules.allowFunctions.list, symbolId) == -1 || rules.allowFunctions.isExcluding() && _underscore2.default.indexOf(rules.allowFunctions.list, symbolId) !== -1) {
	                this.errors.add(new _message.Message('e_sem_function_forbidden_this', treeNode.namePos, possibleMessageParams));
	              }
	
	            // Check argument count for the function.
	            var argumentCount = symbols.functions[symbolId].argumentCount;
	            var realArgumentCount = treeNode.subNodes.length;
	            var errorPos;
	
	            possibleMessageParams = {
	              name: treeNode.nameRaw,
	              argumentCount: argumentCount,
	              realArgumentCount: realArgumentCount
	            };
	            // -- Case 1: function accepts exactly argumentCount arguments.
	            if (_underscore2.default.isNumber(argumentCount)) {
	              // Passed too much arguments.
	              if (realArgumentCount > argumentCount) {
	                if (treeNode.subNodes[argumentCount - 1]) {
	                  errorPos = _pos.Pos.unite(_pos.Pos.ending(treeNode.subNodes[argumentCount - 1].pos), _pos.Pos.ending(treeNode.argumentPos));
	                } else {
	                  errorPos = treeNode.argumentPos;
	                }
	                this.errors.add(new _message.Message('e_sem_function_arguments_extra_exact', errorPos, possibleMessageParams));
	
	                // Passed too few arguments.
	              } else if (realArgumentCount < argumentCount) {
	                  errorPos = realArgumentCount ? _pos.Pos.unite(_pos.Pos.ending(treeNode.subNodes[realArgumentCount - 1].pos), _pos.Pos.ending(treeNode.argumentPos)) : treeNode.argumentPos;
	                  this.errors.add(new _message.Message('e_sem_function_arguments_few_exact', errorPos, possibleMessageParams));
	                }
	
	              // -- Case 2: Function accepts from argumentCount.min to argumentCount.max arguments.
	            } else {
	                // -- Case 2.1: Upper bound for argument count in Infinity.
	                if (argumentCount.max == Infinity) {
	                  // Passed too few arguments
	                  if (realArgumentCount < argumentCount.min) {
	                    errorPos = realArgumentCount ? _pos.Pos.unite(_pos.Pos.ending(treeNode.subNodes[realArgumentCount - 1].pos), _pos.Pos.ending(treeNode.argumentPos)) : treeNode.argumentPos;
	                    this.errors.add(new _message.Message('e_sem_function_arguments_few_range_n_inf', errorPos, possibleMessageParams));
	                  }
	
	                  // -- Case 2.2: Both Upper bound and lower bound are numbers.
	                } else {
	                    if (realArgumentCount < argumentCount.min) {
	                      errorPos = realArgumentCount ? _pos.Pos.unite(_pos.Pos.ending(treeNode.subNodes[realArgumentCount - 1].pos), _pos.Pos.ending(treeNode.argumentPos)) : treeNode.argumentPos;
	                      this.errors.add(new _message.Message('e_sem_function_arguments_few_range_n_n', errorPos, possibleMessageParams));
	                    }if (realArgumentCount > argumentCount.max) {
	                      errorPos = _pos.Pos.unite(_pos.Pos.ending(treeNode.subNodes[argumentCount.max - 1].pos), _pos.Pos.ending(treeNode.argumentPos));
	                      this.errors.add(new _message.Message('e_sem_function_arguments_extra_range_n_n', errorPos, possibleMessageParams));
	                    }
	                  }
	              }
	            return;
	          }
	
	          /////////////////////////////
	          // Constant name as a function
	          // Check a symbol in a list of standard constants
	          symbolId = symbols.findConstant(treeNode.name);
	          if (symbolId) {
	            this.errors.add(new _message.Message('e_sem_constant_as_function', treeNode.namePos, { name: treeNode.nameRaw, id: symbolId }));
	            return;
	          }
	          /////////////////////////////
	          // Variable name as a function
	          // Check a symbol in a list of standard variables
	          symbolId = symbols.findVariable(treeNode.name);
	          if (symbolId) {
	            this.errors.add(new _message.Message('e_sem_variable_as_function', treeNode.namePos, { name: treeNode.nameRaw, id: symbolId }));
	            return;
	          }
	
	          /////////////////////////////
	          // Unknown function
	          this.errors.add(new _message.Message('e_sem_unknown_function', treeNode.namePos, { name: treeNode.nameRaw }));
	          return;
	
	        /////////////////////////////
	        // Inequality or equation
	        /////////////////////////////
	        case _treeNodeType.TreeNodeType.STATEMENT:
	          if (treeNode.subType == _treeNodeType.TreeNodeType.STATEMENT_EQUATION && rules.acceptEquations.isNo()) {
	            this.errors.add(new _message.Message('e_sem_forbidden_equation', treeNode.subActions[0].pos));
	          } else if (treeNode.subType == _treeNodeType.TreeNodeType.STATEMENT_INEQUALITY && rules.acceptInequalities.isNo()) {
	            this.errors.add(new _message.Message('e_sem_forbidden_inequality', treeNode.subActions[0].pos));
	          }
	
	          this.validateSubNodes(treeNode, symbols, rules);
	          return;
	
	        /////////////////////////////
	        // Sequence of statements
	        /////////////////////////////
	        case _treeNodeType.TreeNodeType.SEQUENCE_OF_STATEMENTS:
	          if (rules.acceptSequenceOfStatements.isNo() && treeNode.subActions[0].type == _tokenType.TokenType.SEMICOLON) {
	            if (treeNode.subNodes.length == 1) {
	              this.errors.add(new _message.Message('e_sem_forbidden_semicolon', treeNode.subActions[0].pos));
	            } else {
	              this.errors.add(new _message.Message('e_sem_forbidden_sequence_of_statements', treeNode.subActions[0].pos));
	            }
	          }
	
	          this.validateSubNodes(treeNode, symbols, rules);
	          return;
	
	        ////////////////////////////
	        // Expression, term or power
	        ////////////////////////////
	        default:
	          this.validateSubNodes(treeNode, symbols, rules);
	      }
	    }
	
	    /**
	     * Validates sub-nodes of a given node.
	     *
	     * @param {Object} treeNode
	     *        Node to work with.
	     * @param {Symbols} symbols
	     *        Symbols being used.
	     * @param {ValidationRules} rules
	     *        Set of validation rules being used.
	     */
	
	  }, {
	    key: 'validateSubNodes',
	    value: function validateSubNodes(treeNode, symbols, rules) {
	      var subNode;
	      for (var i in treeNode.subNodes) {
	        if (!treeNode.subNodes.hasOwnProperty(i)) {
	          continue;
	        }
	        subNode = treeNode.subNodes[i];
	        if (!subNode.isEmpty() && !subNode.isUnparsed()) {
	          this.validateNode(subNode, symbols, rules);
	        }
	      }
	    }
	  }]);
	
	  return Validator;
	}();

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Helper Class — to implement a functionality of aliases for functions
	 */
	
	var Dialect = exports.Dialect = function Dialect() {
	  _classCallCheck(this, Dialect);
	};
	
	Dialect.WEST = 1;
	Dialect.WEST_LONG = 2;
	Dialect.EAST = 16;
	Dialect.GREEK = 32;
	Dialect.RUS = 48;
	Dialect.RUS_LONG = 49;
	Dialect.PROGRAMMING = 64;
	Dialect.MISC = 0;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Locale = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _removeMarkdown = __webpack_require__(22);
	
	var _removeMarkdown2 = _interopRequireDefault(_removeMarkdown);
	
	var _message = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Locale = exports.Locale = function () {
	  function Locale(data) {
	    _classCallCheck(this, Locale);
	
	    this.data = data;
	  }
	  /**
	   * Returns a user-friendly message markdown with details.
	   *
	   * @param {Message} objectToLocalize
	   *      HumaneMath object to extract localized sting from
	   *
	   * @returns {string}
	   *      markdown
	   */
	
	
	  _createClass(Locale, [{
	    key: 'toMarkdown',
	    value: function toMarkdown(objectToLocalize) {
	      if (objectToLocalize instanceof _message.Message) {
	        var messageId = objectToLocalize.type;
	        var message = this.messages[messageId];
	        if (_underscore2.default.isString(message)) {
	          return message;
	        } else if (_underscore2.default.isFunction(message)) {
	          var params = _underscore2.default.extend(objectToLocalize.params || {}, objectToLocalize.pos);
	          return message(params);
	        }
	      }
	    }
	
	    /**
	     * Returns a user-friendly message text with details.
	     *
	     * @param {Message} objectToLocalize
	     *      HumaneMath object to extract localized sting from
	     *
	     * @returns {string}
	     *      unescaped text
	     */
	
	  }, {
	    key: 'toText',
	    value: function toText(objectToLocalize) {
	      var markdown = this.toMarkdown(objectToLocalize);
	      return (0, _removeMarkdown2.default)(markdown);
	    }
	  }]);
	
	  return Locale;
	}();

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(md, options) {
	  options = options || {};
	  options.stripListLeaders = options.hasOwnProperty('stripListLeaders') ? options.stripListLeaders : true;
	  options.gfm = options.hasOwnProperty('gfm') ? options.gfm : true;
	
	  var output = md;
	  try {
	    if (options.stripListLeaders) {
	      output = output.replace(/^([\s\t]*)([\*\-\+]|\d\.)\s+/gm, '$1');
	    }
	    if (options.gfm){
	      output = output
	        // Header
	        .replace(/\n={2,}/g, '\n')
	        // Strikethrough
	        .replace(/~~/g, '')
	        // Fenced codeblocks
	        .replace(/`{3}.*\n/g, '');
	    }
	    output = output
	      // Remove HTML tags
	      .replace(/<(.*?)>/g, '$1')
	      // Remove setext-style headers
	      .replace(/^[=\-]{2,}\s*$/g, '')
	      // Remove footnotes?
	      .replace(/\[\^.+?\](\: .*?$)?/g, '')
	      .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
	      // Remove images
	      .replace(/\!\[.*?\][\[\(].*?[\]\)]/g, '')
	      // Remove inline links
	      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
	      // Remove Blockquotes
	      .replace(/>/g, '')
	      // Remove reference-style links?
	      .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
	      // Remove atx-style headers
	      .replace(/^\#{1,6}\s*([^#]*)\s*(\#{1,6})?/gm, '$1')
	      .replace(/([\*_]{1,3})(\S.*?\S)\1/g, '$2')
	      .replace(/(`{3,})(.*?)\1/gm, '$2')
	      .replace(/^-{3,}\s*$/g, '')
	      .replace(/`(.+?)`/g, '$1')
	      .replace(/\n{2,}/g, '\n\n');
	  } catch(e) {
	    console.error(e);
	    return md;
	  }
	  return output;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Symbols = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Container for functions, constants and variables
	 */
	
	var Symbols = exports.Symbols = function () {
	  function Symbols() {
	    _classCallCheck(this, Symbols);
	
	    this.functionDefinitionsById = [];
	    this.constantDefinitionsById = [];
	    this.variableDefinitionsById = [];
	    this.functionIdsByAlias = {};
	    this.constantIdsByAlias = {};
	    this.variableIdsByAlias = {};
	
	    this.disableAutoIndexing();
	    this.initialize();
	    this.enableAutoIndexing();
	
	    this.indexAliases(this.functionDefinitionsById, this.functionIdsByAlias);
	    this.indexAliases(this.constantDefinitionsById, this.constantIdsByAlias);
	    this.indexAliases(this.variableDefinitionsById, this.variableIdsByAlias);
	  }
	
	  _createClass(Symbols, [{
	    key: 'initialize',
	    value: function initialize() {}
	  }, {
	    key: 'disableAutoIndexing',
	    value: function disableAutoIndexing() {
	      this.autoIndexingDisabled = true;
	    }
	  }, {
	    key: 'enableAutoIndexing',
	    value: function enableAutoIndexing() {
	      delete this.autoIndexingDisabled;
	    }
	
	    /**
	     * Registers a function.
	     *
	     * @private
	     *
	     * @param {Array} aliases
	     *    Alternative names for the function
	     * @param {Function} executor
	     *    Function object that executes the function.
	     * @param {number|Array} [argumentCount=1]
	     *    Can be both an integer positive number and an Array of one
	     *    or 2 numbers. If the number in an array is
	     *    single, it corresponds to minimum number of arguments, otherwise
	     *    the first one means minimum argument count, and another one —
	     *    maximum count.
	     * @param {boolean} [nonSimplifiable=false]
	     *    Defines whether a function can be a subject to
	     *    simplification. Is true for random generator functions.
	     * @param {boolean} [calculateForNaNs=false]
	     *    Set to true to avoid “lazy calculating” for the
	     *    function. Even if any of the arguments is NaN, calculations will
	     *    not be aborted (e.g. useful for “if”).
	     */
	
	  }, {
	    key: 'addFunction',
	    value: function addFunction(aliases, executor) {
	      var argumentCount = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	      var nonSimplifiable = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	      var calculateForNaNs = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
	
	      var currentFunctionDefinition = {};
	      currentFunctionDefinition.id = this.extractIdFromAliases(aliases);
	
	      currentFunctionDefinition.aliases = aliases;
	
	      if (!_underscore2.default.isFunction(executor)) {
	        throw new Error('Function ' + currentFunctionDefinition.id + ' does not have a valid executor');
	      }
	      currentFunctionDefinition.executor = executor;
	
	      // Add argumentCount
	      if (_underscore2.default.isNumber(argumentCount)) {
	        currentFunctionDefinition.argumentCount = argumentCount;
	      } else if (_underscore2.default.isArray(argumentCount)) {
	        currentFunctionDefinition.argumentCount = {
	          min: argumentCount[0],
	          max: argumentCount.length == 1 ? Number.POSITIVE_INFINITY : argumentCount[1]
	        };
	      }
	
	      currentFunctionDefinition.nonSimplifiable = !!nonSimplifiable;
	      currentFunctionDefinition.calculateForNaNs = !!calculateForNaNs;
	
	      this.functionDefinitionsById[currentFunctionDefinition.id] = currentFunctionDefinition;
	
	      if (!this.autoIndexingDisabled) {
	        this.indexAliases(this.functionDefinitionsById, this.functionIdsByAlias);
	      }
	    }
	
	    /**
	     * Registers a constant.
	     *
	     * @private
	     *
	     * @param {Array} aliases
	     *    Alternative names for the constant
	     * @param {number} value
	     *    Value of a constant
	     */
	
	  }, {
	    key: 'addConstant',
	    value: function addConstant(aliases, value) {
	      var currentConstantDefinition = {};
	      currentConstantDefinition.id = this.extractIdFromAliases(aliases);
	      currentConstantDefinition.aliases = aliases;
	      currentConstantDefinition.value = value;
	
	      this.constantDefinitionsById[currentConstantDefinition.id] = currentConstantDefinition;
	
	      if (!this.autoIndexingDisabled) {
	        this.indexAliases(this.constantDefinitionsById, this.constantIdsByAlias);
	      }
	    }
	
	    /**
	     * Registers a variable.
	     *
	     * @param {Object} aliases
	     *    Alternative names for the variable.
	     */
	
	  }, {
	    key: 'addVariable',
	    value: function addVariable(aliases) {
	      var currentVariableDefinition = [];
	      currentVariableDefinition.id = this.extractIdFromAliases(aliases);
	      currentVariableDefinition.aliases = aliases;
	
	      this.variableDefinitionsById[currentVariableDefinition.id] = currentVariableDefinition;
	
	      if (!this.autoIndexingDisabled) {
	        this.indexAliases(this.functionDefinitionsById, this.functionIdsByAlias);
	      }
	    }
	
	    /**
	     * Performs a search for a requested function.
	     *
	     * @param {string} functionName
	     *        Name of a function that need to be found.
	     *
	     * @returns {?string}
	     *          id of a function (substitutes alias with the default name)
	     *          or null if it was not found.
	     */
	
	  }, {
	    key: 'findFunction',
	    value: function findFunction(functionName) {
	      return this.functionIdsByAlias[functionName] || null;
	    }
	
	    /**
	     * Performs a search for a requested constant.
	     *
	     * @param {string} constantName
	     *        Name of a constant that need to be found.
	     *
	     * @returns {?string}
	     *          id of a constant (substitutes alias with the default name)
	     *          or null if it was not found.
	     *
	     */
	
	  }, {
	    key: 'findConstant',
	    value: function findConstant(constantName) {
	      return this.constantIdsByAlias[constantName] || null;
	    }
	
	    /**
	     * Performs a search for a requested variable.
	     *
	     * @param {string} variableName
	     *        Name of a variable that need to be found.
	     *
	     * @returns {?string}
	     *          id of a variable (substitutes alias with the default name)
	     *          or null if it was not found.
	     */
	
	  }, {
	    key: 'findVariable',
	    value: function findVariable(variableName) {
	      return this.variableIdsByAlias[variableName] || false;
	    }
	
	    /**
	     * Creates a helpful index array of aliases. This helps to find a function
	     * or an constant by its alias
	     *
	     * @private
	     *
	     * @param {Object} whatToIndex
	     *    reference to a list of functions/constants.
	     * @param {Object} whereToPut
	     *    reference to a list with indexes.
	     */
	
	  }, {
	    key: 'indexAliases',
	    value: function indexAliases(whatToIndex, whereToPut) {
	      _underscore2.default.each(whatToIndex, function (symbolDefinition, symbolId) {
	        _underscore2.default.each(symbolDefinition.aliases, function (alias) {
	          whereToPut[alias] = symbolId;
	        });
	      });
	    }
	
	    /**
	     *
	     * @private
	     *
	     * @param {Object} aliases
	     *        key/value pairs
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'extractIdFromAliases',
	    value: function extractIdFromAliases(aliases) {
	      return _underscore2.default.keys(aliases)[0];
	    }
	  }]);
	
	  return Symbols;
	}();

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Text = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //import Signal from 'signals';
	
	
	var _messageList = __webpack_require__(3);
	
	var _messageList2 = _interopRequireDefault(_messageList);
	
	var _tokenStream = __webpack_require__(8);
	
	var _tokenStream2 = _interopRequireDefault(_tokenStream);
	
	var _tree = __webpack_require__(16);
	
	var _tree2 = _interopRequireDefault(_tree);
	
	var _validator = __webpack_require__(19);
	
	var _validator2 = _interopRequireDefault(_validator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Text is a main class used for keeping mathematical statements, expressions, etc.
	 */
	
	var Text = exports.Text = function () {
	  function Text() {
	    _classCallCheck(this, Text);
	  }
	
	  _createClass(Text, [{
	    key: 'construct',
	
	    /**
	     * @param {Symbols} symbols
	     * @param {ValidationRules} validationRules
	     * @param {string} [defaultContent='']
	     */
	    value: function construct(symbols, validationRules) {
	      var defaultContent = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	
	
	      this._tokenStream = new _tokenStream2.default();
	      this._tree = new _tree2.default();
	      this._validator = new _validator2.default();
	
	      this._validationRules = validationRules;
	
	      this.errors = new _messageList2.default();
	      this.warnings = new _messageList2.default();
	      this.hasErrors = false;
	      this.hasWarnings = false;
	
	      //this.changed = new Signal();
	
	      this.setContent(defaultContent);
	    }
	
	    /**
	     * Updates an object with new text (formula).
	     *
	     * @param {string} newContent
	     *    new mathematical expression that needs to be interpreted.
	     *
	     * @returns {boolean}
	     *     true if the formula was really changed.
	     */
	
	  }, {
	    key: 'setContent',
	    value: function setContent() {
	      var newContent = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	
	      // var time_start = new Date().getTime();
	
	      // Basic check on changes
	      if (this.content === newContent) {
	        return false;
	      }
	
	      this.content = newContent;
	
	      // Perform lexical analysis
	      if (!this._tokenStream.tokenize(newContent)) {
	        return false;
	      }
	
	      // Perform syntactic analysis
	      if (!this._tree.parse(this._tokenStream)) {
	        return false;
	      }
	
	      // Perform semantic analysis
	      this._validator.validate(this._tree, this._validationRules, !this._tokenStream.errors.isEmpty() || !this._tree.errors.isEmpty());
	
	      // Collect errors
	      this.errors = new _messageList2.default(this._tokenStream.errors, this._tree.errors, this._validator.errors).sort();
	
	      //this.changed.dispatch();
	
	      // Return true as the text was changed
	      return true;
	    }
	
	    /**
	     * Re-validates the math object according to new validation rule set.
	     *
	     * @param {Object} validationRules
	     *
	     * @returns {boolean} True if anything was changed.
	     */
	
	  }, {
	    key: 'setValidationRules',
	    value: function setValidationRules(validationRules) {
	      if (this._validationRules == validationRules) {
	        return false;
	      }
	
	      this._validationRules = validationRules;
	
	      // Perform semantic analysis
	      if (!this._validator.validate(this._tree, this._validationRules)) {
	        return false;
	      }
	
	      // Collect errors
	      this.errors = new _messageList2.default(this._tokenStream.errors, this._tree.errors, this._validator.errors).sort();
	
	      //this.changed.dispatch();
	      return true;
	    }
	    //XXX remove or restore
	    // dump() {
	    //   return `text: "${this.content}", errors: ${this.errors.count()} (${this._tokenStream.errors.count()}, ${this._tree.errors.count()}, ${this._validator.errors.count()})`;
	    // //    + ' Warnings: ' + this.warnings.count()
	    // //        + '(' + this._tokenStream.warnings.count() + ', '
	    // //            + this._tree.warnings.count()    + ', '
	    // //            + this._validator.warnings.count()   + ')'
	    //     ;
	    // }
	
	  }]);
	
	  return Text;
	}();

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Calculator = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _tokenType = __webpack_require__(6);
	
	var _tokenType2 = _interopRequireDefault(_tokenType);
	
	var _treeNodeType = __webpack_require__(14);
	
	var _treeNodeType2 = _interopRequireDefault(_treeNodeType);
	
	var _text = __webpack_require__(24);
	
	var _text2 = _interopRequireDefault(_text);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Calculator can be used for extracting node values.
	 * It is also helpful to precompute values for some nodes
	 * a tree in order to make further calculations faster. The calculator
	 * does not simplify a tree or make any other changes to it except
	 * for adding or removing “value” property to nodes.
	 * Calculator is a Visitor.
	 */
	
	var Calculator = exports.Calculator = function () {
	  function Calculator() {
	    _classCallCheck(this, Calculator);
	  }
	
	  _createClass(Calculator, [{
	    key: 'calculateExpression',
	
	
	    /**
	     * Recursively calculates values for all nodes starting at “treeNode” where it
	     * is possible and stores the result at node.value. This can be useful for
	     * increasing the speed of further calculations.
	     *
	     * @param {MathTreeNode} expressionNode
	     *    A MathTreeNode to be calculated. Can be any type of node.
	     *
	     * @param {Object} variables
	     *    Variables passed.
	     *
	     * @param {Object} userSymbols
	     *    Set of user constants and functions. Not in use now.
	     *
	     * @returns {number}
	     *     Value of the expression or NaN if calculation failed.
	     */
	    value: function calculateExpression(expressionNode, variables, userSymbols) {
	      if (expressionNode instanceof _text2.default) {
	        expressionNode = expressionNode.tree.root;
	      }
	
	      if (!variables) {
	        variables = {};
	      }
	
	      var result = Number.NaN;
	      try {
	        result = this.calculateValueOfTheNode(expressionNode, variables, userSymbols);
	      } catch (e) {
	        if (e != this.COULD_NOT_CALCULATE_EXCEPTION) {
	          throw e;
	        }
	      }
	
	      return result;
	    }
	
	    /**
	     * Checks whether the given inequality is true. (Not implemented yet)
	     * TODO implement
	     *
	     * @param {Object}
	     *    inequalityNode
	     * @param {Object}
	     *    variables
	     * @param {Object}
	     *    userSymbols
	     */
	    //checkInequality(inequalityNode, variables, userSymbols) {
	    //}
	
	    /**
	     * Recursively calculates values for all nodes starting at “treeNode” where it
	     * is possible and stores the result at node.value. This can be useful for
	     * increasing the speed of further calculations.
	     *
	     * @param {MathTreeNode} treeNode
	     *    A MathTreeNode to be calculated. Can be any type of node.
	     * @param {Object} variables
	     *    Variables passed.
	     * @param {Object} userSymbols
	     *    Set of user constants and functions. Not in use now.
	     */
	
	
	    /**
	     * This inner use exception is to be thrown anytime a calculation of sub-nodes
	     * fails. It is caught by a caller function and NaN is returned. Such approach
	     * is made to increase the speed of the calculator and avoid performing useless
	     * computations.
	     */
	
	  }, {
	    key: 'calculateCachedValues',
	    value: function calculateCachedValues(treeNode, variables, userSymbols) {
	      if (treeNode instanceof _text2.default) {
	        treeNode = treeNode.tree.root;
	      }
	
	      if (!variables) {
	        variables = {};
	      }
	
	      try {
	        this.calculateValueOfTheNode(treeNode, variables, userSymbols, true);
	      } catch (e) {
	        if (e != this.COULD_NOT_CALCULATE_EXCEPTION) {
	          throw e;
	        }
	      }
	    }
	
	    /**
	     * Removes all cashed values of the nodes. For instance, if a node contained
	     * (pi-3) and its value was equal to 0.14, its value becomes undefined.
	     *
	     * @param {Object} treeNode
	     *    Node to clear values in
	     */
	
	  }, {
	    key: 'clearCachedValues',
	    value: function clearCachedValues(treeNode) {
	      if (treeNode instanceof _text2.default) {
	        treeNode = treeNode.tree.root;
	      }
	
	      // Recursively clear child nodes.
	      if (treeNode.subNodes) {
	        for (var i = treeNode.subNodes.length - 1; i >= 0; i--) {
	          this.clearCachedValues(treeNode.subNodes[i]);
	        }
	      }
	
	      // Delete a value of the current node in case it is not a number.
	      if (treeNode.type != _treeNodeType2.default.NUMBER) {
	        delete treeNode.value;
	      }
	    }
	
	    /**
	     * Calculates the value of a node and depending on the mode returns it or saves
	     * as the node “value” property.
	     *
	     * @param {MathTreeNode} treeNode
	     *    A MathTreeNode to be calculated. Can be any type of node.
	     * @param {Object} variables
	     *    Variables passed.
	     * @param {Object} symbols
	     *    Set of constants and functions.
	     * @param {boolean} calculateCacheMode
	     *    If true, the result of the function will be saved as the node “value” property.
	     * @returns {number|NaN}
	     *      xxx
	     */
	
	  }, {
	    key: 'calculateValueOfTheNode',
	    value: function calculateValueOfTheNode(treeNode, variables, symbols, calculateCacheMode) {
	
	      //FIXME revise
	      //// Do nothing if the value is already calculated or this node is a number (it has already got a value).
	      // if ((treeNode.value !== null && !calculateCacheMode) || treeNode.type == TreeNodeType.NUMBER)
	
	      // Do nothing if a value is already known, just return it.
	      if (treeNode.value !== undefined) {
	        return treeNode.value;
	      }
	
	      // The result is meaningless by default.
	      var result = null;
	
	      // All values of sub-nodes must be kept in a separate array to be then passed
	      // to an executor function or processed.
	      var subNodesValues = new Array();
	
	      // Detects if the function must return NaN if any of sub-nodes contains NaN.
	      var failOnSubNodeNaN = true;
	
	      // If is a special case. No need to return NaN if any of the arguments is NaN.
	      if (treeNode.type == _treeNodeType2.default.FUNCTION && symbols.functions[treeNode.id] && symbols.functions[treeNode.id].calculateForNaNs) {
	        failOnSubNodeNaN = false;
	      }
	
	      // Calculate values for all children sub-nodes if there are any.
	      if (treeNode.subNodes) {
	        for (var i = treeNode.subNodes.length - 1; i >= 0; i--) {
	          // Try to get the value of a sub-node and saving it.
	          if (treeNode.subNodes[i].value === undefined) {
	            // If failOnSubNodeNaN is false, calculations are made in
	            // try/catch block to avoid lazy finish in case of a NaN.
	            if (!failOnSubNodeNaN) {
	              try {
	                subNodesValues[i] = this.calculateValueOfTheNode(treeNode.subNodes[i], variables, symbols, calculateCacheMode);
	              } catch (e) {
	                if (e != this.COULD_NOT_CALCULATE_EXCEPTION) {
	                  throw e;
	                }
	              }
	            } else {
	              subNodesValues[i] = this.calculateValueOfTheNode(treeNode.subNodes[i], variables, symbols, calculateCacheMode);
	            }
	          } else {
	            subNodesValues[i] = treeNode.subNodes[i].value;
	          }
	
	          // If any of sub-nodes has a non-numeric value and failOnSubNodeNaN
	          // is not false, return.
	          if (failOnSubNodeNaN && (subNodesValues[i] === undefined || subNodesValues[i] === null)) {
	            return NaN;
	          }
	        }
	      }
	
	      // If the function cannot be simplified and now in calculate cache mode, return.
	      if (calculateCacheMode && treeNode.type == _treeNodeType2.default.FUNCTION && typeof symbols.functions[treeNode.id] != 'undefined' && symbols.functions[treeNode.id].nonSimplifiable) {
	        return NaN;
	      }
	
	      var subNodesValuesCount = subNodesValues.length;
	
	      /////////////////////////////////////
	      // Calculate a value of the current node depending on its type.
	      /////////////////////////////////////
	
	      switch (treeNode.type) {
	
	        /////////////////////////////////////
	        // Node is a symbol
	        case _treeNodeType2.default.SYMBOL:
	          // A symbol is a standard constant.
	          if (treeNode.subType == _treeNodeType2.default.STANDARD_CONSTANT) {
	            if (typeof symbols.constants[treeNode.id] == 'undefined') {
	              return NaN;
	            }
	            result = symbols.constants[treeNode.id].value;
	            break;
	          }
	
	          // A symbol is a variable passed to the calculator.
	          if (variables[treeNode.id] !== undefined) {
	            result = variables[treeNode.id];
	            break;
	          }
	          //FIXME check this
	          break;
	
	        /////////////////////////////////////
	        // Node is a function
	        case _treeNodeType2.default.FUNCTION:
	
	          // A function is standard.
	          if (treeNode.subType == _treeNodeType2.default.STANDARD_FUNCTION) {
	            if (_typeof(symbols.functions[treeNode.id]) != undefined) {
	              return NaN;
	            }
	            result = symbols.functions[treeNode.id].executor(subNodesValues);
	            break;
	          }
	          break;
	
	        /////////////////////////////////////
	        // Node is an expression
	        case _treeNodeType2.default.EXPRESSION:
	          result = subNodesValues[0];
	          for (var i = 1; i < subNodesValuesCount; i++) {
	            if (treeNode.subActions[i - 1].type == _tokenType2.default.ADD) {
	              result += subNodesValues[i];
	            } else {
	              result -= subNodesValues[i];
	            }
	          }
	          break;
	
	        /////////////////////////////////////
	        // Node is a term
	        case _treeNodeType2.default.TERM:
	          result = subNodesValues[0];
	          for (var i = 1; i < subNodesValuesCount; i++) {
	            if (treeNode.subActions[i - 1].type == _tokenType2.default.MULTIPLY) {
	              result *= subNodesValues[i];
	            } else {
	              result /= subNodesValues[i];
	            }
	          }
	          break;
	
	        /////////////////////////////////////
	        // Node is a power
	        case _treeNodeType2.default.POWER:
	          result = subNodesValues[0];
	          for (var i = 1; i < subNodesValuesCount; i++) {
	            result = Math.pow(result, subNodesValues[i]);
	          }
	          break;
	      }
	
	      // Do something with an obtained result
	
	      if (isNaN(result) && !calculateCacheMode) {
	        throw this.COULD_NOT_CALCULATE_EXCEPTION;
	      }
	
	      // Saving node result if it we are in a “calculate cache” mode
	      if (calculateCacheMode && _underscore2.default.isNumber(result) && !isNaN(result)) {
	        treeNode.value = result;
	      }
	      return result;
	    }
	  }]);
	
	  return Calculator;
	}();
	
	Calculator.COULD_NOT_CALCULATE_EXCEPTION = 13;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _core = __webpack_require__(1);
	
	_core.HumaneMath.validationRules.ABSTRACT_FUNCTION = new _core.HumaneMath.ValidationRules().setRule('allowFunctions', _core.HumaneMath.ValidationRule.YES).setRule('allowConstants', _core.HumaneMath.ValidationRule.YES).setRule('acceptMathOperations', _core.HumaneMath.ValidationRule.YES);
	//  .setRule('allowConstants', HumaneMath.ValidationRule.ONLY, ['e'])
	//  .setRule('allowConstants', HumaneMath.ValidationRule.EXCLUDING, ['pi'])
	
	// Functions
	// -- f(x)
	_core.HumaneMath.validationRules.FUNCTION_Y_X = _core.HumaneMath.validationRules.ABSTRACT_FUNCTION.clone().setRule('allowVariables', _core.HumaneMath.ValidationRule.ONLY, ['x']);
	
	// -- f(y)
	_core.HumaneMath.validationRules.FUNCTION_X_Y = _core.HumaneMath.validationRules.ABSTRACT_FUNCTION.clone().setRule('allowVariables', _core.HumaneMath.ValidationRule.ONLY, ['y']);
	
	// -- f(t)
	_core.HumaneMath.validationRules.FUNCTION_X_T = _core.HumaneMath.validationRules.ABSTRACT_FUNCTION.clone().setRule('allowVariables', _core.HumaneMath.ValidationRule.ONLY, ['t']);
	
	_core.HumaneMath.validationRules.FUNCTION_Y_T = _core.HumaneMath.validationRules.FUNCTION_X_T;
	
	// -- f(a)
	_core.HumaneMath.validationRules.FUNCTION_R_A = _core.HumaneMath.validationRules.ABSTRACT_FUNCTION.clone().setRule('allowVariables', _core.HumaneMath.ValidationRule.ONLY, ['a']);
	
	// Arguments
	// -- range
	_core.HumaneMath.validationRules.ARG_RANGE = new _core.HumaneMath.ValidationRules().setRule('valueOnlyFinite', _core.HumaneMath.ValidationRule.YES).setRule('allowConstants', _core.HumaneMath.ValidationRule.YES);
	
	// -- steps
	_core.HumaneMath.validationRules.ARG_STEPS = new _core.HumaneMath.ValidationRules().setRule('valueOnlyFinite', _core.HumaneMath.ValidationRule.YES).setRule('valueOnlyInteger', _core.HumaneMath.ValidationRule.YES).setRule('valueRange', _core.HumaneMath.ValidationRule.ONLY, {
	    min: 2,
	    max: 100000
	});
	
	// Canvas bound
	_core.HumaneMath.validationRules.CANVAS_BOUNDS = new _core.HumaneMath.ValidationRules().setRule('valueOnlyFinite', _core.HumaneMath.ValidationRule.YES).setRule('allowConstants', _core.HumaneMath.ValidationRule.YES).setRule('valueRange', _core.HumaneMath.ValidationRule.ONLY, {
	    min: -1000,
	    max: 1000
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _core = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* eslint-disable indent, spellcheck/spell-checker */
	/* See http://github.com/eslint/eslint/issues/4696 */
	
	/**
	 * The class is a standard source for properties of all standard functions,
	 * constants and variables.
	 */
	
	var StandardSymbols = function (_HumaneMath$Symbols) {
	  _inherits(StandardSymbols, _HumaneMath$Symbols);
	
	  function StandardSymbols() {
	    _classCallCheck(this, StandardSymbols);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(StandardSymbols).apply(this, arguments));
	  }
	
	  _createClass(StandardSymbols, [{
	    key: 'construct',
	    value: function construct() {
	      this.addTrigonometricFunctions();
	      this.addInverseTrigonometricFunctions();
	      this.addHyperbolicTrigonometricFunctions();
	      this.addInverseHyperbolicTrigonometricFunctions();
	
	      this.addRoundingFunctions();
	      this.addInvolutionFunctions();
	      this.addMiscFunctions();
	      this.addNonMathFunctions();
	
	      this.addConstants();
	      this.addVariables();
	
	      this.addEasterEggs();
	    }
	  }, {
	    key: 'addTrigonometricFunctions',
	    value: function addTrigonometricFunctions() {
	
	      // Sine
	      this.addFunction({
	        'sin': _core.HumaneMath.Dialect.WEST,
	        'sine': _core.HumaneMath.Dialect.WEST_LONG,
	        'син': _core.HumaneMath.Dialect.RUS,
	        'синус': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.sin(params[0]);
	      });
	
	      // Cosine
	      this.addFunction({
	        'cos': _core.HumaneMath.Dialect.WEST,
	        'cosine': _core.HumaneMath.Dialect.WEST_LONG,
	        'кос': _core.HumaneMath.Dialect.RUS,
	        'косинус': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.cos(params[0]);
	      });
	
	      // Tangent
	      this.addFunction({
	        'tan': _core.HumaneMath.Dialect.WEST,
	        'tangent': _core.HumaneMath.Dialect.WEST_LONG,
	        'tg': _core.HumaneMath.Dialect.EAST,
	        'тан': _core.HumaneMath.Dialect.RUS,
	        'тангенс': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.tan(params[0]);
	      });
	
	      // Cotangent
	      this.addFunction({
	        'cot': _core.HumaneMath.Dialect.WEST,
	        'cotangent': _core.HumaneMath.Dialect.WEST_LONG,
	        'ctg': _core.HumaneMath.Dialect.EAST,
	        'ctn': _core.HumaneMath.Dialect.EAST,
	        'котан': _core.HumaneMath.Dialect.RUS,
	        'котангенс': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return 1.0 / Math.tan(params[0]);
	      });
	
	      // Secant
	      this.addFunction({
	        'sec': _core.HumaneMath.Dialect.WEST,
	        'secant': _core.HumaneMath.Dialect.WEST_LONG,
	        'сек': _core.HumaneMath.Dialect.RUS,
	        'секанс': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return 1.0 / Math.cos(params[0]);
	      });
	
	      // Cosecant
	      this.addFunction({
	        'csc': _core.HumaneMath.Dialect.WEST,
	        'cosecant': _core.HumaneMath.Dialect.WEST_LONG,
	        'cosec': _core.HumaneMath.Dialect.EAST,
	        'косек': _core.HumaneMath.Dialect.RUS,
	        'косеканс': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return 1.0 / Math.sin(params[0]);
	      });
	    }
	  }, {
	    key: 'addInverseTrigonometricFunctions',
	    value: function addInverseTrigonometricFunctions() {
	
	      // Arcsine
	      this.addFunction({
	        'arcsin': _core.HumaneMath.Dialect.WEST,
	        'arcsine': _core.HumaneMath.Dialect.WEST_LONG,
	        'asin': _core.HumaneMath.Dialect.PROGRAMMING,
	        'арксин': _core.HumaneMath.Dialect.RUS,
	        'арксинус': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.asin(params[0]);
	      });
	
	      // Arccosine
	      this.addFunction({
	        'arccos': _core.HumaneMath.Dialect.WEST,
	        'arccosine': _core.HumaneMath.Dialect.WEST_LONG,
	        'acos': _core.HumaneMath.Dialect.PROGRAMMING,
	        'арккос': _core.HumaneMath.Dialect.RUS,
	        'арккосинус': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.acos(params[0]);
	      });
	
	      // Arctangent
	      this.addFunction({
	        'arctan': _core.HumaneMath.Dialect.WEST,
	        'arctangent': _core.HumaneMath.Dialect.WEST_LONG,
	        'arctg': _core.HumaneMath.Dialect.EAST,
	        'atan': _core.HumaneMath.Dialect.PROGRAMMING,
	        'арктан': _core.HumaneMath.Dialect.RUS,
	        'арктангенс': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.atan(params[0]);
	      });
	
	      // Arccotangent
	      this.addFunction({
	        'arccot': _core.HumaneMath.Dialect.WEST,
	        'arccotangent': _core.HumaneMath.Dialect.WEST_LONG,
	        'arcctg': _core.HumaneMath.Dialect.EAST,
	        'acot': _core.HumaneMath.Dialect.PROGRAMMING,
	        'арккотан': _core.HumaneMath.Dialect.RUS,
	        'арккотангенс': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return (params[0] < 0 ? Math.PI : 0) + Math.atan(1 / params[0]);
	      });
	
	      // Arcsecant
	      this.addFunction({
	        'arcsec': _core.HumaneMath.Dialect.WEST,
	        'arcsecant': _core.HumaneMath.Dialect.WEST_LONG,
	        'asec': _core.HumaneMath.Dialect.PROGRAMMING,
	        'арксек': _core.HumaneMath.Dialect.RUS,
	        'арксеканс': _core.HumaneMath.Dialect.RUS_LONG
	
	      }, function (params) {
	        return Math.acos(1 / params[0]);
	      });
	
	      // Arccosecant
	      this.addFunction({
	        'arccsc': _core.HumaneMath.Dialect.WEST,
	        'arcsecant': _core.HumaneMath.Dialect.WEST_LONG,
	        'arccosec': _core.HumaneMath.Dialect.EAST,
	        'acosec': _core.HumaneMath.Dialect.PROGRAMMING,
	        'арксек': _core.HumaneMath.Dialect.RUS,
	        'арккосеканс': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.asin(1 / params[0]);
	      });
	    }
	  }, {
	    key: 'addHyperbolicTrigonometricFunctions',
	    value: function addHyperbolicTrigonometricFunctions() {
	
	      // Hyperbolic sine
	      this.addFunction({
	        'sinh': _core.HumaneMath.Dialect.WEST,
	        'sh': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return (Math.exp(params[0]) - Math.exp(-params[0])) / 2.0;
	      });
	
	      // Hyperbolic cosine
	      this.addFunction({
	        'cosh': _core.HumaneMath.Dialect.WEST,
	        'ch': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return (Math.exp(params[0]) + Math.exp(-params[0])) / 2.0;
	      });
	
	      // Hyperbolic tangent
	      this.addFunction({
	        'tanh': _core.HumaneMath.Dialect.WEST,
	        'th': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return (Math.exp(2 * params[0]) - 1.0) / (Math.exp(2 * params[0]) + 1.0);
	      });
	
	      // Hyperbolic cotangent
	      this.addFunction({
	        'coth': _core.HumaneMath.Dialect.WEST,
	        'сth': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return (Math.exp(2 * params[0]) + 1.0) / (Math.exp(2 * params[0]) - 1.0);
	      });
	
	      // Hyperbolic secant
	      this.addFunction({
	        'sech': _core.HumaneMath.Dialect.WEST
	      }, function (params) {
	        return 2.0 / (Math.exp(params[0]) + Math.exp(-params[0]));
	      });
	
	      // Hyperbolic cosecant
	      this.addFunction({
	        'csch': _core.HumaneMath.Dialect.WEST,
	        'cosech': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return 2.0 / (Math.exp(params[0]) - Math.exp(-params[0]));
	      });
	    }
	  }, {
	    key: 'addInverseHyperbolicTrigonometricFunctions',
	    value: function addInverseHyperbolicTrigonometricFunctions() {
	      // Hyperbolic arcsine
	      this.addFunction({
	        'arcsinh': _core.HumaneMath.Dialect.WEST,
	        'arsh': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return Math.log(params[0] + Math.sqrt(params[0] * params[0] + 1));
	      });
	
	      // Hyperbolic arccosine
	      this.addFunction({
	        'arccosh': _core.HumaneMath.Dialect.WEST,
	        'arch': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return params[0] >= 1 ? Math.log(params[0] + Math.sqrt(params[0] * params[0] - 1)) : NaN;
	      });
	
	      // Hyperbolic arctangent
	      this.addFunction({
	        'arctanh': _core.HumaneMath.Dialect.WEST,
	        'arth': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return params[0] < 1 && params[0] > -1 ? Math.log((1 + params[0]) / (1 - params[0])) / 2 : NaN;
	      });
	
	      // Hyperbolic arccotangent
	      this.addFunction({
	        'arccoth': _core.HumaneMath.Dialect.WEST,
	        'arcth': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return params[0] > 1 || params[0] < -1 ? Math.log((params[0] + 1) / params[0] - 1) / 2 : NaN;
	      });
	
	      // Hyperbolic arcsecant
	      this.addFunction({
	        'arcsech': _core.HumaneMath.Dialect.WEST,
	        'arsch': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return params[0] > 0 && params[0] <= 1 ? Math.log((1 + Math.sqrt(1 - params[0] * params[0])) / params[0]) : NaN;
	      });
	
	      // Hyperbolic arccosecant
	      this.addFunction({
	        'arccsch': _core.HumaneMath.Dialect.WEST,
	        'arcsch': _core.HumaneMath.Dialect.EAST
	      }, function (params) {
	        return Math.log(1 / params[0] + Math.sqrt(params[0] * params[0] + 1) / Math.abs(params[0]));
	      });
	    }
	  }, {
	    key: 'addRoundingFunctions',
	    value: function addRoundingFunctions() {
	
	      this.addFunction({
	        'round': _core.HumaneMath.Dialect.WEST
	      }, function (params) {
	        return Math.round(params[0]);
	      });
	
	      this.addFunction({
	        'floor': _core.HumaneMath.Dialect.WEST
	      }, function (params) {
	        return Math.floor(params[0]);
	      });
	
	      this.addFunction({
	        'ceil': _core.HumaneMath.Dialect.WEST,
	        'ceiling': _core.HumaneMath.Dialect.WEST_LONG
	      }, function (params) {
	        return Math.ceil(params[0]);
	      });
	
	      this.addFunction({
	        'frac': _core.HumaneMath.Dialect.WEST,
	        'fractional': _core.HumaneMath.Dialect.WEST_LONG,
	        'fract': _core.HumaneMath.Dialect.MISC
	      }, function (params) {
	        return params[0] - Math.floor(params[0]);
	      });
	    }
	  }, {
	    key: 'addInvolutionFunctions',
	    value: function addInvolutionFunctions() {
	
	      // Power
	      this.addFunction({
	        'pow': _core.HumaneMath.Dialect.WEST,
	        'power': _core.HumaneMath.Dialect.WEST_LONG,
	        'степень': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.pow(params[0], params[1]);
	      }, 2);
	
	      // Argument to the power 2
	      this.addFunction({
	        'sqr': _core.HumaneMath.Dialect.WEST,
	        'квадрат': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.pow(params[0], 2);
	      });
	
	      // Square root
	      this.addFunction({
	        'sqrt': _core.HumaneMath.Dialect.WEST,
	        'кк': _core.HumaneMath.Dialect.RUS
	      }, function (params) {
	        return Math.sqrt(params[0]);
	      });
	
	      // Cubic root
	      this.addFunction({
	        'cbrt': _core.HumaneMath.Dialect.WEST
	        /*'кубкорень': HumaneMath.Dialect.RUS_LONG*/
	      }, function (params) {
	        return params[0] >= 0 ? Math.pow(params[0], 1 / 3) : -Math.pow(-params[0], 1 / 3);
	      });
	
	      // Root
	      this.addFunction({
	        'root': _core.HumaneMath.Dialect.WEST,
	        'корень': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        if (Math.floor(params[0]) != params[0] || params[0] < 1) {
	          return NaN;
	        }
	        return params[1] >= 0 ? Math.pow(params[1], 1 / params[0]) : Math.floor(params[0] / 2) == params[0] / 2 ? NaN : -Math.pow(-params[1], 1 / params[0]);
	      });
	
	      // E power argument
	      this.addFunction({
	        'exp': _core.HumaneMath.Dialect.WEST
	      }, function (params) {
	        return Math.exp(params);
	      });
	
	      // Logarithm
	      this.addFunction({
	        'log': _core.HumaneMath.Dialect.WEST,
	        'лог': _core.HumaneMath.Dialect.RUS,
	        'логарифм': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.log(params[1]) / Math.log(params[0]);
	      }, 2);
	
	      // Natural logarithm
	      this.addFunction({
	        'ln': _core.HumaneMath.Dialect.WEST
	      }, function (params) {
	        return Math.log(params[0]);
	      });
	
	      // Common logarithm
	      this.addFunction({
	        'lg': _core.HumaneMath.Dialect.WEST
	      }, function (params) {
	        return Math.log(params[0]) / Math.LN10;
	      });
	    }
	  }, {
	    key: 'addMiscFunctions',
	    value: function addMiscFunctions() {
	      // Abs
	      this.addFunction({
	        'abs': _core.HumaneMath.Dialect.WEST,
	        'modulus': _core.HumaneMath.Dialect.MISC,
	        'модуль': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        return Math.abs(params[0]);
	      });
	
	      // Random number from 0 to 1. Calculated every time (no caching)
	      this.addFunction({
	        'random': _core.HumaneMath.Dialect.WEST
	      }, function () {
	        return Math.random();
	      }, 0, true);
	
	      // Random number from 0 to 1. Calculated once
	      this.addFunction({
	        'random2': _core.HumaneMath.Dialect.WEST
	      }, function () {
	        return Math.random();
	      }, 0);
	
	      // Sign of the argument
	      this.addFunction({
	        'sgn': _core.HumaneMath.Dialect.WEST,
	        'sign': _core.HumaneMath.Dialect.WEST_LONG
	      }, function (params) {
	        if (isNaN(params[0])) {
	          return NaN;
	        }
	        return params[0] == 0 ? 0 : params[0] > 0 ? 1 : -1;
	      });
	    }
	  }, {
	    key: 'addNonMathFunctions',
	    value: function addNonMathFunctions() {
	
	      // Maximum value
	      this.addFunction({
	        'max': _core.HumaneMath.Dialect.WEST,
	        'maximum': _core.HumaneMath.Dialect.WEST_LONG,
	        'макс': _core.HumaneMath.Dialect.RUS,
	        'максимум': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        var result = params[0];
	        for (var i = 1; i < params.length; i++) {
	          result = Math.max(result, params[i]);
	        }
	        return result;
	      }, [2]);
	
	      // Minimum value
	      this.addFunction({
	        'min': _core.HumaneMath.Dialect.WEST,
	        'minimum': _core.HumaneMath.Dialect.WEST_LONG,
	        'мин': _core.HumaneMath.Dialect.RUS,
	        'минимум': _core.HumaneMath.Dialect.RUS_LONG
	      }, function (params) {
	        var result = params[0];
	        for (var i = 1; i < params.length; i++) {
	          result = Math.min(result, params[i]);
	        }
	        return result;
	      }, [2]);
	
	      // Condition
	      this.addFunction({
	        'if': _core.HumaneMath.Dialect.WEST,
	        'если': _core.HumaneMath.Dialect.RUS
	      }, function (params) {
	        return params[0] > 0 ? params[1] : params[2];
	      }, [2], false, true);
	    }
	  }, {
	    key: 'addConstants',
	    value: function addConstants() {
	
	      // Constant equal to a circle's circumference divided by its diameter
	      this.addConstant({
	        'pi': _core.HumaneMath.Dialect.WEST,
	        'π': _core.HumaneMath.Dialect.GREEK,
	        'пи': _core.HumaneMath.Dialect.RUS
	      }, Math.PI);
	
	      // Euler's number
	      this.addConstant({
	        'e': _core.HumaneMath.Dialect.WEST,
	        'е': _core.HumaneMath.Dialect.RUS
	      }, Math.E);
	
	      // The golden ratio
	      this.addConstant({
	        'phi': _core.HumaneMath.Dialect.WEST,
	        'ph': _core.HumaneMath.Dialect.MISC,
	        'φ': _core.HumaneMath.Dialect.GREEK,
	        'фи': _core.HumaneMath.Dialect.RUS
	      }, 1.6180339887);
	    }
	
	    /**
	     * Loads standard variables Variables are implemented just for keeping aliases
	     */
	
	  }, {
	    key: 'addVariables',
	    value: function addVariables() {
	
	      this.addVariable('x', {
	        'х': _core.HumaneMath.Dialect.RUS
	      });
	
	      this.addVariable('y', {
	        'у': _core.HumaneMath.Dialect.RUS
	      });
	
	      this.addVariable('t', {});
	
	      this.addVariable('a', {
	        'а': _core.HumaneMath.Dialect.RUS
	      });
	    }
	  }, {
	    key: 'addEasterEggs',
	    value: function addEasterEggs() {
	      // Easter eggs
	
	      // 42 — See
	      // http://en.wikipedia.org/wiki/Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything
	      this.addConstant({
	        'answer_to_the_ultimate_question_of_life_the_universe_and_everything': _core.HumaneMath.Dialect.WEST,
	        'ответ_на_главный_вопрос_жизни_вселенной_и_всего_такого': _core.HumaneMath.Dialect.RUS
	      }, 42);
	    }
	  }]);
	
	  return StandardSymbols;
	}(_core.HumaneMath.Symbols);
	
	_core.HumaneMath.StandardSymbols = StandardSymbols;
	_core.HumaneMath.symbols.STANDARD = new StandardSymbols();

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _tokenNames, _messages;
	
	var _core = __webpack_require__(1);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	_core.HumaneMath.addLocale('en', {
	  tokenNames: (_tokenNames = {}, _defineProperty(_tokenNames, _core.HumaneMath.TokenType.RB_LEFT, 'a left bracket'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.RB_RIGHT, 'a right bracket'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.COMMA, 'a comma'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.EQUAL, 'an equality sign'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.LESS, 'a “less than” sign'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.MORE, 'a “more than” sign'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.LESS_EQUAL, 'a “less than or equal” sign'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.MORE_EQUAL, 'a “more than or equal” sign'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.ADD, 'an addition sign'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.SUBTRACT, 'a subtraction sign'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.MULTIPLY, 'a multiplication sign'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.DIVIDE, 'a division sign'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.POWER, 'an exponentiation sign'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.NUMBER, 'a number'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.SYMBOL, 'a name of a variable or a function'), _defineProperty(_tokenNames, _core.HumaneMath.TokenType.SEMICOLON, 'a semicolon'), _tokenNames),
	  messages: (_messages = {}, _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_UNKNOWN, function (token) {
	    return 'You cannot use symbol __' + token.raw + '__ in formulas.';
	  }), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_NUMBER_MALFORMED, 'Malformed number. A number can contain only one dot and the dot must be surrounded with digits, e.g. _“3.14”_.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_NUMBER_EXPONENTIAL, 'It is not allowed to use an exponential form for numbers. Please, reformat it.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_VERTICAL_SLASH, 'It is not allowed to use vertical slash in formulas. To calculate absolute values, please use function _abs(argument)_.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_STARSTAR, 'It is not allowed to use __“**”__. To exponentiate a number, use _caret sign (“^”)_ or function _power(base, exponent)_.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_EQUALEQUAL, 'It is not allowed to use __“==”__. Use a _single_ equality sign for comparison and assignments.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_MISPLACED_DOT, 'The dot can be used only to separate digits in real numbers. For multiplication use _star sign (“*”)_.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_SB_LEFT, 'Square brackets can not be used. Use a left round bracket instead.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_SB_RIGHT, 'Square brackets can not be used. Use a right round bracket instead.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_CB_LEFT, 'Curly brackets can not be used. Use a left round bracket instead.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_CB_RIGHT, 'Curly brackets can not be used. Use a right round bracket instead.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_AB_LEFT, 'Angle brackets can not be used. Use a left round bracket instead.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_AB_RIGHT, 'Angle brackets can not be used. Use a right round bracket instead.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_BACK_SLASH, 'Use of backslash is not allowed. To divide use _forward slash (“/”)_.'), _defineProperty(_messages, 'e_lex_' + _core.HumaneMath.TokenType.E_REST, 'The input string is too long and it can’t be read completely.'), _defineProperty(_messages, 'e_syn_unknown', 'Unknown syntax error detected.'), _defineProperty(_messages, 'e_syn_function_argument_empty', 'Function argument must not be empty.'), _defineProperty(_messages, 'e_syn_function_argument_wrong_symbol', function e_syn_function_argument_wrong_symbol(params) {
	    return 'It is not allowed to use ' + undefined.tokenNames[params.currentToken.type] + ' in a function argument.';
	  }), _defineProperty(_messages, 'e_syn_function_argument_semicolon', 'It is not allowed to use a semicolon to separate function arguments. Use a comma instead.'), _defineProperty(_messages, 'e_syn_missing_rb', 'Missing right bracket.'), _defineProperty(_messages, 'e_syn_missing_multiply', function e_syn_missing_multiply(params) {
	    return 'It is not allowed to write ' + undefined.tokenNames[params.currentToken.type] + ' right after ' + undefined.tokenNames[params.previousToken.type] + ' Multiplication sign or any other mathematical operation is probably missing.';
	  }), _defineProperty(_messages, 'e_syn_missing_operand', function e_syn_missing_operand(params) {
	    return 'An operand (number, constant, function, etc.) is missing between ' + params.previousToken.raw + ' and ' + params.currentToken.raw + '”.';
	  }), _defineProperty(_messages, 'e_syn_missing_operand_at_begin', function e_syn_missing_operand_at_begin(params) {
	    return 'An operand must go before ' + undefined.tokenNames[params.currentToken.type] + '.';
	  }), _defineProperty(_messages, 'e_syn_missing_operand_at_end', function e_syn_missing_operand_at_end(params) {
	    return 'Mathematical operator (' + undefined.tokenNames[params.currentToken.type] + ') must be followed by an operand (number, constant, function, etc.).';
	  }), _defineProperty(_messages, 'e_syn_extra_rb', 'An extra right bracket found.'), _defineProperty(_messages, 'e_syn_brackets_empty', 'Empty brackets are allowed only for function calls with no arguments.'), _defineProperty(_messages, 'e_syn_brackets_wrong_symbol', function e_syn_brackets_wrong_symbol(params) {
	    return 'It is not allowed to use ' + undefined.tokenNames[params.currentToken.type] + ' inside of an expression in brackets.';
	  }), _defineProperty(_messages, 'e_syn_statements_wrong_symbol', function e_syn_statements_wrong_symbol(params) {
	    return 'It is not allowed to use ' + undefined.tokenNames[params.currentToken.type] + ' here.';
	  }), _defineProperty(_messages, 'e_syn_statements_comma', 'It is not allowed to use a comma here as it is acceptable only in function arguments. To separate statements use semicolons.'), _defineProperty(_messages, 'e_syn_statement_empty_left', function e_syn_statement_empty_left(params) {
	    return 'An expression expected before ' + undefined.tokenNames[params.currentToken.type] + '.';
	  }), _defineProperty(_messages, 'e_syn_statement_empty_right', function e_syn_statement_empty_right(params) {
	    return 'An expression expected after ' + undefined.tokenNames[params.currentToken.type] + '.';
	  }), _defineProperty(_messages, 'e_syn_statement_extra_statement_sign', function e_syn_statement_extra_statement_sign(params) {
	    return 'It is not allowed to use ' + undefined.tokenNames[params.currentToken.type] + ' here. A statement has already got ' + undefined.tokenNames[params.statementSign.type] + '.';
	  }), _defineProperty(_messages, 'e_sem_constant_forbidden_all', 'It is not allowed to use constants in this input field.'), _defineProperty(_messages, 'e_sem_constant_forbidden_this', function e_sem_constant_forbidden_this(params) {
	    return 'It is not allowed to use constant __' + params.name + '__ in this input field.';
	  }), _defineProperty(_messages, 'e_sem_constant_as_function', function e_sem_constant_as_function(params) {
	    return 'You are trying to use a constant __' + params.name + '__ as a function. Remove following brackets or add a mathematical operation after the constant.';
	  }), _defineProperty(_messages, 'e_sem_variable_forbidden_all', 'It is not allowed to use variables in this input field.'), _defineProperty(_messages, 'e_sem_variable_forbidden_this', function e_sem_variable_forbidden_this(params) {
	    return 'It is not allowed to use variable __' + params.name + '__ in this input field.';
	  }), _defineProperty(_messages, 'e_sem_variable_as_function', function e_sem_variable_as_function(params) {
	    return 'You are trying to use a variable __' + params.name + '__ as a function. Remove following brackets or add a mathematical operation after the variable.';
	  }), _defineProperty(_messages, 'e_sem_function_forbidden_all', 'It is not allowed to use functions in this input field.'), _defineProperty(_messages, 'e_sem_function_forbidden_this', function e_sem_function_forbidden_this(params) {
	    return 'It is not allowed to use function __' + params.name + '__ in this input field.';
	  }), _defineProperty(_messages, 'e_sem_function_as_symbol', function e_sem_function_as_symbol(params) {
	    return 'You are trying to use function __' + params.name + '__ without brackets. Put the brackets after a function name.';
	  }), _defineProperty(_messages, 'e_sem_function_arguments_few_exact', 'Function __${params.name}__ has too few arguments (${params.argumentCount} expected, but found ${params.realArgumentCount}).'), _defineProperty(_messages, 'e_sem_function_arguments_extra_exact', function e_sem_function_arguments_extra_exact(params) {
	    return 'Function __' + params.name + '__ has too many arguments (' + params.argumentCount + ' expected, but found ' + params.realArgumentCount + ').';
	  }), _defineProperty(_messages, 'e_sem_function_arguments_extra_0', function e_sem_function_arguments_extra_0(params) {
	    return 'Function __' + params.name + '__ has does not need any arguments, remove them all.';
	  }), _defineProperty(_messages, 'e_sem_function_arguments_few_range_n_inf', function e_sem_function_arguments_few_range_n_inf(params) {
	    return 'Function __' + params.name + '__ has too few arguments (more than ' + params.argumentCount.min + ' expected, but found ' + params.realArgumentCount + ').';
	  }), _defineProperty(_messages, 'e_sem_function_arguments_few_range_n_n', function e_sem_function_arguments_few_range_n_n(params) {
	    return 'Function __' + params.name + '__ has too few arguments (from ' + params.argumentCount.min + ' to ' + params.argumentCount.max + ' expected, but found ' + params.realArgumentCount + ').';
	  }), _defineProperty(_messages, 'e_sem_function_arguments_extra_range_n_n', function e_sem_function_arguments_extra_range_n_n(params) {
	    return 'Function __' + params.name + '__ has too many arguments (from ' + params.argumentCount.min + ' to ' + params.argumentCount.max + ' expected, but found ' + params.realArgumentCount + ').';
	  }), _defineProperty(_messages, 'e_sem_unknown_symbol', function e_sem_unknown_symbol(params) {
	    return 'Constant or variable __' + params.name + '__ is unknown.';
	  }), _defineProperty(_messages, 'e_sem_unknown_function', function e_sem_unknown_function(params) {
	    return 'Function with name __' + params.name + '__ is unknown.';
	  }), _defineProperty(_messages, 'e_sem_forbidden_equation', 'It is not allowed to use equations in this input field.'), _defineProperty(_messages, 'e_sem_forbidden_inequality', 'It is not allowed to use inequalities in this input field.'), _defineProperty(_messages, 'e_sem_forbidden_semicolon', 'It is not allowed to use a semicolon in this input field.'), _defineProperty(_messages, 'e_sem_forbidden_sequence_of_statements', 'Semicolons can be used only to separate statements and it is not allowed to use more than one statement in this input field.'), _defineProperty(_messages, 'e_sem_forbidden_empty', 'The field must not be empty.'), _defineProperty(_messages, 'e_sem_expected_finite', 'The value of the field must be finite.'), _defineProperty(_messages, 'e_sem_expected_int', function e_sem_expected_int(params) {
	    return 'The value of the field must be integer, but is equal to ' + params.value + '.';
	  }), _defineProperty(_messages, 'e_sem_expected_range', function e_sem_expected_range(params) {
	    return 'The value of the field is supposed to be in the range between ' + params.range.min + ' and ' + params.range.max + ', but is equal to ' + params.value + '.';
	  }), _defineProperty(_messages, 'e_sem_expected_gt', function e_sem_expected_gt(params) {
	    return 'The value of the field is supposed to be greater than ' + params.bound + ', but is equal to ' + params.value + '.';
	  }), _defineProperty(_messages, 'e_sem_expected_lt', function e_sem_expected_lt(params) {
	    return 'The value of the field is supposed to be less than ' + params.bound + ', but is equal to ' + params.value + '.';
	  }), _messages)
	});
	
	_core.HumaneMath.setLocale('en');

/***/ }
/******/ ])
});
;
//# sourceMappingURL=humane-math.js.map