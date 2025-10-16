import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const allSizes = ["6", "7", "8", "9", "10"];
  const navigate = useNavigate();

  return (
    <div
      className="group relative w-full h-full bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${props._id}`)}
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className="absolute right-3 top-3 z-40 bg-black p-2 rounded-full shadow-md transition-transform duration-200 hover:scale-110"
      >
        {isFavorite ? (
          <FaHeart className="w-5 h-5 text-orange-500" />
        ) : (
          <FaRegHeart className="w-5 h-5 text-gray-300" />
        )}
      </button>

      {/* Image Section */}
      <div className="h-[260px] w-full overflow-hidden bg-gray-900">
        <img
          src={props.productImageGallery[0].url}
          alt={props.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 bg-black">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-100 mb-1">
            {props.name}
          </h3>
          <p className="text-xl font-bold text-orange-500">
            Rs. {props.price.toLocaleString()}
          </p>
        </div>

        {/* Sizes */}
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-2">Available Sizes:</p>
          <div className="flex gap-2">
            {allSizes.map((size, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-md text-sm ${
                  props.sizes.includes(size)
                    ? "bg-orange-500/20 text-orange-500 font-medium"
                    : "bg-gray-800 text-gray-500 line-through"
                }`}
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Colors */}
        {props.colors && props.colors.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-2">Colors:</p>
            <div className="flex gap-2 flex-wrap">
              {props.colors.map((color, idx) => {
                return (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-md text-xs bg-gray-800 text-gray-300 border border-gray-600"
                  >
                    {color}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Quick View Button - Appears on Hover */}
      <div className={`absolute bottom-0 left-0 right-0 text-center transition-all duration-300 transform ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
        <button className="w-full py-3 bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors">
          Quick View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;