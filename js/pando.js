var $dispatch, $onValue, $sample, $subscribe, $transubscribe, CoreCell, CoreDispatcher, CoreSignal, DAG_hyphen_updating_question_, EventStream, FRP, FuncProto, ObjProto, Property, Time, active, any_hyphen_postponement_question_, array_question_, bfiltering, bfilteringNonterminal, bind, bind_hyphen_data, blockTillReady, block_hyphen_N, blocking, bmapping, bracket, call_hyphen_only_hyphen_once, checkValue, clock, connect, createCell, createClock, createDispatcherType, createEventStream, createEventStreamBus, createNonInitProperty, createNonInitPropertyBus, createProperty, createPropertyBus, createSignal, createSignalType, createTime, create_hyphen_singleton, create_hyphen_super_hyphen_type, cytolyse, defined_question_, delaying, display, display_hyphen_cell_hyphen_type, display_hyphen_dispatcher_hyphen_type, display_hyphen_signal_hyphen_type, each, each_hyphen_property, empty_question_, end, endocytate, extend_bang_, extend_hyphen_core_hyphen_dispatcher, extend_hyphen_core_hyphen_signal, extend_hyphen_proto, filtering, filteringDefined, filteringNonterminal, filteringRelevant, flattening, flip, fmapD, fmapS, fromArray, fromCallback, fromDelayedValue, fromDispatcher, fromEventTarget, fromFinitePeriodicSequence, fromInternalDispatchOnly, fromMerger, fromPoll, fromSourceFunction, frpBind, function_question_, functionize, genESOpts, genNonInitPropOpts, genPropOpts, genSignalOpts, genTimeOpts, generate_hyphen_id, getPrototypeOf, getType, get_hyphen_arg_hyphen_array, get_hyphen_initiation_hyphen_status, get_hyphen_key, has_hyphen_postpone_question_, hash_question_, identity, ignoreIrrelevant, inactive, initiating_hyphen_DAG_hyphen_update_question_, isCell, isDispatcher, isEnd, isEventStream, isFromType, isProperty, isRelevant, isSignal, is_hyphen_postpone_question_, liftS, liftS2, map, mapping, merge, monitoringFirst, monitoringLatest, nativeBind, nativeToString, negating, no_hyphen_op, none, nonterminal_question_, object_question_, onFirstAndOnlyValue, onValue, parse_hyphen_opts, parse_hyphen_signal_hyphen_opts, paused, permitting_hyphen_only_hyphen_one_hyphen_value, plug, postpone, postponed_question_, reducing, register, registrar, remerse, removeFromRegistrar, reschedule, reset_hyphen_DAG_hyphen_update_hyphen_process, return_hyphen_no_hyphen_op, sample_hyphen_properties, scanning, seed, sink_hyphen_if_hyphen_sinkable, staggering, stateMachineProcessing, stepper, switcher, taking, transbind, transmit, transubscribe, try_hyphen_10, try_hyphen_N_hyphen_times, _arobase_prototype, _createDispatcherType, _filtering, _mapping, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _subscribe,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

initiating_hyphen_DAG_hyphen_update_question_ = true;

DAG_hyphen_updating_question_ = false;

get_hyphen_initiation_hyphen_status = function() {
  var _initiating_hyphen_DAG_hyphen_update_question_;
  _initiating_hyphen_DAG_hyphen_update_question_ = initiating_hyphen_DAG_hyphen_update_question_;
  initiating_hyphen_DAG_hyphen_update_question_ = false;
  DAG_hyphen_updating_question_ = true;
  return _initiating_hyphen_DAG_hyphen_update_question_;
};

reset_hyphen_DAG_hyphen_update_hyphen_process = function() {
  DAG_hyphen_updating_question_ = false;
  return initiating_hyphen_DAG_hyphen_update_question_ = true;
};

reschedule = function(thunk) {
  return setTimeout(thunk, 0);
};

has_hyphen_postpone_question_ = function(value) {
  var inner_hyphen_value;
  return isCell(value) && ((inner_hyphen_value = value.read()) === postpone || has_hyphen_postpone_question_(inner_hyphen_value));
};

is_hyphen_postpone_question_ = function(value) {
  return value === postpone;
};

postponed_question_ = function(value) {
  return is_hyphen_postpone_question_(value) || has_hyphen_postpone_question_(value);
};

any_hyphen_postponement_question_ = function(args) {
  return args.some(postponed_question_);
};

sample_hyphen_properties = function(args) {
  return map(function(val) {
    if (isProperty(val)) {
      return $sample(val);
    } else {
      return val;
    }
  })(args);
};

cytolyse = function(val) {
  if (isCell(val)) {
    return cytolyse(val.read());
  } else {
    return val;
  }
};

endocytate = function(N, fn, managed_hyphen_args, cell) {
  var cytolysed_hyphen_args;
  if (any_hyphen_postponement_question_(managed_hyphen_args)) {
    cell.write(postpone);
    if (N > 0) {
      reschedule(function() {
        return endocytate(N - 1, fn, managed_hyphen_args, cell);
      });
    }
  } else {
    cytolysed_hyphen_args = map(cytolyse)(managed_hyphen_args);
    cell.write(fn.apply(null, cytolysed_hyphen_args));
  }
  return cell;
};

ignoreIrrelevant = function(fn) {
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (args.every(isRelevant)) {
      return fn.apply(null, args);
    } else {
      return none;
    }
  };
};


