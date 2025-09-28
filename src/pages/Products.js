import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import ProductCard from "../component/common/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../actions/productAction";

const Products = () => {
  const dispatch = useDispatch();
  const { products: allProducts, loading, error } = useSelector((state) => state.products)
  const [selectedCategory, setSelectedCategory] = useState("All");



  // Filter products based on selected category
  const filteredProducts = allProducts ? allProducts.filter((product) => {
    if (selectedCategory === "All") return true;
    return product.category === selectedCategory;
  }) : [];

  // Category button component
  const CategoryButton = ({ name }) => (
    <span className="relative group">
      <span
        className={`text-sm font-medium cursor-pointer transition-all duration-300 ${selectedCategory === name
            ? "text-orange-500"
            : "text-gray-300 hover:text-orange-500"
          }`}
        onClick={() => setSelectedCategory(name)}
      >
        {name}
      </span>
      <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${selectedCategory === name ? "w-full" : "w-0 group-hover:w-full"
        }`}></span>
    </span>
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Layout>
      <div className="my-[120px] mx-auto w-[80%] gap-4 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="fixed top-[67px] left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center py-4">
              <div className="flex gap-8">
                <CategoryButton name="All" />
                <CategoryButton name="Mens" />
                <CategoryButton name="Womens" />
                <CategoryButton name="Kids" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[60px] col-span-full">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-white text-lg">Loading products...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-red-500 text-lg">Error: {error}</div>
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product._id || index} {...product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-400 text-lg">No products found</div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;