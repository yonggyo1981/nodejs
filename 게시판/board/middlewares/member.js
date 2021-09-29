const { alert } = require("../lib/common");
const { sequelize, Sequelize : { QueryTypes } } = require("../models");

/**
* 회원 기능 관련 미들웨어
*/
const member = {
	/** 회원 가입 데이터 검증 미들웨어 */
	async joinValidator(req, res, next) {
		/**
		* 0. 필수 데이터 검증(아이디, 회원명, 비밀번호, 비밀번호 확인) (O)
		* 1. 아이디 자리수 6~20, 알파벳 + 숫자(O)
		* 2. 비밀번호 자리수 8자리 이상, 1개 이상의 알파벳, 특수문자, 숫자 포함되는 복잡성 (O)
		* 3. 비밀번호 확인 (O)
		* 4. 휴대전화번호 -> 입력이 된 경우 -> 검증 -> 휴대폰 번호 형식이 맞는지 검증(0)
		* 5. 휴대전화번호 DB 처리 통일성을 위해서 숫자로만 변경 (O)
		* 6. 중복 가입 여부(이미 가입된 회원인 경우 -> 회원 가입 불가) (O)
		*/
		try {
			/** 0. 필수 데이터 검증 */
			const required = {
				memId : "아이디를 입력해 주세요.",
				memNm : "회원명을 입력해 주세요.",
				memPw : "비밀번호를 입력해 주세요.",
				memPwRe : "비밀번호를 확인해 주세요.",
			};
			
			for (key in required) {
				if (!req.body[key]) { // 필수 데이터가 누락된 경우 
					throw new Error(required[key]);
				}
			}
			
			
			/** 1. 아이디 자리수 6~20, 알파벳 + 숫자 */
			const memId = req.body.memId;
			if (memId.length < 6 || memId.length > 20 || /[^a-z0-9]/i.test(memId)) {
				throw new Error("아이디는 알파벳과 숫자로 구성된 6이상 20자리 이하로 입력해 주세요.");
			}
			
			/** 2. 비밀번호 자리수 8자리 이상, 1개 이상의 알파벳, 특수문자, 숫자 포함되는 복잡성  */
			const memPw = req.body.memPw;
			if (memPw.length < 8  || !/[a-z]/i.test(memPw) || !/[\d]/.test(memPw) || !/[!@#$%^&*()]/.test(memPw)) {
				throw new Error("비밀번호는 1개 이상 알파벳, 특수문자, 숫자로 구성된 8자리 이상으로 입력해 주세요.");
			}
			
			/** 3. 비밀번호 확인  */
			if (memPw != req.body.memPwRe) {
				throw new Error("비밀번호를 다시 확인해 주세요.");
			}
			
			/**
				4. 휴대전화번호 -> 입력이 된 경우 -> 검증 -> 휴대폰 번호 형식이 맞는지 검증  
				  1) 휴대전화번호의 형식을 일치 하게 하기 위해서 -> 전부 숫자로만 변환 (숫자가 아닌 문자 제거)
				  2) 자리수 체크 
			*/
			if (req.body.cellPhone) {
				let cellPhone = req.body.cellPhone;
				cellPhone = cellPhone.replace(/[^\d]/g, '');
				const pattern = /01[016789]\d{3,4}\d{4}/;
				if (!pattern.test(cellPhone)) { //휴대전화번호 패턴이 아닌 경우 
					throw new Error("휴대전화번호 양식이 아닙니다.");
				}
				
				req.body.cellPhone = cellPhone;  // 5. 휴대전화번호 DB 처리 통일성을 위해서 숫자로만 변경 
			}
			
			/**  6. 중복 가입 여부(이미 가입된 회원인 경우 -> 회원 가입 불가) **/
			const sql = "SELECT COUNT(*) as cnt FROM member WHERE memId = ?";
			const rows = await sequelize.query(sql, {
											replacements : [memId],
											type : QueryTypes.SELECT,
			});
			if (rows[0].cnt > 0) { // 중복 회원 
				throw new Error("이미 가입된 아이디 입니다. - " + memId);
			}
		} catch(err) {
			// alert 형태로 에러 메세지 출력 
			return alert(err.message, res);
		}
		
		next();
	},
	/**
	* 로그인 유효성 검사 
	*
	*/
	loginValidator(req, res, next) {
		try {
			if (!req.body.memId) {
				throw new Error("아이디를 입력해 주세요.");
			}
			
			if (!req.body.memPw) {
				throw new Error("비밀번호를 입력해 주세요.");
			}
			
		} catch (err) {
			return alert(err.message, res);
		}
		next();
	}
};

module.exports = member;