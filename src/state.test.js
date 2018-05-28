import { all, filter, get, update, create, remove } from './state';
import { StateError } from './utils';

describe('create', () => {
  it('should return state with the provided payload', () => {
    const initialState = {
      all: {
        ds6d5s: {
          id: 'ds6d5s',
          title: 'Task 1',
          date: '10/05/2020',
          start_time: '10:00',
          end_time: '10:30',
        },
      },
      byId: ['ds6d5s'],
    };
    const next = create(initialState, {
      title: 'Task 2',
      date: '10/05/2020',
      start_time: '11:00',
      end_time: '11:30',
    });

    const nextId = next.object.id;

    expect(next.state).toEqual({
      all: {
        ds6d5s: {
          id: 'ds6d5s',
          title: 'Task 1',
          date: '10/05/2020',
          start_time: '10:00',
          end_time: '10:30',
        },
        [nextId]: {
          id: nextId,
          title: 'Task 2',
          date: '10/05/2020',
          start_time: '11:00',
          end_time: '11:30',
          timestamp: next.object.timestamp,
        },
      },
      byId: ['ds6d5s', nextId],
    });
  });

  it('should throw error when payload is invalid', () => {
    const initialState = {
      all: {
        ds6d5s: { id: 'ds6d5s', title: 'Task 1' },
      },
      byId: ['ds6d5s'],
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
        ds6d5s: { id: 'ds6d5s', title: 'Task 1' },
        hdsada: { id: 'hdsada', title: 'Task 2' },
      },
      byId: ['ds6d5s', 'hdsada'],
    };
    const next = update(initialState, { id: 'hdsada', title: 'Task 2 Edited' });
    expect(next.state).toEqual({
      all: {
        ds6d5s: { id: 'ds6d5s', title: 'Task 1' },
        hdsada: { id: 'hdsada', title: 'Task 2 Edited' },
      },
      byId: ['ds6d5s', 'hdsada'],
    });
  });
});

describe('remove', () => {
  it('should remote item and return news state', () => {
    const initialState = {
      all: {
        ds6d5s: { id: 'ds6d5s', title: 'Task 1' },
        hdsada: { id: 'hdsada', title: 'Task 2' },
      },
      byId: ['ds6d5s', 'hdsada'],
    };
    const next = remove(initialState, 'hdsada');
    expect(next.state).toEqual({
      all: {
        ds6d5s: { id: 'ds6d5s', title: 'Task 1' },
      },
      byId: ['ds6d5s'],
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
