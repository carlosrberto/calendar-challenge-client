export const getStorage = (key, defaultState) => {
  try {
    const state = JSON.parse(localStorage.getItem(key));
    return state || defaultState;
  } catch (e) {
    return defaultState;
  }
};

export const setStorage = (key, state) =>
  localStorage
    .setItem(key, JSON.stringify(state));
