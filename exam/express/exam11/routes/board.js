const express = require('express');
const router = express.Router();
/**
 게시글 쓰기  - /board - GET - 글쓰기 양식(form)
						      - POST - 글쓰기 
	
 게시글 수정 - /board/:id(게시글번호) - GET - 게시글 수정 양식(form)
												 - POST - 게시글 수정 처리
 게시글 보기 - /board/view/:id(게시글 번호) - GET 
 게시글 목록 - /board/list   - GET 
*/

/** /board */
router.route("/")
	.get((req, res) => { // 게시글 등록 양식 
		return res.render("board/form");
	})
	.post((req, res) => { // 게시글 등록 처리 
		
	});

/** /board/list */
router.get("/list", (req, res) => {
	return res.send("게시글 목록");
});

/** /board/:id */
router.route("/:id")
	.get((req, res) => {
		return res.send("게시글 수정" + req.params.id);
	})
	.post((req, res) => {
		
	});

/** /board/view/:id */
router.get("/board/view/:id", (req, res) => {
	// req.params  -> req.params.id 
});

module.exports = router;