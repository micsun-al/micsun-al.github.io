webpackJsonp([0],[
/* 0 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 18);
var hide = __webpack_require__(/*! ./_hide */ 11);
var redefine = __webpack_require__(/*! ./_redefine */ 12);
var ctx = __webpack_require__(/*! ./_ctx */ 19);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 49)('wks');
var uid = __webpack_require__(/*! ./_uid */ 33);
var Symbol = __webpack_require__(/*! ./_global */ 2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 7 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 97);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 24);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
module.exports = __webpack_require__(/*! ./_descriptors */ 7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 12 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 11);
var has = __webpack_require__(/*! ./_has */ 14);
var SRC = __webpack_require__(/*! ./_uid */ 33)('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ 141);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 18).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 13 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 24);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 14 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 50);
var defined = __webpack_require__(/*! ./_defined */ 24);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 51);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var has = __webpack_require__(/*! ./_has */ 14);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 97);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 14);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 70)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 19 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 20 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 21 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 22 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ 3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 23 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 24 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 25 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 18);
var fails = __webpack_require__(/*! ./_fails */ 3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ 19);
var IObject = __webpack_require__(/*! ./_iobject */ 50);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var asc = __webpack_require__(/*! ./_array-species-create */ 86);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-array.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ./_descriptors */ 7)) {
  var LIBRARY = __webpack_require__(/*! ./_library */ 29);
  var global = __webpack_require__(/*! ./_global */ 2);
  var fails = __webpack_require__(/*! ./_fails */ 3);
  var $export = __webpack_require__(/*! ./_export */ 0);
  var $typed = __webpack_require__(/*! ./_typed */ 64);
  var $buffer = __webpack_require__(/*! ./_typed-buffer */ 94);
  var ctx = __webpack_require__(/*! ./_ctx */ 19);
  var anInstance = __webpack_require__(/*! ./_an-instance */ 39);
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ 32);
  var hide = __webpack_require__(/*! ./_hide */ 11);
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ 41);
  var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
  var toLength = __webpack_require__(/*! ./_to-length */ 6);
  var toIndex = __webpack_require__(/*! ./_to-index */ 125);
  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 35);
  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
  var has = __webpack_require__(/*! ./_has */ 14);
  var classof = __webpack_require__(/*! ./_classof */ 45);
  var isObject = __webpack_require__(/*! ./_is-object */ 4);
  var toObject = __webpack_require__(/*! ./_to-object */ 9);
  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
  var create = __webpack_require__(/*! ./_object-create */ 36);
  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
  var gOPN = __webpack_require__(/*! ./_object-gopn */ 37).f;
  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);
  var uid = __webpack_require__(/*! ./_uid */ 33);
  var wks = __webpack_require__(/*! ./_wks */ 5);
  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 26);
  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 54);
  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 53);
  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ 88);
  var Iterators = __webpack_require__(/*! ./_iterators */ 47);
  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 59);
  var setSpecies = __webpack_require__(/*! ./_set-species */ 38);
  var arrayFill = __webpack_require__(/*! ./_array-fill */ 87);
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ 114);
  var $DP = __webpack_require__(/*! ./_object-dp */ 8);
  var $GOPD = __webpack_require__(/*! ./_object-gopd */ 16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 28 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ 120);
var $export = __webpack_require__(/*! ./_export */ 0);
var shared = __webpack_require__(/*! ./_shared */ 49)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 123))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 29 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 30 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 33)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var has = __webpack_require__(/*! ./_has */ 14);
var setDesc = __webpack_require__(/*! ./_object-dp */ 8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 31 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ 11)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 32 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 33 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 34 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 99);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 71);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 35 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 36 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var dPs = __webpack_require__(/*! ./_object-dps */ 100);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 71);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 70)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 68)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 72).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 99);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 71).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 39 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 40 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 19);
var call = __webpack_require__(/*! ./_iter-call */ 112);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 41 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 12);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 42 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 43 */,
/* 44 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 8).f;
var has = __webpack_require__(/*! ./_has */ 14);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 45 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 20);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 46 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 24);
var fails = __webpack_require__(/*! ./_fails */ 3);
var spaces = __webpack_require__(/*! ./_string-ws */ 74);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 47 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 48 */
/*!**************************************************!*\
  !*** ./src/scripts/components/AvatarTracking.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EVENT_CLICK_BUTTON_MUTE = exports.EVENT_CLICK_BUTTON_MUTE = "click_button_mute";
var EVENT_CLICK_BUTTON_UNMUTE = exports.EVENT_CLICK_BUTTON_UNMUTE = "click_button_unmute";
var EVENT_CLICK_BUTTON_INTRO_PLAY_NOW = exports.EVENT_CLICK_BUTTON_INTRO_PLAY_NOW = "click_button_intro_play_now";
var EVENT_CLICK_BUTTON_INSTRUCTIONS_GOT_IT = exports.EVENT_CLICK_BUTTON_INSTRUCTIONS_GOT_IT = "click_button_instructions_got_it";
var EVENT_GAME_COMPLETED = exports.EVENT_GAME_COMPLETED = "game_completed";
var EVENT_CLICK_BUTTON_SUMMARY_PLAY_AGAIN = exports.EVENT_CLICK_BUTTON_SUMMARY_PLAY_AGAIN = "click_button_summmary_play_again";
var DATA_EVENT = exports.DATA_EVENT = "event";
var DATA_STATE = exports.DATA_STATE = "state";
var DATA_SCORE = exports.DATA_SCORE = "score";
var DATA_MULTIPLIER = exports.DATA_MULTIPLIER = "multiplier";
var DATA_COUNT_MATCH_3 = exports.DATA_COUNT_MATCH_3 = "countMatch3";
var DATA_COUNT_MATCH_4 = exports.DATA_COUNT_MATCH_4 = "countMatch4";
var DATA_COUNT_MATCH_5 = exports.DATA_COUNT_MATCH_5 = "countMatch5";
var DATA_REPLAY_COUNT = exports.DATA_REPLAY_COUNT = "replayCount";

var AvatarTracking = function () {
  function AvatarTracking() {
    _classCallCheck(this, AvatarTracking);
  }

  _createClass(AvatarTracking, [{
    key: "sendEvent",

    // GTM code is pasted in to src/index.html

    value: function sendEvent(eventName) {
      // console.log(`AvatarTracking.js: sendEvent: eventName:`, eventName)
      window.dataLayer.push({ event: eventName });
    }
  }, {
    key: "sendData",
    value: function sendData(event, data) {
      // console.log(`AvatarTracking.js: sendData: event:`, event, `, data:`, data)
      var trackingData = { event: event };

      if (typeof data !== 'undefined' && Array.isArray(data)) {
        if (data.length > 0 && Array.isArray(data[0])) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var d = _step.value;

              trackingData[d[0]] = d[1];
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } else if (data) {
          trackingData[data[0]] = data[1];
        }
      }

      window.dataLayer.push(trackingData);
    }
  }]);

  return AvatarTracking;
}();

exports.default = AvatarTracking;

/***/ }),
/* 49 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ 18);
var global = __webpack_require__(/*! ./_global */ 2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ 29) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 50 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 20);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 51 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 52 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 53 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 54 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 35);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 55 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 56 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 20);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 57 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
var defined = __webpack_require__(/*! ./_defined */ 24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 58 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var cof = __webpack_require__(/*! ./_cof */ 20);
var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 59 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 60 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_regexp-exec-abstract.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(/*! ./_classof */ 45);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),
/* 61 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.exec */ 116);
var redefine = __webpack_require__(/*! ./_redefine */ 12);
var hide = __webpack_require__(/*! ./_hide */ 11);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 24);
var wks = __webpack_require__(/*! ./_wks */ 5);
var regexpExec = __webpack_require__(/*! ./_regexp-exec */ 89);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 62 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_user-agent.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 63 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 12);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 41);
var meta = __webpack_require__(/*! ./_meta */ 30);
var forOf = __webpack_require__(/*! ./_for-of */ 40);
var anInstance = __webpack_require__(/*! ./_an-instance */ 39);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 59);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 44);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 75);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 64 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_typed.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 11);
var uid = __webpack_require__(/*! ./_uid */ 33);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 65 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-forced-pam.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 29) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ 2)[K];
});


/***/ }),
/* 66 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 67 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-from.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var ctx = __webpack_require__(/*! ./_ctx */ 19);
var forOf = __webpack_require__(/*! ./_for-of */ 40);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 68 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var document = __webpack_require__(/*! ./_global */ 2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 69 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 18);
var LIBRARY = __webpack_require__(/*! ./_library */ 29);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 98);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 70 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 49)('keys');
var uid = __webpack_require__(/*! ./_uid */ 33);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 71 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 72 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 73 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ 19)(Function.call, __webpack_require__(/*! ./_object-gopd */ 16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 74 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 75 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 73).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 76 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
var defined = __webpack_require__(/*! ./_defined */ 24);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 77 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 78 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 79 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 29);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 12);
var hide = __webpack_require__(/*! ./_hide */ 11);
var Iterators = __webpack_require__(/*! ./_iterators */ 47);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 80);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 44);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 80 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 36);
var descriptor = __webpack_require__(/*! ./_property-desc */ 32);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 44);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 11)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 81 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 58);
var defined = __webpack_require__(/*! ./_defined */ 24);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 82 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 83 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ 47);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 84 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 85 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 45);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 47);
module.exports = __webpack_require__(/*! ./_core */ 18).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 86 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 230);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 87 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 35);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 88 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 31);
var step = __webpack_require__(/*! ./_iter-step */ 115);
var Iterators = __webpack_require__(/*! ./_iterators */ 47);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 79)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 89 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_regexp-exec.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(/*! ./_flags */ 52);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 90 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_advance-string-index.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(/*! ./_string-at */ 57)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),
/* 91 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_task.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 19);
var invoke = __webpack_require__(/*! ./_invoke */ 105);
var html = __webpack_require__(/*! ./_html */ 72);
var cel = __webpack_require__(/*! ./_dom-create */ 68);
var global = __webpack_require__(/*! ./_global */ 2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ 20)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 92 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_microtask.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var macrotask = __webpack_require__(/*! ./_task */ 91).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ 20)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 93 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/_new-promise-capability.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ 10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 94 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-buffer.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var LIBRARY = __webpack_require__(/*! ./_library */ 29);
var $typed = __webpack_require__(/*! ./_typed */ 64);
var hide = __webpack_require__(/*! ./_hide */ 11);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 41);
var fails = __webpack_require__(/*! ./_fails */ 3);
var anInstance = __webpack_require__(/*! ./_an-instance */ 39);
var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var toIndex = __webpack_require__(/*! ./_to-index */ 125);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 37).f;
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var arrayFill = __webpack_require__(/*! ./_array-fill */ 87);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 44);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 95 */
/*!************************************************************!*\
  !*** ./src/scripts/states/shared/legal/LegalOpenButton.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LegalDialog = __webpack_require__(/*! ./LegalDialog */ 357);

var _LegalDialog2 = _interopRequireDefault(_LegalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Button) {
    _inherits(_class, _Phaser$Button);

    function _class(game) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, 73, 1897, 'legal/btn_legal'));

        _this.onInputUp.add(_this.handleLegalOpenClick, _this);
        _this.anchor.set(0.305, 0.74);
        game.add.tween(_this).from({ alpha: 0, y: '+30' }, Phaser.Timer.SECOND * 2, Phaser.Easing.Quintic.Out, true, Phaser.Timer.SECOND);
        game.utils.addOverScaling(_this, 1.05);
        game.add.existing(_this);
        _this.legalDialog = null;
        return _this;
    }

    _createClass(_class, [{
        key: 'handleLegalOpenClick',
        value: function handleLegalOpenClick(e, pointer, releasedOnButton) {
            if (!releasedOnButton || this.legalDialog && this.legalDialog.isOpen) {
                return;
            }
            // this.legalDialog = new LegalDialog(game, this.closedCallback)
            document.querySelector('.modal-legal-container').classList.add('show');
        }
    }, {
        key: 'closedCallback',
        value: function closedCallback() {
            this.legalDialog = null;
        }
    }]);

    return _class;
}(Phaser.Button);

exports.default = _class;

/***/ }),
/* 96 */
/*!************************************************************!*\
  !*** ./src/scripts/states/shared/legal/LegalFooterText.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
  _inherits(_class, _Phaser$Group);

  function _class(game) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    var sprite = _this.add(game.make.sprite(game.world.centerX, game.world.height, 'legal/footer_text'));
    game.utils.anchorAll([sprite]);
    sprite.anchor.set(0.5, 1);
    game.add.tween(sprite).from({ alpha: 0 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Quadratic.Out, true);
    game.add.tween(sprite).from({ y: "+100" }, Phaser.Timer.SECOND * 3, Phaser.Easing.Quintic.Out, true);
    game.add.existing(_this);
    return _this;
  }

  return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 97 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 7) && !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 68)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 98 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 5);


/***/ }),
/* 99 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 14);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 54)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 70)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 100 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getKeys = __webpack_require__(/*! ./_object-keys */ 34);

module.exports = __webpack_require__(/*! ./_descriptors */ 7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 101 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 102 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ 34);
var gOPS = __webpack_require__(/*! ./_object-gops */ 55);
var pIE = __webpack_require__(/*! ./_object-pie */ 51);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 50);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 103 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 104 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var invoke = __webpack_require__(/*! ./_invoke */ 105);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 105 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 106 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 2).parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ 46).trim;
var ws = __webpack_require__(/*! ./_string-ws */ 74);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 107 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 2).parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ 46).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 74) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 108 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 20);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 109 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 110 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 111 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ 77);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 112 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 113 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 50);
var toLength = __webpack_require__(/*! ./_to-length */ 6);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 114 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 35);
var toLength = __webpack_require__(/*! ./_to-length */ 6);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 115 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 116 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.exec.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(/*! ./_regexp-exec */ 89);
__webpack_require__(/*! ./_export */ 0)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),
/* 117 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ 7) && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ 8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 52)
});


/***/ }),
/* 118 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_perform.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 119 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_promise-resolve.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 93);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 120 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 121);
var validate = __webpack_require__(/*! ./_validate-collection */ 42);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 63)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 121 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var create = __webpack_require__(/*! ./_object-create */ 36);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 41);
var ctx = __webpack_require__(/*! ./_ctx */ 19);
var anInstance = __webpack_require__(/*! ./_an-instance */ 39);
var forOf = __webpack_require__(/*! ./_for-of */ 40);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 79);
var step = __webpack_require__(/*! ./_iter-step */ 115);
var setSpecies = __webpack_require__(/*! ./_set-species */ 38);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var fastKey = __webpack_require__(/*! ./_meta */ 30).fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ 42);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 122 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 121);
var validate = __webpack_require__(/*! ./_validate-collection */ 42);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 63)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 123 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var each = __webpack_require__(/*! ./_array-methods */ 26)(0);
var redefine = __webpack_require__(/*! ./_redefine */ 12);
var meta = __webpack_require__(/*! ./_meta */ 30);
var assign = __webpack_require__(/*! ./_object-assign */ 102);
var weak = __webpack_require__(/*! ./_collection-weak */ 124);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var validate = __webpack_require__(/*! ./_validate-collection */ 42);
var NATIVE_WEAK_MAP = __webpack_require__(/*! ./_validate-collection */ 42);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 63)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 124 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ 41);
var getWeak = __webpack_require__(/*! ./_meta */ 30).getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anInstance = __webpack_require__(/*! ./_an-instance */ 39);
var forOf = __webpack_require__(/*! ./_for-of */ 40);
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 26);
var $has = __webpack_require__(/*! ./_has */ 14);
var validate = __webpack_require__(/*! ./_validate-collection */ 42);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 125 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_to-index.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 126 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ 37);
var gOPS = __webpack_require__(/*! ./_object-gops */ 55);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Reflect = __webpack_require__(/*! ./_global */ 2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 127 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_flatten-into-array.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(/*! ./_is-array */ 56);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var ctx = __webpack_require__(/*! ./_ctx */ 19);
var IS_CONCAT_SPREADABLE = __webpack_require__(/*! ./_wks */ 5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 128 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-pad.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var repeat = __webpack_require__(/*! ./_string-repeat */ 76);
var defined = __webpack_require__(/*! ./_defined */ 24);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 129 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ 34);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var isEnum = __webpack_require__(/*! ./_object-pie */ 51).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 130 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 45);
var from = __webpack_require__(/*! ./_array-from-iterable */ 131);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 131 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 40);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 132 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-scale.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */
/*!************************************************************!*\
  !*** ./src/scripts/states/game/board/GameLineExplosion.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(board, index, isVertical) {
  _classCallCheck(this, _class);

  var explosion = board.playArea.add(game.make.sprite(isVertical ? index * board.tileSize - board.halfPlayAreaWidth + board.tileSize * 0.5 : 0, isVertical ? 0 : index * board.tileSize - board.halfPlayAreaHeight + board.tileSize * 0.5, game.data.sheet.spritesheet, 'game/match_4'));

  explosion.blendMode = Phaser.blendModes.ADD;
  explosion.anchor.set(0.5);
  explosion.scale.set(2);

  if (isVertical) {
    explosion.angle = 90;
  }

  game.add.tween(explosion.scale).to({ x: isVertical ? 2.4 : 1.9, y: 2.2 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Quintic.Out, true);
  game.add.tween(explosion).from({ alpha: 0 }, 250, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
    game.add.tween(explosion).to({ alpha: 0 }, 250, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function () {
      explosion.destroy();
      explosion = null;
    });
  });
  game.add.tween(explosion.scale).to({ x: 3.5, y: 3.5 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Quintic.Out, true);
};

exports.default = _class;

/***/ }),
/* 137 */
/*!**************************************************!*\
  !*** multi babel-polyfill ./src/scripts/main.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */138);
module.exports = __webpack_require__(/*! /Volumes/a1094-HDD/GitHub/paramount/dora-the-explorer/app/src/scripts/main.js */340);


/***/ }),
/* 138 */
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 139);

__webpack_require__(/*! regenerator-runtime/runtime */ 336);

__webpack_require__(/*! core-js/fn/regexp/escape */ 337);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 43)))

