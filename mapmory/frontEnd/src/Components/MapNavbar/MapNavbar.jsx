import React from "react";
import "./mapNavbar.css";
import MenuIcon from "@mui/icons-material/Menu";

export default function MapNavbar({ openSidebar }) {
  return (
    <div className='map-navbar'>
      <div className='burger'>
        <MenuIcon
          className='burger'
          onClick={openSidebar}
          style={{ fontSize: "36px", cursor: "pointer" }}
        />
      </div>
      <div className='title'>MAPMORY</div>
      <div className='navBtn'>
        <button className='Btn-logout'>로그아웃</button>
      </div>
    </div>
  );
}
