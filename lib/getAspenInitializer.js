module.exports = function(config) {
  var appStateProperty, blockTillReady, connectPortsToBuses, connectViewToController, doAsync, initialize, linkTogetherMVC, node, onValue, push, renderToDOM, resetAppState, terminusEventStream, _linkTogetherMVC, _renderToDOM, _topViewFactory;
  appStateProperty = config.appStateProperty, blockTillReady = config.blockTillReady, connectPortsToBuses = config.connectPortsToBuses, connectViewToController = config.connectViewToController, doAsync = config.doAsync, onValue = config.onValue, push = config.push, renderToDOM = config.renderToDOM, terminusEventStream = config.terminusEventStream;
  node = null;
  _topViewFactory = null;
  initialize = function(appNodeID, topViewFactory, initialAppState, viewImports) {
    var reactElement;
    node = document.getElementById(appNodeID);
    _topViewFactory = topViewFactory;
    reactElement = linkTogetherMVC(topViewFactory, initialAppState);
    renderToDOM(reactElement, node);
    return connectPortsToBuses(viewImports);
  };
  linkTogetherMVC = function(topViewFactory, appState) {
    var reactElement;
    push(appStateProperty)(appState);
    reactElement = topViewFactory(appState);
    connectViewToController();
    return reactElement;
  };
  resetAppState = function(transform) {
    var newAppState, reactElement;
    newAppState = doAsync(transform)(appStateProperty);
    reactElement = _linkTogetherMVC(_topViewFactory, newAppState);
    return _renderToDOM(reactElement, node);
  };
  _linkTogetherMVC = doAsync(linkTogetherMVC);
  _renderToDOM = blockTillReady(renderToDOM);
  onValue(terminusEventStream, blockTillReady(resetAppState));
  return initialize;
};
