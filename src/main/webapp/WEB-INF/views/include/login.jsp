<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div class="modal fade" tabindex="-1" role="dialog" id="loginModal"	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content rounded-5 shadow">
			<div class="modal-header p-5 pb-4 border-bottom-0">
				<!-- <h5 class="modal-title">Modal title</h5> -->
				<h2 class="mb-0" id="modal-login">로그인</h2>
				<button type="button" class="btn-close" data-bs-dismiss="modal"	aria-label="Close"></button>
			</div>
			<div class="modal-body p-5 pt-0">
				<form method="post" action="../login">
					<div class="form-floating mb-3">
						<input type="text" class="form-control rounded-4" id="floatingInput" name="id" placeholder="name@example.com">
						<label for="floatingInput">아이디</label>
					</div>
					<div class="form-floating mb-3">
						<input type="password" class="form-control rounded-4" id="floatingPassword" name="passwd" placeholder="Password">
						<label for="floatingPassword">비밀번호</label>
					</div>
					<button class="w-100 mb-2 btn btn-lg rounded-4 btn-success" type="submit">로그인</button>
					<small class="text-muted">By clicking Sign up, you agree to	the terms of use.</small>
					<hr class="my-4">
					<a href="../signup" class="w-100 py-2 mb-2 btn btn-outline-dark rounded-4"> 회원가입 </a>
				</form>
			</div>
		</div>
	</div>
</div>