/***/ }),
/* 139 */
/*!**************************************!*\
  !*** ./node_modules/core-js/shim.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 140);
__webpack_require__(/*! ./modules/es6.object.create */ 143);
__webpack_require__(/*! ./modules/es6.object.define-property */ 144);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 145);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 146);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 147);
__webpack_require__(/*! ./modules/es6.object.keys */ 148);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 149);
__webpack_require__(/*! ./modules/es6.object.freeze */ 150);
__webpack_require__(/*! ./modules/es6.object.seal */ 151);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 152);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 153);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 154);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 155);
__webpack_require__(/*! ./modules/es6.object.assign */ 156);
__webpack_require__(/*! ./modules/es6.object.is */ 157);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 158);
__webpack_require__(/*! ./modules/es6.object.to-string */ 159);
__webpack_require__(/*! ./modules/es6.function.bind */ 160);
__webpack_require__(/*! ./modules/es6.function.name */ 161);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 162);
__webpack_require__(/*! ./modules/es6.parse-int */ 163);
__webpack_require__(/*! ./modules/es6.parse-float */ 164);
__webpack_require__(/*! ./modules/es6.number.constructor */ 165);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 166);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 167);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 168);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 169);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 170);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 171);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 172);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 173);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 174);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 175);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 176);
__webpack_require__(/*! ./modules/es6.math.acosh */ 177);
__webpack_require__(/*! ./modules/es6.math.asinh */ 178);
__webpack_require__(/*! ./modules/es6.math.atanh */ 179);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 180);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 181);
__webpack_require__(/*! ./modules/es6.math.cosh */ 182);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 183);
__webpack_require__(/*! ./modules/es6.math.fround */ 184);
__webpack_require__(/*! ./modules/es6.math.hypot */ 185);
__webpack_require__(/*! ./modules/es6.math.imul */ 186);
__webpack_require__(/*! ./modules/es6.math.log10 */ 187);
__webpack_require__(/*! ./modules/es6.math.log1p */ 188);
__webpack_require__(/*! ./modules/es6.math.log2 */ 189);
__webpack_require__(/*! ./modules/es6.math.sign */ 190);
__webpack_require__(/*! ./modules/es6.math.sinh */ 191);
__webpack_require__(/*! ./modules/es6.math.tanh */ 192);
__webpack_require__(/*! ./modules/es6.math.trunc */ 193);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 194);
__webpack_require__(/*! ./modules/es6.string.raw */ 195);
__webpack_require__(/*! ./modules/es6.string.trim */ 196);
__webpack_require__(/*! ./modules/es6.string.iterator */ 197);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 198);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 199);
__webpack_require__(/*! ./modules/es6.string.includes */ 200);
__webpack_require__(/*! ./modules/es6.string.repeat */ 201);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 202);
__webpack_require__(/*! ./modules/es6.string.anchor */ 203);
__webpack_require__(/*! ./modules/es6.string.big */ 204);
__webpack_require__(/*! ./modules/es6.string.blink */ 205);
__webpack_require__(/*! ./modules/es6.string.bold */ 206);
__webpack_require__(/*! ./modules/es6.string.fixed */ 207);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 208);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 209);
__webpack_require__(/*! ./modules/es6.string.italics */ 210);
__webpack_require__(/*! ./modules/es6.string.link */ 211);
__webpack_require__(/*! ./modules/es6.string.small */ 212);
__webpack_require__(/*! ./modules/es6.string.strike */ 213);
__webpack_require__(/*! ./modules/es6.string.sub */ 214);
__webpack_require__(/*! ./modules/es6.string.sup */ 215);
__webpack_require__(/*! ./modules/es6.date.now */ 216);
__webpack_require__(/*! ./modules/es6.date.to-json */ 217);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 218);
__webpack_require__(/*! ./modules/es6.date.to-string */ 220);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 221);
__webpack_require__(/*! ./modules/es6.array.is-array */ 223);
__webpack_require__(/*! ./modules/es6.array.from */ 224);
__webpack_require__(/*! ./modules/es6.array.of */ 225);
__webpack_require__(/*! ./modules/es6.array.join */ 226);
__webpack_require__(/*! ./modules/es6.array.slice */ 227);
__webpack_require__(/*! ./modules/es6.array.sort */ 228);
__webpack_require__(/*! ./modules/es6.array.for-each */ 229);
__webpack_require__(/*! ./modules/es6.array.map */ 231);
__webpack_require__(/*! ./modules/es6.array.filter */ 232);
__webpack_require__(/*! ./modules/es6.array.some */ 233);
__webpack_require__(/*! ./modules/es6.array.every */ 234);
__webpack_require__(/*! ./modules/es6.array.reduce */ 235);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 236);
__webpack_require__(/*! ./modules/es6.array.index-of */ 237);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 238);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 239);
__webpack_require__(/*! ./modules/es6.array.fill */ 240);
__webpack_require__(/*! ./modules/es6.array.find */ 241);
__webpack_require__(/*! ./modules/es6.array.find-index */ 242);
__webpack_require__(/*! ./modules/es6.array.species */ 243);
__webpack_require__(/*! ./modules/es6.array.iterator */ 88);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 244);
__webpack_require__(/*! ./modules/es6.regexp.exec */ 116);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 245);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 117);
__webpack_require__(/*! ./modules/es6.regexp.match */ 246);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 247);
__webpack_require__(/*! ./modules/es6.regexp.search */ 248);
__webpack_require__(/*! ./modules/es6.regexp.split */ 249);
__webpack_require__(/*! ./modules/es6.promise */ 250);
__webpack_require__(/*! ./modules/es6.map */ 120);
__webpack_require__(/*! ./modules/es6.set */ 122);
__webpack_require__(/*! ./modules/es6.weak-map */ 123);
__webpack_require__(/*! ./modules/es6.weak-set */ 251);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 252);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 253);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 254);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 255);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 256);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 257);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 258);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 259);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 260);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 261);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 262);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 263);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 264);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 265);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 266);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 267);
__webpack_require__(/*! ./modules/es6.reflect.get */ 268);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 269);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 270);
__webpack_require__(/*! ./modules/es6.reflect.has */ 271);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 272);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 273);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 274);
__webpack_require__(/*! ./modules/es6.reflect.set */ 275);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 276);
__webpack_require__(/*! ./modules/es7.array.includes */ 277);
__webpack_require__(/*! ./modules/es7.array.flat-map */ 278);
__webpack_require__(/*! ./modules/es7.array.flatten */ 279);
__webpack_require__(/*! ./modules/es7.string.at */ 280);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 281);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 282);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 283);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 284);
__webpack_require__(/*! ./modules/es7.string.match-all */ 285);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 286);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 287);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 288);
__webpack_require__(/*! ./modules/es7.object.values */ 289);
__webpack_require__(/*! ./modules/es7.object.entries */ 290);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 291);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 292);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 293);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 294);
__webpack_require__(/*! ./modules/es7.map.to-json */ 295);
__webpack_require__(/*! ./modules/es7.set.to-json */ 296);
__webpack_require__(/*! ./modules/es7.map.of */ 297);
__webpack_require__(/*! ./modules/es7.set.of */ 298);
__webpack_require__(/*! ./modules/es7.weak-map.of */ 299);
__webpack_require__(/*! ./modules/es7.weak-set.of */ 300);
__webpack_require__(/*! ./modules/es7.map.from */ 301);
__webpack_require__(/*! ./modules/es7.set.from */ 302);
__webpack_require__(/*! ./modules/es7.weak-map.from */ 303);
__webpack_require__(/*! ./modules/es7.weak-set.from */ 304);
__webpack_require__(/*! ./modules/es7.global */ 305);
__webpack_require__(/*! ./modules/es7.system.global */ 306);
__webpack_require__(/*! ./modules/es7.error.is-error */ 307);
__webpack_require__(/*! ./modules/es7.math.clamp */ 308);
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ 309);
__webpack_require__(/*! ./modules/es7.math.degrees */ 310);
__webpack_require__(/*! ./modules/es7.math.fscale */ 311);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 312);
__webpack_require__(/*! ./modules/es7.math.isubh */ 313);
__webpack_require__(/*! ./modules/es7.math.imulh */ 314);
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ 315);
__webpack_require__(/*! ./modules/es7.math.radians */ 316);
__webpack_require__(/*! ./modules/es7.math.scale */ 317);
__webpack_require__(/*! ./modules/es7.math.umulh */ 318);
__webpack_require__(/*! ./modules/es7.math.signbit */ 319);
__webpack_require__(/*! ./modules/es7.promise.finally */ 320);
__webpack_require__(/*! ./modules/es7.promise.try */ 321);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 322);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 323);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 324);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 325);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 326);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 327);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 328);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 329);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 330);
__webpack_require__(/*! ./modules/es7.asap */ 331);
__webpack_require__(/*! ./modules/es7.observable */ 332);
__webpack_require__(/*! ./modules/web.timers */ 333);
__webpack_require__(/*! ./modules/web.immediate */ 334);
__webpack_require__(/*! ./modules/web.dom.iterable */ 335);
module.exports = __webpack_require__(/*! ./modules/_core */ 18);


/***/ }),
/* 140 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 14);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 12);
var META = __webpack_require__(/*! ./_meta */ 30).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 3);
var shared = __webpack_require__(/*! ./_shared */ 49);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 44);
var uid = __webpack_require__(/*! ./_uid */ 33);
var wks = __webpack_require__(/*! ./_wks */ 5);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 98);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 69);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 142);
var isArray = __webpack_require__(/*! ./_is-array */ 56);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var _create = __webpack_require__(/*! ./_object-create */ 36);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 101);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var $DP = __webpack_require__(/*! ./_object-dp */ 8);
var $keys = __webpack_require__(/*! ./_object-keys */ 34);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 51).f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 55).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 29)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 141 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ 49)('native-function-to-string', Function.toString);


/***/ }),
/* 142 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 34);
var gOPS = __webpack_require__(/*! ./_object-gops */ 55);
var pIE = __webpack_require__(/*! ./_object-pie */ 51);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 143 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ 36) });


/***/ }),
/* 144 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 7), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 8).f });


/***/ }),
/* 145 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 7), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 100) });


/***/ }),
/* 146 */
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

__webpack_require__(/*! ./_object-sap */ 25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 147 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);

__webpack_require__(/*! ./_object-sap */ 25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 148 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $keys = __webpack_require__(/*! ./_object-keys */ 34);

__webpack_require__(/*! ./_object-sap */ 25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 149 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 25)('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ 101).f;
});


/***/ }),
/* 150 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 151 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 152 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 153 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 154 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 155 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 156 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 102) });


/***/ }),
/* 157 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ 103) });


/***/ }),
/* 158 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 73).set });


/***/ }),
/* 159 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 45);
var test = {};
test[__webpack_require__(/*! ./_wks */ 5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ 12)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 160 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ 104) });


/***/ }),
/* 161 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 162 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ 5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ 8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 163 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 106);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 164 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 107);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 165 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 14);
var cof = __webpack_require__(/*! ./_cof */ 20);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 75);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var fails = __webpack_require__(/*! ./_fails */ 3);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 37).f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16).f;
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var $trim = __webpack_require__(/*! ./_string-trim */ 46).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ 36)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ 7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 12)(global, NUMBER, $Number);
}


/***/ }),
/* 166 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 108);
var repeat = __webpack_require__(/*! ./_string-repeat */ 76);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 167 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $fails = __webpack_require__(/*! ./_fails */ 3);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 108);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 168 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 169 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var _isFinite = __webpack_require__(/*! ./_global */ 2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 170 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ 109) });


/***/ }),
/* 171 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 172 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var isInteger = __webpack_require__(/*! ./_is-integer */ 109);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 173 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 174 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 175 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 107);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 176 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 106);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 177 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var log1p = __webpack_require__(/*! ./_math-log1p */ 110);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 178 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 179 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 180 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var sign = __webpack_require__(/*! ./_math-sign */ 77);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 181 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 182 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 183 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ 78);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 184 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ 111) });


/***/ }),
/* 185 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 186 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 187 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 188 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ 110) });


/***/ }),
/* 189 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 190 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ 77) });


/***/ }),
/* 191 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 78);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 192 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 78);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 193 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 194 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 35);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 195 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toLength = __webpack_require__(/*! ./_to-length */ 6);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 196 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 46)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 197 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 57)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 79)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 198 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 57)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 199 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var context = __webpack_require__(/*! ./_string-context */ 81);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 200 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ 0);
var context = __webpack_require__(/*! ./_string-context */ 81);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 201 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 76)
});


/***/ }),
/* 202 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var context = __webpack_require__(/*! ./_string-context */ 81);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 203 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 13)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 204 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 13)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 205 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 13)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 206 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 13)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 207 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 13)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 208 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 13)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 209 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 13)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 210 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 13)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 211 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 13)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 212 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 13)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 213 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 13)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 214 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 13)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 215 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 13)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 216 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 217 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 218 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0);
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ 219);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 219 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ 3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 220 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ 12)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 221 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ 11)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 222));


/***/ }),
/* 222 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 223 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ 56) });


/***/ }),
/* 224 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 19);
var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var call = __webpack_require__(/*! ./_iter-call */ 112);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 59)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 225 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 226 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 50) != Object || !__webpack_require__(/*! ./_strict-method */ 22)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 227 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var html = __webpack_require__(/*! ./_html */ 72);
var cof = __webpack_require__(/*! ./_cof */ 20);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 35);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 228 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 229 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $forEach = __webpack_require__(/*! ./_array-methods */ 26)(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ 22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 230 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var isArray = __webpack_require__(/*! ./_is-array */ 56);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 231 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $map = __webpack_require__(/*! ./_array-methods */ 26)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 232 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $filter = __webpack_require__(/*! ./_array-methods */ 26)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 233 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $some = __webpack_require__(/*! ./_array-methods */ 26)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 234 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $every = __webpack_require__(/*! ./_array-methods */ 26)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 235 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 113);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 236 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 113);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 237 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $indexOf = __webpack_require__(/*! ./_array-includes */ 54)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 238 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 239 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ 114) });

__webpack_require__(/*! ./_add-to-unscopables */ 31)('copyWithin');


/***/ }),
/* 240 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ 87) });

__webpack_require__(/*! ./_add-to-unscopables */ 31)('fill');


/***/ }),
/* 241 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 31)(KEY);


/***/ }),
/* 242 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 31)(KEY);


/***/ }),
/* 243 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 38)('Array');


/***/ }),
/* 244 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 75);
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ 37).f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 58);
var $flags = __webpack_require__(/*! ./_flags */ 52);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ 7) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 3)(function () {
  re2[__webpack_require__(/*! ./_wks */ 5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 12)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 38)('RegExp');


/***/ }),
/* 245 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 117);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $flags = __webpack_require__(/*! ./_flags */ 52);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ 12)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ 3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 246 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ 90);
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 60);

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 61)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 247 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ 90);
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 60);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 61)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 248 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ 1);
var sameValue = __webpack_require__(/*! ./_same-value */ 103);
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 60);

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 61)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),
/* 249 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(/*! ./_is-regexp */ 58);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 53);
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ 90);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var callRegExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 60);
var regexpExec = __webpack_require__(/*! ./_regexp-exec */ 89);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 61)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),
/* 250 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 29);
var global = __webpack_require__(/*! ./_global */ 2);
var ctx = __webpack_require__(/*! ./_ctx */ 19);
var classof = __webpack_require__(/*! ./_classof */ 45);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anInstance = __webpack_require__(/*! ./_an-instance */ 39);
var forOf = __webpack_require__(/*! ./_for-of */ 40);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 53);
var task = __webpack_require__(/*! ./_task */ 91).set;
var microtask = __webpack_require__(/*! ./_microtask */ 92)();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ 93);
var perform = __webpack_require__(/*! ./_perform */ 118);
var userAgent = __webpack_require__(/*! ./_user-agent */ 62);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 119);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ 44)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 38)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 18)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 59)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 251 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-set.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 124);
var validate = __webpack_require__(/*! ./_validate-collection */ 42);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 63)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 252 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.array-buffer.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $typed = __webpack_require__(/*! ./_typed */ 64);
var buffer = __webpack_require__(/*! ./_typed-buffer */ 94);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 35);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var ArrayBuffer = __webpack_require__(/*! ./_global */ 2).ArrayBuffer;
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 53);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 38)(ARRAY_BUFFER);


/***/ }),
/* 253 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.data-view.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 64).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 94).DataView
});


/***/ }),
/* 254 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int8-array.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 255 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 256 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 257 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int16-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 258 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint16-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 259 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int32-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 260 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint32-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 261 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float32-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 262 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float64-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 263 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var rApply = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 264 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ 0);
var create = __webpack_require__(/*! ./_object-create */ 36);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var bind = __webpack_require__(/*! ./_bind */ 104);
var rConstruct = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 265 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 266 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16).f;
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 267 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 80)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 268 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var has = __webpack_require__(/*! ./_has */ 14);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 269 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 270 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var getProto = __webpack_require__(/*! ./_object-gpo */ 17);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 271 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 272 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 273 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ 126) });


/***/ }),
/* 274 */
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 275 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var has = __webpack_require__(/*! ./_has */ 14);
var $export = __webpack_require__(/*! ./_export */ 0);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 276 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
var setProto = __webpack_require__(/*! ./_set-proto */ 73);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 277 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ 0);
var $includes = __webpack_require__(/*! ./_array-includes */ 54)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('includes');


/***/ }),
/* 278 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flat-map.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 127);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 86);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('flatMap');


/***/ }),
/* 279 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flatten.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 127);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var toInteger = __webpack_require__(/*! ./_to-integer */ 21);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 86);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('flatten');


/***/ }),
/* 280 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.at.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 57)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 281 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-start.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 128);
var userAgent = __webpack_require__(/*! ./_user-agent */ 62);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 282 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-end.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 128);
var userAgent = __webpack_require__(/*! ./_user-agent */ 62);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 283 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-left.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 46)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 284 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-right.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 46)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 285 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.match-all.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 24);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 58);
var getFlags = __webpack_require__(/*! ./_flags */ 52);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 80)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 286 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 69)('asyncIterator');


/***/ }),
/* 287 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 69)('observable');


/***/ }),
/* 288 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ 0);
var ownKeys = __webpack_require__(/*! ./_own-keys */ 126);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 289 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $values = __webpack_require__(/*! ./_object-to-array */ 129)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 290 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $entries = __webpack_require__(/*! ./_object-to-array */ 129)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 291 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 65), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 292 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 65), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 293 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 65), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 294 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 65), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 295 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 130)('Map') });


/***/ }),
/* 296 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 130)('Set') });


/***/ }),
/* 297 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ 66)('Map');


/***/ }),
/* 298 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ 66)('Set');


/***/ }),
/* 299 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ 66)('WeakMap');


/***/ }),
/* 300 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ 66)('WeakSet');


/***/ }),
/* 301 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ 67)('Map');


/***/ }),
/* 302 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ 67)('Set');


/***/ }),
/* 303 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ 67)('WeakMap');


/***/ }),
/* 304 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ 67)('WeakSet');


/***/ }),
/* 305 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.global.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.G, { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 306 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.system.global.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 307 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.error.is-error.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0);
var cof = __webpack_require__(/*! ./_cof */ 20);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 308 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.clamp.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 309 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.deg-per-rad.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 310 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.degrees.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 311 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.fscale.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var scale = __webpack_require__(/*! ./_math-scale */ 132);
var fround = __webpack_require__(/*! ./_math-fround */ 111);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 312 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.iaddh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 313 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.isubh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 314 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.imulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 315 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.rad-per-deg.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 316 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.radians.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 317 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.scale.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ 132) });


/***/ }),
/* 318 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.umulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 319 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.signbit.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 320 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.finally.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 18);
var global = __webpack_require__(/*! ./_global */ 2);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 53);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 119);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 321 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.try.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ 0);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 93);
var perform = __webpack_require__(/*! ./_perform */ 118);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 322 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 323 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 324 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 325 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ 122);
var from = __webpack_require__(/*! ./_array-from-iterable */ 131);
var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 326 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 327 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 328 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 329 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 330 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 331 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/es7.asap.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(/*! ./_export */ 0);
var microtask = __webpack_require__(/*! ./_microtask */ 92)();
var process = __webpack_require__(/*! ./_global */ 2).process;
var isNode = __webpack_require__(/*! ./_cof */ 20)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 332 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.observable.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(/*! ./_export */ 0);
var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 18);
var microtask = __webpack_require__(/*! ./_microtask */ 92)();
var OBSERVABLE = __webpack_require__(/*! ./_wks */ 5)('observable');
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var anInstance = __webpack_require__(/*! ./_an-instance */ 39);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 41);
var hide = __webpack_require__(/*! ./_hide */ 11);
var forOf = __webpack_require__(/*! ./_for-of */ 40);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(/*! ./_set-species */ 38)('Observable');


