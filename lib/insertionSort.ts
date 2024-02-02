export const insertionSort = (array: number[]) => {
  const temp = [...array];

  for (let i = 0; i < temp.length; i++) {
    for (let j = i - 1; j > -1; j--) {
      if (temp[j + 1] < temp[j]) {
        [temp[j + 1], temp[j]] = [temp[j], temp[j + 1]];
      }
    }
  }

  return temp;
};
