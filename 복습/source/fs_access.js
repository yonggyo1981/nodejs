const fs = require('fs').promises;
const constants = require('fs').constants; // F_OK -> 파일 접근 가능한지(파일이 존재하는지), R_OK -> 읽기 권한, W_OK -> 쓰기권한 

fs.access("./pipe.js", constants.F_OK | constants.W_OK)
	.then(() => {
		console.log("쓰기 가능");
	})
	.catch((err) => {
		console.log("쓰기 불가");
	});

/*
fs.access("./pipe.js", constants.F_OK)
	.then(() => {
		console.log("파일 존재");
	})
	.catch((err) => {
		if (err.code == 'ENOENT') {
			console.log("파일 없음");
		}
	});
*/