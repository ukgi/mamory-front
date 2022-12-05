import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Signin from "./Components/Signin/Login";
import Signup from "./Components/Register/Register";
// import Logout from "./Components/Logout/Logout";
import KakaoMap from "./pages/map/KakaoMap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/signin' element={<Signin />} exact />
        <Route path='/signup' element={<Signup />} exact />

        <Route path='/map' element={<KakaoMap />} exact />
        {/* <Route path="/logout" element={<Logout />} exact /> */}
        <Route path='/:id' element={<Home2 />} exact />
      </Routes>
    </Router>
  );
}

export default App;
