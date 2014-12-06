var compose, identity, isArray, transformResult, useParamListOrArray,
  __slice = [].slice;

identity = function(val) {
  return val;
};

isArray = Array.isArray;

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
  compose: compose,
  identity: identity,
  isArray: isArray,
  useParamListOrArray: useParamListOrArray
};
