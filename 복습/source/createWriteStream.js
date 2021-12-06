const fs = require('fs');
const stream = fs.createWriteStream("./writeme.txt");
stream.on("finish", () => {
	console.log("파일 쓰기 완료!");
});
stream.write("글 작성1....");
stream.write("글 작성2...");
stream.end();

