const url = require('url');
const { URL } = url;
const querystring = require('querystring');

const exUrl = 'http://www.yonggyo.com/book/bookList.aspx?cate=001001001#anchor';
const parsedUrl = url.parse(exUrl);
console.log("url.parse() : ", parsedUrl);
const qs = querystring.parse(parsedUrl.query);
qs.goodsNo = 1000;
console.log("qs : ", qs);
console.log("querystring.stringify() : ", querystring.stringify(qs));
parsedUrl.query = querystring.stringify(qs);
parsedUrl.search = "?" + parsedUrl.query;
console.log("url.format() : ", url.format(parsedUrl));

const parsedURL = new URL(exUrl);
console.log("url.URL : ", parsedURL);
console.log("url.format() : ", url.format(parsedURL));