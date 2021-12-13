package kr.ac.ourpark.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.ourpark.model.Review;

@Repository
public class ReviewDaoImpl implements ReviewDao {
	
	@Autowired
	SqlSession sql;

	@Override
	public void add(Review item) {
		sql.insert("review.add", item);
	}

	@Override
	public double average(String placeName) {
		return sql.selectOne("review.average", placeName);
	}

	@Override
	public int countCmt(String placeName) {
		return sql.selectOne("review.count_cmt", placeName);
	}
	
	@Override
	public int findCode(String placeName) {
		return sql.selectOne("review.find_code", placeName);
	}

	@Override
	public List<Review> getCmt(String placeName) {
		return sql.selectList("review.get_cmt", placeName);
	}

	@Override
	public List<Review> list(String id) {
		return sql.selectList("review.list", id);
	}

	@Override
	public Review item(int code) {
		return sql.selectOne("review.item", code);
	}

	@Override
	public void delete(int review) {
		sql.delete("review.delete", review);	
	}

	@Override
	public void update(Review item) {
		sql.update("review.update", item);
	}

}
