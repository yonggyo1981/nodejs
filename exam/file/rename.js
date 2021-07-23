const fs = require('fs').promises;

fs.rename("./readme_stream.txt", "./readme_stream_new.txt")
	.then(() => {
		console.log("파일명 변경 성공");
	})
	.catch((err) => {
		console.error(err);
	});