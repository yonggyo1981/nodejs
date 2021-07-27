const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const app = express();

dotenv.config(); // 설정된 환경 변수 -> process.env 하위 속성으로 추가

app.set('PORT', process.env.PORT || 3000); 

app.use(morgan('dev'));// 콘솔에 접속 관련 정보 로그 

/** 정적 페이지 설정 */
//app.use("/images", express.static(path.join(__dirname, "images")));
//app.use("/", express.static(path.join(__dirname, "public")));  "/" - 생략 가능
app.use(express.static(path.join(__dirname, "public")));


/** 메인페이지 */
app.get("/", (req, res) => {
	return res.send("<h1>기본페이지</h1>");
});


/** 없는 페이지 라우터 - 오류로 처리 하고자 할때 throw, next */
app.use((req, res, next) => {
	const err = new Error(`${req.url}은 없는 페이지 입니다`);
	err.status = 404;
	next(err); // throw err;
});

/** 
	오류 처리 라우터 
	1. throw 에러객체
	2. next(에러객체)
*/
app.use((err, req, res, next) => { // 인수 4개는 반드시 유지 - 첫번째가 에러 객체
	
	return res.status(err.status || 500).send(err.message);
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), "번 포트에서 서버 대기중..");
});