
type CommandType = 'init' | 'clean' | 'gitMsg'
type NpmEnv = 'npm' | 'pnpm' | 'yarn'
type BaseItemType = keyof BaseComposition

interface FadianContext {
  rootDir: string
  config: FadianConfig
  composition: Composition
}

interface BaseItem {
  name?: string
  copyFile?: string[]
  packageJson?: {
    devDependencies?: Record<string, string>
    scripts?: Record<string, string>
    'lint-staged'?: Record<string, string>
  }
  installed?: (ctx: FadianContext) => void
}

interface Composition {
  [key: string]: BaseItem | undefined
}

interface BaseComposition extends Composition {
  eslint?: BaseItem
  husky?: BaseItem
}
interface FadianConfig {
  exclude?: BaseItemType[]
}
