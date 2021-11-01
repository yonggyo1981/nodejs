$(function() {
	/** 이미지 업로드 팝업 */
	$(".imageUpload").click(function() {
		const gid = frmWrite.gid.value;
		layer.popup("/file/upload?type=board_editor&gid=" + gid, 320, 500);
	});
	
	/** 파일 첨부 팝업 */
	$(".fileUpload").click(function() {
		const gid = frmWrite.gid.value;
		layer.popup("/file/upload?type=board&gid=" + gid, 320, 500);
	});
	
	/** 파일 삭제 처리 */
	$("body").on("click", ".uploaded_files .delete", function() {
		if (!confirm("정말 삭제하시겠습니까?")) {
			return;
		}
		
		const li = $(this).closest("li");
		const idx = li.data("idx");
		$.ajax({
			url : "/file/delete/" + idx,
			type : "get",
			dataType : "text",
			success : function(res) {
				// res - 1 -> 삭제 성공, 그외 - 실패
				if (res.trim() == "1") {
					li.remove();
				}
			},
			error : function (err) {
				console.error(err);
			}
		});
	});
	
	/** 이미지 본문 추가 */
	$("body").on("click", ".uploaded_files .insert_editor", function() {
		const url = $(this).closest("li").data("url");
		CKEDITOR.instances.content.insertHtml(`<img src='${url}'>`);
	});
});


/**
* 파일 업로드 후 콜백 처리 
*
* @param data - 업로드된 파일 정보
*/
function callbackFileUpload(data) {
	if (!data) return;
	
	let fileInfoHtml = `<li data-idx=${data.idx} data-url='${data.uploadedURL}'>
								<a href='/file/download/${data.idx}'>${data.originalName}</a>
	`;
	if (data.uploadType == 'board_editor') { // 에디터 첨부 이미지 
			fileInfoHtml += `<i class="xi-file-upload insert_editor"></i>`;
			
			CKEDITOR.instances.content.insertHtml(`<img src='${data.uploadedURL}'>`);
	} 
	
	fileInfoHtml += `<i class='xi-close-min delete'></i>
						</li>`;
						
	$(".uploaded_files." + data.uploadType).append(fileInfoHtml);
	
	// 파일 업로드 팝업 닫기
	layer.close();
}