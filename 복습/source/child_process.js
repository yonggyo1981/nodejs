const { exec } = require('child_process');

const proc = exec("dir / w");


proc.stdout.on("data", (data) => {
	console.log(data.toString());
});

proc.stderr.on("data", (data) => {
	console.log(data.toString());
});