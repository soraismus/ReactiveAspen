var Bridge, React, adapters, connectTo;

adapters = require('./react-bridge/adapters.js');

connectTo = require('./react-bridge/factory-injector.js').connectTo;

React = require('./react-bridge/react.js');

Bridge = {
  adapters: adapters,
  connectTo: connectTo
};

module.exports = {
  Bridge: Bridge,
  React: React
};
