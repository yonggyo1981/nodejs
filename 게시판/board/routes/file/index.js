const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const uploadFile = require("../../models/uploadFile");
const { uid } = require("../../lib/common");

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
			* 4. file 객체 -> req.body.gid, req.body.uploadType
			*/
			file.gid = req.body.gid;
			file.uploadType = req.body.uploadType;
			
			const idx = await uploadFile.insertInfo(file);
			const folder = idx % 10;
			file.idx = idx;
			
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
		/**
		* GET - req.query, req.params
		* POST - req.body
		*/
		const uploadType = req.query.type || "";
		const gid = req.query.gid;
		const data = {
			uploadType,
			gid,
		};
		return res.render("file/upload", data);
	})
	.post(upload.single('file'), async (req, res) => { // 이미지 업로드 처리 
		let fileInfo = await uploadFile.get(req.file.idx);
		fileInfo = JSON.stringify(fileInfo);
		return res.send(`<script>parent.callbackFileUpload(${fileInfo});</script>`);
	});

/** 파일 다운로드 */
router.get("/download/:idx", async (req, res) => {
	uploadFile.download(req.params.idx, res);
});

/** 파일 삭제 */
router.get("/delete/:idx", async (req, res) => {
	const result = await uploadFile.delete(req.params.idx);
	if (result) {
		return res.send("1");
	}
	return res.send("");
});

module.exports = router;