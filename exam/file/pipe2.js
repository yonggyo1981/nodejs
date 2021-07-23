const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream("./readme_stream.txt");
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream("./readme_stream.txt.gz");
readStream.pipe(zlibStream).pipe(writeStream);
