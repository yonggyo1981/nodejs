/**
* 회원 관련 유효성 검사 미들웨어
*
*/

/** 회원가입 유효성검사 */
module.exports.joinValidator = (req, res, next) => {
	/**
		1. 필수 항목 체크(memId, memPw, memPwRe, memNm)
		2. 아이디와 비밀번호 자리수 - 6자리 이상
		3. 이미 가입된 회원인지 여부
		
		객체 -> for 속성명 in 객체
	*/
	const required = {
		memId : "아이디를 입력하세요",
		memPw : "비밀번호를 입력하세요",
		memPwRe : "비밀번호를 확인해 주세요.",
		memNm : "회원명을 입력해 주세요."
	};
	
	try {
		for (key in required) {
			if (!req.body[key]) { // 필수 항목 데이터가 없는 경우 
				throw new Error(required[key]);
			}
		}
	} catch (err) { 
		// 유효성 검사 실패시 유입되는 부분, 메세지 출력 후 뒤로가기
	}
	
	
	next();
};