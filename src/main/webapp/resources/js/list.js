$(function () {
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
			let timestamp = new Date(list[0].regDate);
			let regDate = `${timestamp.getFullYear()}-0${(timestamp.getMonth() + 1)}-0${timestamp.getDate()} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;

			if (list.length < 1) {
				const msg = $("<td>").attr("colspan", "4").addClass("text-center").text("작성한 리뷰가 없습니다");
				tr.append(msg);
				tbody.append(tr);

				return;
			} else {
				for (let i = 0; i <= list.length - 1; i++) {
					let tr = $("<tr>");

					let code = $("<td>").text(list[i].code);
					let name = $("<td>").append($("<a>").attr("href", "#").text(list[i].placeName));
					let date = $("<td>").text(regDate);

					let btn = $("<td>");
					let upd = $("<a>").attr("href", `update/${list[i].code}`).addClass("btn btn-secondary btn-sm").text("수정");
					let del = $("<a>").attr("href", `delete/${list[i].code}`).addClass("btn btn-secondary btn-sm").text("삭제");
					btn.append(upd).append(del);
					tr.append(code).append(name).append(date).append(btn);
					tbody.append(tr);
				}

			}

		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});

}