const fs = require('fs').promises;
const path = require('path'); 
/* 
* .extname(절대) - 확장자 
* .join(기준경로, '상대경로' ... ) -> 절대경로
*/

const dirPath = path.join(__dirname, "logs");
fs.readdir("./logs")
	.then((data) => {
		/**
			1. 디렉토리 삭제 -> rmdir
			2. 파일삭제 -> unlink
		*/
		data.forEach(async (file) => {
			try {
				const filePath = dirPath + "/" + file;
				const ext = path.extname(filePath);
				if (ext) { // 파일 
					await fs.unlink(filePath);
				} else { // 디렉토리 
					await fs.rmdir(filePath);
				}
			} catch (err) {
				console.error(err);
			}
		});
		
	})
	.catch((err) => {
		console.error(err);
	});
