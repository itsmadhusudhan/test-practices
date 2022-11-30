import CustomPromise from "../custompromise";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

// test("Javascript Promise", () => {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("NOTHING");
//     }, 1000);
//   });

//   promise.then(
//     (res) => {
//       console.log(res);

//       expect(res).toBe("NOTHING");
//     },
//     (err) => {
//       console.log(err);
//     }
//   );
// });

test("Custom Promise", () => {
  //   new Promise((resolve, reject) => {
  //     reject("Resolved");
  //   })
  //     .then((value) => {
  //       expect(value).toBe("Resolved");
  //     })
  //     .catch(() => {
  //       console.log("error");
  //     });

  //   const promise = new CustomPromise((resolve, reject) => {
  //     // resolve("Hello World");

  //     setTimeout(() => {
  //       resolve("NOTHING");
  //     }, 1000);
  //   }).then(() => {
  //     return "NOTHINGS";
  //   });

  //   promise
  //     .then((value) => {
  //       expect(value).toBe("NOTHINGS");

  //       return value + "S";
  //     })
  //     .then((value) => {
  //       expect(value).toBe("NOTHINGSS");
  //     });

  let promise2 = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("SOMETHING");
    }, 1000);
  })
    .then((v) => {
      expect(v).toBe("SOMETHING");
    })
    .catch(console.log);

  console.log(promise2);

  jest.runAllTimers();
});