/***/ }),
/* 333 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var userAgent = __webpack_require__(/*! ./_user-agent */ 62);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 334 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $task = __webpack_require__(/*! ./_task */ 91);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 335 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ 88);
var getKeys = __webpack_require__(/*! ./_object-keys */ 34);
var redefine = __webpack_require__(/*! ./_redefine */ 12);
var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 11);
var Iterators = __webpack_require__(/*! ./_iterators */ 47);
var wks = __webpack_require__(/*! ./_wks */ 5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 336 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 43)))

/***/ }),
/* 337 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/regexp/escape.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 338);
module.exports = __webpack_require__(/*! ../../modules/_core */ 18).RegExp.escape;


/***/ }),
/* 338 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/core.regexp.escape.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0);
var $re = __webpack_require__(/*! ./_replacer */ 339)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 339 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_replacer.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 340 */
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(/*! pixi */ 133);

__webpack_require__(/*! p2 */ 134);

var _phaser = __webpack_require__(/*! phaser */ 135);

var _phaser2 = _interopRequireDefault(_phaser);

var _LoadingState = __webpack_require__(/*! ./states/loading/LoadingState */ 345);

var _LoadingState2 = _interopRequireDefault(_LoadingState);

var _config = __webpack_require__(/*! ./config */ 389);

var _config2 = _interopRequireDefault(_config);

__webpack_require__(/*! ../../src/styles/main.css */ 390);

__webpack_require__(/*! ../../favicon.ico */ 395);

var _AvatarTracking = __webpack_require__(/*! ./components/AvatarTracking */ 48);

var _AvatarTracking2 = _interopRequireDefault(_AvatarTracking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainGame = function (_Phaser$Game) {
	_inherits(MainGame, _Phaser$Game);

	function MainGame() {
		_classCallCheck(this, MainGame);

		var isDesktop = !navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

		var _this = _possibleConstructorReturn(this, (MainGame.__proto__ || Object.getPrototypeOf(MainGame)).call(this, {
			// antialias: isDesktop,
			enableDebug: false,
			width: _config2.default.gameWidth,
			height: _config2.default.gameHeight,
			renderer: _phaser2.default.CANVAS,
			parent: 'content',
			transparent: true,
			multiTexture: false,
			preserveDrawingBuffer: false,
			state: {
				preload: function preload() {
					game.tracking = new _AvatarTracking2.default();
					game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
					game.input.maxPointers = 1;
					// game.load.atlasJSONHash('loader', 'assets/sprites/loader.png', 'assets/sprites/loader.json')
					game.load.json('data', 'assets/data/data.json');
					game.data = { languageCode: 'en', loading: null, score: 0
						// this.stage.disableVisibilityChange = isDesktop
					};_this.scale.pageAlignHorizontally = _this.scale.pageAlignVertically = true;
					_this.scale.scaleMode = _phaser2.default.ScaleManager.SHOW_ALL;
					_this.state.add('Loading', _LoadingState2.default, false);
				},
				create: function create() {
					_this.modalLegalContainer = document.querySelector('.modal-legal-container');
					_this.modalLegalContainer.style.display = '';
					game.state.start('Loading');
					window.game.legal = {
						requestLegalOpen: function requestLegalOpen() {
							_this.modalLegalContainer.classList.add('show');
						},
						requestLegalClose: function requestLegalClose() {
							_this.modalLegalContainer.classList.remove('show');
						}
					};

					_this.modalLegalContainer.addEventListener('click', window.game.legal.requestLegalClose);
					document.querySelector('.preloader').classList.add('bg-preloader-1');
					requestAnimationFrame(_this.globalUpdate.bind(_this));
				}
			}
		}));

		_this.modalLegalContainer = document.querySelector('.modal-legal-container');
		_this.lastHeight = 0;
		return _this;
	}

	_createClass(MainGame, [{
		key: 'globalUpdate',
		value: function globalUpdate() {
			requestAnimationFrame(this.globalUpdate.bind(this));
			var currentHeight = document.documentElement.clientHeight;
			if (this.lastHeight === currentHeight) {
				return;
			}
			this.lastHeight = currentHeight;
			this.modalLegalContainer.style.height = currentHeight + 'px';
		}
	}]);

	return MainGame;
}(_phaser2.default.Game);

window.WebFontConfig = { google: { families: ['Londrina Solid'] } };
window.game = new MainGame();

/***/ }),
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */
/*!****************************************************!*\
  !*** ./src/scripts/states/loading/LoadingState.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IntroState = __webpack_require__(/*! ../intro/IntroState */ 346);

var _IntroState2 = _interopRequireDefault(_IntroState);

var _GameState = __webpack_require__(/*! ../game/GameState */ 366);

var _GameState2 = _interopRequireDefault(_GameState);

var _SummaryState = __webpack_require__(/*! ../summary/SummaryState */ 379);

var _SummaryState2 = _interopRequireDefault(_SummaryState);

var _ProgressBar = __webpack_require__(/*! ./ProgressBar */ 384);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _Localization = __webpack_require__(/*! ../../components/Localization */ 385);

var _Localization2 = _interopRequireDefault(_Localization);

var _AvatarUtils = __webpack_require__(/*! ../../components/AvatarUtils */ 387);

var _AvatarUtils2 = _interopRequireDefault(_AvatarUtils);

var _SocialManager = __webpack_require__(/*! ../../components/SocialManager */ 388);

var _SocialManager2 = _interopRequireDefault(_SocialManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
	_inherits(_class, _Phaser$State);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'preload',
		value: function preload() {
			game.load.atlasJSONHash('spritesheet', 'assets/sprites/spritesheet.png', 'assets/sprites/spritesheet.json');
			game.utils = new _AvatarUtils2.default(game);
			this.initJsonData();
			this.progressBar = new _ProgressBar2.default(game);
			this.initStates();
			game.canvas.style.opacity = 1;
			game.load.image('shared/tt', 'assets/_localization/shared/tt.png');
			game.load.image('intro/btn_play_now', 'assets/_localization/intro/btn_play_now.png');
			game.load.image('legal/btn_legal', 'assets/_localization/legal/btn_legal.png');
			game.load.image('legal/footer_text', 'assets/_localization/legal/footer_text.png');
			game.load.image('legal/legal_panel', 'assets/_localization/legal/legal_panel.png');
			game.load.image('instructions/btn_got_it', 'assets/_localization/instructions/btn_got_it.png');
			game.load.image('instructions/instructions', 'assets/_localization/instructions/instructions.png');
			game.load.image('game/frame_score', 'assets/_localization/game/frame_score.png');
			game.load.image('game/frame_time', 'assets/_localization/game/frame_time.png');
			game.load.image('summary/bg', 'assets/_localization/summary/bg.png');
			game.load.image('summary/btn_play_again', 'assets/_localization/summary/btn_play_again.png');
		}
	}, {
		key: 'loadUpdate',
		value: function loadUpdate() {
			this.progressBar.loadUpdate(this.load);
		}
	}, {
		key: 'create',
		value: function create() {
			new _Localization2.default(game);
			game.social = new _SocialManager2.default(document, "script", "Messenger");
			game.state.start('Intro');
		}
	}, {
		key: 'shutdown',
		value: function shutdown() {
			game.world.remove(game.overlay);
			game.world.remove(game.data.loading);
		}
	}, {
		key: 'initJsonData',
		value: function initJsonData() {
			var json = game.cache.getJSON('data');

			for (var property in json) {
				game.data[property] = json[property];
			}
		}
	}, {
		key: 'initStates',
		value: function initStates() {
			game.state.add('Intro', _IntroState2.default, false);
			game.state.add('Game', _GameState2.default, false);
			game.state.add('Summary', _SummaryState2.default, false);
		}
	}]);

	return _class;
}(Phaser.State);

exports.default = _class;

/***/ }),
/* 346 */
/*!************************************************!*\
  !*** ./src/scripts/states/intro/IntroState.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IntroTitle = __webpack_require__(/*! ./IntroTitle */ 347);

var _IntroTitle2 = _interopRequireDefault(_IntroTitle);

var _IntroPlayButton = __webpack_require__(/*! ./IntroPlayButton */ 348);

var _IntroPlayButton2 = _interopRequireDefault(_IntroPlayButton);

var _InstructionsDialog = __webpack_require__(/*! ./instructions/InstructionsDialog */ 349);

var _InstructionsDialog2 = _interopRequireDefault(_InstructionsDialog);

var _LegalOpenButton = __webpack_require__(/*! ../shared/legal/LegalOpenButton */ 95);

var _LegalOpenButton2 = _interopRequireDefault(_LegalOpenButton);

var _SoundManager = __webpack_require__(/*! ../../components/SoundManager */ 361);

var _SoundManager2 = _interopRequireDefault(_SoundManager);

var _MuteBtn = __webpack_require__(/*! ../../components/MuteBtn */ 362);

var _MuteBtn2 = _interopRequireDefault(_MuteBtn);

var _IntroDora = __webpack_require__(/*! ./IntroDora */ 363);

var _IntroDora2 = _interopRequireDefault(_IntroDora);

var _IntroBoots = __webpack_require__(/*! ./IntroBoots */ 364);

var _IntroBoots2 = _interopRequireDefault(_IntroBoots);

var _LegalFooterText = __webpack_require__(/*! ../shared/legal/LegalFooterText */ 96);

var _LegalFooterText2 = _interopRequireDefault(_LegalFooterText);

var _HtmlBgWisps = __webpack_require__(/*! ../../components/HtmlBgWisps */ 365);

var _HtmlBgWisps2 = _interopRequireDefault(_HtmlBgWisps);

var _AvatarTracking = __webpack_require__(/*! ../../components/AvatarTracking */ 48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
	_inherits(_class, _Phaser$State);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "preload",
		value: function preload() {
			game.soundManager = new _SoundManager2.default(game);
		}
	}, {
		key: "create",
		value: function create() {
			game.time.events.add(Phaser.Timer.SECOND * 2, this.delayedStart, this);
			document.body.style.backgroundImage = 'url(./assets/_html/bg_intro.jpg)';
			new _HtmlBgWisps2.default();
		}
	}, {
		key: "delayedStart",
		value: function delayedStart() {
			this.title = new _IntroTitle2.default(game);
			this.boots = new _IntroBoots2.default(game);
			this.dora = new _IntroDora2.default(game);
			this.legalText = new _LegalFooterText2.default(game);
			this.legalButton = new _LegalOpenButton2.default(game);
			this.button = new _IntroPlayButton2.default(game, this.handleIntroPlayNowClick, this);
		}
	}, {
		key: "shutdown",
		value: function shutdown() {
			game.world.remove(game.overlay);
		}
	}, {
		key: "handleIntroPlayNowClick",
		value: function handleIntroPlayNowClick(e, pointer, releasedOnButton) {
			if (!releasedOnButton) {
				return;
			}
			game.tracking.sendEvent(_AvatarTracking.EVENT_CLICK_BUTTON_INTRO_PLAY_NOW);
			game.sound.boot();
			game.soundManager.create();
			game.onFocus.add(this.handleOnFocus, this);
			game.onBlur.add(this.handleOnBlur, this);
			document.body.style.backgroundImage = 'url(./assets/_html/bg_main.jpg)';
			new _InstructionsDialog2.default(game);
			this.button.inputEnabled = false;
			this.legalButton.destroy();
			game.add.tween(this.button).to({ y: '+' + game.height, alpha: 0 }, Phaser.Timer.SECOND * 0.3, Phaser.Easing.Quintic.In, true);
			game.add.tween(this.title).to({ alpha: 0.8 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Quadratic.InOut, true);
			// document.getElementById('darken-bg').classList.add('darken')
			new _MuteBtn2.default(game);
			game.add.existing(game.overlay);
			game.overlay.parent.bringToTop(game.overlay);
			// game.sounds.soundtrack.play()
			// this.playbackRate = game.sounds.soundtrack._sound.playbackRate
			// this.playbackRate.value = 1
			game.add.tween(this.dora.dora0).to({ alpha: 0, y: "-100" }, Phaser.Timer.SECOND * 0.25, Phaser.Easing.Quadratic.In, true);
			game.add.tween(this.dora.dora0.scale).to({ x: 1.5, y: 1.5 }, Phaser.Timer.SECOND * 0.25, Phaser.Easing.Quadratic.In, true);
			game.add.tween(this.dora.dora1).to({ alpha: 1 }, Phaser.Timer.SECOND, Phaser.Easing.Quadratic.Out, true);
			game.add.tween(this.dora.dora1).from({ y: "+100" }, Phaser.Timer.SECOND, Phaser.Easing.Quintic.Out, true);
			game.add.tween(this.dora.dora1.scale).from({ x: 2.1, y: 2.1 }, Phaser.Timer.SECOND, Phaser.Easing.Quadratic.Out, true);
			game.add.tween(this.boots).to({ x: "+50", y: "-200" }, Phaser.Timer.SECOND, Phaser.Easing.Back.In, true);
			game.add.tween(this.boots).to({ alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Quadratic.InOut, true);
		}
	}, {
		key: "handleOnFocus",
		value: function handleOnFocus() {
			if (!game.sound || !game.data.storage) {
				return;
			}
			game.sound.mute = localStorage.getItem(game.data.storage.mute) === 'true';
		}
	}, {
		key: "handleOnBlur",
		value: function handleOnBlur() {
			game.sound.mute = true;
		}
	}]);

	return _class;
}(Phaser.State);

exports.default = _class;

/***/ }),
/* 347 */
/*!************************************************!*\
  !*** ./src/scripts/states/intro/IntroTitle.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
	_inherits(_class, _Phaser$Group);

	function _class(game) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

		var title = _this.add(game.make.sprite(game.world.centerX, 0, 'shared/tt'));
		game.utils.anchorAll([title]);
		title.scale.set(0.8);
		title.anchor.set(0.5, 0);
		game.add.tween(title).from({ alpha: 0 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(title).from({ y: "-20" }, Phaser.Timer.SECOND * 1, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(title.scale).to({ x: 1, y: 1 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Back.Out, true);
		game.add.existing(_this);
		_this.x = 10;
		game.add.tween(_this).to({ x: "-" + _this.x }, Phaser.Timer.SECOND * 4, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
		return _this;
	}

	return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 348 */
/*!*****************************************************!*\
  !*** ./src/scripts/states/intro/IntroPlayButton.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Button) {
	_inherits(_class, _Phaser$Button);

	function _class(game, callback, context) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, game.world.centerX, game.height * 0.857, 'intro/btn_play_now', callback, context));

		_this.anchor.set(0.5);
		game.utils.addOverScaling.call(_this, _this, 1.05);
		game.add.tween(_this).from({ y: '+50' }, Phaser.Timer.SECOND * 2.5, Phaser.Easing.Elastic.Out, true);
		game.add.tween(_this.scale).from({ x: 0.5, y: 0.5 }, Phaser.Timer.SECOND * 2, Phaser.Easing.Elastic.Out, true);
		game.add.existing(_this);
		return _this;
	}

	return _class;
}(Phaser.Button);

exports.default = _class;

/***/ }),
/* 349 */
/*!*********************************************************************!*\
  !*** ./src/scripts/states/intro/instructions/InstructionsDialog.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InstructionsBackground = __webpack_require__(/*! ./InstructionsBackground */ 350);

var _InstructionsBackground2 = _interopRequireDefault(_InstructionsBackground);

var _InstructionsFrame = __webpack_require__(/*! ./InstructionsFrame */ 351);

var _InstructionsFrame2 = _interopRequireDefault(_InstructionsFrame);

var _InstructionsButton = __webpack_require__(/*! ./InstructionsButton */ 352);

var _InstructionsButton2 = _interopRequireDefault(_InstructionsButton);

var _TutorialAnimation = __webpack_require__(/*! ./tutorial/TutorialAnimation */ 353);

var _TutorialAnimation2 = _interopRequireDefault(_TutorialAnimation);

var _AvatarTracking = __webpack_require__(/*! ../../../components/AvatarTracking */ 48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    new _TutorialAnimation2.default(game);
    this.dialog = new _InstructionsBackground2.default(game);
    this.dialog.add(new _InstructionsFrame2.default(game));
    new _InstructionsButton2.default(game, this.handleInstructionButtonClick);
  }

  _createClass(_class, [{
    key: "handleInstructionButtonClick",
    value: function handleInstructionButtonClick() {
      localStorage.setItem(game.data.storage.tutorialComplete, true);
      game.tracking.sendEvent(_AvatarTracking.EVENT_CLICK_BUTTON_INSTRUCTIONS_GOT_IT);
      game.state.start('Game');
      // document.getElementById('darken-bg').classList.remove('darken')
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 350 */
/*!*************************************************************************!*\
  !*** ./src/scripts/states/intro/instructions/InstructionsBackground.js ***!
  \*************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
    _inherits(_class, _Phaser$Group);

    function _class(game) {
        _classCallCheck(this, _class);

        // let darkenedBg = this.add(game.make.sprite(0, 0, game.data.sheet.spritesheet, 'shared/darken'))

        // darkenedBg.alpha = 0
        // darkenedBg.inputEnabled = true
        // darkenedBg.scale.set(game.world.width, game.world.height)
        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

        game.add.existing(_this);
        return _this;
    }

    return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 351 */
/*!********************************************************************!*\
  !*** ./src/scripts/states/intro/instructions/InstructionsFrame.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Sprite) {
    _inherits(_class, _Phaser$Sprite);

    function _class(game) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, game.world.centerX, game.world.centerY, 'instructions/instructions'));

        _this.anchor.set(0.5);
        game.add.tween(_this.scale).from({ x: 0.9, y: 0.9 }, Phaser.Timer.SECOND * 1.25, Phaser.Easing.Elastic.Out, true);
        game.add.existing(_this);
        return _this;
    }

    return _class;
}(Phaser.Sprite);

exports.default = _class;

/***/ }),
/* 352 */
/*!*********************************************************************!*\
  !*** ./src/scripts/states/intro/instructions/InstructionsButton.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Button) {
    _inherits(_class, _Phaser$Button);

    function _class(game, callback) {
        _classCallCheck(this, _class);

        // this.setSounds(game.sounds.over, null, game.sounds.click)
        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, game.world.centerX, game.world.height * 1250 / 1920, 'instructions/btn_got_it', callback, null));

        _this.anchor.set(0.5);
        game.utils.addOverScaling.call(_this, _this, 1.05);
        game.add.tween(_this).from({ y: '+50' }, Phaser.Timer.SECOND * 2.5, Phaser.Easing.Elastic.Out, true);
        game.add.tween(_this.scale).from({ x: 0.9, y: 0.9 }, Phaser.Timer.SECOND * 2, Phaser.Easing.Elastic.Out, true);
        game.add.existing(_this);
        return _this;
    }

    return _class;
}(Phaser.Button);

exports.default = _class;

/***/ }),
/* 353 */
/*!*****************************************************************************!*\
  !*** ./src/scripts/states/intro/instructions/tutorial/TutorialAnimation.js ***!
  \*****************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TutorialCursor = __webpack_require__(/*! ./TutorialCursor */ 354);

