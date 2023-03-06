#!/usr/bin/env node
import cac from "cac"
import { clean, init } from "../dist/index.js"

const norm = cac("norm")

const rootDir = process.cwd()

norm.command("clean", "Clean the project").action(() => {
  clean(rootDir)
})

norm.command("init", "Init the project").action(() => {
  init(rootDir)
})

norm.help()
norm.parse()
