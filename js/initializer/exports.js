var initialize, plugIntoTerminus;

initialize = require('./initialize.js');

plugIntoTerminus = require('./terminus.js').plugIntoTerminus;

module.exports = {
  initialize: initialize,
  plugIntoTerminus: plugIntoTerminus
};
