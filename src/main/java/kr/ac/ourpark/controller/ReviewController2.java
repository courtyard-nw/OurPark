package kr.ac.ourpark.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.ourpark.model.Review;

@RequestMapping("/review")
@Controller
public class ReviewController2 {
	final String path = "review/";
	
	@RequestMapping("/update")
	public String updateReview() {
		return path + "list";
	}
	
	@RequestMapping("/addAddr")
	public String addAddr() {
		return path + "addAddr";
	}
	
	@PostMapping("/addInfo")
	public String addInfo(Review item, HttpSession session) {

		session.setAttribute("placeAddr", item);

		return path + "addInfo";
	}

	@RequestMapping("/review")
	public String review() {
		return path + "review";
	}

}