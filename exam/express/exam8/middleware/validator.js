const { alert } = require("../lib/common");
const logger = require("../lib/logger");
const fs = require('fs').promises;
const constants = require('fs').constants;
const path = require('path');

/** 회원 관련 유효성 검사 */

/** 회원가입 유효성 검사 */
module.exports.joinValidator = async (req, res, next) => {
	/**
	1. 필수 항목 체크(memId, memPw, memPwRe, memNm) - O 
	2. 아이디, 비밀번호 자리수 체크  - 6자리 - O 
	3. 비밀번호 확인 - 일치여부  -  O 
	4. 회원의 중복 가입 여부 - 파일 존재 여부 체크(fs.access)
				contants.F_OK - 파일 접근 가능여부(조회 가능여부)
				contants.W_OK - 파일 쓰기 가능 여부
				constants.R_OK - 파일 읽기 권한 여부
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
		
		/** 회원 중복 여부 체크 */
		try { 
			const filePath = path.join(__dirname, "../data/member/", req.body.memId + ".json");
			await fs.access(filePath, constants.F_OK);

			// 파일이 존재하면 -> 회원 중복 
			return alert("이미 가입된 회원입니다. - " + req.body.memId, res);
		} catch(e) { // 파일이 미 존재 -> 문제 없음
			
		}
		
	} catch (err) {
		logger(err.message, 'error');
		return alert(err.message, res);
	}
	next();
};

/** 로그인 유효성 검사 */
module.exports.loginValidator = (req, res, next) => {
	try {
		if (!req.body.memId) {
			throw new Error("아이디를 입력하세요.");
		}
		
		if (!req.body.memPw) {
			throw new Error("비밀번호를 입력하세요.");
		}
		
	} catch(err) {
		return alert(err.message, res);
	}
	next();
};