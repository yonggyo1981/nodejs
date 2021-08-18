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
	},
	/** 로그인 처리 */
	async login(memId, memPw, req) {
		/**
			1. memId가 있으면 -> 회원 정보를 조회
			2. 조회했을때 존재하면 -> 비밀번호 체크(회원 입력한 memPw와 memPw 해시 일치 여부 체크)
			3. 일치하면 - 세션 처리(memNo 회원번호 세션에 담는다)
		*/
		try {
			const info = await this.get(memId);
			if (!info) { // 회원 정보가 없는 경우 
				throw new Error('회원 정보가 없음');
			}
			
			const match = await bcrypt.compare(memPw, info.memPw);
			if (!match) { // 비밀번호가 일치 X 
				throw new Error('비밀번호 불일치');
			}
			
			// 일치하면 -> 세션 처리 
			req.session.memNo = info.memNo;
			
			return true;
		} catch (err) {
			return false; // 로그인 실패 
		}
		
	},
	/** 
		회원정보 조회 
		@param memId - 문자 - memId, 숫자 - memNo 
	*/
	async get(memId) {
		const field = isNaN(memId)?"memId":"memNo";
		
		const sql = `SELECT * FROM member WHERE ${field} = ?`;
		const result = await sequelize.query(sql, {
			replacements : [memId],
			type : QueryTypes.SELECT,
		});
		
		return result[0];
	},
	/** 회원 목록 */
	async getList() {
		try {
			const sql = "SELECT * FROM member ORDER BY memNo DESC";
			const list = await sequelize.query(sql, {
					type : QueryTypes.SELECT,
			});
			
			return list;
		} catch (err) {
			return false;
		}
	}
};


module.exports = member;