import { bubbleSort } from "../bubblesort";

describe("Test Bubble sort algorithm", () => {
  it("Should sort the array", () => {
    const array = [20, 30, 35, 5, 57, 23];

    const result = bubbleSort(array);

    expect(result).toStrictEqual(array.sort((a, b) => a - b));
  });
});
