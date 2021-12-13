package kr.ac.ourpark.dao;

import java.util.List;

import kr.ac.ourpark.model.ReviewImage;

public interface ReviewImageDao {

	void add(ReviewImage image);

	int countImg(String placeName);

	List<ReviewImage> getImages(String placeName);

	void delete(int review);

}