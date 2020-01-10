const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const paths = { source: null, dist: null }
const folder = require('./Folder_2')

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

if (!fs.existsSync('./Folder_2')) {
  fs.mkdirSync('./Folder_2')
}

fs.copyFile(folder, err => {
  console.error(err)
})

function startCopyFile (_dir) {
  fs.readdir(_dir, function (items) {
    for (let i = 0; i < items.length; i++) {
      if (fs.lstatSync(_dir + '/' + items[i]).isDirectory()) {
        startCopyFile(_dir + '/' + items[i])
      } else {
        fs.copyFile(_dir + '/' + items[i], `./sss/ddd/${items[i]}`)
      }
    }
  })
}

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
          console.info(currentUrl)
          console.log(startCopyFile)
          console.log(error)
        }
      })
    }
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
      break
  }
})
