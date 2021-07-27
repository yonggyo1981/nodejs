const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const memberInfo = require("./middleware/member_info"); // 미들웨어 방식1
//const validator = require("./middleware/validator"); // 미들웨어 방식2 - 여러개 등록
//console.log(validator);
const { joinValidator, updateValidator, loginValidator } = require("./middleware/validator");

const dataCheck = require('./middleware/data_check'); // 미들웨어 방식3 

dotenv.config(); // .env -> process.env 하위 속성으로 추가

const app = express();
app.set('PORT', process.env.PORT || 3000);

app.use(morgan('dev'));

/** 정적 페이지 설정 */
app.use(express.static(path.join(__dirname, 'public')));

/** 미들웨어 방식1 등록 */
app.use(memberInfo);

/** 미들웨어 방식2 등록 */
//app.use(validator.joinValidator);
//app.use(validator.updateValidator);
//app.use(validator.loginValidator);
app.use(joinValidator);
app.use(updateValidator);
app.use(loginValidator);

/** 미들웨어 방식3 등록 */
app.use(dataCheck("데이터1"));

/** 기본 페이지 라우터 */
app.get("/", dataCheck("미들웨어1"), (req, res, next) => {
	// .sendFile()
	
	//return res.send("<h1>기본페이지</h1>");
	//return res.send(`<h1>${req.data1}</h1>`);
	//return res.send(`<h1>${res.data1}</h1>`);
	next();
}, dataCheck("미들웨어2"), dataCheck("미들웨어3"));

/*
app.get("url", upload.single('image'), (req, res, next) => {
	
});
*/

/** 없는 페이지 라우터 */
app.use((req, res, next) => {
	const err = new Error(`${req.url}은 없는 페이지 입니다.`);
	err.status = 404; // 힙 영역의 인스턴스의 status 속성이 추가
	next(err);
});

/** 오류 처리 라우터 */
app.use((err, req, res, next) => { // 인수가 4 - 첫번째 Error 생성자로 생성된 객체
	return res.status(err.status || 500).send(err.message);
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), "번 포트에서 서버 대기중...");
});