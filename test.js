const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const paths = { source: null, dist: null }
const del = require('del')

const argv = yargs
  .usage('Usage: $0 [options]')
  .help('help')
  .alias('help', 'h')
  .version('0.0.1')
  .alias('version', 'v')
  .example('$0 --entry ./filesDir -D', '--> Sorting of files in folders')
  .option('entry', {
    alias: 'e',
    describe: 'The path of the source directory',
    demandOption: true
  })
  .option('output', {
    alias: 'o',
    describe: 'The path of the output directory',
    default: '/output'
  })
  .option('delete', {
    alias: 'D',
    describe: 'Delete source directory',
    default: false
  })
  .epilog('First homework on the node.js course')
  .argv

console.log(argv.entry, argv.output)

paths.source = path.normalize(path.join(__dirname, argv.entry))
paths.dist = path.normalize(path.join(__dirname, argv.output))

const sortFiles = (src) => {
  fs.readdir(src, (error, files) => {
    if (error) {
      process.exit(500)
    }

    if (!files.length) {
      process.exit(404)
    }

    for (let index = 0; index < files.length; index++) {
      const currentUrl = path.join(src, files[index])
      fs.stat(currentUrl, (error, state) => {
        if (state.isDirectory()) {
          sortFiles(currentUrl)
        } else {
          createDir(paths.dist)
          copyFile(currentUrl, files[index])
        }
      })
    }
  })
}

function createDir (url) {
  if (!fs.existsSync(path)) {
    fs.mkdir(url, () => {})
  }
}

function copyFile (currentUrl, fileName) {
  const targetDir = path.join(paths.dist, fileName[0].toUpperCase())
  createDir(targetDir)
  fs.copyFile(currentUrl, path.join(targetDir, fileName), (error) => {
    if (error) throw error

    console.log('copie =>', targetDir)
  })
}

sortFiles(paths.source)

process.on('exit', code => {
  switch (code) {
    case 500:
      console.error('directory read failed')
      break
    case 404:
      console.error('Directory is clear.')
      break
    default:
      console.log('done')
      del.sync(path.source)
      break
  }
})
