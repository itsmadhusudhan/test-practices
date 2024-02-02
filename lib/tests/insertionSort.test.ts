import { insertionSort } from "../insertionSort";

describe("Test Insertion sort algorithm", () => {
  it("Should sort the array in ascending order", () => {
    const array = [20, 30, 35, 5, 57, 23];

    const result = insertionSort(array);

    expect(result).toStrictEqual(array.sort((a, b) => a - b));
  });
});
