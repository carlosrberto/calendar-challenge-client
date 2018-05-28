import {
  delay,
  validatePayload,
  invalidPayloadMessage,
  ValidationError,
  isValidDate,
  isValidTime,
} from './utils';
import { PAYLOAD_KEYS } from './constants';

describe('invalidPayloadMessage', () => {
  it('should return correct invalid message', () => {
    expect(invalidPayloadMessage('invalid'))
      .toEqual(`Invalid payload key "invalid". Key must be one of ${PAYLOAD_KEYS.join(', ')}`);
  });
});

describe('validatePayload', () => {
  it('should return that payload is valid', () => {
    expect(validatePayload({ id: 10 }))
      .toEqual({ valid: true });
  });

  it('should return that payload is invalid', () => {
    expect(validatePayload({ invalid: 'string' }))
      .toEqual({
        valid: false,
        message: invalidPayloadMessage('invalid'),
      });
  });
});

describe('delay', () => {
  it('should delay execution', async () => {
    expect.assertions(1);
    await expect(delay()).resolves.toBeUndefined();
  });
});

describe('ValidationError', () => {
  const error = new ValidationError('error message');
  it('instance should have the error message', () => {
    expect(error.message).toEqual('error message');
  });
});

describe('isValidDate', () => {
  it('should return true for valid dates', () => {
    expect(isValidDate('19/04/2018')).toBeTruthy();
    expect(isValidDate('01/05/2018')).toBeTruthy();
  });

  it('should return false for valid dates', () => {
    expect(isValidDate('2018/04/02')).toBeFalsy();
    expect(isValidDate('')).toBeFalsy();
    expect(isValidDate('10/02')).toBeFalsy();
    expect(isValidDate('32/04/2018')).toBeFalsy();
  });
});

describe('isValidTime', () => {
  it('should return true for valid times', () => {
    expect(isValidTime('10:20')).toBeTruthy();
    expect(isValidTime('12:45')).toBeTruthy();
    expect(isValidTime('23:59')).toBeTruthy();
  });

  it('should return false for valid times', () => {
    expect(isValidTime('24:59')).toBeFalsy();
    expect(isValidTime('1:24')).toBeFalsy();
    expect(isValidTime('13:60')).toBeFalsy();
  });
});
