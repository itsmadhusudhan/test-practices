export const bubbleSort = (array: number[]) => {
  const temp = [...array];

  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp.length - 1 - i; j++) {
      if (temp[j + 1] < temp[j]) {
        [temp[j + 1], temp[j]] = [temp[j], temp[j + 1]];
      }
    }
  }

  return temp;
};
