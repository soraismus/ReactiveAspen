var $onValue, APP_DOM_ID, Pando, React, TERMINUS, appState, blockTillReady, checkValue, connect, getEventStream, getProperty, identity, linkTogetherMVC, plugIntoTerminus, render, resetAppState, topViewFactory, _linkTogetherMVC, _ref;

connect = require('./channel-connectors.js').connect;

_ref = require('./channel-registrar.js'), getEventStream = _ref.getEventStream, getProperty = _ref.getProperty;

identity = require('../utilities.js').identity;

linkTogetherMVC = require('./linkTogetherMVC.js');

Pando = require('../pando.js');

React = require('../react-module/exports.js').React;

blockTillReady = Pando.blockTillReady, checkValue = Pando.checkValue, $onValue = Pando.$onValue;

appState = getProperty('app-state');

APP_DOM_ID = 'todoapp';

render = React.render;

_linkTogetherMVC = checkValue(linkTogetherMVC);

TERMINUS = 'terminus';

topViewFactory = getProperty('top-view-factory');

plugIntoTerminus = function(observable) {
  return connect(observable)(TERMINUS)(identity);
};

resetAppState = function(transform) {
  var component, newAppState, node;
  node = document.getElementById(APP_DOM_ID);
  newAppState = checkValue(transform)(appState);
  component = _linkTogetherMVC(topViewFactory, newAppState);
  return blockTillReady(render)(component, node);
};

$onValue(getEventStream('terminus'))(blockTillReady(resetAppState));

module.exports = {
  plugIntoTerminus: plugIntoTerminus
};
