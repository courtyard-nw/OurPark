package kr.ac.ourpark.dao;

import kr.ac.ourpark.model.Member;

public interface MemberDao {

	void signup(Member member);

	int checkId(String id);

	Member item(Member member);

	void update(Member member);

}
