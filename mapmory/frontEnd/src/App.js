import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./Components/Signin/Login";
import Signup from "./Components/Register/Register";
import KakaoMap from "./pages/map/KakaoMap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/signin' element={<Signin />} exact />
        <Route path='/register' element={<Signup />} exact />
        <Route path='/map' element={<KakaoMap />} exact />
      </Routes>
    </Router>
  );
}

export default App;
