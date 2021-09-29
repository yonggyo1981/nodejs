const member = require("../../models/member"); // 회원 model 
const { joinValidator, loginValidator } = require("../../middlewares/member");  // 유효성검사 미들웨어 
const { alert, go } = require("../../lib/common");
const express = require('express');
const router = express.Router();

/**
/member/join - GET -> 가입 양식 
					  - POST -> 가입 처리 
	
/member/login - GET -> 로그인 양식 
					- POST -> 로그인 처리 
*/
router.route("/join")
	/** 회원 가입 양식 */
	.get((req, res) => {
		const data = {
				pageTitle : "회원가입",
		};
		return res.render("member/form", data);
	})
	/** 회원 가입 처리 */
	.post(joinValidator, async (req, res) => {
		const memNo = await member.join(req.body);
		if (memNo) { // 회원 가입 성공 
			 // 로그인 페이지로 이동
			return go("/member/login", res, "parent");
		}

		// 실패 -> 메세지를 출력 
		return alert("회원가입에 실패 하였습니다.", res);
	});


router.route("/login")
	/** 로그인 양식 */
	.get((req, res) => {
		const data = {
			pageTitle : "로그인",
		};
		
		return res.render("member/login", data);
	})
	/** 로그인 처리 */
	.post(loginValidator, (req, res) => {
		
		member.login(req.body.memId, req.body.memPw);
		
		return res.send("");
	});

module.exports = router;