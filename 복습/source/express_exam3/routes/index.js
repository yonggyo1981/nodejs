const express = require('express');
const memberRouter = require("./member");
const orderRouter = require("./order");
const router = express.Router();


router.use((req, res, next) => {
	//console.log(req.headers);
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

module.exports = router;