var $onValue, TERMINUS, appNodeId, appState, blockTillReady, checkValue, connect, doAsync, getEventStream, getProperty, identity, linkTogetherMVC, plugIntoTerminus, render, resetAppState, topViewFactory, _getElementById, _linkTogetherMVC, _ref, _ref1, _ref2;

connect = require('./channel-connectors.js').connect;

_ref = require('./channel-registrar.js'), getEventStream = _ref.getEventStream, getProperty = _ref.getProperty;

identity = require('../utilities.js').identity;

linkTogetherMVC = require('./linkTogetherMVC.js');

render = require('../react-module/exports.js').React.render;

_ref1 = require('../pando.js'), blockTillReady = _ref1.blockTillReady, checkValue = _ref1.checkValue, $onValue = _ref1.$onValue;

_ref2 = ['app-node-id', 'app-state', 'top-view-factory'].map(getProperty), appNodeId = _ref2[0], appState = _ref2[1], topViewFactory = _ref2[2];

doAsync = checkValue;

_getElementById = doAsync(document.getElementById.bind(document));

_linkTogetherMVC = doAsync(linkTogetherMVC);

TERMINUS = 'terminus';

plugIntoTerminus = function(observable) {
  return connect(observable)(TERMINUS)(function() {
    return identity;
  });
};

resetAppState = function(transform) {
  var component, newAppState, node;
  node = _getElementById(appNodeId);
  newAppState = doAsync(transform)(appState);
  component = _linkTogetherMVC(topViewFactory, newAppState);
  return blockTillReady(render)(component, node);
};

$onValue(getEventStream('terminus'))(blockTillReady(resetAppState));

module.exports = {
  plugIntoTerminus: plugIntoTerminus
};
