const express = require('express');
const router = express.Router();

/** 메인 페이지 */
router.get("/", (req, res) => {
	
	return res.render("main/index");
});

module.exports = router;