<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>동네산책</title>

<jsp:include page="../include/head.jsp"></jsp:include>

<link rel="stylesheet" href="../resources/css/addAddr.css">

</head>

<body>
    <div class="wrapper">
        <header>
            <div class="header">
                <div class="h_container">
                    <a href="#" id="logo" class="cancel">
                        <img src="../resources/img/logo_green.png" alt="로고">
                    </a>
                    <h3>리뷰 등록</h3>
                </div>
            </div>
        </header>
        <section>
            <form action="addInfo" method="post" id="reviewForm">
                <div id="map"></div>
                <div class="coords mt-5">
                    <label class="form-label">위치</label>
                    <input type="text" id="keyword" class="form-control mt-2" name="placeAddr" placeholder="지도를 클릭하거나 장소 이름을 검색해주세요">
                    <button id="submitBtn" type="submit"></button>
                </div>
                <div class="name mt-5">
                    <label class="form-label">장소명</label>
                    <input type="text" id="name" class="form-control mt-2" name="placeName" placeholder="장소명이 자동으로 표시됩니다" readonly>
                    <input type="text" id="placeId" class="form-control mt-2" name="placeId" style="display: none;" readonly>
                </div>
                <div class="btn-group mx-0 mt-5">
                    <button class="btn btn-outline-secondary btn-lg rounded-5 cancel" type="button">취소</button>
                    <button class="btn btn-success btn-lg rounded-5">다음</button>
                </div>
            </form>
        </section>
        <div style="height: 200px;"></div>
    </div>
	<jsp:include page="../include/footer.jsp"></jsp:include>
</body>

<!-- 카카오 지도 api appkey -->
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1cd88e6e8c0c6c87da053fc7af08c2a8&libraries=services,clusterer,drawing"></script>

<script src="../resources/js/addMap.js"></script>

<jsp:include page="../include/body.jsp"></jsp:include>

</html>