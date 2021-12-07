const express = require('express');
const router = express.Router();
router.use((req, res, next) => {
	res.locals.commonText = "공통 문구"; // 템플릿 전역변수
	next();
});
/**
router.get("/join", (req, res) => { // /member/join 
	res.send("회원가입 페이지....");
});

router.post("/join", (req, res) => {
	// 회원 가입 처리 
});
**/
router.route("/join")
		.get((req, res) => {
			res.render("member/form");
		})
		.post((req, res) => {
			// 회원 가입 처리 
		});

router.get("/login", (req, res) => {
	//res.send("로그인 페이지....");
	const data = {
		nums : [1,2,3,4,5,6,7,8,9,10],
		memNm : "회원명",
		htmlData : "<h1>출력!</h1>",
		fruit : 'apple',
	};
	res.render("member/login", data); // views/member/login.html 
});

module.exports = router;