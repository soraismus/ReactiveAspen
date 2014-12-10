var checkValue, compose, createEventStream, createNonInitProperty, identity, interpret, mapMapping, mapping, mappingCompose, merge, remerse, remerseES, remerseP, sample, sampling, useParamListOrArray, _merge, _ref, _ref1, _ref2, _remerse,
  __slice = [].slice;

_ref = require('../pando.js'), checkValue = _ref.checkValue, createEventStream = _ref.createEventStream, createNonInitProperty = _ref.createNonInitProperty, mapping = _ref.mapping, merge = _ref.merge, remerse = _ref.remerse;

_ref1 = require('../utilities.js'), compose = _ref1.compose, identity = _ref1.identity, useParamListOrArray = _ref1.useParamListOrArray;

interpret = require('./channel-connectors.js').interpret;

mapMapping = function(array) {
  return array.map(mapping);
};

mappingCompose = useParamListOrArray(function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return compose(mapMapping(args));
});

_merge = function(target) {
  return function(sources) {
    return merge(interpret(target))(sources.map(interpret));
  };
};

_remerse = function(dispatcherFactory) {
  return function(fn) {
    return function(source) {
      return remerse(dispatcherFactory)(fn)(interpret(source));
    };
  };
};

_ref2 = [createEventStream, createNonInitProperty].map(_remerse), remerseES = _ref2[0], remerseP = _ref2[1];

sample = function(propertyRef) {
  return checkValue(identity)(interpret(propertyRef));
};

sampling = function(ref) {
  return mapping(function() {
    return sample(ref);
  });
};

module.exports = {
  mapMapping: mapMapping,
  mappingCompose: mappingCompose,
  merge: _merge,
  remerse: _remerse,
  remerseES: remerseES,
  remerseP: remerseP,
  sample: sample,
  sampling: sampling
};
