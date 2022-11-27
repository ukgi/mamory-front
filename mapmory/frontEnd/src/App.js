import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./Components/Signin/Login";
import Signup from "./Components/Register/Register";
import KakaoLogin from "./Components/Signin/KakaoLogin";

// kakao map 을 위해 map 박스 잠시 보류
// import Map from "./pages/map/Map";

import KakaoMap from "./pages/map/KakaoMap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/signin' element={<Signin />} exact />
        <Route path='/signup' element={<Signup />} exact />
        <Route path='/mapmory/callbackKakao' element={<KakaoLogin />}></Route>
        <Route path='/map' element={<KakaoMap />} exact />
      </Routes>
    </Router>
  );
}

export default App;
