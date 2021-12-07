const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes');
const app = express();

dotenv.config(); // .env -> process.env 하위 속성으로 추가 
app.use(morgan('dev'));

app.set('PORT', process.env.PORT || 3000);

/** public 폴더는 라우팅에 영향 받지 않는 정적 자원 */
app.use(express.static(path.join(__dirname, "public")));

/** body-parser */
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use(router); // URL 처리 라우터 

app.use((req, res, next) => { // 없는 페이지 처리 라우터
	const err = new Error(`${req.method} ${req.url}는 없는 페이지 입니다.`);
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => { // 오류 처리 라우터 - throw 에러객체, next(에러객체)
	res.status(err.status || 500).send(err.message);
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), "번 서버 대기중...");
});