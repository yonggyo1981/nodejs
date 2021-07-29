/*
const member = {
	joinValidator : function (req, res, next) {
		console.log("회원가입 정보 검증..");
		next();
	},
	loginValidator : function (req, res, next) {
		console.log("로그인 정보 검증...");
		next();
	}
};

module.exports = member;
*/
module.exports.joinValidator = (req, res, next) => {
	console.log("회원가입 정보 검증..");
	next();
};

module.exports.loginValidator = (req, res, next) => {
	console.log("로그인 정보 검증...");
	next();
};