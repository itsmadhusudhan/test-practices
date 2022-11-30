export const flat = (arr: any[], depth: number = 1) => {
  const temp: any[] = [];
  let _depth = 0;

  const cb = (a: any) => {
    if (_depth <= depth && Array.isArray(a)) {
      _depth += 1;

      a.forEach(cb);

      return;
    }

    temp.push(a);
  };

  arr.forEach(cb);

  return temp;
};
