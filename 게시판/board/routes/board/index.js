const router = require('express').Router();
const board = require('../../models/board');
const { uid, alert, go } = require("../../lib/common");
const uploadFile = require("../../models/uploadFile");
const { writeValidator, updateValidator, commentWriteValidator, commentAuthorityCheck } = require("../../middlewares/board");

/**
* 게시판 라우터 
*
*  /board 
	 목록 - /list/:id(게시판 아이디) req.params.id  - GET 
	 보기 - /view/:idx(게시글 작성번호) req.params.idx - GET 
	 작성 - /write/:id(게시판 아이디) - GET(양식), - POST(작성처리)
	 수정 - /update/:idx(게시글 작성 번호) - GET(양식) - POST(작성처리)
	 삭제 - /delete/:idx(게시글 작성 번호) - GET 
	 
	 댓글작성 - /comment/:idx -> 게시글번호
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
* GET - req.query, ?~~~,  req.params 
* POST - req.body 
*/
router.get("/list/:id", async (req, res) => {
	const data = await board.getList(req.params.id, req);
	if (!data) {
		return alert("잘못된 접근입니다.", res, -1);
	}
	
	data.search = req.query;
	
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
				mode : "write",
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
	
	data.addScript = ["board/comment", "board/board"];
	
	return res.render("board/view", data);
});


/** 게시글 삭제 */
router.get("/delete/:idx", async (req, res) => {
	try {
		const idx = req.params.idx;
		const boardConf = await board.delete(idx, req);
		if (!boardConf) {
			throw new Error("삭제 실패하였습니다.");
		}
		
		return res.redirect("../list/" + boardConf.boardId);
		
	} catch (err) {
		return alert(err.message, res, -1);
	}
});

/** 게시글 수정 */
router.route("/update/:idx")
	/** 수정 양식 */
	.get(async (req, res) => {
		try {
			const idx = req.params.idx;
			const data = await board.get(idx);
			
			if (!data) {
				throw new Error('게시글이 없습니다.');
			}
			
			// 비회원 게시글인 경우는 비밀번호 확인 검증이 되었는지 체크 */
			if (!data.memNo && !req.session[`guestboard${idx}`]) {
				throw new Error('수정 권한이 없습니다.');
			}
			
			// 회원 게시글인 경우는 본인이 작성한 게시글인지 체크 
			if (data.memNo && (!req.isLogin || req.member.memNo != data.memNo)) {
				throw new Error('수정 권한이 없습니다.');
			}
			
			
			data.addScript = ["ckeditor/ckeditor", "board/form"];
			data.mode = "update";
			
			return res.render("board/form", data);
			
		} catch (err) {
			return alert(err.message, res, -1);
		}
	})
	/** 수정 처리 */
	.post(updateValidator, async (req, res) => {
		const idx = req.params.idx;
		req.body.idx = idx;

		const result = await board.update(req.body);
		if (!result) { // 게시글 수정 실패 -> 메세지 알림 
			return alert("게시글 수정 실패하였습니다.", res);
		}
		
		// 성공시 -> 게시글 보기로 이동 
		return go('../view/' + idx, res, "parent");
	});
	
	/** 
	 *댓글 작성 
	 *
	 * :idx - post - 원글 idx 
	         - get, patch, delete - 댓글 idx 
	 */
	router.use("/comment/:idx", commentAuthorityCheck);
	
	router.route("/comment/:idx")
			/** 댓글 작성 */
			.post(commentWriteValidator, async (req, res) => {
				const idxBoard = req.params.idx;
				req.body.idxBoard = idxBoard;
				const idx = await board.writeComment(req.body, req);
				if (!idx) { // 댓글 작성 실패 
					return alert("댓글 작성 실패 하였습니다.", res);
				}
				
				/** 댓글 작성 성공 -> 부모 URL + "#comment_{idx}" */
				return go(`../view/${idxBoard}?comment_idx=${idx}`, res, "parent")
			})
			/** 댓글 수정 처리 */
			.patch(async (req, res) => {
				const idx = req.params.idx;
				const mode = req.body.mode;
				if (mode == 'get_form') { // 수정 양식을 위한 데이터
					const comment = await board.getComment(idx);
					const data = {
						success : comment?true:false,
						data : comment?comment:{},
					};
					return res.json(data);
				} else { // 수정 처리 
					const result = await board.updateComment(idx, req.body.content);
					const data = {
						success : result,
						message : result?"수정하였습니다.":"수정에 실패하였습니다."
					};
					
					return res.json(data);
				}
			})
			/** 댓글 삭제 처리 */
			.delete(async (req, res) => {
				const idx = req.params.idx;
				
				const result = await board.deleteComment(idx);
				const data = {
					success : result,
					message : result?"댓글이 삭제되었습니다.":"댓글 삭제 실패하였습니다.",
				};
				
				return res.json(data);
			});


/** 비회원 비밀번호 체크 */
router.route("/check_password")
	.get((req, res) => { // 비밀번호 체크 양식
		const mode = req.query.mode;
		const idx = req.query.idx;
		if (!mode || !idx) {
			return alert("잘못된 접근입니다.", res);
		}
		
		return res.render("board/password", { mode, idx });
	})
	.post(async (req, res) => { // 비밀번호 체크 처리 
		const mode = req.body.mode;
		const idx = req.body.idx;
		if (!mode || !idx) {
			return alert("잘못된 접근입니다.", res);
		}
		let type = "board";
		if (mode.indexOf("comment") != -1) { // 댓글 수정, 삭제 
			type = "comment";
		} 
		
		const result = await board.checkPassword(idx, type, req);
		
		if (result) {
			let key = "";
			if (type == 'comment') { // 댓글 
				key = "guestcomment" + idx;
			} else { // 게시판 
				key = "guestboard" + idx;
			}
			
			if (key) { // 비회원 비밀번호 인증 성공시 세션에 true
				req.session[key] = true;
			}
			
		} else { // 검증 실패 
			return alert("비밀번호 확인에 실패하였습니다.", res);
		}
		// 검증 성공 
		const script = `<script>parent.callbackGuestPassword('${mode}', '${idx}')</script>`;
		return res.send(script);
	});

module.exports = router;