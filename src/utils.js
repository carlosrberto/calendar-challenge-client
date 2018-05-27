export const idGen = () => {
  let i = 0;
  return {
    next() {
      i += 1;
      return i;
    },
  };
};

export const delay = (ms = 200) =>
  new Promise(resolve => setTimeout(resolve, ms));
