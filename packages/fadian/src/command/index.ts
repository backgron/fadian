import { baseComposition, defaultConfig } from '../meta'
import { gitMessage } from '../specific/husky/gitMessage'
import { extend, getUserConfig } from '../utils'
import { clean } from './clean'
import { init } from './init'

const getUsefulComposition = (config: FadianConfig) => {
  const { exclude } = config
  const composition: Composition = {}

  for (const itemType in baseComposition) {
    if (exclude?.includes(itemType))
      continue
    composition[itemType] = baseComposition[itemType]
  }

  return composition
}

const command = async (args: any, options: any, type: CommandType) => {
  const rootDir = process.cwd()
  const userConfig = await getUserConfig(rootDir)
  const config = extend(defaultConfig, options, userConfig)
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
      gitMessage(ctx)
      break
  }
}

export default command
