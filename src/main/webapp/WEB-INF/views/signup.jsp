<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

    <!-- Bootstrap css -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
	
	<!-- Bootstrap modal css-->
	<link rel="canonical" href="https://getbootstrap.com/docs/5.1/examples/modals/">

	<!-- common css -->
	<link rel="stylesheet" href="resources/css/footer.css">
	
	<!-- JQuery -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<title>동네산책</title>
    
    <link rel="stylesheet" href="resources/css/signup.css">
    
    <script src="resources/js/signup.js"></script>
    
</head>
<body>
	<div class="wrapper">
	    <header>
	        <div class="header">
	            <div class="h_container">
	                <a href="./" id="logo">
	                    <img src="img/logo_green.png" alt="로고">
	                </a>
	                <h3>회원가입</h3>
	            </div>
	        </div>
	    </header>
	    <section>
	        <form id="signupForm" method="post" enctype="multipart/form-data">
	            <div class="inp mt-3">
	                <label>아이디</label>
	                <input type="text" class="form-control id" name="id" placeholder="영문, 숫자 조합, 최대 32자">
	            </div>
	            <div class="warn_msg hidden" id="id_msg">*아이디를 입력해주세요</div>
	            <div class="inp mt-3">
	                <label>비밀번호</label>
	                <input type="password" class="form-control passwd" name="passwd" placeholder="8~16자리, 문자, 숫자, 특수기호 포함">
	            </div>
	            <div class="warn_msg hidden" id="passwd_msg">*비밀번호를 입력해주세요</div>
	            <div class="inp mt-3">
	                <label>비밀번호 확인</label>
	                <input type="password" class="form-control passwd_confirm" name="passwd_confirm" placeholder="비밀번호 확인">
	            </div>
	            <div class="warn_msg hidden" id="passwdConfirm_msg">*비밀번호 확인을 입력해주세요</div>
	            <div class="inp mt-3">
	                <label>이름</label>
	                <input type="text" class="form-control name" name="name"  placeholder="이름">
	            </div>
	            <div class="warn_msg hidden" id="name_msg">*이름을 입력해주세요</div>
	            <div class="inp mt-3">
	                <label>주소</label>
	                <input type="text" class="form-control address" name="address" placeholder="주소를 검색해주세요">	                
	            </div>
	            <div class="warn_msg hidden" id="address_msg">*주소를 입력해주세요</div>
	            <div class="inp mt-3">
	                <div class="inp" id="radio_wrapper">
	                    <label>성별</label>
	                    <div id="radio_gender">
	                        <div class="form-check form-check-inline">
	                            <input class="form-check-input" type="radio" name="gender" value="male">
	                            <label class="form-check-label">남성</label>
	                        </div>
	                        <div class="form-check form-check-inline">
	                            <input class="form-check-input" type="radio" name="gender" value="female">
	                            <label class="form-check-label">여성</label>
	                        </div>
	                        <div class="form-check form-check-inline">
	                            <input class="form-check-input" type="radio" name="gender" value="third">
	                            <label class="form-check-label">그 외</label>
	                        </div>
	                    </div>
	                </div>
 					
	                <div class="inp" id="radio_wrapper2">
	                  <label>나이</label>
	                  <input type="number" class="form-control age" name="age" placeholder="만">
	                </div>
	            </div>
	            <div class="warn_msg hidden" id="gender_msg">*성별을 선택해주세요</div><div class="warn_msg hidden" id="age_msg">*나이를 입력해주세요</div>

	            <div class="inp mt-3">
	                <label>닉네임</label>
	                <input type="text" class="form-control mt-2 nickname" name="nickname" placeholder="닉네임">
	            </div>
	            <div class="warn_msg hidden" id="nickname_msg">*닉네임을 입력해주세요</div>
	            
	            <div class="inp mt-5">
                    <label>회원 이미지</label>
                    <input class="form-control imgUploader" type="file" name="memberImage">
                </div>
	                            
	            <div class="btn-group mx-0 mt-5">
	                <a href="#"><div class="btn btn-outline-secondary btn-lg cancel">취소</div></a>
	                <button class="btn btn-success btn-lg rounded-5 submit" type="button">가입</button>
	            </div>
	        </form>
	    </section>
    <div style="height: 200px;"></div>
	</div>

    <footer>
		<div class="f_container">
			<img src="resources/img/logo.png" alt="로고">
			<hr>
			<h3 id="logo_text">누구나, 당연히</h3>
			<h3 id="copyright">© 2021 Jihun. All rights reserved.</h3>
		</div>
	</footer>
	
</body>
<jsp:include page="include/body.jsp"></jsp:include>
</html>