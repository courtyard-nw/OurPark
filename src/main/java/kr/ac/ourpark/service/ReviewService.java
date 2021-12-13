package kr.ac.ourpark.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.ourpark.model.Review;
import kr.ac.ourpark.model.ReviewImage;

public interface ReviewService {

	void add(Review item);

	double average(String placeName);

	int countCmt(String placeName);

	int countImg(String placeName);

	List<ReviewImage> getImages(String placeName);

	List<Review> getCmt(String placeName);

	List<Review> list(String id);

	void delete(int code);

	Review item(int code);

	void update(Review item);

}
