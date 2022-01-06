$(function () {

	$(".cancel").click(() => history.back());

	$("#keyword").keydown(() => setOnsubmit(event));

	$("#keyword").keyup(() => removeOnsubmit(event));

})

function setOnsubmit(event) {
	if (event.keycode == 13 || event.which == 13)
		$("form").attr("onsubmit", "searchPlaces(); return false;");
	$("#submitBtn").submit();
}

function removeOnsubmit(event) {
	if (event.keycode == 13 || event.which == 13 || event.keycode == 27 || event.which == 27)
		$("form").removeAttr("onsubmit");
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 1. 객체 생성 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
	mapOption = {
		center: new kakao.maps.LatLng(36.34982018787662, 127.38484244991709), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
		mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
	};

// 지도를 생성한다 
var map = new kakao.maps.Map(mapContainer, mapOption);

// 지도 타입 변경 컨트롤을 생성한다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도에 확대 축소 컨트롤을 생성한다
var zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가한다
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

var geocoder = new kakao.maps.services.Geocoder();

var imageSrc = '../resources/img/marker.png', // 마커이미지의 주소입니다    
	imageSize = new kakao.maps.Size(33, 46), // 마커이미지의 크기입니다
	imageOption = { offset: new kakao.maps.Point(10, 30) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

// 마커가 표시될 위치입니다 
var markerPosition = map.getCenter();

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
	position: markerPosition,
	image: markerImage
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);


// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

	// 클릭한 위도, 경도 정보를 가져옵니다 
	var latlng = mouseEvent.latLng;

	// 위도, 경도로 장소 이름을 검색
	geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function (result, status) {
		if (status === kakao.maps.services.Status.OK) {
			var addrInput = document.getElementById("keyword");

			addrInput.value = result[0].address.address_name;

			ps.keywordSearch(addrInput.value, setVal);

		}
	});
	marker.setPosition(latlng);
});

function setVal(data, status) {
	if (status === kakao.maps.services.Status.OK) {
		var nameInput = document.getElementById("name");
		var idInput = document.getElementById("placeId");

		nameInput.value = data[0].place_name;
		idInput.value = data[0].id;
	}
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 2. 장소 검색 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

	var keyword = document.getElementById('keyword').value;

	if (!keyword.replace(/^\s+|\s+$/g, '')) {
		alert('키워드를 입력해주세요!');
		return false;
	}

	// 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
	ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status) {
	if (status === kakao.maps.services.Status.OK) {

		displayPlaces(data);

	} else if (status === kakao.maps.services.Status.ZERO_RESULT) {

		alert('검색 결과가 존재하지 않습니다.');
		return;

	} else if (status === kakao.maps.services.Status.ERROR) {

		alert('검색 결과 중 오류가 발생했습니다.');
		return;

	}
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 3. 검색 후 동작 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(place) {

	// 마커를 생성하고 지도에 표시합니다
	var placePosition = new kakao.maps.LatLng(place[0].y, place[0].x)

	// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
	map.setCenter(placePosition);
	marker.setPosition(placePosition);
}