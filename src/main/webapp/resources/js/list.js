$(function () {

	list();
	
})

function del(event) {
	let c = event.target.id;
	console.log(c);
	$.ajax(`../rest/${c}`, {
		method: "DELETE",
		success: result => {
			alert("해당 리뷰가 삭제되었습니다");
			location.reload();
			return;
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});
}

function list() {
	$.ajax("../rest/list", {
		method: "GET",
		dataType: "JSON",
		success: result => {
			let list = result;

			const tbody = $("tbody");
			
			if (list.length < 1) {
				let tr = $("<tr>");
				const msg = $("<td>").attr("colspan", "4").addClass("text-center").text("작성한 리뷰가 없습니다");
				tr.append(msg);
				tbody.append(tr);

				return;
			} else {
				for (let i = 0; i <= list.length - 1; i++) {
					let tr = $("<tr>");
					let code = $("<td>").text(list[i].code);
					let name = $("<td>").append($("<a>").attr("href", "#").text(list[i].placeName));

					let timestamp = new Date(list[i].regDate);
					let time = fmtTimestamp(timestamp);

					let regDate = `${time.year}-${time.month}-${time.date} ${time.hours}:${time.minutes}:${time.seconds}`;
					let date = $("<td>").text(regDate);

					let btn = $("<td>");
					let upd = $("<a>").attr("href", `update/${list[i].code}`).addClass("btn btn-secondary btn-sm").text("수정");
					let del = $("<button>").attr("id", list[i].code).addClass("btn btn-secondary btn-sm delBtn").text("삭제").attr("onclick", "del(event)");
					btn.append(upd).append(del);
					tr.append(code).append(name).append(date).append(btn);
					tbody.append(tr);
				}

			}

		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});

}

function fmtTimestamp(timestamp) {
	let time = {
		year: timestamp.getFullYear(),
		month : timestamp.getMonth(),
		date : timestamp.getDate(),
		hours : timestamp.getHours(),
		minutes : timestamp.getMinutes(),
		seconds : timestamp.getSeconds()
	}

	if(time.month < 10) {
		time.month = `0${time.month + 1}`;
	}
	if(time.date < 10) {
		time.date = `0${time.date}`;
	}
	if(time.hours < 10) {
		time.hours = `0${time.hours}`;
	}
	if(time.minutes < 10) {
		time.minutes = `0${time.minutes}`;
	}
	if(time.seconds < 10) {
		time.seconds = `0${time.seconds}`;
	}

	return time
}