const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const uploadFile = require("../../models/uploadFile");

const upload = multer({
	storage : multer.diskStorage({
		destination(req, file, done) { // 업로드될 경로
			done(null, path.join(__dirname, "..", "..", "/public/uploads"));
		},
		async filename(req, file, done) { // 업로드될 파일명
			/**
			* 1. 파일 정보(file) -> DB 추가
			* 2. DB 추가시 -> idx(추가된 증감번호)
			* 3. idx -> 파일명
			*/
			const idx = await uploadFile.insertInfo(file);
			const folder = idx % 10;
			
			done(null, "" + folder + "/" + idx);
		}
	}),
	limits : { fileSize : 5 * 1024 * 1024 }, // 5mb
});


/**
* 파일 업로드 
*
*/
router.route("/upload")
	.get((req, res) => {
		return res.render("file/upload");
	})
	.post(upload.single('file'), (req, res) => { // 이미지 업로드 처리 
		
		return res.send("submit!!");
	});

/** 파일 다운로드 */
router.get("/download/:idx", (req, res) => {
	/**
	* 출력 헤더 
			- Content-Type : application/octet-stream
			- Content-Disposition: attachment; filename=다운로드될 파일명
	*
	*/
	res.header("Content-Type", "application/octet-stream");
	res.header("Content-Disposition", "attachment; filename=test.txt");
	res.send("다운로드 테스트!");
});

module.exports = router;