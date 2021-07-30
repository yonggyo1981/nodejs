const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

/** multer 설정 부분 const upload = multer({ ... 설정 ... }); */
const upload = multer({
	storage : multer.diskStorage({
		destination(req, file, done) {
			done(null, path.join(__dirname, "../public/upload"));
		},
		filename(req, file, done) {
			/**
			 파일명 + timestamp + 확장자 -> 중복을 방지 
			*/
			const ext = path.extname(file.originalname);
			const filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;
			done(null, filename);
		},
	}),
	limits : { fileSize: 10 * 1024 * 1024 }, // 10mb
});

router.get("/", (req, res) => {
	return res.render("file");
});


module.exports = router;