/*
data State = Resolved | Updating
data State s => Property s t = State s
data Potential t = Identity t | Postpone | Now t
data Capsule t = Identity t | Potential t | Property _ t

checkValue :: (a -> b) -> (Capsule a -> Potential b)
-- `remerse` relates to a comonadic action.
remerse-as-extend :: Property s a -> (Property s a -> b) -> Property s b
remerse :: Property s a -> (a -> b) -> Property s b
remerse p f = remerse-as-extend p $ f . extract
continuate :: Potential a -> (a -> b) -> b
continuate p f = case p of Identity x -> f x
                           Now x -> f x
                           Postpone -> reschedule (\_ -> continuate p f)
 */

checkValue = function(fn) {
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return endocytate(10, ignoreIrrelevant(fn), sample_hyphen_properties(args), createCell());
  };
};

blockTillReady = function(fn) {
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return block_hyphen_N(10, fn, args);
  };
};

try_hyphen_N_hyphen_times = function(N) {
  return function(fn) {
    return function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (any_hyphen_postponement_question_(args)) {
        if (N > 0) {
          return reschedule(function() {
            return try_hyphen_N_hyphen_times(N - 1)(fn).apply(null, args);
          });
        }
      } else {
        return fn.apply(null, map(cytolyse)(args));
      }
    };
  };
};

try_hyphen_10 = try_hyphen_N_hyphen_times(10);

block_hyphen_N = function(N, fn, args) {
  var cytolysed_hyphen_args;
  if (any_hyphen_postponement_question_(args)) {
    if (N > 0) {
      return reschedule(function() {
        return block_hyphen_N(N - 1, fn, args);
      });
    }
  } else {
    cytolysed_hyphen_args = map(cytolyse)(args);
    return fn.apply(null, cytolysed_hyphen_args);
  }
};

frpBind = function(fn) {
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return nativeBind.apply(checkValue(fn), [null].concat(args));
  };
};

transbind = function(transmerse) {
  return function(fn) {
    return function(__i) {
      return transmerse(frpBind(fn)(__i));
    };
  };
};

get_hyphen_key = function(key) {
  return function(obj) {
    return obj[key];
  };
};

_arobase_prototype = get_hyphen_key('prototype');

_ref = [Function, Object].map(_arobase_prototype), FuncProto = _ref[0], ObjProto = _ref[1];

getPrototypeOf = Object.getPrototypeOf;

nativeBind = FuncProto.bind;

nativeToString = ObjProto.toString;

array_question_ = function(val) {
  return val instanceof Array;
};

bind = function(fn) {
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return nativeBind.apply(fn, [null].concat(args));
  };
};

call_hyphen_only_hyphen_once = function(fn) {
  var fn_hyphen_proxy;
  fn_hyphen_proxy = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    fn_hyphen_proxy = no_hyphen_op;
    return fn.apply(null, args);
  };
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return fn_hyphen_proxy.apply(null, args);
  };
};

defined_question_ = function(val) {
  return val != null;
};

each = function(fn) {
  return function(array) {
    return array.forEach(fn);
  };
};

each_hyphen_property = function(fn) {
  return function(obj) {
    var key, val, _results;
    _results = [];
    for (key in obj) {
      if (!__hasProp.call(obj, key)) continue;
      val = obj[key];
      _results.push(fn(val));
    }
    return _results;
  };
};

empty_question_ = function(obj) {
  return Object.keys(obj).length === 0;
};

extend_bang_ = function() {
  var key, mixin, mixins, obj, value, _i, _len;
  obj = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  for (_i = 0, _len = mixins.length; _i < _len; _i++) {
    mixin = mixins[_i];
    for (key in mixin) {
      if (!__hasProp.call(mixin, key)) continue;
      value = mixin[key];
      obj[key] = value;
    }
  }
  return obj;
};

extend_hyphen_proto = function() {
  var key, mixin, mixins, prototype, result, value, _i, _len;
  prototype = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  result = Object.create(prototype);
  for (_i = 0, _len = mixins.length; _i < _len; _i++) {
    mixin = mixins[_i];
    for (key in mixin) {
      if (!__hasProp.call(mixin, key)) continue;
      value = mixin[key];
      result[key] = value;
    }
  }
  return result;
};

flip = function(fn) {
  return function() {
    var args1;
    args1 = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return function() {
      var args2;
      args2 = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return fn.apply(null, args2).apply(null, args1);
    };
  };
};

function_question_ = function(val) {
  return typeof val === 'function';
};

get_hyphen_arg_hyphen_array = function(possibly_hyphen_overbuilt_hyphen_array) {
  if (array_question_(possibly_hyphen_overbuilt_hyphen_array[0])) {
    return possibly_hyphen_overbuilt_hyphen_array[0];
  } else {
    return possibly_hyphen_overbuilt_hyphen_array;
  }
};

hash_question_ = function(value) {
  return nativeToString.call(value) === '[object Object]';
};

identity = function(val) {
  return val;
};

map = function(fn) {
  return function(value) {
    return value.map(fn);
  };
};

object_question_ = function(value) {
  return value === Object(value);
};

bracket = function(label) {
  return '<' + label + '>';
};

create_hyphen_singleton = function(label) {
  return {
    inspect: function() {
      return bracket(label);
    }
  };
};

_ref1 = map(create_hyphen_singleton)(['active', 'clock', 'end', 'inactive', 'none', 'paused', 'postpone']), active = _ref1[0], clock = _ref1[1], end = _ref1[2], inactive = _ref1[3], none = _ref1[4], paused = _ref1[5], postpone = _ref1[6];

