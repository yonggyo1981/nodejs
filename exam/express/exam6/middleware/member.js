const { alert } = require("../lib/common");
/**
* 회원 가입 유효성 검사 미들웨어
*  
*/
module.exports.joinValidator = (req, res, next) => {
		//console.log("미들웨어", req.body);
		/**
		* 입력 필수 데이터 
		* memId - 회원아이디, memPw, memPwRe - 비밀번호, memNm - 회원명
		* for 속성명 in 객체
		*/
		const required = {
			memId : "아이디를 입력하세요",
			memPw : "비밀번호를 입력하세요",
			memPwRe : "비밀번호를 확인해 주세요.",
			memNm : "회원명을 입력해 주세요.",
		};
		try {
			for (key in required) {
				if (!req.body[key]) { // 필수 입력 데이터가 누락된 경우 
					throw new Error(required[key]);
				}
			}
		} catch (err) { 
			return alert(err.message, res, true); // 메세지 출력 후 뒤로가기
		}
		next();
};