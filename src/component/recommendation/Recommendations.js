import React, { useRef, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";

const Recommendation = () => {
  const dispatch = useDispatch();
  const productAll = useSelector((state) => state.products.products)
  const scrollContainerRef = useRef(null);
  const products = productAll ? productAll.filter(product => product.tokenId.startsWith('A')): [];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" }); // Adjusted scroll distance
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" }); // Adjusted scroll distance
    }
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <section
      id="collection"
      className="mt-[50px] lg:mt-[53px] w-full flex flex-col items-start justify-center gap-[32px] relative bg-[#000000] py-8"
    >
      <div className="w-full flex justify-between items-center px-[5%]">
        <h2 className="text-[22px] md:text-[24px] text-center lg:text-left text-[#ff6b00] font-semibold">
          Recommended for you
        </h2>

        <div className="hidden md:flex gap-4"> {/* Increased gap */}
          <button
            onClick={scrollLeft}
            className="p-3 bg-[#1a1a1a] text-white rounded-full hover:bg-[#2a2a2a] transition-all duration-300 border border-[#ff6b00] hover:scale-110"
            aria-label="Scroll left"
          >
            <IoIosArrowBack className="text-[#ff6b00] text-xl" />
          </button>
          <button
            onClick={scrollRight}
            className="p-3 bg-[#1a1a1a] text-white rounded-full hover:bg-[#2a2a2a] transition-all duration-300 border border-[#ff6b00] hover:scale-110"
            aria-label="Scroll right"
          >
            <IoIosArrowForward className="text-[#ff6b00] text-xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto flex px-[5%] pb-6 hide-scrollbar snap-x snap-mandatory scrollbar-none"
      >
        <div className="flex gap-6 mx-auto"> {/* Added wrapper div with gap */}
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-none w-[280px] snap-start transform transition-transform duration-300 hover:scale-105"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div> 
    </section>
  );
};

export default Recommendation;