import { flat } from "./flat";

describe("Test array flat", () => {
  test("Should flatten the given array", () => {
    const arr = [1, [2], [3, [4]]];
    const arr2 = [1, [2], [[3, [4]]]];

    expect(flat(arr, 1)).toStrictEqual([1, 2, 3, [4]]);
    expect(flat(arr, 2)).toStrictEqual([1, 2, 3, 4]);
    expect(flat(arr2, 3)).toStrictEqual([1, 2, 3, 4]);
  });
});
