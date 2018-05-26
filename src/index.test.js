import {
  LOCAL_STORAGE_KEY,
  idGen,
  readState,
  setState,
  all,
  filter,
  get,
  update,
  create,
  remove,
} from './index';

describe('idGen', () => {
  it('should return sequencial numbers', () => {
    const id = idGen();
    expect(id.next().value).toEqual(1);
    expect(id.next().value).toEqual(2);
    expect(id.next().value).toEqual(3);
    expect(id.next().value).toEqual(4);
  });
});

describe('setState', () => {
  beforeEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });

  it('should update localStorage with provided state', () => {
    const initialState = {
      all: {
        10: { id: 10, title: 'Task 1' },
      },
      byId: [10],
    };
    setState(initialState);
    expect(readState()).toEqual(initialState);
  });
});

describe('readState', () => {
  beforeEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });

  it('should return initialState when empty', () => {
    const initialState = {
      all: {},
      byId: [],
    };
    expect(readState()).toEqual(initialState);
  });
});

describe('create', () => {
  it('should return state with the provided payload', () => {
    const initialState = {
      all: {
        10: { id: 10, title: 'Task 1' },
      },
      byId: [10],
    };
    const nextState = create(initialState, { title: 'Task 2' });
    expect(nextState).toEqual({
      all: {
        10: { id: 10, title: 'Task 1' },
        1: { id: 1, title: 'Task 2' },
      },
      byId: [10, 1],
    });
  });
});

describe('update', () => {
  it('should update and return news state with the provided payload', () => {
    const initialState = {
      all: {
        10: { id: 10, title: 'Task 1' },
        1: { id: 1, title: 'Task 2' },
      },
      byId: [10, 1],
    };
    const nextState = update(initialState, { id: 1, title: 'Task 2 Edited' });
    expect(nextState).toEqual({
      all: {
        10: { id: 10, title: 'Task 1' },
        1: { id: 1, title: 'Task 2 Edited' },
      },
      byId: [10, 1],
    });
  });
});

describe('remove', () => {
  it('should remote item and return news state', () => {
    const initialState = {
      all: {
        10: { id: 10, title: 'Task 1' },
        1: { id: 1, title: 'Task 2' },
      },
      byId: [10, 1],
    };
    const nextState = remove(initialState, 1);
    expect(nextState).toEqual({
      all: {
        10: { id: 10, title: 'Task 1' },
      },
      byId: [10],
    });
  });
});

describe('all', () => {
  it('should return a list with all items', () => {
    const state = {
      all: {
        10: { id: 10, title: 'Task 1' },
        1: { id: 1, title: 'Task 2' },
      },
      byId: [10, 1],
    };

    expect(all(state)).toEqual([
      { id: 10, title: 'Task 1' },
      { id: 1, title: 'Task 2' },
    ]);
  });
});

describe('filter', () => {
  it('should filter the list with provided callback', () => {
    const state = {
      all: {
        10: { id: 10, title: 'Task 1' },
        1: { id: 1, title: 'Task 2' },
      },
      byId: [10, 1],
    };

    const fn = e => e.title === 'Task 2';

    expect(filter(state, fn)).toEqual([
      { id: 1, title: 'Task 2' },
    ]);
  });
});

describe('get', () => {
  it('should return required item by ID', () => {
    const state = {
      all: {
        10: { id: 10, title: 'Task 1' },
        1: { id: 1, title: 'Task 2' },
      },
      byId: [10, 1],
    };

    expect(get(state, 10)).toEqual({ id: 10, title: 'Task 1' });
  });
});
