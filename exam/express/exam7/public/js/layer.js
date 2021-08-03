/**
* 레이어 팝업
*
*/
const layer = {
	/** 팝업 열기 */
	open : function(url, width, height) {
		width = width || 300;
		height = height || 300;
		
		if ($("#layer_dim").length == 0) { // 레이어 팝업 백그라운드 요소가 존재하지 않으면 -> 추가 
			$("body").append("<div id='layer_dim'></div>");
		}
		
		if ($("#layer_popup").length == 0) { // 레이어 팝업이 존재하지 않으면 -> 추가 
			$("body").append("<div id='layer_popup'></div>");
		}
		
		$("#layer_dim").css({
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundColor: "rgba(0,0,0,0.5)",
			zIndex: 100,
		});
		
		const left = Math.round(($(window).width() - width) / 2);
		const top = Math.round(($(window).height() - height) / 2);
		
		const html = `
							<i class='xi-close-thin' id='layer_close'></i>
							<iframe src='${url}' width='${width}' height='${height}' frameborder='0'></iframe>
						`;
		
		$("#layer_popup").css({
			position: "fixed",
			top: top + "px",
			left: left + "px",
			width: width + "px",
			height: height + "px",
			backgroundColor: "#ffffff",
			zIndex: 101,
			borderRadius: "20px",
		}).html(html);
		
		$("#layer_close").css({
			position: "absolute",
			fontSize: "2.5rem",
			color: "#ffffff",
			top: "-38px",
			right: "-38px",
			cursor: "pointer",
		});
	},
	/** 팝업 닫기 */
	close : function() {
		$("#layer_dim, #layer_popup").remove();
	}
};

$(function() {
	$("body").on("click", "#layer_dim, #layer_close", function() {
		layer.close();
	});
});