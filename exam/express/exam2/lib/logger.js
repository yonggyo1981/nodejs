const winston = require('winston');
const path = require('path');
const fs = require('fs').promises;
const constants = require('fs').constants; // F_OK 

module.exports = async (message, mode) => {
	const logDir = path.join(__dirname, "../logs");
	try {
		await fs.access(logDir, constants.F_OK);

		mode = mode || 'info';
		
		const date = new Date();
		const year = date.getFullYear();
		let month = date.getMonth() + 1; // 0 ~ 11
		month = (month < 10)?`0${month}`:month;
		
		let day = date.getDate();
		day = (day < 10)?`0${day}`:day;
		
		const filename = logDir + "/" + `${year}${month}${day}.log`;
		
		/** 메세지 기록 시간 */
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
			message, // message : message,
		});
	} catch (err) {
		// fs.access가 logDir을 접근 할수 없는 경우, err.code == 'ENOENT' -> 폴더 없음
		if (err.code == 'ENOENT') { // 폴더 없음
			 await fs.mkdir(logDir);
		}
	}
};