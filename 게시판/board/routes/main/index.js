const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
	const data = {
			
	};
	return res.render("main/index", data);
});

module.exports = router;