var appStateChannelName, connectViewToController, linkTogetherMVC, push;

connectViewToController = require('../adapter/exports').connectViewToController;

push = require('../controller/exports').push;

appStateChannelName = 'app-state';

linkTogetherMVC = function(topViewFactory, appState) {
  var descriptor;
  push(appStateChannelName)(appState);
  descriptor = topViewFactory(appState);
  connectViewToController();
  return descriptor;
};

module.exports = linkTogetherMVC;
