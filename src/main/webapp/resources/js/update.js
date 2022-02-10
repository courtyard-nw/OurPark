$(function() {
		
	$(".cancel").click(() => {
		history.back();
	});
	
})

function rate() {
	$(`#rating3-${item.rating}`).prop("checked", true);
}