const express = require('express');
const router = express.Router();
/**
 /member/join - 회원가입 (양식, 처리)
 /member/login - 로그인 (양식, 처리)
 /member/logout - 로그아웃 
*/

// 회원가입 
router.route("/join")
		.get((req, res) => {
			
		})
		.post((req, res) => {
			
		});

// 로그인
router.route("/login")
		.get((req, res) => {
			
		})
		.post((req, res) => {
			
		});

// 로그아웃 
router.get("/logout", (req, res) => {
	
});

module.exports = router;