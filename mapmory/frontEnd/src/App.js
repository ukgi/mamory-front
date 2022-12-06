import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
// import Logout from "./Components/Logout/Logout";
import KakaoMap from "./pages/map/KakaoMap";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route
          path='/signin'
          element={<Signin setCurrentUser={setCurrentUser} />}
          exact
        />
        <Route path='/signup' element={<Signup />} exact />

        <Route
          path='/map'
          element={<KakaoMap currentUser={currentUser} />}
          exact
        />
        {/* <Route path="/logout" element={<Logout />} exact /> */}
        <Route
          path='/:id'
          element={<Home2 currentUser={setCurrentUser} />}
          exact
        />
      </Routes>
    </Router>
  );
}

export default App;
