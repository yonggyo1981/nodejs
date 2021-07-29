/**
* 사이트 초기화 미들웨어
*
*  res.locals.속성 --> nunjucks 템플릿 전역 변수 (render시 넘길 필요 X)
*/
module.exports = (req, res, next) => {
	/** 사이트 메인 제목 */
	res.locals.pageTitle = "사이트 메인제목...";
	
	/** 사이트 메인 메뉴 */
	res.locals.mainMenu = [
		{ name : '메뉴1', url : '/menu1' },
		{ name : '메뉴2', url : '/menu2' },
		{ name : '메뉴3', url : '/menu3' },
		{ name : '메뉴4', url : '/menu4' },
		{ name : '메뉴5', url : '/menu5' },
	];
	
	/** 로그인 정보 처리... */
	
	next(); // 다음 미들웨어로 이동시 꼭 필요!
};