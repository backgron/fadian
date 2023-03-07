import { readdir } from "fs/promises"
import { createInterface } from "readline"
import { defaultConfig } from "../utils/defaultConfig"
import mergeJsonObject from "../utils/mergeJsonObject"
import { BaseComposition } from "../utils/meta"
import { rmFiles } from "../utils/rmFile"

// 没做好这个地方，需要优化
export const getRemoveFile = async (rootDir:string,config:BaseComposition) => {
  const files = await readdir(rootDir)

  const lintFile:string[] = Object.keys(config).reduce((pre,cur)=>{
    //@ts-ignore
    return pre.concat(config[cur].lintFile)
  },[])

  const rmFile = files.filter((file)=>lintFile.includes(file))
  return rmFile
}


export const sureRemove = async (rmFile:string[])=>{
  return new Promise((resolve)=>{
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.setPrompt(
`+ 你确定要删除以下文件吗？(y/n)
  ${rmFile.join('\n  ')}
 `
    );
    rl.prompt();
  
    rl.on('line',async (line) => {
    //判断输入的是否是y或者n
    if (line === 'y') {
      await rmFiles(rmFile)
      rl.close();
      resolve(true)
    } else if (line === 'n') {
      console.log('取消删除')
      rl.close();
      resolve(false)
    }else{
      console.log('请输入y或者n')
      rl.prompt();
    }
  });
  })

}

export const clean =async (rootDir:string,options:any)=>{
  const config = mergeJsonObject(options,defaultConfig)
  
  const rmFile =await getRemoveFile(rootDir,config)

  
  if(rmFile.length!=0){
    return await sureRemove(rmFile)
  }else{
    return true
  }
}