no_hyphen_op = (function() {});

return_hyphen_no_hyphen_op = function() {
  return no_hyphen_op;
};

isEnd = function(value) {
  return value === end;
};

nonterminal_question_ = function(value) {
  return !isEnd(value);
};

getType = function(value) {
  if (object_question_(value)) {
    return getPrototypeOf(value);
  } else {
    return toString.call(value);
  }
};

isRelevant = function(value) {
  return value !== none;
};

isFromType = function(type) {
  return function(val) {
    var t;
    t = getType(val);
    switch (false) {
      case !(t === type):
        return true;
      case !!(hash_question_(t)):
        return false;
      case !(t === ObjProto):
        return false;
      default:
        return isFromType(type)(t);
    }
  };
};

createCell = function(initial_hyphen_value) {
  var read, value, write;
  value = initial_hyphen_value != null ? initial_hyphen_value : null;
  read = function() {
    return value;
  };
  write = function(_value) {
    return value = _value;
  };
  return extend_hyphen_proto(CoreCell, {
    read: read,
    write: write
  });
};

isCell = function(val) {
  return getType(val) === CoreCell;
};

seed = 0;

generate_hyphen_id = function() {
  return seed++;
};

registrar = (function() {
  var entities, register, removeFromRegistrar, transmit;
  entities = {};
  register = function(entity) {
    entities[entity.id] = entity;
    return entity;
  };
  removeFromRegistrar = function(id) {
    return delete entities[id];
  };
  transmit = function(id) {
    return function(message) {
      return function() {
        var args, _ref2;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (entities[id]) {
          return (_ref2 = entities[id])[message].apply(_ref2, args);
        }
      };
    };
  };
  return {
    register: register,
    removeFromRegistrar: removeFromRegistrar,
    transmit: transmit
  };
})();

_ref2 = map(flip(get_hyphen_key)(registrar))(['register', 'removeFromRegistrar', 'transmit']), register = _ref2[0], removeFromRegistrar = _ref2[1], transmit = _ref2[2];

createDispatcherType = function(opts) {
  return function(source) {
    var dispatcher;
    dispatcher = _createDispatcherType(opts)(source);
    register(dispatcher);
    return dispatcher;
  };
};

_createDispatcherType = function(opts) {
  return function(source) {
    var activate, add_hyphen_subscriber, alias, disconnect_hyphen_from, dispatch, dispatch_hyphen_N, distribute, id, inform_hyphen_subscribers, mixins, properties, proto, setAlias, sinks, stop_hyphen_source_hyphen_influx, subscribe, terminate, terminated_question_, transact, transformDispatch, transformSubscribe, unsubscribe, _dispatch, _ref3, _subscribe;
    _ref3 = parse_hyphen_opts(opts), mixins = _ref3.mixins, proto = _ref3.proto, transformDispatch = _ref3.transformDispatch, transformSubscribe = _ref3.transformSubscribe;
    if (mixins == null) {
      mixins = {};
    }
    if (proto == null) {
      proto = CoreDispatcher;
    }
    if (source == null) {
      source = return_hyphen_no_hyphen_op;
    }
    if (transformDispatch == null) {
      transformDispatch = identity;
    }
    if (transformSubscribe == null) {
      transformSubscribe = identity;
    }
    id = generate_hyphen_id();
    sinks = {};
    stop_hyphen_source_hyphen_influx = no_hyphen_op;
    terminated_question_ = false;
    alias = id;
    setAlias = function(val) {
      return alias = val;
    };
    activate = call_hyphen_only_hyphen_once(function() {
      return stop_hyphen_source_hyphen_influx = call_hyphen_only_hyphen_once(source(dispatch));
    });
    add_hyphen_subscriber = function(sink) {
      if (!sink.id) {
        sink.id = generate_hyphen_id();
      }
      return sinks[sink.id] = sink;
    };
    disconnect_hyphen_from = function(source_hyphen_id, sid) {
      var subscription_hyphen_id;
      subscription_hyphen_id = sid != null ? sid : id;
      if (source_hyphen_id) {
        return transmit(source_hyphen_id)('unsubscribe')(subscription_hyphen_id);
      }
    };
    _dispatch = function(value, source_hyphen_id, subscription_hyphen_id) {
      return dispatch_hyphen_N(10, value, source_hyphen_id, subscription_hyphen_id);
    };
    dispatch_hyphen_N = function(N, value, source_hyphen_id, sid) {
      switch (false) {
        case !postponed_question_(value):
          if (N > 0) {
            return reschedule(function() {
              return dispatch_hyphen_N(N - 1, value, source_hyphen_id, sid);
            });
          }
          break;
        case !terminated_question_:
          return disconnect_hyphen_from(source_hyphen_id, sid);
        default:
          return transact(cytolyse(value), source_hyphen_id, sid);
      }
    };
    distribute = function(value) {
      var _distrib;
      if (isEnd(value)) {
        return terminate();
      } else {
        _distrib = function(sink) {
          return sink(value, id, sink.id || 'no-ID');
        };
        return each_hyphen_property(_distrib)(sinks);
      }
    };
    inform_hyphen_subscribers = function() {
      return each_hyphen_property(function(sink) {
        return sink(end);
      })(sinks);
    };
    _subscribe = function(sink) {
      if (terminated_question_) {
        sink(end);
        return no_hyphen_op;
      } else {
        add_hyphen_subscriber(sink);
        activate();
        return call_hyphen_only_hyphen_once(function() {
          return unsubscribe(sink);
        });
      }
    };
    terminate = function() {
      stop_hyphen_source_hyphen_influx();
      terminated_question_ = true;
      inform_hyphen_subscribers();
      sinks = {};
      return removeFromRegistrar(id);
    };
    transact = function(value, source_hyphen_id, sid) {
      var update_hyphen_initiator_question_;
      update_hyphen_initiator_question_ = get_hyphen_initiation_hyphen_status();
      try {
        distribute(value);
        if (terminated_question_) {
          return disconnect_hyphen_from(source_hyphen_id, sid);
        }
      } finally {
        if (update_hyphen_initiator_question_) {
          reset_hyphen_DAG_hyphen_update_hyphen_process();
        }
      }
    };
    unsubscribe = function(val) {
      var subscriber_hyphen_id;
      subscriber_hyphen_id = function_question_(val) ? val.id : val;
      delete sinks[subscriber_hyphen_id];
      if (empty_question_(sinks)) {
        return terminate();
      }
    };
    dispatch = transformDispatch(_dispatch);
    subscribe = transformSubscribe(_subscribe, unsubscribe);
    dispatch.id = id;
    properties = {
      activate: activate,
      alias: alias,
      dispatch: dispatch,
      id: id,
      setAlias: setAlias,
      subscribe: subscribe,
      terminate: terminate,
      unsubscribe: unsubscribe
    };
    return extend_hyphen_proto(proto, properties, mixins);
  };
};

