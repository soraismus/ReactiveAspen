var connect, connectInput, connectIntakeToTarget, connectNonInput, connectPort, connectPortsToBuses, createNonInitProperty, filter, filterByTypeAndLabel, filterIntake, filtering, getTargetValue, inputTypes, input_question_, reactIntake, remerse, remerseProp, _ref,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

connect = require('./channel-connectors.js').connect;

connectPort = require('./port-registrar.js').connectPort;

_ref = require('../pando.js'), createNonInitProperty = _ref.createNonInitProperty, filtering = _ref.filtering, remerse = _ref.remerse;

inputTypes = ['checkbox', 'password', 'text'];

reactIntake = 'react-intake';

connectInput = function(src) {
  return function(tgt) {
    var transform;
    transform = function(sink) {
      return function(capsule, id) {
        return sink(getTargetValue(capsule), id);
      };
    };
    return connect(src)(tgt)(function() {
      return transform;
    });
  };
};

connectIntakeToTarget = function(_arg) {
  var label, targetBus, type, _connect;
  type = _arg[0], label = _arg[1], targetBus = _arg[2];
  _connect = input_question_(type) ? connectInput : connectNonInput;
  return _connect(filterIntake(type, label))(targetBus);
};

connectNonInput = function(src) {
  return function(tgt) {
    return connect(src)(tgt)(identity);
  };
};

connectPortsToBuses = function(triplets) {
  return triplets.forEach(connectIntakeToTarget);
};

filter = function(predicate) {
  return function(dispatcher) {
    return remerseProp(filtering(predicate))(dispatcher);
  };
};

filterByTypeAndLabel = function(sourceBus) {
  return function(type, label) {
    return filter(function(val) {
      return val.type === type && val.label === label;
    })(sourceBus);
  };
};

filterIntake = filterByTypeAndLabel(connectPort(reactIntake));

getTargetValue = function(capsule) {
  var _ref1, _ref2;
  return capsule != null ? (_ref1 = capsule['event']) != null ? (_ref2 = _ref1['target']) != null ? _ref2['value'] : void 0 : void 0 : void 0;
};

input_question_ = function(capsuleType) {
  return __indexOf.call(inputTypes, capsuleType) >= 0;
};

remerseProp = remerse(createNonInitProperty);

module.exports = connectPortsToBuses;
