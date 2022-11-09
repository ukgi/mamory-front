import "./map.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";

import RoomIcon from "@mui/icons-material/Room";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import * as timeago from "timeago.js";
// import TimeAgo from "timeago-react";
// import pt_BR from "timeago.js/lib/lang/pt_BR";
// import Register from "../../Components/Register/Register";
// import Login from "../../Components/Signin/Login";
import { Link as LinkR } from "react-router-dom";

export default function Map() {
  // const myStorage = window.localStorage;
  // timeago.register("pt_BR", pt_BR);
  // const [currentUsername, setCurrentUsername] = useState(
  //   myStorage.getItem("user")
  // );
  // const [pins, setPins] = useState([]);
  // const [currentPlaceId, setCurrentPlaceId] = useState(null);
  // const [newPlace, setNewPlace] = useState(null);
  // const [title, setTitle] = useState(null);
  // const [desc, setDesc] = useState(null);
  // const [viewport, setViewport] = useState({
  //   latitude: 37.5666805,
  //   longitude: 126.9784147,
  //   zoom: 4,
  // });
  // const [showRegister, setShowRegister] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);

  // const handleMarkerClick = (id, lat, long) => {
  //   setCurrentPlaceId(id);
  //   setViewport({ ...viewport, latitude: lat, longitude: long });
  // };

  // // 더블클릭 시 새로운 장소 추가 가능
  // const handleAddClick = (e) => {
  //   const [longitude, latitude] = e.lngLat;
  //   setNewPlace({
  //     lat: latitude,
  //     long: longitude,
  //   });
  // };

  // // 새로운 핀 추가
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newPin = {
  //     username: currentUsername,
  //     title,
  //     desc,
  //     lat: newPlace.lat,
  //     long: newPlace.long,
  //   };

  //   try {
  //     const res = await axios.post("/pins", newPin);
  //     setPins([...pins, res.data]);
  //     setNewPlace(null);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // // 핀 삭제
  // const handleDelete = (e) => {
  //   console.log(e);
  // };

  // // 모든 핀 데이터 가져와서 지도 위에 표시
  // useEffect(() => {
  //   const getPins = async () => {
  //     try {
  //       const allPins = await axios.get("/pins");
  //       setPins(allPins.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getPins();
  // }, []);

  // const handleLogout = () => {
  //   setCurrentUsername(null);
  //   myStorage.removeItem("user");
  // };
  const pinId = 123;
  const userState = true;
  const [markerState, setmarkerState] = useState(true);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.541,
    longitude: 126.986,
    zoom: 10,
  });
  const [currentPlacedId, setCurrentPlaceId] = useState(null);
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const deletePin = () => {
    if (pinId === currentPlacedId) {
      setmarkerState(false);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        width='100%'
        height='100%'
        transitionDuration='200'
        mapStyle='mapbox://styles/safak/cknndpyfq268f17p53nmpwira'
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {userState && markerState && (
          <Marker
            latitude={37.541}
            longitude={126.986}
            offsetLeft={-20}
            offsetTop={-20}
          >
            <RoomIcon
              style={{ fontSize: viewport.zoom * 5, color: "slateblue" }}
              onClick={() => handleMarkerClick(pinId)}
            />
          </Marker>
        )}

        {userState && markerState && pinId === currentPlacedId && (
          <Popup
            latitude={37.541}
            longitude={126.986}
            closeButton={true}
            closeOnClick={false}
            anchor='left'
            onClose={() => setCurrentPlaceId(null)}
          >
            <div className='card'>
              <label>장소</label>
              <h4>용산시청</h4>
              <LinkR className='cardBtn' to='/diary/posts'>
                다이어리로 이동하기
              </LinkR>
              <label>정보</label>
              <span className='username'>
                Created by <b>박찬욱</b>
              </span>
              <span className='date'>1시간 전에 작성됨</span>
            </div>
            <button className='delete' onClick={deletePin}>
              마커 삭제하기
            </button>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
