var connectPort, connectTo, connectViewToController, reactIntake, reactIntakeBus;

connectTo = require('./react-bridge.js').connectTo;

connectPort = require('./port-registrar.js').connectPort;

reactIntake = require('./react-intake.js');

reactIntakeBus = connectPort(reactIntake);

connectViewToController = function() {
  return connectTo(reactIntakeBus);
};

module.exports = connectViewToController;
