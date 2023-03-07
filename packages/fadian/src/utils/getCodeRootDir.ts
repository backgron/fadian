import { resolve } from "path"
import url from 'url'

export default ()=>{
  return resolve(url.fileURLToPath(import.meta.url),`../`)
}