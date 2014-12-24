var createClass, createFactory, encapsulateInfo, getInjectedFactory, sensitiveRenderMixin, sensitize, template, _ref,
  __slice = [].slice;

getInjectedFactory = require('./factory-injector.js').getInjectedFactory;

_ref = require('../react-with-addons.js'), createClass = _ref.createClass, createFactory = _ref.createFactory;

encapsulateInfo = function(state) {
  return {
    component: this,
    state: state
  };
};

sensitiveRenderMixin = function(getHandlerForType) {
  var trigger;
  trigger = function(state) {
    return getHandlerForType('onStateChange')(encapsulateInfo(state));
  };
  return {
    componentDidMount: function() {
      return trigger('didMount');
    },
    componentDidUpdate: function() {
      return trigger('didUpdate');
    },
    componentWillMount: function() {
      return trigger('willMount');
    },
    componentWillReceiveProps: function() {
      return trigger('willReceiveProps');
    },
    componentWillUnmount: function() {
      return trigger('willUnmount');
    },
    componentWillUpdate: function() {
      return trigger('willUpdate');
    }
  };
};

template = function(getHandlerForType) {
  return function(factory) {
    return function() {
      var args, properties;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      properties = {
        mixins: [sensitiveRenderMixin(getHandlerForType)],
        render: function() {
          return factory.apply(null, args);
        }
      };
      return createFactory(createClass(properties))();
    };
  };
};

sensitize = getInjectedFactory(template, 'sensitive');

module.exports = sensitize;
