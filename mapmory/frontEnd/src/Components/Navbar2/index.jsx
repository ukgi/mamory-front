import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import axios from "axios";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar2 = ({ toggle }, setCurrentMemberId) => {
  const [scrollNav, setScrollNav] = useState(false);
  let [nickname, setNickname] = useState("");

  //닉네임 서버로 부터 받아와서 표출
  // useEffect(() => {
  //   axios.get("").then((res) => {
  //     console.log("nickname : ", res.data.nickname);
  //     setNickname(res.data.nickname);
  //   });
  // }, []);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  // 📛 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("nickname");
    setCurrentMemberId(null);
  };
  const username = localStorage.getItem("nickname");
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }} />
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to='/' onClick={toggleHome}>
            Mapmory
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks
                to='home'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
              >
                Home
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to='upload'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
              >
                Upload
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to='posting'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
              >
                Posting
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to='diary'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
              >
                Diary
              </NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink>{username}님 안녕하세요!</NavBtnLink>
            <NavBtnLink to='/' onClick={handleLogout}>
              로그아웃
            </NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar2;
