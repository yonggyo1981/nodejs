const express = require('express');
const board = require('../models/board');
const router = express.Router();

/** /board/write */
router.route("/write")
	.get((req, res) => {
		/** 작성 양식 */
		return res.render("board/form");
	})
	.post(async (req, res) => {
		const num = await board.write(req.body);
		console.log("num", num);
	});

module.exports = router;