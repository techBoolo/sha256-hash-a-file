const path = require('node:path')
const fs = require('node:fs')
const crypto = require('crypto')

const log = console.log

// custome error for user argument 
class ArgumentError extends Error{
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

let filename
let fileFullPath

// take the arguments
const args = process.argv.slice(2)

// 1. check for provided file argument
if(args.length === 0) {
  throw new ArgumentError('Argument for file must be provided')
}

// 2. take the user provided first argument as filename
filename = args[0]

// 3.  check if the provided filename is absolute path
// if not resolve the absolute path with path.resolve()
// we do this to ceate a destination file for storing the hash value and the
// file name
fileFullPath = fullPath(filename)
function fullPath(filename) {
  if(path.isAbsolute(filename)) {
    return filename
  } else {
    // cjs
    return path.resolve(__dirname, filename)
    // since in es6 we don't have __dirname
    // we can use either of the following
    // return path.resolve(path.join()), filename)
    // or return path.resolve(path.dirname(''), filename)
  }
}

// 4. check for file existence
function isFileExists(name) {
  fs.access(name, (err) => {
    if(err) {
      throw new ArgumentError(`File '${name}' does not exist`)
    }
  })
}
isFileExists(fileFullPath)

// 5. include a new extension for the destination file name
let hash_filename = addCustomExtension(fileFullPath, 'hash')
function addCustomExtension(filename, ext) {
  const pathObj = path.parse(filename)
  pathObj.name = pathObj.base
  pathObj.ext = ext.startsWith('.') ? ext : `.${ext}`
  pathObj.base = pathObj.base + pathObj.ext
  return path.format(pathObj)
}

// 6. hash the file
const hash = crypto.createHash('sha256')
const fileReadStream = fs.ReadStream(fileFullPath)
fileReadStream.on('data', chunk => {
  hash.update(chunk)
})

// 7. write the hash of the file and file name in the new file 
fileReadStream.on('end', () => {
  const gen_hash = hash.digest('hex')
  const content = `${gen_hash}\t${path.parse(fileFullPath).base}\n`
  fs.writeFile(hash_filename, content, (err) => {
    if(err){
      log(err);
    }
  })
})
