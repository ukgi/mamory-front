import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import "./map.css";
import { Link as LinkR } from "react-router-dom";

const seoulLat = 37.5666805;
const seoulLng = 126.9784147;

export default function KakaoMap() {
  const currentUsername = "찬욱";
  const [newPlace, setNewPlace] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pins, setPins] = useState([]);
  const [title, setTitle] = useState(null);

  const handleAddClick = (_t, e) => {
    const [La, Ma] = e.qa;
    setNewPlace({
      lat: Ma,
      lng: La,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      lat: newPlace.lat,
      lng: newPlace.lng,
    };
    try {
      setPins([{ ...newPin }]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  // const pinId = 123;
  // const userState = true;
  // const [markerState, setmarkerState] = useState(true);
  // const [currentPlacedId, setCurrentPlaceId] = useState(null);

  // const handleMarkerClick = (id) => {
  //   setCurrentPlaceId(id);
  // };

  // const deletePin = () => {
  //   if (pinId === currentPlacedId) {
  //     setmarkerState(false);
  //   }
  // };
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: seoulLat,
        lng: seoulLng,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100vh",
      }}
      level={3}
      onDoubleClick={currentUsername && handleAddClick}
    >
      {pins.map((p) => (
        <>
          <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
            position={{ ...p }}
            clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            onClick={() => setIsOpen(true)}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
              size: {
                width: 64,
                height: 69,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          >
            {isOpen && (
              <div>
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>장소</label>
                    <input
                      placeholder='장소를 입력하세요'
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <button className='submitButton' type='submit'>
                      핀 추가하기
                    </button>
                  </form>
                </div>
                <div style={{ minWidth: "150px" }}>
                  <img
                    alt='close'
                    width='14'
                    height='13'
                    src='https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif'
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsOpen(false)}
                  />
                </div>
              </div>
            )}
          </MapMarker>
        </>
      ))}
    </Map>
  );
}
