const { sequelize, Sequelize : { QueryTypes } } = require('./index');

const board = {
	/** 게시글 작성 */
	async write(data) {
		try {
			const sql = `INSERT INTO board (boardTitle, boardContents)
									VALUES (:boardTitle, :boardContents)`;
									
			const replacements = {
					boardTitle : data.boardTitle,
					boardContents : data.boardContents,
			};
			
			// 게시글 번호가 필요
			const result = await sequelize.query(sql, {
				replacements,
				type : QueryTypes.INSERT,
			});
			
			// result[0] -> Primary Key + Auto_increment된 증감번호
			return result[0]; // 게시글 등록 성공시 게시글 번호(num) 반환
			
		} catch (err) {
			return false;
		}
	}
};

module.exports = board;