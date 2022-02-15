$(function() {
		
	$(".cancel").click(() => {
		history.back();
	});
	
	item();

	$("form button").click((e) => update(e));

})

//서버에서는 formData의 값이 null, reviewImageDao.add(image) 실행 안됨
//connection error는 백신 프로그램 재시동으로 해결
function update(e) {
	e.preventDefault();
	const formData = new FormData($("form")[0]);
	const code = getCode();

    $.ajax(`../../rest/${code}`, {
        method: "PUT",
		data: formData,
		contentType: false,
		processData: false,
        success: result => {
			alert("수정 완료");
			location.href = `http://localhost:9090/ourpark/jsp/list`;
			return;
        },
        error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
    });

}

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