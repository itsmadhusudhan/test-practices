import { promiseall } from "../promiseall";

jest.useFakeTimers();

describe("Test Promise.all implementation", () => {
  it("Should return the values by resolving the promise", async () => {
    const promise1 = Promise.resolve("One");
    const promise2 = new Promise((resolve) => {
      setTimeout(() => {
        resolve("Two");
      }, 2000);

      jest.runAllTimers();
    });
    const promise3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Three");
      }, 4000);

      jest.runAllTimers();
    });

    const values = await promiseall([
      promise1,
      promise2,
      promise3,
      "Hello" as any,
    ]);

    jest.runAllTimers();

    expect(values).toStrictEqual(["One", "Two", "Three", "Hello"]);
  });

  it("Should return the error even when one promise fails", async () => {
    const promise1 = Promise.resolve("One");
    const promise2 = new Promise((resolve) => {
      setTimeout(() => {
        resolve("Two");
      }, 2000);

      jest.runAllTimers();
    });

    const promise3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Three");
      }, 4000);

      jest.runAllTimers();
    });

    jest.runAllTimers();

    await expect(
      promiseall([promise1, promise2, promise3, "Hello" as any])
    ).rejects.toStrictEqual("Three");
  });
});
