const express = require('express');
const { joinValidator } = require("../middleware/member");
const router = express.Router();



/** /member/join - GET -> 회원 가입 양식, POST - 회원 가입 처리 */
router.route("/join")
		.get((req, res) => { // 회원가입 양식
			return res.render("member/join");
		})
		.post(joinValidator, (req, res) => {
			// 회원가입 처리
			return res.send("");
		});

/** /member/login - GET -> 로그인 양식, POST - 로그인 처리 */
router.route("/login")
	.get((req, res) => { // 로그인 양식 
		return res.render("member/login");
	})
	.post((req, res) => { // 로그인 처리 
		
	});

module.exports = router;