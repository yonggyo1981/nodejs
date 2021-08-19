const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const logger = require('./lib/logger');

/** 라우터 */
const indexRouter = require('./routes');
const boardRouter = require('./routes/board');

const app = express();

app.set('PORT', process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, 'views'), {
	express : app,
	watch : true,
});


dotenv.config(); // .env -> process.env 하위 속성으로 추가 

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
		resave : false,
		saveUninitialized : true,
		secret : process.env.COOKIE_SECRET,
		name : "yhsessionid",
}));


/** 라우터 등록 */
app.use(indexRouter);
app.use("/board", boardRouter);


app.use((req, res, next) => { // 없는페이지 처리 라우터
	// next(에러객체), throw 에러객체 // 404 Status Code - NOT FOUND
	const error = new Error(`${req.url}는 없는 페이지 입니다.`);
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => { // 오류처리 미들웨어(라우터)
	// next(에러객체), throw 에러객체 
	const data = {
			message : err.message,
			status : err.status || 500,
			stack : err.stack,
	};
	
	/** 로거 */
	logger(`[${data.status}]${data.message}`, 'error');
	logger(data.stack, 'error');
	
	if (process.env.NODE_ENV === 'production') {
		delete data.stack;
	}
	
	return res.status(data.status).render('error', data);
	
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), "번 포트에서 서버 대기중...");
});