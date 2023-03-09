import { resolve } from 'node:path'
import { copyFile } from 'node:fs/promises'
import { getCodeRootDir } from '../utils'

export const copyTemplate = async (ctx: FadianContext) => {
  const { rootDir, composition } = ctx
  const codeRootDir = getCodeRootDir()

  for (const itemType in composition) {
    const files = composition[itemType]?.copyFile

    files && files.forEach(async (file) => {
      const from = resolve(codeRootDir, `../template/${file}`)
      const to = resolve(rootDir, file)
      await copyFile(from, to)
    })
  }
}
