const router = require('express').Router();

router.get("/upload", (req, res) => {
	return res.send("업로드!!!");
});

module.exports = router;