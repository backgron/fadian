import { execSync } from 'node:child_process'

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
    installed: (ctx: FadianContext) => {
      const { rootDir } = ctx
      execSync('npx husky install', { cwd: rootDir })
    },
  },
}

export const defaultConfig: FadianConfig = {
  // exclude: ['husky']
}
