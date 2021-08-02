const { alert } = require("../lib/common");
const path = require('path');
const fs = require('fs').promises;
const constants = require('fs').constants;

/**
* 회원 관련 유효성 검사 미들웨어
*
*/

/** 회원가입 유효성검사 */
module.exports.joinValidator = async (req, res, next) => {
	/**
		1. 필수 항목 체크(memId, memPw, memPwRe, memNm) - O 
		2. 아이디와 비밀번호 자리수 - 6자리 이상 - O 
		3. 비밀번호와 비밀번호 확인 일치 하는 지 여부 - O 
		4. 이미 가입된 회원인지 여부 - fs.access
		
		객체 -> for 속성명 in 객체
	*/
	const required = {
		memId : "아이디를 입력하세요",
		memPw : "비밀번호를 입력하세요",
		memPwRe : "비밀번호를 확인해 주세요.",
		memNm : "회원명을 입력해 주세요."
	};
	
	try {
		/** 필수 항목 체크 */
		for (key in required) {
			if (!req.body[key]) { // 필수 항목 데이터가 없는 경우 
				throw new Error(required[key]);
			}
		}
		
		/** 아이디, 비밀번호 자리수 */
		if (req.body.memId.length < 6) {
			throw new Error('아이디는 6자리 이상 입력해 주세요.');
		}
		
		if (req.body.memPw.length < 6) {
			throw new Error('비밀번호는 6자리 이상 입력해 주세요.');
		}
		
		/** 비밀번호, 비밀번호 확인 일치 여부 */
		if (req.body.memPw != req.body.memPwRe) {
			throw new Error('비밀번호 확인이 일치하지 않습니다.');
		}
		
		/** 이미 가입된 회원 여부 체크 */
		try {
			const filePath = path.join(__dirname, "../data/member", req.body.memId + ".json");
			await fs.access(filePath, constants.F_OK);
			// 이미 가입된 회원인 경우 
			return alert("이미 가입된 회원입니다. - " + req.body.memId, res, true);
		} catch (e) {
			console.log(e);
			// 여기로 유입이 되면 존재하는 회원 X -> 회원 가입 가능 
		}
		
	} catch (err) { 
		// 유효성 검사 실패시 유입되는 부분, 메세지 출력 후 뒤로가기
		return alert(err.message, res, true);
	}
	
	next();
};

/** 로그인 유효성 검사 - 아이디, 비밀번호  필수 여부 */
module.exports.loginValidator = (req, res, next) => {
	try {
		if (!req.body.memId) {
			throw new Error('아이디를 입력해 주세요.');
		}
		
		if (!req.body.memPw) {
			throw new Error('비밀번호를 입력해 주세요.');
		}
	} catch (err) {
		return alert(err.message, res, true);
	}
	next();
};