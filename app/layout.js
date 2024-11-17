"use client";

import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Convert from "../pages/convert";
import css from "../app/styles/globals.css"; // Ensure your styles are applied
import { useState } from "react";
import Footer from "../components/Footer";
import TradeStatics from "../pages/tradestatics";
import MyOffer from "../pages/myoffer";
import InviteFriend from "../pages/invitefriend";
import MyFavouriteOffer from "../pages/favourateoffer";
import MyTradePartner from "../pages/TradePartner";
import TradeHistory from "../pages/TradeHistory";
import ForgotPassword from "../pages/forgot-password";
import ResetPassword from "../pages/reset-password[token]";
import UpdatePassword from "../pages/update-password";

// Importing react-toastify
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [activePage, setActivePage] = useState("welcome");
  const [tradeHistory, setTradeHistory] = useState([]); // State for trade history

  const addTrade = (newTrade) => {
    setTradeHistory((prevHistory) => [...prevHistory, newTrade]);
  };

  const renderContent = () => {
    switch (activePage) {
      case "welcome":
        return <div>Welcome to the Dashboard!</div>; // Welcome content
      case "trade-history":
        return <TradeHistory tradeHistory={tradeHistory} />; // Pass trade history
      case "convert":
        return <Convert />;
      case "trade-statics":
        return <TradeStatics />;
      case "my-offer":
        return <MyOffer />;
      case "invite-a-friend":
        return <InviteFriend />;
      case "favourite-offers":
        return <MyFavouriteOffer />;
      case "trade-partner":
        return <MyTradePartner addTrade={addTrade} />; // Pass addTrade function
      case "forgot-password":
        return <ForgotPassword />;
      default:
        return <div>{children}</div>;
    }
  };

  const showToast = (message, type = "success") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-1">
            <Sidebar onSelect={setActivePage} className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
              <Navbar title={activePage.charAt(0).toUpperCase() + activePage.slice(1)} />
              <main className="p-6 flex-1 overflow-auto">
                {renderContent()}
              </main>
            </div>
          </div>
          <Footer className="mt-auto" />
        </div>

        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </body>
    </html>
  );
}
