export const LOCAL_STORAGE_KEY = 'desafio-iclinic-events';

const initialState = {
  all: {},
  byId: [],
};

export const idGen = function* idGen() {
  let i = 0;
  while (true) {
    yield i += 1;
  }
};

const getId = idGen();

export const readState = () => {
  try {
    const state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return state || initialState;
  } catch (e) {
    return initialState;
  }
};

export const setState = state => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));

export const all = state => state.byId.map(id => state.all[id]);

export const filter = (state, fn) => all(state).filter(fn);

export const get = (state, id) => state.all[id];

export const create = (state, payload) => {
  const nextId = getId.next().value;
  return {
    all: {
      ...state.all,
      [nextId]: {
        id: nextId,
        ...payload,
      },
    },
    byId: [...state.byId, nextId],
  };
};

export const update = (state, payload) => ({
  ...state,
  all: {
    ...state.all,
    [payload.id]: {
      ...state.all[payload.id],
      ...payload,
    },
  },
});

export const remove = (state, id) => {
  const nextAll = { ...state.all };
  delete nextAll[id];
  return {
    all: {
      ...nextAll,
    },
    byId: state.byId.filter(v => v !== id),
  };
};
