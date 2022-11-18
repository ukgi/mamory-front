import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import "./map.css";
import { Link as LinkR } from "react-router-dom";
import EXIF from "exif-js";
import { useEffect } from "react";

const seoulLat = 37.5666805;
const seoulLng = 126.9784147;

export default function KakaoMap() {
  // ❌❌ 메타데이터 추출 오류
  // function uploadImgPreview() {
  //   const fileInfo = document.getElementById("uploadFile").files[0];
  //   console.log(fileInfo);

  //   const reader = new FileReader();
  //   console.log(reader);
  //   reader.onload = function () {
  //     EXIF.getData(fileInfo, () => {
  //       var exifLong = EXIF.getTag(fileInfo, "GPSLongitude");
  //       var exifLat = EXIF.getTag(fileInfo, "GPSLatitude");
  //       var exifLongRef = EXIF.getTag(fileInfo, "GPSLongitudeRef");
  //       var exifLatRef = EXIF.getTag(fileInfo, "GPSLatitudeRef");

  //       // 객체 내용 확인하기
  //       console.dir(exifLong);
  //       console.dir(exifLat);
  //       console.dir(exifLongRef);
  //       console.dir(exifLatRef);
  //     });
  //   };
  // }
  return (
    <>
      <Map // 지도를 표시할 Container
        id='map'
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
      />

      {/* 이미지 입력 */}
      <input
        type='file'
        id='uploadFile'
        // onChange={uploadImgPreview}
        accept='image/*'
      />
      <br />
      <img id='thumbnailImg' src='' width='300' />
    </>
  );
}
