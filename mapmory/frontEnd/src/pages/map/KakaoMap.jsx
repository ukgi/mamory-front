import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect, useRef } from "react";
import "./map.css";
import EXIF from "exif-js";
// import { Link as LinkR } from "react-router-dom";
// import axios from "axios";

// ⬇️ MUI LIBRARY
import { Button, TextField } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const seoulLat = 37.5666805;
const seoulLng = 126.9784147;

// ⬇️ style
const makeDiaryBtn = {
  zIndex: "999",
  position: "absolute",
  top: "20px",
  right: "20px",
  background: "#116600",
  color: "white",
  border: "none",
};

const cancelBtn = {
  marginLeft: "500px",
  fontSize: "2rem",
};

export default function KakaoMap() {
  const currentUser = "chanuk";

  const memberId = 123456;
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
  const [viewDiary, setViewDiary] = useState(false);
  const [markerList, setMarkerList] = useState([]);
  const [newMarker, setNewMarker] = useState({
    markerId: null,
    key: null,
    position: {
      lat: null,
      lng: null,
    },
  });
  // const [markerKey, setMarkerKey] = useState(null);
  const [doubleClickMap, setDoubleClickMap] = useState(false);
  const [diary, setDiary] = useState({});
  const [currentMarkerId, setCurrentMarkerId] = useState(null);

  // ✅ 마커 position 정보, 서버로 post 하기
  const submitMarkerPosition = async (wtmX, wtmY) => {
    await fetch("http://localhost:8000/marker/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId,
        latitude: wtmX,
        longtitude: wtmY,
      }),
    })
      // 📛 markerId 받아오기
      .then((response) => response.json())
      .then((data) => {
        setNewMarker({
          markerId: data,
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
        setCurrentMarkerId(data);
      });
  };

  // ✅ 서버로부터 저장된 마커 데이터 가져오기
  useEffect(() => {
    fetch(`http://localhost:8000/${memberId}/markers`)
      .then((response) => response.json())
      .then((data) => setMarkerList(data));
  }, []);

  // 📛 서버에게 폼 데이터를 보내는 코드
  // ✔️ 만일 fileInfo가 서버로 보내지지 않으면 전역 변수로 바꿔보기
  // 📛 서버에서 response로 마커 위도 경도 json 파일을 넘겨줘야 한다 !!
  const handleFormSubmit = async () => {
    setOpen(false);
    setDoubleClickMap(false);

    let fileInfo = document.getElementById("uploadFile").files[0];
    setImage(fileInfo);

    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", JSON.stringify(title));
    formData.append("content", JSON.stringify(content));
    formData.append("memberId", JSON.stringify(memberId));
    // ✅ 폼 객체 key 와 value 값을 순회.
    let entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[0] + ", " + pair[1]);
    }

    await fetch(
      `http://localhost:8000/${memberId}/marker/${currentMarkerId}/diary`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          // "Content-Type": "multipart/form-data",
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then(
        (data) => (
          console.log(data),
          setMarkerList([...markerList, data]),
          setNewMarker(null)
        )
      )
      .catch((err) => {
        console.log(err);
      });
  };

  // 📛 지도 더블 클릭 시, 마커 생성
  const addMarker = (_t, mouseEvent) => {
    let lat = mouseEvent.latLng.getLat();
    let lng = mouseEvent.latLng.getLng();
    setNewMarker({
      lat,
      lng,
    });
    submitMarkerPosition(lat, lng);
    setDoubleClickMap(true);
  };

  // ✅ 사진에서 메타데이터 추출 후, 지도 위에 마커 표시하는 함수
  // 자동 생성이 아니더라도 메타 데이터 추출 시도는 됨 -> 😡 단, 오류가 뜰꺼야
  function ToExtractImageMetaData() {
    const fileInfo = document.getElementById("uploadFile").files[0];
    console.log(fileInfo);
    // ✅ image input이 onChange가 되면, setImage에 input에 들어온 image 넣어준다.
    // ✅ 여기서 fileInfo는 image input에 추가된 이미지 객체이다.
    setImage(fileInfo);

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

        // setNewMarker({
        //   position: {
        //     lat: wtmX,
        //     lng: wtmY,
        //   },
        // });

        // setMapCenter({
        //   center: {
        //     lat: wtmX,
        //     lng: wtmY,
        //   },
        // });

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

  // ✅ 마커 클릭 시, 해당하는 마커의 다이어리 정보 요청
  const handleDiaryScreen = async (markerId) => {
    console.log(markerId);
    // setCurrentMarkerId(markerId);
    await fetch(`http://localhost:8000/${memberId}/marker/${markerId}/diary`)
      .then((response) => response.json())
      .then((data) => setDiary(data))
      .catch((error) => console.log(error));
    setViewDiary(true);
  };

  return (
    <>
      <Map
        id='map'
        center={mapCenter.center}
        style={{
          // 지도의 크기
          width: "100vw",
          height: "100vh",
        }}
        level={8} // 지도의 확대 레벨
        onDoubleClick={addMarker}
      >
        {markerList.map((marker, index) => (
          <MapMarker
            key={`${marker}-${index}`}
            // markerId={marker.markerId}
            position={{
              lng: marker.lng,
              lat: marker.lat,
            }}
            clickable={true}
            onClick={() => {
              handleDiaryScreen(marker.markerId);
            }}
          ></MapMarker>
          // ,console.log("new marker", marker)
        ))}
        {/* ⬇️ 지도 더블 클릭하면, 새로운 팝업 창이 나옴 */}
        {newMarker && (
          <Dialog open={doubleClickMap}>
            <Button>
              <CancelPresentationIcon
                style={cancelBtn}
                onClick={() => setDoubleClickMap(false)}
              />
            </Button>
            <DialogTitle className='diaryTitle'>사진을 등록하세요</DialogTitle>
            <DialogContent>
              <Container component='main' maxWidth='xs'>
                <Box
                  component='form'
                  sx={{ "& .MuiTextField-root": { m: 3, width: "35ch" } }}
                >
                  <Grid container spacing={2} className='diaryContainer'>
                    <Grid item xs={12}>
                      <Button variant='contained' component='label'>
                        사진 업로드
                        <input
                          hidden
                          type='file'
                          id='uploadFile'
                          onChange={ToExtractImageMetaData}
                          accept='image/*'
                        />
                      </Button>
                      <IconButton
                        color='primary'
                        aria-label='upload picture'
                        component='label'
                      >
                        <input required hidden accept='image/*' type='file' />
                        <CameraAltRoundedIcon />
                      </IconButton>
                      <br />
                      <img
                        name='image'
                        id='thumbnailImg'
                        src=''
                        width='300'
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id='title'
                        label='Title'
                        variant='filled'
                        multiline
                        color='success'
                        autoComplete='title-name'
                        onChange={(e) => setTitle(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={20}>
                      <TextField
                        required
                        id='content'
                        label='Content'
                        variant='filled'
                        multiline
                        color='success'
                        onChange={(e) => setContent(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button variant='outlined' onClick={handleFormSubmit}>
                마커 생성
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {/* ✅ 마커 클릭 시, 다이어리 화면이 나온다 */}
        {viewDiary && diary && (
          <Dialog open={viewDiary}>
            <Button>
              <CancelPresentationIcon
                style={cancelBtn}
                onClick={() => setViewDiary(false)}
              />
            </Button>
            <DialogTitle className='diaryTitle'>{diary.title}</DialogTitle>
            <DialogContent>
              <Container component='main' maxWidth='xs'>
                <Box
                  component='form'
                  sx={{ "& .MuiTextField-root": { m: 3, width: "35ch" } }}
                >
                  <Grid container spacing={2} className='diaryContainer'>
                    <Grid item xs={12}>
                      <img
                        name='image'
                        id='thumbnailImg'
                        src={diary.image}
                        width='300'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {diary.content}
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </DialogContent>
          </Dialog>
        )}

        <Button
          className='makeDiaryBtn'
          variant='outlined'
          onClick={() => {
            setOpen(true);
          }}
          style={makeDiaryBtn}
        >
          자동 생성
        </Button>
        <Dialog open={open}>
          <Button>
            <CancelPresentationIcon
              style={cancelBtn}
              onClick={() => setOpen(false)}
            />
          </Button>
          <DialogTitle className='diaryTitle'>
            사진을 업로드하면 마커가 자동 생성됩니다
          </DialogTitle>

          <DialogContent>
            <Container component='main' maxWidth='xs'>
              <Box
                component='form'
                sx={{ "& .MuiTextField-root": { m: 3, width: "35ch" } }}
              >
                <Grid container spacing={2} className='diaryContainer'>
                  <Grid item xs={12}>
                    <Button variant='contained' component='label'>
                      사진 업로드
                      <input
                        hidden
                        type='file'
                        id='uploadFile'
                        onChange={ToExtractImageMetaData}
                        accept='image/*'
                      />
                    </Button>
                    <IconButton
                      color='primary'
                      aria-label='upload picture'
                      component='label'
                    >
                      <input required hidden accept='image/*' type='file' />
                      <CameraAltRoundedIcon />
                    </IconButton>
                    <br />
                    <img
                      name='image'
                      id='thumbnailImg'
                      src=''
                      width='300'
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='title'
                      label='Title'
                      variant='filled'
                      multiline
                      color='success'
                      autoComplete='title-name'
                      onChange={(e) => setTitle(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={20}>
                    <TextField
                      required
                      id='content'
                      label='Content'
                      variant='filled'
                      multiline
                      color='success'
                      onChange={(e) => setContent(e.target.value)}
                    ></TextField>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' onClick={handleFormSubmit}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Map>
    </>
  );
}
