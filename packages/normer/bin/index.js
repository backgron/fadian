#!/usr/bin/env node
import cac from "cac"
import { clean, init } from "../dist/index.js"

const normer = cac("norm")

const rootDir = process.cwd()

normer.command("clean", "Clean the project").action(() => {
  clean(rootDir)
})

normer.command("init", "Init the project").action(() => {
  init(rootDir)
})

normer.help()
normer.parse()
