import React from "react";
import "./mapNavbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import PlaceIcon from "@mui/icons-material/Place";
import { useNavigate } from "react-router-dom";

export default function MapNavbar({ openSidebar }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("nickname");
    navigate("/");
  };
  return (
    <div className='map-navbar'>
      <div className='burger'>
        <MenuIcon
          className='burger'
          onClick={openSidebar}
          style={{ fontSize: "36px", cursor: "pointer" }}
        />
      </div>
      <div className='title'>
        <PlaceIcon />
        MAPMORY
      </div>
      <div className='navBtn'>
        <button className='Btn-logout' onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
