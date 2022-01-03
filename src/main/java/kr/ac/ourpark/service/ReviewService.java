package kr.ac.ourpark.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.ourpark.model.Review;
import kr.ac.ourpark.model.ReviewImage;

public interface ReviewService {

	void add(Review item);

	double average(String placeId);

	int countCmt(String placeId);

	int countImg(String placeId);

	List<ReviewImage> getImage(String placeId);

	List<Review> getCmt(String placeId);

	List<Review> list(String id);

	void delete(int code);

	Review item(int code);

	void update(Review item);

}
