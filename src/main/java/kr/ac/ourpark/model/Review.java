package kr.ac.ourpark.model;

import java.util.Date;
import java.util.List;

public class Review {
	private int code;
	private String member;
	private String placeAddr;
	private String placeName;
	private int rating;
	private String info;
	private Date regDate;
	private String fmtDate;

	private List<ReviewImage> images;

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMember() {
		return member;
	}

	public void setMember(String member) {
		this.member = member;
	}

	public String getPlaceAddr() {
		return placeAddr;
	}

	public void setPlaceAddr(String placeAddr) {
		this.placeAddr = placeAddr;
	}

	public String getPlaceName() {
		return placeName;
	}

	public void setPlaceName(String placeName) {
		this.placeName = placeName;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public List<ReviewImage> getImages() {
		return images;
	}

	public void setImages(List<ReviewImage> images) {
		this.images = images;
	}

	public String getFmtDate() {
		return fmtDate;
	}

	public void setFmtDate(String fmtDate) {
		this.fmtDate = fmtDate;
	}

}