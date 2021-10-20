const router = require('express').Router();

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

/**
* 게시글 작성 
*
*/
router.route("/write/:id")
		.get((req, res) => {  // 게시글 작성 양식 
			const data = {
				addScript : ["ckeditor/ckeditor"],
			};
			return res.render("board/form", data);
		})
		.post((req, res) => { // 게시글 등록 처리 
			
		});


module.exports = router;