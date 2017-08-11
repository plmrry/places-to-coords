// @ts-check

const _mapToCallback = function _mapToCallback(fn) {
  return function(inputEmitter) {
    const outputEmitter = Emitter();
    inputEmitter.addCallback(function(err, data) {
      fn(err, data, outputEmitter.callCallbacks);
    });
    return outputEmitter;
  }
}

const Emitter = function Emitter(name) {
  const callbacks = new Set();
  let _onEmpty = () => {};
  const emitter = {
    addCallback: function addCallback(cb) {
      callbacks.add(cb);
      return emitter;
    },
    removeCallback: function removeCallback(cb) {
      callbacks.delete(cb);
      if (callbacks.size === 0) {
        _onEmpty();
      }
      return emitter;
    },
    callCallbacks: function callCallbacks(err, data) {
      callbacks.forEach(function(cb) {
        try {
          cb(err, data)
        } catch (err2) {
          console.error(err2);
        }
      });
      return emitter;
    },
    compose: function compose(fn) {
      return fn(emitter);
    },
    mapToCallback: function mapToCallback(fn) {
      return emitter.compose(_mapToCallback(fn))
    },
    onEmpty: function onEmpty(fn) {
      _onEmpty = fn;
      return emitter;
    }
  };
  return emitter;
}

Emitter['combineEmitters'] = function combine(input) {
  const out = {};
  const count = Object.keys(input).length;
  const outEmitter = Emitter();
  const check = function check() {
    if (Object.keys(out).length === count) {
      outEmitter.callCallbacks(null, out);
    }
  }
  Object.keys(input).forEach(function(key) {
    const emitter = input[key];
    emitter.addCallback(function(err, data) {
      if (err) return outEmitter.callCallbacks(err, null);
      out[key] = data;
      check();
    })
  });
  return outEmitter;
}

module.exports = Emitter;