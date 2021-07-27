const express = require('express');
const router = express.Router();

// /order/cart
router.get("/cart", (req, res) => {
	return res.send("장바구니 페이지....");
});

// /order/process
router.get("/process", (req, res) => {
	return res.send("주문서 페이지...");
});

// /order/done
router.get("/done", (req, res) => {
	return res.send("주문완료 페이지...");
});

module.exports = router;