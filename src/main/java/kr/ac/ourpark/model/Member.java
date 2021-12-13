package kr.ac.ourpark.model;

import java.util.List;

public class Member {
	private String id;
	private String passwd;
	private String name;
	private String address;
	private String gender;
	private int age;
	private String nickname;
	private List<MemberImage> images;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public List<MemberImage> getImages() {
		return images;
	}

	public void setImages(List<MemberImage> images) {
		this.images = images;
	}

}
