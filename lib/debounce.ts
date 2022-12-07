type Callback<T> = (args?: T) => void;

export const debounce = <T extends Function>(
  cb: Callback<T>,
  delay: number = 300,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = { trailing: true, leading: false }
) => {
  let timerId: any;
  let lastArgs: any;
  const { leading, trailing } = options;

  if (!leading && !trailing) {
    return (...args: any) => null;
  }
  return (...args: any) => {
    if (!timerId && leading) {
      cb(...args);
    } else {
      lastArgs = args;
    }

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      if (trailing && lastArgs) {
        cb(...lastArgs);
      }
      timerId = null;
      lastArgs = null;
    }, delay);
  };
};
