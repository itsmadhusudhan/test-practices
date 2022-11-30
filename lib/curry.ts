export function curry(fn: (...args: any[]) => any) {
  return (...args: any[]) => {
    const placeholders: any[] = [];
    const values: any[] = Array.from({ length: fn.length }, () => undefined);

    args.forEach((arg, index) => {
      if (typeof arg === "symbol") {
        placeholders.push(index);
      } else {
        if (index <= values.length - 1) {
          values[index] = arg;
        }
      }
    });

    if (fn.length === values.filter((v) => v).length) {
      return fn(...args);
    } else {
      const cb: any = (...rargs: any[]) => {
        const temp = [...rargs];

        values.forEach((v, vi) => {
          if (!v) {
            const a = temp.shift();
            if (typeof a !== "symbol") {
              values[vi] = a;
            }
          }
        });

        if (fn.length === values.filter((v) => v).length) {
          return fn(...values);
        } else {
          return cb;
        }
      };

      return cb;
    }
  };
}

curry.placeholder = Symbol();

export function vadacurry(fn: (...args: any[]) => any) {
  const cb: any = (...args: any[]) => {
    const temp = [...args];

    let pargs = [];

    if (Array.isArray(temp[0])) {
      pargs = temp.shift() as any[];

      pargs = pargs.map((a) => {
        if (a === null && temp.length > 0) {
          return temp.shift();
        } else {
          return a;
        }
      });
    }

    const cargs = [...pargs, ...temp];

    const values: any[] = Array.from({ length: fn.length }, (_, i) => {
      if (typeof cargs[i] === "symbol") {
        return null;
      }

      if (!cargs[i]) {
        return undefined;
      }

      return cargs[i];
    });

    if (fn.length === values.filter((v) => v).length) {
      return fn(...values);
    } else {
      return cb.bind(
        null,
        values.filter((v) => v || v === null)
      );
    }
  };

  return cb;
}
