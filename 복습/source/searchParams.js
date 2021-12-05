const { URL, format } = require('url');
const exURL = "http://www.yonggyo.com/?page=3&limit=10&category=nodejs&category=javascript";
const parsedURL = new URL(exURL);
const searchParams = parsedURL.searchParams;
console.log(searchParams);
const limit = searchParams.get("limit");
let category = searchParams.getAll("category");
console.log("limit : ", limit);
console.log("category : ", category);
searchParams.append("category", "vue.js"); // 추가

category = searchParams.getAll("category");
console.log("category : ", category);

searchParams.set("category", "java"); //  대체
category = searchParams.getAll("category");
console.log("category : ", category);

searchParams.delete("page");

// 쿼리스트링 문자열 형태로 변환 .toString();
const query = searchParams.toString();
console.log("query : ", query);
parsedURL.query = query;
parsedURL.search = "?" + query;

console.log("formated : ", format(parsedURL));