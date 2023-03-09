import { resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { extend } from '../utils'

/**
 * @description: 根据meta设置package.json
 */
export const setPackageJson = async (ctx: FadianContext) => {
  const { rootDir, composition } = ctx

  const packageJsonPath = resolve(rootDir, 'package.json')
  let packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'))

  for (const itemType in composition) {
    const itemPkg = composition[itemType]?.packageJson
    packageJson = itemPkg && extend(packageJson, itemPkg)
  }

  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
}
