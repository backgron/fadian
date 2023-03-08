import { execSync } from 'node:child_process'
import type { FadianConfig } from './defaultConfig'

export type commandType = 'init' | 'clean' | 'gitMsg'

export interface FadianContext {
  rootDir: string
  config: FadianConfig
  composition: BaseComposition
}

export interface BaseItem {
  name?: string
  copyFile?: string[]
  packageJson?: {
    devDependencies?: Record<string, string>
    scripts?: Record<string, string>
    'lint-staged'?: Record<string, string>
  }
  afterInstallDependencies?: (rootDir: string) => void
}

export interface Composition {
  [key: string]: BaseItem | undefined
}

export interface BaseComposition extends Composition {
  eslint?: BaseItem
  husky?: BaseItem
}

export type BaseItemType = keyof BaseComposition

export const baseComposition: BaseComposition = {
  eslint: {
    name: 'eslint',
    copyFile: ['.eslintrc'],
    packageJson: {
      'devDependencies': {
        eslint: '^8.35.0',
      },
      'scripts': {
        lint: 'eslint src --ext .js,.jsx,.ts,.tsx --quiet',
      },
      'lint-staged': {
        '*.{js,jsx,ts,tsx}': 'eslint --fix --quiet',
      },
    },
  },
  husky: {
    name: 'husky',
    copyFile: ['./.husky/commit-msg', './.husky/pre-commit', './.husky/pre-merge'],
    packageJson: {
      devDependencies: {
        husky: '^8.0.0',
      },
      scripts: {
        'fadian:gitMsg': 'fadian gitMsg',
        'pre-commit': 'npm run lint',
      },
    },
    afterInstallDependencies: (rootDir: string) => {
      execSync('npx husky install', { cwd: rootDir })
    },
  },
}
