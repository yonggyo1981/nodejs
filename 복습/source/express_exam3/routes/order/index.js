const express = require('express');
const router = express.Router();

/** /order/cart */
router.get("/cart", (req, res) => {
	res.send("장바구니");
});

/** /order/form */
router.get("/form", (req, res) => {
	res.send("주문신청");
});

module.exports = router;