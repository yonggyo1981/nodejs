const express = require('express');
const app = express();

app.get("/about", (req, res, next) => {
	console.log("미들웨어1");
	next();
}, (req, res, next) => {
	console.log("미들웨어2");
	next();
}, (req, res, next) => {
	console.log("미들웨어3");
	next();
});

app.get("/about", (req, res, next) => {
	console.log("미들웨어4");
	res.send("출력");

});

app.get("/home", (req, res, next) => {
	res.send("Home");
});

app.use((req, res, next) => { // use -> 모든 요청, 라우팅 URL X -> 모든 요청 URL 
	console.log("(모든 요청, 모든 URL)미들웨어");
	res.send(req.url);
});

/**
app.get("/about", (req, res, next) => {
	//res.send("<h1>about</h1>"); // 응답이 끝나면 미들웨어간 이동 X
	next();
}, (req, res, next) => {
	res.send("<h1>about2</h1>");
});
*/

app.listen(3000, () => {
	console.log("서버 대기중...");
});