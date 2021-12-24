var regx = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

$(function () {
	$(".cancel").click(() => {
		history.back();
	});

	$(".passwd").change(() => {
		pwdChk();
	});

	$(".passwd_confirm").change(() => {
		pwdConfrimChk();
	});

	$(".id").change(() => {
		let userId = $(".id").val();

		$.ajax("checkId?id=" + userId, {
			method: "GET",
			success: result => {
				idMsg(result);
			},
			error: xhr => {
				idErrMsg(xhr);
			}
		})
	});

	//$(".submit").click(() => chkNull());

})

function chkNull() {
	if ($(".id").val() == ""
		|| $(".passwd").val() == ""
		|| $(".passwd_confirm").val() == ""
		|| $(".name").val() == ""
		|| $(".address").val() == ""
		|| $("input[type='radio']").prop("checked")
		|| $(".age").val() == ""
		|| $(".nickname").val() == "") {
		checkVal();
		return;
	} else if ($(".id").val() != ""
		&& $(".passwd").val() != ""
		&& $(".passwd_confirm").val() != ""
		&& $(".name").val() != ""
		&& $(".address").val() != ""
		&& $("input[type='radio']").prop("checked")
		&& $(".age").val() != ""
		&& $(".nickname").val() != "") {
		alert("good!");
		$(".submit").removeAttr("type").click();
	}
}

function idErrMsg(xhr) {
	alert(`아이디 중복확인 중 오류 발생: ${xhr.statusText}`);
	$(".id").val("");
}

function idMsg(result) {
	if (result == "OK")
		alert("사용 가능한 아이디입니다");
	else {
		alert("사용 중인 아이디입니다");
		$(".id").val("");
	}
}

function pwdChk() {
	if (!regx.test($(".passwd").val())) {
		$("#passwd_msg").removeClass("hidden").text("비밀번호 형식을 확인해주세요");
		$(".passwd").addClass("warn").val("").focus();
	} else {
		$(".passwd").removeClass("warn");
		$("#passwd_msg").addClass("hidden");
	}
}

function pwdConfrimChk() {
	if ($(".passwd").val() != $(".passwd_confirm").val()) {
		$("#passwdConfirm_msg").removeClass("hidden").text("비밀번호가 일치하지 않습니다");
		$(".passwd_confirm").addClass("warn").focus();
	} else {
		$(".passwd_confirm").removeClass("warn");
		$("#passwdConfirm_msg").addClass("hidden");
	}
}

function checkVal() {

	if ($(".id").val() == "") {
		$("#id_msg").removeClass("hidden");
		$(".id").addClass("warn").focus();

		$(".id").focusout(function () {
			$("#id_msg").addClass("hidden");
			$(".id").removeClass("warn");
		});

		return
	}

	if ($(".passwd").val() == "") {
		$("#passwd_msg").removeClass("hidden");
		$(".passwd").addClass("warn").focus();

		$(".passwd").focusout(function () {
			$(".passwd").removeClass("warn");
			$("#passwd_msg").addClass("hidden");
		});
		return
	}

	if ($(".passwd_confirm").val() == "") {
		$("#passwdConfirm_msg").removeClass("hidden");
		$(".passwd_confirm").addClass("warn").focus();

		$(".passwd_confirm").focusout(function () {
			$(".passwd_confirm").removeClass("warn");
			$("#passwdConfirm_msg").addClass("hidden");
		});
		return
	}

	if ($(".name").val() == "") {
		$("#name_msg").removeClass("hidden");
		$(".name").addClass("warn").focus();

		$(".name").focusout(function () {
			$(".name").removeClass("warn");
			$("#name_msg").addClass("hidden");
		});
		return
	}

	if ($(".address").val() == "") {
		$("#address_msg").removeClass("hidden");
		$(".address").addClass("warn").focus();

		$(".address").focusout(function () {
			$(".address").removeClass("warn");
			$("#address_msg").addClass("hidden");
		});
		return
	}

	if (!$("input[value='male']").prop("checked") && !$("input[value='female']").prop("checked") && !$("input[value='third']").prop("checked")) {
		$("#gender_msg").removeClass("hidden");
		$("input[value='male']").focus();

		$("input[value='male']").focusout(() => $("#gender_msg").addClass("hidden"));

		return
	}

	if ($(".age").val() == "") {
		$("#age_msg").removeClass("hidden");
		$(".age").addClass("warn").focus();

		$(".age").focusout(function () {
			$(".age").removeClass("warn");
			$("#age_msg").addClass("hidden");
		});
		return
	}

	if ($(".nickname").val() == "") {
		$("#nickname_msg").removeClass("hidden");
		$(".nickname").addClass("warn").focus();

		$(".nickname").focusout(function () {
			$(".nickname").removeClass("warn");
			$("#nickname_msg").addClass("hidden");
		});
		return
	}
}