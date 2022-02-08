$(function() {
	$(".cancel").click(() => history.back());

	list();
})

function list() {
    $.ajax("../rest/list", {
        method: "GET",
		dataType: "JSON",
        success: result => {
			let list = result;
			
			const tbody = $("tbody");
			const tr = $("<tr>");

			if(list.length > 1) {
				const msg = $("<td>").attr("colspan", "4").addClass("text-center").text("작성한 리뷰가 없습니다");
				tr.append(msg);
				tbody.append(tr);
			}

        },
        error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
    });

}

