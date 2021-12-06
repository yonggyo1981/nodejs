const fs = require('fs');
const readStream = fs.createReadStream("./source.zip");
const writeStream = fs.createWriteStream("./source_copied.zip");
readStream.pipe(writeStream);

/**
const fs = require('fs').promises;

fs.readFile("./source.zip")
	.then((data) => {
		return fs.writeFile("./source_copied.zip", data);
	})
	.catch((err) => {
		console.error(err);
	});
*/