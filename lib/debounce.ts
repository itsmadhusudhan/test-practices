type Callback<T> = (args?: T) => void

export const debounce = <T extends Function>(
  cb: Callback<T>,
  delay: number = 300
) => {
  let timer: any
  return (...rest: any) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      cb(...rest)
    }, delay)
  }
}
