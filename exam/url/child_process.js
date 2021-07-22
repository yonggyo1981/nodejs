// child_process - 외부 프로그램을 실행
// 2 -> stdout - data 이벤트(실행 성공시 출력 결과물), stderr - data(실행 실패시 에러 메세지)

//const childProcess = require('child_process');
const { exec } = require('child_process');

//const result = childProcess.exec("dir");
const result = exec('dir');

result.stdout.on("data", (data) => {
	console.log(data.toString());
});

result.stderr.on("data", (data) => {
	console.log(data.toString());
});
