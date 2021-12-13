package kr.ac.ourpark.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.ourpark.model.MemberImage;

@Repository
public class MemberImageDaoImpl implements MemberImageDao {
	
	@Autowired
	SqlSession sql;

	@Override
	public void add(MemberImage image) {
		sql.insert("member_image.add", image);
	}

	@Override
	public MemberImage item(String id) {
		return sql.selectOne("member_image.item", id);
	}

}
