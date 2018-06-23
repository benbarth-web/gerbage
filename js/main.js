$(function() {
	$("random-gif").attr("src", "/img/loading.gif");
	$.ajax("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=garbage", {
		success: function(data, textStatus, jqXHR) {
			$("#random-gif").attr("src", data.data.image_original_url);
		},
		error: function() {
			$("#random-gif").attr("src", "/img/gerbage.gif");
		}
	})
})
