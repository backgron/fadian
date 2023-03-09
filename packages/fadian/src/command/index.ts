import type { FadianContext, commandType } from '../utils/meta'
import { defaultConfig } from '../utils/defaultConfig'
import mergeJsonObject from '../utils/mergeJsonObject'
import getUserConfig from '../utils/getUserConfig'
import gitMsg from '../specific/husky/gitMsg'
import { clean } from './clean'
import { getUsefulComposition, init } from './init'

const command = async (args: any, options: any, type: commandType) => {
  const rootDir = process.cwd()
  const userConfig = await getUserConfig(rootDir)
  const config = defaultConfig
  options && mergeJsonObject(config, options)
  userConfig && mergeJsonObject(config, userConfig)
  console.log('config', config)
  const composition = getUsefulComposition(config)

  const ctx: FadianContext = { rootDir, config, composition }

  switch (type) {
    case 'init':
      init(ctx)
      break
    case 'clean':
      clean(ctx)
      break
    case 'gitMsg':
      gitMsg(ctx)
      break
  }
}

export default command
