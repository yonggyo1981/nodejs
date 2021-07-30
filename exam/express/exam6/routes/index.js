const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	/*
	const data = {
		// 자동으로 폴더는 /css/파일명 + 확장자인(.css)는 자동으로 추가
		addCss : ["main1", "main2", "main/main3"], 
		addScript : ["script1", "script2", "main/script3"], // 폴더는 /js/ ... 확장자 .js 
	};
	*/
	return res.render("main/index");
});

router.post("/upload", (req, res) => {
	
	return res.send("");
});

module.exports = router;