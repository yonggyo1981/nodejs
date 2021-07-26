const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
	try {
		const data = await fs.readFile('./index.html');
		res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
		//res.end(data);
		//return;
		return res.end(data);
	} catch(err) {
		res.writeHead(500, { 'Content-Type' : 'text/html; charset=utf-8' });
		//res.end("<h1>" + err.message + "</h1>");
		//return;
		
		return res.end("<h1>" + err.message + "</h1>");
	}
	
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
	res.end("헤더 출력 테스트");
})
.listen(8000, () => {
	console.log("8000번 포트에서 서버 대기중...");
});


/* Promise 
http.createServer((req, res) => {
	/**
		res.writeHead -> 출력 헤더
		res.write -> 출력 내용을 출력 
		res.end -> 출력하고 종료
		
		html 파일로 페이지를 출력 할려면 
			1) 파일로 내용물을 읽은 다음 
			2) 웹페이지로 출력(write, end)
	*/
	/*
	fs.readFile('./index.html')
		.then((data) => {
			res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
			res.end(data);
		})
		.catch((err) => { // err.message 에러 메세지
			res.writeHead(500, { 'Content-Type' : 'text/html; charset=utf-8' });
			res.end("<h1>" + err.message + "</h1>");
		});
	
})
.listen(8000, () => {
	console.log("8000번 포트에서 서버 접속 중...");
});
*/