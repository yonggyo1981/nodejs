const { sequelize, Sequelize : { QueryTypes } } = require("./index");
const logger = require("../lib/logger");

/**
* 파일 관련 Model
*
*/
const uploadFile = {
	/**
	* 파일 정보 DB 추가 
	*
	*/
	async insertInfo(file) {
		let idx = 0;
		try {
			const sql = `INSERT INTO file (originalName, mimeType)
								VALUES(:originalName, :mimeType)`;
			
			const replacements = {
				originalName : file.originalname,
				mimeType : file.mimetype,
			};
			const result = await sequelize.query(sql, {
				replacements, 
				type : QueryTypes.INSERT,
			});
			idx = result[0];
		} catch(err) {
			logger(err.message, 'error');
			logger(err.stack, 'error');
		}
		
		return idx; // 0이면 실패, 1 이상 -> 추가 성공(idx)
	}
};

module.exports = uploadFile;