const promiseResult = async (fn: Promise<any>) => {
  return fn.then(
    (result) => [undefined, result],
    (err) => [err]
  );
};

export default promiseResult;
