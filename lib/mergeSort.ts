export const mergeSort = (array: number[], left: number, right: number) => {
  if (left >= right) {
    return;
  }

  let middle = left + Math.ceil((right - 1) / 2);

  mergeSort(array, left, middle);
  mergeSort(array, middle + 1, right);
  merge(array, left, middle, right);

  return array;
};

const merge = (
  array: number[],
  left: number,
  middle: number,
  right: number
) => {
  // create 2 pointers
  let p1 = middle - left + 1;
  let p2 = right - middle;

  // let larr = array.slice(left, p1);
  // let rarr = array.slice(middle + 1);

  let larr: number[] = new Array(p1);
  let rarr: number[] = new Array(p2);

  for (let i = 0; i < p1; i++) larr[i] = array[left + i];
  for (let j = 0; j < p2; j++) rarr[j] = array[middle + 1 + j];

  let i = 0;
  let j = 0;
  let k = left;

  while (i < p1 && j < p2) {
    if (larr[i] <= rarr[j]) {
      array[k] = larr[i];
      i++;
    } else {
      array[k] = rarr[j];
      j++;
    }
    k++;
  }

  while (i < p1) {
    array[k] = larr[i];

    i++;
    k++;
  }

  while (j < p2) {
    array[k] = rarr[j];

    j++;
    k++;
  }
};
