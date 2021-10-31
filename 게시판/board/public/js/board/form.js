$(function() {
	$(".imageUpload").click(function() {
		const gid = frmWrite.gid.value;
		layer.popup("/file/upload?type=board_editor&gid=" + gid, 320, 500);
	});
	
	$(".fileUpload").click(function() {
		const gid = frmWrite.gid.value;
		layer.popup("/file/upload?type=board&gid=" + gid, 320, 500);
	});
});