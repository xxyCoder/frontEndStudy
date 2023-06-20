"use strict";

var _obj;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var obj = (_obj = {
  a: 1,
  b: 2,
  c: {
    d: 3
  }
}, _defineProperty(_obj, Symbol(), "foo"), _defineProperty(_obj, Symbol.iterator, function () {
  var keys = Reflect.ownKeys(obj);
  var idx = 0;
  return {
    next: function next() {
      return {
        value: idx !== keys.length ? obj[keys[idx++]] : undefined,
        done: idx === keys.length
      };
    }
  };
}), _obj);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var value = _step.value;
    console.log(value);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var it = obj[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next()); // for...in for...of区别

var arr = [1, 2, 3, [5, 6, 7]];

for (var _i = 0, _arr = arr; _i < _arr.length; _i++) {
  var _key = _arr[_i];
  console.log(_key);
} // length不能被枚举，这是因为它是非枚举属性


for (var key in arr) {
  console.log(key, arr[key]);
}