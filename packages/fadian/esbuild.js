import esbuild from 'esbuild'

const defaultConfig = {
  bundle: true,
  sourcemap: true,
  target: ['esNext'],
  format: 'esm',
  outbase: 'src',
  platform: 'node',
  external: ['event', 'fs', 'path', 'util', 'cac', 'readline'],
}

esbuild.build({
  ...defaultConfig,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
})
