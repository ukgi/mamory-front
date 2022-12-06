import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar2 from "../Components/Navbar2";
import HeroSection from "../Components/HeroSection";
import InfoSection from "../Components/InfoSection";
import Footer from "../Components/Footer";
// import Signup from "../Components/Register/Register";
import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
} from "../Components/InfoSection/Data";

const Home2 = (setCurrentUser) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  // const nicknameFunction = (n) => {
  //   console.log(n)
  // }
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar2 toggle={toggle} currentUser={setCurrentUser} />
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjThree} />
      <Footer />
    </>
  );
};

export default Home2;
