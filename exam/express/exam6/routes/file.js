const express = require('express');
const multer = require('multer');
const router = express.Router();

/** multer 설정 부분 const upload = multer({ ... 설정 ... }); */


router.get("/", (req, res) => {
	return res.render("file");
});


module.exports = router;