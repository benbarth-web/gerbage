$(function () {
	var hash = window.location.hash.substring(1);
	var obj;
	if (hash) {
		var hashDecoded = decodeURIComponent(atob(hash));
		obj = JSON.parse(hashDecoded);
	}
	if (obj && obj.message) {
		$('#message').text(obj.message);
	}
	$("random-gif").attr("src", "/img/loading.gif");
	$.ajax("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=garbage", {
		success: function (data, textStatus, jqXHR) {
			$("#random-gif").attr("src", data.data.image_original_url);
		},
		error: function () {
			$("#random-gif").attr("src", "/img/gerbage.gif");
		}
	})

	if (obj && obj.redirectUrl && obj.redirectTimeout) {
		window.setTimeout(function () {
			window.location.href = obj.redirectUrl;
		}, obj.redirectTimeout);
	}

	share = function () {
		var message = prompt("Message to display:");
		var redirectUrl = prompt("Redirect to URL:");
		var redirectTimeout;
		if (redirectUrl) {
			redirectTimeout = prompt("Number of seconds until redirect:", 10);
		}
		redirectTimeout *= 1000;

		var newObj = { message, redirectUrl, redirectTimeout }
		var baseUrl = window.location.href.replace(window.location.hash, '');
		var newUrl = baseUrl + "#" + btoa(encodeURIComponent(JSON.stringify(newObj)));

		if (typeof copyTextToClipboard === "function") {
			alert("The URL has been copied to the clipboard. " + newUrl)
			copyTextToClipboard(newUrl);
		} else {
			window.location.href = newUrl;
		}
	}
})
