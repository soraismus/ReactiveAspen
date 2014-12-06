var getAdapter, getInjectedFactory, getTemplate, handlerRegex, handler_question_, inject, isFunction,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

getInjectedFactory = require('./factory-injector.js').getInjectedFactory;

isFunction = require('./utilities.js').isFunction;

handlerRegex = /^on[A-Z]/;

handler_question_ = function(val) {
  return handlerRegex.test(val);
};

getAdapter = function(record) {
  var adapterType, defaultEventType, ensureProps, reactFactory;
  defaultEventType = record[0], ensureProps = record[1], reactFactory = record[2], adapterType = record[3];
  return getInjectedFactory(getTemplate(defaultEventType, ensureProps, reactFactory), adapterType);
};

getTemplate = function(defaultEventType, ensureProps, reactFactory) {
  var _inject;
  _inject = inject(defaultEventType, ensureProps);
  return function(getHandlerForType) {
    return function() {
      var components, newProps, props;
      props = arguments[0], components = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      newProps = _inject(getHandlerForType, props);
      return reactFactory.apply(null, [newProps].concat(__slice.call(components)));
    };
  };
};

inject = function(defaultEventType, ensureProps) {
  return function(getHandlerForType, props) {
    var key, needsHandler_question_, newProps, value;
    needsHandler_question_ = true;
    newProps = ensureProps(props);
    for (key in newProps) {
      if (!__hasProp.call(newProps, key)) continue;
      value = newProps[key];
      if (handler_question_(key)) {
        needsHandler_question_ = false;
        if (!isFunction(value)) {
          newProps[key] = getHandlerForType(key);
        }
      }
    }
    if (needsHandler_question_) {
      newProps[defaultEventType] = getHandlerForType(defaultEventType);
    }
    return newProps;
  };
};

module.exports = {
  getAdapter: getAdapter
};
