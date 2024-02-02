import { mergeSort } from "../mergeSort";

describe("Test Merge sort algorithm", () => {
  it("Should sort the array in ascending order", () => {
    const array = [20, 30, 35, 5, 57, 23, 68];

    const result = mergeSort(array, 0, array.length - 1);

    const expected = [5, 20, 23, 30, 35, 57];

    console.log(array);

    expect(array).toStrictEqual(expected);
  });
});
