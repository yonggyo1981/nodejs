const fs = require('fs').promises; // 기존 제공 기능 -> Promise 방식으로 사용 가능

fs.readFile("./readme.txt")
	.then((data) =>{ // 파일 읽기 성공
		console.log(data); // 버퍼 
		console.log(data.toString()); // 문자열로 
	})
	.catch((err) => {
		console.error(err);
	});