const A = require("./A");
global.message = "최상위 객체 global에 값 지정 테스트";
//A();

/*
* 함수 안에서 this === global 
* 함수 밖에서 this === module.exports
*/

console.log("함수 밖", this === module.exports);

function globalScope() {
	// this 
	console.log("함수 안", this === global);
}
globalScope();