const router = require('express').Router();
			// /file
router.route("/")
		.get((req, res) => {
			res.render("file/form");
		})
		.post((req, res) => {
			req.on("data", (chunk) => {
				console.log(chunk);
			});
			
			req.on("end", () => {
				console.log("전송 완료!");
			});
			res.send("");
		});
	

module.exports = router;