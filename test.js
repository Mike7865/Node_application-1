#!/usr/bin/env node

const yargs = require("yargs");

const argv = yargs
  .usage("Usage: $0 [option]")
  .help("help")
  .alias("help", "h")
  .version("0.0.1")
  .alias("version", "v")
  .example("$0 --firstargument 1 --secondargument 2")
  .option("firstargument", {
    alias: "f",
    describe: "first argument",
    demandOption: true
  })
  .option("secondargument", {
    alias: "s",
    describe: "second argument",
    demandOption: true
  })
  .epilog("my first console aplication")
  .argv

console.log(argv.firstargument + argv.secondargument)