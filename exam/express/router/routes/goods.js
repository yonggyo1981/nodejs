const express = require('express');
const router = express.Router();

// /goods/list
router.get("/list", (req, res) => {
	return res.send("상품목록 페이지...");
});

// /goods/view
router.get("/view", (req, res) => {
	return res.send("상품상세 페이지...");
});

module.exports = router;