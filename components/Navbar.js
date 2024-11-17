"use client";

import '../app/styles/globals.css';
import Link from 'next/link';
import Image from 'next/image'; 
import { useState, useEffect, useRef } from 'react';
import 'boxicons/css/boxicons.min.css';
import Footer from './Footer';

export default function Navbar() {
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

  const cryptoData = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '/asset/bitcoin-btc-logo-removebg-preview.png',
      tradedAmount: '1,200 BTC',
      month: 'October',

    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '/asset/ethereum-logo-removebg-preview.png',
      tradedAmount: '3,500 ETH',
      month: 'October',
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      logo: '/asset/thrther_logo-removebg-preview (1).png',
      tradedAmount: '5,000 USDT',
      month: 'October',
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      logo: '/asset/USDC-logo.png',
      tradedAmount: '4,000 USDC',
      month: 'October',
    },
  ];

  // Refs to detect outside clicks
  const buyRef = useRef(null);
  const sellRef = useRef(null);
  const walletRef = useRef(null);
  const dashboardRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        buyRef.current && !buyRef.current.contains(event.target) &&
        sellRef.current && !sellRef.current.contains(event.target) &&
        walletRef.current && !walletRef.current.contains(event.target) &&
        dashboardRef.current && !dashboardRef.current.contains(event.target) &&
        notificationRef.current && !notificationRef.current.contains(event.target)
      ) {
        setBuyDropdownOpen(false);
        setSellDropdownOpen(false);
        setWalletDropdownOpen(false);
        setDashboardDropdownOpen(false);
        setNotificationDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sample notifications
  const notifications = [
    "New trade offer received.",
    "Trade completed successfully.",
    "New message from support."
  ];

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
          {/* Left side: Logo and Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <img
                className="h-8 w-auto"
                src="/asset/WhatsApp Image 2024-10-22 at 11.37.00 AM.jpeg"
                alt="Logo"
              />
            </Link>

            {/* Buy Button */}
            <div className="relative" ref={buyRef}>
              <button
                className="border border-light-gray flex items-center justify-between px-4 py-2 rounded-md text-gray-900 bg-white w-28"
                onClick={() => setBuyDropdownOpen(!buyDropdownOpen)}
              >
                <span>Buy</span>
                <div className="border-l border-light-gray h-4 mx-2" />
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {buyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10" style={{ left: '2rem' }}>
                  <div className="p-2">
                    {cryptoData.map((crypto, index) => (
                      <Link key={index} href="/buy">
                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                          <div className="flex items-center">
                            <Image
                              src={crypto.logo}
                              alt={`${crypto.name} logo`}
                              width={36}  
                              height={36} 
                              className="mr-3"
                            />
                            <div>
                              <h3 className="text-sm font-semibold">{crypto.name}</h3>
                              <span className="text-gray-600 text-sm">{crypto.symbol}</span>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-green-600">{crypto.tradedAmount}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sell Button */}
            <div className="relative" ref={sellRef}>
              <button
                className="border border-light-gray flex items-center justify-between px-4 py-2 rounded-md text-gray-900 bg-white w-28"
                onClick={() => setSellDropdownOpen(!sellDropdownOpen)}
              >
                <span>Sell</span>
                <div className="border-l border-light-gray h-4 mx-2" />
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {sellDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10" style={{ left: 'auto', right: '0.5rem' }}>
                  <div className="p-2">
                    {cryptoData.map((crypto, index) => (
                      <Link key={index} href="/sell">
                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                          <div className="flex items-center">
                            <Image
                              src={crypto.logo}
                              alt={`${crypto.name} logo`}
                              width={36}  
                              height={36} 
                              className="mr-3"
                            />
                            <div>
                              <h3 className="text-sm font-semibold">{crypto.name}</h3>
                              <span className="text-gray-600 text-sm">{crypto.symbol}</span>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-green-600">{crypto.tradedAmount}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Create an Offer Text */}
            <p className="px-4 py-2 text-gray-900">Create an Offer</p>

            {/* Wallet Button with Dropdown */}
            <div
      className="relative"
      ref={walletRef}
      onMouseEnter={() => setWalletDropdownOpen(true)}
      onMouseLeave={() => setWalletDropdownOpen(false)}
    >
      <button className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
        Wallet
      </button>
      {walletDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <Link href="/wallet/balance" className="group flex items-center justify-between px-4 py-2 text-gray-900 hover:bg-gray-100">
            <div className="flex items-center">
              <Image
                src="/asset/income_money_earnings_wallet_coins_euros_icon_144634.webp"
                alt="Balance"
                width={40}
                height={40}
                className="mr-2"
              />
              <div>
                <h4 className="font-semibold">Balance</h4>
                <p className="text-xs text-gray-500">Check the cryptocurrency balance in your wallet</p>
              </div>
            </div>
            <span className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">➡️</span>
          </Link>
          <Link href="/wallet/lightning" className="group flex items-center justify-between px-4 py-2 text-gray-900 hover:bg-gray-100">
            <div className="flex items-center">
              <Image
                src="/asset/flash-78.png"
                alt="Lightning"
                width={40}
                height={40}
                className="mr-2"
              />
              <div>
                <h4 className="font-semibold">Lightning</h4>
                <p className="text-xs text-gray-500">Access lightning-fast transactions</p>
              </div>
            </div>
            <span className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">➡️</span>
          </Link>
          <Link href="/wallet/transactions" className="group flex items-center justify-between px-4 py-2 text-gray-900 hover:bg-gray-100">
            <div className="flex items-center">
              <Image
                src="/asset/arrow-up-down-icon-2048x1986-illp3zlz.png"
                alt="Transactions"
                width={40}
                height={40}
                className="mr-2"
              />
              <div>
                <h4 className="font-semibold">Transactions</h4>
                <p className="text-xs text-gray-500">View your recent transactions</p>
              </div>
            </div>
            <span className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">➡️</span>
          </Link>
          <Link href="/wallet/addresses" className="group flex items-center justify-between px-4 py-2 text-gray-900 hover:bg-gray-100">
            <div className="flex items-center">
              <Image
                src="/asset/360_F_510147692_hHOAxpW1HSJTVgxl23BuDCQ9q3VShzpD.jpg"
                alt="Addresses"
                width={40}
                height={40}
                className="mr-2"
              />
              <div>
                <h4 className="font-semibold">Addresses</h4>
                <p className="text-xs text-gray-500">Manage your crypto addresses</p>
              </div>
            </div>
            <span className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">➡️</span>
          </Link>
        </div>
      )}
    </div>
            {/* Dashboard Button with Dropdown */}
            <div className="relative" ref={dashboardRef}>
              <button
                className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setDashboardDropdownOpen(!dashboardDropdownOpen)}
              >
                Dashboard
              </button>
              {dashboardDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{ left: 'auto', right: '0.5rem' }}> {/* Adjusted position here */}
                  <Link href="/dashboard" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Dashboard Option 1</Link>
                  <Link href="/dashboard" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Dashboard Option 2</Link>
                </div>
              )}
            </div>
          </div>

          {/* Right side: Notification Icon */}
          <div className="relative" ref={notificationRef}>
            <button
              className="relative text-gray-900 hover:bg-gray-100 p-2 rounded-md"
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
            >
             <Image 
             src="/asset/notificstion-icon-removebg-preview.png"
             alt='Notification'
             width="32"
             height="32"
             /> 
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </button>
            {notificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="p-4">
                  <h2 className="text-lg font-bold text-blue-600">Notifications</h2>
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div key={index} className="mt-2 text-sm text-gray-700">
                        {notification}
                      </div>
                    ))
                  ) : (
                    <div className="mt-2 text-sm text-gray-500">No notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
