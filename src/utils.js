export const idGen = function* idGen() {
  let i = 0;
  while (true) {
    yield i += 1;
  }
};

export const delay = (ms = 200) =>
  new Promise(resolve => setTimeout(resolve, ms));
