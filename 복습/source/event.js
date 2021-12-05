const Event = require('events');
const event1 = new Event();
event1.addListener("event1", function() {
	console.log("이벤트1-1 발생");
});
event1.on("event1", () => {
	console.log("이벤트1-2 발생");
});

const listener = () => {
	console.log("이벤트1-3 발생");
};
event1.on("event1", listener);

event1.once("event2", () => { 
	console.log("이벤트2-1 발생");
});

event1.once("event2", () => {
	console.log("이벤트 2-2 발생");
});

event1.emit("event1");
//event1.emit("event1");
//event1.emit("event2");
//event1.emit("event2");

console.log(event1.listenerCount("event1"));

//event1.removeListener("event1", listener);
event1.off("event1", listener);
console.log(event1.listenerCount("event1"));
event1.emit("event1");

event1.removeAllListeners("event1");
console.log(event1.listenerCount("event1"));
event1.emit("event1");