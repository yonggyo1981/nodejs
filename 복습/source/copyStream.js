const fs = require('fs');
const readStream = fs.createReadStream("./source.zip", { highWaterMark : 512 });
const writeStream = fs.createWriteStream("./source_copied.zip");

readStream.on("data", (chunk) => {
	//writeStream.write(chunk.toString());
});

readStream.on("end", () => {
	console.log("처리 완료!");
});

readStream.on("error", (err) => {
	console.error(err);
});

writeStream.end();