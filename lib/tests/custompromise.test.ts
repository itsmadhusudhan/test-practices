import CustomPromise from "../custompromise";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("Test Custom promise implementation", () => {
  test("Custom Promise", () => {
    const promise = new CustomPromise((resolve, reject) => {
      // resolve("Hello World");

      setTimeout(() => {
        resolve("NOTHING");
      }, 1000);
    }).then(() => {
      return "NOTHINGS";
    });

    promise
      .then((value) => {
        expect(value).toBe("NOTHINGS");

        return value + "S";
      })
      .then((value) => {
        expect(value).toBe("NOTHINGSS");
      });

    let promise2 = new CustomPromise((resolve, reject) => {
      setTimeout(() => {
        resolve("SOMETHING");
      }, 1000);
    })
      .then((v) => {
        expect(v).toBe("SOMETHING");
      })
      .catch(console.log);

    jest.runAllTimers();
  });
});
