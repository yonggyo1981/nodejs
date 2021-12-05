const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
	if (err) throw err;
	console.log("1번: ", data.toString());
	fs.readFile('./readme.txt', (err, data) => {
		if (err) throw err;
		console.log("2번: ", data.toString());
		fs.readFile('./readme.txt', (err, data) => {
			if (err) throw err;
			console.log("3번: ", data.toString());
			
			return data;
		});
	});
});

console.log(data);
// 1. 함수 중첩 구조 -> 단계가 많아지거나 로직 복잡해지면 -> 좌 -> 우 너무 길어지고, 
// 코드의 가독성 X, 유지보수 X
// 2. 반환값을 외부에서 사용 불가 X, 함수 내부에서 내부로만 전달 -> 전달 방식으로 사용 가능 