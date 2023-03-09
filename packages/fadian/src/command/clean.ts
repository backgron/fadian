import { stat } from 'node:fs/promises'
import { createInterface } from 'node:readline'
import { join } from 'node:path'
import { rmFiles } from '../utils'

const getRemoveFile = async (rootDir: string, composition: Composition) => {
  let allCopyFile: string[] = []
  for (const itemType in composition) {
    const itemCopyFile = composition[itemType]?.copyFile
    if (itemCopyFile)
      allCopyFile = allCopyFile.concat(itemCopyFile)
  }

  // 筛选出allCopyFile中存在的文件，放到一个数组rmFile中
  const rmFile: string[] = []
  for (const file of allCopyFile) {
    try {
      const isExist = await stat(join(rootDir, file))
      isExist && rmFile.push(file)
    }
    catch {}
  }

  return rmFile
}

const sureRemove = async (rmFile: string[]) => {
  if (rmFile.length === 0)
    return true

  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.setPrompt(
      `+ 你确定要删除以下文件吗？(y/n)
  ${rmFile.join('\n  ')}
 `,
    )
    rl.prompt()

    rl.on('line', async (line) => {
      // 判断输入的是否是y或者n
      switch (line) {
        case 'y':
          await rmFiles(rmFile)
          rl.close()
          resolve(true)
          break
        case 'n':
          rl.close()
          resolve(false)
          break
        default:
          console.log('请输入y或者n')
          rl.prompt()
          break
      }
    })
  })
}

export const clean = async (ctx: FadianContext) => {
  const { rootDir, composition } = ctx

  const rmFile = await getRemoveFile(rootDir, composition)

  const isRemove = await sureRemove(rmFile)
  if (!isRemove)
    return false
  return true
}
