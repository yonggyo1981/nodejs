const fs = require('fs');
// 비동기 순처 처리 
fs.readFile('./writeme.txt', (err, data) => {
		console.log("1번", data.toString());
		fs.readFile("./writeme.txt", (err, data) => {
			console.log("2번", data.toString());	
			fs.readFile("./writeme.txt", (err, data) => {
				console.log("3번", data.toString());	
				fs.readFile("./writeme.txt", (err, data) => {
					console.log("4번", data.toString());
					fs.readFile("./writeme.txt", (err, data) => {
						console.log("5번", data.toString());	
					});
				});
			});
		});
});



/* 비동기 - 끝나는 결과 순서가 유지 X 
fs.readFile('./writeme.txt', (err, data) => {
	console.log("1번", data.toString());
});

fs.readFile('./writeme.txt', (err, data) => {
	console.log("2번", data.toString());
});

fs.readFile('./writeme.txt', (err, data) => {
	console.log("3번", data.toString());
});

fs.readFile('./writeme.txt', (err, data) => {
	console.log("4번", data.toString());
});

fs.readFile('./writeme.txt', (err, data) => {
	console.log("5번", data.toString());
});
*/