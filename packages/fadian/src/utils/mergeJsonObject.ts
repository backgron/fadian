// 合并两个符合JSON格式的对象
function mergeJsonObject(obj1: any, obj2: any): object {
  if (!obj2 || !obj1)
    return obj1 || obj2
  for (const [key, value2] of Object.entries(obj2)) {
    if (!obj1)
      return obj1
    const value1 = obj1[key]
    if (typeof value1 === 'object' && typeof value2 === 'object' && value1 !== null && value2 !== null)
      obj1[key] = mergeJsonObject(value1, value2)
    else
      obj1[key] = value2
  }
  return obj1
}

export default mergeJsonObject
