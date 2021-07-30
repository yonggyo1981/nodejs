/**
* 회원 가입 유효성 검사 미들웨어
*
*/
module.exports.joinValidator = (req, res, next) => {
		console.log("미들웨어", req.body);
		next();
};