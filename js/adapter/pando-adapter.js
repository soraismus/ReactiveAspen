var connectPort, connectTo, connectViewToController, reactIntake;

connectTo = require('./react-bridge.js').connectTo;

connectPort = require('./port-registrar.js').connectPort;

reactIntake = connectPort('react-intake');

connectViewToController = function() {
  return connectTo(reactIntake);
};

module.exports = connectViewToController;
