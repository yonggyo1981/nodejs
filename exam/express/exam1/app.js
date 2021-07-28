const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();

/** 없는 페이지 라우터 - 오류로 처리가 좋다 */
app.use((req, res, next) => {
	
});

/** 오류 처리 페이지 라우터 */
app.use((err, req, res, next) => { 
	return res.status(500).send(err.message);
});

app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), '번 포트에서 서버 대기중...');
});