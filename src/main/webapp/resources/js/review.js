const state = {
	placeName: $(".name").text(),
	placeId: $(".name").attr("id"),
	cmtPerClick: 0,
	cmtNum: 0
};

$(function () {

	images();

	reviewInfo();

	cmts();

	//더보기 버튼 클릭 시 댓글 표시
	$(".btn").click(() => {
		state.cmtPerClick += 5;
		cmts();
	});

	//로고를 클릭하면 지도 페이지로 이동
	$("#logo").click(() => {
		sendToMap();
	})

	//스와이퍼에서 x를 클릭하면 뒤로가기 실행
	$(".cancel").click(() => {
		history.back();
	});

	//사용자 메뉴 클릭 시 드롭다운 메뉴 표시
	$("#user").click(function () {
		$(".map_user_menu").removeClass("hidden");
	})

	//드롭다운 메뉴의 바깥을 클릭하면 드롭다운 메뉴가 사라지게 만듦
	$("#map_user_menu_bg").click(function () {
		$(".map_user_menu").addClass("hidden");
	})

})

function cmts() {
	$.ajax(`../rest/list/cmts/${state.placeId}`, {
		method: "GET",
		dataType: "json",
		success: result => {
			const cmt = result;

			//서버에서 받아온 댓글의 총 개수를 저장
			state.cmtNum = Object.keys(cmt).length;

			//등록된 댓글이 존재하면 더보기 버튼 사라짐
			hideBtn();

			appendCmts(cmt);

			return;
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});
}

function appendCmts(cmt) {
	for (let i = 0 + state.cmtPerClick; i <= 4 + state.cmtPerClick && i <= (Object.keys(cmt).length - 1); i++) {

		const div_c = $("<div>").addClass("c").attr("data-num", i + 1);

		const div_user = $("<div>").addClass("c_user");
		const user_img = $("<img>").attr("src", "../resources/img/Icon awesome-user-circle.png").addClass("user_img");

		// if (cmt[i].member == null)
			// let user_name = $("<p>").addClass("user_name").text("익명의 사용자");
		// else
			let user_name = $("<p>").addClass("user_name").text(cmt[i].member);

		const div_date = $("<div>");
		const c_date = $("<p>").addClass("c_date").text(cmt[i].fmtDate);

		let c_rate;
		//평점이 정수일 때 '.0' 추가
		if (cmt[i].rating == Math.round(cmt[i].rating)) {
			c_rate = $("<p>").addClass("c_rate").text(`${cmt[i].rating}.0`);
		} else {
			c_rate = $("<p>").addClass("c_rate").text(cmt[i].rating);
		}

		const c_text = $("<p>").text(cmt[i].info);

		const div_img = $("<div>").addClass("c_img");
		const a_img = $("<a>").attr("href", "#");
		appendImgs(a_img, cmt, i);

		//const div_delete = $("<div>");
		//const a_update = $("<a>").attr("href", "#5").text("수정 |");
		//const a_delete = $("<a>").attr("href", "#6").text("삭제");

		div_user.append(user_img).append(user_name);
		div_date.append(c_date).append(c_rate).append(c_text);

		div_img.append(a_img);

		//div_delete.append(a_update).append(a_delete);

		div_c.append(div_user).append(div_date).append(div_img);

		$(".more").before(div_c);
	}
}

function appendImgs(a_img, cmt, i) {
	let c_img;

	for (let n = 0; n < Object.keys(cmt[i].images).length; n++) {
		c_img = $("<img>").attr("src", `../upload/${cmt[i].images[n].uuid}_${cmt[i].images[n].filename}`);
		a_img.append(c_img);
	}
}

function images() {
	$.ajax(`../rest/list/images/${state.placeId}`, {
		method: "GET",
		dataType: "json",
		success: result => {
			const images = result;

			showImages(images);

			return;
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});
}

function showImages(images) {
	let img = ".img";
	if (images != '') {
		//촤근에 등록된 이미지를 메인 이미지로 표시
		$(".main_img").attr("src", `../upload/${images[0].uuid}_${images[0].filename}`);

		if (images.length > 1) {
			for (let i = 1; i <= images.length && i < 5; i++) {
				$(`${img + i}`).attr("src", `../upload/${images[i].uuid}_${images[i].filename}`);
			}
		}

		showSwiper(images);

	} else {
		$(".main_img").attr("src", "../resources/img/noImg.png");
		$(img).attr("src", "../resources/img/noImg.png");
	}

}

function showSwiper(images) {
	$("#swiper").click(() => {
		$(".mySwiper").removeAttr("style");
		$(".wrapper").css("display", "none");
		$("footer").css("display", "none");

		//swiper 이미지 생성
		const swiper_wrapper = $(".swiper-wrapper");
		for (let i = 0; i <= (images.length - 1); i++) {
			const slide = $("<div>").addClass("swiper-slide");
			let img = $("<img>").attr("src", `../upload/${images[i].uuid}_${images[i].filename}`);

			slide.append(img);
			swiper_wrapper.append(slide);
		}
	})
}

function reviewInfo() {
	$.ajax(`../rest/list/info/${state.placeId}`, {
		method: "GET",
		dataType: "json",
		success: result => {

			showReviewInfo(result);

			return;
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});
}

function showReviewInfo(result) {
	const info = result;
	const avg = info.average;

	if (avg == Math.round(avg)) {
		$("#average").text(`${avg}.0`);
	} else
		$("#average").text(avg);

	$("#countCmt").text(info.countCmt);
	$("#countCmt_2").text(`리뷰 (${info.countCmt})`);
	$("#countImg").text(info.countImg);
}

function hideBtn() {
	const msg = $("<p>").addClass("msg").text(`"등록된 리뷰가 없어요ㅜㅜ"`);

	if (state.cmtNum == 0) {
		$(".btn").css("display", "none");
		$(".comment_container").append(msg);
	} else if ($(".c:last").data("num") == state.cmtNum) {
		$(".btn").css("display", "none");
	}

}

function sendToMap() {
	const keyword = $(".name").text();
	location.href = `../jsp/map?keyword=${keyword}`;
}