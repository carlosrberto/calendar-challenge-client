import uid from 'uid';
import { validatePayload, ValidationError } from './utils';

export const all = state => state.byId.map(id => state.all[id]);

export const filter = (state, fn) => all(state).filter(fn);

export const get = (state, id) => state.all[id];

export const create = (prevState, payload) => {
  const validation = validatePayload(payload, true);

  if (!validation.valid) {
    throw new ValidationError(validation.message);
  }

  const nextId = uid();
  const object = {
    ...payload,
    timestamp: Date.now(),
    id: nextId,
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
  const prevObject = prevState.all[payload.id];

  if (!prevObject) {
    throw new ValidationError(`entry with id: ${payload.id} not found`);
  }

  const validation = validatePayload(payload);

  if (!validation.valid) {
    throw new ValidationError(validation.message);
  }

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
  const prevObject = prevState.all[id];

  if (!prevObject) {
    throw new ValidationError(`entry with id: ${id} not found`);
  }

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
