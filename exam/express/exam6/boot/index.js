const member = require('../models/member');

/**
* bootStrap - 사이트 초기화 미들웨어 
*
*/ 
module.exports = async (req, res, next) => {
	
	/** 로그인 회원 정보 */
	if (req.session.memId) {
		const info = await member.get(req.session.memId);
		if (info) { // 회원 정보가 존재하는 경우 
			//res.locals.isLogin -> nunjucks 템플릿 전역 변수
			req.isLogin = res.isLogin = res.locals.isLogin = true;
			
			delete info.memPw;
			req.member = res.member = res.locals.member = info;
		}
	}
	next();
};