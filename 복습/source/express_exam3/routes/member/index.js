const express = require('express');
const router = express.Router();
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
			es.send("회원가입 페이지....");
		})
		.post((req, res) => {
			// 회원 가입 처리 
		});

router.get("/login", (req, res) => {
	res.send("로그인 페이지....");
});

module.exports = router;