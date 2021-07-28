const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();

dotenv.config(); // .env -> process.env의 하위 속성 추가 

app.set('PORT', process.env.PORT || 3000);

/** 없는 페이지 처리 라우터 */
app.use((req, res, next) => {
	
});

/** 오류 페이지 처리 라우터 */
app.use((err, req, res, next) => {
	
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), '번 포트에서 서버 대기중...');
});