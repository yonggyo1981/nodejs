const fs = require('fs').promises;
const constants = require('fs').constants; // F_OK, W_OK, R_OK
/*
fs.access('./logs', constants.F_OK)
	.then(() => {
		console.log("logs 폴더 존재");
	})
	.catch((err) => {
		// err.code --- 'ENOENT' -> 폴더나 파일이 없다
		//console.log(err.code);
		//console.log("logs 폴더 없음");
		if (err.code == 'ENOENT') {
			return fs.mkdir("./logs");
		}
	})
	.then(() => {
		console.log("logs 폴더 생성");
	})
	.catch((err) => {
		console.error(err);	
	});
*/

(async () => {
	try {
		await fs.access("./logs", constants.F_OK); // 폴더가 존재하면, 존재 X -> catch 
		console.log("폴더 있음");
	} catch (err) {
		// 폴더, 파일의 접속 권한 X 
		if (err.code == 'ENOENT') {
			console.log("폴더 없음");
			await fs.mkdir("./logs");
		}
	}
})();