display = function(supertype) {
  return function(subtype) {
    return function() {
      return bracket("" + supertype + ": " + subtype);
    };
  };
};

create_hyphen_super_hyphen_type = function(display, type_hyphen_label) {
  return {
    inspect: display('Core'),
    supertype: type_hyphen_label,
    type: type_hyphen_label
  };
};

_ref3 = map(display)(['Cell', 'Dispatcher', 'Signal']), display_hyphen_cell_hyphen_type = _ref3[0], display_hyphen_dispatcher_hyphen_type = _ref3[1], display_hyphen_signal_hyphen_type = _ref3[2];

CoreCell = create_hyphen_super_hyphen_type(display_hyphen_cell_hyphen_type, 'core-cell');

CoreDispatcher = create_hyphen_super_hyphen_type(display_hyphen_dispatcher_hyphen_type, 'core-dispatcher');

extend_hyphen_core_hyphen_dispatcher = function(type) {
  var inspect;
  inspect = display_hyphen_dispatcher_hyphen_type(type);
  return extend_hyphen_proto(CoreDispatcher, {
    inspect: inspect,
    type: type
  });
};

_ref4 = map(extend_hyphen_core_hyphen_dispatcher)(['Eventstream', 'Property']), EventStream = _ref4[0], Property = _ref4[1];

isDispatcher = isFromType(CoreDispatcher);

extend_hyphen_core_hyphen_signal = function(type) {
  var inspect;
  inspect = display_hyphen_signal_hyphen_type(type);
  return extend_hyphen_proto(CoreSignal, {
    inspect: inspect,
    type: type
  });
};

CoreSignal = create_hyphen_super_hyphen_type(display_hyphen_signal_hyphen_type, 'core-signal');

Time = extend_hyphen_core_hyphen_signal('Time');

isEventStream = isFromType(EventStream);

isProperty = isFromType(Property);

isSignal = function(value) {
  return isFromType(CoreSignal)(value) || isProperty(value);
};

genESOpts = function(opts) {
  var result;
  if (opts == null) {
    opts = {};
  }
  result = parse_hyphen_opts(opts);
  result.proto = EventStream;
  return result;
};

parse_hyphen_opts = function(opts) {
  var mixins, proto, transformDispatch, transformSubscribe;
  if (function_question_(opts)) {
    transformDispatch = opts;
  } else {
    mixins = opts.mixins, proto = opts.proto, transformDispatch = opts.transformDispatch, transformSubscribe = opts.transformSubscribe;
  }
  if (mixins == null) {
    mixins = {};
  }
  if (proto == null) {
    proto = CoreDispatcher;
  }
  if (transformDispatch == null) {
    transformDispatch = identity;
  }
  if (transformSubscribe == null) {
    transformSubscribe = identity;
  }
  return {
    mixins: mixins,
    proto: proto,
    transformDispatch: transformDispatch,
    transformSubscribe: transformSubscribe
  };
};

parse_hyphen_signal_hyphen_opts = function(opts) {
  var mixins, proto, transformSource;
  if (function_question_(opts)) {
    transformSource = opts;
  } else {
    mixins = opts.mixins, proto = opts.proto, transformSource = opts.transformSource;
  }
  if (mixins == null) {
    mixins = {};
  }
  if (proto == null) {
    proto = CoreSignal;
  }
  if (transformSource == null) {
    transformSource = identity;
  }
  return {
    mixins: mixins,
    proto: proto,
    transformSource: transformSource
  };
};

