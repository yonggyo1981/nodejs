module.exports = mode => {
	console.log(mode + "에 따라서 다르게 처리하는 부분...");
	
	return (req, res, next) => {
		
		next();
	};
};