const { sequelize, Sequelize : { QueryTypes } } = require('./index'); 
const bcrypt = require('bcrypt');

/**
* member model
*
*/
const member = {
	/** 회원 가입 처리 */
	async join(data) {
		/**
			sequelize.query(sql, {
				replacements : sql 바인딩 데이터,
				type : QueryTypes.SELECT | INSERT | UPDATE | DELETE 
			});
			
			QueryTypes.INSERT
			result [증감번호 - Primary Key, Auto_increment,  0|1 - 0 - 실패, 1 - 성공]
		*/
		try {
			/* 바인딩 1 - 값을 순서대로, ? - 배열 객체 
			
			const sql = `INSERT INTO member (memId, memPw, memNm)
										VALUES (?, ?, ?)`;
										
			const result = await sequelize.query(sql, {
									replacements : [data.memId, data.memPw, data.memNm],
									type : QueryTypes.INSERT,
								});		
			console.log("result", result);
			*/
			/** 바인딩 2 - 키 : 값  - 객체 */
			const sql = `INSERT INTO member (memId, memPw, memNm)
									VALUES (:memId, :memPw, :memNm)`;
									
			const memPw = await bcrypt.hash(data.memPw, 10);
									
			const replacements = {
					memId : data.memId,
					memPw, // memPw : memPw
					memNm : data.memNm,
			};
			
			await sequelize.query(sql, {
						replacements,
						type : QueryTypes.INSERT,
				});
			
			
			return true;
		} catch (err) {
			console.error(err);
			
			return false;
		}
	}
};


module.exports = member;