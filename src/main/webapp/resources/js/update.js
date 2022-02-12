$(function() {
		
	$(".cancel").click(() => {
		history.back();
	});
	
	item();
})

function item() {
	const code = getCode();

	$.ajax(`../../rest/list/${code}`, {
		method: "GET",
		dataType: "JSON",
		success: result => {
			$("#placeAddr").val(result.placeAddr);
			$("#placeName").val(result.placeName);
			$("#placeId").val(result.placeId);
			$(`#rating3-${result.rating}`).prop("checked", true);
			$("textarea").text(result.info);
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});

}

function getCode() {
	const url = (location.href).split("/");

	return url[6];
}