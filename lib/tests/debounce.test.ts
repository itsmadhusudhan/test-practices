import { debounce } from "../debounce";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

const dummy = () => {};

describe("Test debounce fucntion", () => {
  test("Debounce function to work", () => {
    const fakeFn = jest.fn(dummy);

    const callback = debounce<any>(fakeFn, 300);

    callback([1]);
    callback([2]);
    callback([3]);
    callback([4]);

    jest.runAllTimers();

    expect(fakeFn).toBeCalledTimes(1);
  });

  test("Debounce function to work with delay", () => {
    const fakeFn = jest.fn(dummy);

    const callback = debounce<any>(fakeFn, 300);

    callback([1]);
    callback([2]);
    callback([3]);
    callback([4]);

    setTimeout(() => {
      callback([5]);
    }, 300);

    jest.runAllTimers();

    expect(fakeFn).toBeCalledTimes(2);
  });

  test("Debounce function with leading as true", () => {
    const fakeFn = jest.fn(dummy);

    const callback = debounce<any>(fakeFn, 300, {
      leading: true,
      trailing: false,
    });

    callback(1);
    callback(2);

    setTimeout(() => {
      callback(5);
    }, 400);

    jest.runAllTimers();

    expect(fakeFn).toBeCalledTimes(2);
    expect(fakeFn.mock.calls.flatMap((a) => a)).toEqual([1, 5]);
  });

  test("Debounce function with leading and trailing as true", () => {
    const fakeFn = jest.fn(dummy);

    const callback = debounce<any>(fakeFn, 300, {
      leading: true,
      trailing: true,
    });

    callback(1);
    callback(2);
    callback(3);

    setTimeout(() => {
      callback(4);
      callback(5);
      callback(6);
      callback(7);
    }, 400);

    jest.runAllTimers();

    expect(fakeFn).toBeCalledTimes(4);
    expect(fakeFn.mock.calls.flatMap((a) => a)).toEqual([1, 3, 4, 7]);
  });
});
