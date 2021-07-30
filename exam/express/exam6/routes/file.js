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

/** 파일 하나 업로드 - upload.single('file') - req.file -> 업로한 파일 정보 */
/** /file/upload */
router.post("/upload", upload.single('file'), (req, res) => {
	console.log(req.file);
	return res.send("");
});

/** 파일 여러개 업로드 - upload.array('file') - req.files -> 업로드한 파일 정보 배열 객체 */
/** /file/upload2 */
router.post("/upload2", upload.array('file'), (req, res) => {
	console.log(req.files);
	return res.send("");
});

/** 파일 여러개를 항목별로 업로드 - upload.fields([
{name : 'file name속성'}, {name : 'file name 속성' }
]) - req.files -> 업로드한 파일 정보 배열 객체 
*/
/** /file/upload3 */
router.post("/upload3", upload.fields([{ name : "file1" }, { name : "file2" }]), (req, res) => {
	console.log(req.files);
	return res.send("");
});

module.exports = router;