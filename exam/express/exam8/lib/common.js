/** 
* 공통 라이브러리 
*
*/
const commonLib = {
	alert(msg, res) { 
		const script = `<script>alert('${msg}');</script>`;
		return res.send(script);
	},
	go(url, res, target) {
		target = target || "self";
		const script = `<script>${target}.location.href='${url}';</script>`;
		return res.send(script);
	}
};

module.exports = commonLib;