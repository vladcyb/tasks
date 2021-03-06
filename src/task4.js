const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};

/* Для тестов

const getRandomBoolean = () => Math.floor(Math.random() * 2) === 0;

const API = {
  nonStableFetch: (isStable) => {
    return new Promise((resolve, reject) => {
      if (getRandomBoolean() || isStable) {
        resolve({ data: { x: 1, yasdf: '323' }, method: 'nonStableFetch' });
      } else {
        reject('[nonStableFetch]: Network error!');
      }
    });
  },
  fakeFetch: (x) => {
    return new Promise((resolve, reject) => {
      if (typeof x === 'undefined') {
        reject('[fakeFetch]: x not provided');
      } else if (getRandomBoolean()) {
        setTimeout(() => {
          resolve({ data: { value: Math.random() }, method: 'fakeFetch' });
        }, 500);
      } else {
        reject('[fakeFetch]: Network error!');
      }
    });
  },
  longFetch: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true, method: 'longFetch' });
      }, 1500);
    });
  },
  oneSecondFetch: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ method: 'oneSecondFetch' });
      }, 1000);
    });
  },
  twoSecondsFetch: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ method: 'twoSecondsFetch' });
      }, 2000);
    });
  },
  threeSecondsFetch: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ method: 'threeSecondsFetch' });
      }, 3000);
    });
  },
};

const promiseAllTest = async () => {
  try {
    const result = await promiseAll([
      API.threeSecondsFetch(),
      API.oneSecondFetch(),
      API.twoSecondsFetch(),
    ]);
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.log(e);
  }
};

const promiseRaceTest = async () => {
  try {
    const result = await promiseRace([
      API.threeSecondsFetch(),
      API.twoSecondsFetch(),
      API.oneSecondFetch(),
    ]);
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.log(e);
  }
};

promiseAllTest();

promiseRaceTest();
 */

const promiseAll = (promises) => {
  const numberOfPromises = promises.length;
  return new Promise((resolve, reject) => {
    const result = new Array(numberOfPromises);
    let count = 0;
    promises.forEach(async (promise, index) => {
      try {
        result[index] = await promise;
        if (++count === numberOfPromises) {
          resolve(result);
        }
      } catch (e) {
        reject('reject');
      }
    });
  });
};

const promiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach(async (promise) => {
      try {
        resolve(await promise);
      } catch (e) {
        reject(e);
      }
    });
  });
};

