$(function() {
	$("#user").click(function() {
		$(".user_menu").removeClass("hidden");
	});

	$("#user_menu_bg").click(function() {
		$(".user_menu").addClass("hidden");
	});

	$("#searchBtn").click(() => {
		if ($("input[name='keyword']").val() == '') {
			$("#searchBtn").attr("type", "button");
			alert("키워드를 입력해주세요!");
		} else {
			$("#searchBtn").attr("type", "submit");
		}
	});
	
	signupMsg();
})

function signupMsg() {

	var signupModal = new bootstrap.Modal(document.getElementById('signupModal'), {
		keyboard: false
	  })

	  signupModal.show();
}