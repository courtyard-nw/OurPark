<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
		<!DOCTYPE html>
		<html>

		<head>
			<!-- Bootstrap css -->
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
				integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
				crossorigin="anonymous">

			<!-- Bootstrap modal css-->
			<link rel="canonical" href="https://getbootstrap.com/docs/5.1/examples/modals/">
			<!-- Custom styles for modal -->
			<link href="resources/css/modals.css" rel="stylesheet">

			<!-- common css -->
			<link rel="stylesheet" href="resources/css/user_menu.css">
			<link rel="stylesheet" href="resources/css/footer.css">

			<!-- JQuery -->
			<script src="https://code.jquery.com/jquery-3.6.0.min.js"
				integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
			<link rel="stylesheet" href="resources/css/index.css">

			<title>동네산책</title>
		</head>

		<body>
			<header>
				<div class="header">
					<div id="header_bg" style="background: url(resources/img/header_background_darker.png) no-repeat;">
					</div>
					
					<c:if test="${sessionScope.item != null}">
						<p>${sessionScope.item}님</p>
					</c:if>
					<a href="." id="logo"><img src="resources/img/logo.png" alt="로고"></a>
					<c:if test="${sessionScope.member != null}">
						<a href="review/addAddr" id="review">리뷰 쓰기</a>
					</c:if>
					<a href="#" id="user">
						<img src="resources/img/user.png" id="defaultImg" class="t" alt="회원메뉴 버튼">
						<c:if test="${sessionScope.img != null}">
							<img src="upload/${sessionScope.img.uuid}_${sessionScope.img.filename}" id="userImg"
								class="userImg" alt="회원사진">
						</c:if>
					</a>
					<h3 class="header_txt">
						우리 동네와 내 주변에 있는 공원들의
						<div>풍경을 발견하고 나눠봐요!</div>
					</h3>
					<div id="header_input">
						<form action="jsp/map" method="get">
							<div id="search-box" class="hvr-glow"></div>
							<input type="text" placeholder="동네 이름, 궁금한 장소를 입력하세요" name="keyword">
							<button id="searchBtn" type="submit">
								<img src="resources/img/search_button.png">
							</button>
						</form>
					</div>
				</div>

				<div class="user_menu hidden">
					<c:if test="${sessionScope.member == null}">
						<a href="signup">회원가입</a>
						<a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" id="login">로그인</a>
						<hr>
						<a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" id="login">리뷰 쓰기</a>
					</c:if>
					<c:if test="${sessionScope.member != null}">
						<a href="myPage">마이페이지</a>
						<a href="review/update">리뷰 관리</a>
						<hr>
						<a href="logout">로그아웃</a>
					</c:if>
					<div id="user_menu_bg"></div>
				</div>
			</header>

			<section>
				<div class="main">
					<h2>우리 동네의 공적 공간</h2>
					<!-- <a href="#">리스트 더보기</a> -->
					<div id="container">
						<a href="jsp/map?keyword=노은동 어린이공원">
							<div style="background: url(resources/img/playground.png) no-repeat;">
								<h3>
									혼자 있기 좋은<br>
									<span>놀이터</span>
								</h3>
							</div>
						</a> <a href="jsp/map?keyword=은구비 공원">
							<div style="background: url(resources/img/park.png) no-repeat;">
								<h3>
									나무가 울창한<br>
									<span>공원</span>
								</h3>
							</div>
							<!-- <img src="resources/img/park.JPG">
                    <h3>나무가 울창한<br>공원</h3>  -->
						</a> <a href="jsp/map?keyword=대전수목원">
							<div style="background: url(resources/img/expo.png) no-repeat;">
								<h3>
									사람들로 활기찬<br>광장
								</h3>
							</div>
						</a>
					</div>
				</div>
			</section>

			<footer>
				<div class="f_container">
					<img src="resources/img/logo.png" alt="로고">
					<hr>
					<h3 id="logo_text">누구나, 당연히</h3>
					<h3 id="copyright">© 2021 Jihun. All rights reserved.</h3>
				</div>
			</footer>

			<div class="modal fade" tabindex="-1" role="dialog" id="loginModal" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content rounded-5 shadow">
						<div class="modal-header p-5 pb-4 border-bottom-0">
							<!-- <h5 class="modal-title">Modal title</h5> -->
							<h2 class="mb-0" id="modal-login">로그인</h2>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body p-5 pt-0">
							<form method="post" action="login">
								<div class="form-floating mb-3">
									<input type="text" class="form-control rounded-4" id="floatingInput" name="id"
										placeholder="name@example.com">
									<label for="floatingInput">아이디</label>
								</div>
								<div class="form-floating mb-3">
									<input type="password" class="form-control rounded-4" id="floatingPassword"
										name="passwd" placeholder="Password">
									<label for="floatingPassword">비밀번호</label>
								</div>
								<button class="w-100 mb-2 btn btn-lg rounded-4 btn-success" type="submit">로그인</button>
								<small class="text-muted">By clicking Sign up, you agree
									to the terms of use.</small>
								<hr class="my-4">
								<a href="signup" class="w-100 py-2 mb-2 btn btn-outline-dark rounded-4"> 회원가입
								</a>
							</form>
						</div>
					</div>
				</div>
			</div>
			
				<div class="modal fade" tabindex="-1" role="dialog" id="signupModal" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content rounded-5 shadow">
							<button type="button" class="btn-close p-3 pt-4 pb-0" data-bs-dismiss="modal" aria-label="Close"></button>
							<div class="modal-header pt-0 pb-1 border-bottom-0 justify-content-center">
								<h3 class="mb-0 fs-4" id="modal-login">회원가입 완료</h3>
							</div>
							<hr class="my-1">
							<div class="text-center p-4 pb-4">
								<p class="fs-3 fw-bold">동네 산책에 오신 것을 환영합니다</p>
								<p class="fs-5 pt-2">이제 우리 주변의 공적 공간을 살펴보세요!</p>
							</div>
							<div class="modal-body p-5 pt-0 pb-3">
								<button type="button" class="w-100 mb-2 btn btn-lg rounded-4 btn-success" data-bs-dismiss="modal" id="hideBtn">확인</button>
							</div>
						</div>
					</div>
				</div>
			
		</body>
		
		<jsp:include page="include/body.jsp"></jsp:include>
		
		<script src="resources/js/index.js"></script>

		</html>