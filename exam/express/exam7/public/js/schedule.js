$(function() {
	/** 날자를 클릭하면 -> 레이어 팝업 */
	$(".calendar .days > li").click(function() {

		layer.open("/schedule",  400, 400);
	});
});