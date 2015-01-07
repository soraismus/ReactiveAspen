var connectPort, connectTo, connectViewToController, reactIntake, reactIntakeBus;

connectTo = require('react-bridge').connectTo;

connectPort = require('./port-registrar').connectPort;

reactIntake = require('./react-intake');

connectViewToController = function() {
  return connectTo(reactIntakeBus);
};

reactIntakeBus = connectPort(reactIntake);

module.exports = connectViewToController;
