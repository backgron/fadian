import { join, resolve } from 'node:path'
import url from 'node:url'
import { rm } from 'node:fs/promises'

export const getNpmEnv = () => {
  const npmType = ['pnpm', 'npm', 'yarn']

  for (const type of npmType) {
    if (process.env.npm_execpath?.includes(type))
      return type
  }
}

/**
 * 获得当前程序执行的根目录，不是用户项目文件的根目录
 */
export const getCodeRootDir = () => {
  return resolve(url.fileURLToPath(import.meta.url), '../')
}

export const rmFiles = async (path: string | string[]) => {
  const files = Array.isArray(path) ? path : [path]
  files.forEach(async (file) => {
    await rm(file, { recursive: true, force: true })
  })
}

/**
 * 将后方所有的对象合并到第一个对象上，返回第一个对象
 */
export const extend = (target: Record<string, any>, ...origins: Record<string, any>[]) => {
  origins.forEach((origin) => {
    for (const key in origin) {
      if (typeof origin[key] === 'object')
        target[key] = extend(target[key] || {}, origin[key])
      else
        target[key] = origin[key]
    }
  })
  return target
}

export const getUserConfig = async (rootDir: string, configPath = '/fadian.config.js') => {
  const path = join(rootDir + configPath)
  const userConfigUrl: string = url.pathToFileURL(path).href

  let userConfig = {}
  try {
    const target = await import(userConfigUrl)
    userConfig = target.default
  }
  catch (error: any) {
    if (error.code === 'ERR_REQUIRE_ESM')
      userConfig = require(path)
    else
      throw error
  }

  return userConfig
}
