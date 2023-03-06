export const targetFile = [
  ".eslintrc",
]

export const devDependencies = {
  "eslint": "^7.32.0",
}

export const scripts = {
  lint: "eslint src --ext .js,.jsx,.ts,.tsx --quiet",
};

export const lintStaged = {
  '*.{js,jsx,ts,tsx}': 'eslint --fix --quiet',
};

