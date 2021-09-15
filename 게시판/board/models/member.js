const { sequelize, Sequelize : { QueryTypes } } = require("./index");
const logger = require("../lib/logger");

/**
* 회원 Model 
*
*/
const member = {
	/**
	* 회원 가입 
	*
	* @param data 회원 가입 정보
	* @return boolean  true - 가입 성공, false - 가입 실패
	*/ 
	async join(data) {
		try {
			const sql = `INSERT INTO member (memId, memNm, memPw, email, cellPhone)
									VALUES (:memId, :memNm, :memPw, :email, :cellPhone)`;
			
			const replacements = {
				memId : data.memId,
				memNm : data.memNm,
				memPw : data.memPw,
				email : data.email,
				cellPhone : data.cellPhone,
			};
			const result = await sequelize.query(sql, {
				replacements,
				type : QueryTypes.INSERT,
			});
			console.log(result);
		} catch (err) {
			logger(err.message, "error");
			logger(err.stack, "error");
		}
	}
};

module.exports = member;