const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('./routes');
const { sequelize } = require("./models");
const app = express();

dotenv.config(); // .env -> process.env 하위 속성으로 추가 
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
		resave :  false, // 같은 값을 다시 저장할지 여부,
		saveUninitialized :   true, // true -> 세션값을 지정하지 않아도 session id를 생성할지 여부
		cookie : {
			httpOnly : true,
			secure : false,
		},
		name : "sessid",
}));

sequelize.sync({ force : false })
		.then(() => {
			console.log("데이터베이스 연결 성공!");
		})
		.catch((err) => {
			console.error(err);
		});

app.set('PORT', process.env.PORT || 3000);

/** nunjucks 설정 */
app.set("view engine", "html"); // 템플릿 파일 확장자 html 
nunjucks.configure(path.join(__dirname, "views"), {
		express : app,
		watch : true,
});

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
	//res.status(err.status || 500).send(err.message);
	res.locals.errMessage = err.message;
	res.locals.statusCode = err.status || 500;
	if (process.env.NODE_ENV != 'production') {
		res.locals.stack = err.stack;
	}
	
	res.render("error"); // views/error.html 
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), "번 서버 대기중...");
});