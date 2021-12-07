const express = require('express');
const app = express();

app.get("/A", (req, res) => {
	res.send("A");
});

app.get("/B", (req, res) => {
	res.send("B");
});

app.use((req, res) => { // 없는 페이지를 감지하고 처리하는 라우터
	res.send(req.url);
});

app.listen(3000, () => {
	console.log("서버 대기중");
});