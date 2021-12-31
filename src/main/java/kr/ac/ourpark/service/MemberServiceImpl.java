package kr.ac.ourpark.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.ourpark.dao.MemberDao;
import kr.ac.ourpark.dao.MemberImageDao;
import kr.ac.ourpark.model.Member;
import kr.ac.ourpark.model.MemberImage;

@Service
public class MemberServiceImpl implements MemberService {
	
	@Autowired
	MemberDao dao;
	
	@Autowired
	MemberImageDao memberImageDao;

	@Override
	@Transactional
	public void signup(Member member) {
		if(member != null) {
			dao.signup(member);
			
			for(MemberImage image : member.getImages()) {
				image.setMember(member.getId());
				
				memberImageDao.add(image);
			}
		}
	}

	@Override
	public boolean checkId(String id) {
		if(dao.checkId(id) == 0)
			return true;
		else
			return false;
	}

	@Override
	public boolean login(Member member, MemberImage img) {
		Member item = dao.item(member);
			
		//세션에 저장되는 member 클래스의 필드에 값 저장 -> 주소, 나이 등의 정보를 저장하기 때문에 보안에 문제가 될 수 있음
		if(item != null) {
			member.setId(item.getId());
			member.setPasswd(null);
			member.setName(item.getName());
			member.setAddress(item.getAddress());
			member.setGender(item.getGender());
			member.setAge(item.getAge());
			member.setNickname(item.getNickname());
			
			MemberImage imgItem = memberImageDao.item(item.getId());
			if(imgItem != null) {
				img.setFilename(imgItem.getFilename());
				img.setUuid(imgItem.getUuid());
			}
			
			return true;
		}
		
		return false;
	}

	@Override
	public void update(Member member) {
		dao.update(member);
		
		Member item = dao.item(member);
		
		if(item != null) {
			member.setPasswd(null);
			member.setName(item.getName());
			member.setAddress(item.getAddress());
			member.setGender(item.getGender());
			member.setAge(item.getAge());
			member.setNickname(item.getNickname());
			return;
		}
		
	}

}
