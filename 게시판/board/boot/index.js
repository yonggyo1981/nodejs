/**
* 사이트 초기화 미들웨어 
* res.locals -> 템플릿 전역변수 
* 1) 공통 메뉴 
* 2) 사이트 title 
*/

module.exports = (req, res, next) => {
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
	
	next();
};