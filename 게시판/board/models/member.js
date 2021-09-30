const { sequelize, Sequelize : { QueryTypes } } = require("./index");
const logger = require("../lib/logger");
const bcrypt = require("bcrypt");

/**
* 회원 Model 
*
*/
const member = {
	/**
	* 회원 가입 
	*
	* @param data 회원 가입 정보
	* @return Integer|Boolean - Integer - 회원번호, false - 회원가입실패
	*/ 
	async join(data) {
		try {
			const sql = `INSERT INTO member (memId, memNm, memPw, email, cellPhone)
									VALUES (:memId, :memNm, :memPw, :email, :cellPhone)`;
			
			const memPw = await bcrypt.hash(data.memPw, 10);
			
			const replacements = {
				memId : data.memId,
				memNm : data.memNm,
				memPw,
				email : data.email,
				cellPhone : data.cellPhone,
			};
			const result = await sequelize.query(sql, {
				replacements,
				type : QueryTypes.INSERT,
			});
			
			return result[0]; // memNo - 회원번호 반환
		} catch (err) {
			logger(err.message, "error");
			logger(err.stack, "error");
			return false; // 회원가입 실패
		}
	},
	/**
	* 로그인 처리 
	*
	* @param memId 아이디
	* @param memPw 비밀번호 
	* @param req - request 인스턴스 -> 세션을 사용하기 위한 용도 req.session.속성
	* 
	* @return Boolean - true 로그인 성공
	*/
	async login(memId, memPw, req) {
		/**
		* 1. memId - 회원 정보를 DB 조회 (O)
		* 2. 회원 정보가 있으면 memPw 해시코드 사용자가 입력한 memPw와 비교(O)
		*			bcrypt.compare 
		* 3. 비밀번호가 일치 -> 로그인 처리(세션으로 처리) -> return true (O)
		* 4. 비밀번호가 불일치 -> return false (O)
		*/
		const info = await this.get(memId);
		if (!info) { // 회원 정보가 없는 경우 
			return false;
		}	
	
		const match = await bcrypt.compare(memPw, info.memPw);
		if (match) { // 비밀번호 일치 -> 3.로그인 처리
			req.session.memId = memId; 
			return true;
		}
		
		return false;
	},
	/**
	* 회원정보 조회 
	*
	* @param memId 회원아디
	* @return JSON|Boolean 
	*/
	async get(memId) {
		try {
			const sql = "SELECT * FROM member WHERE memId = ?";
			const rows = await sequelize.query(sql, {
					replacements : [memId],
					type : QueryTypes.SELECT,
			});
			if (rows.length == 0) 
				return false;
			
			return rows[0];
		} catch (err) {
			logger(err.message, 'error');
			logger(err.stack, 'error');
			return false;
		}
	}
};

module.exports = member;