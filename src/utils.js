import { PAYLOAD_KEYS, PAYLOAD_REQUIRED_KEYS } from './constants';

export const idGen = () => {
  let i = 0;
  return {
    next() {
      i += 1;
      return i;
    },
  };
};

export const isValidDate = date =>
  (/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/)
    .test(date);

export const isValidTime = time =>
  (/([01][0-9]|2[0-3]):[0-5][0-9]/)
    .test(time);

export const delay = (ms = 200) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const invalidPayloadMessage = key =>
  (key ? `Invalid payload key "${key}". Key must be one of ${PAYLOAD_KEYS.join(', ')}` : '');

export const validatePayload = (payload, isCreate = false) => {
  let invalidKey;
  const payloadKeys = Object.keys(payload);
  const hasInvalidKeys = payloadKeys
    .some((k) => {
      if (!PAYLOAD_KEYS.includes(k)) {
        invalidKey = k;
        return true;
      }
      return false;
    });

  const hasCreateKeys = payloadKeys
    .filter(v => PAYLOAD_REQUIRED_KEYS.includes(v))
    .length === PAYLOAD_REQUIRED_KEYS.length;

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
  } else if (isCreate && !hasCreateKeys) {
    return {
      valid: false,
      message: `payload must include all required keys: ${PAYLOAD_REQUIRED_KEYS.join(', ')}`,
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
