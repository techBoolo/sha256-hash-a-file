const path = require('node:path')

const { 
  ArgumentError, 
  fullPath, 
  isFileExists, 
  addCustomExtension,
  hashFile, 
  writeContentToFile
} = require('./helpers.js')

let filename
let fileFullPath

// take the arguments
// const args = process.argv.slice(2)
const [, jsFile, ...args ] = process.argv

// 1. check for provided file argument
if(args.length === 0) {
  console.log(`Usage: node ${path.basename(jsFile, '.js')} file_name`)
  throw new ArgumentError('Argument for file must be provided')
}

// 2. take the user provided first argument as filename
filename = args[0]

// 3.  check if the provided filename is absolute path
// if not, resolve the absolute path 
// we do this to ceate a destination file for storing the hash value 
fileFullPath = fullPath(filename)

// 4. check for file existence
isFileExists(fileFullPath)

// 5. include a new extension for the destination file name
let hash_filename = addCustomExtension(fileFullPath, 'hash');

// 6. hash the file,
// 7. then write the result hash and the filename in the destination file
//
// we can use either ways,  primise / async-await
// i. promise 
//hashFile(fileFullPath)
//.then(gen_hash => {
//  const content = `${gen_hash}\t${path.parse(fileFullPath).base}\n`
//  writeContentToFile(hash_filename, content)
//});

// ii. async / await 
// when using iife, dont forget to add semi-colon in the preceeding statement 
(async () => {
  const gen_hash = await hashFile(fileFullPath)
  const content = `${gen_hash}\t${path.parse(fileFullPath).base}\n`
  writeContentToFile(hash_filename, content)
})()
