/** 
* 댓글 관련 
* 
*/

$(function() {
	/** 댓글 삭제 처리 */
	$(".delete_comment").click(function() {
		if (!confirm('정말 삭제하시겠습니까?')) {
			return;
		}
		
		const idx = $(this).closest("li").data("idx");
		if (!idx)
			return;
		
		$.ajax({
			url : "../comment/" + idx,
			method : "DELETE",
			dataType : "json",
			success : function (res) {
				// 비회원 댓글인 경우, 미인증 되었을때는 비밀번호 확인 팝업
				if (!res.isSuccess && res.memberType == 'guest') {  
					const url = "/board/check_password?mode=delete_comment&idx="+idx;
					layer.popup(url, 320, 320);
				} else {
					alert(res.message);
					if (res.success) { // 페이지 새로고침
						layer.close();
						location.reload();
					}
				}
			},
			error : function (err) {
				console.error(err);
			}
		});
	});
	
	/** 댓글 수정 처리 */
	$(".update_comment").click(function() {
		const idx = $(this).closest("li").data("idx");
		if (!idx)
			return;
		
		$target = $(this).closest("li").find(".comment");
		
		$commentForm = $("#update_content_" + idx);
		/** 이미 수정 양식이 로드 된 상태 -> 수정 DB 처리 */
		if ($commentForm.length > 0) {
			const comment = $commentForm.val();
			if (comment.trim() == "") {
				alert("수정할 댓글을 입력해 주세요.");
			}
			
			$.ajax({
				url : "../comment/" + idx,
				method : "PATCH",
				dataType : "json",
				data : { content : comment },
				success : function (res) {
					alert(res.message);
					if (res.success) { // 댓글 수정 성공 -> 새로고침
						location.reload();
					}
				},
				error : function (err) {
					console.error(err);
				}
			});
			
		} else { // 수정 양식이 아직 로드가 안되어 있으므로 수정 양식 로드 
			$.ajax({
				url : "../comment/" + idx,
				method : "PATCH",
				dataType : "json",
				data : { mode : "get_form" },
				success : function (res) {
					if (res.memberType && !res.success) { // 권한 체크 실패
						if (res.memberType == 'guest') { // 비밀번호 확인 팝업
							const url = "/board/check_password?mode=update_comment&idx="+idx;
							layer.popup(url, 320, 320);
						} else {
							alert(res.message);
						}
						return;
					}
					
					if (res.success) {
						layer.close();
						if ($("#update_content_" + idx).length == 0) {
							$target.find(".inner").addClass("dn");
							const html = `<textarea class='update_content' id='update_content_${idx}'>${res.data.content}</textarea>`;
							$target.append(html);
						}
					}
				},
				error : function (err) {
					console.error(err);
				}
			});
		}
	});
	
	/** 댓글 작성시 댓글 위치로 이동 */
	if (location.search.indexOf("comment_idx") != -1) {
		const qs = {};
		location.search.replace("?", "")
							.split("&")
							.forEach(v => {
								v = v.split("=");
								qs[v[0]] = v[1];
							});
		$target = $("#comment_" + qs.comment_idx);
		if ($target.length > 0) {
			const offset = $target.offset();
			$("html, body").animate({scrollTop: offset.top + "px"}, 200);
		}
	}
});

// 비회원 비밀번호 검증 성공 콜백 */
function callbackGuestPassword(mode, idx) {
	if (mode.indexOf("board") != -1) {
		if (typeof callbackGuestBoardPassword == 'function') {
			callbackGuestBoardPassword(mode, idx);
		}
		return;
	}
	
	$comment = $("#comment_" + idx);
	switch(mode) {
		case "update_comment" : 
			$comment.find(".update_comment").click();
			break;
		case "delete_comment" : 
			$comment.find(".delete_comment").click();
			break;
	}
}