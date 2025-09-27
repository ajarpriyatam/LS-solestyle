import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Layout from "../layouts/Layout";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mockOrder = {
    orderNumber: "ORD-12345678",
    orderDate: "March 25, 2025",
    status: "In Transit",
    estimatedDelivery: "April 2, 2025",
    items: [
      {
        id: 1,
        name: "Air Max 270",
        color: "Black/White",
        size: "10.5",
        image: "/api/placeholder/100/80",
        price: 149.99,
      },
      {
        id: 2,
        name: "UltraBoost 5.0",
        color: "Gray/Blue",
        size: "10",
        image: "/api/placeholder/100/80",
        price: 179.99,
      },
    ],
    trackingSteps: [
      {
        date: "March 25, 2025",
        status: "Order Placed",
        description: "Your order has been received",
      },
      {
        date: "March 26, 2025",
        status: "Processing",
        description: "Your order is being prepared",
      },
      {
        date: "March 28, 2025",
        status: "Shipped",
        description: "Your order has left our warehouse",
      },
      {
        date: "March 30, 2025",
        status: "In Transit",
        description: "Your order is on its way",
      },
      { date: null, status: "Delivered", description: "Package delivered" },
    ],
    shippingAddress: "123 Main Street, Apt 4B, New York, NY 10001",
    carrier: "FedEx",
    trackingNumber: "FDX7891234567",
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!orderNumber.trim() || !email.trim()) {
      setError("Please enter both order number and email");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (
        orderNumber.toUpperCase() === "ORD-12345678" &&
        email.toLowerCase() === "demo@example.com"
      ) {
        setTrackingResult(mockOrder);
      } else {
        setError("Order not found. Please check your order number and email.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="mt-[120px] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Track Your Order
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Enter your order details to check the current status
            </p>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleTrackOrder}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="orderNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Order Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        placeholder="e.g. ORD-12345678"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email used for order"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 text-sm text-red-600">{error}</div>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaSearch size={16} className="mr-2" />
                        Track Order
                      </span>
                    )}
                  </button>
                </div>

                <div className="mt-4 text-center text-xs text-gray-500">
                  For demo purposes, use: ORD-12345678 / demo@example.com
                </div>
              </form>
            </div>
          </div>

          {trackingResult && (
            <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Order Details{" "}
                  <span className="ml-2 text-sm text-gray-500">
                    #{trackingResult.orderNumber}
                  </span>
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Placed on {trackingResult.orderDate}
                </p>
              </div>

              <div className="px-4 py-5 sm:px-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Delivery Status
                </h4>
                <div className="flex items-center justify-between mb-4">
                  <div className="font-medium text-gray-900">
                    Status:{" "}
                    <span className="text-indigo-600">
                      {trackingResult.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Estimated Delivery: {trackingResult.estimatedDelivery}
                  </div>
                </div>

                <div className="relative">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                      style={{
                        width: `${
                          ((trackingResult.trackingSteps.findIndex(
                            (step) => step.status === trackingResult.status
                          ) +
                            1) /
                            trackingResult.trackingSteps.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between">
                    {trackingResult.trackingSteps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full mb-1 flex items-center justify-center ${
                            step.date
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="text-xs text-center w-16 overflow-hidden text-ellipsis">
                          {step.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Order Items
                </h4>
                <div className="divide-y divide-gray-200">
                  {trackingResult.items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Size: {item.size} | Color: {item.color}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Shipping Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-1">
                      Shipping Address
                    </h5>
                    <p className="text-sm text-gray-900">
                      {trackingResult.shippingAddress}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-1">
                      Shipping Method
                    </h5>
                    <p className="text-sm text-gray-900">
                      {trackingResult.carrier} <br />
                      <span className="text-indigo-600 cursor-pointer hover:underline">
                        {trackingResult.trackingNumber}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="px-4 py-5 border-t border-gray-200 sm:px-6 bg-gray-50">
                <h4 className="text-md font-medium text-gray-900 mb-2">
                  Need help with your order?
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  If you have questions about your order, please contact our
                  customer support team.
                </p>
                <div className="mt-3">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Contact Support
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

export default TrackOrder;
