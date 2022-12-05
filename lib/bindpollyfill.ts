export function bindpollyfill<T extends Function, B extends any = any>(
  func: T,
  bound: B,
  ...pargs: any[]
): any {
  return (...cargs: any[]) => {
    return func.call(bound, ...pargs, ...cargs);
  };
}

export function bindWithProperty<T extends Function, B extends any = any>(
  func: T,
  bound: B,
  ...pargs: any[]
): any {
  return (...cargs: any[]) => {
    // NOTE: this does not work if the bound is frozen
    Object.defineProperty(bound, func.name, {
      value: func,
      configurable: true,
      enumerable: true,
    });

    return (bound as any).getName(...pargs, ...cargs);
  };
}
