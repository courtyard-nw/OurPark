let item = {
	placeName: "",
	placeAddr: "",
	placeRoadAddr: ""
}

// 마커를 담을 배열입니다
var markers = [];

function getReviewInfo(index) {

	$.ajax("reviewInfo?placeName=" + item.placeName, {
		method: "GET",
		dataType: "json",
		success: result => {
			const reviewInfo = result;

			if (reviewInfo.average == Math.round(reviewInfo.average)) {
				$(`.average${index}`).text(`${reviewInfo.average}.0`);
			} else
				$(`.average${index}`).text(reviewInfo.average);
			$(`.countCmt${index}`).text(reviewInfo.countCmt);
			$(`.countImg${index}`).text(reviewInfo.countImg);

			return;
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});
}

function getImages(index) {
	let img = `.img${index}`;

	$.ajax("getImages?placeName=" + item.placeName, {
		method: "GET",
		dataType: "json",
		success: result => {
			const images = result;
			console.log(images);

			if (images != '') {
				$(img).attr("src", `../upload/${images[0].uuid}_${images[0].filename}`);
			} else {
				$(img).attr("src", "../resources/img/noImg_map.png");
			}
		},
		error: xhr => { alert(`오류 발생: ${xhr.statusText}`) }
	});
}

function sendPlace() {
	$.ajax({
		type: "POST",
		url: "sendPlace",
		contentType: "application/json",
		data: JSON.stringify(item),
		success: function (result) {
			//console.log("[ajax] success: " + JSON.stringify(item));
			//alert(`success: ${result}`);

			return;
		},
		error: xhr => alert(`오류 발생: ${xhr.statusText}`)
	});
}

//function makeOverlay(marker) {
// 커스텀 오버레이에 표시할 내용입니다     
// HTML 문자열 또는 Dom Element 입니다 
var content = '<div class="sw_wrap">' +
	'    <div class="swiper-wrapper">' +
	'       <div class="swiper-slide"><img src="../resources/img/park_sample.png" class="image"></div>' +
	'       <div class="swiper-slide"><img src="../resources/img/cnu.jpg"></div>' +
	'       <div class="swiper-slide">Slide 3</div>' +
	'       <div class="swiper-slide">Slide 4</div>' +
	'       <div class="swiper-slide">Slide 5</div>' +
	'       <div class="swiper-slide">Slide 6</div>' +
	'       <div class="swiper-slide">Slide 7</div>' +
	'       <div class="swiper-slide">Slide 8</div>' +
	'       <div class="swiper-slide">Slide 9</div>' +
	'    </div>' +
	'    <div class="swiper-button-next"></div>' +
	'    <div class="swiper-button-prev"></div>' +
	'    <div class="swiper-pagination"></div>' +
	'    <div id="txt_wrapper">' +
	'       <p id="placeName">asddas</p>' +
	'       <p id="addr">asdasdasd</p>' +
	'       <div>' +
	'           <img src="../resources/img/Icon open-pencil.png"><span class="revNum">68</span>' +
	'           <img src="../resources/img/Icon material-photo-camera.png" id="camera"><span class="revNum">130</span>' +
	'           </div>' +
	'           <div id="score">4.6</div>' +
	'       </div>' +
	'   </div>' +
	'</div>';

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
	mapOption = {
		center: new kakao.maps.LatLng(36.34982018787662, 127.38484244991709), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
		mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
	};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 1. 객체 생성 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


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

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });


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
function placesSearchCB(data, status, pagination) {
	if (status === kakao.maps.services.Status.OK) {

		// 정상적으로 검색이 완료됐으면
		// 검색 목록과 마커를 표출합니다
		displayPlaces(data);

		// 페이지 번호를 표출합니다
		displayPagination(pagination);

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
function displayPlaces(places) {

	var listEl = document.getElementById('placesList'),
		menuEl = document.getElementById('menu_wrap'),
		fragment = document.createDocumentFragment(),
		bounds = new kakao.maps.LatLngBounds(),
		listStr = '';

	// 검색 결과 목록에 추가된 항목들을 제거합니다
	removeAllChildNods(listEl);

	// 지도에 표시되고 있는 마커를 제거합니다
	removeMarker();

	for (var i = 0; i < places.length; i++) {

		// 마커를 생성하고 지도에 표시합니다
		var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
			marker = addMarker(placePosition, i),
			itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다		

		// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
		// LatLngBounds 객체에 좌표를 추가합니다
		bounds.extend(placePosition);

		// 마커와 검색결과 항목에 mouseover 했을때
		// 해당 장소에 인포윈도우에 장소명을 표시합니다
		// mouseout 했을 때는 인포윈도우를 닫습니다
		(function (marker, title) {
			kakao.maps.event.addListener(marker, 'mouseover', function () {
				displayInfowindow(marker, title);
			});

			kakao.maps.event.addListener(marker, 'mouseout', function () {
				infowindow.close();
			});

			itemEl.onmouseover = function () {
				displayInfowindow(marker, title);
			};

			itemEl.onmouseout = function () {
				infowindow.close();
			};
		})(marker, places[i].place_name);

		fragment.appendChild(itemEl);
	}

	// 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
	listEl.appendChild(fragment);
	menuEl.scrollTop = 0;
	document.body.scrollTop = document.documentElement.scrollTop = 0;

	// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
	map.setBounds(bounds);
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 4. 검색결과 항목 Element @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

	var el = document.createElement('div'),
		itemStr = '<div class="content s-left" style="border-top: 1px solid #DBDBDB;">' +
			'<a href="review">' +
			`<img class="c-img img${index}" src="#">` +
			'<div class="txt">' +
			'<p class="name">' + places.place_name + '</p>';


	if (places.road_address_name) {
		itemStr += '    <p class="addr">' + places.road_address_name + '</p>' +
			'   <p class="addr2">' + places.address_name + '</p>';
	} else {
		itemStr += '    <p class="addr">' + places.address_name + '</p>';
	}

	itemStr += '<div>' +
		`<img src="../resources/img/Icon open-pencil.png"><span class="revNum countCmt${index}"></span>` +
		`<img src="../resources/img/Icon material-photo-camera.png"><span class="revNum countImg${index}"></span>` +
		'</div>' +
		'</div>' +
		'</a>' +
		`<div class="score average${index}"></div>` +
		'<button class="like">' + '</button>' +
		'</div>';

	el.innerHTML = itemStr;
	el.className = 'sec_group_info';

	item.placeName = places.place_name;
	getReviewInfo(index); //장소 평점, 댓글 수, 이미지 갯수를 검색
	getImages(index);  //장소 대표 이미지를 검색

	//el 클릭 시 item 객체에 장소명, 주소, 도로명 주소를 저장
	$(el).click(() => {
		item.placeName = places.place_name;

		if (places.road_address_name) {
			item.placeRoadAddr = places.road_address_name;
			item.placeAddr = places.address_name;
		} else {
			item.placeAddr = places.address_name;
		}


		sendPlace();
	})

	return el;
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  5. 마커 생성, 표시, 제거 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
	var imageSrc = '../resources/img/marker.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
		imageSize = new kakao.maps.Size(33, 46),  // 마커 이미지의 크기
		imgOptions = {
			spriteSize: new kakao.maps.Size(33, 46), // 스프라이트 이미지의 크기
			spriteOrigin: new kakao.maps.Point(0, 0), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
			offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
		},
		markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
		marker = new kakao.maps.Marker({
			position: position, // 마커의 위치
			image: markerImage
		});

	marker.setMap(map); // 지도 위에 마커를 표출합니다
	markers.push(marker);  // 배열에 생성된 마커를 추가합니다

	return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
	var paginationEl = document.getElementById('pagination'),
		fragment = document.createDocumentFragment(),
		i;

	// 기존에 추가된 페이지번호를 삭제합니다
	while (paginationEl.hasChildNodes()) {
		paginationEl.removeChild(paginationEl.lastChild);
	}

	for (i = 1; i <= pagination.last; i++) {
		var el = document.createElement('a');
		el.href = "#";
		el.innerHTML = i;

		if (i === pagination.current) {
			el.className = 'on';
		} else {
			el.onclick = (function (i) {
				return function () {
					pagination.gotoPage(i);
				}
			})(i);
		}

		fragment.appendChild(el);
	}
	paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
	var content = '<h3 style="padding:5px;z-index:1;">' + title + '</h3>';

	infowindow.setContent(content);
	infowindow.open(map, marker);
	//makeOverlay(marker);

}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
	while (el.hasChildNodes()) {
		el.removeChild(el.lastChild);
	}
}

// 커스텀 오버레이가 표시될 위치입니다 
//var position = marker.getPostion();

// 커스텀 오버레이를 생성합니다
//var customOverlay = new kakao.maps.CustomOverlay({
//    position: position,
//    content: content,
//    xAnchor: 0.5,
//    yAnchor: 0.5
//});

// 커스텀 오버레이를 지도에 표시합니다
//customOverlay.setMap(map);
//}

$(function () {
	$("#user").click(() => {
		$(".map_user_menu").removeClass("hidden");
	})

	$("#map_user_menu_bg").click(() => {
		$(".map_user_menu").addClass("hidden");
	})

	$(".cancel").click(() => {
		history.back();
	});

})