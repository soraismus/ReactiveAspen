var createClass, encapsulateInfo, getInjectedFactory, sensitiveRenderMixin, sensitize, template,
  __slice = [].slice;

getInjectedFactory = require('./factory-injector.js').getInjectedFactory;

createClass = require('../react-with-addons.js').createClass;

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
        mixins: [senstiveRenderMixin(getHandlerForType)],
        render: function() {
          return factory.apply(null, args);
        }
      };
      return createClass(properties)();
    };
  };
};

sensitize = getInjectedFactory(template, 'sensitive');

module.exports = sensitize;
