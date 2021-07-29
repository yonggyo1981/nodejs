const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();

dotenv.config(); // .env -> process.env 하위 속성으로 추가

app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, 'views'), {
	express : app,
	watch : true,
});

app.set('PORT', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended : false }));


/** 없는 페이지 처리 라우터 */
app.use((req, res, next) => {
	const err = new Error(`${req.url}은 없는 페이지 입니다.`);
	err.status = 404; // NOT FOUND
	next(err);
});

/** 오류 처리 라우터 */
app.use((err, req, res, next) => {
	
	const data = {
		message : err.message,
		status : err.status || 500,
		stack : err.stack,
	};
	
	if (process.env === 'production') {
		delete data.stack;
	}
	
	return res.status(data.status).render("error", data);
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), "번 포트에서 서버 대기중...");
});