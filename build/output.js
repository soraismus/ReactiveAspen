!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReactiveAspen=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = function(config) {
  var appStateProperty, blockTillReady, connectPortsToBuses, connectViewToController, doAsync, initialize, linkTogetherMVC, node, onValue, push, renderToDOM, resetAppState, terminusEventStream, _linkTogetherMVC, _renderToDOM, _topViewFactory;
  appStateProperty = config.appStateProperty, blockTillReady = config.blockTillReady, connectPortsToBuses = config.connectPortsToBuses, connectViewToController = config.connectViewToController, doAsync = config.doAsync, onValue = config.onValue, push = config.push, renderToDOM = config.renderToDOM, terminusEventStream = config.terminusEventStream;
  node = null;
  _topViewFactory = null;
  initialize = function(appNodeID, topViewFactory, initialAppState, viewImports) {
    var reactElement;
    node = document.getElementById(appNodeID);
    _topViewFactory = topViewFactory;
    reactElement = linkTogetherMVC(topViewFactory, initialAppState);
    renderToDOM(reactElement, node);
    return connectPortsToBuses(viewImports);
  };
  linkTogetherMVC = function(topViewFactory, appState) {
    var reactElement;
    push(appStateProperty)(appState);
    reactElement = topViewFactory(appState);
    connectViewToController();
    return reactElement;
  };
  resetAppState = function(transform) {
    var newAppState, reactElement;
    newAppState = doAsync(transform)(appStateProperty);
    reactElement = _linkTogetherMVC(_topViewFactory, newAppState);
    return _renderToDOM(reactElement, node);
  };
  _linkTogetherMVC = doAsync(linkTogetherMVC);
  _renderToDOM = blockTillReady(renderToDOM);
  onValue(terminusEventStream, blockTillReady(resetAppState));
  return initialize;
};



},{}],2:[function(_dereq_,module,exports){
var isArray, isString, _ref;

_ref = _dereq_('./utilities'), isArray = _ref.isArray, isString = _ref.isString;

module.exports = function(config) {
  var connect, connectMultiple, connectSingle, getDispatcher, interpret, onEvent, onValue, pandoConnect, pandoOnValue, plug, plugIntoTerminus, push, setAlias, terminusEventStream, _connect;
  getDispatcher = config.getDispatcher;
  pandoConnect = config.connect;
  pandoOnValue = config.onValue;
  terminusEventStream = config.terminusEventStream;
  _connect = function(src, tgt, transform) {
    var _ref1, _src, _tgt;
    _ref1 = [src, tgt].map(interpret), _src = _ref1[0], _tgt = _ref1[1];
    setAlias(_src, src);
    setAlias(_tgt, tgt);
    return pandoConnect(_src, _tgt, transform);
  };
  connect = function(sources) {
    return function(targets) {
      return function(thunk) {
        if (isArray(sources)) {
          return connectMultiple(sources, targets, thunk());
        } else {
          return connectSingle(sources, targets, thunk());
        }
      };
    };
  };
  connectMultiple = function(sources, targets, transforms) {
    var i, j, src, tgt, _i, _j, _len, _len1, _results, _results1;
    if (isArray(targets)) {
      _results = [];
      for (i = _i = 0, _len = targets.length; _i < _len; i = ++_i) {
        tgt = targets[i];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (j = _j = 0, _len1 = sources.length; _j < _len1; j = ++_j) {
            src = sources[j];
            _results1.push(_connect(src, tgt, transforms[i][j]));
          }
          return _results1;
        })());
      }
      return _results;
    } else {
      _results1 = [];
      for (i = _j = 0, _len1 = sources.length; _j < _len1; i = ++_j) {
        src = sources[i];
        _results1.push(_connect(src, targets, transforms[i]));
      }
      return _results1;
    }
  };
  connectSingle = function(source, targets, transforms) {
    var i, tgt, _i, _len, _results;
    if (isArray(targets)) {
      _results = [];
      for (i = _i = 0, _len = targets.length; _i < _len; i = ++_i) {
        tgt = targets[i];
        _results.push(_connect(source, tgt, transforms[i]));
      }
      return _results;
    } else {
      return _connect(source, targets, transforms);
    }
  };
  interpret = function(value) {
    if (isString(value)) {
      return getDispatcher(value, false);
    } else {
      return value;
    }
  };
  onEvent = function(source, sink) {
    return interpret(source).subscribe(sink);
  };
  onValue = function(source, sink) {
    return pandoOnValue(interpret(source), sink);
  };
  plug = function(targets) {
    return function(thunk) {
      return function(sources) {
        return connect(sources)(targets)(thunk);
      };
    };
  };
  plugIntoTerminus = function(source, transform) {
    return connect(source)(terminusEventStream)(transform);
  };
  push = function(label) {
    return function(val) {
      var bus;
      bus = interpret(label);
      return bus.dispatch(val, bus.id);
    };
  };
  setAlias = function(bus, val) {
    if (isString(val)) {
      return bus.setAlias(val);
    }
  };
  return {
    connect: connect,
    interpret: interpret,
    onEvent: onEvent,
    onValue: onValue,
    plug: plug,
    plugIntoTerminus: plugIntoTerminus,
    push: push
  };
};



},{"./utilities":7}],3:[function(_dereq_,module,exports){
var isArray, isObject, _ref;

_ref = _dereq_('./utilities'), isArray = _ref.isArray, isObject = _ref.isObject;

module.exports = function(args) {
  var actAsSwitchboard, connectBus, connectIntakeToTarget, connectPortsToBuses, dispatchBy, eventStreamName_question_, eventStreamRegex, getDispatcher, getEventStream, getFilter, getProperty, getTargetValue, interpretRecord, manageDispatcher, reactIntake, reactIntakeBus, switches, _blur, _preventDefault;
  connectBus = args.connectBus, getEventStream = args.getEventStream, getProperty = args.getProperty, reactIntake = args.reactIntake;
  eventStreamRegex = /^\$/;
  switches = [];
  actAsSwitchboard = function(event) {
    var condition, dispatch, swich, _i, _len;
    for (_i = 0, _len = switches.length; _i < _len; _i++) {
      swich = switches[_i];
      condition = swich.condition, dispatch = swich.dispatch;
      if (condition(event)) {
        return dispatch(event);
      }
    }
  };
  _blur = function(capsule) {
    if (capsule.type === 'link') {
      return capsule.event.target.blur();
    }
  };
  connectPortsToBuses = function(triplets) {
    return triplets.forEach(connectIntakeToTarget);
  };
  connectIntakeToTarget = function(record) {
    var config, dispatcher, handler, reactViewLabel, tgtBusLabel, type, _ref1;
    _ref1 = interpretRecord(record), config = _ref1.config, handler = _ref1.handler, reactViewLabel = _ref1.reactViewLabel, tgtBusLabel = _ref1.tgtBusLabel, type = _ref1.type;
    dispatcher = getDispatcher(tgtBusLabel);
    manageDispatcher(dispatcher, config);
    return switches.push({
      condition: getFilter(reactViewLabel, type, handler),
      dispatch: dispatchBy(dispatcher)
    });
  };
  dispatchBy = function(bus) {
    return function(capsule) {
      return bus.dispatch(capsule, bus.id);
    };
  };
  eventStreamName_question_ = function(val) {
    return eventStreamRegex.test(val);
  };
  getDispatcher = function(label) {
    var interpret;
    interpret = eventStreamName_question_(label) ? getEventStream : getProperty;
    return interpret(label);
  };
  getFilter = function(label, type, handler) {
    return function(val) {
      return val.label === label && (!type || val.type === type) && (!handler || val.handler === handler);
    };
  };
  getTargetValue = function(capsule) {
    var _ref1, _ref2;
    return capsule != null ? (_ref1 = capsule['event']) != null ? (_ref2 = _ref1['target']) != null ? _ref2['value'] : void 0 : void 0 : void 0;
  };
  interpretRecord = function(record) {
    var blur, config, handler, manage_question_, preventDefault, reactViewLabel, tgtBusLabel, type, _ref1;
    if (isArray(record)) {
      tgtBusLabel = record[0], reactViewLabel = record[1], type = record[2], handler = record[3], manage_question_ = record[4];
      if (isObject(type)) {
        _ref1 = type, blur = _ref1.blur, preventDefault = _ref1.preventDefault, handler = _ref1.handler, type = _ref1.type;
      } else {
        blur = preventDefault = manage_question_;
      }
    } else {
      handler = record.handler, reactViewLabel = record.reactViewLabel, blur = record.blur, preventDefault = record.preventDefault, tgtBusLabel = record.tgtBusLabel, type = record.type;
    }
    config = {
      doBlur: blur,
      doPreventDefault: preventDefault
    };
    return {
      config: config,
      handler: handler,
      reactViewLabel: reactViewLabel,
      tgtBusLabel: tgtBusLabel,
      type: type
    };
  };
  manageDispatcher = function(dispatcher, config) {
    var doBlur, doPreventDefault;
    doBlur = config.doBlur, doPreventDefault = config.doPreventDefault;
    if (doBlur) {
      dispatcher.subscribe(_blur);
    }
    if (doPreventDefault) {
      return dispatcher.subscribe(_preventDefault);
    }
  };
  _preventDefault = function(capsule) {
    if (capsule.event.preventDefault) {
      return capsule.event.preventDefault();
    }
  };
  reactIntakeBus = connectBus(reactIntake);
  reactIntakeBus.subscribe(actAsSwitchboard);
  return connectPortsToBuses;
};



},{"./utilities":7}],4:[function(_dereq_,module,exports){
var addComponent, getComponent, _ref;

_ref = _dereq_('./utilities'), addComponent = _ref.addComponent, getComponent = _ref.getComponent;

module.exports = function(createEventStreamBus) {
  var busExt, connectPortComponent, getPortComponent, keypaths, portExt, ports, register;
  keypaths = {};
  ports = {};
  busExt = '.bus';
  portExt = '.port';
  connectPortComponent = function(extension) {
    return function(keypath) {
      if (!keypaths[keypath]) {
        register(keypath);
      }
      return getPortComponent(extension, keypath);
    };
  };
  getPortComponent = function(extension, keypath) {
    return getComponent(keypath + extension, ports);
  };
  register = function(keypath) {
    var bus, port;
    bus = createEventStreamBus();
    bus.setAlias(keypath);
    port = function(val) {
      return bus.dispatch(val, bus.id);
    };
    addComponent(keypath, {
      bus: bus,
      port: port
    }, ports);
    return keypaths[keypath] = true;
  };
  return {
    connectBus: connectPortComponent(busExt),
    connectPort: connectPortComponent(portExt)
  };
};



},{"./utilities":7}],5:[function(_dereq_,module,exports){
var isArray,
  __hasProp = {}.hasOwnProperty;

isArray = _dereq_('./utilities').isArray;

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



},{"./utilities":7}],6:[function(_dereq_,module,exports){
var extend, getAspenInitializer, getChannelConnectors, getPortConnector, getPortRegistrar, getReactiveAspen, getRegistrationUtilities;

extend = _dereq_('./utilities').extend;

getAspenInitializer = _dereq_('./getAspenInitializer');

getChannelConnectors = _dereq_('./getChannelConnectors');

getPortConnector = _dereq_('./getPortConnector');

getPortRegistrar = _dereq_('./getPortRegistrar');

getRegistrationUtilities = _dereq_('./getRegistrationUtilities');

getReactiveAspen = function(renderToDOM, connectTo, EventManager) {
  var Controller, appStateProperty, blockTillReady, config1, config2, config3, connect, connectBus, connectPort, connectPortsToBuses, connectViewToController, connectors, createEventStreamBus, createNonInitPropertyBus, doAsync, getDispatcher, getEventStream, getProperty, initialize, onValue, portRegistrar, push, reactIntake, reactIntakePort, registrationUtilities, terminusEventStream, _ref, _ref1;
  _ref = EventManager.factories, createEventStreamBus = _ref.createEventStreamBus, createNonInitPropertyBus = _ref.createNonInitPropertyBus;
  _ref1 = EventManager.utilities, blockTillReady = _ref1.blockTillReady, connect = _ref1.connect, doAsync = _ref1.doAsync, onValue = _ref1.onValue;
  config1 = {
    connect: connect,
    createEventStreamBus: createEventStreamBus,
    createNonInitPropertyBus: createNonInitPropertyBus
  };
  registrationUtilities = getRegistrationUtilities(config1);
  getDispatcher = registrationUtilities.getDispatcher;
  getEventStream = registrationUtilities.getEventStream;
  getProperty = registrationUtilities.getProperty;
  appStateProperty = getProperty('_appState_');
  reactIntake = '.reactIntake';
  terminusEventStream = getEventStream('_terminus_');
  config2 = {
    connect: connect,
    getDispatcher: getDispatcher,
    onValue: onValue,
    terminusEventStream: terminusEventStream
  };
  connectors = getChannelConnectors(config2);
  push = connectors.push;
  portRegistrar = getPortRegistrar(createEventStreamBus);
  connectBus = portRegistrar.connectBus;
  connectPort = portRegistrar.connectPort;
  config3 = {
    connectBus: connectBus,
    getEventStream: getEventStream,
    getProperty: getProperty,
    reactIntake: reactIntake
  };
  connectPortsToBuses = getPortConnector(config3);
  reactIntakePort = connectPort(reactIntake);
  connectViewToController = function() {
    return connectTo(reactIntakePort);
  };
  initialize = getAspenInitializer({
    appStateProperty: appStateProperty,
    blockTillReady: blockTillReady,
    connectPortsToBuses: connectPortsToBuses,
    connectViewToController: connectViewToController,
    doAsync: doAsync,
    onValue: onValue,
    push: push,
    renderToDOM: renderToDOM,
    terminusEventStream: terminusEventStream
  });
  Controller = extend({}, connectors, registrationUtilities);
  return {
    appStateProperty: appStateProperty,
    Controller: Controller,
    initialize: initialize
  };
};

module.exports = getReactiveAspen;



},{"./getAspenInitializer":1,"./getChannelConnectors":2,"./getPortConnector":3,"./getPortRegistrar":4,"./getRegistrationUtilities":5,"./utilities":7}],7:[function(_dereq_,module,exports){
var ObjProto, addComponent, compositeRegex, dot, extend, getComponent, getKeys, hasType, identity, isArray, isAtomicKeypath, isObject, isString, keypathRegex, processKeypath, shallowCopy, toString, transformResult, _ref,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

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

extend = function() {
  var key, mixin, mixins, obj, val, _i, _len;
  obj = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  for (_i = 0, _len = mixins.length; _i < _len; _i++) {
    mixin = mixins[_i];
    for (key in mixin) {
      if (!__hasProp.call(mixin, key)) continue;
      val = mixin[key];
      obj[key] = val;
    }
  }
  return obj;
};

getComponent = function(keypath, obj) {
  var key, nextKey, nextKeypath, _ref;
  if (isAtomicKeypath(keypath)) {
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

isAtomicKeypath = function(keypath) {
  return !(compositeRegex.test(keypath));
};

hasType = function(type) {
  return function(val) {
    return ("[object " + type + "]") === toString(val);
  };
};

_ref = ['Object', 'String'].map(hasType), isObject = _ref[0], isString = _ref[1];

processKeypath = function(keypath) {
  return keypathRegex.exec(keypath).slice(1, 3);
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

toString = function(val) {
  return ObjProto.toString.call(val);
};

transformResult = function(result, fn) {
  return result = fn(result);
};

module.exports = {
  addComponent: addComponent,
  extend: extend,
  getComponent: getComponent,
  isArray: isArray,
  isObject: isObject,
  isString: isString
};



},{}]},{},[6])
(6)
});