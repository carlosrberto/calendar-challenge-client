import { getStorage, setStorage } from './storage';

const STORAGE_KEY = 'storage_test_key';

describe('setStorage', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('should update localStorage with provided state', () => {
    const initialState = {
      all: {},
      byId: [],
    };
    const nextState = {
      all: {
        10: { id: 10, title: 'Task 1' },
      },
      byId: [10],
    };
    setStorage(STORAGE_KEY, nextState);
    expect(getStorage(STORAGE_KEY, initialState)).toEqual(nextState);
  });
});

describe('getStorage', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('should return initialState when empty', () => {
    const initialState = {
      all: {},
      byId: [],
    };
    expect(getStorage(STORAGE_KEY, initialState)).toEqual(initialState);
  });
});
