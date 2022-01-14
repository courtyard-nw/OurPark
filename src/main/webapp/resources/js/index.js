$(function () {
	$("#user").click(function () {
		$(".user_menu").removeClass("hidden");
	});

	$("#user_menu_bg").click(function () {
		$(".user_menu").addClass("hidden");
	});

	$("#searchBtn").click((event) => {
		search(event);
	});

	$("input[name='keyword']").keypress((event) => {
		if (event.keycode == 13 || event.which == 13) {
			search(event);
		}
	})
	
	showMsg();

	$("#hideBtn").click(() => {
		hideMsg();
	})
})

function search(event) {
	if ($("input[name='keyword']").val() == '') {
		event.preventDefault();
		alert("키워드를 입력해주세요!");
	}
}

function showMsg() {
	if (sessionStorage.getItem("signup") != null) {
		var signupModal = new bootstrap.Modal(document.getElementById('signupModal'), {
			keyboard: false
		})

		signupModal.show();
	}
}

function hideMsg() {

	var signupModal = new bootstrap.Modal(document.getElementById('signupModal'), {
		keyboard: false
	})

	signupModal.hide();

	sessionStorage.removeItem("signup");

}