"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MyFavouriteOffer = () => {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <div className="flex flex-col items-center p-8 mt-24">
      <h2 className="text-3xl font-bold mb-6 text-purple-600">My Favourite Offers</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("buy")}
          className={`px-4 py-2 rounded-md transition duration-300 ${
            activeTab === "buy" ? "bg-purple-600 text-white" : "bg-white text-purple-600 border border-purple-600"
          }`}
        >
          Buy Cryptocurrency
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`px-4 py-2 rounded-md transition duration-300 ${
            activeTab === "sell" ? "bg-purple-600 text-white" : "bg-white text-purple-600 border border-purple-600"
          }`}
        >
          Sell Cryptocurrency
        </button>
      </div>

      {/* Offer Details */}
      {activeTab === "buy" ? (
        <div className="bg-white rounded-lg shadow-xl p-8 w-full sm:w-8/4 lg:w-2/3">
          <h3 className="text-2xl font-semibold mb-4">Buy Cryptocurrency</h3>
          <div className="flex flex-col space-y-4">
            {/* Example Favourite Offer */}
            <Link href="/buy" className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-100 transition">
              <Image src="" alt="" width={50} height={50} className="mr-3" />
              <div>
                <h4 className="text-lg font-semibold">Buy Cryptocurrency</h4>
                <p className="text-gray-600">Price: $50,000</p>
              </div>
            </Link>
            {/* Add more offers as needed */}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-xl p-8 w-full sm:w-3/4 lg:w-2/3">
          <h3 className="text-2xl font-semibold mb-4">Sell Cryptocurrency</h3>
          <div className="flex flex-col space-y-4">
            {/* Example Favourite Offer */}
            <Link href="/sell" className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-100 transition">
              <Image src="" alt="" width={50} height={50} className="mr-3" />
              <div>
                <h4 className="text-lg font-semibold">Sell Cryptocurrency</h4>
                <p className="text-gray-600">Price: $3,500</p>
              </div>
            </Link>
            {/* Add more offers as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFavouriteOffer;
