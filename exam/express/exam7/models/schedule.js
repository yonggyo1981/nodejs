/**
* 스케줄 관련 기능 
*
*/
const schedule = {
	/**
	* 요일 
	*
	*/
	getYoils() {
		const yoils = ["일", "월", "화", "수", "목", "금", "토"];
		return yoils;
	},
	/**
	* 달력의 일자를 추출 
	*
	*/ 
	getCalendar(year, month) {
		// year, month가 없는 경우는 이번달 기준 
		let date = new Date();
		year = year || date.getFullYear();
		month = month || date.getMonth() + 1;
		
		// 이달의 첫 일자의 요일의 순서번호 -> 처음 달력의 시작 위치
		// 2021, 9, 1,  month 0 ~ 11  9월 - 8 
		date = new Date(year, month - 1, 1);
		const yoil = date.getDay();
		
		// timestamp 형식으로 변환 -> 하루치 만큼 더해주면 된다. 1970, 1, 1 자정 1000분의 1초 단위로 센 숫자
		// 하루 - 1000 * 60 * 60 * 24 
		
		const days = []; // 달력 일자
		const startStamp = date.getTime();
		const start = yoil * -1;  
		const end = start + 42;
		/**
			다음달 추가 일수가 7일 이상이면 칸수를 35칸으로 줄여서, 1주가 출력이 안되도록 
			startStamp보다 크고,  -> 작으면 이전달
			month가 서로 다르면 다음달
		*/
		let nextMonthDays = 0;
		for (let i = start; i < end; i++) {
			const stamp = startStamp + (1000 * 60 * 60 * 24 * i);
			const newDate = new Date(stamp);
			days.push({
				stamp : stamp,
				day : newDate.getDate(),
			});
			
			if (stamp > startStamp && newDate.getMonth() > date.getMonth()) { // 다음달 일
				nextMonthDays++;
			}
		}
		
		if (nextMonthDays > 7) { // 다음달이 1주보다 더 많으면 칸을 35칸으로 변경 
			days.length = 35;
		}
		
		/** 이전달 년, 월 */
		const oneDayStamp = 1000 * 60 * 60 * 24;
		const lastMonthDate = new Date(startStamp - oneDayStamp); 
		const prevYear = lastMonthDate.getFullYear();
		const prevMonth = lastMonthDate.getMonth() + 1;
		
		/** 다음달 년, 월 */
		const nextMonthDate = new Date(startStamp + oneDayStamp * 32);
		const nextYear = nextMonthDate.getFullYear();
		const nextMonth = nextMonthDate.getMonth() + 1;
		
		const data = {
			prevYear, 
			prevMonth, 
			nextYear,
			nextMonth,
			year,
			month,
			days,
			yoils : this.getYoils(),
		};
		
		return data;
	}
};

module.exports = schedule;