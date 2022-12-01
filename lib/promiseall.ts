export const promiseall = async (list: any[]) => {
  const values: any[] = [];

  for (const prom of list) {
    try {
      const value = await prom;
      values.push(value);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  return Promise.resolve(values);
};
