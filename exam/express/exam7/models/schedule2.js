const schedule2 = {
	getYoils() {
		return ["일", "월", "화", "수", "목", "금", "토"];
	},
	getCalendar(year, month) {
		let date = new Date();
		year = year || date.getFullYear();
		month = month || date.getMonth() + 1;
		
		date = new Date(year, month - 1, 1); // 매달의 1일
		const yoil = date.getDay(); // 0 ~ 6 
		const start = yoil * -1;
		const end = start + 42;
		
		/**
		timstamp -> 1970, 1,1 자정, 1000분의 1초 간격으로 센 정수
		*/
		const startStamp = date.getTime();
		const oneDayStamp = 1000 * 60 * 60 * 24;
		
		let nextMonthDays = 0;
		// startStamp 보다 작으면 -> 이전달,
		// startStamp보다 크고, date의 month가 newDate의 month보다 작은 경우 -> 다음달 
		const days = [];
		for (let i = start; i < end; i++) {
			const stamp = startStamp + oneDayStamp * i;
			const newDate = new Date(stamp);
			days.push({
				stamp,
				day : newDate.getDate(),
			});
			
			if (startStamp < stamp && date.getMonth() < newDate.getMonth()) { // 다음달 
				nextMonthDays++;
			}
		}
		
		if (nextMonthDays > 7) { // 다음달이 1주 더 표기되고 있으면 35칸으로 줄여서 1주를 제거 
			days.length = 35;
		}
		
		/** 이전달 */
		const prevDate = new Date(startStamp - oneDayStamp);
		const prevYear = prevDate.getFullYear();
		const prevMonth = prevDate.getMonth() + 1;
		
		/** 다음달 */
		const nextDate = new Date(startStamp + oneDayStamp * 32);
		const nextYear = nextDate.getFullYear();
		const nextMonth = nextDate.getMonth() + 1;
		
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

module.exports = schedule2;