genPropOpts = function(initial_hyphen_value) {
  return function(opts) {
    var cached_hyphen_value, ended_question_, immediately_hyphen_end, mixins, proto, push_hyphen_value_hyphen_thru, read, sample, sample_hyphen_N, set, transformDispatch, transformSubscribe, write, _ref5, _transformDispatch, _transformSubscribe;
    if (opts == null) {
      opts = {};
    }
    _ref5 = parse_hyphen_opts(opts), mixins = _ref5.mixins, transformDispatch = _ref5.transformDispatch, transformSubscribe = _ref5.transformSubscribe;
    cached_hyphen_value = initial_hyphen_value != null ? initial_hyphen_value : none;
    ended_question_ = false;
    proto = Property;
    read = function() {
      return cached_hyphen_value;
    };
    sample = function(cell) {
      return sample_hyphen_N(10, cell);
    };
    sample_hyphen_N = function(N, cell) {
      if (DAG_hyphen_updating_question_) {
        set(cell)(postpone);
        if (N > 0) {
          reschedule(function() {
            return sample_hyphen_N(N - 1, cell);
          });
        }
      } else {
        set(cell)(read());
      }
      return cell;
    };
    set = function(cell) {
      return function(val) {
        return cell.write(val);
      };
    };
    write = function(value) {
      return cached_hyphen_value = value;
    };
    extend_bang_(mixins, {
      read: read,
      sample: sample,
      write: write
    });
    push_hyphen_value_hyphen_thru = function(sink) {
      return function(value) {
        if (sink.id) {
          return sink(value, sink.id, '?1');
        } else {
          return sink(value, '?2', '?2');
        }
      };
    };
    immediately_hyphen_end = function(sink) {
      push_hyphen_value_hyphen_thru(sink)(end);
      return no_hyphen_op;
    };
    _transformDispatch = function(dispatch) {
      return function(value, source_hyphen_id, sid) {
        if (isEnd(value)) {
          ended_question_ = true;
        } else {
          write(value);
        }
        return dispatch(value, source_hyphen_id, sid);
      };
    };
    _transformSubscribe = function(subscribe) {
      return function(sink) {
        if (isRelevant(cached_hyphen_value)) {
          push_hyphen_value_hyphen_thru(sink)(cached_hyphen_value);
          if (ended_question_) {
            return immediately_hyphen_end(sink);
          } else {
            return subscribe(sink);
          }
        } else {
          return subscribe(sink);
        }
      };
    };
    return {
      mixins: mixins,
      proto: proto,
      transformDispatch: (function(__i) {
        return transformDispatch(_transformDispatch(__i));
      }),
      transformSubscribe: (function(__i) {
        return transformSubscribe(_transformSubscribe(__i));
      })
    };
  };
};

$sample = function(property) {
  return property.sample(createCell());
};

genNonInitPropOpts = genPropOpts(none);

createEventStream = (function(__i) {
  return createDispatcherType(genESOpts(__i));
});

createEventStreamBus = function() {
  return createEventStream()(fromInternalDispatchOnly);
};

createNonInitProperty = (function(__i) {
  return createDispatcherType(genNonInitPropOpts(__i));
});

createNonInitPropertyBus = function() {
  return createNonInitProperty()(fromInternalDispatchOnly);
};

createProperty = function(initial_hyphen_value) {
  return function(__i) {
    return createDispatcherType(genPropOpts(initial_hyphen_value)(__i));
  };
};

createPropertyBus = function(initial_hyphen_value) {
  return createProperty(initial_hyphen_value)()(fromInternalDispatchOnly);
};


/*
FayeSubscriber = { type: 'faye-subscriber' }
createFayeSubscriber = \fayeClient \source ->
  channel = null
  valid-new-channel? = \value ->
    ? value && channel != value
  transformDispatch = (dispatch) -> (value, source-id) ->
    dispatch (value, source-id) if isEnd value
    fayeClient.unsubscribe channel if valid-new-channel?
    channel = value
    fayeClient.subscribe (channel, dispatch)
  create-dispatcher-type { proto: FayeSubscriber, transformDispatch } source
 */

fromArray = function(array) {
  return function(sink) {
    var available_question_, id, index, length, unsubscribe;
    available_question_ = true;
    id = generate_hyphen_id();
    index = 0;
    length = array.length;
    unsubscribe = function() {
      return available_question_ = false;
    };
    register({
      id: id,
      unsubscribe: unsubscribe
    });
    while (available_question_) {
      if (index < length) {
        sink(array[index++], id, "Array-" + id);
      } else {
        sink(end, id, "Array-" + id);
      }
    }
    return unsubscribe;
  };
};

fromEventTarget = function(dom_hyphen_tgt) {
  return function(event_hyphen_name) {
    return function(sink) {
      var sub, unsub, _ref5, _ref6, _ref7, _ref8;
      sub = (_ref5 = dom_hyphen_tgt.addEventListener) != null ? _ref5 : (_ref6 = dom_hyphen_tgt.addListener) != null ? _ref6 : dom_hyphen_tgt.bind;
      unsub = (_ref7 = dom_hyphen_tgt.removeEventListener) != null ? _ref7 : (_ref8 = dom_hyphen_tgt.removeListener) != null ? _ref8 : dom_hyphen_tgt.unbind;
      sub.call(dom_hyphen_tgt, event_hyphen_hame, sink);
      return function() {
        return unsub.call(dom_hyphen_tgt, event_hyphen_name);
      };
    };
  };
};

fromSourceFunction = function(subscribe, unsubscribe) {
  return function(sink) {
    if (unsubscribe == null) {
      unsubscribe = return_hyphen_no_hyphen_op;
    }
    subscribe(sink);
    return function() {
      return unsubscribe(sink);
    };
  };
};

