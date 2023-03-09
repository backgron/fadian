import { resolve } from 'node:path'
import url from 'node:url'

export default () => {
  return resolve(url.fileURLToPath(import.meta.url), '../')
}
