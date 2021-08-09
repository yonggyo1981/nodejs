const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const member = {
	/** 회원가입 */
	async join(data) {
		/**
		* data/member/아이디.json
		* 해시 - 단방향 암호화 ( 동일한 데이터 - 동일한 해시) - md5, sha1, sha256, sha512 ... 
								- 동일한 데이터 - 유동적인 해시(bcrypt)
								
			JSON.stringify -> JSON 객체 -> 문자열 
			JSON.parse -> 문자열 -> JSON 객체
		*/ 
		try {
			data.memPw = await bcrypt.hash(data.memPw, 10);
			delete data.memPwRe;
			
			const filePath = path.join(__dirname, "../data/member", data.memId + ".json");
			await fs.writeFile(filePath, JSON.stringify(data)); // 파일 데이터 버퍼, 문자열
			
			return true; // 회원 가입 성공 
		} catch (err) {
			return false; // 회원 가입 실패 
		}
	},
	async login(memId, memPw, req) {
		/**
			1. 아이디 -> 회원 정보를 조회 - O 
			2. 회원정보의 비밀번호 해시와 회원이 입력한 비밀번호의 일치 여부
			3. 일치하는 경우 -> 세션에 회원을 구분할 수 있는 값을 저장(회원아이디 또는 회원번호)
									(로그인!!)
		*/
		try {
			const info = await this.get(memId);
			if (!info) { // false -> 회원정보 X 
				throw new Error("회원정보 없음.");
			}
			
			const match = await bcrypt.compare(memPw, info.memPw);
			if (match) { // 회원 아이디, 비밀번호가 일치 
				req.session.memId = memId; // 세션에 회원 아이디 등록  -> 로그인
				return true;
			}
			
			throw new Error("비밀번호 불일치");
		} catch (err) {
			return false; // 로그인 실패
		}
	},
	/** 회원 정보 조회 */
	async get(memId) {
		try {
			const filePath = path.join(__dirname, "../data/member", memId + ".json");
			let data = await fs.readFile(filePath); 
			// 버퍼 -> 문자열(toString()) -> JSON 객체(JSON.parse)
			
			data = JSON.parse(data.toString());
			
			return data;
		} catch (err) {
			return false;
		}
	}
};

module.exports = member;