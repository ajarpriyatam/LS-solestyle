import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../actions/productAction";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  let id = params.slug;
  const [selectedColor, setSelectedColor] = useState("White");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  let { product, loading, error } = useSelector((state) => state.productDetails);
  // product.productImageGallery = [product.productImage, ...product.productImageGallery];
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const ColorButton = ({ color }) => {
    const getColorClass = () => {
      switch (color.toLowerCase()) {
        case "white":
          return "bg-white border border-gray-300";
        case "black":
          return "bg-black border border-gray-300";
        case "red":
          return "bg-red-500 border border-gray-300";
        case "blue":
          return "bg-blue-500 border border-gray-300";
        case "green":
          return "bg-green-500 border border-gray-300";
        case "yellow":
          return "bg-yellow-500 border border-gray-300";
        case "purple":
          return "bg-purple-500 border border-gray-300";
        case "pink":
          return "bg-pink-500 border border-gray-300";
        case "grey":
          return "bg-gray-500 border border-gray-300";
        case "orange":
          return "bg-orange-500 border border-gray-300";
        case "brown":
          return "bg-amber-800 border border-gray-300";
        case "beige":
          return "bg-amber-100 border border-gray-300";
        case "lightblue":
          return "bg-blue-300 border border-gray-300";
        default:
          return "bg-gray-300 border border-gray-300";
      }
    };

    return (
      <button
        className={`w-12 h-12 rounded-lg ${getColorClass()} ${selectedColor === color
          ? "ring-2 ring-orange-500 shadow-lg shadow-orange-500/30"
          : "hover:ring-2 hover:ring-orange-500/50"
          } transition-all duration-300`}
        onClick={() => setSelectedColor(color)}
        title={color}
      />
    );
  };

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4 mt-[120px] bg-black text-gray-100">
          <div className="flex items-center justify-center h-64">
            <div className="text-orange-500 text-xl">Loading product details...</div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto p-4 mt-[120px] bg-black text-gray-100">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500 text-xl">Error: {error}</div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show message if product is empty
  if (!product || Object.keys(product).length === 0) {
    return (
      <Layout>
        <div className="container mx-auto p-4 mt-[120px] bg-black text-gray-100">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400 text-xl">Product not found</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 mt-[120px] bg-black text-gray-100">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          <div className="xl:w-1/2">
            {/* Main Image Container */}
            <div className="relative">
              {/* Main Product Image */}
              <div className="bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center mb-4">
                <img
                  src={product.productImageGallery[selectedImage].url}
                  alt={product.name}
                  className="max-w-full max-h-[280px] sm:max-h-[380px] lg:max-h-[450px] object-contain"
                />
              </div>

              {/* Desktop: Vertical Thumbnail Sidebar */}
              <div className="hidden xl:flex flex-col gap-3 absolute left-0 top-0 h-full">
                {product.productImageGallery && product.productImageGallery.map((img, index) => (
                  <button
                    key={index}
                    className={`w-16 h-16 border-2 transition-all duration-300 overflow-hidden rounded-lg ${selectedImage === index
                      ? "border-orange-500 shadow-lg shadow-orange-500/30"
                      : "border-gray-600 hover:border-orange-500/50"
                      }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Tablet: Horizontal Thumbnail Row Above Main Image */}
              <div className="hidden md:flex xl:hidden gap-3 mb-4 overflow-x-auto pb-2">
                {product.productImageGallery && product.productImageGallery.map((img, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 border-2 transition-all duration-300 overflow-hidden rounded-lg ${selectedImage === index
                      ? "border-orange-500 shadow-lg shadow-orange-500/30"
                      : "border-gray-600 hover:border-orange-500/50"
                      }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Mobile: Horizontal Thumbnail Row Below Main Image */}
              <div className="flex md:hidden gap-3 mt-4 overflow-x-auto pb-2">
                {product.productImageGallery && product.productImageGallery.map((img, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 border-2 transition-all duration-300 overflow-hidden rounded-lg ${selectedImage === index
                      ? "border-orange-500 shadow-lg shadow-orange-500/30"
                      : "border-gray-600 hover:border-orange-500/50"
                      }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="xl:w-1/2 px-4 sm:px-0">
            {/* Product Title and Price */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-100 mb-3 leading-tight">
                {product.name}- {product.tokenId}
              </h1>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-orange-500 text-2xl sm:text-3xl font-bold">
                  Rs. {product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">
                  Inclusive of all taxes
                </p>
              </div>
            </div>

            {/* Colors Section */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-300 mb-3 text-left">Colors</h5>
              <div className="flex gap-3 flex-wrap">
                {product.colors && product.colors.map((color) => (
                  <ColorButton key={color} color={color} />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-300 mb-3 text-left">Sizes</h5>
              <div className="flex flex-wrap gap-2">
                {product.sizes && product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border-2 ${
                      selectedSize === size
                        ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30"
                        : "bg-gray-800 text-gray-300 border-gray-600 hover:border-orange-500/50 hover:bg-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-xs text-gray-400 mt-2">
                  Selected: {selectedColor} / {selectedSize}
                </p>
              )}
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-300 mb-3">Quantity</p>
              <div className="flex items-center w-fit">
                <button
                  className="w-10 h-10 border border-gray-700 bg-gray-800 text-gray-300 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-colors rounded-l-lg"
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <div className="w-12 h-10 border-t border-b border-gray-700 bg-gray-800 text-gray-300 flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  className="w-10 h-10 border border-gray-700 bg-gray-800 text-gray-300 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-colors rounded-r-lg"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 py-4 px-6 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-lg font-medium">
                ADD TO CART
              </button>
              <button className="flex-1 py-4 px-6 bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 rounded-lg font-medium">
                BUY NOW
              </button>
            </div>

            {/* Security Badge */}
            <div className="flex justify-center sm:justify-start mb-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">Secure Payment</span>
              </div>
            </div>

            {/* Product Description */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-200 mb-3 text-left">Description</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-[15px] text-orange-500 font-bold mb-2">
                Specifications
              </p>
              {Object.entries(product.specifications).map(([key, value]) => (
                <p key={key} className="text-[15px] mb-2">
                  <span className="font-bold text-gray-300">{key}: </span>
                  <span className="text-gray-400">{value}</span>
                </p>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );

  // ...existing code...
};

export default ProductDetails;
