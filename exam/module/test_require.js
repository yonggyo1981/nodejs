//const odd = require('test_module.js'); // 내장 모듈 또는 외부 설치 모듈(node_modules)
//const odd = require("./test_module.js"); // 상대 경로, 절대경로를 명시
//const odd = require("./test_module"); // .js - 생략 가능 
//const odd = require("./member/index"); 
//const odd = require("./member"); // index.js 생략 가능

//console.log("odd", odd);
/*
const sum = require("./test_module");
const result = sum(3,5);
console.log("sum", sum);
console.log("result", result);
*/
/*
const member = require("./test_module");
member.login();
member.logout();
member.join();
member.update();
*/
const { login, logout, join, update } = require("./test_module");
login();
logout();
join();
update();