fromCallback = function(use_hyphen_as_hyphen_callback, stop_hyphen_using_hyphen_as_hyphen_callback) {
  return function(sink) {
    var _sink;
    if (stop_hyphen_using_hyphen_as_hyphen_callback == null) {
      stop_hyphen_using_hyphen_as_hyphen_callback = return_hyphen_no_hyphen_op;
    }
    _sink = function(val) {
      sink(val);
      return sink(end);
    };
    use_hyphen_as_hyphen_callback(_sink);
    return function() {
      return stop_hyphen_using_hyphen_as_hyphen_callback(_sink);
    };
  };
};

fromDispatcher = function(dispatcher) {
  return dispatcher.subscribe;
};

fromInternalDispatchOnly = return_hyphen_no_hyphen_op;

fromMerger = function(dispatchers) {
  return function(sink) {
    var subscriptions;
    subscriptions = [];
    dispatchers.forEach(function(dispatcher) {
      return subscriptions.push(dispatcher.subscribe(sink));
    });
    return function() {
      return subscriptions.forEach(function(unsubscribe) {
        return unsubscribe();
      });
    };
  };
};

fromPoll = function(transform_hyphen_sink) {
  return function(delay_hyphen_duration) {
    return function(sink) {
      var poll_hyphen_id;
      poll_hyphen_id = setInterval(transform_hyphen_sink(sink), delay_hyphen_duration);
      return function() {
        return clearInterval(poll_hyphen_id);
      };
    };
  };
};

fromFinitePeriodicSequence = function(values) {
  var index, len;
  index = 0;
  len = values.length;
  return fromPoll(function(sink) {
    var val;
    val = values[index];
    index += 1;
    sink(val);
    if (index === len) {
      return sink(end);
    }
  });
};

fromDelayedValue = function(value) {
  return fromFinitePeriodicSequence([value]);
};


/*
fromPromise = \promise ->
  source = \sink ->
    promise.then sink
    return-no-op
  createPointSource source
 */

$dispatch = function(dispatcher) {
  return function(value) {
    return dispatcher.dispatch(value);
  };
};

functionize = function(arg, args) {
  var msg;
  switch (false) {
    case !function_question_(arg):
      if (array_question_(args)) {
        return bind(arg).apply(null, args);
      } else {
        return arg;
      }
      break;
    case !keypath_question_(arg):
      return function(val) {
        var component;
        component = get_hyphen_component(arg.slice(1))(val);
        if (function_question_(component)) {
          return apply(component)(args);
        } else {
          return component;
        }
      };
    case !isCell(arg):
      if (postponed_question_(arg)) {
        msg = "The function 'functionize' cannot manage suspended cells.";
        throw new Error(msg);
      } else {
        return function() {
          return cytolyse(arg);
        };
      }
      break;
    default:
      return function() {
        return arg;
      };
  }
};

blocking = blockTillReady;

bind_hyphen_data = function(sink, source_hyphen_id, sid) {
  return function(val) {
    return sink(val, source_hyphen_id, sid);
  };
};

sink_hyphen_if_hyphen_sinkable = function(sink) {
  return function(value, sinkable_question_) {
    if (isEnd(value) || sinkable_question_ === true) {
      return sink(value);
    }
  };
};

_filtering = function(pred) {
  return function(sink) {
    return function(value) {
      return try_hyphen_10(sink_hyphen_if_hyphen_sinkable(sink))(value, pred(value));
    };
  };
};

filtering = function(pred) {
  return function(sink) {
    return function(value, source_hyphen_id, sid) {
      var _sink;
      _sink = bind_hyphen_data(sink, source_hyphen_id, sid);
      return _filtering(checkValue(pred))(_sink)(value);
    };
  };
};

_mapping = function(sink) {
  return function(original_hyphen_value, transformed_hyphen_value) {
    if (isEnd(original_hyphen_value)) {
      return sink(original_hyphen_value);
    } else {
      return sink(transformed_hyphen_value);
    }
  };
};

mapping = function() {
  var arg, args, fn;
  arg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  fn = functionize.apply(null, [arg].concat(__slice.call(args)));
  return function(sink) {
    return function(value, source_hyphen_id, sid) {
      var _sink;
      _sink = bind_hyphen_data(sink, source_hyphen_id, sid);
      return try_hyphen_10(_mapping(_sink))(value, fn(value));
    };
  };
};

filteringDefined = filtering(defined_question_);

filteringNonterminal = function(sink) {
  return function(value, source_hyphen_id, sid) {
    if (nonterminal_question_(value)) {
      return sink(value, source_hyphen_id, sid);
    }
  };
};

filteringRelevant = filtering(isRelevant);

delaying = function(delay_hyphen_duration) {
  return function(sink) {
    return function(value, source_hyphen_id, sid) {
      if (isEnd(value)) {
        return sink(end, source_hyphen_id, sid);
      } else {
        return setInterval((function() {
          return sink(value, source_hyphen_id, sid);
        }), delay_hyphen_duration);
      }
    };
  };
};

flattening = function(sink) {
  var subscriptions, unsub;
  subscriptions = [];
  unsub = function() {
    return subscriptions.forEach(function(unsubscribe) {
      return unsubscribe();
    });
  };
  return function(dispatcher, source_hyphen_id) {
    if (isEnd(dispatcher)) {
      unsub();
      return sink(end, source_hyphen_id);
    } else {
      return subscriptions.push(dispatcher.subscribe(sink));
    }
  };
};

