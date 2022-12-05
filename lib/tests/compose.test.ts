import { compose } from "../compose";

const addFour = (a: number) => 4 + a;
const multipleFive = (a: number) => a * 5;

describe("Test Compose function", () => {
  test("Should compose the functions correctly", () => {
    const composedFn = compose(addFour, multipleFive);

    expect(composedFn(4)).toBe(24);
  });
});
