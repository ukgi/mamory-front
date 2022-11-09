import React from "react";
import DiaryNavBar from "../diaryNavBar/DiaryNavBar";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  return (
    <>
      <DiaryNavBar />
      <div className='posts'>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
}
