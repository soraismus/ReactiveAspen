var connect, getDispatcher, getEventStream, getProperty, interpret, plug, push, _ref, _ref1;

_ref = require('./channel-connectors.js'), connect = _ref.connect, interpret = _ref.interpret, plug = _ref.plug, push = _ref.push;

_ref1 = require('./channel-registrar.js'), getDispatcher = _ref1.getDispatcher, getEventStream = _ref1.getEventStream, getProperty = _ref1.getProperty;

module.exports = {
  connect: connect,
  getDispatcher: getDispatcher,
  getEventStream: getEventStream,
  getProperty: getProperty,
  interpret: interpret,
  plug: plug,
  push: push
};
