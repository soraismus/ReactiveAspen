var createEventStreamBus, createNonInitPropertyBus, deleteBus, disconnectors, dispatchers, free, getDispatcher, getEventStream, getProperty, isArray, isString, matchesExistingDispatcher_question_, plug, plugs, register, _ref, _ref1, _ref2, _register,
  __hasProp = {}.hasOwnProperty;

_ref = '../utilities.js', isArray = _ref.isArray, isString = _ref.isString;

_ref1 = require('../pando.js'), createEventStreamBus = _ref1.createEventStreamBus, createNonInitPropertyBus = _ref1.createNonInitPropertyBus, plug = _ref1.plug;

disconnectors = {};

dispatchers = {};

plugs = {};

deleteBus = function(label) {
  free(label);
  delete dispatchers[label];
  return delete plugs[label];
};

free = function(label) {
  var disconnect, key, _ref2, _results;
  _ref2 = disconnectors[label];
  _results = [];
  for (key in _ref2) {
    if (!__hasProp.call(_ref2, key)) continue;
    disconnect = _ref2[key];
    _results.push(disconnect());
  }
  return _results;
};

getDispatcher = function(label, eventstream_question_) {
  var getBus;
  getBus = eventstream_question_ ? getEventStream : getProperty;
  return dispatchers[label] || getBus(label);
};

matchesExistingDispatcher_question_ = function(label) {
  return !!dispatchers[label];
};

_register = function(busFactory, label) {
  var bus, id, load;
  id = 0;
  bus = dispatchers[label] = busFactory();
  bus.setAlias(label);
  load = function(observable) {
    var observable_hyphen_id, unplug, _unplug;
    _unplug = plug(bus)(observable);
    observable_hyphen_id = id;
    unplug = function() {
      delete disconnectors[label][observable_hyphen_id];
      return _unplug();
    };
    if (disconnectors[label] == null) {
      disconnectors[label] = {};
    }
    disconnectors[label][observable_hyphen_id] = unplug;
    id += 1;
    return unplug;
  };
  plugs[label] = load;
  return bus;
};

register = function(busFactory) {
  return function(label_slash_s) {
    switch (false) {
      case !Array.isArray(label_slash_s):
        return label_slash_s.map(register(busFactory));
      case !matchesExistingDispatcher_question_(label_slash_s):
        return dispatchers[label_slash_s];
      default:
        return _register(busFactory, label_slash_s);
    }
  };
};

_ref2 = [createEventStreamBus, createNonInitPropertyBus].map(register), getEventStream = _ref2[0], getProperty = _ref2[1];

module.exports = {
  getDispatcher: getDispatcher,
  getEventStream: getEventStream,
  getProperty: getProperty
};
