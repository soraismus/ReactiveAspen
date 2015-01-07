var connectPortsToBuses, initialize, linkTogetherMVC, push, render;

connectPortsToBuses = require('../adapter/exports').connectPortsToBuses;

linkTogetherMVC = require('./linkTogetherMVC');

push = require('../controller/exports').push;

render = require('../react-render');

initialize = function(appNodeID, topViewFactory, initialAppState, viewImports) {
  var topReactDescriptor;
  push('app-node-id')(appNodeID);
  push('top-view-factory')(topViewFactory);
  topReactDescriptor = linkTogetherMVC(topViewFactory, initialAppState);
  render(topReactDescriptor, document.getElementById(appNodeID));
  return connectPortsToBuses(viewImports);
};

module.exports = initialize;
