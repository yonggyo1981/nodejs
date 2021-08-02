const crypto = require('crypto');
/** sha512 알고리즘 해시 */
/**
 해시  - 같은 값에 대해서는 동일한 해시값
*/
const data = "abcd1234";
const data2 = "abcd12345";
const hash = crypto.createHash("sha512").update(data).digest("hex");
const hash2 = crypto.createHash("sha512").update(data2).digest("hex");

console.log(hash);
console.log(hash2);

const hash3 = crypto.createHash("sha256").update(data).digest("hex");
const hash4 = crypto.createHash("sha256").update(data2).digest("hex");

console.log("sha256", hash3);
console.log("sha256", hash4);


const hash5 = crypto.createHash("md5").update(data).digest("hex");
const hash6 = crypto.createHash("md5").update(data2).digest("hex");

console.log("md5", hash5);
console.log("md5", hash6);


const hash7 = crypto.createHash("sha1").update(data).digest("hex");
const hash8 = crypto.createHash("sha1").update(data2).digest("hex");

console.log("sha1", hash7);
console.log("sha1", hash8);