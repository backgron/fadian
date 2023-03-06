import { readdir } from "fs/promises"
import { createInterface } from "readline"
import { targetFile } from "../utils/meta"
import { rmFiles } from "../utils/rmFile"

const getTargetFiles = async (rootDir:string) => {
  const files = await readdir(rootDir)
  const rmFile = files.filter((file)=>targetFile.includes(file))
  return rmFile
}


const sureRemove = async (rmFile:string[])=>{
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

export const clean =async (rootDir:string)=>{
  const rmFile =await getTargetFiles(rootDir)
  
  if(rmFile.length!=0){
    return await sureRemove(rmFile)
  }else{
    return true
  }
}