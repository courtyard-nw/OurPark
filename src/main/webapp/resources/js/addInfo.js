$(function() {
	$(".cancel").click(() => history.back());

	$("form button").click(() => add());
})

function add() {
	const formData = new FormData($("form")[0])
	const placeName = $("#placeName").val(); 

    $.ajax("../rest/", {
        method: "POST",
		data: formData,
		contentType: false,
		processData: false,
        success: result => {
			location.href = "http://localhost:9090/ourpark/map/map?keyword=" + placeName;
			return;
        },
        error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
    });

}