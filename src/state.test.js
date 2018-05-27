import { all, filter, get, update, create, remove } from './state';
import { StateError } from './utils';

describe('create', () => {
  it('should return state with the provided payload', () => {
    const initialState = {
      all: {
        10: { id: 10, title: 'Task 1' },
      },
      byId: [10],
    };
    const next = create(initialState, { title: 'Task 2' });
    expect(next.state).toEqual({
      all: {
        10: { id: 10, title: 'Task 1' },
        1: { id: 1, title: 'Task 2' },
      },
      byId: [10, 1],
    });
  });

  it('should throw error when payload is invalid', () => {
    const initialState = {
      all: {
        10: { id: 10, title: 'Task 1' },
      },
      byId: [10],
    };

    expect(() => {
      create(initialState, { customField: 'Custom value' });
    }).toThrow(StateError);
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
    const next = update(initialState, { id: 1, title: 'Task 2 Edited' });
    expect(next.state).toEqual({
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
    const next = remove(initialState, 1);
    expect(next.state).toEqual({
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
  const state = {
    all: {
      10: { id: 10, title: 'Task 1' },
      1: { id: 1, title: 'Task 2' },
    },
    byId: [10, 1],
  };

  it('should return required item by ID', () => {
    expect(get(state, 10)).toEqual({ id: 10, title: 'Task 1' });
  });
});
