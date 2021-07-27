/** 미들웨어 방식3 */
module.exports = function(data) {
		
		return function (req, res, next) {
			console.log("인수로 유입된 data", data);
			next();
		};
};