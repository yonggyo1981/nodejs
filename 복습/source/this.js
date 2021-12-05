console.log(this === module.exports);

function abc() {
	console.log("abc this : ", this === global);
}
abc();