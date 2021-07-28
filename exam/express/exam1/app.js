const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const path = require('path');
const logger = require('./lib/logger'); 

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
	/**
		err
			.message - 에러메세지
			.stack - 에러가 발생한 상세한 정보
				    - 에러가 발생한 파일 스택, 파일 위치, 소스 위치
					- 개발 중일때만 노출, 서비스 중 노출 X 
	*/
	const data = {
		message : err.message,
		status : err.status
	};
	
	if (process.env.NODE_ENV != 'production') {
		data.stack = err.stack;
	}
	
	res.status(err.status || 500);
	res.render('error', data);
	
	// 로거 기록 
	logger("[" + err.status + "]"+ err.message, 'error');
	logger(err.stack, 'error');
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), '번 포트에서 서버 대기중...');
});