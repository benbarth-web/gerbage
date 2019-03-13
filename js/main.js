$(function () {

	baseUrl = function () { return window.location.href.replace(window.location.hash, ''); }

	var hash = window.location.hash.substring(1);

	if (hash && window.location.href == localStorage.getItem("lastKnownHref")) {
		location = baseUrl();
	}
	localStorage.setItem("lastKnownHref", window.location.href);

	var obj;
	if (hash) {
		var hashDecoded = decodeURIComponent(atob(hash));
		obj = JSON.parse(hashDecoded);
	}

	if (obj && obj.image) {
		$("#random-gif").attr("src", obj.image);
	} else {
		$("random-gif").attr("src", "/img/loading.gif");
		$.ajax("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=garbage", {
			success: function (data, textStatus, jqXHR) {
				$("#random-gif").attr("src", data.data.image_original_url);
			},
			error: function () {
				$("#random-gif").attr("src", "/img/gerbage.gif");
			}
		})
	}

	if (obj && obj.message) {
		$('#message').text(obj.message);
	}

	if (obj && obj.redirectUrl && obj.redirectTimeout) {
		window.setTimeout(function () {
			window.location.href = obj.redirectUrl;
		}, obj.redirectTimeout);
	}

	createShareUrl = function (image, message, redirectUrl, redirectTimeout) {
		image = image || undefined;
		message = message || undefined;
		redirectUrl = redirectUrl || undefined;
		redirectTimeout = redirectTimeout || undefined;
		var newObj = { image, message, redirectUrl, redirectTimeout }
		return baseUrl() + "#" + btoa(encodeURIComponent(JSON.stringify(newObj)));
	}

	share = function () {
		var image = $("#random-gif").attr("src");
		var message = prompt("Include an optional message:")

		var newUrl = createShareUrl(image, message);

		if (typeof copyTextToClipboard === "function" && copyTextToClipboard(newUrl)) {
			alert("The URL has been copied to the clipboard. " + newUrl);
		}
		window.location.href = newUrl;
	}

})
