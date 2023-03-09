import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { FadianContext } from '../../utils/meta'

const gitMsg = (ctx: FadianContext) => {
  const { rootDir, config, composition } = ctx

  const msgPath = resolve(rootDir, process.argv[3])
  console.log('msgPath', msgPath)
  const msg = readFileSync(msgPath, 'utf-8').toString()
  console.log('msg', msgPath)

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

export default gitMsg
