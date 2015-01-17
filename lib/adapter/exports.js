var connectPortsToBuses, connectViewToController;

connectPortsToBuses = require('./connectPortsToBuses');

connectViewToController = require('./pando-adapter');

module.exports = {
  connectPortsToBuses: connectPortsToBuses,
  connectViewToController: connectViewToController
};
