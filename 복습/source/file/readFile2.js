const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
	if (err) {
		throw err;
	}
	
	console.log("1번 : ", data.toString());
	fs.readFile('./readme.txt', (err, data) => {
		if (err) {
			throw err;
		}
	
		console.log("2번 : ", data.toString());
		
		fs.readFile('./readme.txt', (err, data) => {
			if (err) {
				throw err;
			}
		
			console.log("3번 : ", data.toString());
		});
	});
});

// 1. 순서가 많아질 수록 -> 콜백의 길이가 길어진다(좌->우) -> 가독성 X -> ES6 - Promise 
// 2. 처리된 반환값은 콜백 함수 안에서만 사용 가능 
