import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, TextField } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import "./map.css";
import { Link as LinkR } from "react-router-dom";
import EXIF from "exif-js";
import { useEffect } from "react";
import axios from 'axios';

const seoulLat = 37.5666805;
const seoulLng = 126.9784147;

export default function KakaoMap() {
  const [open, setOpen] = useState(false);
  //dialog 열렸는지 확인하는 변수
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    center: {
      lat: seoulLat,
      lng: seoulLng,
    },
  });
  const [markers, setMarkers] = useState({
    key: null,
    position: {
      lat: null,
      lng: null,
    },
  });

  // 📛 마커 position 정보, 서버로 post 하기
  const submitMarkerPosition = async () => {
    const newMarker = {
      key: markers.key,
      position: markers.position,
    };
    try {
      const res = await axios.post("서버URL", newMarker);
      setMarkers([...res.markers]);
    } catch (err) {
      console.log(err);
    }
  };

  // 📛 서버로부터 저장된 마커 데이터 가져오기
  useEffect(() => {
    const getMarkers = async () => {
      try {
        const res = await axios.get("서버로부터 저장된 마커 데이터 가져오기");
        setMarkers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMarkers();
  }, []);
  

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
        // console.dir(exifLong);
        // console.dir(exifLat);
        // console.dir(exifLongRef);
        // console.dir(exifLatRef);

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

        let wtmX = Math.abs(latitude); //Math.abs() 절대값변환
        let wtmY = Math.abs(longitude);

        setMarker([
          ...markers,
          {
            key: wtmX - wtmY,
            position: {
              lat: wtmX,
              lng: wtmY,
            },
        }]);

        submitMarkerPosition();

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

    // 📛 서버에게 axios.post로 폼 데이터를 보내는 코드
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = {
      username: currentUser,
      // id: memberId,
      image,
      title,
      content,
    };
    try {
      const res = await axios.post("서버 URL", newForm);
      setMarkers([...markers, res.data]);
    } catch (err) {
      console.log(err);
    }
  };
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
        {markers.map(
          (marker, index) => (
            console.log(markers),
            console.log(marker.position),
            (
              <MapMarker
                // 💦💦 key 값을 어떻게 서버로 넘겨주지 ??
                key={marker.key}
                position={marker.position} // 마커를 표시할 위치
                clickable={true}
              ></MapMarker>
            ),
            console.log("마커", marker.key)
          )
        )}
      </Map>

      {/* 이미지 및 다이어리 입력 */}
      {/* <form>
        <input
          name='image'
          type='file'
          id='uploadFile'
          onChange={uploadImgPreview}
          accept='image/*'
        />
        <br />
        <img id='thumbnailImg' src='' width='300' />
        <input type='text' placeholder='제목' name='title' />
        <input type='text' placeholder='간단한 다이어리 작성' name='diary' />
        <button type='submit'>등록하기</button>
      </form> */}
      <Button
        variant='outlined'
        onClick={() => {
          setOpen(true);
        }}
      >
        작성하기
      </Button>
      <Dialog open={open}>
        {/* <DialogTitle>사진과 함께 다이어리를 작성해 보세요</DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <Box
              component='form'
              sx={{ "& .MuiTextField-root": { m: 3, width: "35ch" } }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id='title'
                    label='Title'
                    variant='filled'
                    multiline
                    color='success'
                    autoComplete='title-name'
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='content'
                    label='Content'
                    variant='filled'
                    multiline
                    color='success'
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <input
                    type='file'
                    id='uploadFile'
                    onChange={uploadImgPreview}
                    accept='image/*'
                  />
                  <br />
                  <img id='thumbnailImg' src='' width='300' />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={() => {
              setOpen(false);
            }}
          >
            Create
          </Button>
        </DialogActions> */}
        <form onSubmit={handleSubmit}>
          <label>Image</label>
          <input
            name='image'
            type='file'
            id='uploadFile'
            onChange={uploadImgPreview}
            accept='image/*'
          />
          <br />
          <img
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
