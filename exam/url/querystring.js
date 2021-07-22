const url = require('url');
const querystring = require('querystring');
const originUrl = "http://www.yonggyo.com/?page=3&limit=10&category=nodejs&category=javascript";
const parsed = url.parse(originUrl);
//console.log(parsed);
const qs = querystring.parse(parsed.query); // 객체 
console.log(qs);