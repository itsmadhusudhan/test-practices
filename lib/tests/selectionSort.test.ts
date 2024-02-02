import { selectionSort } from "../selectionSort";

describe("Test Selection sort algorithm", () => {
  it("Should sort the array in ascending order", () => {
    const array = [20, 30, 35, 5, 57, 23];

    const expected = [5, 20, 23, 30, 35, 57];

    const result = selectionSort(array);

    expect(result).toStrictEqual(expected);
  });
});
