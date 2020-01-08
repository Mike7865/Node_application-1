const fs = require('fs')
const folder = 'Folder_1'

if (!fs.existsSync('./Folder_2')) {
  fs.mkdirSync('./Folder_2');
}

fs.copyFile(folder, err => {
  console.error(err)
});