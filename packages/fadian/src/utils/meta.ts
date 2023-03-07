interface BaseItem {
  name?: string,
  copyFile?: string[],
  PackageJson?: {
    devDependencies?: Record<string, string>,
    scripts?: Record<string, string>,
    lintStaged?: Record<string, string>,
  },
}

interface BaseComposition {
  esLint?: BaseItem,
  husky?: BaseItem,
}

export const baseComposition: BaseComposition = {
  esLint: {
    name: 'eslint',
    copyFile: ['.eslintrc'],
    PackageJson: {
      devDependencies: {
        "eslint": "^8.35.0",
      },
      scripts: {
        lint: "eslint src --ext .js,.jsx,.ts,.tsx --quiet",
      },
      lintStaged: {
        '*.{js,jsx,ts,tsx}': 'eslint --fix --quiet',
      },
    },
  },
  husky: {
    name: 'husky',
    copyFile: ['commit-msg', 'pre-commit', 'pre-merge'],
    PackageJson: {
      devDependencies: {
        "husky": "^8.0.0",
      },
      scripts: {
        "norm:gitMsg": "norm gitMsg",
      },
    },
  }
}



export const lintFile = [
  ".eslintrc",
]

export const huskyFile = [
  'commit-msg',
  'pre-commit',
  'pre-merge',
]



export const devDependencies = {
  "eslint": "^8.35.0",
  "husky": "^8.0.0",

}

export const scripts = {
  lint: "eslint src --ext .js,.jsx,.ts,.tsx --quiet",
  "norm:gitMsg": "norm gitMsg",
};

export const lintStaged = {
  '*.{js,jsx,ts,tsx}': 'eslint --fix --quiet',
};

