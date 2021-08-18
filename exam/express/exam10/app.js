const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const { sequelize } = require("./models");
const bootStrap = require('./boot');


/** 라우터 */
const indexRouter = require('./routes'); 
const memberRouter = require('./routes/member');
const boardRouter = require('./routes/board');

const app = express();

dotenv.config();

sequelize.sync({ force : false })
			.then(() => {
				console.log("데이터베이스 연결 성공");
			})
			.catch((err) => {
				console.error(err);
			});

app.set('PORT', process.env.PORT || 3000);

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, "views"), {
	express : app,
	watch : true,
});

app.use(morgan('dev'));

/** body-parser */
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

/** 쿠키 */
app.use(cookieParser(process.env.COOKIE_SECRET));

/** 세션 */
app.use(session({
	resave : false,
	saveUninitialized : true,
	secret : process.env.COOKIE_SECRET,
	name : "yhsessionid",
}));

app.use(bootStrap); // 사이트 초기화

/** 라우터 등록 */
app.use(indexRouter);
app.use("/member", memberRouter);
app.use("/board", boardRouter);

/** 없는 페이지 처리 라우터 */
app.use((req, res, next) => {
	
	// 오류처리 라우터로 전달 하는 방법
	// 1. throw 에러 객체 2. next(에러객체);
	// 상태 코드 404 - NOT FOUND
	
	const error = new Error(`${req.url}은 없는 페이지 입니다.`);
	error.status = 404;
	next(error);
	
});

/** 오류처리 라우터 */
app.use((err, req, res, next) => {
	const data = {
		message : err.message,
		status : err.status || 500,
		stack : err.stack,
	};
	return res.status(data.status).render("error", data);
});


app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), '번 포트에서 서버 대기중...');	
});