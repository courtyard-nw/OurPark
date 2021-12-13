package kr.ac.ourpark.dao;

import java.util.List;

import kr.ac.ourpark.model.Review;

public interface ReviewDao {

	void add(Review item);

	double average(String placeName);

	int countCmt(String placeName);

	int findCode(String placeName);

	List<Review> getCmt(String placeName);

	List<Review> list(String id);

	Review item(int code);

	void delete(int code);

	void update(Review item);
}
