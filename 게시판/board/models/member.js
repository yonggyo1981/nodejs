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
	}
};

module.exports = member;