var _TutorialCursor2 = _interopRequireDefault(_TutorialCursor);

var _TutorialBoard = __webpack_require__(/*! ./TutorialBoard */ 355);

var _TutorialBoard2 = _interopRequireDefault(_TutorialBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
  _inherits(_class, _Phaser$Group);

  function _class(game) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    _this.x = game.world.centerX;
    _this.y = game.world.height * 0.77;
    _this.originalScale = 1.4;
    _this.scale.set(_this.originalScale);
    _this.board = new _TutorialBoard2.default(game);
    _this.add(_this.board);
    _this.cursor = new _TutorialCursor2.default(game);
    _this.add(_this.cursor);
    game.add.existing(_this);
    _this.restart();
    return _this;
  }

  _createClass(_class, [{
    key: "restart",
    value: function restart() {
      var _this2 = this;

      this.alpha = 0;
      this.board.tiles.tiles[1][1].y = 0;
      this.board.tiles.tiles[2][1].y = game.data.game.tileSize;
      this.cursor.x = 100;
      this.cursor.y = -50;
      this.cursor.scale.set(this.originalScale);
      this.cacheAsBitmap = false;

      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          var tile = this.board.tiles.tiles[r][c];

          if (r === 0) {
            tile.alpha = 0;
            game.add.tween(tile).to({ alpha: 1 }, Phaser.Timer.SECOND * 0.25, Phaser.Easing.Quintic.Out, true, Phaser.Timer.SECOND * 2.5);
          } else {
            tile.alpha = 1;
          }

          tile.x = tile.original.x;
          tile.y = tile.original.y;
        }
      }

      game.time.events.add(Phaser.Timer.SECOND * 3.5, function () {
        _this2.cacheAsBitmap = true;
      });
      game.add.tween(this.cursor).to({ x: this.cursor.originalX, y: this.cursor.originalY }, Phaser.Timer.SECOND * 1.1, Phaser.Easing.Quadratic.Out).to({ x: this.cursor.originalX, y: game.data.game.tileSize }, Phaser.Timer.SECOND, Phaser.Easing.Quintic.InOut, true);
      game.add.tween(this.cursor.scale).to({ x: 1.1, y: 1.1 }, Phaser.Timer.SECOND * 0.25, Phaser.Easing.Back.Out, false, Phaser.Timer.SECOND * 1.25).to({ x: this.originalScale, y: this.originalScale }, Phaser.Timer.SECOND * 0.25, Phaser.Easing.Quadratic.InOut, true, Phaser.Timer.SECOND * 0.5);
      game.add.tween(this.board.tiles.tiles[1][1]).to({ y: game.data.game.tileSize }, Phaser.Timer.SECOND, Phaser.Easing.Quintic.Out, true, Phaser.Timer.SECOND * 1.5);
      game.add.tween(this.board.tiles.tiles[2][1]).to({ y: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Quintic.Out, false, Phaser.Timer.SECOND * 1.5).to({ y: game.data.game.tileSize }, Phaser.Timer.SECOND * game.rnd.realInRange(0.5, 0.8), Phaser.Easing.Bounce.Out, true);

      this.fadeTile(2, 0);
      this.fadeTile(1, 1);
      this.fadeTile(2, 2);
      this.dropTile(0, 0);
      this.dropTile(0, 1);
      this.dropTile(0, 2);
      this.dropTile(1, 0);
      this.dropTile(1, 2);

      game.add.tween(this).to({ alpha: 1 }, Phaser.Timer.SECOND * 0.15, Phaser.Easing.Quadratic.Out).to({ alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Quadratic.In, false, Phaser.Timer.SECOND * 3.25).to({ alpha: 0 }, Phaser.Timer.SECOND * 0.15, Phaser.Easing.Linear.None, true).onComplete.add(this.restart, this);
    }
  }, {
    key: "fadeTile",
    value: function fadeTile(r, c) {
      game.add.tween(this.board.tiles.tiles[r][c]).to({ alpha: 0 }, game.data.game.destroySpeed, Phaser.Easing.Linear.None, true, Phaser.Timer.SECOND * 2);
    }
  }, {
    key: "dropTile",
    value: function dropTile(r, c) {
      var tile = this.board.tiles.tiles[r][c];
      game.add.tween(tile).to({ y: tile.original.y + game.data.game.tileSize }, Phaser.Timer.SECOND * game.rnd.realInRange(0.5, 0.8), Phaser.Easing.Bounce.Out, true, Phaser.Timer.SECOND * 2.5);
    }
  }]);

  return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 354 */
/*!**************************************************************************!*\
  !*** ./src/scripts/states/intro/instructions/tutorial/TutorialCursor.js ***!
  \**************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Sprite) {
    _inherits(_class, _Phaser$Sprite);

    function _class(game) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, game.world.width * 0.04, game.world.height * 0.011, game.data.sheet.spritesheet, 'instructions/cursor'));

        _this.originalX = _this.x;
        _this.originalY = _this.y;
        _this.anchor.set(0.13, 0.11);
        _this.scale.set(1.35);
        return _this;
    }

    return _class;
}(Phaser.Sprite);

exports.default = _class;

/***/ }),
/* 355 */
/*!*************************************************************************!*\
  !*** ./src/scripts/states/intro/instructions/tutorial/TutorialBoard.js ***!
  \*************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TutorialTiles = __webpack_require__(/*! ./TutorialTiles */ 356);

var _TutorialTiles2 = _interopRequireDefault(_TutorialTiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
    _inherits(_class, _Phaser$Group);

    function _class(game) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

        _this.x = -game.data.game.tileSize;
        _this.tiles = new _TutorialTiles2.default(game);
        _this.add(_this.tiles);
        game.add.existing(_this);
        return _this;
    }

    return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 356 */
/*!*************************************************************************!*\
  !*** ./src/scripts/states/intro/instructions/tutorial/TutorialTiles.js ***!
  \*************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
    _inherits(_class, _Phaser$Group);

    function _class(game) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

        _this.tiles = [[_this.add(_this.requestTile(0, 0, 2)), _this.add(_this.requestTile(1, 0, 1)), _this.add(_this.requestTile(2, 0, 5))], [_this.add(_this.requestTile(0, 1, 0)), _this.add(_this.requestTile(1, 1, 4)), _this.add(_this.requestTile(2, 1, 1))], [_this.add(_this.requestTile(0, 2, 4)), _this.add(_this.requestTile(1, 2, 3)), _this.add(_this.requestTile(2, 2, 4))]];

        _this.setChildIndex(_this.tiles[2][1], 0);
        return _this;
    }

    _createClass(_class, [{
        key: "requestTile",
        value: function requestTile(c, r, frame) {
            var tile = game.add.sprite(c * game.data.game.tileSize, (r - 1) * game.data.game.tileSize, game.data.sheet.spritesheet, "tiles/tile_" + frame);
            tile.scale.set(1.1);
            tile.original = { x: tile.x, y: tile.y };
            tile.anchor.set(0.5);
            return tile;
        }
    }]);

    return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 357 */
/*!********************************************************!*\
  !*** ./src/scripts/states/shared/legal/LegalDialog.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LegalCloseButton = __webpack_require__(/*! ./LegalCloseButton */ 358);

var _LegalCloseButton2 = _interopRequireDefault(_LegalCloseButton);

var _LegalText = __webpack_require__(/*! ./LegalText */ 359);

var _LegalText2 = _interopRequireDefault(_LegalText);

var _LegalBackground = __webpack_require__(/*! ./LegalBackground */ 360);

var _LegalBackground2 = _interopRequireDefault(_LegalBackground);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
  _inherits(_class, _Phaser$Group);

  function _class(game, closedCallback) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, 0, 0, true));

    _this.closedCallback = closedCallback;
    _this.dialog = new _LegalBackground2.default(game, _this.handleCloseClick, _this);
    game.add.existing(_this.dialog);
    _this.add(new _LegalText2.default(game));
    _this.closeBtn = _this.add(new _LegalCloseButton2.default(game, _this.handleCloseClick, _this));
    _this.isFinishedOpening = false;
    game.add.existing(_this);
    _this.isOpen = true;

    game.add.tween(_this).from({ alpha: 0, y: "+100" }, Phaser.Timer.SECOND, Phaser.Easing.Quadratic.Out, true).onComplete.addOnce(function () {
      _this.isFinishedOpening = true;
    });
    return _this;
  }

  _createClass(_class, [{
    key: "handleCloseClick",
    value: function handleCloseClick(btn, pointer, isOver) {
      var _this2 = this;

      if (!this.isFinishedOpening) {
        return;
      }

      this.closeBtn.inputEnabled = false;

      game.add.tween(this).to({ alpha: 0, y: "+100" }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Quadratic.In, true).onComplete.addOnce(function () {
        _this2.isOpen = false;
        _this2.dialog.destroy();
        _this2.dialog = null;

        if (_this2.closedCallback) {
          _this2.closedCallback();
        }
      });
    }
  }]);

  return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 358 */
/*!*************************************************************!*\
  !*** ./src/scripts/states/shared/legal/LegalCloseButton.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Button) {
    _inherits(_class, _Phaser$Button);

    function _class(game, callback, context) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, game.width * 0.97, game.height * 0.758, game.data.sheet.spritesheet, callback, context, 'legal/btn_close', 'legal/btn_close', 'legal/btn_close', 'legal/btn_close'));

        _this.scale.set(2);
        _this.anchor.set(0.5);
        game.utils.addOverScaling(_this, 2.1);
        return _this;
    }

    return _class;
}(Phaser.Button);

exports.default = _class;

/***/ }),
/* 359 */
/*!******************************************************!*\
  !*** ./src/scripts/states/shared/legal/LegalText.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Sprite) {
    _inherits(_class, _Phaser$Sprite);

    function _class(game) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, game.world.centerX, game.world.centerY, 'legal/legal_panel'));

        _this.anchor.set(0.5);
        // this.scale.set(2)
        game.add.tween(_this).from({ alpha: 0 }, Phaser.Timer.SECOND * 2, Phaser.Easing.Quintic.Out, true);
        return _this;
    }

    return _class;
}(Phaser.Sprite);

exports.default = _class;

/***/ }),
/* 360 */
/*!************************************************************!*\
  !*** ./src/scripts/states/shared/legal/LegalBackground.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
    _inherits(_class, _Phaser$Group);

    function _class(game, callback, context) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

        _this.callback = callback;
        _this.context = context;
        _this.destructing = false;
        _this.scale.set(2);
        _this.transparentBg = game.make.sprite(0, 0, game.data.sheet.spritesheet, "shared/darken");
        _this.transparentBg.scale.set(game.world.width, game.world.height);
        _this.transparentBg.alpha = 0.5;
        _this.transparentBg.inputEnabled = true;
        _this.add(_this.transparentBg);
        _this.inputEnabled = true;
        game.add.tween(_this).from({ alpha: 0 }, Phaser.Timer.SECOND * 2, Phaser.Easing.Quintic.Out, true);
        return _this;
    }

    _createClass(_class, [{
        key: "update",
        value: function update(pointer) {
            if (this.transparentBg.input.justPressed() && !this.destructing) {
                this.destructing = true;
                this.callback.call(this.context);
            }
        }
    }]);

    return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 361 */
/*!************************************************!*\
  !*** ./src/scripts/components/SoundManager.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.sounds = {
      finish_level: ['./assets/audio/finish_level.mp3'],
      match_3_0: ['./assets/audio/match_3_0.mp3'],
      match_3_1: ['./assets/audio/match_3_1.mp3'],
      match_3_2: ['./assets/audio/match_3_2.mp3'],
      match_3_3: ['./assets/audio/match_3_3.mp3'],
      match_3_4: ['./assets/audio/match_3_4.mp3'],
      match_3_5: ['./assets/audio/match_3_5.mp3'],
      match_3_6: ['./assets/audio/match_3_6.mp3'],
      match_3_7: ['./assets/audio/match_3_7.mp3'],
      match_4: ['./assets/audio/match_4.mp3'],
      match_5: ['./assets/audio/match_5.mp3'],
      no_moves: ['./assets/audio/no_moves.mp3'],
      soundtrack: ['./assets/audio/soundtrack.mp3'],
      wrong: ['./assets/audio/wrong.mp3']
    };

    for (var key in this.sounds) {
      game.load.audio(key, this.sounds[key]);
    }

    game.requestedSounds = {};
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      game.sounds = {};

      for (var key in this.sounds) {
        game.sounds[key] = game.make.audio(key);
      }

      game.sounds.match_3 = {
        play: function play() {
          game.sounds['match_3_' + game.rnd.between(0, 7)].play();
        }
      };

      game.sound.volume = localStorage.getItem(game.data.storage.effectsVolume) !== null ? parseFloat(localStorage.getItem(game.data.storage.effectsVolume)) : 1;
      // game.sound.volume = 0
      game.sound.mute = localStorage.getItem(game.data.storage.mute) !== null ? localStorage.getItem(game.data.storage.mute) === 'true' : false;
      game.sounds.soundtrack.volume = localStorage.getItem(game.data.storage.musicVolume) !== null ? parseFloat(localStorage.getItem(game.data.storage.musicVolume)) : 1;
      game.sounds.soundtrack.loop = true;

      for (var i = 0; i < 8; i++) {
        game.sounds['match_3_' + i].allowMultiple = true;
      }

      game.sounds.match_4.allowMultiple = true;
      game.sounds.match_5.allowMultiple = true;
      setTimeout(this.update.bind(this), 200);
    }
  }, {
    key: 'requestSound',
    value: function requestSound(value) {
      game.requestedSounds[value] = true;
    }
  }, {
    key: 'update',
    value: function update() {
      for (var s in game.requestedSounds) {
        game.sounds[s].play();
      }

      game.requestedSounds = {};
      setTimeout(this.update.bind(this), 200);
    }
  }, {
    key: 'getMusicVolume',
    value: function getMusicVolume() {
      return game.sound.musicVolume;
    }
  }, {
    key: 'setMusicVolume',
    value: function setMusicVolume(value) {
      localStorage.setItem(game.data.storage.musicVolume, value);
      game.sounds.soundtrack.volume = value;
    }
  }, {
    key: 'getVolume',
    value: function getVolume() {
      return game.sound.volume;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(value) {
      localStorage.setItem(game.data.storage.effectsVolume, value);
      game.sound.volume = value;
      // game.sound.volume = 0
    }
  }, {
    key: 'getMute',
    value: function getMute() {
      return game.sound.mute;
    }
  }, {
    key: 'setMute',
    value: function setMute(value) {
      localStorage.setItem(game.data.storage.mute, value);
      game.sound.mute = value;

      if (value) {
        game.muteBtn.setFrames('shared/btn_muted', 'shared/btn_muted', 'shared/btn_muted', 'shared/btn_muted');
      } else {
        game.muteBtn.setFrames('shared/btn_unmuted', 'shared/btn_unmuted', 'shared/btn_unmuted', 'shared/btn_unmuted');
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 362 */
/*!*******************************************!*\
  !*** ./src/scripts/components/MuteBtn.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AvatarTracking = __webpack_require__(/*! ./AvatarTracking */ 48);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
	_inherits(_class, _Phaser$Group);

	function _class(game) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

		game.overlay = game.add.group();
		game.muteBtn = game.make.button(game.width - 77, 78, game.data.sheet.spritesheet, null, null, 'shared/btn_muted', 'shared/btn_muted', 'shared/btn_muted', 'shared/btn_muted');
		game.muteBtn.anchor.setTo(0.5);
		game.muteBtn.scale.set(2);
		game.utils.addOverScaling.call(_this, game.muteBtn, 2.1);
		game.soundManager.setMute.call(_this, game.soundManager.getMute());
		game.overlay.add(game.muteBtn);
		// game.muteBtn.setSounds(game.sounds.over, null, game.sounds.click)
		game.muteBtn.onInputUp.add(_this.handleMuteClicked, _this);
		return _this;
	}

	_createClass(_class, [{
		key: 'handleMuteClicked',
		value: function handleMuteClicked(e, pointer, releasedOnButton) {
			if (!releasedOnButton) {
				return;
			}
			game.tracking.sendData(game.soundManager.getMute() ? _AvatarTracking.EVENT_CLICK_BUTTON_UNMUTE : _AvatarTracking.EVENT_CLICK_BUTTON_MUTE, [_AvatarTracking.DATA_STATE, game.state.current]);
			game.soundManager.setMute.call(this, !game.soundManager.getMute());

			if (!game.soundManager.getMute() && game.state.current === 'Game') {
				game.sounds.soundtrack.play(null, 0, 1, true);
			}
		}
	}]);

	return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 363 */
/*!***********************************************!*\
  !*** ./src/scripts/states/intro/IntroDora.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
	_inherits(_class, _Phaser$Group);

	function _class(game) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

		_this.x = game.world.centerX;
		_this.y = game.world.centerY;
		var doraOffsetH = 10;
		_this.dora0 = _this.add(game.make.sprite(doraOffsetH, 0, game.data.sheet.spritesheet, 'intro/dora'));
		_this.dora0.scale.set(2.2);
		_this.dora0.anchor.set(0.5);
		game.add.tween(_this.dora0).from({ alpha: 0 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(_this.dora0).from({ y: "+100" }, Phaser.Timer.SECOND * 3, Phaser.Easing.Quintic.Out, true);
		game.add.tween(_this.dora0.scale).to({ x: 2, y: 2 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Quadratic.Out, true);
		_this.dora1 = _this.add(game.make.sprite(0, 0, game.data.sheet.spritesheet, 'instructions/dora'));
		game.utils.anchorAll([_this.dora0, _this.dora1]);
		_this.dora1.scale.set(2);
		_this.dora1.anchor.set(0.5);
		_this.dora1.alpha = 0;
		game.add.existing(_this);
		game.add.tween(_this.dora0).to({ x: "-" + doraOffsetH }, Phaser.Timer.SECOND * 3, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
		return _this;
	}

	return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 364 */
/*!************************************************!*\
  !*** ./src/scripts/states/intro/IntroBoots.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
  _inherits(_class, _Phaser$Group);

  function _class(game) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    var monkey = _this.add(game.make.sprite(game.world.width * 155 / 1080, game.world.height * -100 / 1920, game.data.sheet.spritesheet, 'intro/monkey'));
    var upperArm = game.make.sprite(109, 260, game.data.sheet.spritesheet, "intro/monkey_upper_arm");
    var forearm = game.make.sprite(22, -3, game.data.sheet.spritesheet, "intro/monkey_forearm");
    monkey.scale.set(2.2);
    monkey.anchor.set(155 / 1080, -100 / 1920);
    upperArm.anchor.set(9 / 41, 12 / 25);
    forearm.anchor.set(10 / 52, 47 / 57);
    forearm.angle = -8;
    game.add.tween(upperArm).to({ angle: 20 }, Phaser.Timer.SECOND * 3.3234, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
    game.add.tween(forearm).to({ angle: 8 }, Phaser.Timer.SECOND * 1.848, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
    game.add.tween(_this).to({ angle: -3 }, Phaser.Timer.SECOND * 5.3234, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
    game.add.tween(monkey).from({ alpha: 0 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Quadratic.Out, true);
    game.add.tween(monkey).from({ y: "-20" }, Phaser.Timer.SECOND * 1, Phaser.Easing.Quadratic.Out, true);
    game.add.tween(monkey.scale).to({ x: 2, y: 2 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Back.Out, true);
    game.add.existing(_this);
    monkey.addChild(upperArm);
    upperArm.addChild(forearm);
    return _this;
  }

  return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 365 */
