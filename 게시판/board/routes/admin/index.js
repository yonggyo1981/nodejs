const router = require('express').Router();
const { adminOnly } = require("../../middlewares/member");
const { alert, reload } = require("../../lib/common");
const board = require("../../models/board"); // 게시판 모델 

/**
* 관리자 페이지 라우터 
*
*/
//router.use(adminOnly);

/** 관리자페이지 메인 */
router.get("/", (req, res) => {
	return res.render("admin/main");
});


/** 게시판 관리 */
router.route("/board")
	.get(async (req, res) => {
		const boardConfs = await board.getBoards();
		const data = {
			pageTitle : "게시판 관리",
			boardConfs, // 게시판 설정 목록 
		};

		return res.render("admin/board/main", data);
	})
	.post(async (req, res) => {
		// 게시판 등록처리, 간단한 게시판 설정 수정 
		const result = await board.create(req.body.boardId, req.body.boardNm);
		if (result) { // 새로고침 -> 추가된 게시판 목록
			return reload(res, "parent");
		}
		
		// 실패한 경우 메시지 출력 
		return alert("게시판 생성에 실패하였습니다.", res);
	});


// 게시판 설정
router.route("/board/:boardId")
	/** 
	*게시판 설정 양식 
	* GET - req.query, req.params 
	* POST - req.body 
	*/
	.get(async (req, res) => {
		const boardId = req.params.boardId;
		
		const data = await board.getBoard(boardId);
		console.log(data);
		if (!data) { // 게시판이 존재하지 않는 경우 -> 메세지 출력 -> 뒤로가기
			return alert("게시판이 존재하지 않습니다.", res, -1);
		}
		
		return res.render("admin/board/config", data);
	})
	.post(async (req, res) => {
		// 게시판 설정 저장 처리 
		const boardId = req.params.boardId;
		const result = await board.saveConfig(boardId, req.body);
		
		if (!result) { // 저장 실패 -> 메세지 출력 
			return alert("설정 저장에 실패하였습니다.", res);
		}
		
		// 성공 -> 새로고침 
		return reload(res, "parent");
	});
	

module.exports = router;
