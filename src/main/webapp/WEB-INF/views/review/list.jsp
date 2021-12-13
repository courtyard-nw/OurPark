<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
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
                <tbody>
                  <c:if test="${list.size() < 1}">
                  	<tr>
                  		<td colspan="4" class="text-center">작성한 리뷰가 없습니다</td>
                  	</tr>
                  </c:if>
                  <c:forEach var="item" items="${list}">
                  	<tr>
                        <td>${item.code}</td>
                        <td><a href="#">${item.placeName}</a></td>
                        <td><fmt:formatDate value="${item.regDate}" pattern="yyyy-MM-dd a hh:mm:ss"/></td>
                        <td><a href="update/${item.code}"class="btn btn-secondary btn-sm">수정</a><a href="delete/${item.code}" class="btn btn-primary btn-sm">삭제</a></td>
                    </tr>
                  </c:forEach>    
                </tbody>
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

</html>