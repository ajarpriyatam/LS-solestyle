import React from "react";
import shoeLogo from "../../assets/logo/shoe.png";

const Logo = ({ className, img }) => {
return (
  <div className="relative">
    <a
      href="/"
      className="group flex items-center gap-3 hover:opacity-80 transition-all duration-300"
    >
      <div className="relative">
        <img
          src={shoeLogo}
          alt="logo"
          className="h-12 w-12 object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur-sm group-hover:bg-orange-500/30 transition-colors duration-300"></div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          L S
        </span>
        <span className="text-sm tracking-[0.3em] text-gray-300 font-light uppercase">
          Shoes
        </span>
      </div>
    </a>
  </div>
);
};

export default Logo;
