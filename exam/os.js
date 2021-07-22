// os 모듈 - 내장 모듈
const os = require('os'); 

console.log("홈 디렉토리", os.homedir()); // 홈 디렉토리
console.log("임시파일 저장경로", os.tmpdir());

console.log("cpu 정보", os.cpus());
console.log("cpu 갯수", os.cpus().length);

console.log("사용 가능 메모리", os.freemem());
console.log("전체 메모리", os.totalmem());
