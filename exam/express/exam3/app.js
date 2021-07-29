const express = require('express');
const app = express();

app.use((req, res, next) => {
	console.log("공통 라우터");
	next();
});

app.get("/", (req, res, next) => {
	console.log("1번째");
	next();
});

app.get("/", (req, res, next) => {
	console.log("2번째");
	next();
});

app.get("/", (req, res, next) => {
	console.log("3번째");
	next();
}, (req, res, next) => {
	console.log("4번째");
	next();
}, (req, res, next) => {
	console.log("5번째");
	next();
}, (req, res) => {
	console.log("6번째");
	return res.send("6번째 미들웨어서 출력..");
});

app.get("/test", (req, res) => {
	return res.send("/test 페이지...");
});

/** 없는 페이지 */
app.use((req, res, next) => {
	return res.send("없는 페이지 처리 라우터");
});

/** 오류 처리 라우터 */
app.use((err, req, res, next) => {
	
});

app.listen(3000, () => {
	console.log("3000번 포트에서 서버 대기중...");
});