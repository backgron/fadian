import { createInterface } from "readline"
import { Composition, FadianContext } from "../utils/meta"
import { rmFiles } from "../utils/rmFile"

export const getRemoveFile = async (composition: Composition) => {
  let allCopyFile: string[] = []

  Object.keys(composition).forEach((key) => {
    const itemCopyFile = composition[key]?.copyFile
    if (itemCopyFile)
      allCopyFile = allCopyFile.concat(itemCopyFile)
  })

  return allCopyFile
}


export const sureRemove = async (rmFile: string[]) => {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.setPrompt(
      `+ 你确定要删除以下文件吗？(y/n)
  ${rmFile.join('\n  ')}
 `
    );
    rl.prompt();

    rl.on('line', async (line) => {
      //判断输入的是否是y或者n
      if (line === 'y') {
        await rmFiles(rmFile)
        rl.close();
        resolve(true)
      } else if (line === 'n') {
        rl.close();
        resolve(false)
      } else {
        console.log('请输入y或者n')
        rl.prompt();
      }
    });
  })

}

export const clean = async (ctx: FadianContext) => {

  const { rootDir, config, composition } = ctx

  const rmFile = await getRemoveFile(composition)


  if (rmFile.length != 0) {
    let isRemove = await sureRemove(rmFile)
    if (isRemove) {
      console.log('删除成功')
      return true
    } else {
      console.log('取消删除')
      return false
    }
  } else {
    console.log('没有需要删除的文件')
    return true
  }
}