const fs = require('fs');
fs.watch('./watch.txt', (type, filename) => {
	console.log(type, filename);
});