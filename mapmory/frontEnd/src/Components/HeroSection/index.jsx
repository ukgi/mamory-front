import React, { useState } from "react";
import Video from "../../videos/video02.mp4";
import { NavBtn, NavBtnLink } from "../Navbar/NavbarElements";
import { Button } from "../ButtonElements";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";

const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  const userName = localStorage.getItem("nickname");
  const memberId = localStorage.getItem("id");
  return (
    <HeroContainer id='home'>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <HeroContent>
        <HeroH1>당신의 추억을 지도 위에 기록해보세요</HeroH1>
        <HeroP>
          오늘 다녀온 장소는 어디에 있나요? <br />
          누구와 함께 행복한 시간을 보내셨나요?
        </HeroP>
        <HeroBtnWrapper>
          <NavBtn>
            {userName && (
              <NavBtnLink to={`/map/${memberId}`}>지도로 가기</NavBtnLink>
            )}
            {!userName && <NavBtnLink to='/signin'>시작하기</NavBtnLink>}
          </NavBtn>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
