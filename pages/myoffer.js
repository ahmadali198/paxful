"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MyOffer = () => {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <div className="flex flex-col items-center p-8 mt-24">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">My Offers</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("buy")}
          className={`px-4 py-2 rounded-md transition duration-300 ${
            activeTab === "buy" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          Offers to Buy
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`px-4 py-2 rounded-md transition duration-300 ${
            activeTab === "sell" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          Offers to Sell
        </button>
      </div>

      {/* Offer Details */}
      {activeTab === "buy" ? (
        <div className="bg-white rounded-lg shadow-xl p-8 w-full sm:w-8/4 lg:w-2/3">
          <h3 className="text-2xl font-semibold mb-4">Offers to Buy</h3>
          <div className="flex flex-col space-y-4">
            {/* Example Offer */}
            <Link href="/buy" className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-100 transition">
              <Image src="/asset/bitcoin-btc-logo-removebg-preview.png" alt="Bitcoin" width={50} height={50} className="mr-3" />
              <div>
                <h4 className="text-lg font-semibold">Buy Bitcoin</h4>
                <p className="text-gray-600">Price: $50,000</p>
              </div>
            </Link>
            {/* Add more offers as needed */}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-xl p-8 w-full sm:w-3/4 lg:w-2/3">
          <h3 className="text-2xl font-semibold mb-4">Offers to Sell</h3>
          <div className="flex flex-col space-y-4">
            {/* Example Offer */}
            <Link href="/sell" className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-100 transition">
              <Image src="/asset/ethereum-logo-removebg-preview.png" alt="Ethereum" width={50} height={50} className="mr-3" />
              <div>
                <h4 className="text-lg font-semibold">Sell Ethereum</h4>
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

export default MyOffer;
