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
					3) 중복 아이디 체크(이미 가입된 아이디면 가입 불가)	 - O
						- 데이터베이스 접근(sequelize)
			3. 비밀번호 
					1) 자리수 제한(8자 이상) - O
					2) 복잡성 체크 - O 
						(1개 이상 알파벳, 숫자, 특수 문자로 구성된 비밀번호)
					3) 비밀번호 확인이 일치하는 경우 - O
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
				
				/** 중복 아이디 체크 S */
				const sql = `SELECT COUNT(*) AS cnt FROM member WHERE memId = ?`;
				const result = await sequelize.query(sql, {
					replacements : [memId],
					type : QueryTypes.SELECT,
				});
				if (result[0]['cnt'] > 0) { // 아이디가 이미 가입된 경우 
					throw new Error('이미 가입된 아이디 입니다 - ' + memId);
				}
				/** 중복 아이디 체크 E */
				
				/** 
					비밀번호 - 자리수(8이상) 
					반드시 알파벳, 숫자, 특수문자가 포함
					/[^a-z]/i - a-z 아닌 문자(숫자, 특수문자가 들어가 있으면 true -> 정확하게 알파벳 존재 여부 X -> 알파벳이 없음에도 true로 유효성 검사 성공
					!/[a-z]/i -> a-z 인 문자 조건에서 부정 
					!/[0-9]/ -> 숫자 포함여부
					!/[~!@#$%&*]/
				*/
				const memPw = data.memPw;
				if (memPw.length < 8 || !/[a-z]/i.test(memPw) || !/[0-9]/.test(memPw) || !/[~!@#$%^&*]/.test(memPw)) {
					throw new Error('비밀번호는 8자리 이상 알파벳, 숫자, 특수문자로 구성해 주세요.');
				}
				
				/** 비밀번호 확인 일치 여부 */
				if (memPw != data.memPwRe) {
					throw new Error("비밀번호를 정확하게 확인해 주세요.");
				}
				
			} catch(err) {
				return alert(err.message, res);
			}
		
			next();
		},
		/** 로그인 유효성 검사 */
		loginValidator(req, res, next) {
			if (!req.body.memId) { // 아이디가 없는 경우 
				return alert('아이디를 입력해 주세요.', res);
			}
			
			if (!req.body.memPw) { // 비밀번호가 없는 경우 
				return alert('비밀번호를 입력해 주세요.', res);
			}
			
			next();
		},
		/** 비회원인 경우만 접속 제한 */
		guestOnly(req, res, next) {
			if (req.isLogin) { // 로그인이 되어 있으면 접속 제한
				return alert("로그인한 회원은 접근할 수 없습니다.", res, true);
			}
			next();
		},
		/** 회원만 접속 제한 */
		memberOnly(req, res, next) {
			if (!req.isLogin) { // 비회원인 경우 접속 제한 
				return alert("회원 전용 페이지 입니다.", res, true);
			}
			next();
		}
};

module.exports = validator;