const bcrypt = require('bcrypt');
/**
* bcrypt - 유동 해시 (값은 값이더라도 해시값은 계속 변경되는 방식)
*
*/

(async function() {
	const data = "abcd1234";
	const hash = await bcrypt.hash(data, 10);
	console.log(data, hash);
	
	const passwd = "abcd12345";
	const match = await bcrypt.compare(passwd, hash);
	if (match) {
		console.log("비밀번호 일치");
	} else {
		console.log("비밀번호 불일치");
	}
})();