monitoringFirst = function(sink) {
  var accepting_question_, unsub;
  accepting_question_ = true;
  unsub = no_hyphen_op;
  return function(dispatcher) {
    if (isEnd(dispatcher)) {
      unsub();
      sink(end);
    }
    if (accepting_question_) {
      accepting_question_ = false;
      return unsub = dispatcher.subscribe(sink);
    }
  };
};

monitoringLatest = function(sink) {
  var unsub;
  unsub = no_hyphen_op;
  return function(dispatcher) {
    if (isEnd(dispatcher)) {
      unsub();
      return sink(end);
    } else {
      return unsub = dispatcher.subscribe(sink);
    }
  };
};

permitting_hyphen_only_hyphen_one_hyphen_value = function(sink) {
  return function(value) {
    sink(value);
    return sink(end);
  };
};

reducing = function(memo) {
  return function(fn) {
    return function(sink) {
      var cached_hyphen_value;
      cached_hyphen_value = memo;
      return function(value) {
        if (nonterminal_question_(value)) {
          return cached_hyphen_value = fn(cached_hyphen_value)(value);
        } else {
          return sink(cached_hyphen_value);
        }
      };
    };
  };
};

staggering = function(offset) {
  return function(sink) {
    var cache, sinking_question_;
    cache = [];
    sinking_question_ = false;
    return function(value, source_hyphen_id, sid) {
      var args;
      cache.push([value, source_hyphen_id, sid]);
      if (sinking_question_) {
        args = cache.shift();
        return sink.apply(null, args);
      } else {
        offset = offset - 1;
        return sinking_question_ = offset === 0;
      }
    };
  };
};

taking = function(nbr) {
  return function(sink) {
    var iteration;
    iteration = nbr;
    return function(value, source_hyphen_id) {
      if (iteration > 0) {
        iteration = iteration - 1;
        return sink(value, source_hyphen_id);
      } else {
        return sink(end, source_hyphen_id);
      }
    };
  };
};

stateMachineProcessing = function(initial_hyphen_state) {
  return function(fn) {
    return function(sink) {
      return function(value) {
        var newState, newValue, state, _ref5;
        state = initial_hyphen_state;
        _ref5 = fn(state)(value), newState = _ref5.newState, newValue = _ref5.newValue;
        state = newState;
        return sink(newValue);
      };
    };
  };
};

scanning = function(memo) {
  return function(fn) {
    return function(sink) {
      var cached_hyphen_value;
      cached_hyphen_value = memo;
      return function(value) {
        if (isEnd(value)) {
          return sink(value);
        } else {
          cached_hyphen_value = fn(cached_hyphen_value)(value);
          return sink(cached_hyphen_value);
        }
      };
    };
  };
};

_ref5 = map(transbind)([filtering, filteringNonterminal, mapping]), bfiltering = _ref5[0], bfilteringNonterminal = _ref5[1], bmapping = _ref5[2];

fmapD = function(dispatcher_hyphen_factory) {
  return function(fn) {
    return function(dispatcher) {
      return dispatcher_hyphen_factory(mapping(fn))(dispatcher.subscribe);
    };
  };
};

$subscribe = function(dispatcher) {
  return function(sink) {
    return dispatcher.subscribe(sink);
  };
};

_subscribe = function(sink) {
  return function(dispatcher) {
    return dispatcher.subscribe(sink);
  };
};

merge = function(tgt_hyphen_dispatcher) {
  return function(reactive_hyphen_values) {
    return each(plug(tgt_hyphen_dispatcher))(reactive_hyphen_values);
  };
};

negating = mapping(function(bool) {
  return !bool;
});

plug = function(tgt_hyphen_dispatcher) {
  return function(src_hyphen_dispatcher) {
    return src_hyphen_dispatcher.subscribe(tgt_hyphen_dispatcher.dispatch);
  };
};

remerse = function(dispatcher_hyphen_factory) {
  return function(fn) {
    return function(source) {
      var _source;
      _source = isDispatcher(source) ? source.subscribe : source;
      return dispatcher_hyphen_factory(fn)(_source);
    };
  };
};

transubscribe = function(transmerse) {
  return function(__i) {
    return _subscribe(transmerse(__i));
  };
};

$transubscribe = function(transmerse) {
  return function(dispatcher) {
    return function(__i) {
      return $subscribe(dispatcher)(transmerse(__i));
    };
  };
};

onFirstAndOnlyValue = transubscribe(permitting_hyphen_only_hyphen_one_hyphen_value);

onValue = transubscribe(filteringNonterminal);

$onValue = $transubscribe(filteringNonterminal);

createSignalType = function(opts) {
  if (opts == null) {
    opts = {};
  }
  return function(source) {
    var mixins, proto, read, replaceTransform, transformSource, _ref6;
    _ref6 = parse_hyphen_signal_hyphen_opts(opts), mixins = _ref6.mixins, proto = _ref6.proto, transformSource = _ref6.transformSource;
    replaceTransform = function(new_hyphen_transform) {
      return transformSource = new_hyphen_transform;
    };
    read = function() {
      return transformSource(source());
    };
    return extend_hyphen_proto(CoreSignal, {
      read: read,
      replaceTransform: replaceTransform
    }, mixins);
  };
};

