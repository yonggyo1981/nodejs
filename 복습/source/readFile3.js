const fs = require('fs').promises;
/*
fs.readFile('./readme.txt')
	.then((data) => { // resolve
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
	.catch((err) => { // reject 
		console.log(err);
	});
	
	// 콜백의 중첩으로 인한 가독성 X -> 순서를 위 -> 아래 -> 가독성 O
	// 가독성을 개선 했음에도 구조적으로 복잡 , 반환값을 여전히 then의 콜백 함수 내에서만 사용 가능 O -> async ~ await 
*/	
	
	// async ~ await -> 비동기로 실행되는 영역을 함수로  만들고 이 함수의 앞에 async 붙여 주고 
	// 비동기로 실행하는 함수에 await 붙여 준다.
	// await로 호출한 함수의 반환값 -> Promise 생성자의 콜백 함수의 resolve로 넘겨준 데이터(then으로 유입되는 부분), 
	// Promise 인스턴의 catch로 유입되는 부분은 try~ catch(...) {} 로 유입된다
	
async function run() {
	try {
		let data = await fs.readFile('./readme.txt');
		console.log("1번 : ",data.toString());
		data = await fs.readFile('./readme.txt');
		console.log("2번 : ",data.toString());
		data = await fs.readFile('./readme.txt');
		console.log("3번 : ",data.toString());
	} catch (err) {
		console.error(err);
	}
}

run();