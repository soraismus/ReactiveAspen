var appStateChannelName, connectViewToController, linkTogetherMVC, push;

connectViewToController = require('../adapter/pando-adapter.js');

push = require('./channel-connectors.js').push;

appStateChannelName = 'app-state';

linkTogetherMVC = function(topViewFactory, appState) {
  var descriptor;
  push(appStateChannelName)(appState);
  descriptor = topViewFactory(appState);
  connectViewToController();
  return descriptor;
};

module.exports = linkTogetherMVC;
