const fs = require('fs').promises;
const constants = require('fs').constants;

(async function() {
	try {
		await fs.access("./testDir", constants.F_OK);
	} catch (err) {
		// 디렉토리가 없는 경우 유입 
		await fs.mkdir("./testDir");
		//console.error(err);
	}
})();