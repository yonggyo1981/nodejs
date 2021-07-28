const winston = require('winston');
const path = require('path');
const fs = require('fs').promises;
const constants = require('fs').constants;

/**
* 로그 기록 함수
*		- 개발중 - 콘솔 출력, 서비스 중 - 파일 로그로 기록 
*
* message - 출력할 메세지
* mode - 출력 모드 - info, warn, error 
*/
module.exports = async (message, mode) => {
	const logPath = path.join(__dirname, "../logs");
	try {
		mode = mode || 'info'; // mode의 기본값은 info 
		const date = new Date();
		
		/** 로그 파일 경로 */
		const year = date.getFullYear(); 
		let month = date.getMonth() + 1 ; // 1, 2
		month = (month < 10)?`0${month}`:month;
		
		let day = date.getDate();
		day = (day < 10)?`0${day}`:day;
		
		let filename = `${year}${month}${day}.log`;
	
		
		// logPath 디렉토리 존재 여부 체크 
		await fs.access(logPath, constants.F_OK);
		
		
		filename = logPath + "/" + filename;
		
		/** 메세지 추가 시간 */
		let hours = date.getHours();
		hours = (hours < 10)?`0${hours}`:hours;
		
		let mins = date.getMinutes();
		mins = (mins < 10)?`0${mins}`:mins;
		
		let secs = date.getSeconds();
		secs = (secs < 10)?`0${secs}`:secs;
		
		message = `[${hours}:${mins}:${secs}]${message}`;
		
		
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
			message, // message : message
		});
	} catch (err) {
		if (err.code == 'ENOENT') {
			// logs 폴더가 없는 경우 
			await fs.mkdir(logPath);
		}
	}
};