const immediate = setImmediate(() => {
	console.log("setImmediate");
});

clearImmediate(immediate);

/**
setTimeout(() => {
	console.log("setTimeout");
}, 0);
*/