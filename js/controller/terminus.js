var $onValue, APP_DOM_ID, Pando, React, TERMINUS, appState, blockTillReady, checkValue, connect, getElementById, getEventStream, getProperty, identity, linkTogetherMVC, node, plugIntoTerminus, renderComponent, resetAppState, topViewFactory, _linkTogetherMVC, _ref;

connect = require('./channel-connectors.js').connect;

_ref = require('./channel-registrar.js'), getEventStream = _ref.getEventStream, getProperty = _ref.getProperty;

identity = require('../utilities.js').identity;

linkTogetherMVC = require('./linkTogetherMVC.js');

Pando = require('../pando.js');

React = require('../react-module/exports.js').React;

blockTillReady = Pando.blockTillReady, checkValue = Pando.checkValue, $onValue = Pando.$onValue;

appState = getProperty('app-state');

APP_DOM_ID = 'reactive-aspen-app';

getElementById = document.getElementById;

node = getElementById(APP_DOM_ID);

renderComponent = React.renderComponent;

_linkTogetherMVC = checkValue(linkTogtherMVC);

TERMINUS = 'terminus';

topViewFactory = getProperty('top-view-factory');

plugIntoTerminus = function(observable) {
  return connect(observable)(TERMINUS)(identity);
};

resetAppState = function(transform) {
  var component, newAppState;
  newAppState = checkValue(transform)(appState);
  component = _linkTogetherMVC(topViewFactory, newAppState);
  return blockTillReady(renderComponent)(component, node);
};

$onValue(getEventStream('terminus'))(blockTillReady(resetAppState));

module.exports = {
  plugIntoTerminus: plugIntoTerminus
};
