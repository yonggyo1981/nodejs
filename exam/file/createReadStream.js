const fs = require('fs');
// 기본 버퍼 64kb - 변경 { highWaterMark : 변경할 바이트 수 }
const readStream = fs.createReadStream("./readme_stream.txt", { highWaterMark : 16 });

const data = [];
readStream.on('data', (chunk) => {
	/*
	console.log(chunk);
	console.log(chunk.toString());
	console.log(chunk.length + "bytes");
	*/
	data.push(chunk);
});

readStream.on("end", () => {
	const wholeData = Buffer.concat(data);
	console.log(wholeData);
	console.log(wholeData.toString());
	//console.log("읽기 완료!");
});

readStream.on("error", (err) => {
	console.error(err);
});
