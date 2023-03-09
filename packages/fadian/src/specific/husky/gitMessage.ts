import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const gitMessage = (ctx: FadianContext) => {
  const { rootDir } = ctx

  const msgPath = resolve(rootDir, process.argv[3])
  const msg = readFileSync(msgPath, 'utf-8').toString()

  // 写一个正则表达式，匹配以commitlint规范的commit message
  const commitRE
    = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

  if (!commitRE.test(msg)) {
    console.log(`
  不符合commitlint规范，请检查commit message
  `)
    process.exit(1)
  }
}
