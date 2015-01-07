var TERMINUS, appNodeId, appState, blockTillReady, connect, doAsync, getEventStream, getProperty, identity, linkTogetherMVC, onValue, plugIntoTerminus, render, resetAppState, topViewFactory, _getElementById, _linkTogetherMVC, _ref, _ref1, _ref2;

_ref = require('../pando/utilities'), blockTillReady = _ref.blockTillReady, doAsync = _ref.doAsync, onValue = _ref.onValue;

_ref1 = require('../controller/exports'), connect = _ref1.connect, getEventStream = _ref1.getEventStream, getProperty = _ref1.getProperty;

identity = require('../utilities').identity;

linkTogetherMVC = require('./linkTogetherMVC');

render = require('../react-render');

_ref2 = ['app-node-id', 'app-state', 'top-view-factory'].map(getProperty), appNodeId = _ref2[0], appState = _ref2[1], topViewFactory = _ref2[2];

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

onValue(getEventStream('terminus'))(blockTillReady(resetAppState));

module.exports = {
  plugIntoTerminus: plugIntoTerminus
};
