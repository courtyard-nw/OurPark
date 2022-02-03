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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
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

@RequestMapping("/rest")
@RestController
public class ApiController {
	final String path = "review/";
	
	@Autowired
	ReviewService service;

	@GetMapping("/list")
	public String list(Model model, HttpSession session) {
		Member member = new Member();

		if (session.getAttribute("member") != "")
			member = (Member) session.getAttribute("member");

		List<Review> list = service.list(member.getId());

		model.addAttribute("list", list);
		
		//수정사항: API 컨트롤러에서 jsp 호출을 분리시켜야함 -> REST API 컨트롤러는 CRUD만 담당
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
	
	@PostMapping("/add")
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

		return "redirect:./list";
	}
	
	@GetMapping("/update/{code}")
	public String update(@PathVariable int code, Model model) {
		Review item = service.item(code);

		model.addAttribute("item", item);

		return path + "update";

	}
	
	@PutMapping("/update/{code}")
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

		return "redirect:../list";
	}
	
	@DeleteMapping("/delete/{code}")
	public String delete(@PathVariable int code) {
		service.delete(code);

		return "redirect:../list";
	}

	@GetMapping("/getCmt")
	public List<Review> getCmt(String placeId) {
		List<Review> list = service.getCmt(placeId);

		return list;
	}

	@GetMapping("/getImage")
	public List<ReviewImage> getImage(String placeId) {
		List<ReviewImage> image = service.getImage(placeId);

		return image;
	}
	
	@RequestMapping("/review")
	public String review() {
		return path + "review";
	}

	@GetMapping("/reviewInfo")
	public Map<String, Object> reviewInfo(String placeId) {

		System.out.println("server: " + placeId);
		HashMap<String, Object> map = new HashMap<String, Object>();

		double average = service.average(placeId);
		int countCmt = service.countCmt(placeId);
		int countImg = service.countImg(placeId);

		map.put("average", average);
		map.put("countCmt", countCmt);
		map.put("countImg", countImg);

		return map;
	}

	

}