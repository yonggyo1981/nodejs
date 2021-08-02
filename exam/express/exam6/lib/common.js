/**
* 공통 기능 
*
*
*/
const commonLib = {
	/** 메세지 출력 팝업 */
	alert : function(msg, res, isBack) {
		let script = "<script>";
		script += `alert('${msg}');`;
		if (isBack) { // 뒤로가 가기가 true인 경우
			script += "history.back();";
		}
		script += "</script>";
		return res.send(script);
	},
	/** 뒤로 돌아가기 history.back() */
	back : function(res) {
		return res.send(`<script>history.back()</script>`);
	}
};

module.exports = commonLib;