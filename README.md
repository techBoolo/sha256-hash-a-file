# Hash a file with sha256

hash the given file with sha256, 

save the file hash result and its file name in a new file with an extension '.hash' of the original filename

## node modules used

- node:fs
  
  - to check if the file exists in the file system
  - read the file content to hash
  - write the resulting hash and the file name in a new file

- node:path
  
  - get part of filename and construct the destination file name
  - verify and resolve if file is absolut path

- node:crypto

  - create sha256 hash of the file content

## Usage

`node hashFile file_name`

- result
  the original file_name with an extension '.hash' in the same directory as the
original file name
