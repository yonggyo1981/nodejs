const express = require('express');
const member = require('../models/member');
const { alert, go } = require("../lib/common");
const { joinValidator, loginValidator } = require("../validator/member"); // 회원 관련 유효성 검사
const router = express.Router();

/** /member/join */
router.route("/join")
	.get((req, res) => { // 회원가입 양식 
		return res.render("member/join");
	})
	.post(joinValidator, async (req, res) => { // 회원 가입 처리 
		const result = await member.join(req.body);
		if (result) { // 회원 가입 성공 -> 로그인 페이지 이동 
			return go("/member/login", res, "parent");
		}
		
		// 실패 -> 메세지
		return alert("회원가입 실패하였습니다.");
	});

router.route("/login")
	.get((req, res) => { // 로그인 양식 
		return res.render("member/login");
	})
	.post(loginValidator, (req, res) => { // 로그인 처리  // 세션은 req.session 속성 추가로 설정 
		member.login(req.body.memId, req.body.memPw, req);
		
		return res.send("");
	});
	
router.get("/logout", (req, res) => {
	
});


module.exports = router;