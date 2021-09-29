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
	* @return Boolean - true 로그인 성공
	*/
	login(memId, memPw) {
		/**
		* 1. memId - 회원 정보를 DB 조회 
		* 2. 회원 정보가 있으면 memPw 해시코드 사용자가 입력한 memPw와 비교 
		*			bcrypt.compare 
		* 3. 비밀번호가 일치 -> 로그인 처리(세션으로 처리) -> return true
		* 4. 비밀번호가 불일치 -> return false 
		*/
	}
};

module.exports = member;