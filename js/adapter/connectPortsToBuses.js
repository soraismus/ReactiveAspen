var actAsSwitchboard, blur, connectBus, connectIntakeToTarget, connectPortsToBuses, dispatchBy, eventStreamName_question_, eventStreamRegex, getDispatchableValue, getDispatcher, getEventStream, getFilter, getProperty, getTargetValue, interpretRecord, isArray, isObject, manageDispatcher, preventDefault, reactIntake, reactIntakeBus, switches, _blur, _preventDefault, _ref, _ref1, _ref2, _ref3;

_ref = require('./port-utilities.js'), blur = _ref.blur, preventDefault = _ref.preventDefault;

_ref1 = [blur, preventDefault], _blur = _ref1[0], _preventDefault = _ref1[1];

connectBus = require('./port-registrar.js').connectBus;

_ref2 = require('./channel-registrar.js'), getEventStream = _ref2.getEventStream, getProperty = _ref2.getProperty;

_ref3 = require('../utilities.js'), isArray = _ref3.isArray, isObject = _ref3.isObject;

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

connectIntakeToTarget = function(record) {
  var config, dispatcher, handler, reactViewLabel, tgtBusLabel, type, _ref4;
  _ref4 = interpretRecord(record), config = _ref4.config, handler = _ref4.handler, reactViewLabel = _ref4.reactViewLabel, tgtBusLabel = _ref4.tgtBusLabel, type = _ref4.type;
  dispatcher = getDispatcher(tgtBusLabel);
  manageDispatcher(dispatcher, config);
  return switches.push({
    condition: getFilter(reactViewLabel, type, handler),
    dispatch: dispatchBy(dispatcher)
  });
};

dispatchBy = function(bus) {
  return function(capsule) {
    return bus.dispatch(getDispatchableValue(capsule), bus.id);
  };
};

eventStreamName_question_ = function(val) {
  return eventStreamRegex.test(val);
};

getDispatchableValue = function(capsule) {
  var targetValue;
  targetValue = getTargetValue(capsule);
  if (targetValue) {
    return targetValue;
  } else {
    return capsule;
  }
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
  var _ref4, _ref5;
  return capsule != null ? (_ref4 = capsule['event']) != null ? (_ref5 = _ref4['target']) != null ? _ref5['value'] : void 0 : void 0 : void 0;
};

interpretRecord = function(record) {
  var config, handler, manage_question_, reactViewLabel, tgtBusLabel, type, _ref4;
  if (isArray(record)) {
    tgtBusLabel = record[0], reactViewLabel = record[1], type = record[2], handler = record[3], manage_question_ = record[4];
    if (isObject(type)) {
      _ref4 = type, blur = _ref4.blur, preventDefault = _ref4.preventDefault, handler = _ref4.handler, type = _ref4.type;
    } else {
      blur = preventDefault = manage_question_;
    }
  } else {
    handler = record.handler, reactViewLabel = record.reactViewLabel, blur = record.blur, preventDefault = record.preventDefault, tgtBusLabel = record.tgtBusLabel, type = record.type;
  }
  config = {
    doBlur: blur,
    doPreventDefault: preventDefault
  };
  return {
    config: config,
    handler: handler,
    reactViewLabel: reactViewLabel,
    tgtBusLabel: tgtBusLabel,
    type: type
  };
};

manageDispatcher = function(dispatcher, config) {
  var doBlur, doPreventDefault;
  doBlur = config.doBlur, doPreventDefault = config.doPreventDefault;
  if (doBlur) {
    dispatcher.subscribe(_blur);
  }
  if (doPreventDefault) {
    return dispatcher.subscribe(_preventDefault);
  }
};

reactIntakeBus = connectBus(reactIntake);

reactIntakeBus.subscribe(actAsSwitchboard);

module.exports = connectPortsToBuses;
