var ObjProto, addComponent, atomicKeypath_question_, compose, compositeRegex, dot, getComponent, getKeys, identity, isArray, isObject, isString, keypathRegex, processKeypath, shallowCopy, toString, transformResult, useParamListOrArray,
  __hasProp = {}.hasOwnProperty,
  __slice = [].slice;

dot = '.';

ObjProto = Object.prototype;

compositeRegex = /\.[^\.]*\./;

keypathRegex = /\.([^\.]*)(\.?.*)$/;

addComponent = function(keypath, newComponent, recipient) {
  var i, key, keys, last, proxy, _i;
  keys = getKeys(keypath);
  last = keys.length - 1;
  proxy = recipient;
  for (i = _i = 0; 0 <= last ? _i < last : _i > last; i = 0 <= last ? ++_i : --_i) {
    key = keys[i];
    if (proxy[key] == null) {
      proxy[key] = {};
    }
    proxy = proxy[key];
  }
  return proxy[keys[last]] = newComponent;
};

atomicKeypath_question_ = function(keypath) {
  return !(compositeRegex.test(keypath));
};

getComponent = function(keypath, obj) {
  var key, nextKey, nextKeypath, _ref;
  if (atomicKeypath_question_(keypath)) {
    key = keypath.slice(1);
    return shallowCopy(obj[key]);
  } else {
    _ref = processKeypath(keypath), nextKey = _ref[0], nextKeypath = _ref[1];
    if (!isObject(obj[nextKey])) {
      return null;
    }
    return getComponent(nextKeypath, obj[nextKey]);
  }
};

getKeys = function(keypath) {
  return keypath.split(dot).slice(1);
};

identity = function(val) {
  return val;
};

isArray = Array.isArray;

isObject = function(val) {
  return val === Object(val);
};

isString = function(val) {
  return "[object String]" === toString(val);
};

processKeypath = function(keypath) {
  return keypathRegex.exec(keypath).slice(1, 3);
};

shallowCopy = function(val) {
  var copy, key, prop;
  copy = {};
  for (key in val) {
    if (!__hasProp.call(val, key)) continue;
    prop = val[key];
    copy[key] = prop;
  }
  return copy;
};

toString = function(val) {
  return ObjProto.toString.call(val);
};

transformResult = function(result, fn) {
  return result = fn(result);
};

useParamListOrArray = function(fn) {
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (args.length && isArray(args[0])) {
      return fn(args[0]);
    } else {
      return fn(args);
    }
  };
};

compose = useParamListOrArray(function(fns) {
  return function(val) {
    return fns.reduce(transformResult, val);
  };
});

module.exports = {
  addComponent: addComponent,
  compose: compose,
  getComponent: getComponent,
  identity: identity,
  isArray: isArray,
  isString: isString,
  shallowCopy: shallowCopy,
  useParamListOrArray: useParamListOrArray
};
