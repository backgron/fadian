import { join } from 'node:path'
import url from 'node:url'

export default async (rootDir: string, configPath = '/fadian.config.js') => {
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
