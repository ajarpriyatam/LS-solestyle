import React from "react";
import Slider from "react-slick";
import { collections } from "../../constants";
import "./CollectionList.css";
import Collection from "./Collection";

const CollectionList = () => {
  const settings3 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    adaptiveHeight: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section
      id="collection"
      className="mt-[50px] lg:mt-[53px] w-full flex flex-col items-start justify-center gap-[32px]"
    >
      <h2 className="text-[22px] md:text-[24px] px-[5%] text-center lg:text-left">
        Discover Our Collection
      </h2>

      <div className="w-[100%]">
        <Slider {...settings3} className="collection-slider">
          {collections.map((item, index) => (
            <Collection key={index} {...item} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CollectionList;
