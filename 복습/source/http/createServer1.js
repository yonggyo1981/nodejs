const http = require('http');
const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
	res.write("<h1>write로 출력!</h1>");
	res.end("<h1>출력하고 종료!</h1>");
})
.listen(8080, () => {
	console.log("서버 대기중....");
});  // 80 - http, 443 - https

// 서버 대기중 
/*
server.on("listening", () => {
	console.log("서버 대기중....");
});
*/

server.on("error", (err) => {
	console.error(err);
});