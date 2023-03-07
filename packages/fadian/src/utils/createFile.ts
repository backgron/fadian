import { copyFile } from "fs/promises"
import { resolve } from "path"
import errorCatch from "./errorCatch"
import getCodeRootDir from "./getCodeRootDir"

/**
 * @description 把fadian的模板文件复制到项目中
 * @param rootDir 项目根目录
 * @param files 文件名数组
 */
export default async (rootDir:string, files:string[])=>{
  const codeRootDir = getCodeRootDir()
  
  files.forEach(async (file) => {
    const from = resolve(codeRootDir,`../template/${file}`)
    const to = resolve(rootDir, file)
    await errorCatch(copyFile,from,to)
  })

  return 
}