/*!***********************************************!*\
  !*** ./src/scripts/components/HtmlBgWisps.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

  _classCallCheck(this, _class);

  var container = document.querySelector('.wisp-container');

  for (var i = 0; i < count; i++) {
    var wisp = document.createElement('div');
    wisp.style.backgroundImage = 'url(assets/_html/bg_wisp.png)';
    wisp.classList.add("wisp");
    wisp.style.left = i * 100 / count + 'vh';
    wisp.style.width = wisp.style.height = game.rnd.realInRange(1, 3) + 'vh';
    wisp.style.webkitFilter = wisp.style.filter = 'hue-rotate(' + game.rnd.between(-15, 60) + 'deg)';
    wisp.style.top = game.rnd.between(100, 200) + 'vh';
    wisp.style.animation = game.rnd.between(40, 70) + 's linear infinite wisp-animation-float-up';
    container.appendChild(wisp);
  }
};

exports.default = _class;

/***/ }),
/* 366 */
/*!**********************************************!*\
  !*** ./src/scripts/states/game/GameState.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameTitle = __webpack_require__(/*! ./GameTitle */ 367);

var _GameTitle2 = _interopRequireDefault(_GameTitle);

var _GameCountdown = __webpack_require__(/*! ./GameCountdown */ 368);

var _GameCountdown2 = _interopRequireDefault(_GameCountdown);

var _GameScore = __webpack_require__(/*! ./GameScore */ 369);

var _GameScore2 = _interopRequireDefault(_GameScore);

var _GameParticles = __webpack_require__(/*! ./GameParticles */ 371);

var _GameParticles2 = _interopRequireDefault(_GameParticles);

var _GameBoard = __webpack_require__(/*! ./board/GameBoard */ 373);

var _GameBoard2 = _interopRequireDefault(_GameBoard);

var _LegalFooterText = __webpack_require__(/*! ../shared/legal/LegalFooterText */ 96);

var _LegalFooterText2 = _interopRequireDefault(_LegalFooterText);

var _AvatarTracking = __webpack_require__(/*! ../../components/AvatarTracking */ 48);

var _LegalOpenButton = __webpack_require__(/*! ../shared/legal/LegalOpenButton */ 95);

var _LegalOpenButton2 = _interopRequireDefault(_LegalOpenButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import GameFrame from "./GameFrame"


var _class = function (_Phaser$State) {
	_inherits(_class, _Phaser$State);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "init",
		value: function init() {
			this.initSignals();
		}
	}, {
		key: "create",
		value: function create() {
			// new GameFrame(game)
			game.add.existing(game.overlay);
			new _GameTitle2.default(game);
			var legalFooterText = new _LegalFooterText2.default(game);
			new _LegalOpenButton2.default(game);
			this.board = new _GameBoard2.default(game);
			this.countMatch3 = 0;
			this.countMatch4 = 0;
			this.countMatch5 = 0;
			this.board.signalMatch.add(this.handleMatch, this);
			this.countdown = new _GameCountdown2.default(game);
			this.countdown.signalCountdownCompleted.addOnce(this.handleCountdownCompleted, this);
			this.score = new _GameScore2.default(game);
			this.particles = new _GameParticles2.default(game, this.board.playArea);
			game.sounds.soundtrack.restart('', 0, 1, true);
			this.playbackRate = game.sounds.soundtrack._sound.playbackRate;
			this.maxTime = Phaser.Timer.SECOND * game.data.game.maxSeconds;
			this.musicSpeedup = this.maxTime * 0.5;
			game.add.tween(game.sounds.soundtrack).to({ volume: game.soundManager.getMute() ? 0 : 1 }, Phaser.Timer.SECOND, Phaser.Easing.Quadratic.InOut, true);
		}
	}, {
		key: "update",
		value: function update(t, dt) {
			this.score.update();
			this.playbackRate.value = this.getPlaybackRate();
		}
	}, {
		key: "shutdown",
		value: function shutdown() {
			game.world.remove(game.overlay);
			this.playbackRate.value = 1;
		}
	}, {
		key: "getPlaybackRate",
		value: function getPlaybackRate() {
			var playbackRate = 1 + (this.countdown.timeRemaining > this.musicSpeedup ? 0 : (1 - this.countdown.timeRemaining / this.musicSpeedup) * 0.35);
			return playbackRate;
		}
	}, {
		key: "initSignals",
		value: function initSignals() {
			game.signals = {
				onParticleBurstRequested: new Phaser.Signal(),
				addCurrentMovePoints: new Phaser.Signal(),
				addMultiplier: new Phaser.Signal(),
				requestScoreUpdate: new Phaser.Signal()
			};
		}
	}, {
		key: "handleMatch",
		value: function handleMatch(count) {
			this['countMatch' + count]++;
		}
	}, {
		key: "handleCountdownCompleted",
		value: function handleCountdownCompleted() {
			game.tracking.sendData(_AvatarTracking.EVENT_GAME_COMPLETED, [[_AvatarTracking.DATA_SCORE, ~~game.data.score], [_AvatarTracking.DATA_MULTIPLIER, ~~this.score.multiplier.value], [_AvatarTracking.DATA_COUNT_MATCH_3, ~~this.countMatch3], [_AvatarTracking.DATA_COUNT_MATCH_4, ~~this.countMatch4], [_AvatarTracking.DATA_COUNT_MATCH_5, ~~this.countMatch5]]);

			game.state.start('Summary');
		}
	}]);

	return _class;
}(Phaser.State);

exports.default = _class;

/***/ }),
/* 367 */
/*!**********************************************!*\
  !*** ./src/scripts/states/game/GameTitle.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
    _inherits(_class, _Phaser$Group);

    function _class(game) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

        var tt = _this.add(game.make.sprite(game.world.centerX, 0, 'shared/tt'));
        tt.anchor.set(0.5, 0);
        game.add.tween(tt).from({ alpha: 0 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Quadratic.Out, true);
        game.add.tween(tt.scale).from({ x: 0.75, y: 0.75 }, Phaser.Timer.SECOND * 4, Phaser.Easing.Elastic.Out, true);
        return _this;
    }

    return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 368 */
/*!**************************************************!*\
  !*** ./src/scripts/states/game/GameCountdown.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COUNTDOWN_COMPLETE = exports.COUNTDOWN_COMPLETE = 'COUNTDOWN_COMPLETE';

var _class = function (_Phaser$Group) {
  _inherits(_class, _Phaser$Group);

  function _class(game) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    _this.signalCountdownCompleted = new Phaser.Signal();
    _this.bg = game.make.sprite(game.world.centerX, game.world.centerY, 'game/frame_time');
    _this.bg.anchor.set(0.5);

    _this.text = game.make.text(game.world.width * 0.26, game.world.height * 0.242, '1:00', {
      font: '48px Londrina Solid',
      fill: '#351206',
      shadowColor: '#dc632b',
      shadowOffsetX: -1,
      shadowOffsetY: 1
    });
    _this.text2 = game.make.text(game.world.width * 0.26, game.world.height * 0.243, '1:00', {
      font: '48px Londrina Solid',
      fill: '#fe7f36'
    });

    game.utils.anchorAll([_this.text, _this.text2]);
    _this.text2.align = _this.text.align = 'center';
    _this.timeRemaining = Phaser.Timer.SECOND * game.data.game.maxSeconds;

    game.add.tween(_this).from({ y: '+' + game.height }, Phaser.Timer.SECOND, Phaser.Easing.Quintic.Out, true);
    _this.add(_this.bg);
    _this.add(_this.text2);
    _this.add(_this.text);
    game.add.existing(_this);
    return _this;
  }

  _createClass(_class, [{
    key: 'update',
    value: function update() {
      this.timeRemaining -= game.time.elapsedMS;
      var sec = ~~(this.timeRemaining / 1000);

      if (sec >= 60) {
        this.text2.text = this.text.text = '1:00';
      } else if (sec >= 10) {
        this.text2.text = this.text.text = '0:' + sec;
      } else if (sec >= 0) {
        this.text2.text = this.text.text = '0:0' + sec;
      } else {
        this.text2.text = this.text.text = '0:00';
        this.signalCountdownCompleted.dispatch(COUNTDOWN_COMPLETE);
      }
    }
  }]);

  return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 369 */
/*!**********************************************!*\
  !*** ./src/scripts/states/game/GameScore.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameMultiplier = __webpack_require__(/*! ./GameMultiplier */ 370);

var _GameMultiplier2 = _interopRequireDefault(_GameMultiplier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
	_inherits(_class, _Phaser$Group);

	function _class(game) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

		_this.bg = game.make.sprite(game.world.centerX, game.world.centerY, 'game/frame_score');
		_this.bg.anchor.set(0.5);
		_this.text = game.make.text(game.world.width * 0.74, game.world.height * 0.24, '0', {
			font: '48px Londrina Solid',
			fill: '#c56d26',
			shadowColor: '#a35924',
			shadowOffsetX: -1,
			shadowOffsetY: 1
		});
		_this.text2 = game.make.text(game.world.width * 0.738, game.world.height * 0.2415, '0', {
			font: '48px Londrina Solid',
			fill: '#f3df02'
		});

		game.utils.anchorAll([_this.text, _this.text2]);
		_this.text.align = _this.text2.align = 'center';
		_this.multiplier = new _GameMultiplier2.default(game);
		_this.currentMovePoints = 0;
		game.data.score = _this.displayedScore = 0;
		_this.scoreTemplate = game.localize('gameScore');
		game.add.tween(_this).from({ y: '+' + game.height }, Phaser.Timer.SECOND, Phaser.Easing.Quintic.Out, true);
		game.signals.addCurrentMovePoints.add(_this.handleAddCurrentMovePoints, _this);
		game.signals.requestScoreUpdate.add(_this.handleRequestScoreUpdate, _this);
		_this.add(_this.bg);
		_this.add(_this.text2);
		_this.add(_this.text);
		game.add.existing(_this);
		return _this;
	}

	_createClass(_class, [{
		key: 'update',
		value: function update() {
			this.displayedScore += (game.data.score - this.displayedScore) * (game.time.elapsedMS / 200);
			this.text.text = this.text2.text = (~~this.displayedScore).toLocaleString();
		}
	}, {
		key: 'handleAddCurrentMovePoints',
		value: function handleAddCurrentMovePoints(points) {
			this.currentMovePoints += points;
		}
	}, {
		key: 'handleRequestScoreUpdate',
		value: function handleRequestScoreUpdate() {
			this.updatePoints();
		}
	}, {
		key: 'updatePoints',
		value: function updatePoints() {
			this.addPoints(this.currentMovePoints);
			this.currentMovePoints = 0;
		}
	}, {
		key: 'addPoints',
		value: function addPoints(points) {
			game.data.score += points * this.multiplier.value;
		}
	}]);

	return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 370 */
/*!***************************************************!*\
  !*** ./src/scripts/states/game/GameMultiplier.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
  _inherits(_class, _Phaser$Group);

  function _class(game) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    _this.bg = game.make.sprite(game.world.centerX, game.world.centerY, game.data.sheet.spritesheet, 'game/frame_multiplier');
    _this.bg.anchor.set(0.5);

    _this.text = game.make.text(game.world.centerX, game.world.height * 0.24, '1x', {
      font: '38px Londrina Solid',
      fill: '#224937',
      shadowColor: '#274d3c',
      shadowOffsetX: -1,
      shadowOffsetY: 1
    });
    _this.text2 = game.make.text(game.world.centerX, game.world.height * 0.2407, '1x', {
      font: '38px Londrina Solid',
      fill: '#89febb'
    });

    game.utils.anchorAll([_this.text, _this.text2]);
    _this.text.align = _this.text2.align = 'center';
    _this.value = 1;
    _this.multiplierDecaySpeed = game.data.game.multiplierDecaySpeed;
    _this.strTemplate = game.localize('gameMultiplier');
    _this.timeStarted = game.time.now;
    game.add.tween(_this).from({ y: '+' + game.height }, Phaser.Timer.SECOND, Phaser.Easing.Quintic.Out, true);
    game.signals.addMultiplier.add(_this.handleAddMultiplier, _this);
    _this.add(_this.bg);
    _this.add(_this.text2);
    _this.add(_this.text);
    game.add.existing(_this);
    return _this;
  }

  _createClass(_class, [{
    key: 'handleAddMultiplier',
    value: function handleAddMultiplier(value) {
      this.value += value;
    }
  }, {
    key: 'update',
    value: function update() {
      this.value = Math.max(1.0, this.value - this.value * game.time.physicsElapsed * this.multiplierDecaySpeed);
      this.text.text = this.text2.text = this.strTemplate.replace('${multiplier}', Math.round(this.value * 10) / 10 + (Math.round(this.value * 10) % 10 === 0 ? '.0' : ''));
    }
  }]);

  return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 371 */
/*!**************************************************!*\
  !*** ./src/scripts/states/game/GameParticles.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ParticleSystem = __webpack_require__(/*! ../../components/ParticleSystem */ 372);

