var addComponent, busExt, connectBus, connectPort, connectPortComponent, createEventStreamBus, getComponent, getPortComponent, keypaths, portExt, ports, register, _ref, _ref1;

_ref = require('../utilities'), addComponent = _ref.addComponent, getComponent = _ref.getComponent;

createEventStreamBus = require('../pando/factories').createEventStreamBus;

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

_ref1 = [busExt, portExt].map(connectPortComponent), connectBus = _ref1[0], connectPort = _ref1[1];

module.exports = {
  connectBus: connectBus,
  connectPort: connectPort
};