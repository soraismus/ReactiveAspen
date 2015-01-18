var isArray, isString, _ref;

_ref = require('./utilities'), isArray = _ref.isArray, isString = _ref.isString;

module.exports = function(config) {
  var connect, connectMultiple, connectSingle, getDispatcher, interpret, onEvent, onValue, pandoConnect, pandoOnValue, plug, plugIntoTerminus, push, setAlias, terminusEventStream, _connect;
  getDispatcher = config.getDispatcher;
  pandoConnect = config.connect;
  pandoOnValue = config.onValue;
  terminusEventStream = config.terminusEventStream;
  _connect = function(src, tgt, transform) {
    var _ref1, _src, _tgt;
    _ref1 = [src, tgt].map(interpret), _src = _ref1[0], _tgt = _ref1[1];
    setAlias(_src, src);
    setAlias(_tgt, tgt);
    return pandoConnect(_src, _tgt, transform);
  };
  connect = function(sources) {
    return function(targets) {
      return function(thunk) {
        if (isArray(sources)) {
          return connectMultiple(sources, targets, thunk());
        } else {
          return connectSingle(sources, targets, thunk());
        }
      };
    };
  };
  connectMultiple = function(sources, targets, transforms) {
    var i, j, src, tgt, _i, _j, _len, _len1, _results, _results1;
    if (isArray(targets)) {
      _results = [];
      for (i = _i = 0, _len = targets.length; _i < _len; i = ++_i) {
        tgt = targets[i];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (j = _j = 0, _len1 = sources.length; _j < _len1; j = ++_j) {
            src = sources[j];
            _results1.push(_connect(src, tgt, transforms[i][j]));
          }
          return _results1;
        })());
      }
      return _results;
    } else {
      _results1 = [];
      for (i = _j = 0, _len1 = sources.length; _j < _len1; i = ++_j) {
        src = sources[i];
        _results1.push(_connect(src, targets, transforms[i]));
      }
      return _results1;
    }
  };
  connectSingle = function(source, targets, transforms) {
    var i, tgt, _i, _len, _results;
    if (isArray(targets)) {
      _results = [];
      for (i = _i = 0, _len = targets.length; _i < _len; i = ++_i) {
        tgt = targets[i];
        _results.push(_connect(source, tgt, transforms[i]));
      }
      return _results;
    } else {
      return _connect(source, targets, transforms);
    }
  };
  interpret = function(value) {
    if (isString(value)) {
      return getDispatcher(value, false);
    } else {
      return value;
    }
  };
  onEvent = function(source, sink) {
    return interpret(source).subscribe(sink);
  };
  onValue = function(source, sink) {
    return pandoOnValue(interpret(source), sink);
  };
  plug = function(targets) {
    return function(thunk) {
      return function(sources) {
        return connect(sources)(targets)(thunk);
      };
    };
  };
  plugIntoTerminus = function(source, transform) {
    return connect(source)(terminusEventStream)(transform);
  };
  push = function(label) {
    return function(val) {
      var bus;
      bus = interpret(label);
      return bus.dispatch(val, bus.id);
    };
  };
  setAlias = function(bus, val) {
    if (isString(val)) {
      return bus.setAlias(val);
    }
  };
  return {
    connect: connect,
    interpret: interpret,
    onEvent: onEvent,
    onValue: onValue,
    plug: plug,
    plugIntoTerminus: plugIntoTerminus,
    push: push
  };
};
