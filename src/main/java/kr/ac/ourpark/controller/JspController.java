package kr.ac.ourpark.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.ourpark.model.Place;
import kr.ac.ourpark.model.Review;

@RequestMapping("/jsp")
@Controller
public class JspController {
	
	final String review = "review/";
	final String map = "map/";
	
	@GetMapping("/update/{code}")
	public String update(@PathVariable int code) {

		return review + "update";
	}
	
	@RequestMapping("/list")
	public String list() {
		return review + "list";
	}
	
	@PostMapping("/addInfo")
	public String addInfo(Review item, HttpSession session) {

		session.setAttribute("placeAddr", item);

		return review + "addInfo";
	}

	@RequestMapping("/addAddr")
	public String addAddr() {
		return review + "addAddr";
	}
	
	@RequestMapping("/review")
	public String review() {
		return review + "review";
	}
	
	@RequestMapping("/map")
	public String map(String keyword, HttpSession session) {

		session.setAttribute("keyword", keyword);

		return map + "map";
	}
	
	@ResponseBody
	@PostMapping("/sendPlace")
	public String review(@RequestBody Place item, HttpSession session) {

		session.setAttribute("place", item);

		return "sendPlace";
	}

}