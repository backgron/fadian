import { copyFile ,readFile,writeFile} from "fs/promises"
import {  resolve } from "path"
import { devDependencies, lintStaged, scripts, lintFile } from "../utils/meta"
import { clean } from "./clean"
import getCodeRootDir from "../utils/getCodeRootDir"
import {exec} from 'child_process'


const getNpmEnv = ()=>{
  const isNpm = process.env.npm_execpath?.includes('npm')
  const isPnpm = process.env.npm_execpath?.includes('pnpm')
  const isYarn = process.env.npm_execpath?.includes('yarn')

  if (isPnpm) {
    return 'pnpm'
  } else if (isNpm) {
    return 'npm'
  } else if(isYarn){
    return "yarn"
  }else{
    return false
  }
}

const setPackageJson = async (rootDir:string)=>{
  const packageJsonPath = resolve(rootDir, 'package.json')
  const packageJson =JSON.parse(await readFile(packageJsonPath,'utf-8'))

  const oldScripts = packageJson.scripts||{}
  const oldDevDependencies = packageJson.devDependencies||{}
  const oldLintStaged = packageJson.lintStaged||{}
  packageJson.scripts = {
    ...oldScripts,
    ...scripts
  }
  packageJson.devDependencies = {
    ...oldDevDependencies,
    ...devDependencies
  }
  packageJson['lint-staged'] = {
    ...oldLintStaged,
    ...lintStaged
  }
  await writeFile(packageJsonPath,JSON.stringify(packageJson,null,4))
}

const copyLintFile = async (rootDir:string,)=>{
  const codeRootDir = getCodeRootDir()

  lintFile.forEach(async (file) => {
    const from = resolve(codeRootDir,`../template/${file}`)
    const to = resolve(rootDir, file)
    await copyFile(from,to)
  })
  
}

const updateDependencies = async (rootDir:string)=>{
  const npmEnv = getNpmEnv()
  if(npmEnv){
    console.log('更新依赖：')
    exec(`${npmEnv} install`,{cwd:rootDir},(err:any,stdout:any,stderr:any)=>{
      if(err){
        console.log(err)
      }else{
        console.log(stdout)
      }
    })
  }
}


export const init = async (rootDir:string) => {

  await copyLintFile(rootDir)
  await setPackageJson(rootDir)
  await updateDependencies(rootDir)
}