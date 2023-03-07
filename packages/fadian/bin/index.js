#!/usr/bin/env node
import cac from "cac"
import { clean, init } from "../dist/index.js"

const fadian = cac("norm")

const rootDir = process.cwd()

fadian.command("clean", "Clean the project").action(() => {
  clean(rootDir)
})

fadian.command("init", "Init the project").action(() => {
  init(rootDir)
})

fadian.help()
fadian.parse()
