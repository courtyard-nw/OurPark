<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

    <jsp:include page="../include/head.jsp"></jsp:include>
    
    <link rel="stylesheet" href="resources/css/signup.css">
    
</head>
<body>
    <div class="wrapper">
        <header>
            <div class="header">
                <div class="h_container">
                    <a href="map.html" id="logo">
                        <img src="img/logo_green.png" alt="로고">
                    </a>
                    <h3>마이 페이지</h3>
                </div>
            </div>
        </header>
        <section>
            <form action="">
                <div class="inp mt-3">
                    <label>아이디</label>
                    <input type="text" class="form-control" id="user_id" placeholder="아이디">
                </div>
                <div id="id_msg">*영문, 숫자 조합, 최대 32자</div>
                <div class="inp mt-3">
                    <label>비밀번호</label>
                    <input type="password" class="form-control" id="user_id" placeholder="비밀번호">
                </div>
                <div id="pw_msg">*8~16자리, 문자, 숫자, 특수기호 포함</div>
                <div class="inp mt-3">
                    <label>비밀번호 확인</label>
                    <input type="password" class="form-control" id="user_id" placeholder="비밀번호 확인">
                </div>
                <div class="inp mt-3">
                    <label>이름</label>
                    <input type="text" class="form-control" id="user_id" placeholder="이름">
                </div>
                <div class="inp mt-3">
                    <label>주소</label>
                    <input type="text" class="form-control" id="user_id" placeholder="주소를 검색해주세요">
                </div>
                <div class="inp mt-3">
                    <div class="inp" id="radio_wrapper">
                        <label>성별</label>
                        <div id="radio_gender">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" value="option1">
                                <label class="form-check-label">남성</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" value="option1">
                                <label class="form-check-label">여성</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" value="option1">
                                <label class="form-check-label">그 외</label>
                            </div>
                        </div>
                    </div>
                    <div class="inp" id="radio_wrapper2">   
                      <label>나이</label>
                      <input type="number" class="form-control" id="user_id" placeholder="만">
                    </div>
                </div>
                <div class="inp mt-3" id="age">
                </div>
                <div class="inp mt-3">
                    <label>닉네임</label>
                    <input type="text" class="form-control mt-2" id="user_id" placeholder="닉네임">
                </div>
                                
                
                <div class="btn-group mx-0 mt-5">
                    <a href="map.html"><div class="btn btn-outline-secondary btn-lg">이전</div></a>
                    <button class="btn btn-success btn-lg rounded-5 ">수정</button>
                </div>
            </form>
        </section>
        <div style="height: 200px;"></div>
    </div>
        <footer>
            <div class="footer">
                <div class="f_container">
                    <img src="img/logo.png" alt="로고">
                    <hr>
                    <h3 id="logo_text">누구나, 당연히</h3>
                    <h3 id="copyright">© 2021 Jihun. All rights reserved.</h3>
                </div>
            </div>
        </footer>
	<jsp:include page="../include/login.jsp"></jsp:include>
</body>
<jsp:include page="../include/body.jsp"></jsp:include>
</html>