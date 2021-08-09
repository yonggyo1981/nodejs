const express = require('express');
const { joinValidator } = require('../middleware/validator');
const router = express.Router();

router.route("/join")
	.get((req, res) => {
		 // 회원 가입 양식 
		 
		 return res.render("member/join");
	})
	.post(joinValidator, (req, res) => {
	
		return res.send("");
	});

router.route("/login")
	.get((req, res) => {
		// 로그인 양식
		
		return res.render("member/login");
	})
	.post((req, res) => {
		// 로그인 처리 
	});

router.get("/logout", (req, res) => {
	// 로그아웃 처리 
});

module.exports = router;