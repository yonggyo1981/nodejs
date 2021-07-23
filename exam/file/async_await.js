const fs = require('fs').promises;

(async () => {
	try {
		let data = await fs.readFile('./writeme.txt');
		console.log("1번", data.toString());
		data = await fs.readFile('./writeme.txt');
		console.log("2번", data.toString());
		data = await fs.readFile('./writeme.txt');
		console.log("3번", data.toString());
		data = await fs.readFile('./writeme.txt');
		console.log("4번", data.toString());
		data = await fs.readFile('./writeme.txt');
		console.log("5번", data.toString());
	} catch (err) {
		console.error(err); // Promise 생성자 내부에서 reject가 호출
	}
})();