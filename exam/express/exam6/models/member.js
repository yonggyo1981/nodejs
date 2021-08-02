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
	},
	/**
	* 로그인 처리 
	*		회원 아이디, 비번
	*			1. 회원아이디를 통해서 가입된 회원 정보를 조회 - O
	*			2. 회원 정보의 비밀번호 해시와 입력된 비밀번호를 비교 -> 일치하면  - O
	*			3. 일치하면 
						세션에 비밀번호가 일치하는 회원의 아이디를 저장 - O
						req.session의 하위 속성으로 등록 (req 객체 -> 세션을 사용하기 위해)
				4. 전역 적용 미들웨어 세션에 저장된 아이디를 통해  - bootStrap
					회원 정보를 조회 -> 전역에 유지
	*/
	login : async function (memId, memPw, req) {
		try {
			const info = await this.get(memId);
			if (!info) {
				throw new Error('회원 정보가 없습니다.');
			}
			
			const match = await bcrypt.compare(memPw, info.memPw);
			if (!match) { // 비밀번호 불일치 
				throw new Error('비밀번호 불일치');
			}
			
			// 세션에 회원 아이디를 저장 
			req.session.memId = memId;
			return true; // 비밀번호 일치 
			
		} catch (err) { // 회원정보가 없거나, 비밀번호가 일치 하지 않으면 로그인 실패 
			return false;
		}
		
	},
	/**
	* 회원 정보 조회(파일 조회)
	*
	* @param memId - 회원 아이디
	* @return 회원 데이터(객체), 없으면 false
	*/
	get : async function(memId) {
		try {
			if (!memId)  // 아이디가 빈값, undefined인 경우 
				return false;
			
			const filePath = path.join(__dirname, "../data/member", memId + ".json");
			let data = await fs.readFile(filePath); // 버퍼 데이터. toString()
			data = JSON.parse(data.toString()); // 버퍼 -> 문자열 -> 객체
			
			return data;
		} catch (err) {
			return false; // 파일이 없는 경우, 읽지 못하는 경우 
		}
	}
};

module.exports = member;