import React, { useState } from "react";
import Layout from "../layouts/Layout";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Air Max 90",
      brand: "Nike",
      color: "White/Blue",
      size: 9,
      price: 129.99,
      quantity: 1,
      image:
        "https://www.bata.com/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-bata-in-master-catalog/default/dwb1ecff5a/images/large/8396212_1.jpeg?sw=200",
    },
    {
      id: 2,
      name: "Ultra Boost",
      brand: "Adidas",
      color: "Black/Gray",
      size: 10,
      price: 179.99,
      quantity: 2,
      image:
        "https://www.bata.com/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-bata-in-master-catalog/default/dw77e66747/images/large/8614067_1.jpeg?sw=200",
    },
  ]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 12.99;
  const gst = subtotal * 0.08;
  const discount = 0;
  const total = subtotal + shipping + gst;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <Layout>
      <div className="mt-[150px] xl:mx-[150px]">
        <div className="container min-w-[100%] sm:max-w-[90%] mx-auto px-[20px] py-8">
          <h3 className="text-3xl text-[#ff6b00] text-left font-bold mb-8">
            My shopping cart [{cartItems.reduce((acc, item) => acc + item.quantity, 0)}]
          </h3>

          {cartItems.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-md text-center">
              <h2 className="text-xl font-semibold mb-4 text-white">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">
                Looks like you haven't added any shoes to your cart yet.
              </p>
              <button className="bg-[#ff6b00] text-white py-2 px-6 rounded-md hover:bg-[#ff8533] transition">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden">
                  <div className="divide-y divide-gray-700">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full object-cover rounded"
                          />
                        </div>
                        <div className="sm:w-3/4 sm:pl-4 flex flex-col">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-semibold text-lg text-white">
                              {item.name}
                            </h3>
                            <span className="font-semibold text-[#ff6b00]">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-1">{item.brand}</p>
                          <p className="text-gray-300 mb-1">Color: {item.color}</p>
                          <p className="text-gray-300 mb-4">Size: {item.size}</p>

                          <div className="flex justify-between items-center mt-auto">
                            <div className="flex items-center border border-gray-700 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white"
                              >
                                -
                              </button>
                              <span className="px-4 py-1 text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#ff6b00] hover:text-[#ff8533]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 lg:max-w-[400px]">
                <div className="bg-[#1a1a1a] rounded-lg shadow-md p-4 sticky top-4">
                  <h2 className="text-xl font-semibold mb-4 text-[#ff6b00]">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span>₹{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>GST</span>
                      <span>₹{gst.toFixed(2)}</span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-gray-300">Discount</span>
                      <span className="text-[#ff6b00]">-₹{discount.toFixed(2)}</span>
                    </div> */}
                    <div className="border-t border-gray-700 pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-white">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-[#ff6b00] text-white rounded-md py-3 font-medium">
                    {/* Proceed to Checkout */}
                    Coming Soon
                  </button>

                  {/* <div className="mt-6 pt-4 border-t border-gray-700">
                    <h3 className="text-lg text-[#ff6b00] font-medium mb-2">
                      Coupan Code
                    </h3>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Enter coupan code"
                        className="w-[70%] px-3 py-2 border border-gray-700 rounded-l-md bg-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b00]"
                      />
                      <button className="w-[30%] min-w-[70px] bg-[#ff6b00] text-white px-4 rounded-r-md hover:bg-[#ff8533] transition">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <h3 className="text-lg text-[#ff6b00] font-medium mb-2">
                      Credit Code
                    </h3>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Enter credit code"
                        className="w-[70%] px-3 py-2 border border-gray-700 rounded-l-md bg-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b00]"
                      />
                      <button className="w-[30%] min-w-[70px] bg-[#ff6b00] text-white px-4 rounded-r-md hover:bg-[#ff8533] transition">
                        Apply
                      </button>
                    </div>
                  </div> */}
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
