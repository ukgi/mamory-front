import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
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

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

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
            <NavBtnLink to='/signin'>로그인</NavBtnLink>
            <NavBtnLink to='/register'>회원가입</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
