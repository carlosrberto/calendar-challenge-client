(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uid')) :
  typeof define === 'function' && define.amd ? define(['uid'], factory) :
  (global.events = factory(global.uid));
}(this, (function (uid) { 'use strict';

  uid = uid && uid.hasOwnProperty('default') ? uid['default'] : uid;

  var LOCAL_STORAGE_KEY = 'desafio-iclinic-events';
  var INITIAL_STATE = {
    all: {},
    byId: []
  };
  var PAYLOAD_KEYS = ['id', 'title', 'timestamp', 'date', 'start_time', 'end_time'];
  var PAYLOAD_REQUIRED_KEYS = ['title', 'date', 'start_time', 'end_time'];

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var isValidDate = function isValidDate(date) {
    return (/(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])\d\d$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/.test(date)
    );
  };

  var isValidTime = function isValidTime(time) {
    return (/([01][0-9]|2[0-3]):[0-5][0-9]/.test(time)
    );
  };

  var delay = function delay() {
    var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  };

  var invalidPayloadMessage = function invalidPayloadMessage(key) {
    return key ? 'Invalid payload key "' + key + '". Key must be one of ' + PAYLOAD_KEYS.join(', ') : '';
  };

  var validatePayload = function validatePayload(payload) {
    var isCreate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var invalidKey = void 0;
    var payloadKeys = Object.keys(payload);
    var hasInvalidKeys = payloadKeys.some(function (k) {
      if (!PAYLOAD_KEYS.includes(k)) {
        invalidKey = k;
        return true;
      }
      return false;
    });

    var hasCreateKeys = payloadKeys.filter(function (v) {
      return PAYLOAD_REQUIRED_KEYS.includes(v);
    }).length === PAYLOAD_REQUIRED_KEYS.length;

    if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) !== 'object') {
      return {
        valid: false,
        message: 'payload must be an object'
      };
    } else if (hasInvalidKeys) {
      return {
        valid: false,
        message: invalidPayloadMessage(invalidKey)
      };
    } else if (isCreate && !hasCreateKeys) {
      return {
        valid: false,
        message: 'payload must include all required keys: ' + PAYLOAD_REQUIRED_KEYS.join(', ')
      };
    } else if (!isCreate && !payload.id) {
      return {
        valid: false,
        message: 'id must be provided for edit action'
      };
    } else if (payload.date !== undefined && !isValidDate(payload.date)) {
      return {
        valid: false,
        message: 'invalid date "' + payload.date + '", date must be in format dd/mm/yyyy'
      };
    } else if (payload.start_time !== undefined && !isValidTime(payload.start_time)) {
      return {
        valid: false,
        message: 'invalid start_time "' + payload.start_time + '", start_time must be in format HH:mm'
      };
    } else if (payload.end_time !== undefined && !isValidTime(payload.end_time)) {
      return {
        valid: false,
        message: 'invalid end_time "' + payload.end_time + '", end_time must be in format HH:mm'
      };
    }

    return {
      valid: true
    };
  };

  var ValidationError = function ValidationError(message) {
    _classCallCheck(this, ValidationError);

    this.message = message;
  };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var all = function all(state) {
    return state.byId.map(function (id) {
      return state.all[id];
    });
  };

  var filter = function filter(state, fn) {
    return all(state).filter(fn);
  };

  var get = function get(state, id) {
    return state.all[id];
  };

  var create = function create(prevState, payload) {
    var validation = validatePayload(payload, true);

    if (!validation.valid) {
      throw new ValidationError(validation.message);
    }

    var nextId = uid();
    var object = _extends({}, payload, {
      timestamp: Date.now(),
      id: nextId
    });

    var state = {
      all: _extends({}, prevState.all, _defineProperty({}, nextId, object)),
      byId: [].concat(_toConsumableArray(prevState.byId), [nextId])
    };

    return {
      object: object,
      state: state
    };
  };

  var update = function update(prevState, payload) {
    var prevObject = prevState.all[payload.id];

    if (!prevObject) {
      throw new ValidationError('entry with id: ' + payload.id + ' not found');
    }

    var validation = validatePayload(payload);

    if (!validation.valid) {
      throw new ValidationError(validation.message);
    }

    var object = _extends({}, prevState.all[payload.id], payload);

    var state = _extends({}, prevState, {
      all: _extends({}, prevState.all, _defineProperty({}, payload.id, _extends({}, object)))
    });

    return {
      state: state,
      object: object
    };
  };

  var remove = function remove(prevState, id) {
    var prevObject = prevState.all[id];

    if (!prevObject) {
      throw new ValidationError('entry with id: ' + id + ' not found');
    }

    var nextAll = _extends({}, prevState.all);
    var object = _extends({}, prevState.all[id]);

    delete nextAll[id];
    var state = {
      all: _extends({}, nextAll),
      byId: prevState.byId.filter(function (v) {
        return v !== id;
      })
    };

    return {
      state: state,
      object: object
    };
  };

  var getStorage = function getStorage(key, defaultState) {
    try {
      var state = JSON.parse(localStorage.getItem(key));
      return state || defaultState;
    } catch (e) {
      return defaultState;
    }
  };

  var setStorage = function setStorage(key, state) {
    return localStorage.setItem(key, JSON.stringify(state));
  };

  var composeAsyncGetter = function composeAsyncGetter(storageKey, initialState, fn) {
    return async function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      await delay();
      return fn.apply(undefined, [getStorage(storageKey, initialState)].concat(args));
    };
  };

  var composeAsyncSetter = function composeAsyncSetter(storageKey, initialState, fn) {
    return async function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      await delay();
      var state = getStorage(storageKey, initialState);
      var nextState = fn.apply(undefined, [state].concat(args));
      setStorage(storageKey, nextState.state);
      return nextState.object;
    };
  };

  var createClient = function createClient(storageKey, initialState) {
    return {
      all: composeAsyncGetter(storageKey, initialState, all),
      filter: composeAsyncGetter(storageKey, initialState, filter),
      get: composeAsyncGetter(storageKey, initialState, get),
      create: composeAsyncSetter(storageKey, initialState, create),
      update: composeAsyncSetter(storageKey, initialState, update),
      remove: composeAsyncSetter(storageKey, initialState, remove)
    };
  };

  var index = createClient(LOCAL_STORAGE_KEY, INITIAL_STATE);

  return index;

})));
