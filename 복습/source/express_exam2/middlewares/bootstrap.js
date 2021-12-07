function bootStrap (req, res, next) {
	console.log("bootstrap");
	next();
}

module.exports = bootStrap;