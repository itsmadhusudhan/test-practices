export const compose = (...fns: any[]) => {
  return (...input: any[]) => {
    const result = fns.reduceRight((prevOutput, fn) => {
      return (prevOutput = fn(prevOutput));
    }, input);

    return result;
  };
};
