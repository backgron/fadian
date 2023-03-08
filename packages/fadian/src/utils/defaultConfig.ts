import { BaseItemType } from "./meta"

export interface FadianConfig {
  exclude?: BaseItemType[]
}

export const defaultConfig: FadianConfig = {
  // exclude: ['husky']
}