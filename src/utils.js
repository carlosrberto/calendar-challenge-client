import { PAYLOAD_KEYS, PAYLOAD_REQUIRED_KEYS } from './constants';

export const isValidDate = date =>
  (/(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])\d\d$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/)
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
  } else if (!isCreate && !payload.id) {
    return {
      valid: false,
      message: 'id must be provided for edit action',
    };
  } else if (payload.date !== undefined && !isValidDate(payload.date)) {
    return {
      valid: false,
      message: `invalid date "${payload.date}", date must be in format dd/mm/yyyy`,
    };
  } else if (payload.start_time !== undefined && !isValidTime(payload.start_time)) {
    return {
      valid: false,
      message: `invalid start_time "${payload.start_time}", start_time must be in format HH:mm`,
    };
  } else if (payload.end_time !== undefined && !isValidTime(payload.end_time)) {
    return {
      valid: false,
      message: `invalid end_time "${payload.end_time}", end_time must be in format HH:mm`,
    };
  }

  return {
    valid: true,
  };
};

export class ValidationError {
  constructor(message) {
    this.message = message;
  }
}
