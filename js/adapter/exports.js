var connectPortsToBuses, connectViewToController;

connectPortsToBuses = require('./connectPortsToBuses.js');

connectViewToController = require('./pando-adapter.js');

module.exports = {
  connectPortsToBuses: connectPortsToBuses,
  connectViewToController: connectViewToController
};
