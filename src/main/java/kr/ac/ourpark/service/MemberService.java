package kr.ac.ourpark.service;

import kr.ac.ourpark.model.Member;
import kr.ac.ourpark.model.MemberImage;

public interface MemberService {

	void signup(Member member);

	boolean checkId(String id);

	boolean login(Member member, MemberImage img);

	void update(Member member);


	
}
