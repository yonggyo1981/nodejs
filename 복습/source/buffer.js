const buffer = Buffer.from("버퍼로 변환 테스트...");
console.log(buffer);
console.log("바이트 수 : ", buffer.length);
console.log("원래 문자열 : ", buffer.toString());

const array = [Buffer.from("버퍼1..."), Buffer.from("버퍼2..."), Buffer.from("버퍼3...")];
const buffer2 = Buffer.concat(array);
console.log(buffer2.toString());

console.log(Buffer.alloc(5));