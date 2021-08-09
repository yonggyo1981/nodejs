const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const logger = require('./lib/logger');

const app = express();

dotenv.config(); // .env -> process.env 하위 속성으로 추가 

app.set('PORT', process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"), {
	express : app,
	watch : true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
	resave : false,
	saveUninitialized : true,
	secret: process.env.COOKIE_SECRET,
	cookie : {
		httpOnly: true, // 세션 쿠키 변경, 설정 -> 서버 상에서만 가능 
	},
	name : "yhsessid",
}));


/** 없는 페이지 라우터  - 404 - NOT FOUND */
app.use((req, res, next) => {
	const err = new Error(`${req.url}은 없는 페이지 입니다.`);
	err.status = 404;
	next(err);
});

/** 오류 처리 라우터 */
app.use((err, req, res, next) => {
	return res.status(err.status || 500).render("error");
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), '번 포트에서 서버 대기중..');
});