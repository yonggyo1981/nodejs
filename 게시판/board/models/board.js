const { sequelize, Sequelize : { QueryTypes } } = require("./index");
const logger = require("../lib/logger");

/**
* 게시판 model 
*
*/
const board = {
	/**
	* 게시판 생성 
	*
	* @param boardId 게시판 아이디
	* @param boardNm 게시판 이름 
	* @return boolean 생성 성공 true
	*/
	async create(boardId, boardNm) {
		try {
			const sql = `INSERT INTO boardConf (boardId, boardNm) 
									VALUES (:boardId, :boardNm)`;
			
			const replacements = {
				boardId,
				boardNm,
			};
			await sequelize.query(sql, {
				replacements,
				type : QueryTypes.INSERT,
			});
			
			return true;
		} catch (err) {
			logger(err.message, 'error');
			logger(err.stack, 'error');
			return false;
		}
	},
	/**
	* 게시판 설정 목록
	*
	*/
	async getBoards() {
		try {
			const sql = "SELECT * FROM boardConf ORDER BY regDt DESC";
			const rows = await sequelize.query(sql, {
				type : QueryTypes.SELECT,
			});
			
			return rows;
		} catch(err) {
			logger(err.message, 'error');
			logger(err.stack, 'error');
			return false;
		}
	},
	/**
	* 게시판 설정 조회 
	*
	* @param boardId 게시판아이디
	*/
	async getBoard(boardId) {
		try {
			const sql = "SELECT * FROM boardConf WHERE boardId = ?";
			const rows = await sequelize.query(sql, {
				replacements : [boardId],
				type : QueryTypes.SELECT,
			});
			
			return rows[0];
		} catch (err) {
			logger(err.message, 'error');
			logger(err.stack, 'error');
			return false;
		}
	},
	/**
	* 게시판 설정 저장
	*
	* @param boardId - 게시판 아이디
	* @param data - 설정 데이터 
	*/
	async saveConfig(boardId, data) {
		try {
			const replacements = {
				boardNm : data.boardNm,
				category : data.category?data.category.replace(/\r\n/g, "||"):"",
				listPerPage : data.listPerPage || 15,
				useReply : data.useReply || 0,
				useComment : data.useComment || 0,
				commentLevel : data.commentLevel || 'all',
				listLevel : data.listLevel || 'all',
				viewLevel : data.viewLevel || 'all',
				writeLevel : data.writeLevel || 'all',
				skin : data.skin,
				uploadImage : data.uploadImage || 0,
				uploadFile : data.uploadFile || 0,
				useViewList : data.useViewList || 0,
				useEditor : data.useEditor || 0,
				boardId,
			}
			
			const sql = `UPDATE boardConf 
									SET
										boardNm = :boardNm,
										category = :category,
										listPerPage = :listPerPage,
										useReply = :useReply,
										useComment = :useComment,
										commentLevel = :commentLevel,
										listLevel = :listLevel,
										viewLevel = :viewLevel,
										writeLevel = :writeLevel,
										skin = :skin,
										uploadImage = :uploadImage,
										uploadFile = :uploadFile,
										useViewList = :useViewList,
										useEditor = :useEditor
								WHERE boardId = :boardId`;
			await sequelize.query(sql, {
				replacements,
				type : QueryTypes.UPDATE,
			});
			return true;
		} catch(err) {
			logger(err.message, 'error');
			logger(err.stack, 'error');
			return false;
		}
	}
};

module.exports = board;