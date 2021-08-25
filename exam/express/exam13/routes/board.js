const express = require('express');
const { sequelize, Sequelize : { QueryTypes } } = require("../models");
const router = express.Router();
// /board/write - GET - 양식, POST - 등록  
// /board/view/:num - GET
/**
GET - URL의 쿼리스트링 형태(키=값&키=값) - req.query
	 - /view/:num (URL 변수) - req.params 
	   
POST - req.body -> body parser가 미들웨어에 추가된 이후

*/

router.route("/write")
	.get((req, res) => {
		// 게시글 등록 양식 
		return res.render("form");
	})
	.post(async (req, res) => {
			// 게시글 등록 
			/**
				1. 순서대로 바인딩 - 배열 형태 
					replacements : [req.body.boardTitle, req.body.boardContents]
					// 바인딩 데이터가 적은 경우 
					
				2. 객체 형태(키: 값) - 순서 관계 없이 키, 값만 체크
					// 바인딩 데이터가 많은 경우 
			*/
			
			//const sql = "INSERT INTO board (boardTitle, boardContents) VALUE (?, ?)";
			const sql = "INSERT INTO board (boardTitle, boardContents) VALUE (:boardTitle, :boardContents)";
			const result = await sequelize.query(sql, {
				//replacements : [req.body.boardTitle, req.body.boardContents],
				replacements : { boardTitle : req.body.boardTitle, boardContents : req.body.boardContents },
				type : QueryTypes.INSERT,
			});
			const num = result[0]; // 게시글 번호(Primary Key + Auto Increment)
		
			return res.redirect("/board/view/" + num);
			
	});

router.get("/view/:num", async (req, res) => {
	const num = req.params.num;
	const sql = "SELECT * FROM board WHERE num = ?"; 
	const result = await sequelize.query(sql, {
		replacements : [num],
		type : QueryTypes.SELECT,
	});
	const data = result[0];
	
	return res.render("view", data);
});

module.exports = router;