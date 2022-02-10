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
			console.log(result);
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});

}


function getCode() {
	const url = location.href;
	const code = url.split("/");

	return code[6];
}

function rate() {
	$(`#rating3-${item.rating}`).prop("checked", true);
}

//리뷰 코드 받기 -> item() -> dom 생성