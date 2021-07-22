//const odd = 3;
//const even = 10;

//module.exports = odd;

/*
const sum = function (a, b) {
	return a + b;
};

module.exports = sum;
*/

const member = {
	login : function (memId, memPw) {
		console.log("로그인 실행");
	},
	logout : function() {
		console.log("로그아웃");
	},
	join : function() {
		console.log("회원가입");
	},
	update : function() {
		console.log("회원정보 수정");
	}
};

module.exports = member;