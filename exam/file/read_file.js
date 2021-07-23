const fs = require('fs'); // File System 
//              파일명    에러객체 읽은 데이터

try {
	fs.readFile("./readme.txt", (err, data) => {
		if (err) {
			throw err;
		}
		console.log(data); // 버퍼 데이터 형태 반환 -> 사람이 읽을 수 없는 형태 
		console.log(data.toString()); // 사람이 읽을수 있는 버퍼 -> 문자열로 변환
	});
} catch (err) {
	// 파일 읽기 에러 발생시 
}