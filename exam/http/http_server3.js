const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
	/**
		url - / - index.html 
		url - /news - news.html 
		url - /shop - shop.html
	*/
	//res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	//return res.end("사용자가 요청한 URL:" + req.url);
	try{
		if (req.url == '/') { // index.html 출력 
			const data = await fs.readFile('./index.html');
			res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
			return res.end(data);
			
		} else if (req.url == '/news') { // news.html 출력
			const data = await fs.readFile('./news.html');
			res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
			return res.end(data);
			
		} else if (req.url == '/shop') { // shop.html 출력
			const data = await fs.readFile('./shop.html');
			res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
			return res.end(data);
			
		} else { // /, /news, /shop 아닌 없는 페이지
			res.writeHead(404, { 'Content-Type' : 'text/html; charset=utf-8' });
			return res.end("<h1>없는 페이지에 접속하셨습니다.</h1>");
		}
	} catch (err) {
		res.writeHead(500, { 'Content-Type' : 'text/html; charset=utf-8' });
		return res.end("<h1>" + err.message + "</h1>");
	}	
})
.listen(8000, () => {
	console.log("8000번 포트에서 서버 대기중...");
});