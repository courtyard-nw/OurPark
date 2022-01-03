package kr.ac.ourpark.dao;

import java.util.List;

import kr.ac.ourpark.model.Review;

public interface ReviewDao {

	void add(Review item);

	double average(String placeId);

	int countCmt(String placeId);

	int findCode(String placeId);

	List<Review> getCmt(String placeId);

	List<Review> list(String id);

	Review item(int code);

	void delete(int code);

	void update(Review item);
}
