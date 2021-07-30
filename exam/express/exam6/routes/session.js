const express = require('express');
const router = express.Router();

router.get("/:mode", (req, res) => {
	const mode = req.params.mode;
	switch (mode) {
		case "set" : // 추가
			req.session.sessionValue1 = "값1";
			req.session.sessionValue2 = "값2";
			req.session.sessionValue3 = "값3";
			break;
		case "del" :  // 삭제 
			delete req.session.sessionValue2;
			break;
		case "edit" : // 수정 
			req.session.sessionValue1 = "(변경)값1";
			req.session.sessionValue2 = "(변경)값2";
			req.session.sessionValue3 = "(변경)값3";
			break;
		case "del_all":  // 세션 전부 삭제
			req.session.destroy();
			break;
		case "get":  // 세션조회
			console.log(req.session);
			break;
	}
	
	return res.send("");
});

module.exports = router;