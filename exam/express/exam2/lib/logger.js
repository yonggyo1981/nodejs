const winston = require('winston');

module.exports = (message, mode) => {
	mode = mode || 'info';
	
	const date = new Date();
	const year = date.getFullYear();
	let month = date.getMonth() + 1; // 0 ~ 11
	month = (month < 10)?`0${month}`:month;
	
	let day = date.getDate();

	
	const logger = winston.createLogger({
		  level: 'info',
		  format: winston.format.json(),
		  defaultMeta: { service: 'general' },
		  transports: [
			new winston.transports.File({ filename: 'combined.log' }),
		  ],
		});
		 

	if (process.env.NODE_ENV !== 'production') {
		logger.add(new winston.transports.Console({
			format: winston.format.simple(),
		}));
	}
	
	logger.log({
		level : mode,
		message, // message : message,
	});
};