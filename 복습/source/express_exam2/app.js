const express = require('express');
const bootStrap = require("./middlewares/bootstrap");
const upload = require("./middlewares/imageupload");
const dotenv = require('dotenv');
const app = express();

dotenv.config(); // .env 파일의 설정 -> process.env 하위 속성으로 추가  

app.set("PORT", process.env.PORT || 3000);


//app.use(bootStrap);
//app.use(upload("image"));

app.use((req, res, next) => {
	console.log("가장 상단 공통 라우터");
	next(); // 다음 미들웨어로 이동 
});

app.get("/A", bootStrap, upload("image2"), (req, res, next) => {
	//throw new Error("에러발생!");
	//next(new Error("에러발생"));
	res.send("A");
});

app.get("/B", (req, res) => {
	res.send("B");
});

app.use((req, res, next) => { // 없는 페이지를 감지하고 처리하는 라우터
	//res.send(req.url);
	const err = new Error("없는 페이지");
	next(err);
});
 
app.use((err, req, res, next) => { //오류 처리 미들웨어
	res.send(err.message);
});

app.listen(app.get("PORT"), () => {
	console.log(app.get("PORT"), "번 포트에서 서버 대기중...");
});