const express = require('express');
const { joinValidator } = require("../middleware/member");
const { alert } = require('../lib/common');
const member = require("../models/member"); // member model 
const router = express.Router();



/** /member/join - GET -> 회원 가입 양식, POST - 회원 가입 처리 */
router.route("/join")
		.get((req, res) => { // 회원가입 양식
			return res.render("member/join");
		})
		.post(joinValidator, async (req, res) => {
			// 데이터 - req.body
			// res.redirect -> 페이지 이동
			const result = await member.join(req.body);
			if (result) { // 가입 성공 -> 로그인 페이지로 이동
				return res.redirect("/member/login");
			}
			
			// 회원 가입 실패시 --> 다시 회원 가입 양식
			return alert("회원가입 실패하였습니다", res, true);
		});

/** /member/login - GET -> 로그인 양식, POST - 로그인 처리 */
router.route("/login")
	.get((req, res) => { // 로그인 양식 
		return res.render("member/login");
	})
	.post((req, res) => { // 로그인 처리 
		
	});

module.exports = router;