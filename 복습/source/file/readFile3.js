const fs = require('fs').promises;

fs.readFile("./readme.txt")
	.then((data) => {
		console.log("1번 : ", data.toString());
		
		return fs.readFile("./readme.txt");
	})
	.then((data) => {
		console.log("2번 : ", data.toString());
		return fs.readFile("./readme.txt");
	})
	.then((data) => {
		console.log("3번 : ", data.toString());
	})
	.catch((err) => {
		console.error(err);
	});
	
// 1. 구조의 개선이 이뤄 졌으나(좌 -> 우, 위 -> 아래) -> 여전히 복잡
// 2. 처리된 결과값 처리를 then 구간으로만 한정이 된다 -> 활용시 제약 조건이 발생 

// -> async ~ await 
//  비동기 순차 실행을 할 비동기 함수는 앞에 await 붙여준다 -> 실행되는 환경은 반드시 함수 내부 
// 실행되는 환경에 대한 함수는 반드시 async를 붙여 줘야 된다(같은 비동기 형태로만 순서가 유지가 된다.) 
// 명시적으로 catch가 없다 -> try ~ catch 처리 

async function run() {
	try {
		let data = await fs.readFile("./readme.txt"); // 반환값인 data -> Promise 인스턴스에서 then으로 유입되는 데이터 
		console.log("1번 : ", data.toString());
		data = await fs.readFile('./readme.txt');
		console.log("2번 : ", data.toString());
		data = await fs.readFile('./readme.txt');
		console.log("3번 : ", data.toString());
		
	} catch (err) { // Promise 인스턴스의 catch로 유입되는 구간 
		console.error(err);
	}
}

run();