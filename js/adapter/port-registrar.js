var addComponent, connectPort, connectPortComponent, createEventStreamBus, getComponent, getPortComponent, keypaths, portExtension, ports, register, _ref;

_ref = require('../utilities.js'), addComponent = _ref.addComponent, getComponent = _ref.getComponent;

createEventStreamBus = require('../pando.js').createEventStreamBus;

keypaths = {};

ports = {};

portExtension = '.port';

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

connectPort = connectPortComponent(portExtension);

module.exports = {
  connectPort: connectPort
};


/*
 * This function shouldn't be directly included in this file.
blur = \capsule ->
  capsule.event.target.blur () if capsule.type == 'link'

 * This function shouldn't be directly included in this file.
preventDefault = \capsule ->
  capsule.event.preventDefault () if capsule.event.preventDefault

 * These subscriptions perhaps shouldn't be directly included here.
 * As a side effect, these two subscriptions activate the principal bus.
onValue preventDefault bus
onValue blur bus
 */
