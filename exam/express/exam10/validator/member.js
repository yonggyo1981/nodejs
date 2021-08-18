const { alert } = require("../lib/common");
const { sequelize, Sequelize : { QueryTypes } } = require('../models');

/**
* 회원 관련 유효성 검사
*
*/
const validator = {
		/** 
			회원가입 유효성 검사 
			1. 필수데이터(아이디, 비밀번호, 비밀번호 확인, 회원명) - O 
			2. 아이디
					1) 자리수 제한(8~20) - O 
					2) 문자의 종류 제한(알파벳, 숫자) - O 
					3) 중복 아이디 체크(이미 가입된 아이디면 가입 불가)	
						- 데이터베이스 접근(sequelize)
			3. 비밀번호 
					1) 자리수 제한(8자 이상)
					2) 복잡성 체크
						(1개 이상 알파벳, 숫자, 특수 문자로 구성된 비밀번호)
					3) 비밀번호 확인이 일치하는 경우 
		*/
		async joinValidator(req,res,next) {
			try {
				const data = req.body;
				/** 필수 데이터 체크 S */
				const required = {
					memId : "아이디를 입력하세요.",
					memPw : "비밀번호를 입력하세요.",
					memPwRe : "비밀번호 확인을 해 주세요.",
					memNm : "회원명을 입력해 주세요.",
				}; // for ( 속성 in 객체 )
			
				for (key in required) {
					if (!data[key]) { // 필수 데이터가 없으면? 오류 발생 
						throw new Error(required[key]);
					}
				}
				/** 필수 데이터 체크 E */
				
				/** 아이디 체크 - 자리수(8~20) + 문자의 종류(알파벳, 숫자) */
				// memId 숫자+알파벳이 아닌 문자가 포함되어 있으면 X /[^a-z0-9]/i
				const memId = data.memId;
				if (memId.length < 8 || memId.length > 20 || /[^a-z0-9]/i.test(memId)) {
					throw new Error('아이디는 8~20자리 사이의 알파벳과 숫자로 구성해 주세요');
				}
				
				/** 중복 아이디 체크 */
				const sql = `SELECT COUNT(*) FROM member WHERE memId = ?`;
				
				
				
			} catch(err) {
				return alert(err.message, res);
			}
			return res.send("");
			//next();
		}
};

module.exports = validator;