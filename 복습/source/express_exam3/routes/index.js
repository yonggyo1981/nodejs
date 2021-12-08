const express = require('express');
const memberRouter = require("./member");
const orderRouter = require("./order");
const fileRouter = require('./file');
const dbRouter = require('./database');
const router = express.Router();


router.use((req, res, next) => {
	//console.log(req.headers);
	//res.cookie("name", "david");
	//console.log(req.headers);
	//console.log("삭제전 : ", req.cookies);
	//res.clearCookie("name", "david");
	//console.log("삭제후 : ", req.cookies);
	//req.session.name = "david";
	//req.session.age = 40;
	//console.log(req.session);
	//console.log(req.session.name);
	//delete req.session.age;
	/**
	console.log(req.session);
	req.session.destroy();
	console.log(req.session);
	*/
	next();
});

/** 
* 회원 관련 
* /member/join, /member/login
*/
router.use("/member", memberRouter);

/** 
* 주문 관련 
* /order/cart, /order/form 
*/
router.use("/order", orderRouter);

/**
* 파일 관련 
* /file
*/
router.use("/file", fileRouter);

/**
* db 연습 관련 
* 
* /db 
*/
router.use("/db", dbRouter);

module.exports = router;