package kr.ac.ourpark.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import kr.ac.ourpark.model.Member;
import kr.ac.ourpark.model.Review;
import kr.ac.ourpark.model.ReviewImage;
import kr.ac.ourpark.service.ReviewService;
import kr.ac.ourpark.util.Uploader;

@RequestMapping("/rest")
@RestController
public class ApiController {

	@Autowired
	ReviewService service;

	@GetMapping("/list")
	public List<Review> list(HttpSession session) {
		Member member = new Member();

		if (session.getAttribute("member") != "")
			member = (Member) session.getAttribute("member");

		List<Review> list = service.list(member.getId());

		return list;
	}

	@GetMapping("/list/{code}")
	public Review update(@PathVariable int code) {

		return service.item(code);
	}

	@GetMapping("/list/{placeId}/cmt")
	public List<Review> cmt(@PathVariable String placeId) {
		List<Review> list = service.getCmt(placeId);

		return list;
	}

	@GetMapping("/list/{placeId}/image")
	public List<ReviewImage> image(@PathVariable String placeId) {
		List<ReviewImage> image = service.getImage(placeId);

		return image;
	}

	@GetMapping("/list/{placeId}/info")
	public Map<String, Object> reviewInfo(@PathVariable String placeId) {

		HashMap<String, Object> map = new HashMap<String, Object>();

		map.put("average", service.average(placeId));
		map.put("countCmt", service.countCmt(placeId));
		map.put("countImg", service.countImg(placeId));

		return map;
	}

	@PostMapping
	public String add(Review item, @RequestParam("reviewImage") List<MultipartFile> reviewImage,
			@SessionAttribute(required = false) Member member, HttpSession session) {

		try {
			Uploader<ReviewImage> uploader = new Uploader<>();

			List<ReviewImage> images = uploader.makeList(reviewImage, ReviewImage.class);

			item.setImages(images);

			if (session.getAttribute("member") != null)
				item.setMember(member.getId());

			service.add(item);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return "add";
	}

	@PutMapping("/{code}")
	public String update(@PathVariable int code, Review item,
			@RequestParam("reviewImage") List<MultipartFile> reviewImage) {

		try {

			Uploader<ReviewImage> uploader = new Uploader<>();

			List<ReviewImage> images = uploader.makeList(reviewImage, ReviewImage.class);

			item.setImages(images);
			item.setCode(code);

			service.update(item);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return "update";
	}

	@DeleteMapping("/{code}")
	public String delete(@PathVariable int code) {
		service.delete(code);

		return "delete";
	}

//	@RequestMapping("/addAddr")
//	public String addAddr() {
//		return path + "addAddr";
//	}
//	
//	@PostMapping("/addInfo")
//	public String addInfo(Review item, HttpSession session) {
//
//		session.setAttribute("placeAddr", item);
//
//		return path + "addInfo";
//	}

//	@RequestMapping("/review")
//	public String review() {
//		return path + "review";
//	}

}