import setPackageJson from "../core/setPackageJson"
import { exec } from 'child_process'
import mergeJsonObject from "../utils/mergeJsonObject"
import { defaultConfig, FadianConfig } from "../utils/defaultConfig"
import { BaseComposition, baseComposition, BaseItemType } from "../utils/meta"
import copyTemplate from "../core/copyTemplate"
import afterInstallDependenciesHooks from "../core/afterInstallDependenciesHooks"


/**
 * 获取当前script的执行环境
 */
const getNpmEnv = () => {
  const isNpm = process.env.npm_execpath?.includes('npm')
  const isPnpm = process.env.npm_execpath?.includes('pnpm')
  const isYarn = process.env.npm_execpath?.includes('yarn')

  if (isPnpm) {
    return 'pnpm'
  } else if (isNpm) {
    return 'npm'
  } else if (isYarn) {
    return "yarn"
  } else {
    return false
  }
}

/**
 * 
 * @param config 配置文件
 * @returns 获取有效的组合
 */
export const getUsefulComposition = (config: FadianConfig) => {
  const { exclude } = config
  const composition: BaseComposition = {}
  Object.keys(baseComposition).forEach((key: string) => {
    const itemType = key as BaseItemType
    if (exclude?.includes(itemType)) return
    composition[itemType] = baseComposition[itemType]
  })
  return composition
}


const updateDependencies = async (rootDir: string) => {
  const npmEnv = getNpmEnv()
  if (npmEnv) {
    console.log('更新依赖：')
    exec(`${npmEnv} install`, { cwd: rootDir }, (err: any, stdout: any, stderr: any) => {
      if (err) {
        console.log(err)
      } else {
        console.log(stdout)
      }
    })
  }
}


export const init = async (rootDir: string, options: any) => {

  const config = mergeJsonObject(options, defaultConfig)
  // 获取可用的composition
  const composition = getUsefulComposition(config)
  // 设置package.json
  await setPackageJson(rootDir, composition)
  //安装依赖
  await updateDependencies(rootDir)
  //安装依赖后的hook
  await afterInstallDependenciesHooks(rootDir, composition)
  // 复制模板
  await copyTemplate(rootDir, composition)

  await updateDependencies(rootDir)
}