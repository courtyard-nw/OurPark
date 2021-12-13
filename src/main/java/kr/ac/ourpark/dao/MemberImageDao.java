package kr.ac.ourpark.dao;

import kr.ac.ourpark.model.MemberImage;

public interface MemberImageDao {

	void add(MemberImage image);

	MemberImage item(String id);

}
