import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import InfoSection from "../Components/InfoSection";
import Footer from "../Components/Footer";
import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
} from "../Components/InfoSection/Data";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjThree} />
      <Footer />
    </>
  );
};

export default Home;
