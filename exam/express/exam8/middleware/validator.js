const { alert } = require("../lib/common");
const logger = require("../lib/logger");

/** 회원 관련 유효성 검사 */

/** 회원가입 유효성 검사 */
module.exports.joinValidator = (req, res, next) => {
	/**
	1. 필수 항목 체크(memId, memPw, memPwRe, memNm) - O 
	2. 아이디, 비밀번호 자리수 체크  - 6자리 - O 
	3. 비밀번호 확인 - 일치여부  -  O 
	4. 회원의 중복 가입 여부
	*/
	try {
		// for 객체의 속성 in 객체 
		const required = {
			memId : "아이디를 입력하세요.",
			memPw : "비밀번호를 입력하세요.",
			memPwRe : "비밀번호를 확인해 주세요.",
			memNm : "회원명을 입력해 주세요.",
		};
		
		for (key in required) {
			if (!req.body[key]) {
				// 필수 데이터 누락 -> 에러 메세지 출력 
				throw new Error(required[key]);
			}
		}
		
		if (req.body.memId.length < 6) {
			throw new Error('아이디는 6자리 이상 입력해 주세요.');
		}
		
		if (req.body.memPw.length < 6) {
			throw new Error('비밀번호는 6자리 이상 입력해 주세요.');
		}
		
		if (req.body.memPw != req.body.memPwRe) {
			throw new Error('비밀번호 확인이 일치하지 않습니다.');
		}
		
	} catch (err) {
		logger(err.message, 'error');
		return alert(err.message, res);
	}
	next();
};