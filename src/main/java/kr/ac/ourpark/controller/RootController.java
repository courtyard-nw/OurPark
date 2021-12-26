package kr.ac.ourpark.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.ac.ourpark.model.Member;
import kr.ac.ourpark.model.MemberImage;
import kr.ac.ourpark.model.ReviewImage;
import kr.ac.ourpark.service.MemberService;
import kr.ac.ourpark.util.Uploader;

@RequestMapping("/")
@Controller
public class RootController {
	final String path = "review/";
	final String uploadPath = "D:///jihun/upload/";
	final String uploadPathMac = "file:///Users/jihunjang/Desktop/lecture/upload/";
	final String uploadPathSchool = "D:///upload/";
	
	
	@Autowired
	MemberService memberService;
		
	@ResponseBody
	@GetMapping("/checkId")
	public String checkId(String id) {
		if(memberService.checkId(id))
			return "OK";
		else
			return "USED";	
	}
	
	@GetMapping("/signup")
	public String signup() {
		return "signup";
	}
	
	@PostMapping("/signup")
	public String signup(Member member, @RequestParam("memberImage") List<MultipartFile> memberImage, HttpSession session) {
		
		try {
			Uploader<MemberImage> uploader = new Uploader<>();
			
			List<MemberImage> images = uploader.makeList(memberImage, MemberImage.class);
			
			member.setImages(images);
					
			memberService.signup(member);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "redirect:./";
	}
	
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@PostMapping("/login")
	public String login(Member member, HttpSession session, Model model) {
		MemberImage img = new MemberImage();
		
		if(memberService.login(member, img)) {
			System.out.println("로그인: " +  member);
			
			session.setAttribute("member", member);
			session.setAttribute("img", img);
			System.out.println("이미지: " +  img.getMember() + " " + img.getFilename());
						
			return "redirect:.";
		}
		System.out.println("로그인 실패:  " +  member);
		return "redirect:.";
	}
	
	@RequestMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		
		Member member = new Member();
		
		System.out.println("로그아웃" +  member);
		
		return "redirect:.";
	}
	
	
	@GetMapping("/myPage")
	public String myPage() {
		return "myPage";
	}
	
	@PostMapping("/myPage")
	public String myPage(Member member, HttpSession session) {
		memberService.update(member);
		
		session.setAttribute("member", member);
		
		return "redirect:./";
	}
	
	@RequestMapping("/")
	public String index() {
		return "index";
	}
}


