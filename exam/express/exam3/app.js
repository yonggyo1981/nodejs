const express = require('express');
const middle1 = require('./middleware/middle1');
//const middle2 = require('./middleware/middle2');
//const { joinValidator, loginValidator } = require('./middleware/middle2');
const middle3 = require('./middleware/middle3');

const app = express();

//app.use(middle1);
//app.use(joinValidator);
//app.use(loginValidator);
app.use(middle3('인수1'));
app.use(middle3('인수2'));
app.use(middle3('인수3'));


app.use((req, res, next) => {
	console.log("공통 라우터");
	next();
});

app.get("/", (req, res, next) => {
	console.log("1번째");
	//const error = new Error('1번째 미들웨어서 발생시킨 에러!');
	//throw error;
	//next(error);
	next();
	//return res.send("추력");
}, middle1);

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
	const error = new Error('없는 페이지..');
	next(error); // 오류처리 라우터에 있는 미들웨어로 전달
});

/** 오류 처리 라우터 */
app.use((err, req, res, next) => {
	/**
		1) throw 에러객체 
		2) next(에러객체)
		-> 오류 처리 라우터
	*/
	return res.send(err.message);
});

app.listen(3000, () => {
	console.log("3000번 포트에서 서버 대기중...");
});