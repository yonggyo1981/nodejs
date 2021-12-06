const fs = require('fs');
// 64 kb - 8byte
const stream = fs.createReadStream("./readme2.txt", { highWaterMark : 8 });

const data = [];
stream.on('data', (chunk) => {
	data.push(chunk);
	//console.log(chunk);
	//console.log(chunk.toString());
});

stream.on("end", () => {
	console.log(Buffer.concat(data).toString());
	//console.log("파일 읽기 완료...");
});

stream.on("error", (err) => {
	console.error(err);
});