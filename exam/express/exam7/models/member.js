const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

/**
* 회원관련 Model 
*
*/
const member = {
	/**
	* 회원 가입 처리 
	*
	* @param data 
	*/ 
	join : async function(data) {
		try {
			delete data.memPwRe;
			
			// 비밀번호 해시 처리 
			data.memPw = await bcrypt.hash(data.memPw, 10);
			
			const filePath = path.join(__dirname, "../data/member", data.memId + ".json");
			await fs.writeFile(filePath, JSON.stringify(data));
			
			return true;
		} catch (err) { // 회원 가입 실패 
			return false;
		}
	},
	/**
	* 로그인 처리 
	*	req인수가 추가된 이유 -> 로그인 아이디와 비번일 치하는 경우 세션에 회원 아이디를 저장하기 위한 용도
	*/
	login : async function(memId, memPw, req) {
		/**
				1. memId로 회원 정보 - O 
				2. 회원정보에 있는 비밀번호 해시와 memPw의 일치 여부 체크 - O 
				3. 일치하는 경우 -> req.session에 하위 속성으로 memId에 값을 대입 - O 
				4. 공통 미들웨어 -> 초기화 담당 미들웨어를 추가해서 로그인 데이터 전역 유지
				     (공통 미들웨어는 세션 미들웨어가 등록된 이후에 추가 해야 정상적으로 세션 데이터를 확인할 수 있다)
			
		*/
		try {
			const info = await this.get(memId);
			if (!info) { // 회원정보가 없는 경우 
				throw new Error('회원이 존재하지 않습니다.');
			}
			
			const match = await bcrypt.compare(memPw, info.memPw);
			if (match) { // 비밀번호 일치 
				req.session.memId = memId;
				
				return true;
			} else {
				throw new Error('비밀번호가 불일치 합니다.');
			}
		} catch (err) {
			return false; // 로그인 실패 
		}
	},
	/**
	* 회원정보 조회 
	*
	*/
	get : async function(memId) {
		try {
			
			const filePath = path.join(__dirname, "../data/member/" + memId + ".json");
			let data = await fs.readFile(filePath); // buffer -> 문자열(toString()) -> 객체(JSON.parse)
			data = JSON.parse(data.toString());
			return data;
		} catch (err) {
			return false;
		}
	}
};

module.exports = member;