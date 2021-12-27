package kr.ac.ourpark.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.support.SessionAttributeStore;
import org.springframework.web.multipart.MultipartFile;

import kr.ac.ourpark.model.Member;
import kr.ac.ourpark.model.MemberImage;
import kr.ac.ourpark.model.Place;
import kr.ac.ourpark.model.Review;
import kr.ac.ourpark.model.ReviewImage;
import kr.ac.ourpark.service.ReviewService;
import kr.ac.ourpark.util.Uploader;

@RequestMapping("/map")
@Controller
public class MapController {
	final String path = "map/";

	@Autowired
	ReviewService service;

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
