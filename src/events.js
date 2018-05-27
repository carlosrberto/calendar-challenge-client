import { all, filter, get, create, update, remove } from './state';
import { getStorage, setStorage } from './storage';
import { delay } from './utils';

export const composeAsyncGetter = (storageKey, initialState, fn) => async (...args) => {
  await delay();
  return fn(getStorage(storageKey, initialState), ...args);
};

export const composeAsyncSetter = (storageKey, initialState, fn) => async (...args) => {
  await delay();
  const state = getStorage(storageKey, initialState);
  const nextState = fn(state, ...args);
  setStorage(storageKey, nextState.state);
  return nextState.object;
};

export const createClient = (storageKey, initialState) => ({
  all: composeAsyncGetter(storageKey, initialState, all),
  filter: composeAsyncGetter(storageKey, initialState, filter),
  get: composeAsyncGetter(storageKey, initialState, get),
  create: composeAsyncSetter(storageKey, initialState, create),
  update: composeAsyncSetter(storageKey, initialState, update),
  remove: composeAsyncSetter(storageKey, initialState, remove),
});
