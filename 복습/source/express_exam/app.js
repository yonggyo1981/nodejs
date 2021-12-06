const express = require('express'); 
const app = express();

/**
app.get("/", (req, res) => {
	
	/**
	res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8"});
	res.end("<h1>출력!</h1>");
	*/
	/*
	res.send("<h1>출력</h1>");
});
*/

app.use((req, res, next) => {
	console.log("use 라우터");
	next();
});
app.get("/", (req, res, next) => {
	console.log("첫번째 미들웨어");
	next();
}, (req, res, next) => {
	console.log("두번째 미들웨어");
	next();
},(req, res, next) => {
	console.log("세번째 미들웨어");
	//res.send("<h1>출력</h1>");
	next();
});

app.get("/", (req, res, next) => {
	console.log("네번째 미들웨어");
	next();
}, (req, res, next) => {
	console.log("다섯번째 미들웨어");
	res.send("<h1>출력!</h1>");
});

app.get("/about", (req, res) => {
	res.send("<h1>about 페이지</h1>");
});

app.listen(3000, () => {
	console.log("서버 대기중...");
});