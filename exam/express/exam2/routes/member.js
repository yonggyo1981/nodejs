const express = require('express');
const router = express.Router();

/** 회원 가입 /member/join */
router.route("/join")
	.get((req, res) => {
		// 회원가입 양식
	})
	.post((req, res) => {
		// 회원가입 처리 
	});

/** 로그인 /member/login */
router.route("/login")
	.get((req, res) => {
		// 로그인 양식 
	})
	.post((req, res) => {
		// 로그인 처리 
	});


module.exports = router;