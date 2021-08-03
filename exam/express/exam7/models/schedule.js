/**
* 스케줄 관련 기능 
*
*/
const schedule = {
	/**
	* 달력의 일자를 추출 
	*
	*/ 
	getCalendar(year, month) {
		// year, month가 없는 경우는 이번달 기준 
		const date = new Date();
		
		year = year || date.getFullYear();
		month = month || date.getMonth() + 1;
		
		
	}
};

module.exports = schedule;