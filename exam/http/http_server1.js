const http = require('http');

http.createServer((req, res) => {
	/**
		req - Request 객체  - 요청한 쪽 관련된 정보, 메서드
		res - Response 객체  - 서버에서 응답 관련된 정보, 메서드
				- writeHead(응답 코드, 헤더 정보 객체) - 응답 헤더 작성 
				- .write("출력 내용") - 웹페이지를 출력 하는 내용
				- .end("출력 내용") -> 출력하고 웹페이지 출력 마침
	*/
	console.log("요청 URL", req.url);
	console.log("요청 method", req.method);
	
	res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
	res.write("<h1>write 메서드로 출력!</h1>");
	res.end("<h1>end 메서드로 출력하고 종료!</h1>");
	
})
.listen(8000, () => {
	console.log("8000번 포트에서 서버가 대기중 입니다.");
});