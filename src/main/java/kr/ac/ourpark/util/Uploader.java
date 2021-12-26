package kr.ac.ourpark.util;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class Uploader<T extends UploadFile> {
	
	final String upldPath = "D:///jihun/upload/";
	final String upldPathMac = "/Users/jihunjang/Desktop/upload/";
	final String upldPathSchool = "D:///upload/";

	public List<T> makeList(List<MultipartFile> files, Class<T> type) throws Exception {

		List<T> result = new ArrayList<>();

		for (MultipartFile file : files) {
			if (!file.isEmpty()) {
				String filename = file.getOriginalFilename();
				String uuid = UUID.randomUUID().toString();

				file.transferTo(new File(upldPathMac + uuid + "_" + filename));

				T item = type.newInstance();
				item.setFilename(filename);
				item.setUuid(uuid);

				result.add(item);
			}
		}

		return result;
	}

}
