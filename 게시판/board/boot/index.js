const member = require("../models/member"); // member 모델

/**
* 사이트 초기화 미들웨어 
* res.locals -> 템플릿 전역변수 
* 1) 공통 메뉴 
* 2) 사이트 title 
*/
module.exports = async (req, res, next) => {
	/** 
	* 공통 메뉴 
	*  메뉴명, 메뉴 링크 
	*/
	res.locals.mainMenu = [
		{ name : "메뉴1", url : "#" },
		{ name : "메뉴2", url : "#" },
		{ name : "메뉴3", url : "#" },
		{ name : "메뉴4", url : "#" },
	];
	
	/** 사이트 title */
	res.locals.pageTitle = "공통제목....";
	
	/**
	* 로그인 처리 
	* 1. 로그인 한 경우 회원정보를 조회 -> 사이트 전역에 유지 
	* 2. req, res, res.locals 
	* 3. req. res. res.locals  -> isLogin이라는 속성
	*/
	if (req.session.memId) { // 로그인을 한 경우 
		const info = await member.get(req.session.memId);
		if (info) {
			req.member = res.member = res.locals.member = info;
			req.isLogin = res.isLogin = res.locals.isLogin = true;
		}
	}
	
	next();
};