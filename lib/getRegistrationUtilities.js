var isArray,
  __hasProp = {}.hasOwnProperty;

isArray = require('./utilities').isArray;

module.exports = function(config) {
  var connect, createEventStreamBus, createNonInitPropertyBus, deleteDispatcher, disconnectors, dispatchers, free, getDispatcher, getEventStream, getProperty, matchesExistingDispatcher_question_, plugs, register, _register;
  connect = config.connect, createEventStreamBus = config.createEventStreamBus, createNonInitPropertyBus = config.createNonInitPropertyBus;
  disconnectors = {};
  dispatchers = {};
  plugs = {};
  deleteDispatcher = function(label) {
    free(label);
    delete dispatchers[label];
    return delete plugs[label];
  };
  free = function(label) {
    var disconnect, key, _ref, _results;
    _ref = disconnectors[label];
    _results = [];
    for (key in _ref) {
      if (!__hasProp.call(_ref, key)) continue;
      disconnect = _ref[key];
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
      _unplug = connect(observable, bus);
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
  getEventStream = register(createEventStreamBus);
  getProperty = register(createNonInitPropertyBus);
  return {
    deleteDispatcher: deleteDispatcher,
    getDispatcher: getDispatcher,
    getEventStream: getEventStream,
    getProperty: getProperty
  };
};
