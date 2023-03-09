import type { BaseComposition, BaseItemType } from '../utils/meta'

export default async (rootDir: string, composition: BaseComposition) => {
  Object.keys(composition).forEach((key: string) => {
    const itemType = key as BaseItemType

    if (composition[itemType]?.afterInstallDependencies)
      composition[itemType]?.afterInstallDependencies?.(rootDir)
  })
}
