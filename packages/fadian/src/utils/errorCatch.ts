export default async (fn: (...arg: any) => any, ...args: any) => {
  try {
    return await fn(...args)
  }
  catch (error) {
    console.log(error)
  }
}
