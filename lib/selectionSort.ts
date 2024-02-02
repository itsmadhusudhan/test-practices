export const selectionSort = (array: number[]) => {
  const temp = [...array];

  let min;

  for (let i = 0; i < temp.length; i++) {
    min = i;

    for (let j = i + 1; j < temp.length; j++) {
      if (temp[j] < temp[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [temp[min], temp[i]] = [temp[i], temp[min]];
    }
  }

  return temp;
};
