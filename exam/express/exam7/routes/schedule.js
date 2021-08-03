const express = require('express');
const schedule = require('../models/schedule');
const router = express.Router();

/**
* /schedule 
		- GET - 스케줄 등록/수정 양식
		- POST - 스케줄 등록  처리 
		- DELETE - 스케줄 삭제 처리
		- PATCH - 스케줄 수정 처리
		
* /schedule/calendar - GET - 스케줄 달력에 목록 
* 
*/

/** /schedule 공통 라우터 */
router.use((req, res, next) => {
	res.locals.addScript = ["schedule", "layer"];
	res.locals.addCss = ["schedule"];
	next();
});

/** /schedule */
router.route("/") 
	.get((req, res) => { // 스케줄 등록/수정 양식
		
	})
	.post((req, res) => { // 스케줄 등록 처리 
		
	})
	.patch((req, res) => { // 스케줄 수정 처리 
		
	})
	.delete((req, res) => { // 스케줄 삭제 처리 
		
	});

/** 스케줄 달력 */
router.get("/calendar", (req, res) => {
	const data = schedule.getCalendar(req.query.year, req.query.month);
	return res.render("schedule/calendar", data);
});

module.exports = router;