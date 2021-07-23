const fs = require('fs').promises;
const path = require('path');

fs.readdir("./logs")
	.then((data) => {
		/**
			1. 디렉토리 삭제 -> rmdir
			2. 파일삭제 -> unlink
		*/
		data.forEach((file) => {
			
		});
		
	})
	.catch((err) => {
		console.error(err);
	});
