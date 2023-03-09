import { exec } from 'node:child_process'
import { getNpmEnv } from '../utils'

export const installDep = async (ctx: FadianContext) => {
  const { rootDir } = ctx

  return new Promise((resolve, reject) => {
    const npmEnv = getNpmEnv()
    if (npmEnv) {
      console.log('更新依赖...')
      exec(`${npmEnv} install`, { cwd: rootDir }, (err: any, stdout: any, stderr: any) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        else {
          console.log(stdout)
          resolve(true)
        }
      })
    }
  })
}
