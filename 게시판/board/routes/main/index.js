const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
	const data = {
			addCss : ["main", "main2"],
			addScript : ["main", "main2"],
	};
	return res.render("main/index", data);
});

module.exports = router;