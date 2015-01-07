var initialize, plugIntoTerminus;

initialize = require('./initialize');

plugIntoTerminus = require('./terminus').plugIntoTerminus;

module.exports = {
  initialize: initialize,
  plugIntoTerminus: plugIntoTerminus
};
