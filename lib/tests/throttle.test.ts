import { throttle } from "../throttle";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

test("Throttle  function to work", () => {
  const fakeFn = jest.fn(console.log);

  const callback = throttle<any>(fakeFn, 100);

  callback([1]);
  callback([2]);
  callback([3]);

  setTimeout(() => {
    callback([4]);
    callback([5]);
    callback([6]);
  }, 100);

  jest.runAllTimers();

  expect(fakeFn).toBeCalledTimes(2);
  expect(fakeFn.mock.calls.length).toBe(2);
});
