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
import kr.ac.ourpark.model.Place;
import kr.ac.ourpark.model.Review;
import kr.ac.ourpark.model.ReviewImage;
import kr.ac.ourpark.service.ReviewService;

@RequestMapping("/review")
@Controller
public class ReviewController {
	final String path = "review/";
	final String upldPathHome = "D:///jihun/upload/";
	final String upldPathMac = "/Users/jihunjang/Desktop/upload/";
	final String upldPathSchool = "D:///upload/";
	
	@Autowired
	ReviewService service;
	
	@PostMapping("/update/{code}")
	public String update(@PathVariable int code, Review item, @RequestParam("reviewImage") List<MultipartFile> reviewImage) {

		try {
			List<ReviewImage> images = new ArrayList<ReviewImage>();

			for (MultipartFile file : reviewImage) {
				if (!file.isEmpty()) {
					String filename = file.getOriginalFilename();
					String uuid = UUID.randomUUID().toString();

					file.transferTo(new File(upldPathMac + uuid + "_" + filename));

					ReviewImage image = new ReviewImage();
					image.setFilename(filename);
					image.setUuid(uuid);

					images.add(image);
				}
			}
			item.setImages(images);
			item.setCode(code);
					
			service.update(item);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "redirect:../list";
	}
	
	@GetMapping("/update/{code}")
	public String update(@PathVariable int code, Model model) {
		Review item = service.item(code);
		
		model.addAttribute("item", item);
		
		return path + "update";
		
	}
	
	
	@RequestMapping("/delete/{code}")
	public String delete(@PathVariable int code) {
		service.delete(code);
		
		return "redirect:../list";
	}
	
	@RequestMapping("/list")
	public String list(Model model, HttpSession session) {
		Member member = new Member();
		
		if(session.getAttribute("member") != "")
			member = (Member) session.getAttribute("member");
		
		List<Review> list = service.list(member.getId());
		
		model.addAttribute("list", list);
		
		return path + "list";
	}
	
	@GetMapping("/getCmt")
	@ResponseBody
	public List<Review> getCmt(String placeName) {
		List<Review> list = service.getCmt(placeName);
		
		return list;
	}
	
	@GetMapping("/getImage")
	@ResponseBody
	public List<ReviewImage> getImage(String placeName) {
		List<ReviewImage> image = service.getImage(placeName);
		
		return image;
	}
	
	
	@GetMapping("/reviewInfo")
	@ResponseBody
	public Map<String, Object> reviewInfo(String placeName) {

		System.out.println("server: " + placeName);
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		double average = service.average(placeName);
		int countCmt = service.countCmt(placeName);
		int countImg = service.countImg(placeName);
		
		map.put("average", average);
		map.put("countCmt", countCmt);
		map.put("countImg", countImg);
		
		return map;
	}
	
	@RequestMapping("/review")
	public String review() {
		return path + "review";
	}
	
	@ResponseBody
	@PostMapping("/sendPlace")
	public String review(@RequestBody Place item, HttpSession session, Review review, ReviewImage img, Model model) {

		session.setAttribute("place", item);
		
		String placeName = item.getPlaceName();
		System.out.println("ajax success: " + placeName);
			
		return "sendPlace";
	}

	@PostMapping("/add")
	public String add(Review item, @RequestParam("reviewImage") List<MultipartFile> reviewImage, @SessionAttribute(required = false) Member member, HttpSession session) {

		try {
			List<ReviewImage> images = new ArrayList<ReviewImage>();

			for (MultipartFile file : reviewImage) {
				if (!file.isEmpty()) {
					String filename = file.getOriginalFilename();
					String uuid = UUID.randomUUID().toString();

					file.transferTo(new File(upldPathMac + uuid + "_" + filename));

					ReviewImage image = new ReviewImage();
					image.setFilename(filename);
					image.setUuid(uuid);

					images.add(image);
				}
			}
			item.setImages(images);
			
			if(session.getAttribute("member") != null)
				item.setMember(member.getId());
					
			service.add(item);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return "redirect:../";
	}

	@PostMapping("/addInfo")
	public String addInfo(Review item, HttpSession session) {

		session.setAttribute("placeAddr", item);

		return path + "addInfo";
	}

	@RequestMapping("/addAddr")
	public String addAddr() {
		return path + "addAddr";
	}

	@RequestMapping("/map")
	public String map(String keyword, HttpSession session) {
		
		session.setAttribute("keyword", keyword);
		
		return path + "map";
	}

}
