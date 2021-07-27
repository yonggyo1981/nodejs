const express = require('express');
const router = express.Router();

// /member/join
router.get("/join", (req, res) => {
	return res.send("회원 가입 페이지...");
});

// /member/myinfo
router.get("/myinfo", (req, res) => {
	return res.send("회원정보 수정 페이지...");
});

// /member/login
router.get("/login", (req, res) => {
	return res.send("로그인 페이지...");
});

module.exports = router;