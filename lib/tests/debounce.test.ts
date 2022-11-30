import { debounce } from "../debounce";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

test("Debounce function to work", () => {
  const fakeFn = jest.fn(console.log);

  const callback = debounce<any>(fakeFn, 300);

  callback([1]);
  callback([2]);
  callback([3]);
  callback([4]);

  jest.runAllTimers();

  expect(fakeFn).toBeCalledTimes(1);
});

test("Debounce function to work with delay", () => {
  const fakeFn = jest.fn(console.log);

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
