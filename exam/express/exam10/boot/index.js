const member = require('../models/member');

module.exports = async (req, res, next) => {
	if (req.session.memNo) { // 회원번호가 있으면 로그인 -> 회원정보 및 기타 전체 유지 정보 처리
		const info = await member.get(req.session.memNo);
		if (info) {
			// res.locals - nunjucks 템플릿 전역변수 
			req.isLogin = res.isLogin = res.locals.isLogin = true;
			req.member = res.member = res.locals.member = info;
		}
	}
	
	next();
};