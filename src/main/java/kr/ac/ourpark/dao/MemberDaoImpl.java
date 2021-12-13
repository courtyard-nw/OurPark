package kr.ac.ourpark.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.ourpark.model.Member;

@Repository
public class MemberDaoImpl implements MemberDao {
	
	@Autowired
	SqlSession sql;

	@Override
	public void signup(Member member) {
		sql.insert("member.signup", member);
	}

	@Override
	public int checkId(String id) {
		return sql.selectOne("member.check_id", id);
	}

	@Override
	public Member item(Member member) {
		return sql.selectOne("member.login", member);
	}

	@Override
	public void update(Member member) {
		sql.update("member.update", member);
		
	}
}
