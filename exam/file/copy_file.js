const fs = require('fs').promises;

fs.copyFile('./readme_stream_new.txt', './readme_stream.txt')
	.then(() => {
		console.log("파일 복사 완료! - 스트림방식");
	})
	.catch((err) => {
		console.error(err);
	});