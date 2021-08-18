const member = require('../models/member');
const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
	const list = await member.getList();
	return res.render("main/index", { list });
});

module.exports = router;