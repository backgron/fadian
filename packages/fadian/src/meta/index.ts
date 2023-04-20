import { execSync } from 'node:child_process'

export const baseComposition: BaseComposition = {
  eslint: {
    name: 'eslint',
    copyFile: ['.eslintrc'],
    packageJson: {
      devDependencies: {
        'eslint': '^8.35.0',
        '@antfu/eslint-config': '^0.38.5',
      },
      scripts: {
        lint: 'eslint src --ext .js,.jsx,.ts,.tsx --quiet',
      },
    },
  },
  husky: {
    name: 'husky',
    copyFile: ['./.husky/commit-msg', './.husky/pre-commit', './.husky/pre-merge'],
    packageJson: {
      'devDependencies': {
        'husky': '^8.0.0',
        'lint-staged': '^13.2.1',
      },
      'scripts': {
        'fadian:gitMsg': 'fadian gitMsg',
        'pre-commit': 'lint-staged',
      },
      'lint-staged': {
        '*.{js,jsx,ts,tsx}': 'eslint --fix --quiet',
      },
    },
    installed: (ctx: FadianContext) => {
      const { rootDir } = ctx
      execSync('npx husky install', { cwd: rootDir })
    },
  },
}

export const defaultConfig: FadianConfig = {
  // exclude: ['husky']
}
