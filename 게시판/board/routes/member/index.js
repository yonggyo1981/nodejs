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
	.post((req, res) => {
		
	});


router.route("/login")
	/** 로그인 양식 */
	.get((req, res) => {
		
	})
	/** 로그인 처리 */
	.post((req, res) => {
		
	});

module.exports = router;