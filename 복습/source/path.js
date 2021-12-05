const path = require('path');
console.log("path.dirname() : ", path.dirname(__filename));
console.log("path.basename() : " + path.basename(__filename));
console.log("path.extname() : " + path.extname(__filename));
console.log("path.basename() - except ext : ", path.basename(__filename, path.extname(__filename)));

const parsed = path.parse(__filename);
console.log(parsed);
const formated = path.format(parsed);
console.log(formated);

console.log("path.normalize() : ", path.normalize("C://users\\\\yonggyo\\\\came.js"));
//\\t \\n   //
console.log("path.join() : ", path.join(__dirname, "..", "..", "/users"));