var connect, connectMultiple, connectSingle, getDispatcher, interpret, isString, pandoConnect, plug, push, setAlias, _connect;

getDispatcher = require('./channel-registrar.js').getDispatcher;

isString = '../utilities.js'.isString;

pandoConnect = require('../pando.js').connect;

_connect = function(src, tgt, transform) {
  var _ref, _src, _tgt;
  _ref = [src, tgt].map(interpret), _src = _ref[0], _tgt = _ref[1];
  setAlias(_src)(src);
  setAlias(_tgt)(tgt);
  return pandoConnect(_src)(_tgt)(transform);
};

connect = function(sources) {
  return function(targets) {
    return function(thunk) {
      if (Array.isArray(sources)) {
        return connectMultiple(sources, targets, thunk());
      } else {
        return connectSingle(sources, targets, thunk());
      }
    };
  };
};

connectMultiple = function(sources, targets, transforms) {
  var i, j, src, tgt, _i, _j, _len, _len1, _results, _results1;
  if (Array.isArray(targets)) {
    _results = [];
    for (i = _i = 0, _len = targets.length; _i < _len; i = ++_i) {
      tgt = targets[i];
      _results.push((function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (j = _j = 0, _len1 = sources.length; _j < _len1; j = ++_j) {
          src = sources[j];
          _results1.push(connect(src)(tgt)(function() {
            return transforms[i][j];
          }));
        }
        return _results1;
      })());
    }
    return _results;
  } else {
    _results1 = [];
    for (i = _j = 0, _len1 = sources.length; _j < _len1; i = ++_j) {
      src = sources[i];
      _results1.push(connect(src)(targets)(function() {
        return transforms[i];
      }));
    }
    return _results1;
  }
};

connectSingle = function(source, targets, transforms) {
  var i, tgt, _i, _len, _results;
  if (Array.isArray(targets)) {
    _results = [];
    for (i = _i = 0, _len = targets.length; _i < _len; i = ++_i) {
      tgt = targets[i];
      _results.push(connect(source)(tgt)(function() {
        return transforms[i];
      }));
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

plug = function(targets) {
  return function(thunk) {
    return function(sources) {
      return connect(sources)(targets)(thunk);
    };
  };
};

push = function(label) {
  return function(val) {
    var bus;
    bus = interpret(label);
    return bus.dispatch(val, bus.id);
  };
};

setAlias = function(bus) {
  return function(val) {
    if (isString(val)) {
      return bus.setAlias(val);
    }
  };
};

module.exports = {
  connect: connect,
  interpret: interpret,
  plug: plug,
  push: push
};
