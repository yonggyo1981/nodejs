let i = 0;
setInterval(() => {
	console.log("숫자 : " , i);
	if (i == 10) {
		process.exit();
	}
	i++;
}, 1000);