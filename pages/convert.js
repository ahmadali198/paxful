import React, { useState, useEffect, useRef } from "react";
import { FaExchangeAlt } from "react-icons/fa";

const Convert = React.memo(() => {
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  const currencies = [
    { code: "BTC", symbol: "₿", rate: 65552.98, color: "text-yellow-500" },
    { code: "ETH", symbol: "Ξ", rate: 2031.0, color: "text-purple-500" },
    { code: "USDT", symbol: "$", rate: 1, color: "text-green-500" },
    { code: "BNB", symbol: "BNB", rate: 230, color: "text-yellow-400" },
    { code: "ADA", symbol: "₳", rate: 0.29, color: "text-blue-600" },
    { code: "XRP", symbol: "✕", rate: 0.52, color: "text-blue-400" },
    { code: "DOGE", symbol: "Ð", rate: 0.06, color: "text-yellow-600" },
    { code: "SOL", symbol: "◎", rate: 24.5, color: "text-teal-500" },
    { code: "DOT", symbol: "●", rate: 4.5, color: "text-pink-400" },
    { code: "MATIC", symbol: "M", rate: 0.75, color: "text-indigo-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCurrencyIndex(
        (prevIndex) => (prevIndex + 1) % currencies.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [currencies.length]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    const rate = getExchangeRate(fromCurrency, toCurrency);
    setConvertedAmount((e.target.value * rate).toFixed(2));
  };

  const getExchangeRate = (from, to) => {
    const rates = {
      BTC: {
        USDT: 65552.98,
        ETH: 0.032,
        BNB: 220,
        ADA: 227000,
        XRP: 126000,
        DOGE: 1080000,
        SOL: 2700,
        DOT: 14500,
        MATIC: 87300,
      },
      ETH: {
        USDT: 2031.0,
        BTC: 0.03125,
        BNB: 10,
        ADA: 6900,
        XRP: 3930,
        DOGE: 34000,
        SOL: 83,
        DOT: 447,
        MATIC: 2700,
      },
      USDT: {
        BTC: 0.00001525,
        ETH: 0.00049,
        BNB: 0.0046,
        ADA: 3.5,
        XRP: 1.92,
        DOGE: 16.67,
        SOL: 0.041,
        DOT: 0.22,
        MATIC: 1.33,
      },
    };

    // console.log("rate", rates);
    // for (const [key, value] of Object.entries(rates.BTC)) {
    //   console.log(`Key: ${key}, Value: ${value}`);
    //   for (const [key, value] of Object.entries(rates.ETH)) {
    //     console.log(`Key: ${key}, Value: ${value}`);
    //     for (const [key, value] of Object.entries(rates.USDT)) {
    //       console.log(`Key: ${key}, Value: ${value}`);
    //     }
    //   }
    //   break;
    // }

    // for (const [key, value] of Object.entries(rates.BTC)) {
    //   console.log(`Key: ${key}, Value: ${value}`);
    //   break;
    // }
    return rates[from]?.[to] || 1;
  };

  const useOutsideClick = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        console.log("event", event.isTrusted);

        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  const CurrencyDropdown = ({
    selectedCurrency,
    onCurrencyChange,
    isOpen,
    toggleOpen,
  }) => {
    const dropdownRef = useRef(null);
    useOutsideClick(dropdownRef, () => toggleOpen(false));

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => toggleOpen(!isOpen)}
          className="flex items-center text-2xl bg-transparent focus:outline-none"
        >
          <span
            className={`mr-2 ${
              currencies.find((c) => c.code === selectedCurrency).color
            }`}
          >
            {currencies.find((c) => c.code === selectedCurrency).symbol}
          </span>
          {selectedCurrency}
        </button>
        {isOpen && (
          <div className="absolute mt-2 bg-white shadow-2xl rounded-lg z-10 p-4 w-72">
            <div className="grid grid-cols-2 gap-4">
              {currencies.map((currency) => (
                <div
                  key={currency.code}
                  onClick={() => {
                    onCurrencyChange(currency.code);
                    toggleOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 rounded-md flex items-center"
                >
                  <span className={`mr-2 ${currency.color}`}>
                    {currency.symbol}
                  </span>
                  {currency.code}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Live Digital Currency Ticker */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 mb-8 shadow-xl rounded-lg mt-20">
        <div className="container mx-auto text-center text-2xl font-semibold animate-pulse">
          <span className="mr-2">Live:</span>
          <span className={`font-bold`}>
            {currencies[currentCurrencyIndex].symbol}{" "}
            {currencies[currentCurrencyIndex].code} ={" "}
            {currencies[currentCurrencyIndex].rate} USDT
          </span>
        </div>
      </div>

      {/* Converter */}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-bl from-gray-100 via-gray-200 to-gray-300">
        <div className="container mx-auto max-w-lg bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                You are converting
              </h2>
              <div className="input-group flex items-center border border-gray-300 rounded-md p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="flex-grow text-xl border-none bg-transparent outline-none"
                  placeholder="Enter amount"
                />
                <CurrencyDropdown
                  selectedCurrency={fromCurrency}
                  onCurrencyChange={(value) => {
                    setFromCurrency(value);
                    setConvertedAmount(
                      (amount * getExchangeRate(value, toCurrency)).toFixed(2)
                    );
                  }}
                  isOpen={fromDropdownOpen}
                  toggleOpen={setFromDropdownOpen}
                />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <FaExchangeAlt className="text-7xl text-blue-500 mx-6 transition-transform duration-500 transform hover:rotate-180" />
            </div>

            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                You will get
              </h2>
              <div className="input-group flex items-center border border-gray-300 rounded-md p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <input
                  type="number"
                  value={convertedAmount}
                  readOnly
                  className="flex-grow text-xl border-none bg-transparent outline-none cursor-not-allowed"
                  placeholder="Converted amount"
                />
                <CurrencyDropdown
                  selectedCurrency={toCurrency}
                  onCurrencyChange={(value) => {
                    setToCurrency(value);
                    setConvertedAmount(
                      (amount * getExchangeRate(fromCurrency, value)).toFixed(2)
                    );
                  }}
                  isOpen={toDropdownOpen}
                  toggleOpen={setToDropdownOpen}
                />
              </div>
              <span className="available text-sm text-gray-600 text-center mt-2">
                Min: {fromCurrency === "BTC" ? "0.00001525" : "1"}
              </span>
            </div>

            <div className="exchange-rate text-base text-gray-800 text-center bg-blue-50 p-4 rounded-md shadow-inner transition-all duration-300">
              Exchange Rate: 1 {fromCurrency} ={" "}
              {getExchangeRate(fromCurrency, toCurrency)} {toCurrency}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Convert;
