const express = require('express');
const { joinValidator } = require('../middleware/validator');
const { alert } = require("../lib/common");
const member = require("../models/member"); // member 모델 
const router = express.Router();

router.route("/join")
	.get((req, res) => {
		 // 회원 가입 양식 
		 
		 return res.render("member/join");
	})
	.post(joinValidator, async (req, res) => {
		const result = await member.join(req.body);
		if (result) { // 회원 가입 성공 
			return res.redirect("/member/login");
		}
		
		// 회원 가입 실패 
		return alert("회원가입에 실패하였습니다.", res);
		
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