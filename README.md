# fadian：统一的项目格式化工具

目前包含：eslint
未来期望：husky、stylelint、tsconfig.compilerOptions

项目结构：
  + packages/fadian  主要代码
  + packages/test  测试项目

黑盒测试方法：
  1. `pnpm i` 安装项目依赖
  2. 进入`packages/fadian`执行 `pnpm run build` 进行打包
  3. 进入`package/test` 执行 `pnpm run fadian:clean` 或者 `pnpm run fadian:init`
注意： 如果需要安装husky，需要`packages/test`中存在`.git`文件