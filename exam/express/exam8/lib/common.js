/** 
* 공통 라이브러리 
*
*/
const commonLib = {
	alert(msg, res) { 
		const script = `<script>alert('${msg}');</script>`;
		return res.send(script);
	}
};

module.exports = commonLib;