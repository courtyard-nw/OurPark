package kr.ac.ourpark.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.ourpark.model.Place;
import kr.ac.ourpark.model.Review;
import kr.ac.ourpark.model.ReviewImage;

@RequestMapping("/map")
@Controller
public class MapController {
	final String path = "map/";


	@ResponseBody
	@PostMapping("/sendPlace")
	public String review(@RequestBody Place item, HttpSession session, Review review, ReviewImage img, Model model) {

		session.setAttribute("place", item);

		String placeName = item.getPlaceName();
		System.out.println("ajax success: " + placeName);

		return "sendPlace";
	}

	@RequestMapping("/map")
	public String map(String keyword, HttpSession session) {

		session.setAttribute("keyword", keyword);

		return path + "map";
	}

}
