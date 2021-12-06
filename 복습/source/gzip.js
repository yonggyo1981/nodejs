const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream("./pipe.js");
const writeStream = fs.createWriteStream("./pipe.js.gz");
const zlibStream = zlib.createGzip();

readStream.pipe(zlibStream).pipe(writeStream);