var _ParticleSystem2 = _interopRequireDefault(_ParticleSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(game) {
        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, _class);

        game.signals.onParticleBurstRequested.add(this.requestBurst, this);
        this.system = new _ParticleSystem2.default(game);
        this.group = this.system.particlesGroup;
        if (parent) {
            parent.add(this.group);
        }
    }

    _createClass(_class, [{
        key: "requestBurst",
        value: function requestBurst(x, y) {
            this.system.requestBurst(x, y);
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 372 */
/*!**************************************************!*\
  !*** ./src/scripts/components/ParticleSystem.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(game) {
        var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var distance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;
        var particlesMax = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2000;
        var sprites = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ['shared/particle_0', 'shared/particle_1', 'shared/particle_2', 'shared/particle_3'];

        _classCallCheck(this, _class);

        var tileSize = game.data.game.tileSize;
        var halfTileSize = tileSize * 0.5;
        var halfPlayAreaWidth = game.data.game.fieldCols * halfTileSize;
        var halfPlayAreaHeight = game.data.game.fieldRows * halfTileSize;
        this.radius = radius;
        this.distance = distance;
        this.particlesMax = particlesMax;
        this.sprites = sprites;
        this.particlesPool = [];
        this.particlesGroup = game.make.group();
        this.particlesGroup.x = -halfPlayAreaWidth - halfTileSize;
        this.particlesGroup.y = -halfPlayAreaHeight - halfTileSize;
        this.particleSpawnCircle = new Phaser.Circle(0, 0, this.radius);

        for (var i = 0; i < this.particlesMax; i++) {
            var particle = game.add.sprite(0, 0, game.data.sheet.spritesheet, game.rnd.pick(this.sprites));
            particle.anchor.set(0.5);
            particle.blendMode = Phaser.blendModes.ADD;
            particle.alpha = 0;
            particle.scale.set(game.rnd.realInRange(0.3, 0.5));
            this.particlesPool.push(particle);
            this.particlesGroup.add(particle);
        }
    }

    _createClass(_class, [{
        key: 'requestBurst',
        value: function requestBurst(x, y) {
            var _this = this;

            var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 70;

            if (!game.device.desktop) {
                return;
            }

            for (var i = 0; i < count; i++) {
                if (this.particlesPool.length <= 0) {
                    return;
                }

                var p = this.particlesPool.splice(0, 1)[0];
                var period = Phaser.Timer.SECOND * game.rnd.realInRange(0.4, 1.2);

                this.particleSpawnCircle.random(p);
                p.x += x;
                p.y += y;
                p.alpha = 0;

                game.add.tween(p).to({ x: p.x + game.rnd.realInRange(-this.distance, this.distance), y: p.y + game.rnd.realInRange(-this.distance, this.distance) }, period, Phaser.Easing.Quadratic.Out, true);
                game.add.tween(p).to({ angle: game.rnd.realInRange(-1024, 1024) }, period, Phaser.Easing.Linear.None, true);
                game.add.tween(p).to({ alpha: 1 }, period * 0.3, Phaser.Easing.Quadratic.Out).to({ alpha: 0 }, period * 0.5, Phaser.Easing.Linear.None, true, period * 0.2).onComplete.add(function (p) {
                    _this.particlesPool.push(p);
                });
            }
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 373 */
/*!****************************************************!*\
  !*** ./src/scripts/states/game/board/GameBoard.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import GameLineExplosion from "./GameLineExplosion"


var _GameCircleExplosion = __webpack_require__(/*! ./GameCircleExplosion */ 374);

var _GameCircleExplosion2 = _interopRequireDefault(_GameCircleExplosion);

var _GameSuggestion = __webpack_require__(/*! ./GameSuggestion */ 375);

var _GameSuggestion2 = _interopRequireDefault(_GameSuggestion);

var _GameVerticalExplosion = __webpack_require__(/*! ./GameVerticalExplosion */ 376);

var _GameVerticalExplosion2 = _interopRequireDefault(_GameVerticalExplosion);

var _GameHorizontalExplosion = __webpack_require__(/*! ./GameHorizontalExplosion */ 377);

var _GameHorizontalExplosion2 = _interopRequireDefault(_GameHorizontalExplosion);

var _GameExplosionMatch = __webpack_require__(/*! ./GameExplosionMatch3 */ 378);

var _GameExplosionMatch2 = _interopRequireDefault(_GameExplosionMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
	function _class(game) {
		var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		_classCallCheck(this, _class);

		this.signalMatch = new Phaser.Signal();
		this.fastFall = true;
		this.gameArray = [];
		// this.bgArray = []
		this.removeMap = [];
		this.canPick = true;
		this.tweenCount = 0;
		this.tileSize = game.data.game.tileSize;
		this.halfTileSize = this.tileSize * 0.5;
		this.bgGroup = null;
		this.tileGroup = null;
		this.selectedTile = null;
		this.timeStarted = null;
		this.halfPlayAreaWidth = game.data.game.fieldCols * this.tileSize * 0.5;
		this.halfPlayAreaHeight = game.data.game.fieldRows * this.tileSize * 0.5;
		this.drawField();
		this.initInput();
		this.suggestion = new _GameSuggestion2.default(this);
		this.suggestion.request();
		game.add.tween(this.playArea).from({ y: '+' + game.height }, Phaser.Timer.SECOND, Phaser.Easing.Quintic.Out, true);
	}

	_createClass(_class, [{
		key: "initInput",
		value: function initInput() {
			this.canPick = true;
			game.input.onDown.add(this.tileSelect, this);
			game.input.onUp.add(this.tileDeselect, this);
		}
	}, {
		key: "handleNoRemainingMatches",
		value: function handleNoRemainingMatches() {
			game.sounds.no_moves.play();
			this.destroyTiles(true);
		}
	}, {
		key: "drawField",
		value: function drawField() {
			this.playArea = game.add.group();
			this.playArea.x = game.world.centerX;
			this.playArea.y = game.world.height * 0.625;
			this.bgGroup = game.make.group();
			this.bgGroup.x = -this.halfPlayAreaWidth;
			this.bgGroup.y = -this.halfPlayAreaHeight;
			this.tileGroup = game.make.group();
			this.tileGroup.x = -this.halfPlayAreaWidth;
			this.tileGroup.y = -this.halfPlayAreaHeight;
			game.utils.groupAdd(this.playArea, [this.bgGroup, this.tileGroup]);

			for (var i = 0; i < game.data.game.fieldRows; i++) {
				this.gameArray[i] = [];
				// this.bgArray[i] = []

				for (var j = 0; j < game.data.game.fieldCols; j++) {
					// const bg = game.add.sprite(this.tileSize * j + this.halfTileSize, this.tileSize * i + this.halfTileSize + 10, game.data.sheet.spritesheet, 'game_sprites/bg_tile')
					// bg.tint = 0x78bfea
					// bg.scale.set(2)
					// game.add.tween(bg.scale).from({ x: game.rnd.realInRange(0.1, 0.8), y: game.rnd.realInRange(0.1, 0.8) }, Phaser.Timer.SECOND * game.rnd.realInRange(0.5, 1.5), Phaser.Easing.Elastic.Out, true)
					// bg.anchor.set(0.5)
					// this.bgGroup.add(bg)
					var tile = game.add.sprite(this.tileSize * j + this.halfTileSize, this.tileSize * i + this.halfTileSize, game.data.sheet.spritesheet);
					tile.scale.set(1.1);
					tile.inputEnabled = true;
					tile.input.useHandCursor = true;
					game.add.tween(tile).from({ y: '-100' }, Phaser.Timer.SECOND * game.rnd.realInRange(0.5, 0.8), Phaser.Easing.Bounce.Out, true);
					tile.anchor.set(0.5);
					this.tileGroup.add(tile);

					do {
						var randomColor = game.rnd.between(0, game.data.game.tileColors - 1);
						tile.frameName = 'tiles/tile_' + randomColor;
						// tile.angle = game.rnd.realInRange(-5, 5)
						// this.bgArray[i][j] = bg
						this.gameArray[i][j] = { tileColor: randomColor, tileSprite: tile };
					} while (this.isMatch(i, j));
				}
			}

			this.selectedTile = null;
		}
	}, {
		key: "isInPlayArea",
		value: function isInPlayArea(x, y) {
			return x >= this.playArea.x - this.halfPlayAreaWidth && y >= this.playArea.y - this.halfPlayAreaHeight && x < this.playArea.x + this.halfPlayAreaWidth && y < this.playArea.y + this.halfPlayAreaHeight;
		}
	}, {
		key: "tileSelect",
		value: function tileSelect(e) {
			if (!this.canPick || !this.isInPlayArea(e.x, e.y) || this.tweenCount > 0) {
				return;
			}

			var row = ~~((game.input.y - this.playArea.y + this.halfPlayAreaHeight) / this.tileSize);
			var col = ~~((game.input.x - this.playArea.x + this.halfPlayAreaWidth) / this.tileSize);
			var pickedTile = this.tileAt(row, col);
			this.suggestion.stopHints();

			if (pickedTile !== -1) {
				if (this.selectedTile == null) {
					game.add.tween(pickedTile.tileSprite.scale).to({ x: 1.2, y: 1.2 }, Phaser.Timer.SECOND * 0.15, Phaser.Easing.Back.Out, true);
					pickedTile.tileSprite.bringToTop();
					this.selectedTile = pickedTile;
					game.input.addMoveCallback(this.tileMove, this);
				} else {
					if (this.areTheSame(pickedTile, this.selectedTile)) {
						game.add.tween(pickedTile.tileSprite.scale).to({ x: 1.1, y: 1.1 }, Phaser.Timer.SECOND * 0.15, Phaser.Easing.Back.Out, true);
						this.selectedTile = null;
					} else {
						if (this.areNext(pickedTile, this.selectedTile)) {
							game.add.tween(this.selectedTile.tileSprite.scale).to({ x: 1.1, y: 1.1 }, Phaser.Timer.SECOND * 0.15, Phaser.Easing.Back.Out, true);
							this.swapTiles(this.selectedTile, pickedTile, true);
						} else {
							game.add.tween(this.selectedTile.tileSprite.scale).to({ x: 1.1, y: 1.1 }, Phaser.Timer.SECOND * 0.15, Phaser.Easing.Back.Out, true);
							game.add.tween(pickedTile.tileSprite.scale).to({ x: 1.2, y: 1.2 }, Phaser.Timer.SECOND * 0.15, Phaser.Easing.Back.Out, true);
							this.selectedTile = pickedTile;
							game.input.addMoveCallback(this.tileMove, this);
						}
					}
				}
			}
		}
	}, {
		key: "tileDeselect",
		value: function tileDeselect(e) {
			game.input.deleteMoveCallback(this.tileMove, this);
		}
	}, {
		key: "tileMove",
		value: function tileMove(event, pX, pY) {
			if (typeof this.selectedTile === 'undefined' || this.selectedTile === null || event.id !== 0 && event.id !== 1) {
				return;
			}

			var distX = game.input.x - this.playArea.x + this.halfPlayAreaWidth - this.selectedTile.tileSprite.x;
			var distY = game.input.y - this.playArea.y + this.halfPlayAreaHeight - this.selectedTile.tileSprite.y;
			var deltaRow = 0;
			var deltaCol = 0;

			if (Math.abs(distX) > this.halfTileSize) {
				if (distX > 0) {
					deltaCol = 1;
				} else {
					deltaCol = -1;
				}
			} else {
				if (Math.abs(distY) > this.halfTileSize) {
					if (distY > 0) {
						deltaRow = 1;
					} else {
						deltaRow = -1;
					}
				}
			}

			if (deltaRow + deltaCol === 0) {
				return;
			}

			var pickedTile = this.tileAt(this.getTileRow(this.selectedTile) + deltaRow, this.getTileCol(this.selectedTile) + deltaCol);

			if (pickedTile !== -1 && this.selectedTile !== null && this.pickedTile !== null) {
				this.suggestion.stopHints();
				this.suggestion.cancel();
				game.add.tween(this.selectedTile.tileSprite.scale).to({ x: 1.1, y: 1.1 }, Phaser.Timer.SECOND * 0.15, Phaser.Easing.Back.Out, true);
				this.swapTiles(this.selectedTile, pickedTile, true);
				game.input.deleteMoveCallback(this.tileMove, this);
			}
		}
	}, {
		key: "swapTiles",
		value: function swapTiles(tile1, tile2, swapBack) {
			var _this = this;

			if (!tile1 || !tile2) {
				return;
			}

			this.canPick = false;
			var fromColor = tile1.tileColor;
			var fromSprite = tile1.tileSprite;
			var toColor = tile2.tileColor;
			var toSprite = tile2.tileSprite;
			var tile1Row = this.getTileRow(tile1);
			var tile1Col = this.getTileCol(tile1);
			var tileA = this.gameArray[tile1Row][tile1Col];
			var tile2Row = this.getTileRow(tile2);
			var tile2Col = this.getTileCol(tile2);
			var tileB = this.gameArray[tile2Row][tile2Col];

			if (tileA === null || tileB === null) {
				return;
			}

			this.suggestion.cancel();
			this.gameArray[this.getTileRow(tile1)][this.getTileCol(tile1)].tileColor = toColor;
			this.gameArray[this.getTileRow(tile1)][this.getTileCol(tile1)].tileSprite = toSprite;
			this.gameArray[this.getTileRow(tile2)][this.getTileCol(tile2)].tileColor = fromColor;
			this.gameArray[this.getTileRow(tile2)][this.getTileCol(tile2)].tileSprite = fromSprite;
			this.tweenCount++;

			game.add.tween(this.gameArray[this.getTileRow(tile1)][this.getTileCol(tile1)].tileSprite).to({
				x: this.getTileCol(tile1) * this.tileSize + this.tileSize / 2,
				y: this.getTileRow(tile1) * this.tileSize + this.tileSize / 2
			}, game.data.game.swapSpeed, Phaser.Easing.Quadratic.Out, true);

			var tile2Tween = game.add.tween(this.gameArray[this.getTileRow(tile2)][this.getTileCol(tile2)].tileSprite).to({
				x: this.getTileCol(tile2) * this.tileSize + this.halfTileSize,
				y: this.getTileRow(tile2) * this.tileSize + this.halfTileSize
			}, game.data.game.swapSpeed, Phaser.Easing.Quadratic.Out, true);

			tile2Tween.onComplete.add(function () {
				_this.tweenCount--;

				if (swapBack && !_this.matchInBoard()) {
					_this.swapTiles(tile1, tile2, false);
				} else {
					if (_this.matchInBoard()) {
						_this.handleMatches();
					} else {
						_this.canPick = true;
						_this.selectedTile = null;
					}
				}
			});

			if (!swapBack) {
				game.sounds.wrong.play();
			}

			// game.sounds[swapBack ? 'swap' : 'wrong'].play()
		}
	}, {
		key: "areNext",
		value: function areNext(tile1, tile2) {
			return Math.abs(this.getTileRow(tile1) - this.getTileRow(tile2)) + Math.abs(this.getTileCol(tile1) - this.getTileCol(tile2)) === 1;
		}
	}, {
		key: "areTheSame",
		value: function areTheSame(tile1, tile2) {
			return this.getTileRow(tile1) === this.getTileRow(tile2) && this.getTileCol(tile1) === this.getTileCol(tile2);
		}
	}, {
		key: "tileAt",
		value: function tileAt(row, col) {
			if (row < 0 || row >= game.data.game.fieldRows || col < 0 || col >= game.data.game.fieldCols) {
				return -1;
			}

			return this.gameArray[row][col];
		}
	}, {
		key: "getTileRow",
		value: function getTileRow(tile) {
			return ~~(tile.tileSprite.y / this.tileSize);
		}
	}, {
		key: "getTileCol",
		value: function getTileCol(tile) {
			return ~~(tile.tileSprite.x / this.tileSize);
		}
	}, {
		key: "isHorizontalMatch",
		value: function isHorizontalMatch(row, col) {
			this.a = this.tileAt(row, col);
			this.b = this.tileAt(row, col - 1);
			this.c = this.tileAt(row, col - 2);

			if (this.a === null || this.b === null || this.c === null) {
				return false;
			}

			return this.a.tileColor === this.b.tileColor && this.a.tileColor === this.c.tileColor;
		}
	}, {
		key: "isVerticalMatch",
		value: function isVerticalMatch(row, col) {
			this.a = this.tileAt(row, col);
			this.b = this.tileAt(row - 1, col);
			this.c = this.tileAt(row - 2, col);

			if (this.a === null || this.b === null || this.c === null) {
				return false;
			}

			return this.a.tileColor === this.b.tileColor && this.a.tileColor === this.c.tileColor;
		}
	}, {
		key: "isMatch",
		value: function isMatch(row, col) {
			return this.isHorizontalMatch(row, col) || this.isVerticalMatch(row, col);
		}
	}, {
		key: "matchInBoard",
		value: function matchInBoard() {
			for (var i = 0; i < game.data.game.fieldRows; i++) {
				for (var j = 0; j < game.data.game.fieldCols; j++) {
					if (this.isMatch(i, j)) {
						return true;
					}
				}
			}

			return false;
		}
	}, {
		key: "handleMatches",
		value: function handleMatches() {
			this.removeMap = [];

			for (var i = 0; i < game.data.game.fieldRows; i++) {
				this.removeMap[i] = [];

				for (var j = 0; j < game.data.game.fieldCols; j++) {
					this.removeMap[i].push(0);
				}
			}

			this.handleHorizontalMatches();
			this.handleVerticalMatches();
			game.signals.requestScoreUpdate.dispatch();
			this.destroyTiles();
		}
	}, {
		key: "handleVerticalMatches",
		value: function handleVerticalMatches() {
			for (var i = 0; i < game.data.game.fieldCols; i++) {
				var colorStreak = 1;
				var currentColor = -1;
				var startStreak = 0;

				for (var j = 0; j < game.data.game.fieldRows; j++) {
					if (this.tileAt(j, i).tileColor === currentColor) {
						colorStreak++;
					}

					if (this.tileAt(j, i).tileColor !== currentColor || j >= game.data.game.fieldRows - 1) {
						if (colorStreak >= 3) {
							var pieceCount = 0;
							this.signalMatch.dispatch(colorStreak);

							switch (colorStreak) {
								case 3:
									for (var k = 0; k < colorStreak; k++) {
										this.removeMap[startStreak + k][i]++;
									}

									game.soundManager.requestSound('match_3');
									game.signals.addCurrentMovePoints.dispatch(game.data.game.match3.points);
									game.signals.addMultiplier.dispatch(game.data.game.match3.multiplier);
									new _GameExplosionMatch2.default(this, i, j - (j >= game.data.game.fieldRows - 1 && this.tileAt(j, i).tileColor === currentColor ? 1 : 2), true);
									break;
								case 4:
									for (var _k = 0; _k < game.data.game.fieldRows; _k++) {
										this.removeMap[_k][i]++;
										pieceCount++;
										new _GameCircleExplosion2.default(this, _k, i);
									}

									game.soundManager.requestSound('match_4');
									game.signals.addCurrentMovePoints.dispatch(game.data.game.match4.points * pieceCount);
									game.signals.addMultiplier.dispatch(game.data.game.match4.multiplier);
									new _GameVerticalExplosion2.default(this, i);
									break;
								default:
									for (var _k2 = 0; _k2 < game.data.game.fieldRows; _k2++) {
										for (var l = 0; l < game.data.game.fieldCols; l++) {
											if (this.tileAt(_k2, l).tileColor === currentColor) {
												this.removeMap[_k2][l]++;
												pieceCount++;
												new _GameCircleExplosion2.default(this, _k2, l, 1, 0xffcc88);
												new _GameCircleExplosion2.default(this, _k2, l, 1, 0xffcc88);
												new _GameCircleExplosion2.default(this, _k2, l, 1, 0xffcc88);
											}
										}
									}

									game.soundManager.requestSound('match_5');
									game.signals.addCurrentMovePoints.dispatch(game.data.game.match5.points * pieceCount);
									game.signals.addMultiplier.dispatch(game.data.game.match5.multiplier);
									break;
							}
						}

						startStreak = j;
						colorStreak = 1;
						currentColor = this.tileAt(j, i).tileColor;
						game.time.events.add(Phaser.Timer.SECOND * 0.35, function () {
							game.camera.shake(0.005, 50);
						}, this);
					}
				}
			}
		}
	}, {
		key: "handleHorizontalMatches",
		value: function handleHorizontalMatches() {
			for (var i = 0; i < game.data.game.fieldRows; i++) {
				var colorStreak = 1;
				var currentColor = -1;
				var startStreak = 0;

				for (var j = 0; j < game.data.game.fieldCols; j++) {
					if (this.tileAt(i, j).tileColor === currentColor) {
						colorStreak++;
					}

					if (this.tileAt(i, j).tileColor !== currentColor || j >= game.data.game.fieldCols - 1) {
						if (colorStreak >= 3) {
							game.sounds[colorStreak === 3 ? 'match_3' : 'match_4'].play();
							this.signalMatch.dispatch(colorStreak);
							var pieceCount = 0;

							switch (colorStreak) {
								case 3:
									for (var k = 0; k < colorStreak; k++) {
										this.removeMap[i][startStreak + k]++;
									}

									game.signals.addCurrentMovePoints.dispatch(game.data.game.match3.points);
									game.signals.addMultiplier.dispatch(game.data.game.match3.multiplier);
									new _GameExplosionMatch2.default(this, j - (j >= game.data.game.fieldCols - 1 && this.tileAt(i, j).tileColor === currentColor ? 1 : 2), i, false);
									break;
								case 4:
									for (var _k3 = 0; _k3 < game.data.game.fieldCols; _k3++) {
										this.removeMap[i][_k3]++;
										pieceCount++;
										new _GameCircleExplosion2.default(this, i, _k3);
									}

									game.signals.addCurrentMovePoints.dispatch(game.data.game.match4.points * pieceCount);
									game.signals.addMultiplier.dispatch(game.data.game.match4.multiplier);
									new _GameHorizontalExplosion2.default(this, i);
									break;
								default:
									for (var _k4 = 0; _k4 < game.data.game.fieldRows; _k4++) {
										for (var l = 0; l < game.data.game.fieldCols; l++) {
											if (this.tileAt(_k4, l).tileColor === currentColor) {
												this.removeMap[_k4][l]++;
												pieceCount++;
												new _GameCircleExplosion2.default(this, _k4, l, 1, 0xffcc88);
												new _GameCircleExplosion2.default(this, _k4, l, 1, 0xffcc88);
												new _GameCircleExplosion2.default(this, _k4, l, 1, 0xffcc88);
											}
										}
									}

									game.signals.addCurrentMovePoints.dispatch(game.data.game.match5.points * pieceCount);
									game.signals.addMultiplier.dispatch(game.data.game.match5.multiplier);
									break;
							}
						}

						startStreak = j;
						colorStreak = 1;
						currentColor = this.tileAt(i, j).tileColor;
					}
				}
			}
		}
	}, {
		key: "destroyTiles",
		value: function destroyTiles(destroyAll) {
			var _this2 = this;

			var destroyed = 0;
			this.suggestion.cancel();

			for (var i = 0, il = game.data.game.fieldRows; i < il; i++) {
				for (var j = 0, jl = game.data.game.fieldCols; j < jl; j++) {
					if (destroyAll || this.removeMap[i][j] > 0) {
						this.tweenCount++;
						var tint = { color: 0x78bfea };
						var target = this.gameArray[i][j];

						game.add.tween(tint).to({ color: 0x492f92 }, game.data.game.destroySpeed * 0.3, Phaser.Easing.Quintic.Out).to({ color: 0x78bfea }, game.data.game.destroySpeed * 0.7, Phaser.Easing.Quadratic.InOut, true);
						// .onUpdateCallback((tt, progress, tweenData) => {
						// 	target.tint = Phaser.Color.interpolateColor(tweenData.vStart.color, tweenData.vEnd.color, 1, progress)
						// })
						// .onComplete.add(() => { target.tint = 0x78bfea })

						// game.add.tween(this.bgArray[i][j].scale)
						// 	.to({ x: 2.4, y: 2.4 }, game.data.game.destroySpeed * 0.5, Phaser.Easing.Quadratic.Out)
						// 	.to({ x: 2, y: 2 }, game.data.game.destroySpeed * 0.5, Phaser.Easing.Quadratic.In, true)

						game.add.tween(this.gameArray[i][j].tileSprite.scale).to({ x: 1.5, y: 1.5 }, game.data.game.destroySpeed, Phaser.Easing.Bounce.In, true);

						var destroyTween = game.add.tween(this.gameArray[i][j].tileSprite).to({ alpha: 0 }, game.data.game.destroySpeed, Phaser.Easing.Linear.None, true);

						destroyTween.onComplete.add(function (tile) {
							tile.destroy();
							destroyed--;
							_this2.tweenCount--;

							if (destroyed === 0) {
								_this2.makeTilesFall();

								if (_this2.fastFall) {
									_this2.replenishField();
								}
							}
						});

						if (!destroyAll) {
							game.signals.onParticleBurstRequested.dispatch(target.tileSprite.x + this.halfTileSize, target.tileSprite.y + this.tileSize * 0.55);
						}

						destroyed++;
						this.gameArray[i][j] = null;
					}
				}
			}
		}
	}, {
		key: "makeTilesFall",
		value: function makeTilesFall() {
			this.suggestion.cancel();
			var fallen = 0;
			var restart = false;

			for (var i = game.data.game.fieldRows - 2; i >= 0; i--) {
				for (var j = 0; j < game.data.game.fieldCols; j++) {
					if (this.gameArray[i][j] != null) {
						var fallTiles = this.holesBelow(i, j);

						if (fallTiles > 0) {
							if (!this.fastFall && fallTiles > 1) {
								fallTiles = 1;
								restart = true;
							}

							this.tweenCount++;

							var tileTween = game.add.tween(this.gameArray[i][j].tileSprite).to({ y: this.gameArray[i][j].tileSprite.y + fallTiles * this.tileSize }, game.data.game.fallSpeed * fallTiles + game.data.game.fallSpeed * game.rnd.realInRange(0, 1), Phaser.Easing.Bounce.Out, true).onComplete.add(handleTileTweenComplete, this);

							fallen++;

							this.gameArray[i + fallTiles][j] = {
								tileSprite: this.gameArray[i][j].tileSprite,
								tileColor: this.gameArray[i][j].tileColor
							};

							this.gameArray[i][j] = null;
						}
					}
				}
			}

			if (fallen === 0) {
				this.replenishField();
			}

			function handleTileTweenComplete() {
				fallen--;
				this.tweenCount--;

				if (fallen === 0) {
					if (restart) {
						this.makeTilesFall();
					} else {
						if (!this.fastFall) {
							this.replenishField();
						}
					}
				}
			}
		}
	}, {
		key: "replenishField",
		value: function replenishField() {
			this.suggestion.cancel();
			var replenished = 0;
			var restart = false;

			for (var j = 0; j < game.data.game.fieldCols; j++) {
				var emptySpots = this.holesInCol(j);

				if (emptySpots > 0) {
					if (!this.fastFall && emptySpots > 1) {
						emptySpots = 1;
						restart = true;
					}

					for (var i = 0; i < emptySpots; i++) {
						var randomColor = game.rnd.between(0, game.data.game.tileColors - 1);
						var tile = game.make.sprite(this.tileSize * j + this.halfTileSize, this.tileSize * i + this.halfTileSize, game.data.sheet.spritesheet, 'tiles/tile_' + randomColor);

						tile.scale.set(1.1);
						tile.anchor.set(0.5);
						this.tileGroup.add(tile);
						tile.inputEnabled = true;
						tile.input.useHandCursor = true;
						// tile.angle = game.rnd.realInRange(-5, 5)
						this.gameArray[i][j] = { tileColor: randomColor, tileSprite: tile };
						this.tweenCount++;
						var tileTween = game.add.tween(tile).from({ y: tile.y - this.tileSize }, game.data.game.fallSpeed * game.rnd.realInRange(2, 4), Phaser.Easing.Bounce.Out, true);
						game.add.tween(tile).from({ alpha: 0 }, game.data.game.fallSpeed * 2, Phaser.Easing.Quadratic.Out, true);
						replenished++;
						tileTween.onComplete.add(handleTileTweenComplete, this);
					}
				}
			}

			function handleTileTweenComplete() {
				replenished--;
				this.tweenCount--;

				if (replenished === 0) {
					if (restart) {
						this.makeTilesFall();
					} else {
						if (this.matchInBoard()) {
							game.time.events.add(250, this.handleMatches, this);
						} else {
							this.canPick = true;
							this.selectedTile = null;
							this.suggestion.request();
						}
					}
				}
			}
		}
	}, {
		key: "holesBelow",
		value: function holesBelow(row, col) {
			var result = 0;

			for (var i = row + 1; i < game.data.game.fieldRows; i++) {
				if (this.gameArray[i][col] == null) {
					result++;
				}
			}

			return result;
		}
	}, {
		key: "holesInCol",
		value: function holesInCol(col) {
			var result = 0;

			for (var i = 0; i < game.data.game.fieldRows; i++) {
				if (this.gameArray[i][col] == null) {
					result++;
				}
			}

			return result;
		}
	}]);

	return _class;
}();

exports.default = _class;

/***/ }),
/* 374 */
/*!**************************************************************!*\
  !*** ./src/scripts/states/game/board/GameCircleExplosion.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(board, row, col) {
	var alpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.75;
	var tint = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0xffffff;

	_classCallCheck(this, _class);

	var explosion = game.make.sprite(col * board.tileSize - board.halfPlayAreaWidth + board.halfTileSize, row * board.tileSize - board.halfPlayAreaHeight + board.halfTileSize + 8, game.data.sheet.spritesheet, 'game/match_5');

	if (tint !== 0xffffff) {
		explosion.tint = tint;
	}

	explosion.blendMode = Phaser.blendModes.ADD;
	explosion.anchor.set(0.5, 0.53);
	explosion.scale.setTo(0.5);
	explosion.alpha = 0;
	// explosion.angle = board.gameArray[row][col].tileSprite.angle
	var animationDuration = Phaser.Timer.SECOND * game.rnd.realInRange(0.5, 0.75);
	var animationScaleTarget = game.rnd.realInRange(2, 2.2);
	explosion.angle = game.rnd.realInRange(0, 360);
	game.add.tween(explosion.scale).to({ x: animationScaleTarget, y: animationScaleTarget }, animationDuration, Phaser.Easing.Quadratic.Out, true);
	game.add.tween(explosion).to({ angle: game.rnd.pick(['-', '+']) + game.rnd.between(1, 30) }, animationDuration, Phaser.Easing.Linear.None, true);
	var alphaSequence = [1, 1, 1, 1, 0].map(function (a) {
		return a * alpha;
	});

	game.add.tween(explosion).to({ alpha: alphaSequence }, animationDuration, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function () {
		explosion.destroy();
		explosion = null;
	});

	board.playArea.add(explosion);
};

exports.default = _class;

/***/ }),
/* 375 */
/*!*********************************************************!*\
  !*** ./src/scripts/states/game/board/GameSuggestion.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(board) {
    _classCallCheck(this, _class);

    this.board = board;
  }

  _createClass(_class, [{
    key: "request",
    value: function request() {
      this.cancel();

      if (this.board.tweenCount <= 0 && this.board.matchInBoard()) {
        this.board.handleNoRemainingMatches();
      } else {
        this.timer = game.time.events.add(game.data.game.suggestionDelay, this.show, this);
      }
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this.timer) {
        game.time.events.remove(this.timer);
        this.timer = null;
      }
    }
  }, {
    key: "show",
    value: function show() {
      if (this.timer) {
        game.time.events.remove(this.timer);
        this.timer = null;
      }

      var matchFound = false;

      for (var i = 0, il = game.data.game.fieldRows - 1; i < il; i++) {
        for (var j = 0, jl = game.data.game.fieldCols - 1; j < jl; j++) {
          this.tmpSwap(i, j, i + 1, j);
          matchFound = this.board.matchInBoard();
          this.tmpSwap(i, j, i + 1, j);

          if (matchFound) {
            this.requestHint(this.board.gameArray[i][j].tileSprite, this.board.gameArray[i + 1][j].tileSprite);
            return;
          }

          this.tmpSwap(i, j, i, j + 1);
          matchFound = this.board.matchInBoard();
          this.tmpSwap(i, j, i, j + 1);

          if (matchFound) {
            this.requestHint(this.board.gameArray[i][j].tileSprite, this.board.gameArray[i][j + 1].tileSprite);
            return;
          }
        }
      }

      this.board.handleNoRemainingMatches();
    }
  }, {
    key: "requestHint",
    value: function requestHint(targetA, targetB) {
      this.stopHints();
      this.hintA = this.addHint(targetA);
      this.hintB = this.addHint(targetB);
    }
  }, {
    key: "addHint",
    value: function addHint(target) {
      return game.add.tween(target).delay(game.rnd.between(Phaser.Timer.SECOND, Phaser.Timer.SECOND * 3)).to({ y: "-5" }, game.rnd.between(50, 150), Phaser.Easing.Quintic.Out, false, Phaser.Timer.SECOND * game.rnd.realInRange(1, 5), game.rnd.realInRange(1, 3), true).repeatAll(-1).repeatDelay(game.rnd.between(Phaser.Timer.SECOND * 5, Phaser.Timer.SECOND * 10)).yoyo(true).start();
    }
  }, {
    key: "stopHints",
    value: function stopHints() {
      if (this.hintA && this.hintA.stop) {
        this.hintA.stop();
      }

      if (this.hintB && this.hintB.stop) {
        this.hintB.stop();
      }
    }
  }, {
    key: "tmpSwap",
    value: function tmpSwap(row1, col1, row2, col2) {
      var tmp = this.board.gameArray[row1][col1];
      this.board.gameArray[row1][col1] = this.board.gameArray[row2][col2];
      this.board.gameArray[row2][col2] = tmp;
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 376 */
/*!****************************************************************!*\
  !*** ./src/scripts/states/game/board/GameVerticalExplosion.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GameLineExplosion2 = __webpack_require__(/*! ./GameLineExplosion */ 136);

