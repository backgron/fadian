#!/usr/bin/env node
import cac from "cac"
import { command } from "../dist/index.js"

const fadian = cac("fadian")



fadian.command("clean", "Clean the project").action((args, options) => {
  command(args, options, 'clean')
})

fadian.command("init", "Init the project").action((args, options) => {
  command(args, options, 'init')
})

fadian.command("gitMsg", "处理gitMsg").action((args, options) => {
  command(args, options, 'gitMsg')
})

fadian.help()
fadian.parse()
