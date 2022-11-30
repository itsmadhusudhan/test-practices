class CustomPromise<R> {
  #promiseChain: any[] = [];
  #rejectChain: any[] = [];
  #value!: R;

  status: "pending" | "fulfilled" | "rejected" = "pending";

  constructor(
    executor: (
      onResolve: (value: R) => any,
      onReject: (error: any) => any
    ) => void
  ) {
    this.status = "pending";

    try {
      executor(this.onResolve, this.onReject);
    } catch (err) {
      this.onReject(err);
    }
  }

  then(onFulfilled: (value: R) => any): CustomPromise<R> {
    if (this.status === "pending") {
      this.#promiseChain.push(onFulfilled);
    }

    if (this.status === "fulfilled") {
      queueMicrotask(() => {
        try {
          this.#value = onFulfilled(this.#value);
        } catch (e) {
          this.status = "pending";
          this.onReject(e);
        }
      });
    }

    return this;
  }

  catch(onRejected: (error: any) => any): CustomPromise<R> {
    if (this.status !== "rejected") {
      this.#rejectChain.push(onRejected);
    }

    if (this.status === "rejected") {
      onRejected(this.#value);
    }

    return this;
  }

  onResolve = (value: R) => {
    if (this.status === "pending") {
      this.status = "fulfilled";
      this.#value = value;

      queueMicrotask(() => {
        this.#promiseChain.forEach((fn) => {
          try {
            this.#value = fn(this.#value);
          } catch (e) {
            this.status = "pending";
            this.onReject(e);
          }
        });
      });
    }

    // this.#value = value;
    // let storedValue = value;

    // try {

    // } catch (err) {
    //   this.#promiseChain = [];

    //   this.onReject(err);
    // }
  };

  onReject = (error: any) => {
    if (this.status === "pending") {
      this.status = "rejected";
      this.#value = error;

      queueMicrotask(() => {
        this.#rejectChain.forEach((fn) => {
          this.#value = fn(this.#value);
        });
      });
    }
  };
}

export default CustomPromise;
