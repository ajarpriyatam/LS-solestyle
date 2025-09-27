import React from "react";
import { Link } from "react-router-dom";

const Collection = (props) => {
  return (
    <Link
      to={props.collectionSrc}
      className="group relative w-full h-full block overflow-hidden"
    >
      <img
        src={props.collectionImgUrl}
        alt={props.collectionName}
        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-700 group-hover:bg-opacity-60"></div>

      <h1 className="absolute inset-0 flex items-center justify-center text-white max-w-[80%] mx-auto font-mono transition-transform duration-700 group-hover:scale-110">
        {props.collectionName}
      </h1>
    </Link>
  );
};

export default Collection;
