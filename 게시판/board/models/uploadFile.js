const { sequelize, Sequelize : { QueryTypes } } = require("./index");
const logger = require("../lib/logger");
const path = require('path');
const fs = require('fs').promises;

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
			const sql = `INSERT INTO file (gid, originalName, mimeType)
								VALUES(:gid, :originalName, :mimeType)`;
			
			const replacements = {
				gid : file.gid,
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
	},
	/**
	* 파일 다운로드 처리 
	*
	* @param idx 파일 등록번호
	* @param res - res.header, sendFile 메서드 접근하기 위한 용도 
	*/
	async download(idx, res) {
		/**
		* 출력 헤더 
				- Content-Type : application/octet-stream
				- Content-Disposition: attachment; filename=다운로드될 파일명
		*	 	res 
					.sendFile 
		*/
		if (!idx || !res) {
			return false;
		}
		
		const info = await this.get(idx);
		if (!info) {
			return false;
		}
		
		res.header("Content-Description", "File Transfer");
		res.header("Content-Type", "application/octet-stream");
		res.header("Content-Disposition", "attachment; filename=" + encodeURIComponent(info.originalName));
		res.header("Expires", 0);
		res.header("Cache-Control", "must-revalidate");
		res.header("Pragma", "public");
		res.sendFile(info.uploadedPath);
	},
	/**
	* 파일 삭제
	*
	* @param idx 파일 등록 번호
	* @return boolean 
	*/
	async delete(idx) {
		try {
			
			/**
			* 1. 파일 정보 삭제(O)
			* 2. 파일삭제(O)
			*/
			const info = await this.get(idx);
			if (!info) {
				return false;
			}
			
			const sql = "DELETE FROM file WHERE idx = ?";
			await sequelize.query(sql, {
				replacements : [idx],
				type : QueryTypes.DELETE,
			});
			
			await fs.unlink(info.uploadedPath);
			
			return true;
		} catch (err) {
			logger(err.message, "error");
			logger(err.stack, "error");
			return false;
		}
	},
	/**
	* 업로드된 파일 정보 
	*
	* @param idx 파일 등록번호 
	*/
	async get(idx) {
		try {
			const sql = "SELECT * FROM file WHERE idx = ?";
			const rows = await sequelize.query(sql, {
				replacements : [idx],
				type : QueryTypes.SELECT,
			});
			
			const data = rows[0];
			if (rows.length > 0) {
				/** 실 업로드 경로 */
				const folder = idx % 10;
				data.uploadedPath = path.join(__dirname, "..", "public/uploads/", folder + "/" + idx);
				
				/** 이미지 파일인지 아닌지 */
				data.isImage = (data.mimeType.indexOf("image") == -1)?false:true;
				return data;
			} 
			
			// 파일 정보가 존재 X 
			return false;
			
		} catch (err) {
			logger(err.message, "error");
			logger(err.stack, "error");
			return false;
		}
	}
};

module.exports = uploadFile;