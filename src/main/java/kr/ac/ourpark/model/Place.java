package kr.ac.ourpark.model;

public class Place {
	private String placeId;
	private String placeName;
	private String placeAddr;
	private String placeRoadAddr;

	public String getPlaceId() {
		return placeId;
	}

	public void setPlaceId(String placeId) {
		this.placeId = placeId;
	}

	public String getPlaceAddr() {
		return placeAddr;
	}

	public void setPlaceAddr(String placeAddr) {
		this.placeAddr = placeAddr;
	}

	public String getPlaceRoadAddr() {
		return placeRoadAddr;
	}

	public void setPlaceRoadAddr(String placeRoadAddr) {
		this.placeRoadAddr = placeRoadAddr;
	}

	public String getPlaceName() {
		return placeName;
	}

	public void setPlaceName(String placeName) {
		this.placeName = placeName;
	}
}
