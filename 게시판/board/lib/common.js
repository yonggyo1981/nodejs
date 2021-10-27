/**
* 공통 라이브러리 
*
*/
const commonLib = {
	/**
	* window.alert 메세지 출력 
	*
	* @param msg 출력 메세지
	* @param res - response 인스턴스
	* @param step - history.go(step) -> 음수 이면 이전페이지(back), 양수 다음페이지(forward)
	*/
	alert(msg, res, step) {
		let script = `<script>alert("${msg}");</script>`;
		if (step) {
			script += `<script>history.go(${step});</script>`;
		}
		
		res.send(script);
	},
	/**
	* location.href를 사용하는 페이지 이동 
	* 
	* @param url 이동할 URL 
	* @param res - response 인스턴스
	* @param target - self(기본값) | parent -> 부모창 
	*/
	go(url, res, target) {
		target = target || "self";
		
		const script = `<script>${target}.location.href='${url}';</script>`;
		res.send(script);
	},
	/**
	* 새로고침 
	*
	* @param res - response 인스턴스
	* @param target - 기본값 self - 현재 창,  parent - 부모창 
	*/
	reload(res, target) {
		target = target || 'self';
		
		const script = `<script>${target}.location.reload();</script>`;
		res.send(script);
	},
	/**
	* Unique ID  - 밀리초 단위 timestamp 
	* new Date().getTime();
	* Date.now();
	*/
	uid() {
		return Data.now();
	}
};

module.exports = commonLib;