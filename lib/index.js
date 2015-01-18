var extend, getAspenInitializer, getChannelConnectors, getPortConnector, getPortRegistrar, getReactiveAspen, getRegistrationUtilities;

extend = require('./utilities').extend;

getAspenInitializer = require('./getAspenInitializer');

getChannelConnectors = require('./getChannelConnectors');

getPortConnector = require('./getPortConnector');

getPortRegistrar = require('./getPortRegistrar');

getRegistrationUtilities = require('./getRegistrationUtilities');

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
