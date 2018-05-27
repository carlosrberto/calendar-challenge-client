import { PAYLOAD_KEYS } from './constants';

export const idGen = () => {
  let i = 0;
  return {
    next() {
      i += 1;
      return i;
    },
  };
};

export const delay = (ms = 200) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const invalidPayloadMessage = key =>
  (key ? `Invalid payload key "${key}". Key must be one of ${PAYLOAD_KEYS.join(', ')}` : '');

export const validatePayload = (payload) => {
  let invalidKey;
  const hasInvalidKeys = Object
    .keys(payload)
    .some((k) => {
      if (!(PAYLOAD_KEYS.includes(k))) {
        invalidKey = k;
        return true;
      }
      return false;
    });

  if (typeof payload !== 'object') {
    return {
      valid: false,
      message: 'payload must be an object',
    };
  } else if (hasInvalidKeys) {
    return {
      valid: false,
      message: invalidPayloadMessage(invalidKey),
    };
  }
  return {
    valid: true,
  };
};

export class StateError {
  constructor(message) {
    this.message = message;
  }
}
