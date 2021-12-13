package kr.ac.ourpark.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.ourpark.dao.ReviewDao;
import kr.ac.ourpark.dao.ReviewImageDao;
import kr.ac.ourpark.model.Review;
import kr.ac.ourpark.model.ReviewImage;

@Service
public class ReviewServiceImpl implements ReviewService {
		
	@Autowired
	ReviewDao reviewDao;
	
	@Autowired
	ReviewImageDao reviewImageDao;
	
	@Override
	@Transactional
	public void add(Review item) {
		reviewDao.add(item);
		
		for(ReviewImage image : item.getImages()) {
			image.setPlaceName(item.getPlaceName());
			image.setReview(item.getCode());
			
			reviewImageDao.add(image);
		}
	}

	@Override
	public double average(String placeName) {
		return reviewDao.average(placeName);
	}

	@Override
	public int countCmt(String placeName) {
		return reviewDao.countCmt(placeName);
	}

	@Override
	public int countImg(String placeName) {
		return reviewImageDao.countImg(placeName);
	}

	@Override
	public List<ReviewImage> getImages(String placeName) {
		return reviewImageDao.getImages(placeName);
	}

	@Override
	public List<Review> getCmt(String placeName) {
		return reviewDao.getCmt(placeName);
	}

	@Override
	public List<Review> list(String id) {
		return reviewDao.list(id);
	}

	@Override
	@Transactional
	public void delete(int code) {
		Review item = reviewDao.item(code);
		
		for(ReviewImage image : item.getImages()) {
			reviewImageDao.delete(image.getReview());
		}
		
		reviewDao.delete(code);
		
	}

	@Override
	public Review item(int code) {
		return reviewDao.item(code);
	}

	@Override
	public void update(Review item) {
		reviewImageDao.delete(item.getCode()); 
		
		reviewDao.update(item);
		
		if(item.getImages() != null)
			for(ReviewImage image : item.getImages()) {
				image.setPlaceName(item.getPlaceName());
				image.setReview(item.getCode());
				
				reviewImageDao.add(image);
			}
	}
	

}
