import { idGen } from './utils';

const getId = idGen();

export const all = state => state.byId.map(id => state.all[id]);

export const filter = (state, fn) => all(state).filter(fn);

export const get = (state, id) => state.all[id];

export const create = (prevState, payload) => {
  const nextId = getId.next().value;
  const object = {
    id: nextId,
    ...payload,
  };

  const state = {
    all: {
      ...prevState.all,
      [nextId]: object,
    },
    byId: [...prevState.byId, nextId],
  };

  return {
    object,
    state,
  };
};

export const update = (prevState, payload) => {
  const object = {
    ...prevState.all[payload.id],
    ...payload,
  };

  const state = {
    ...prevState,
    all: {
      ...prevState.all,
      [payload.id]: {
        ...object,
      },
    },
  };

  return {
    state,
    object,
  };
};

export const remove = (prevState, id) => {
  const nextAll = { ...prevState.all };
  const object = { ...prevState.all[id] };
  delete nextAll[id];
  const state = {
    all: {
      ...nextAll,
    },
    byId: prevState.byId.filter(v => v !== id),
  };

  return {
    state,
    object,
  };
};
