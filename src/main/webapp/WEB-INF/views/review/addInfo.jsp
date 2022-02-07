<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>동네산책</title>

<jsp:include page="../include/head.jsp"></jsp:include>

<link rel="stylesheet" href="../resources/css/addInfo.css">

<link rel="stylesheet" href="../resources/css/star.css">

<script src="../resources/js/addInfo.js"></script>

</head>

<body>
    <div class="wrapper">
        <header>
            <div class="header">
                <div class="h_container">
                    <a href="../" id="logo">
                        <img src="../resources/img/logo_green.png" alt="로고">
                    </a>
                    <h3>리뷰 등록</h3>
                </div>
            </div>
        </header>
        <section>
            <div id="modify">
                <a href="#" class="cancel">수정</a>
            </div>
            <form action="../rest" method="post" enctype="multipart/form-data">
            
                <div class="inp">
                    <label>위치</label>
                    <input type="text" class="form-control mt-2" id="placeAddr" name="placeAddr" value="${sessionScope.placeAddr.placeAddr}" readonly>
                </div>
                
                <div class="inp mt-5">
                    <label>이름</label>
                    <input type="text" class="form-control mt-2" id="placeName" name="placeName" value="${sessionScope.placeAddr.placeName}" readonly>
                    <input type="text" id="placeId" class="form-control mt-2" name="placeId" style="display: none;" value="${sessionScope.placeAddr.placeId}" readonly>
                </div>
                      
                <div class="inp mt-5">
                    <label>평가</label>
                    <div id="full-stars-example-two">
                        <div class="rating-group">
                            <input disabled checked class="rating__input rating__input--none" name="rating" id="rating3-none" type="radio">
                            <label aria-label="1 star" class="rating__label" for="rating3-1"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                            <input class="rating__input" name="rating" id="rating3-1" value="1" type="radio">
                            <label aria-label="2 stars" class="rating__label" for="rating3-2"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                            <input class="rating__input" name="rating" id="rating3-2" value="2" type="radio">
                            <label aria-label="3 stars" class="rating__label" for="rating3-3"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                            <input class="rating__input" name="rating" id="rating3-3" value="3" type="radio">
                            <label aria-label="4 stars" class="rating__label" for="rating3-4"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                            <input class="rating__input" name="rating" id="rating3-4" value="4" type="radio">
                            <label aria-label="5 stars" class="rating__label" for="rating3-5"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                            <input class="rating__input" name="rating" id="rating3-5" value="5" type="radio">
                        </div>
                    </div>
                </div>
                
                <div class="inp mt-5">
                    <label id="descript">설명</label>
                    <textarea cols="30" rows="10" class="info form-control" name="info"></textarea>
                </div>
                
                <div class="inp mt-5 img_uploader_container">
                    <label>이미지</label>
                    <input class="form-control img_uploader" type="file" name="reviewImage" multiple>
                </div>
                
                <div class="btn-group mx-0 mt-5">
                    <div class="btn btn-outline-secondary btn-lg cancel">이전</div>
                    <button class="btn btn-success btn-lg rounded-5 ">등록</button>
                </div>
            </form>
        </section>
        <div style="height: 200px;"></div>
    </div>
    <jsp:include page="../include/footer.jsp"></jsp:include>
     
	<!-- <div class="inp mt-5">
	    <label>유형</label>
	    <div class="category">
	        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
	        <label class="btn btn-outline-success btn rounded-pill btn-lg" for="btnradio1">공원</label>
	      
	        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
	        <label class="btn btn-outline-success btn rounded-pill btn-lg" for="btnradio2">놀이터</label>
	      
	        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
	        <label class="btn btn-outline-success btn rounded-pill btn-lg" for="btnradio3">광장</label>
	    </div>
	</div>  -->
	
</body>

<!-- fontawesome -->
<script src="https://kit.fontawesome.com/396df7b21e.js" crossorigin="anonymous"></script>

<jsp:include page="../include/body.jsp"></jsp:include>

</html>