createClock = function(opts) {
  var current_hyphen_time, error_hyphen_msg, offset, pause, read, reset, restart, running_question_, start, start_hyphen_time;
  error_hyphen_msg = 'Clock is not running';
  offset = 0;
  start_hyphen_time = null;
  running_question_ = false;
  current_hyphen_time = function() {
    return new Date();
  };
  pause = function() {
    offset += current_hyphen_time() - start_hyphen_time;
    running_question_ = false;
    return paused;
  };
  read = function() {
    if (!running_question_) {
      throw new Error(error_hyphen_msg);
    }
    return (current_hyphen_time() - start_hyphen_time + offset) / 1000;
  };
  reset = function() {
    running_question_ = false;
    offset = 0;
    return inactive;
  };
  restart = function() {
    reset();
    return start();
  };
  start = function() {
    start_hyphen_time = current_hyphen_time();
    running_question_ = true;
    return active;
  };
  return extend_hyphen_proto(clock, {
    pause: pause,
    read: read,
    reset: reset,
    restart: restart,
    start: start
  });
};

genSignalOpts = function(opts) {
  if (opts == null) {
    opts = {};
  }
};

genTimeOpts = function(opts) {
  var result;
  if (opts == null) {
    opts = {};
  }
  result = parse_hyphen_signal_hyphen_opts(opts);
  result.proto = Time;
  return result;
};

createSignal = (function(__i) {
  return createSignalType(genSignalOpts(__i));
});

createTime = (function(__i) {
  return createSignalType(genTimeOpts(__i));
});

stepper = function(signal) {
  return function(dispatcher) {
    return dispatcher.subscribe(signal.replaceTransform);
  };
};

switcher = function(signal) {
  return function(dispatcher) {
    var read;
    read = function(val) {
      return val.read();
    };
    return dispatcher.subscribe((function(__i) {
      return signal.replaceTransform(read(__i));
    }));
  };
};

fmapS = function(signal_hyphen_factory) {
  return function(fn) {
    return function(readable) {
      return signal_hyphen_factory(function() {
        return fn(readable.read());
      });
    };
  };
};

liftS = function(fn) {
  return function(readables) {
    return signal_hyphen_factory(function() {
      return readables.reduce((function(memo, val) {
        return memo = memo(val.read());
      }), fn);
    });
  };
};

liftS2 = function(dyadic_hyphen_fn) {
  return function(readable1) {
    return function(readable2) {
      return signal_hyphen_factory(function() {
        return dyadic_hyphen_fn(readable1.read())(readable2.read());
      });
    };
  };
};

connect = function(src) {
  return function(tgt) {
    return function(transform) {
      var new_hyphen_sink, subscription;
      if (transform == null) {
        transform = identity;
      }
      new_hyphen_sink = transform(tgt.dispatch);
      subscription = function(value, source_hyphen_id) {
        return new_hyphen_sink(value, source_hyphen_id, subscription.id);
      };
      subscription.id = generate_hyphen_id();
      return src.subscribe(subscription);
    };
  };
};

FRP = {
  bfiltering: bfiltering,
  bfilteringNonterminal: bfilteringNonterminal,
  blocking: blocking,
  blockTillReady: blockTillReady,
  bmapping: bmapping,
  checkValue: checkValue,
  connect: connect,
  createCell: createCell,
  createClock: createClock,
  createDispatcherType: createDispatcherType,
  createEventStream: createEventStream,
  createEventStreamBus: createEventStreamBus,
  createNonInitProperty: createNonInitProperty,
  createNonInitPropertyBus: createNonInitPropertyBus,
  createProperty: createProperty,
  createPropertyBus: createPropertyBus,
  createSignal: createSignal,
  createSignalType: createSignalType,
  createTime: createTime,
  delaying: delaying,
  end: end,
  filtering: filtering,
  filteringDefined: filteringDefined,
  filteringNonterminal: filteringNonterminal,
  filteringRelevant: filteringRelevant,
  flattening: flattening,
  fmapD: fmapD,
  fmapS: fmapS,
  fromArray: fromArray,
  fromDelayedValue: fromDelayedValue,
  fromFinitePeriodicSequence: fromFinitePeriodicSequence,
  fromInternalDispatchOnly: fromInternalDispatchOnly,
  fromMerger: fromMerger,
  fromPoll: fromPoll,
  fromSourceFunction: fromSourceFunction,
  frpBind: frpBind,
  genESOpts: genESOpts,
  genNonInitPropOpts: genNonInitPropOpts,
  genPropOpts: genPropOpts,
  getType: getType,
  isDispatcher: isDispatcher,
  isEnd: isEnd,
  isEventStream: isEventStream,
  isProperty: isProperty,
  isRelevant: isRelevant,
  mapping: mapping,
  merge: merge,
  monitoringFirst: monitoringFirst,
  monitoringLatest: monitoringLatest,
  negating: negating,
  none: none,
  onFirstAndOnlyValue: onFirstAndOnlyValue,
  onValue: onValue,
  $onValue: $onValue,
  plug: plug,
  remerse: remerse,
  reducing: reducing,
  $sample: $sample,
  scanning: scanning,
  staggering: staggering,
  stateMachineProcessing: stateMachineProcessing,
  taking: taking,
  transbind: transbind,
  transubscribe: transubscribe
};

if ((typeof define !== "undefined" && define !== null) && (define['amd'] != null)) {
  define([], function() {
    return FRP;
  });
  this.FRP = FRP;
} else if ((typeof module !== "undefined" && module !== null)) {
  module.exports = FRP;
  FRP.FRP = FRP;
} else {
  this.FRP = FRP;
}
