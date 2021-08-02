/**
* 공통 라이브러리
*
*/
const commonLib = {
	/**
	* 메세지 출력 팝업
	*
	* @param msg 출력 메세지
	* @param res  Response 객체, res.send 메서드 -> script 태그를 출력하여 실행
	* @param isBack true인 경우 - 뒤로가기
	*/
	alert : function(msg, res, isBack) {
		let script = "<script>";
		script += `alert('${msg}');`;
		if (isBack) {
			script += "history.back()";
		}
		script += "</script>";
		
		return res.send(script);
	}
};

module.exports = commonLib;