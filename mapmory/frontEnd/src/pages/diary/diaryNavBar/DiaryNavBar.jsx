import React from "react";
import { Link } from "react-router-dom";
import "./diaryNavBar.css";
import RoomIcon from "@mui/icons-material/Room";

export default function DiaryNavBar() {
  const user = true;
  return (
    <div className='top'>
      <div className='topLeft'>
        <ul className='topList'>
          <RoomIcon
            style={{
              fontSize: "30px",
              color: "lightgreen",
              marginRight: "8px",
            }}
          />
          <li className='topListItem'>MAPMORY</li>
        </ul>
      </div>
      <div className='topCenter'></div>
      <div className='topRight'>
        {user ? (
          <div className='topList'>
            <img
              className='topImg'
              src='https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-business-men-icon-png-image_925963.jpg'
              alt=''
            />
            <li className='topListItem logoutMessage Link'>
              {user && "로그아웃"}
            </li>
            <Link to='/diary/write' className='Link'>
              <li className='topListItem logoutMessage'>작성하기</li>
            </Link>
          </div>
        ) : (
          <ul className='topList'>
            <li className='topListItem'>
              <Link className='link' to='/signup'>
                Sign Up
              </Link>
            </li>
            <li className='topListItem'>
              <Link className='link' to='/signin'>
                Sign In
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
