const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	const data = {
		addCss : ["main/order", "cart/common", "main2"],	
		addScript : ["main/order", "cart/common", "main2", "main3"],
		pageTitle : "변경된 제목...",
	};
	return res.render("main/index", data);
});

module.exports = router;