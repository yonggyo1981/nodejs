const Events = require('events');

const MyEvent1 = new Events();
const MyEvent2 = new Events();
MyEvent1.on("wakeup", () => {
	console.log("일어났습니다.");
});

MyEvent1.on("sleep", () => {
	console.log("잠잔다");
});

setTimeout(() => {
	MyEvent1.emit("wakeup");
}, 3000);

setTimeout(() => {
	MyEvent1.emit("sleep");
}, 6000);

MyEvent2.addListener("walk", () => {
	console.log("걸어가고 있다");
});

MyEvent2.addListener("ride", () => {
	console.log("버스 타고 가고 있다");
});

setTimeout(() => {
	MyEvent2.emit("ride");
}, 3000);

setTimeout(() => {
	MyEvent2.emit("walk");
}, 6000);