var actAsSwitchboard, connectBus, connectIntakeToTarget, connectPortsToBuses, dispatchBy, eventStreamName_question_, eventStreamRegex, getDispatcher, getEventStream, getFilter, getProperty, getTargetValue, reactIntake, reactIntakeBus, switches, _ref;

connectBus = require('./port-registrar.js').connectBus;

_ref = require('../controller/channel-registrar.js'), getEventStream = _ref.getEventStream, getProperty = _ref.getProperty;

reactIntake = require('./react-intake.js');

eventStreamRegex = /^\$/;

switches = [];

actAsSwitchboard = function(event) {
  var condition, dispatch, swich, _i, _len;
  for (_i = 0, _len = switches.length; _i < _len; _i++) {
    swich = switches[_i];
    condition = swich.condition, dispatch = swich.dispatch;
    if (condition(event)) {
      return dispatch(event);
    }
  }
};

connectPortsToBuses = function(triplets) {
  return triplets.forEach(connectIntakeToTarget);
};

connectIntakeToTarget = function(_arg) {
  var dispatcher, handler, reactViewLabel, tgtBusLabel, type;
  tgtBusLabel = _arg[0], reactViewLabel = _arg[1], type = _arg[2], handler = _arg[3];
  dispatcher = getDispatcher(tgtBusLabel);
  return switches.push({
    condition: getFilter(reactViewLabel, type, handler),
    dispatch: dispatchBy(dispatcher)
  });
};

dispatchBy = function(bus) {
  return function(capsule) {
    var targetValue, val;
    targetValue = getTargetValue(capsule);
    val = targetValue ? targetValue : capsule;
    return bus.dispatch(val, bus.id);
  };
};

eventStreamName_question_ = function(val) {
  return eventStreamRegex.test(val);
};

getDispatcher = function(label) {
  var interpret;
  interpret = eventStreamName_question_(label) ? getEventStream : getProperty;
  return interpret(label);
};

getFilter = function(label, type, handler) {
  return function(val) {
    return val.label === label && (!type || val.type === type) && (!handler || val.handler === handler);
  };
};

getTargetValue = function(capsule) {
  var _ref1, _ref2;
  return capsule != null ? (_ref1 = capsule['event']) != null ? (_ref2 = _ref1['target']) != null ? _ref2['value'] : void 0 : void 0 : void 0;
};

reactIntakeBus = connectBus(reactIntake);

reactIntakeBus.subscribe(actAsSwitchboard);

module.exports = connectPortsToBuses;
