
export function timeoutPromise(timeout, err, promise) {
    return new Promise((resolve, reject) => {
      promise.then(resolve, reject);
      setTimeout(reject.bind(null, err), timeout);
    });
  }
