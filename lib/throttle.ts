type Callback<T> = (args?: T) => void

export const throttle = <T extends Function>(
  cb: Callback<T>,
  delay: number = 300
) => {
  let wait = false
  return (...arg: any) => {
    if (wait) return

    cb(...arg)

    wait = true
    setTimeout(() => {
      wait = false
    }, delay)
  }
}
