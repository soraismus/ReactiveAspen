var adapters, connectTo, sensitize;

adapters = require('./adapters.js');

connectTo = require('./factory-injector.js').connectTo;

sensitize = require('./sensitive-component.js');

module.exports = {
  adapters: adapters,
  connectTo: connectTo,
  sensitize: sensitize
};
