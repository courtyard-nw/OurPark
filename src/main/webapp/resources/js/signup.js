var regx = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

$(function () {
	$(".cancel").click(() => history.back());

	$(".passwd").change(() => pwdChk());

	$(".passwd_confirm").change(() => pwdConfrimChk());

	$(".id").change(() => {
		let userId = $(".id").val();

		chkId(userId);
	});

	$(".submit").click(() => chkNull());

})

function chkId(userId) {
	$.ajax("checkId?id=" + userId, {
		method: "GET",
		success: result => {
			idMsg(result);
		},
		error: xhr => {
			idErrMsg(xhr);
		}
	})

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
}

function chkNull() {
	if ($(".id").val() == ""
		|| $(".passwd").val() == ""
		|| $(".passwd_confirm").val() == ""
		|| $(".name").val() == ""
		|| $(".address").val() == ""
		|| $("input[type='radio']").prop("checked")
		|| $(".age").val() == ""
		|| $(".nickname").val() == "") {
		chkVal();
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

function chkVal() {

	if ($(".id").val() == "") {
		let name = ".id";
		let msg = "#id_msg";
		
		showMsg(name, msg);
		
	} else if ($(".passwd").val() == "") {
		let name = ".passwd"
		let msg = "#passwd_msg";

		showMsg(name, msg);

	} else if ($(".passwd_confirm").val() == "") {
		
		let name = ".passwd_confirm"
		let msg = "#passwdConfirm_msg";

		showMsg(name, msg);

	} else if ($(".name").val() == "") {
		
		let name = ".name"
		let msg = "#name_msg";

		showMsg(name, msg);

	} else if ($(".address").val() == "") {
		
		let name = ".address"
		let msg = "#address_msg";

		showMsg(name, msg);

	} else if (!$("input[value='male']").prop("checked") && !$("input[value='female']").prop("checked") && !$("input[value='third']").prop("checked")) {
		$("#gender_msg").removeClass("hidden");
		$("input[value='male']").focus();

		$("input[value='male']").focusout(() => $("#gender_msg").addClass("hidden"));

	} else if ($(".age").val() == "") {
		
		let name = ".age"
		let msg = "#age_msg";

		showMsg(name, msg);

	} else if ($(".nickname").val() == "") {
		
		let name = ".nickname"
		let msg = "#nickname_msg";

		showMsg(name, msg);

	}
}

function showMsg(name, msg) {
	$(msg).removeClass("hidden");
	$(name).addClass("warn").focus();

	$(name).focusout(() => {
		$(msg).addClass("hidden");
		$(name).removeClass("warn");
	});
}