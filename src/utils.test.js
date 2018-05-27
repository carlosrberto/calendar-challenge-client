import { idGen, delay } from './utils';

describe('idGen', () => {
  it('should return sequencial numbers', () => {
    const id = idGen();
    expect(id.next()).toEqual(1);
    expect(id.next()).toEqual(2);
    expect(id.next()).toEqual(3);
    expect(id.next()).toEqual(4);
  });
});

describe('delay', () => {
  it('should delay execution', async () => {
    expect.assertions(1);
    await expect(delay()).resolves.toBeUndefined();
  });
});
