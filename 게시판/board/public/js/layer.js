/**
* 레이어 팝업 
*
*/
const layer = {
	/** 팝업 열기 */
	popup(url, width, height) {
		
		if (!url) {
			return;
		}
		
		width = width || 320;
		height = height || 320;
		
		/** 
		* 1. 레이어 백그라운드(O)
		* 2. 팝업 영역(가운데 정렬, url 처리)
		*/
		if ($("#layerDim").length == 0) { // #layerDim(백그라운드) 없으면 추가(body) 
			$("body").append("<div id='layerDim'></div>");
		}
		
		$("#layerDim").css({
			position: "fixed",
			width: "100%",
			height: "100%",
			top: 0,
			left: 0,
			background: "rgba(0,0,0, 0.6)",
			zIndex : 100,
			cursor: "pointer",
		});
		
		if ($("#layerPopup").length == 0) { // #layerPopup(팝업 내용영역) 없으면 추가(body)
			$("body").append("<div id='layerPopup'></div>");
		}
		
		const xpos = Math.round(($(window).width() - width) / 2);
		const ypos = Math.round(($(window).height() - height) / 2);
		
		$("#layerPopup").css({
			position: "fixed",
			width : width + "px",
			height : height + "px",
			top: ypos + "px", 
			left : xpos + "px",
			background : "#ffffff",
			zIndex: 101,
			borderRadius: "20px",
			padding: "20px",
		});
		
		$.ajax({
			url : url, 
			type : "get",
			dataType : "html",
			success(res) {
				$("#layerPopup").html(res);
			},
			error(err) {
				console.error(err);
			}
		});
		
	},
	/** 팝업 닫기 */
	close() {
		$("#layerDim, #layerPopup").remove();
	}
}

$(function() {
	/** 레이어 팝업 닫기 */
	$("body").on("click", "#layerDim", function() {
		layer.close();
	});
});