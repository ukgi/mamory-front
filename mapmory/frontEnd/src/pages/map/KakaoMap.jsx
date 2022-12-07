import * as React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import "./map.css";
import EXIF from "exif-js";
// import axios from "axios";

// ⬇️ MUI LIBRARY
import Dialog from "@mui/material/Dialog";
import { Button, TextField } from "@mui/material";
// import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import RoomIcon from "@mui/icons-material/Room";
import BackspaceIcon from "@mui/icons-material/Backspace";
import MapNavbar from "../../Components/MapNavbar/MapNavbar";

const seoulLat = 37.5666805;
const seoulLng = 126.9784147;

// ⬇️ style
const cancelBtn = {
  marginLeft: "500px",
  fontSize: "2rem",
};

export default function KakaoMap(currentMemberId) {
  const memberId = localStorage.getItem("id");
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
  const [doubleClickMap, setDoubleClickMap] = useState(false);
  const [diary, setDiary] = useState([]);
  const [currentMarkerId, setCurrentMarkerId] = useState(null);
  const [markerImg, setMarkerImg] = useState(
    "https://cdn-icons-png.flaticon.com/512/447/447031.png"
  );
  const [markerImgList, setMarkerImgList] = useState(false);

  // ✅ 마커 position 정보, 서버로 post 하기
  const submitMarkerPosition = async (wtmX, wtmY) => {
    await fetch("http://43.200.240.147:8000/marker/new", {
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
      // ✅ markerId 받아오기
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
    fetch(`http://43.200.240.147:8000/${memberId}/markers`)
      .then((response) => response.json())
      .then((data) => setMarkerList(data));
  }, []);

  // ✅ 서버에게 폼 데이터를 보내는 코드
  // ✔️ 만일 fileInfo가 서버로 보내지지 않으면 전역 변수로 바꿔보기
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
      `http://43.200.240.147:8000/${memberId}/marker/${currentMarkerId}/diary`,
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
    window.location.reload();
  };

  // ✅ 지도 더블 클릭 시, 마커 생성
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

        // 😡 If. 메타데이터 추출이 안된다면 ~
        if (wtmX && wtmY === false) {
          alert("메타데이터 추출이 안됨!");
        }

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
    setCurrentMarkerId(markerId);
    await fetch(
      `http://43.200.240.147:8000/${memberId}/marker/${markerId}/diary`
    )
      .then((response) => response.json())
      .then((data) => setDiary(data))
      .catch((error) => console.log(error));
    setViewDiary(true);
  };

  // 📛 마커 삭제
  const handleDeleteMarker = async () => {
    await fetch(
      `http://43.200.240.147:8000/${memberId}/marker/${currentMarkerId}/diary`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => setMarkerList(data))
      .then(() => setViewDiary(false))
      .catch((error) => console.log(error));
  };

  // 📛 같은 마커에 다이어리 추가
  const addDiary = () => {
    setDoubleClickMap(true);
    setViewDiary(false);
  };

  // ✅ 마커 이미지 변경
  const handleMarkerImg = (e) => {
    setMarkerImg(e.target.src);
  };

  // ✅ 사이드바 애니메이션
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };
  return (
    <>
      <div>
        <MapNavbar openSidebar={toggleSidebar} />
        <div className={sidebar ? "sidebar sidebar--open" : "sidebar"}>
          <li>기능들</li>
          <li
            className='makeDiaryBtn'
            variant='outlined'
            onClick={() => {
              setOpen(true);
            }}
          >
            마커 자동 생성
          </li>
          <li
            onClick={() => {
              setMarkerImgList(true);
            }}
          >
            마커 이미지 바꾸기
          </li>
          <BackspaceIcon
            className={sidebar ? "backdrop backdrop--open" : "backdrop"}
            onClick={toggleSidebar}
          ></BackspaceIcon>
        </div>
      </div>

      <Map
        id='map'
        center={mapCenter.center}
        style={{
          // 지도의 크기
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
        level={8} // 지도의 확대 레벨
        onDoubleClick={addMarker}
      >
        {markerList.map((marker, index) => (
          <MapMarker
            image={{
              src: `${markerImg}`,
              size: {
                width: 64,
                height: 69,
              },
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
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

        {/* ✅ 마커 자동생성 기능 */}
        {/* <RoomIcon
          className='makeDiaryBtn'
          variant='outlined'
          onClick={() => {
            setOpen(true);
          }}
          style={{
            zIndex: "999",
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            padding: "8px",
          }}
        ></RoomIcon> */}

        {/* ✅ 마커 이미지 변경하기 */}
        <Dialog open={markerImgList}>
          <Button>
            <CancelPresentationIcon
              style={cancelBtn}
              onClick={() => setMarkerImgList(false)}
            />
          </Button>
          <h1 className='diaryTitle'>원하는 이미지로 마커를 변경하세요</h1>
          <DialogContent>
            <Container component='main' maxWidth='xs'>
              <Box sx={{ "& .MuiTextField-root": { m: 3, width: "35ch" } }}>
                <Grid container spacing={2} className='diaryContainer'>
                  <Grid item xs={3}>
                    <img
                      width='80'
                      src='https://cdn4.iconfinder.com/data/icons/set-1/32/__1-256.png'
                      onClick={handleMarkerImg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      width='80'
                      src='https://cdn-icons-png.flaticon.com/512/5695/5695709.png'
                      onClick={handleMarkerImg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      width='80'
                      src='https://cdn-icons-png.flaticon.com/512/777/777528.png'
                      onClick={handleMarkerImg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      width='80'
                      src='https://cdn-icons-png.flaticon.com/512/8830/8830938.png'
                      onClick={handleMarkerImg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      width='80'
                      src='https://cdn2.iconfinder.com/data/icons/avatars-60/5985/4-Writer-64.png'
                      onClick={handleMarkerImg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      width='80'
                      src='https://cdn4.iconfinder.com/data/icons/emojis-flat-pixel-perfect/64/emoji-42-64.png'
                      onClick={handleMarkerImg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      width='80'
                      src='https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/map-256.png'
                      onClick={handleMarkerImg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      width='80'
                      src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-256.png'
                      onClick={handleMarkerImg}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </DialogContent>
        </Dialog>

        {/* ✅ 마커 자동생성 */}
        <Dialog open={open}>
          <Button>
            <CancelPresentationIcon
              style={cancelBtn}
              onClick={() => setOpen(false)}
            />
          </Button>
          <h1 className='diaryTitle'>
            사진을 업로드하면 마커가 자동 생성됩니다
          </h1>

          <DialogContent>
            <Container component='main' maxWidth='xs'>
              <Box
                component='form'
                sx={{ "& .MuiTextField-root": { m: 3, width: "35ch" } }}
              >
                <Grid container spacing={2} className='diaryContainer'>
                  <Grid item xs={12}>
                    <Button
                      variant='contained'
                      component='label'
                      color='success'
                    >
                      <span id='imgUploadBtnSpan'>사진 업로드</span>
                      <input
                        hidden
                        type='file'
                        id='uploadFile'
                        onChange={ToExtractImageMetaData}
                        accept='image/*'
                      />
                    </Button>
                    <IconButton
                      color='success'
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
                    <input
                      placeholder='제목'
                      required
                      id='title'
                      label='Title'
                      variant='filled'
                      autoComplete='title-name'
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                  </Grid>
                  <Grid item xs={20}>
                    <textarea
                      placeholder='다이어리'
                      rows={4}
                      required
                      id='content'
                      label='Content'
                      variant='filled'
                      multiline
                      color='success'
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ fontFamily: "Dongle", fontSize: "24px" }}
              variant='outlined'
              onClick={handleFormSubmit}
            >
              마커 생성
            </Button>
          </DialogActions>
        </Dialog>
        {/* ⬇️ 지도 더블 클릭하면, 마커 수동 등록 */}
        {newMarker && (
          <Dialog open={doubleClickMap}>
            <Button>
              <CancelPresentationIcon
                style={cancelBtn}
                onClick={() => setDoubleClickMap(false)}
              />
            </Button>
            <h1 className='diaryTitle'>사진을 등록하세요</h1>
            <DialogContent>
              <Container component='main' maxWidth='xs'>
                <Box
                  component='form'
                  sx={{ "& .MuiTextField-root": { m: 3, width: "35ch" } }}
                >
                  <Grid container spacing={2} className='diaryContainer'>
                    <Grid item xs={12}>
                      <Button variant='contained' component='label'>
                        <span id='imgUploadBtnSpan'>사진 업로드</span>
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
                      <input
                        placeholder='제목'
                        required
                        id='title'
                        label='Title'
                        variant='filled'
                        multiline
                        color='success'
                        autoComplete='title-name'
                        onChange={(e) => setTitle(e.target.value)}
                      ></input>
                    </Grid>
                    <Grid item xs={20}>
                      <textarea
                        placeholder='다이어리'
                        rows={4}
                        required
                        id='content'
                        label='Content'
                        variant='filled'
                        multiline
                        color='success'
                        onChange={(e) => setContent(e.target.value)}
                      ></textarea>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button
                style={{ fontFamily: "Dongle", fontSize: "24px" }}
                variant='outlined'
                onClick={handleFormSubmit}
              >
                다이어리 만들기
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
            {diary.map((d, index) => (
              <div>
                <div className='diaryContainer'>
                  <div className='diaryInner'>
                    <h1 className='diaryTitle'>{d.title}</h1>
                    <img
                      name='image'
                      id='thumbnailImg'
                      src={d.imageUrl}
                      width='300'
                    />
                    <p className='diaryContent'>{d.content}</p>
                    <span>{d.createDate}</span>
                  </div>
                </div>
              </div>
            ))}
            <div id='BtnContainer'>
              <Button
                style={{
                  color: "white",
                  background: "tomato",
                  width: "180px",
                  borderRadius: "20px",
                  fontFamily: "Dongle",
                  fontSize: "28px",
                  marginBottom: "8px",
                }}
                onClick={handleDeleteMarker}
              >
                마커 삭제
              </Button>
              <Button
                style={{
                  color: "white",
                  background: "green",
                  width: "180px",
                  borderRadius: "20px",
                  fontFamily: "Dongle",
                  fontSize: "28px",
                  marginLeft: "8px",
                  marginBottom: "8px",
                }}
                onClick={addDiary}
              >
                다이어리 추가
              </Button>
            </div>
          </Dialog>
        )}
      </Map>
    </>
  );
}
