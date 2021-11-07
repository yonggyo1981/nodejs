const { alert } = require("../lib/common");
const boardModel = require("../models/board");

/**
* 게시판 관련 유효성 검사
*
*/
const board = {
	/** 필수 항목 */
	required : {
				gid : "잘못된 접근입니다.",
				poster : "작성자명을 입력하세요.",
				subject :  "제목을 입력하세요.",
				content : "내용을 입력하세요",
	},
	/** 댓글 필수 항목 */
	commentRequired : {
		poster : "작성자명을 입력하세요.",
		content : "댓글을 입력하세요.",
	},
	/**
	* 게시판 작성 데이터 유효성 검사 
	*
	*/
	writeValidator(req, res, next) {
		try {
			/** 필수 데이터 항목 S */
			const required = board.required;
			
			// 게시판 아이디 체크
			if (!required.idx && !req.params.id) { // 게시글 수정 -> 게시글 번호idx,  게시판 아이디 체크는 작성 시에만 하면 된다
				throw new Error("잘못된 접근입니다.");
			}
			// req.body
		
			/** 비회원 인 경우 -> 게시글 수정 비밀번호 체크 */
			if (!req.isLogin) {
				required.password = "글 수정 비밀번호를 입력하세요.";
			}
			
			for (key in required) {
				if (!req.body[key]) {
					throw new Error(required[key]);
				}
			}
			
			
			/** 필수 데이터 항목 E */
		} catch (err) {
			return alert(err.message, res);
		}
		next();
	},
	/**
	* 게시글 수정 유효성 검사 
	*
	*/
	updateValidator(req, res, next) {
		board.required.idx = "잘못된 접근입니다.";
		req.body.idx = req.params.idx;
		board.writeValidator(req, res, next);
	},
	/**
	* 댓글 작성 유효성 검사 
	*
	*/
	commentWriteValidator(req, res, next) {
		const required = board.commentRequired;
		if (!required.idx) { // 댓글 작성일때만 체크 
			req.body.idxBoard = req.params.idx;
			required.idxBoard = "잘못된 접근입니다.";
		}
		
		if (!req.isLogin) {
			required.password = "비회원 비밀번호를 입력하세요.";
		}
		
		try {
			for (let field in required) {
				if (!req.body[field]) {
					throw new Error(required[field]);
				}
			}
		} catch (err) {
			return alert(err.message, res);
		}
		
		next();
	},
	/**
	* 댓글 수정, 삭제 권한 체크 
	* (patch)      (delete)
	*/
	async commentAuthorityCheck(req, res, next) {
		const methods = ["PATCH", "DELETE"];
		const method = req.method.toUpperCase();
		if (methods.indexOf(method) != -1) {
			let isSuccess = false; // 검증 실패 
			let memberType = "guest";
			let message = "";
			
			const idx = req.params.idx;
			const data = await boardModel.getComment(idx);
			if (!data) {
			 return next();
			}
			/** 
			* 비회원 권한 체크
			* 비회원 일때 -> 비회원 비밀번호 검증이 되었는지 체크 
			* 검증이 안되어 있으면 -> 비밀번호 검증 페이지(comment.js) -> 비번 일치 -> 검증값(session)
			* 검증이 되어 있으면 -> 수정 양식 출력, 삭제 처리 
			* 세션에 검증 값을 넣어 주고 있으면 검증 성공
			*/
			if (!data.memNo) {
				const key = "guest_comment_" + idx;  // session 값이 true이면 검증 성공
				if (req.session[key]) { // 검증 성공 
					isSuccess = true;
					next();
				}
			} else {
				if (req.isLogin && data.memNo == req.member.memNo) {
					isSuccess = true;
					next();
				} else {
					message = "본인이 작성한 게시글만 " + ((method == 'DELETE')?"삭제":"수정") + "할 수 있습니다.";
				}
				memberType = "member";
			
			}
			
			/**
			*  memberType - guest 이고 isSuccess - false -> 비밀번호 확인 인증 페이지
			*/
			const result = {
				success : isSuccess,
				memberType,
				message,
			};
			return res.json(result);
		}
		next();
	}
};

module.exports = board;