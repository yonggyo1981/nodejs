const express = require('express');
const router = express.Router();

/** /board/list/인수 */
router.get("/list/:boardId", (req, res) => {
	const data = { 
						boardId : req.params.boardId,
						list : ["apple", "orange", "mango"],
					 };
	return res.render("board/list", data); // views/board/list.html
});

/** /board/view/인수 */
router.get("/view/:num", (req, res) => {
	
	return res.send("게시글 번호 - " + req.params.num);
});


/** /board/write **/
router.route("/write")
		.get((req, res) => {
			// 게시글 작성 양식 
		})
		.post((req, res) => {
			// 게시글 작성 처리 
		})
		.patch((req, res) => {
			// 게시글 수정 처리 
		})
		.delete((req, res) => {
			// 게시글 삭제 
		});
	
module.exports = router;