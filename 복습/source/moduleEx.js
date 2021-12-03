//const a = require("moduleA.js"); // 상대경로, 절대경로 명시 X -> 1) 내장모듈, 2) node_modules에서 찾는다
//const a = require("./moduleA.js"); // 사용자 정의 모듈 ...

// 확장자 .js, .json 생략 가능 
//const a = require("./moduleA");
//console.log(a);

//const sum = require("./models/index"); // index.js 는 생략 가능 
//const sum = require("./models"); // ./models/index.js
//console.log(sum(10, 20));
//const express = require('express');// 1. 내장모듈, 2. node_modules에서
//console.log(express);