var _GameLineExplosion3 = _interopRequireDefault(_GameLineExplosion2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_GameLineExplosion) {
    _inherits(_class, _GameLineExplosion);

    function _class(board, index) {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, board, index, true));
    }

    return _class;
}(_GameLineExplosion3.default);

exports.default = _class;

/***/ }),
/* 377 */
/*!******************************************************************!*\
  !*** ./src/scripts/states/game/board/GameHorizontalExplosion.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GameLineExplosion2 = __webpack_require__(/*! ./GameLineExplosion */ 136);

var _GameLineExplosion3 = _interopRequireDefault(_GameLineExplosion2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_GameLineExplosion) {
    _inherits(_class, _GameLineExplosion);

    function _class(board, index) {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, board, index, false));
    }

    return _class;
}(_GameLineExplosion3.default);

exports.default = _class;

/***/ }),
/* 378 */
/*!**************************************************************!*\
  !*** ./src/scripts/states/game/board/GameExplosionMatch3.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(board, centerCol, centerRow, isVertical) {
  _classCallCheck(this, _class);

  var explosion = board.playArea.add(game.make.sprite(centerCol * board.tileSize - board.halfPlayAreaWidth + board.tileSize * 0.5, centerRow * board.tileSize - board.halfPlayAreaHeight + board.tileSize * 0.5, game.data.sheet.spritesheet, 'game/match_3'));

  explosion.blendMode = Phaser.blendModes.ADD;
  explosion.anchor.set(0.5);
  explosion.scale.set(0.5, -1);
  if (isVertical) {
    explosion.angle = 90;
  }
  var duration = Phaser.Timer.SECOND * 0.5;

  game.add.tween(explosion).from({ alpha: 0 }, duration * 0.15, Phaser.Easing.Quintic.Out).chain(game.add.tween(explosion).to({ alpha: 0 }, duration * 0.45, Phaser.Easing.Linear.None, false, duration * 0.4)).start();
  game.add.tween(explosion.scale).to({ x: 2.1 }, duration, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
    explosion.destroy();
    explosion = null;
  });
  game.add.tween(explosion.scale).to({ y: 2.8 }, duration * 0.15, Phaser.Easing.Quintic.Out).chain(game.add.tween(explosion.scale).to({ y: 0.0 }, duration * 0.85, Phaser.Easing.Quadratic.InOut)).start();
};

exports.default = _class;

/***/ }),
/* 379 */
/*!****************************************************!*\
  !*** ./src/scripts/states/summary/SummaryState.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SummaryBackground = __webpack_require__(/*! ./SummaryBackground */ 380);

var _SummaryBackground2 = _interopRequireDefault(_SummaryBackground);

var _SummaryTitle = __webpack_require__(/*! ./SummaryTitle */ 381);

var _SummaryTitle2 = _interopRequireDefault(_SummaryTitle);

var _SummaryScore = __webpack_require__(/*! ./SummaryScore */ 382);

var _SummaryScore2 = _interopRequireDefault(_SummaryScore);

var _SummaryReplayButton = __webpack_require__(/*! ./SummaryReplayButton */ 383);

var _SummaryReplayButton2 = _interopRequireDefault(_SummaryReplayButton);

var _LegalFooterText = __webpack_require__(/*! ../shared/legal/LegalFooterText */ 96);

var _LegalFooterText2 = _interopRequireDefault(_LegalFooterText);

var _LegalOpenButton = __webpack_require__(/*! ../shared/legal/LegalOpenButton */ 95);

var _LegalOpenButton2 = _interopRequireDefault(_LegalOpenButton);

var _AvatarTracking = __webpack_require__(/*! ../../components/AvatarTracking */ 48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
	_inherits(_class, _Phaser$State);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "create",
		value: function create(game) {
			game.add.existing(game.overlay);
			new _SummaryBackground2.default(game);
			new _SummaryScore2.default(game);
			new _SummaryTitle2.default(game);
			new _LegalOpenButton2.default(game);
			new _LegalFooterText2.default(game);
			new _SummaryReplayButton2.default(game, this.handleReplayClick, this);
			game.sounds.finish_level.play();
			document.body.style.backgroundImage = 'url(./assets/_html/bg_main.jpg)';
			game.add.tween(game.sounds.soundtrack).to({ volume: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Quadratic.InOut, true);
		}
	}, {
		key: "shutdown",
		value: function shutdown() {
			game.world.remove(game.overlay);
		}
	}, {
		key: "handleReplayClick",
		value: function handleReplayClick(e, pointer, releasedOnButton) {
			if (!releasedOnButton) {
				return;
			}
			if (!game.data.replayCount) {
				game.data.replayCount = 0;
			}
			game.data.replayCount++;

			game.tracking.sendData(_AvatarTracking.EVENT_CLICK_BUTTON_SUMMARY_PLAY_AGAIN, [[_AvatarTracking.DATA_SCORE, game.data.score], [_AvatarTracking.DATA_REPLAY_COUNT, game.data.replayCount]]);

			game.state.start('Game');
		}
	}]);

	return _class;
}(Phaser.State);

exports.default = _class;

/***/ }),
/* 380 */
/*!*********************************************************!*\
  !*** ./src/scripts/states/summary/SummaryBackground.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Sprite) {
	_inherits(_class, _Phaser$Sprite);

	function _class(game) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, game.world.centerX, game.world.centerY, 'summary/bg'));

		game.add.tween(_this.scale).from({ x: 1.05, y: 1.05 }, 4000, Phaser.Easing.Quintic.Out, true);
		var upperArm = game.make.sprite(619 - game.world.width * 0.5, 609 - game.world.height * 0.5, game.data.sheet.spritesheet, 'summary/boots_upper_arm');
		_this.addChild(upperArm);
		var forearm = game.make.sprite(80, -25, game.data.sheet.spritesheet, 'summary/boots_forearm');
		game.utils.anchorAll([_this, upperArm, forearm]);
		upperArm.addChild(forearm);
		game.add.existing(_this);
		upperArm.angle = -10;
		forearm.angle = -15;
		game.add.tween(upperArm).to({ angle: 10 }, Phaser.Timer.SECOND * 3.3234, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
		game.add.tween(forearm).to({ angle: 4 }, Phaser.Timer.SECOND * 1.848, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
		return _this;
	}

	return _class;
}(Phaser.Sprite);

exports.default = _class;

/***/ }),
/* 381 */
/*!****************************************************!*\
  !*** ./src/scripts/states/summary/SummaryTitle.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
  _inherits(_class, _Phaser$Group);

  function _class(game) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    var tt = _this.add(game.make.sprite(game.world.centerX, 0, 'shared/tt'));
    tt.anchor.set(0.5, 0);
    game.add.tween(tt).from({ alpha: 0 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Quadratic.Out, true);
    game.add.tween(tt.scale).from({ x: 0.75, y: 0.75 }, Phaser.Timer.SECOND * 4, Phaser.Easing.Elastic.Out, true);
    return _this;
  }

  return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 382 */
/*!****************************************************!*\
  !*** ./src/scripts/states/summary/SummaryScore.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
	_inherits(_class, _Phaser$Group);

	function _class(game) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

		_this.displayedScore = 0;

		_this.text = _this.add(game.make.text(game.world.centerX, game.world.height * 0.515, (~~_this.displayedScore).toLocaleString(), {
			font: '180px Londrina Solid',
			fill: '#f0e239',
			strokeThickness: 6
			// , stroke: '#ff00ff'
			, stroke: '#431307'
		}));

		var gradient = _this.text.context.createLinearGradient(0, 0, 0, _this.text.height);
		gradient.addColorStop(0, '#f0cb39');
		gradient.addColorStop(0.5, '#f0e239');
		gradient.addColorStop(1, '#f0cb39');
		_this.text.fill = gradient;
		game.utils.anchorAll(_this.text);
		return _this;
	}

	_createClass(_class, [{
		key: 'update',
		value: function update() {
			this.displayedScore += (game.data.score - this.displayedScore) * (game.time.elapsed / 200);
			this.text.text = (~~this.displayedScore).toLocaleString();
		}
	}]);

	return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 383 */
/*!***********************************************************!*\
  !*** ./src/scripts/states/summary/SummaryReplayButton.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Button) {
	_inherits(_class, _Phaser$Button);

	function _class(game, callback, context) {
		_classCallCheck(this, _class);

		// this.setSounds(game.sounds.over, null, game.sounds.click)
		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, game.world.centerX, game.height * 0.845, 'summary/btn_play_again', callback, context));

		_this.anchor.set(0.5);
		game.utils.addOverScaling.call(_this, _this, 1.05);
		game.add.tween(_this).from({ y: '+200' }, 2500, Phaser.Easing.Elastic.Out, true);
		game.add.existing(_this);
		return _this;
	}

	return _class;
}(Phaser.Button);

exports.default = _class;

/***/ }),
/* 384 */
/*!***************************************************!*\
  !*** ./src/scripts/states/loading/ProgressBar.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
	_inherits(_class, _Phaser$Group);

	function _class(game, width, height, border) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

		_this.progressWidth = 500;
		_this.progressHeight = 20;
		_this.progressBorder = 5;
		_this.progressBarOffset = 80;
		_this.currentProgress = 0;
		_this.createProgress();
		game.add.existing(_this);
		return _this;
	}

	_createClass(_class, [{
		key: 'loadUpdate',
		value: function loadUpdate(load) {
			this.currentProgress += (load.progress - this.currentProgress) * 0.05;
			this.progressText.setText(~~(Math.min(this.currentProgress / 83, 1) * 100) + '%');
			this.bar.width = this.currentProgress / 100 * this.progressWidth;
			this.bar.tint = -Phaser.Color.interpolateColor(0x00ff00, 0xff0000, 100, this.currentProgress);
		}
	}, {
		key: 'createProgress',
		value: function createProgress() {
			this.progressContainer = game.add.group();
			this.progressContainer.x = game.world.centerX;
			this.progressContainer.y = game.world.centerY;
			game.utils.groupAdd(this.progressContainer, [this.createProgressBar(), this.createProgressText()]);
		}
	}, {
		key: 'createProgressBar',
		value: function createProgressBar() {
			this.barContainer = game.make.group();
			this.barContainer.y = -30;
			this.bg = game.make.graphics();
			this.bg.beginFill(0x000000);
			this.bg.drawRect(this.progressWidth * -0.5, this.progressHeight * -0.5, this.progressWidth, this.progressHeight);
			this.bg.endFill();
			this.bar = game.make.graphics();
			this.bar.x = this.progressWidth * -0.5;
			this.bar.beginFill(0xffffff);
			this.bar.drawRect(0, this.progressHeight * -0.5, 1, this.progressHeight * 0.5);
			this.bar.endFill();
			this.bar.beginFill(0xaaaaaa);
			this.bar.drawRect(0, 0, 1, this.progressHeight * 0.5);
			this.bar.endFill();
			this.bar.tint = 0xff0000;
			game.utils.groupAdd(this.barContainer, [this.bg, this.bar]);
			return this.barContainer;
		}
	}, {
		key: 'createProgressText',
		value: function createProgressText() {
			this.progressText = game.make.text(0, 0, '0%', {
				fontSize: '50px',
				fill: '#ffffff',
				align: 'center'
			});
			this.progressText.y = 30;

			this.progressText.anchor.setTo(0.5, 0.5);
			return this.progressText;
		}
	}]);

	return _class;
}(Phaser.Group);

exports.default = _class;

/***/ }),
/* 385 */
/*!************************************************!*\
  !*** ./src/scripts/components/Localization.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(/*! url-search-params-polyfill */ 386);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(game) {
    _classCallCheck(this, _class);

    var languageCode = game.data.languageCode;

    var paramLanguage = new URLSearchParams(window.location.search).get('lang');

    if (paramLanguage) {
        if (game.data.language.hasOwnProperty(paramLanguage)) {
            languageCode = paramLanguage;
        } else {
            console.error('LoadingState.js: initLocalization: Language code localization not found, "' + paramLanguage + '"');
        }
    }

    game.localize = function (key) {
        return game.data.language[languageCode][key];
    };
};

