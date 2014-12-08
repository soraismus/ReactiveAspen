var createEventStreamBus, createNonInitPropertyBus, deleteBus, disconnectors, dispatchers, free, getDispatcher, getEventStream, getProperty, isArray, matchesExistingDispatcher_question_, plug, plugs, register, _ref, _ref1, _register,
  __hasProp = {}.hasOwnProperty;

isArray = '../utilities.js'.isArray;

_ref = require('../pando.js'), createEventStreamBus = _ref.createEventStreamBus, createNonInitPropertyBus = _ref.createNonInitPropertyBus, plug = _ref.plug;

disconnectors = {};

dispatchers = {};

plugs = {};

deleteBus = function(label) {
  free(label);
  delete dispatchers[label];
  return delete plugs[label];
};

free = function(label) {
  var disconnect, key, _ref1, _results;
  _ref1 = disconnectors[label];
  _results = [];
  for (key in _ref1) {
    if (!__hasProp.call(_ref1, key)) continue;
    disconnect = _ref1[key];
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
      case !isArray(label_slash_s):
        return label_slash_s.map(register(busFactory));
      case !matchesExistingDispatcher_question_(label_slash_s):
        return dispatchers[label_slash_s];
      default:
        return _register(busFactory, label_slash_s);
    }
  };
};

_ref1 = [createEventStreamBus, createNonInitPropertyBus].map(register), getEventStream = _ref1[0], getProperty = _ref1[1];

module.exports = {
  getDispatcher: getDispatcher,
  getEventStream: getEventStream,
  getProperty: getProperty
};
