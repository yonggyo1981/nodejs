const router = require('express').Router();
const { sequelize, Sequelize : { QueryTypes } } = require("../../models");

router.get("/", async (req, res, next) => {
	const sql = "SELECT * FROM worklist WHERE status = ?";
	const replacements = ["ready"];
	try {
		const rows = await sequelize.query(sql, {
			replacements, 
			type : QueryTypes.SELECT,
		});
		
		res.render("db/list", { rows });
	} catch (err) {
		next(err);
	}
	/*
	sequelize.query(sql, {
		// 바인딩할 값 - 배열객체(키 값으로 바인딩 필요 X)[],  일반 객체(키값으로 바인딩할 때) - {}
		replacements : replacements, 
		type : QueryTypes.SELECT,
	})
	.then((rows) => {
		console.log(rows);
	})
	.catch((err) => {
		console.error(err);
	});
	*/
	
	
});

module.exports = router;
