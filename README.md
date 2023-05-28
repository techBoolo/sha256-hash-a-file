# Hash a file with sha256

hash the given file with sha256, 

save the file hash result and its file name in a new file with an extension '.hash' of the original filename

## node modules used

- node:process

  - get the current javascript file being executed, to show Usage of the module
  - get user input file name argument 

- node:fs
  
  - check if the file exists in the file system
  - read the file content to hash
  - write the resulting hash and the file name in a new file

- node:path
  
  - get part of filename and construct the destination file name
  - verify if file is absolute path, if not resolve to absolute path

- node:crypto

  - create sha256 hash of the file content

## Usage

- run

  `node hashFile file_name`

- result

  the original file name with an extension '.hash' in the same directory as the
original file name
