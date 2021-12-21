let placeName = $(".name").text();
let cmtPerClick = 0;
let cmtNum;

$(function () {
		
	getImages();

	getReviewInfo();
	
	getCmt();

	//더보기 버튼 클릭 시 댓글 표시
	$(".btn").click(() => {
		cmtPerClick += 5;
		getCmt();
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

function getCmt() {

	$.ajax("getCmt?placeName=" + placeName, {
		method: "GET",
		dataType: "json",
		success: result => {
			const cmt = result;

			//서버에서 받아온 댓글의 총 개수를 저장
			cmtNum = Object.keys(cmt).length;

			//등록된 댓글이 존재하면 더보기 버튼 사라짐
			hideBtn();

			appendCmt(cmt);

			return;
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});
}

function appendCmt(cmt) {
	for (let i = 0 + cmtPerClick; i <= 4 + cmtPerClick && i <= Object.keys(cmt).length; i++) {

		const div_c = $("<div>").addClass("c").attr("data-num", i + 1);

		const div_user = $("<div>").addClass("c_user");
		const user_img = $("<img>").attr("src", "../resources/img/Icon awesome-user-circle.png").addClass("user_img");

		let user_name = $("<p>").addClass("user_name").text(cmt[i].member);
		const div_date = $("<div>");
		const c_date = $("<p>").addClass("c_date").text(cmt[i].fmtDate);

		let c_rate = $("<p>").addClass("c_rate").text(cmt[i].rating);
		if (cmt[i].rating == Math.round(cmt[i].rating)) {
			c_rate = $("<p>").addClass("c_rate").text(`${cmt[i].rating}.0`);
		}

		const c_text = $("<p>").text(cmt[i].info);

		const div_img = $("<div>").addClass("c_img");
		const a_img = $("<a>").attr("href", "#");

		let c_img;

		for (let n = 0; n < Object.keys(cmt[i].images).length; n++) {
			c_img = $("<img>").attr("src", `../upload/${cmt[i].images[n].uuid}_${cmt[i].images[n].filename}`);
			a_img.append(c_img);
		}

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

function getImages() {
	let img = ".img";

	$.ajax("getImage?placeName=" + placeName, {
		method: "GET",
		dataType: "json",
		success: result => {
			const images = result;

			if (images != '') {
				$(".main_img").attr("src", `../upload/${images[0].uuid}_${images[0].filename}`);

				if (images.length > 1) {
					for (let i = 1; i <= images.length && i < 5; i++) {
						$(`${img + i}`).attr("src", `../upload/${images[i].uuid}_${images[i].filename}`);
					}
				}

				$("#swiper").click(() => {
					$(".mySwiper").removeAttr("style");
					$(".wrapper").css("display", "none");
					$("footer").css("display", "none");

					//swiper 이미지 생성
					const swiper_wrapper = $(".swiper-wrapper");
					for (let i = 0; i <= images.length; i++) {
						const slide = $("<div>").addClass("swiper-slide");
						let img = $("<img>").attr("src", `../upload/${images[i].uuid}_${images[i].filename}`);

						slide.append(img);
						swiper_wrapper.append(slide);
					}
				})


			} else {
				$(".main_img").attr("src", "../resources/img/noImg.png");
				$(img).attr("src", "../resources/img/noImg.png");
			}

			return;
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});
}

function getReviewInfo() {
	console.log("getReviewInfo: " + placeName);

	$.ajax("reviewInfo?placeName=" + placeName, {
		method: "GET",
		dataType: "json",
		success: result => {
			const reviewInfo = result;

			if (reviewInfo.average == Math.round(reviewInfo.average)) {
				$("#average").text(`${reviewInfo.average}.0`);
			} else
				$("#average").text(reviewInfo.average);
			$("#countCmt").text(reviewInfo.countCmt);
			$("#countCmt_2").text(`리뷰 (${reviewInfo.countCmt})`);
			$("#countImg").text(reviewInfo.countImg);

			return;
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});
}

function hideBtn() {
	const msg = $("<p>").addClass("msg").text(`"등록된 리뷰가 없어요ㅜㅜ"`);

	if (cmtNum == 0) {
		$(".btn").css("display", "none");
		$(".comment_container").append(msg);
	} else if ($(".c:last").data("num") == cmtNum) {
		$(".btn").css("display", "none");
	}

}

function sendToMap() {
	const keyword = $(".name").text();
	$("#logo").attr("href", `map?keyword=${keyword}`);
}