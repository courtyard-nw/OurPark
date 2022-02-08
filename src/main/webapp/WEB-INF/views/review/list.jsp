<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>동네산책</title>

<jsp:include page="../include/head.jsp"></jsp:include>

<link rel="stylesheet" href="../resources/css/list.css">

</head>

<body>
	<div class="wrapper">
	<header>
          <div class="header">
              <div class="h_container">
                  <a href="../" id="logo">
                      <img src="../resources/img/logo_green.png" alt="로고">
                  </a>
                  <h3>리뷰 관리</h3>
              </div>
          </div>
      </header>
   <div class="container">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <td>리뷰 코드</td>
                        <td>장소</td>
                        <td>작성 날짜</td>
                        <td>변경</td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div>
            	<a href="../"><button class="btn btn-outline-secondary btn-sm">처음으로</button></a>
            </div>
        </div>
    </div>
    </div>
    <jsp:include page="../include/footer.jsp"></jsp:include>	
</body>

<jsp:include page="../include/body.jsp"></jsp:include>

<script src="../resources/js/list.js"></script>

</html>