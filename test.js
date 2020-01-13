const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const paths = { source: null, dist: null }

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
  .epilog('Second homework on the node.js course')
  .argv

console.log(argv.entry, argv.output)

paths.source = path.normalize(path.join(__dirname, argv.entry))
paths.dist = path.normalize(path.join(__dirname, argv.output))

const completeds = []

const sortFiles = async (src) => {
  const rd = readdir(src)
  const files = await rd

  for (let index = 0; index < files.length; index++) {
    const currentUrl = path.join(src, files[index])
    const stat = await getStat(currentUrl)

    if (stat.isDirectory()) {
      await sortFiles(currentUrl)
    } else {
      console.log(currentUrl)
      completeds.push(copyFile(currentUrl, path.join(paths.dist, files[index])))
    }
  }
}

function getStat (url) {
  return new Promise((resolve, reject) => {
    fs.stat(url, (err, state) => {
      if (err) {
        throw err
      }

      resolve(state)
    })
  })
}

function copyFile (currentUrl, dist) {
  return new Promise((resolve, reject) => {
    fs.copyFile(currentUrl, dist, (error) => {
      if (error) {
        throw error
      }

      resolve(true)
    })
  })
}

function readdir (src) {
  return new Promise((resolve, reject) => {
    fs.readdir(src, (error, files) => {
      if (error) {
        process.exit(500)
      }

      if (!files.length) {
        process.exit(404)
      }

      resolve(files)
    })
  })
}

(async function () {
  await sortFiles(paths.source)

  Promise.all(completeds).then(() => {
    console.log('delete')
  })
})()

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
