const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')

// custome error for user argument 
class ArgumentError extends Error{
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

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

function isFileExists(name) {
  fs.access(name, (err) => {
    if(err) {
      throw new ArgumentError(`File '${name}' does not exist`)
    }
  })
}

function addCustomExtension(filename, ext) {
  const pathObj = path.parse(filename)
  pathObj.name = pathObj.base
  pathObj.ext = ext.startsWith('.') ? ext : `.${ext}`
  pathObj.base = pathObj.base + pathObj.ext
  return path.format(pathObj)
}

function hashFile(filename) {
  return new Promise((resolve, reject) => {
    let gen_hash
    const hash = crypto.createHash('sha256') 
    const fileReadStream  = fs.ReadStream(filename)
    fileReadStream.on('data', chunk => {
      hash.update(chunk)
    })
    fileReadStream.on('end', () => {
      gen_hash = hash.digest('hex')
      resolve(gen_hash)
    })
  })
}

function writeContentToFile(filename, content) {
  fs.writeFile(filename, content, (err) => {
    if(err) {
      console.log(err)
    }
  })
}

module.exports = {
  ArgumentError,
  fullPath,
  isFileExists,
  addCustomExtension,
  hashFile,
  writeContentToFile,
}

