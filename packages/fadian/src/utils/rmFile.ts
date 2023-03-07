import { rm } from "fs/promises";

export const rmFiles = async(path:string|string[])=>{
  const files = Array.isArray(path) ? path : [path]
  files.forEach(async (file) => {
    await rm(file, { recursive: true, force: true });
  })
}

