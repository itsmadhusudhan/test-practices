type Callback<T> = (args?: T) => void;

export const throttle = <T extends Function>(
  cb: Callback<T>,
  delay: number = 300,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = { trailing: true, leading: false }
) => {
  let wait = false;
  const { leading, trailing } = options;

  let lastArgs: any;

  return (...args: any) => {
    if (wait) {
      lastArgs = args;
      return;
    }

    if (!wait) {
      if (leading) {
        cb(...args);
      }

      wait = true;
      setTimeout(() => {
        if (trailing && lastArgs) {
          cb(...lastArgs);
        }
        lastArgs = null;

        wait = false;
      }, delay);
    }
  };
};
