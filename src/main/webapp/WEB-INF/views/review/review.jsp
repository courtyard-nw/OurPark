<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<jsp:include page="../include/head.jsp"></jsp:include>

<link rel="stylesheet" href="../resources/css/review.css">

<link rel="stylesheet" href="../resources/css/swiper.css">

<!-- Link Swiper's CSS -->
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

</head>

<body>
    <div class="wrapper">
        <header>
            <div class="header">
                <a href="#" id="logo"><img src="../resources/img/logo_green.png" alt="로고"></a>
                <a href="#" id="user">
                    <div style="background: url(../resources/img/user.png) no-repeat" class="user hvr-glow"></div>
                </a>
                <c:if test="${sessionScope.img != null}">
        			<img src="../upload/${sessionScope.img.uuid}_${sessionScope.img.filename}" id="userImg" class="userImg" alt="회원사진">	
       			</c:if>
                <div id="header_input">
                    <form action="../map/map?keyword=" method="get">
                        <div id="search-box"></div>
                        <input type="text" placeholder="동네 이름, 궁금한 장소를 입력하세요" name="keyword">
                        <!-- <a href="#"><img src="img/search_button.png" id="search_button"></a> -->
                    </form>
                </div>
            </div>
            <jsp:include page="../include/userMenu.jsp"></jsp:include>
        </header>
        <section>
            <div class="img_container">
                <a href="#" id="swiper">
                    <img class="main_img" src="#">
                    <div class="img_container_2">
                        <img class="img img1" src="#">
                        <img class="img img2" src="#">
                        <img class="img img3" src="#">
                        <img class="img img4" src="#">
                    </div>
                </a>
            </div>
            <div class="content">
                <div class="c_header">
                    <h3 class="name">${sessionScope.place.placeName}</h3>
                    <h3 class="rate" id="average">${average}</h3>
                    <div class="write">
                    <c:if test="${sessionScope.member != null}">
	                    <a href="../review/addAddr">
	                        <img src="../resources/img/Icon open-pencil2.png">
	                        <div>리뷰 쓰기</div>
	                    </a>
					</c:if>
                    </div>
                    <!-- <div class="like">
                        <a href="#4">
                            <img src="../resources/img/Icon feather-heart.png">
                            <div>좋아요</div>
                        </a>
                    </div>  -->
                    <div class="review_count">
                        <img src="../resources/img/Icon open-pencil.png"><span class="revNum" id="countCmt">${countCmt}</span>
                        <img src="../resources/img/Icon material-photo-camera.png"><span class="revNum" id="countImg">${countImg}</span>
                    </div>
                    <p class="addr">주소: ${sessionScope.place.placeAddr}</p>
                   	<p class="addr_info">${sessionScope.place.placeRoadAddr}</p> 
                </div>
            
	        <h3 class="c_h3" id="countCmt2"></h3>
			<div class="comment_container">                  
	            <div class="more d-grid col-6">
	                <button class="btn btn-outline-success btn-lg ">더보기</button>
	            </div>
            </div>
        </section>
    </div>
    
	<jsp:include page="../include/footer.jsp"></jsp:include>
	
	<jsp:include page="../include/login.jsp"></jsp:include>
	
	<jsp:include page="../include/swiper.jsp"></jsp:include>
	
</body>
<jsp:include page="../include/body.jsp"></jsp:include>

<script src="../resources/js/review.js"></script>

<!-- Swiper JS -->
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

<script>
	var swiper = new Swiper(".mySwiper", {
	    slidesPerView: 1,
	    spaceBetween: 30,
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

</html>