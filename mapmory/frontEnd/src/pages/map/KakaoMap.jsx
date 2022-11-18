import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import "./map.css";
import { Link as LinkR } from "react-router-dom";
import EXIF from "exif-js";
import { useEffect } from "react";

const seoulLat = 37.5666805;
const seoulLng = 126.9784147;

export default function KakaoMap() {
  const [mapCenter, setMapCenter] = useState({
    center: {
      lat: seoulLat,
      lng: seoulLng,
    },
  });
  const [marker, setMarker] = useState({
    position: {
      lat: null,
      lng: null,
    },
  });
  function uploadImgPreview() {
    const fileInfo = document.getElementById("uploadFile").files[0];
    const reader = new FileReader();
    // ✅ readAsDataURL( ) 을 통해 파일의 URL을 읽어오면 onload 실행
    reader.onload = function () {
      EXIF.getData(fileInfo, () => {
        var exifLong = EXIF.getTag(fileInfo, "GPSLongitude");
        var exifLat = EXIF.getTag(fileInfo, "GPSLatitude");
        var exifLongRef = EXIF.getTag(fileInfo, "GPSLongitudeRef");
        var exifLatRef = EXIF.getTag(fileInfo, "GPSLatitudeRef");

        // 객체 내용 확인하기
        console.dir(exifLong);
        console.dir(exifLat);
        console.dir(exifLongRef);
        console.dir(exifLatRef);

        if (exifLatRef == "N") {
          var latitude =
            exifLat[0] * -1 + (exifLat[1] * -60 + exifLat[2] * -1) / 3600;
        } else {
          var latitude = exifLat[0] + (exifLat[1] * 60 + exifLat[2]) / 3600;
        }

        if (exifLongRef == "E") {
          var longitude =
            exifLong[0] * -1 + (exifLong[1] * -60 + exifLong[2] * -1) / 3600;
        } else {
          var longitude = exifLong[0] + (exifLong[1] * 60 + exifLong[2]) / 3600;
        }

        let wtmX = Math.abs(latitude);
        let wtmY = Math.abs(longitude);

        setMarker({
          position: {
            lat: wtmX,
            lng: wtmY,
          },
        });
        setMapCenter({
          center: {
            lat: wtmX,
            lng: wtmY,
          },
        });
      });
    };
    if (fileInfo) {
      // ✅ readAsDataURL( )을 통해 파일의 URL을 읽어온다.
      reader.readAsDataURL(fileInfo);
    }
  }
  return (
    <>
      <Map // 지도를 표시할 Container
        id='map'
        center={mapCenter.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={4} // 지도의 확대 레벨
      >
        <MapMarker
          // key={`${marker.position}-${index}`}
          position={marker.position} // 마커를 표시할 위치
        />
      </Map>

      {/* 이미지 입력 */}
      <input
        type='file'
        id='uploadFile'
        onChange={uploadImgPreview}
        accept='image/*'
      />
      <br />
      <img id='thumbnailImg' src='' width='300' />
    </>
  );
}
