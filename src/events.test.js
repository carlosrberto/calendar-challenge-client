import { createClient } from './events';

const STORAGE_KEY = 'client_test_key';

describe('createClient', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('should create a client with all avaiable methods', () => {
    const client = createClient(STORAGE_KEY);
    expect(Object.keys(client)).toEqual([
      'all',
      'filter',
      'get',
      'create',
      'update',
      'remove',
    ]);
  });
});

describe('client.all', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('should return the initial empty items', async () => {
    const client = createClient(STORAGE_KEY);
    expect.assertions(1);
    await expect(client.all()).resolves.toEqual([]);
  });
});

describe('client.filter', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('should filter items', async () => {
    const state = {
      all: {
        10: { id: 10, title: 'Task 1' },
        1: { id: 1, title: 'Task 2' },
      },
      byId: [10, 1],
    };

    const client = createClient(STORAGE_KEY, state);
    const fn = v => v.title === 'Task 2';
    expect.assertions(1);
    await expect(client.filter(fn)).resolves.toEqual([{ id: 1, title: 'Task 2' }]);
  });
});
