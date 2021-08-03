const express = require('express');
const schedule = require('../models/schedule');
const { alert } = require('../lib/common');
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
	.get(async (req, res) => { // 스케줄 등록/수정 양식
		const stamp = Number(req.query.stamp); //  문자열 -> 숫자
		const date = new Date(stamp);
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = (month < 10)?`0${month}`:month;
		
		let day = date.getDate();
		day = (day < 10)?`0${day}`:day;
		
		const scheduleDate = `${year}${month}${day}`;
		
		let data = await schedule.get(scheduleDate);
		data = data || {};
		data.date = scheduleDate;
		
		return res.render("schedule/form", data);
	})
	.post(async (req, res) => { // 스케줄 등록 처리 
		const result = await schedule.update(req.body);
		if (result) { // 스케줄 등록/수정 성공 - 달력 페이지 새로고침
			return res.send("<script>parent.parent.location.reload();</script>");
		}
		
		// 스케줄 등록/수정 실패
		return alert("스케줄 등록/수정 실패하였습니다.", res);
	});

/** 스케줄 달력 */
router.get("/calendar", async (req, res) => {
	const data = await schedule.getCalendar(req.query.year, req.query.month);
	return res.render("schedule/calendar", data);
});


/** 스케줄 삭제 */
router.get("/:date", async (req, res) => {
	const result = await schedule.delete(req.params.date);
	if (result) { // 삭제 성공 
		return res.send("<script>parent.parent.location.reload();</script>");
	}
	
	// 삭제 실패 
	return alert('삭제 실패하였습니다.', res);
});

module.exports = router;