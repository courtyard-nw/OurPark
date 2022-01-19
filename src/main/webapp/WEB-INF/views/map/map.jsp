<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>

    <jsp:include page="../include/head.jsp"></jsp:include>
    
    <link rel="sylesheet" href="../resources/css/hover.css">
    
    <link rel="stylesheet" href="../resources/css/overlay.css">
    
    <link rel="stylesheet" href="../resources/css/map.css" media="all">
    
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">

    <!-- <style>
    .bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    @media (min-width: 768px) {
      .bd-placeholder-img-lg {
        font-size: 3.5rem;
      }
    }
	</style> -->
	
</head>
<body>
    <header>
        <div class="header">
            <a href="../" id="logo"><img src="../resources/img/logo_green.png" alt="로고"></a>
            <c:if test="${sessionScope.member != null}">
               	<a href="../review/addAddr" id="review">리뷰 쓰기</a>
			</c:if>
            <a href="#" id="user">
            	<div style="background: url(../resources/img/user.png) no-repeat" class="user hvr-glow"></div>
           	</a>
           	<c:if test="${sessionScope.img != null}">
        		<img src="../upload/${sessionScope.img.uuid}_${sessionScope.img.filename}" id="userImg" class="userImg" alt="회원사진">	
       		</c:if>	
            <div id="header_input">
                <form onsubmit="searchPlaces(); return false;">
                    <div id="search-box"></div>
                    <input type="text" id="keyword" placeholder="동네 이름, 궁금한 장소를 입력하세요" value="${sessionScope.keyword}">
                   	<div id="searchBtn">
                   		<button id="searchBtn" type="submit"><img src="../resources/img/search_button.png" id="searchBtn_img"></button>
                   	</div>
                </form>
            </div>
        </div>
        <jsp:include page="../include/userMenu.jsp"></jsp:include>
    </header>
    <section>
    	<div class="map_wrap">
    		<div id="map"></div>
    	</div>
        <div class="sec_group s-left">
           <h3>우리 동네 주변의 공적 공간</h3>
            <div>
                <a href="#">
                    <img src="../resources/img/Icon metro-filter.png"> 
                    <h3 data-bs-toggle="modal" href="#exampleModalToggle" role="button">필터</h3>
                </a>
            </div>
            
			<!-- 카카오맵 목록 -->
            <div id="menu_wrap" class="bg_white">
				<ul id="placesList"></ul>
       			<div id="pagination" class="pagi"></div>
			</div>

           <!-- <div class="sec_group_info">
               <hr class="line s-left l-top">
               <div class="content s-left">
                   <a href="#info">
                        <img src="img/photo.png">
                        <div class="txt">
                            <p class="name">은구비 공원</p>
                            <p class="category">공원</p>
                            <p class="addr">대전 유성구 노은동로 166</p>
                            <div>
                                <img src="img/Icon open-pencil.png"><span class="revNum">68</span>
                                <img src="img/Icon material-photo-camera.png"><span class="revNum">130</span>
                            </div>
                        </div>
                    </a>
                    <div class="score">4.6</div>
                    <button class="like"><img src="img/Icon feather-heart.png"></button>
                </div>
           </div> -->
           
            <!-- <ul class="uk-pagination pagi">
                <li><a href="#"><span uk-pagination-previous></span></a></li>
                <li class="uk-active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#"><span uk-pagination-next></span></a></li>
            </ul>  -->
            
        </div>
    </section>
    
    <div style="width:200px; height: 1380px;" id="sec_scroll"></div>
    
    <jsp:include page="../include/footer.jsp"></jsp:include> 
  
	<jsp:include page="../include/login.jsp"></jsp:include>
	
</body>

<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1cd88e6e8c0c6c87da053fc7af08c2a8&libraries=services,clusterer,drawing"></script>

<script src="../resources/js/map.js"></script>

<!-- Swiper JS -->
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

<script>
	var swiper = new Swiper(".swiper", {
	    slidesPerView: 1,
	    spaceBetween: 0.3,
	    keyboard: {
	        enabled: true,
	    },
	    pagination: {
	        el: ".swiper-pagination",
	        clickable: true,
	        dynamicBullets: true
	    },
	    navigation: {
	        nextEl: ".swiper-button-next",
	        prevEl: ".swiper-button-prev",
	    },
	});
</script>

<jsp:include page="../include/body.jsp"></jsp:include>

</html>