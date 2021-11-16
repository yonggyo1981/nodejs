$(function() {
	/** 비회원 글 수정 체크 */
	$(".guest_update_post, .guest_delete_post").click(function() {
		const mode = $(this).hasClass("guest_delete_post")?"delete_board":"update_board";
		const idx = $(this).data("idx");
		const url = `/board/check_password?mode=${mode}&idx=${idx}`;
		layer.popup(url, 320, 320);
	});
});

function callbackGuestBoardPassword(mode, idx) {
	const processType = (mode.indexOf("delete") != -1)?"delete":"update";
	const url = `/board/${processType}/${idx}`;
	location.href=url;
}