/** 미들웨어 방식1 **/
/** 단일 미들웨어 등록 방식 */
module.exports = function(req, res, next) {
	req.data1 = "미들웨어1에서 지정한 데이터";
	res.data1 = "미들웨어1에서 지정한 데이터(res)";
	console.log("memberInfo 미들웨어 호출");
	next(); // 미들웨어 정의시 반드시 next() 호출 필요
};