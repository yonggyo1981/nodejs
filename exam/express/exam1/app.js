const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const path = require('path');

/** 라우터 */
const boardRouter = require('./routes/board'); // 게시판 라우터

dotenv.config(); // .env -> process.env 하위 속성

const app = express();

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
	express : app,
	watch : true,
});

app.set('PORT', process.env.PORT || 3000);
app.use(morgan('dev'));

/** body-parser */
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

/** 정적 경로 */
app.use(express.static(path.join(__dirname, 'public')));

/** 라우터 연결 */
app.use("/board", boardRouter);


/** 없는 페이지 라우터 - 오류로써 함께 처리 */
app.use((req, res, next) => {
	const err = new Error(`${req.url}은 없는 페이지 입니다.`);
	// 404
	err.status = 400;
	next(err); // throw err;
});

/** 오류 처리 페이지 라우터 */
app.use((err, req, res, next) => { 
	return res.status(err.status || 500).send(err.message);
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), '번 포트에서 서버 대기중...');
});