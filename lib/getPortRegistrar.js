var addComponent, getComponent, _ref;

_ref = require('./utilities'), addComponent = _ref.addComponent, getComponent = _ref.getComponent;

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
