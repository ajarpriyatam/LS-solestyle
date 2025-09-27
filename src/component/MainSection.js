import React from "react";
import { bannerImages } from "../constants";
import Slider from "react-slick";
import { useMediaQuery } from "@mui/material";

const MainSection = () => {
  const isMobile = useMediaQuery("(min-width:768px)");

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    adaptiveHeight: false,
  };

  return (
    // <section id="home" className="w-full overflow-hidden">
    //   <span>Welcome to Ls shoes</span>
    // </section>
    <section
      id="home"
      className="
    w-full min-h-[100vh] flex flex-col justify-center items-center
    bg-black
    relative overflow-hidden
  "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-orange-100/10 to-pink-100/20 pointer-events-none" />
      <div className="z-10 flex flex-col items-center backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <span
          className="
    text-5xl md:text-7xl font-extrabold 
    text-transparent bg-clip-text bg-gradient-to-r
    from-orange-600 via-white-500 to-orange-400 
    drop-shadow-lg mb-2 text-center tracking-tight
    font-pacifico
  "
        >
          Welcome to LS Shoes
        </span>
      </div>
    </section>


  );
};

export default MainSection;
