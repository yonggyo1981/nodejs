const winston = require('winston');
const path = require('path');
const fs = require('fs').promises;
const constants = require('fs').constants;

/**
* message - 로그 기록 메세지 
* mode - 로그 레벨 - info, warn, error
*   
*  날짜/시간 -> 날짜 -> 파일명, 시간 - 메세지 앞에 시간 
*/ 
module.exports = async (message, mode) => {
	const logDir = path.join(__dirname, "../logs");
	try {
		mode = mode || 'info';
		
		const date = new Date();
		
		/** 파일명 - 날짜 형식으로 생성 */
		const year = date.getFullYear();
		let month = date.getMonth() + 1; // 0 ~ 11 
		month = (month < 10)?`0${month}`:month;
		
		let day = date.getDate();
		day = (day < 10)?`0${day}`:day;
		
		
		const filename = logDir + "/" + `${year}${month}${day}.log`;
		
		const logger = winston.createLogger({
			  level: 'info',
			  format: winston.format.json(),
			  defaultMeta: { service: 'general' },
			  transports: [
				new winston.transports.File({ filename }),
			  ],
		});
		 
		if (process.env.NODE_ENV !== 'production') {
		  logger.add(new winston.transports.Console({
			format: winston.format.simple(),
		  }));
		}
		
		logger.log({
			level : mode,
			message,
		});
	} catch (err) {
		
	}
};