package kr.ac.ourpark.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.ourpark.model.ReviewImage;

@Repository
public class ReviewImageDaoImpl implements ReviewImageDao {
	@Autowired
	SqlSession sql;

	@Override
	public void add(ReviewImage image) {
		sql.insert("review_image.add", image);
	}

	@Override
	public int countImg(String placeId) {
		return sql.selectOne("review_image.count_img", placeId);
	}

	@Override
	public List<ReviewImage> getImage(String placeId) {
		return sql.selectList("review_image.get_image", placeId);
	}

	@Override
	public void delete(int code) {
		sql.delete("review_image.delete", code);
		
	}


}
