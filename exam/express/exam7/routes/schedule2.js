const express = require('express');
const schedule = require('../models/schedule2');
const router = express.Router();

router.use((req, res, next) => {
	res.locals.addCss = ["schedule"];
	next();
});

/** /schedule2/calendar */
router.get("/calendar", (req, res) => {
	const data = schedule.getCalendar(req.query.year, req.query.month);
	return res.render("schedule/calendar2", data);
});

module.exports = router;