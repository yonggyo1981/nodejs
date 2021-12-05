const fs = require('fs');

fs.readFile('./readme.txt', function(err, data) {
	if (err) {
		throw err;
	}
	
	//console.log(data);
	console.log("1번째", data.toString());
	
	// data를 이벤트 핸들러 - 콜백 함수 내에서만 활용 가능, 외부에서는 사용 불가
	// 비동기 실행 -> 이벤트 핸들러의 호출 시점은 알수 없습니다. 완료되거나 백그라운드에서 이벤트 발생..
});

fs.readFile('./readme.txt', function(err, data) {
	if (err) {
		throw err;
	}
	
	console.log("2번째", data.toString());
});

fs.readFile('./readme.txt', function(err, data) {
	if (err) {
		throw err;
	}
	
	console.log("3번째", data.toString());
});