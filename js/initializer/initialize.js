var connectPortsToBuses, initialize, linkTogetherMVC, push, render, _ref;

connectPortsToBuses = require('../adapter/exports.js').connectPortsToBuses;

_ref = require('../controller/exports.js'), linkTogetherMVC = _ref.linkTogetherMVC, push = _ref.push;

render = require('../react-module/exports.js').React.render;

initialize = function(appNodeID, topViewFactory, initialAppState, viewImports) {
  var topReactDescriptor;
  push('app-node-id')(appNodeID);
  push('top-view-factory')(topViewFactory);
  topReactDescriptor = linkTogetherMVC(topViewFactory, initialAppState);
  render(topReactDescriptor, document.getElementById(appNodeID));
  return connectPortsToBuses(viewImports);
};

module.exports = initialize;
