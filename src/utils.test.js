import { idGen, delay, validatePayload, invalidPayloadMessage, StateError } from './utils';
import { PAYLOAD_KEYS } from './constants';

describe('idGen', () => {
  it('should return sequencial numbers', () => {
    const id = idGen();
    expect(id.next()).toEqual(1);
    expect(id.next()).toEqual(2);
    expect(id.next()).toEqual(3);
    expect(id.next()).toEqual(4);
  });
});

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

describe('StateError', () => {
  const error = new StateError('error message');
  it('instance should have the error message', () => {
    expect(error.message).toEqual('error message');
  });
});
