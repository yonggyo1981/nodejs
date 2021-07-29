const express = require('express');
const router = express.Router();

/** 메인 페이지 */
router.get("/", (req, res) => {
	const data = {
		addCss : ["main", "main2"],
		addScript : ["main", "main2"],
		pageTitle : "변경된 사이트 제목..",
	}
	return res.render("main/index", data);
});

module.exports = router;