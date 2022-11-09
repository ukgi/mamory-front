import React from "react";
import "./singlePost.css";
export default function SinglePost() {
  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        <img
          className='singlePostImg'
          src='https://post-phinf.pstatic.net/MjAxODAzMTdfMjQg/MDAxNTIxMjIxNjQxNDY4.7yxdrHnx-bmJgerIfzMJ-Su_C4F8mFC0emU5dHwbuqgg.gjxtV-Hb48q8-Z4FV09IsM1L2FKWSmzTkSHtvPGUCmcg.JPEG/1920_1080_20140808025908818359.jpg?type=w1200'
          alt=''
        />
        <h1 className='singlePostTitle'>
          제목
          <div className='singlePostEdit'>
            <i className='singlePostIcon far fa-edit'></i>
            <i className='singlePostIcon fas fa-trash-alt'></i>
          </div>
        </h1>
        <div className='singlePostInfo'>
          <span className='singlePostAuthor'>
            지은이 : <b>박찬욱</b>
          </span>
          <span className='singlePostDate'>1 hour ago</span>
        </div>
        <p className='singlePostDesc'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum sed quia
          tempore, repellat rem dignissimos voluptas sint sapiente mollitia et,
          eum quasi ad animi quibusdam. Excepturi facere repellendus dolorum
          laboriosam? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Cum sed quia tempore, repellat rem dignissimos voluptas sint sapiente
          mollitia et, eum quasi ad animi quibusdam. Excepturi facere
          repellendus dolorum laboriosam?
        </p>
      </div>
    </div>
  );
}
