import { copyTemplate, installDep, setPackageJson } from '../core'
import { installed } from '../hooks/installed'
import { clean } from './clean'

export const init = async (ctx: FadianContext) => {
  const isClean = clean(ctx)
  if (!isClean)
    return console.log('请先清理原文件: fadian clean')

  // 设置package.json
  await setPackageJson(ctx)
  // 安装依赖
  await installDep(ctx)
  // 安装依赖后的hook
  await installed(ctx)
  // 复制模板
  await copyTemplate(ctx)

  console.log('初始化完成')
}
