import React from "react";
import Layout from "../layouts/Layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaShippingFast } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart, cartContext] = useCart();
  const { MINIMUM_ORDER_QUANTITY } = cartContext;
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const Packaging = totalQuantity > 0 ? Math.ceil(totalQuantity / 48) * 400 : 0;
  const gst = subtotal * 0.08;
  const total = subtotal + Packaging + gst;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < MINIMUM_ORDER_QUANTITY) {
      toast.error(`Minimum order quantity is ${MINIMUM_ORDER_QUANTITY} units`);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8 mt-[100px]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 mt-8">
            <div className="flex items-center gap-3 mb-2">
              <FaShoppingCart className="text-orange-500 text-4xl" />
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                Shopping Cart
              </h1>
            </div>
            <p className="text-gray-400 text-lg ml-1">
              {cart.length > 0 ? `${cart.reduce((acc, item) => acc + item.quantity, 0)} ${cart.reduce((acc, item) => acc + item.quantity, 0) === 1 ? 'item' : 'items'} in your cart` : 'Your cart is waiting'}
            </p>
          </div>

          {/* Minimum Order Notice */}
          {cart.length > 0 && (
            <div className="mb-6 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-sm">!</span>
                </div>
                <div>
                  <h3 className="text-orange-500 font-semibold text-sm">Minimum Order Policy</h3>
                  <p className="text-gray-300 text-xs">
                    Each product requires a minimum order of {MINIMUM_ORDER_QUANTITY} units. This ensures wholesale pricing and efficient fulfillment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 sm:p-16 shadow-2xl text-center border border-gray-700">
              <div className="max-w-md mx-auto">
                <div className="mb-6 inline-block p-6 bg-orange-500/10 rounded-full">
                  <FaShoppingCart className="text-6xl text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">Your Cart is Empty</h2>
                <p className="text-gray-400 mb-8 text-lg">
                  Discover amazing footwear and add your favorites to get started!
                </p>
                <button 
                  onClick={() => navigate("/")}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-orange-500/50 transform hover:scale-105"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3 space-y-4">
                {cart.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-[1.02] relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Token ID Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-orange-500 text-black font-bold text-xs px-3 py-1 rounded-br-lg rounded-tl-lg shadow-lg">
                        #{item.tokenId}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="sm:w-1/3 lg:w-1/4">
                        <div className="relative group overflow-hidden rounded-xl bg-gray-700 aspect-square">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="sm:w-2/3 lg:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-xl text-white mb-1 hover:text-orange-500 transition-colors cursor-pointer">
                                {item.name}
                              </h3>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-gray-400 text-sm">₹{item.price.toFixed(2)} each</p>
                            </div>
                          </div>

                          {/* Product Meta */}
                          <div className="flex flex-wrap gap-3 mb-4">
                            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1.5 rounded-lg">
                              <span className="text-gray-400 text-sm">Sizes:</span>
                              <span className="text-white font-medium">
                                {Array.isArray(item.sizes) ? item.sizes.join(", ") : item.size}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3 mb-4">
                            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1.5 rounded-lg">
                              <span className="text-gray-400 text-sm">Colors:</span>
                              <span className="text-white font-medium">
                                {Array.isArray(item.colors) ? item.colors.join(", ") : item.color}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm">Quantity:</span>
                            <div className="flex items-center bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 48)}
                                className={`px-4 py-2 text-white transition-colors duration-200 ${
                                  item.quantity > MINIMUM_ORDER_QUANTITY 
                                    ? "hover:bg-orange-500" 
                                    : "cursor-not-allowed opacity-50"
                                }`}
                                disabled={item.quantity <= MINIMUM_ORDER_QUANTITY}
                              >
                                <FaMinus className="text-sm" />
                              </button>
                              <span className="px-6 py-2 text-white font-bold bg-gray-800">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 48)}
                                className="px-4 py-2 hover:bg-orange-500 text-white transition-colors duration-200"
                              >
                                <FaPlus className="text-sm" />
                              </button>
                            </div>
                            <span className="text-xs text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                              Min: {MINIMUM_ORDER_QUANTITY}
                            </span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                          >
                            <FaTrash />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping Button */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-xl transition-all duration-300 font-semibold border border-gray-700 hover:border-orange-500"
                >
                  ← Continue Shopping
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 sticky top-24 border border-gray-700">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                    Order Summary
                  </h2>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span className="flex items-center gap-2">
                        <MdLocalOffer className="text-orange-500" />
                        Subtotal
                      </span>
                      <span className="font-semibold text-white">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span className="flex items-center gap-2">
                        <FaShippingFast className="text-orange-500" />
                        Packaging
                      </span>
                      <span className="font-semibold text-white">₹{Packaging.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>GST (8%)</span>
                      <span className="font-semibold text-white">₹{gst.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-white">Total</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                          ₹{total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl py-4 font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 mb-4">
                    Coming Soon...
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
