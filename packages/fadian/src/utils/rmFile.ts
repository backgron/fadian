import { rm } from "fs/promises";
import errorCatch from "./errorCatch";

export const rmFiles = async(path:string|string[])=>{
  const files = Array.isArray(path) ? path : [path]
  files.forEach(async (file) => {
    await errorCatch(rm,file, { recursive: true, force: true }) ;
  })
}

