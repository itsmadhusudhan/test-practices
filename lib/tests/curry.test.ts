import { curry, vadacurry } from "../curry";

const join = (a: number, b: number, c: number) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = vadacurry(join);
const _ = curry.placeholder;

describe("Test curry function with different arguments", () => {
  test("should work when all 3 arguments are passed", () => {
    const result = curriedJoin(1, 2, 3);

    expect(result).toBe("1_2_3");
  });

  test("should work with one placeholder arguments are passed", () => {
    const result = curriedJoin(_, 2)(1, 3);

    expect(result).toBe("1_2_3");
  });

  test("should work when all 3 placeholder arguments are passed", () => {
    const result = curriedJoin(_, _, _)(1)(_, 3)(2);

    expect(result).toBe("1_2_3");
  });

  test("should pass", () => {
    expect(curriedJoin(1, 2, 3, 4, 5)).toBe("1_2_3");

    const curried = vadacurry(join)(1, 2);

    expect(curried(3)).toBe("1_2_3");
    expect(curried(4)).toBe("1_2_4");
    expect(curried(_)(5)).toBe("1_2_5");
  });
});
