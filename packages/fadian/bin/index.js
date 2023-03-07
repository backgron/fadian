#!/usr/bin/env node
import cac from "cac"
import { clean, init } from "../dist/index.js"

const fadian = cac("norm")

const rootDir = process.cwd()

fadian.command("clean", "Clean the project").action((args, options) => {
  clean(rootDir, options || {})
})

fadian.command("init", "Init the project").action((args, options) => {
  init(rootDir, options || {})
})

fadian.help()
fadian.parse()