exports.default = _class;

/***/ }),
/* 386 */
/*!**********************************************************!*\
  !*** ./node_modules/url-search-params-polyfill/index.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 *
 *
 * @author Jerry Bendy <jerry@icewingcc.com>
 * @licence MIT
 *
 */

(function(self) {
    'use strict';

    var nativeURLSearchParams = self.URLSearchParams ? self.URLSearchParams : null,
        isSupportObjectConstructor = nativeURLSearchParams && (new nativeURLSearchParams({a: 1})).toString() === 'a=1',
        // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
        decodesPlusesCorrectly = nativeURLSearchParams && (new nativeURLSearchParams('s=%2B').get('s') === '+'),
        __URLSearchParams__ = "__URLSearchParams__",
        prototype = URLSearchParamsPolyfill.prototype,
        iterable = !!(self.Symbol && self.Symbol.iterator);

    if (nativeURLSearchParams && isSupportObjectConstructor && decodesPlusesCorrectly) {
        return;
    }


    /**
     * Make a URLSearchParams instance
     *
     * @param {object|string|URLSearchParams} search
     * @constructor
     */
    function URLSearchParamsPolyfill(search) {
        search = search || "";

        // support construct object with another URLSearchParams instance
        if (search instanceof URLSearchParams || search instanceof URLSearchParamsPolyfill) {
            search = search.toString();
        }
        this [__URLSearchParams__] = parseToDict(search);
    }


    /**
     * Appends a specified key/value pair as a new search parameter.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.append = function(name, value) {
        appendTo(this [__URLSearchParams__], name, value);
    };

    /**
     * Deletes the given search parameter, and its associated value,
     * from the list of all search parameters.
     *
     * @param {string} name
     */
    prototype.delete = function(name) {
        delete this [__URLSearchParams__] [name];
    };

    /**
     * Returns the first value associated to the given search parameter.
     *
     * @param {string} name
     * @returns {string|null}
     */
    prototype.get = function(name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict[name][0] : null;
    };

    /**
     * Returns all the values association with a given search parameter.
     *
     * @param {string} name
     * @returns {Array}
     */
    prototype.getAll = function(name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict [name].slice(0) : [];
    };

    /**
     * Returns a Boolean indicating if such a search parameter exists.
     *
     * @param {string} name
     * @returns {boolean}
     */
    prototype.has = function(name) {
        return name in this [__URLSearchParams__];
    };

    /**
     * Sets the value associated to a given search parameter to
     * the given value. If there were several values, delete the
     * others.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.set = function set(name, value) {
        this [__URLSearchParams__][name] = ['' + value];
    };

    /**
     * Returns a string containg a query string suitable for use in a URL.
     *
     * @returns {string}
     */
    prototype.toString = function() {
        var dict = this[__URLSearchParams__], query = [], i, key, name, value;
        for (key in dict) {
            name = encode(key);
            for (i = 0, value = dict[key]; i < value.length; i++) {
                query.push(name + '=' + encode(value[i]));
            }
        }
        return query.join('&');
    };

    // There is a bug in Safari 10.1 and `Proxy`ing it is not enough.
    var forSureUsePolyfill = !decodesPlusesCorrectly;
    var useProxy = (!forSureUsePolyfill && nativeURLSearchParams && !isSupportObjectConstructor && self.Proxy)
    /*
     * Apply polifill to global object and append other prototype into it
     */
    self.URLSearchParams = useProxy ?
        // Safari 10.0 doesn't support Proxy, so it won't extend URLSearchParams on safari 10.0
        new Proxy(nativeURLSearchParams, {
            construct: function(target, args) {
                return new target((new URLSearchParamsPolyfill(args[0]).toString()));
            }
        }) :
        URLSearchParamsPolyfill;


    var USPProto = self.URLSearchParams.prototype;

    USPProto.polyfill = true;

    /**
     *
     * @param {function} callback
     * @param {object} thisArg
     */
    USPProto.forEach = USPProto.forEach || function(callback, thisArg) {
        var dict = parseToDict(this.toString());
        Object.getOwnPropertyNames(dict).forEach(function(name) {
            dict[name].forEach(function(value) {
                callback.call(thisArg, value, name, this);
            }, this);
        }, this);
    };

    /**
     * Sort all name-value pairs
     */
    USPProto.sort = USPProto.sort || function() {
        var dict = parseToDict(this.toString()), keys = [], k, i, j;
        for (k in dict) {
            keys.push(k);
        }
        keys.sort();

        for (i = 0; i < keys.length; i++) {
            this.delete(keys[i]);
        }
        for (i = 0; i < keys.length; i++) {
            var key = keys[i], values = dict[key];
            for (j = 0; j < values.length; j++) {
                this.append(key, values[j]);
            }
        }
    };

    /**
     * Returns an iterator allowing to go through all keys of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.keys = USPProto.keys || function() {
        var items = [];
        this.forEach(function(item, name) {
            items.push([name]);
        });
        return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all values of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.values = USPProto.values || function() {
        var items = [];
        this.forEach(function(item) {
            items.push([item]);
        });
        return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all key/value
     * pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.entries = USPProto.entries || function() {
        var items = [];
        this.forEach(function(item, name) {
            items.push([name, item]);
        });
        return makeIterator(items);
    };


    if (iterable) {
        USPProto[self.Symbol.iterator] = USPProto[self.Symbol.iterator] || USPProto.entries;
    }


    function encode(str) {
        var replace = {
            '!': '%21',
            "'": '%27',
            '(': '%28',
            ')': '%29',
            '~': '%7E',
            '%20': '+',
            '%00': '\x00'
        };
        return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function(match) {
            return replace[match];
        });
    }

    function decode(str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    }

    function makeIterator(arr) {
        var iterator = {
            next: function() {
                var value = arr.shift();
                return {done: value === undefined, value: value};
            }
        };

        if (iterable) {
            iterator[self.Symbol.iterator] = function() {
                return iterator;
            };
        }

        return iterator;
    }

    function parseToDict(search) {
        var dict = {};

        if (typeof search === "object") {
            for (var key in search) {
                if (search.hasOwnProperty(key)) {
                    appendTo(dict, key, search[key])
                }
            }

        } else {
            // remove first '?'
            if (search.indexOf("?") === 0) {
                search = search.slice(1);
            }

            var pairs = search.split("&");
            for (var j = 0; j < pairs.length; j++) {
                var value = pairs [j],
                    index = value.indexOf('=');

                if (-1 < index) {
                    appendTo(dict, decode(value.slice(0, index)), decode(value.slice(index + 1)));

                } else {
                    if (value) {
                        appendTo(dict, decode(value), '');
                    }
                }
            }
        }

        return dict;
    }

    function appendTo(dict, name, value) {
        var val = typeof value === 'string' ? value : (
            value !== null && typeof value.toString === 'function' ? value.toString() : JSON.stringify(value)
        )

        if (name in dict) {
            dict[name].push(val);
        } else {
            dict[name] = [val];
        }
    }

})(typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 43)))

/***/ }),
/* 387 */
/*!***********************************************!*\
  !*** ./src/scripts/components/AvatarUtils.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: 'addOverScaling',
    value: function addOverScaling(obj) {
      var targetScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.05;

      var originalScaleX = obj.scale.x;
      var originalScaleY = obj.scale.y;

      if (Array.isArray(obj)) {
        for (var t in obj) {
          overScaling.call(this, t);
        }
      } else {
        overScaling.call(this, obj);
      }

      function overScaling(target) {
        var negativeX = target.scale.x < 0 ? -1 : 1;
        var negativeY = target.scale.y < 0 ? -1 : 1;

        var requestInputOff = function requestInputOff() {
          if (target.scaleTween) {
            target.scaleTween.stop();
          }

          target.scaleTween = game.add.tween(target.scale).to({
            x: originalScaleX * negativeX,
            y: originalScaleY * negativeY
          }, 200, Phaser.Easing.Quadratic.InOut, true);
        };

        var requestInputOver = function requestInputOver() {
          if (target.scaleTween) {
            target.scaleTween.stop();
          }

          target.scaleTween = game.add.tween(target.scale).to({ x: targetScale * negativeX, y: targetScale * negativeY }, 400, Phaser.Easing.Back.Out, true);
        };

        target.onInputOver.add(requestInputOver);
        target.onInputDown.add(requestInputOff);
        target.onInputOut.add(requestInputOff);
      }
    }
  }, {
    key: 'anchorAll',
    value: function anchorAll(obj, anchorX, anchorY) {
      if (typeof anchorX === 'undefined') {
        anchorX = 0.5;
      }

      if (_typeof(anchorY === 'undefined')) {
        anchorY = anchorX;
      }

      if (Array.isArray(obj)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var o = _step.value;

            o.anchor.set(anchorX, anchorY);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else {
        obj.anchor.set(anchorX, anchorY);
      }
    }
  }, {
    key: 'scaleAll',
    value: function scaleAll(obj, scaleX, scaleY) {
      if (typeof scaleX === 'undefined') {
        scaleX = 2;
      }

      if (_typeof(scaleY === 'undefined')) {
        scaleY = scaleX;
      }

      if (Array.isArray(obj)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = obj[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var o = _step2.value;

            o.scale.set(scaleX, scaleY);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      } else {
        obj.scale.set(scaleX, scaleY);
      }
    }
  }, {
    key: 'groupAdd',
    value: function groupAdd(group, obj) {
      if (Array.isArray(obj)) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = obj[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var o = _step3.value;

            group.add(o);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      } else {
        group.add(obj);
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 388 */
/*!*************************************************!*\
  !*** ./src/scripts/components/SocialManager.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocialManager = function () {
    function SocialManager(d, s, id) {
        _classCallCheck(this, SocialManager);

        var appHandle = this;
        var js = void 0,
            fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.com/en_US/messenger.Extensions.js";
        fjs.parentNode.insertBefore(js, fjs);

        window.extAsyncInit = function () {
            MessengerExtensions.getContext(game.data.social.facebookAppID, function success(thread_context) {
                appHandle.FB_PSID = thread_context.psid;
            }, function error(err) {
                var queryID = appHandle.getQueryParameterByName("web_PSID");

                if (queryID) {
                    appHandle.web_PSID = queryID;
                }
            });
        };
    }

    _createClass(SocialManager, [{
        key: "getQueryParameterByName",
        value: function getQueryParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }

            name = name.replace(/[\[\]]/g, "\\$&");

            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);

            if (!results) {
                return null;
            }

            if (!results[2]) {
                return "";
            }

            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    }, {
        key: "isInMessenger",
        value: function isInMessenger() {
            return this.FB_PSID ? this.FB_PSID : false;
        }
    }, {
        key: "hasWebChat",
        value: function hasWebChat() {
            return this.web_PSID ? this.web_PSID : false;
        }
    }, {
        key: "instantShareBack",
        value: function instantShareBack(url, data) {
            var XHR = new XMLHttpRequest();
            var urlEncodedData = "";
            var urlEncodedDataPairs = [];
            var name;

            for (name in data) {
                urlEncodedDataPairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
            }

            urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");
            XHR.open("POST", url);
            XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            XHR.send(urlEncodedData);
        }
    }, {
        key: "postToChat",
        value: function postToChat(imageURL, chatText) {
            var instantShareObj = {
                fileURL: imageURL,
                messageText: chatText,
                titleText: game.localize('chatTitle'),
                mediaType: "image"
            };

            if (this.isInMessenger()) {
                instantShareObj.FB_PSID = this.isInMessenger();
                this.instantShareBack(game.data.social.shareBackURL, instantShareObj);
            } else if (this.hasWebChat()) {
                instantShareObj.web_PSID = this.hasWebChat();
                this.instantShareBack(game.data.social.shareBackURL, instantShareObj);
            }
        }
    }, {
        key: "shareFlowToMessenger",
        value: function shareFlowToMessenger(imageURL, titleText, subtitleText, playButtonText, pageURL) {
            var message = {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        image_aspect_ratio: "square",
                        elements: [{
                            title: titleText,
                            image_url: imageURL,
                            subtitle: subtitleText,
                            default_action: {
                                type: "web_url",
                                url: pageURL,
                                messenger_extensions: true,
                                webview_height_ratio: "full"
                            },
                            buttons: [{
                                type: "web_url",
                                url: pageURL,
                                title: playButtonText
                            }]
                        }]
                    }
                }
            };

            MessengerExtensions.beginShareFlow(function (shareResponse) {}, function (errorCode, errorMessage) {}, message, "broadcast");
        }
    }, {
        key: "shareImage",
        value: function shareImage(imageURL, title, subtitle, buttonText, gameURL) {
            if (this.isInMessenger()) {
                this.shareFlowToMessenger(imageURL, title, subtitle, buttonText, gameURL);
            } else {
                window.open(imageURL);
            }
        }
    }, {
        key: "sendScoreRequest",
        value: function sendScoreRequest(url, data, title, subtitle, buttonText, gameURL, callback, context) {
            var XHR = new XMLHttpRequest();
            var urlEncodedDataPairs = [];
            var that = this;

            for (var name in data) {
                urlEncodedDataPairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
            }

            var urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

            XHR.addEventListener("load", function (event) {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    callback.call(context, JSON.parse(XHR.responseText).imageURL);
                }
            });

            XHR.open("POST", url);
            XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            XHR.send(urlEncodedData);
        }
    }]);

    return SocialManager;
}();

exports.default = SocialManager;

/***/ }),
/* 389 */
/*!*******************************!*\
  !*** ./src/scripts/config.js ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	gameWidth: 1080,
	gameHeight: 1920,
	webfonts: []
};

/***/ }),
/* 390 */
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./main.css */ 391);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ 393)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!./main.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!./main.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 391 */
/*!*******************************************************!*\
  !*** ./node_modules/css-loader!./src/styles/main.css ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ 392)(false);
// imports


// module
exports.push([module.i, "* {\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\nhtml, body, #content, canvas {\n  max-width: 100%;\n  max-height: 100%;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n\nbody, #content, canvas {\n  position: absolute;\n  align-items: center;\n  justify-content: center;\n}\n\nbody {\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-color: #121;\n}\n\ncanvas {\n  opacity: 0;\n  transition: opacity 1.5s ease-in-out;\n}\n\n.darken {\n  background: rgba(0, 0, 0, 0);\n}\n\n.modal-legal-container {\n  position: absolute;\n  color: #ffffff;\n  background: rgba(0, 0, 0, 0.35);\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 1s ease-in-out;\n  user-select: none;\n}\n\n.modal-legal-dialog {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.65);\n  left: 50%;\n  transform: translate(-50%, 200%);\n  font-family: \"Source Sans Pro\", sans-serif;\n  height: fit-content;\n  border-radius: 1vh 1vh 0 0;\n  padding: 4vh;\n  font-size: 1.7vh;\n  line-height: 3vh;\n  width: 56.25vh;\n  max-width: 70vw;\n  text-align: center;\n  transition: transform 0.5s ease-in-out;\n  bottom: 0;\n}\n\n.modal-legal-container.show .modal-legal-dialog {\n  transform: translate(-50%, 0%);\n}\n\n.show {\n  opacity: 1;\n  pointer-events: all;\n}\n\n.modal-legal-close-btn {\n  position: absolute;\n  width: 2.5vh;\n  height: 2.5vh;\n  top: 0.98958vh;\n  right: 0.98958vh;\n  transition: transform 0.25s ease-in-out;\n  transform: scale(1);\n  transform-origin: 50% 50%;\n  cursor: pointer;\n}\n\n.modal-legal-close-btn:hover {\n  transform: scale(1.1) rotate(0.25turn);\n}\n\n.preloader {\n  position: absolute;\n  left: 200vw;\n  width: 1px;\n  height: 1px;\n}\n\n.bg-preloader-1 {\n  background-image: 'url(./assets/_html/bg_main.jpg)';\n}\n\n.wisp {\n  background-size: contain;\n  position: absolute;\n  transform-origin: 50% 50%;\n  mix-blend-mode: screen;\n}\n\n@keyframes wisp-animation-float-up {\n  0% {\n    transform: translate(-10vh, 0);\n    opacity: 0.75;\n  }\n  25% {\n    opacity: 0;\n  }\n  50% {\n    transform: translate(10vh, -150vh);\n    opacity: 0.5;\n  }\n  75% {\n    opacity: 0;\n  }\n  100% {\n    transform: translate(0, -300vh);\n    opacity: 0.75;\n  }\n}\n\n.legal-credits {\n  padding-bottom: 2vh;\n  opacity: 1;\n  width: 100%;\n}\n\n.legal-link-container {\n  display: flex;\n  flex-flow: column nowrap;\n  justify-content: space-around;\n  align-items: center;\n  align-content: stretch;\n}\n\n.legal-link-container-bucket {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-around;\n  align-items: center;\n  align-content: space-around;\n  width: 100%;\n}\n\n.legal-link-container-bucket a {\n  color: white;\n  background: rgba(0, 0, 0, 0.5);\n  border-radius: 0.2vh;\n  margin: 0.5vh;\n  padding: 0.5vh;\n  text-decoration: none;\n  font-size: 1.3vh;\n}\n\n.legal-link-container-bucket a:hover {\n  color: #ffff88;\n  text-decoration: underline;\n  background: rgba(255, 255, 255, 0.1);\n}\n", ""]);

// exports


/***/ }),
/* 392 */
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 393 */
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ 394);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 394 */
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 395 */
/*!*********************!*\
  !*** ./favicon.ico ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "favicon.ico";

/***/ })
],[137]);
//# sourceMappingURL=bundle.js.map