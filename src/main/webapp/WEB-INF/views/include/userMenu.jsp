<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

    <div class="user_menu hidden">
       	<c:if test="${sessionScope.member == null}">
            <a href="../signup">회원가입</a>
            <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">로그인</a>
            <hr>
            <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" id="login">리뷰 쓰기</a>
           </c:if>
		<c:if test="${sessionScope.member != null}">
            <a href="../myPage">마이페이지</a>
            <a href="review/update">리뷰 관리</a>
            <a href="logout">로그아웃</a>
            <hr>
		</c:if>
           <div id="user_menu_bg"></div>
      </div>
        
    <div class="map_user_menu hidden">
       	<c:if test="${sessionScope.member == null}">
            <a href="../signup">회원가입</a>
            <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">로그인</a>
            <hr>
            <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" id="login">리뷰 쓰기</a>
           </c:if>
		<c:if test="${sessionScope.member != null}">
            <a href="../myPage">마이페이지</a>
            <a href="update">리뷰 관리</a>
            <hr>
            <a href="../logout">로그아웃</a>
		</c:if>
           <div id="map_user_menu_bg"></div>
      </div>