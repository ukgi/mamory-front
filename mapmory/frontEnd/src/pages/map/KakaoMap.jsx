import * as React from "react";
import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import "./map.css";
// import { Link as LinkR } from "react-router-dom";
import EXIF from "exif-js";
import { useEffect } from "react";
// import axios from "axios";

const seoulLat = 37.5666805;
const seoulLng = 126.9784147;

export default function KakaoMap() {
  const currentUser = "chanuk";
  const memberId = "123456";
  // ✅ "작성하기" 버튼 클릭 -> 다이어리 폼으로 이동
  const [open, setOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    center: {
      lat: seoulLat,
      lng: seoulLng,
    },
  });
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const [markerList, setMarkerList] = useState([]);
  const [newMarker, setNewMarker] = useState({
    key: null,
    position: {
      lat: null,
      lng: null,
    },
  });

  // 📛 마커 position 정보, 서버로 post 하기
  const submitMarkerPosition = async (wtmX, wtmY) => {
    fetch("http://localhost:8000/marker/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId,
        latitude: wtmX,
        longtitude: wtmY,
      }),
    });
  };

  // 📛 서버로부터 저장된 마커 데이터 가져오기
  useEffect(() => {
    fetch("data/markerPosition.json")
      .then((response) => response.json())
      .then((data) => setMarkerList(data));
  }, []);

  // 📛 서버에게 폼 데이터를 보내는 코드
  // ✔️ 만일 fileInfo가 서버로 보내지지 않으면 전역 변수로 바꿔보기
  // 📛 서버에서 response로 마커 위도 경도 json 파일을 넘겨줘야 한다 !!
  const handleFormSubmit = async () => {
    // e.preventDefault();
    const fileInfo = document.getElementById("uploadFile").files[0];
    let formData = new FormData();
    formData.append("image", fileInfo);
    formData.append("title", title);
    formData.append("content", content);
    // ✅ 폼 객체 key 와 value 값을 순회.
    let entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[0] + ", " + pair[1]);
    }
    fetch("서버 url", {
      method: "PUT",
      cache: "no-cache",
      body: formData,
    })
      .then((response) => response.json())
      .then(
        (data) => (
          console.log(data),
          setMarkerList([...markerList, data]),
          setNewMarker(null)
        )
      );
  };

  // ✅ 사진에서 메타데이터 추출 후, 지도 위에 마커 표시하는 함수
  function ToExtractImageMetaData() {
    const fileInfo = document.getElementById("uploadFile").files[0];
    // ✅ image input이 onChange가 되면, setImage에 input에 들어온 image 넣어준다.
    // ✅ 여기서 fileInfo는 image input에 추가된 이미지 객체이다.
    // setImage(fileInfo);
    // console.log("image 객체 정보", image);

    const reader = new FileReader();
    // ✅ readAsDataURL( ) 을 통해 파일의 URL을 읽어오면 onload 실행
    reader.onload = function () {
      EXIF.getData(fileInfo, () => {
        var exifLong = EXIF.getTag(fileInfo, "GPSLongitude");
        var exifLat = EXIF.getTag(fileInfo, "GPSLatitude");
        var exifLongRef = EXIF.getTag(fileInfo, "GPSLongitudeRef");
        var exifLatRef = EXIF.getTag(fileInfo, "GPSLatitudeRef");

        // 객체 내용 확인하기
        // console.dir(exifLong);
        // console.dir(exifLat);
        // console.dir(exifLongRef);
        // console.dir(exifLatRef);

        if (exifLatRef === "N") {
          var latitude =
            exifLat[0] * -1 + (exifLat[1] * -60 + exifLat[2] * -1) / 3600;
        } else {
          var latitude = exifLat[0] + (exifLat[1] * 60 + exifLat[2]) / 3600;
        }

        if (exifLongRef === "E") {
          var longitude =
            exifLong[0] * -1 + (exifLong[1] * -60 + exifLong[2] * -1) / 3600;
        } else {
          var longitude = exifLong[0] + (exifLong[1] * 60 + exifLong[2]) / 3600;
        }

        let wtmX = Math.abs(latitude);
        let wtmY = Math.abs(longitude);

        setNewMarker({
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

        // ✅ 마커 위도 경도 값 서버로 보내기
        submitMarkerPosition(wtmX, wtmY);
      });

      // ✅ 파일의 URL을 Base64형태로 가져온다
      document.getElementById("thumbnailImg").src = reader.result;
      // console.log("base64 인코딩", reader.result);
    };
    if (fileInfo) {
      // ✅ readAsDataURL( )을 통해 파일의 URL을 읽어온다.
      reader.readAsDataURL(fileInfo);
    }
  }

  return (
    <>
      <Map
        id='map'
        center={mapCenter.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={8} // 지도의 확대 레벨
      >
        {markerList.map((marker, index) => (
          <MapMarker
            key={`${marker}-${index}`}
            position={marker}
            clickable={true}
          ></MapMarker>
          // ,console.log("new marker", marker)
        ))}
      </Map>

      <Button
        variant='outlined'
        onClick={() => {
          setOpen(true);
        }}
      >
        작성하기
      </Button>
      <Dialog open={open}>
        <form onSubmit={handleFormSubmit}>
          <label>Image</label>
          <input
            type='file'
            id='uploadFile'
            onChange={ToExtractImageMetaData}
            accept='image/*'
          />
          <br />
          <img
            name='image'
            id='thumbnailImg'
            src=''
            width='300'
            onChange={(e) => setImage(e.target.value)}
          />
          <label>Title</label>
          <input
            type='text'
            placeholder='제목'
            name='title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>content</label>
          <input
            type='text'
            placeholder='간단한 다이어리 작성'
            name='content'
            onChange={(e) => setContent(e.target.value)}
          />
          <button className='submitButton' type='submit'>
            등록하기
          </button>
        </form>
      </Dialog>
    </>
  );
}
