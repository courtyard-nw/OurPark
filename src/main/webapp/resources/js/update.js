$(function() {
		
	$(".cancel").click(() => {
		history.back();
	});
	
})

function getCode() {
	const url = location.href;
	const code = url.split("/");

	return code[6];
}

function rate() {
	$(`#rating3-${item.rating}`).prop("checked", true);
}

//리뷰 코드 받기 -> item() -> dom 생성