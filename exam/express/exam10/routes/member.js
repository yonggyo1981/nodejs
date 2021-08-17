const express = require('express');
const router = express.Router();

/** /member/join */
router.route("/join")
	.get((req, res) => { // 회원가입 양식 
		return res.render("member/join");
	})
	.post((req, res) => { // 회원 가입 처리 
		
	});

router.route("/login")
	.get((req, res) => { // 로그인 양식 
		return res.render("member/login");
	})
	.post((req, res) => { // 로그인 처리 
		
	});
	
router.get("/logout", (req, res) => {
	
});


module.exports = router;