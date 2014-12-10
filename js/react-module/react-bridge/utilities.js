var ObjProto, applyUnsplat, hasType_question_, isFunction, isObject, isString, memoize, shallowCopy, shallowFlatten, toString, _ref,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

ObjProto = Object.prototype;

applyUnsplat = function(fn) {
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return apply(fn)(shallowFlatten(args));
  };
};

hasType_question_ = function(type) {
  return function(val) {
    return ("[object " + type + "]") === toString(val);
  };
};

_ref = ['Function', 'String'].map(hasType_question_), isFunction = _ref[0], isString = _ref[1];

isObject = function(val) {
  return val === Object(val);
};

memoize = function(fn, hasher) {
  var memo;
  memo = {};
  if (!isFunction(hasher)) {
    hasher = identity;
  }
  return function() {
    var args, key;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    key = hasher.apply(null, args);
    if (memo.hasOwnProperty(key)) {
      return memo[key];
    } else {
      return memo[key] = fn.apply(null, args);
    }
  };
};

shallowCopy = function(val) {
  var copy, key, prop;
  switch (false) {
    case !isObject(val):
      copy = {};
      for (key in val) {
        if (!__hasProp.call(val, key)) continue;
        prop = val[key];
        copy[key] = prop;
      }
      return copy;
    case !isArray(val):
      return val.map(identity);
    default:
      return val;
  }
};

shallowFlatten = function(array) {
  return nativeConcat.apply([], array);
};

toString = function(val) {
  return ObjProto.toString.call(val);
};

module.exports = {
  applyUnsplat: applyUnsplat,
  isFunction: isFunction,
  isObject: isObject,
  isString: isString,
  memoize: memoize,
  shallowCopy: shallowCopy
};
