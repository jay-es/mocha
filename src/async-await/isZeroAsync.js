export const isZeroPromise = num => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (num !== 0) {
      reject(new TypeError('Not Zero!'));
    }

    resolve(true);
  }, 20);
});

export const isZeroAsync = async (num) => {
  if (num !== 0) {
    throw new TypeError('Not Zero!');
  }

  return true;
};
