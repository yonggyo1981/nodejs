const fs = require('fs').promises;

// readFile X, writeFile X  -> createReadStream - createWriteStream
fs.copyFile("./source.zip", "./source_copied.zip")
	.then(() => {
		console.log("파일 복사 완료!");
	})
	.catch((err) => {
		console.error(err);
	});