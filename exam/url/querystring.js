const url = require('url');
const querystring = require('querystring');
const originUrl = "http://www.yonggyo.com/?page=3&limit=10&category=nodejs&category=javascript";
const parsed = url.parse(originUrl);
//console.log(parsed);
const qs = querystring.parse(parsed.query); // 객체  -> 속성명으로 쉽게 접근이 가능
console.log("page", qs.page); 
console.log("limit", qs.limit);


const newQs = {
	page : 10,
	goodsNo : 1000,
	category : "의류",
};

const newQuery = querystring.stringify(newQs);
console.log("newQuery", newQuery);

// 분해된 url 결합 - format
const formattedUrl = url.format(parsed);
console.log("formattedUrl", formattedUrl);