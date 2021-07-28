const winston = require('winston');

/**
* 로그 기록 함수
*		- 개발중 - 콘솔 출력, 서비스 중 - 파일 로그로 기록 
*
* message - 출력할 메세지
* mode - 출력 모드 - info, warn, error 
*/
module.exports = (message, mode) => {
	mode = mode || 'info'; // mode의 기본값은 info 
	
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
		message, // message : message
	});
};