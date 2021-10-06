const router = require('express').Router();
const { adminOnly } = require("../../middlewares/member");
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
	.get((req, res) => {
		const data = {
			pageTitle : "게시판 관리",
		};
		
		return res.render("admin/board/main", data);
	})
	.post((req, res) => {
		// 게시판 등록처리, 간단한 게시판 설정 수정 
		board.create(req.body.boardId, req.body.boardNm);
		
		res.send("");
	});

module.exports = router;
