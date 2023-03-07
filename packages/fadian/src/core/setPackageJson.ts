import {resolve} from 'path'
import {readFile,writeFile} from 'fs/promises'
import {BaseComposition, BaseItemType} from '../utils/meta'
import mergeJsonObject from '../utils/mergeJsonObject'
import errorCatch from '../utils/errorCatch'


/**
 * @description: 根据meta设置package.json
 */
export default  async (rootDir:string,composition:BaseComposition)=>{
  const packageJsonPath = resolve(rootDir, 'package.json')
  const packageJson =JSON.parse(await readFile(packageJsonPath,'utf-8'))

  Object.keys(composition).forEach((key:string)=>{
    const itemType = key as BaseItemType
    
    mergeJsonObject(packageJson,composition[itemType]?.packageJson||{})
  })

  await errorCatch(writeFile,packageJsonPath,JSON.stringify(packageJson,null,4))
}