module.exports = function(name) {
	return function(req, res, next) {
		console.log("매개변수가 있는 미들웨어 예시 - ", name); 
		next();
	};
}