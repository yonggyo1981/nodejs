const path = require('path');
const fs = require('fs').promises;
const constants = require('fs').constants;
const { alert } = require("../lib/common");

/**
* 회원 가입 유효성 검사 미들웨어
*  
*/
module.exports.joinValidator = async (req, res, next) => {
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
			/** 필수 데이터 체크 */
			for (key in required) {
				if (!req.body[key]) { // 필수 입력 데이터가 누락된 경우 
					throw new Error(required[key]);
				}
			}
			
			/** 아이디, 비밀번호 자리 수 */
			if (req.body.memId.length < 6) {
				throw new Error('아이디는 6자리 이상 입력해 주세요.');
			}
			
			if (req.body.memPw.length < 6) {
				throw new Error('비밀번호는 6자리 이상 입력해 주세요.');
			}
			
			/** 비밀번호, 비밀번호 확인 일치 여부 */
			if (req.body.memPw != req.body.memPwRe) {
				throw new Error('비밀번호가 일치하지 않습니다.');
			}
			
			/** 가입된 회원인지 체크 */
			const filePath = path.join(__dirname, "../data/member", req.body.memId + ".json");
			try {
				await fs.access(filePath, constants.F_OK);
				// 이미 존재하는 회원 - 가입 불가
				return alert('이미 가입된 회원입니다. - ' + req.body.memId, res, true);
			} catch (e) { /* 존재하지 않으면 그냥 넘어가기 - 가입 가능 */  }
			
			
		} catch (err) { 
			return alert(err.message, res, true); // 메세지 출력 후 뒤로가기
		}
		next();
};

/**
* 로그인 유효성 검사  - 아이디와 비밀번호가 필수 데이터
*
*/ 
module.exports.loginValidator = (req, res, next) => {
	try {
		// 아이디 체크 
		if (!req.body.memId) { // 아이디가 없는 경우
			throw new Error('아이디를 입력하세요.');
		}
		
		// 비밀번호 체크 
		if (!req.body.memPw) {
			throw new Error('비밀번호를 입력하세요.');
		}
		
	} catch (err) {
		return alert(err.message, res, true);
	}
		
	next();
};