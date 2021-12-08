const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const upload = multer({
	storage :  multer.diskStorage({
			destination(req, file, done) { // 파일이 저장될 디렉토리 경로
				done(null, path.join(__dirname, "..", "..", "public/upload"));
			},
			filename(req, file, done) { // 파일명 규칙 
				const uploadFileName = Date.now() + "_" + file.originalname;
				done(null, uploadFileName);
			}
	}),// 파일 저장 경로
	limits :  { fileSize :  1024 * 1024 * 10 },// 파일 용량 제한 
});

router.route("/")
		.get((req, res) => {
			//res.render("file/form");
			//res.render("file/form2");
			res.render("file/form3");
		})
		.post(upload.fields([{name : "file1"}, {name : "file2"}, {name : "file3"}]), (req, res) => {
			console.log("업로드된 파일 정보 : ", req.files);
			res.send("");
		});
		/*
		.post(upload.array("files"), (req, res) => {
			console.log("업로드된 파일 정보 : ", req.files);
			res.send("");
		});
		*/
		/*
		.post(upload.single('file'), (req, res) => {
			console.log("업로드된 파일 정보 : ", req.file);
			/*
			const fileData = [];
			req.on("data", (chunk) => {
				fileData.push(chunk);
			});
			
			req.on("end", () => {
				console.log(fileData.toString());
			});
			*/
			/*
			res.send("");
		});
		*/
	

module.exports = router;