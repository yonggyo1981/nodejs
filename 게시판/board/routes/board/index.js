const router = require('express').Router();
const board = require('../../models/board');
const { uid, alert, go } = require("../../lib/common");
const uploadFile = require("../../models/uploadFile");
const { writeValidator } = require("../../middlewares/board");

/**
* 게시판 라우터 
*
*  /board 
	 목록 - /list/:id(게시판 아이디) req.params.id  - GET 
	 보기 - /view/:idx(게시글 작성번호) req.params.idx - GET 
	 작성 - /write/:id(게시판 아이디) - GET(양식), - POST(작성처리)
	 수정 - /update/:idx(게시글 작성 번호) - GET(양식) - POST(작성처리)
	 삭제 - /delete/:idx(게시글 작성 번호) - GET 
*
*/

/** 게시판 공통 라우터 */
router.use((req, res, next) => {
	res.locals.addCss = ["board/style"];
	next();
});

/** 
* 게시글 목록 
*
*/
router.get("/list/:id", async (req, res) => {
	const boardConf = await board.getBoard(req.params.id);
	const result = await board.getList(req.params.id);
	
	const data = {
		boardConf,
	}
	return res.render("board/list", data);
});

/**
* 게시글 작성 
*
*/
/** 글쓰기 공통 라우터 */
router.use("/write/:id", async (req, res, next) => {
	req.boardConf = await board.getBoard(req.params.id);	
	next();
});

router.route("/write/:id")
		.get(async (req, res) => {  // 게시글 작성 양식 		
			const data = {
				addScript : ["ckeditor/ckeditor", "board/form"],
				boardConf : req.boardConf,
				gid : uid(),
			};
			return res.render("board/form", data);
		})
		.post(writeValidator, async (req, res) => { // 게시글 등록 처리 
			const boardId = req.params.id;
			req.body.boardId = boardId;
			const idx = await board.write(req.body, req);
			// 성공 -> 게시글 보기, 실패 -> 메세지 출력
			if (!idx) { // 게시글 작성 실패 
				return alert("게시글 작성 실패하였습니다!", res);
			}
			
			// 게시글 작성 성공 -> 게시글 보기
			return go("/board/view/" + idx, res, "parent");
		});

/** 게시글 보기 */
router.get("/view/:idx", async (req, res) => {
	const idx = req.params.idx;
	const data = await board.get(idx); 
	if (!data) {
		return alert("게시글이 없습니다.", res, -1);
	}
	
	return res.render("board/view", data);
});

module.exports = router;