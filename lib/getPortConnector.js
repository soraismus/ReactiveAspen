var isArray, isObject, _ref;

_ref = require('./utilities'), isArray = _ref.isArray, isObject = _ref.isObject;

module.exports = function(args) {
  var actAsSwitchboard, connectBus, connectIntakeToTarget, connectPortsToBuses, dispatchBy, eventStreamName_question_, eventStreamRegex, getDispatcher, getEventStream, getFilter, getProperty, getTargetValue, interpretRecord, manageDispatcher, reactIntake, reactIntakeBus, switches, _blur, _preventDefault;
  connectBus = args.connectBus, getEventStream = args.getEventStream, getProperty = args.getProperty, reactIntake = args.reactIntake;
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
  _blur = function(capsule) {
    if (capsule.type === 'link') {
      return capsule.event.target.blur();
    }
  };
  connectPortsToBuses = function(triplets) {
    return triplets.forEach(connectIntakeToTarget);
  };
  connectIntakeToTarget = function(record) {
    var config, dispatcher, handler, reactViewLabel, tgtBusLabel, type, _ref1;
    _ref1 = interpretRecord(record), config = _ref1.config, handler = _ref1.handler, reactViewLabel = _ref1.reactViewLabel, tgtBusLabel = _ref1.tgtBusLabel, type = _ref1.type;
    dispatcher = getDispatcher(tgtBusLabel);
    manageDispatcher(dispatcher, config);
    return switches.push({
      condition: getFilter(reactViewLabel, type, handler),
      dispatch: dispatchBy(dispatcher)
    });
  };
  dispatchBy = function(bus) {
    return function(capsule) {
      return bus.dispatch(capsule, bus.id);
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
  interpretRecord = function(record) {
    var blur, config, handler, manage_question_, preventDefault, reactViewLabel, tgtBusLabel, type, _ref1;
    if (isArray(record)) {
      tgtBusLabel = record[0], reactViewLabel = record[1], type = record[2], handler = record[3], manage_question_ = record[4];
      if (isObject(type)) {
        _ref1 = type, blur = _ref1.blur, preventDefault = _ref1.preventDefault, handler = _ref1.handler, type = _ref1.type;
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
  _preventDefault = function(capsule) {
    if (capsule.event.preventDefault) {
      return capsule.event.preventDefault();
    }
  };
  reactIntakeBus = connectBus(reactIntake);
  reactIntakeBus.subscribe(actAsSwitchboard);
  return connectPortsToBuses;
};
