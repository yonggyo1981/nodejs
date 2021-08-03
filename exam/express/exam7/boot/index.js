const member = require("../models/member");

/**
* 사이트 초기화 미들웨어
*
* res.locals -> nunjucks 템플릿 전역변수
*/
module.exports = async (req, res, next) => {

		/** 로그인 회원 정보 처리 */
		if (req.session.memId) { // 로그인 한 경우 -> 회원 데이터 추출, isLogin값을 true
			const info = await member.get(req.session.memId);
			if (info) {
				req.isLogin = res.isLogin = res.locals.isLogin = true;
				
				delete info.memPw;
				req.member = res.member = res.locals.member = info;
			}
		}
		
		next();
};