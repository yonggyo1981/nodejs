const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

/** 
* 회원 관련 Model 
*
*/
const member = {
	/**
	* 회원 가입 처리..
	*
	* 회원 데이터를 data/member 디렉토리에 저장
	*  파일명은 회원 아이디.json
	* @return Boolean 가입 성공시 true, 실패시 false
	*/
	join : async function(data) {
		try {
			delete data.memPwRe;
			
			/** 비밀번호를 bcrypt 방식의 유동해시로 변환 */
			data.memPw = await bcrypt.hash(data.memPw, 10);
			
			const filePath = path.join(__dirname, "../data/member", data.memId + ".json");
			/**
			* data는 문자열로만 기입이 가능 
			* JSON 
			*		.parse  - 문자 형태의 JSON을 실제 자바스크립트 객체 변환 
			*       .stringify - 자바스크립트 객체 -> 문자열 형태의 JSON 데이터로 변환
			*/
			await fs.writeFile(filePath, JSON.stringify(data));
			
			return true; // 가입 성공시 true를 반환
		} catch (err) {
			console.error(err);
			return false; // 가입 실패시 false를 반환 
		}
	}
};

module.exports = member;