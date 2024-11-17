// import React, { useState } from "react";
// import "boxicons/css/boxicons.min.css";
// import Link from "next/link";


// export default function Sidebar({ onSelect }) {
//   // State to keep track of the selected item for display in the header
//   const [selectedItem, setSelectedItem] = useState("Sidebar");
//   const [showModal, setShowModal] = useState(false);
//   const handleClose = () => setShowModal(false);

//   const handleSelect = (item, key) => {
//     setSelectedItem(item);
//     onSelect(key);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 mt-20">
//       <div className="bg-white shadow-md rounded-md p-4 max-w-sm mx-auto">
//         <h1 className="text-center text-3xl font-bold mb-2">{selectedItem}</h1>
//       </div>

//       <div className="bg-white shadow-md rounded-md mt-6 p-4 max-w-sm mx-auto">
//         <ul className="space-y-3">
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-blue-600"
//               onClick={() => handleSelect("Trade History", "trade-history")}
//             >
//               <i className="bx bx-trending-up text-xl pr-2"></i>
//               Trade History
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-blue-600"
//               onClick={() => handleSelect("Convert", "convert")}
//             >
//               <i className="bx bx-recycle text-xl pr-2"></i>
//               Convert
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-blue-600"
//               onClick={() => handleSelect("Trade Statistics", "trade-statics")}
//             >
//               <i className="bx bx-download text-xl pr-2"></i>
//               Trade Statistics
//             </a>
//           </li>
//           <li>
//             <Link
//             href="/trade-partner"
//               className="flex items-center text-gray-600 hover:text-blue-600"
//               onClick={() => handleSelect("Trade Partner", "trade-partner")}
//             >
//               <i className="bx bx-recycle text-xl pr-2"></i>
//               Trade Partner
//             </Link>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-blue-600"
//               onClick={() => handleSelect("My Offer", "my-offer")}
//             >
//               <i className="bx bx-wallet-alt text-xl pr-2"></i>
//               My Offers
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-blue-600"
//               onClick={() =>
//                 handleSelect("Favourite Offers", "favourite-offers")
//               }
//             >
//               <i className="bx bxs-hand-right text-xl pr-2"></i>
//               Favourite Offers
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-blue-600"
//               onClick={() =>
//                 handleSelect("Trade Program Budgets", "trade-program-budgets")
//               }
//             >
//               <i className="bx bx-bolt-circle text-xl pr-2"></i>
//               Trade Program Budgets
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-blue-600"
//               onClick={() => handleSelect("Invite a Friend", "invite-a-friend")}
//             >
//               <i className="bx bx-check-double text-xl pr-2"></i>
//               Invite a Friend
//             </a>
//           </li>
//         </ul>
//         <hr className="my-4" />

//         <ol className="space-y-2">
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-purple-600 hover:underline"
//               onClick={() => handleSelect("Account Setting", "account-setting")}
//             >
//               <i className="bx bx-cog text-xl pr-2"></i>
//               Account Setting
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-purple-600 hover:underline"
//               onClick={() =>
//                 handleSelect("Paxful University", "paxful-university")
//               }
//             >
//               <i className="bx bx-building-house text-xl pr-2"></i>
//               Paxful University
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-purple-600 hover:underline"
//               onClick={() =>
//                 handleSelect("Paxful Community", "paxful-community")
//               }
//             >
//               <i className="bx bx-user-plus text-xl pr-2"></i>
//               Paxful Community
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center text-gray-600 hover:text-purple-600 hover:underline"
//               onClick={() => handleSelect("Developer", "developer")}
//             >
//               <i className="bx bx-expand-horizontal text-xl pr-2"></i>
//               Developer
//             </a>
//           </li>
//         </ol>
//         <div>
//           <button
//             className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-md w-72 font-semibold hover:from-blue-600 hover:to-indigo-700 shadow-lg transition duration-300"
//             onClick={() => setShowModal(true)}
//           >
//             Do You Have an Idea For Us?
//           </button>

//           {showModal && (
//             <div
//               className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
//               onClick={handleClose}
//             >
//               <div
//                 className="bg-white rounded-2xl shadow-2xl w-[90%] md:w-[60%] lg:w-[40%] p-8 transform transition-all duration-500 ease-in-out scale-105"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <h2 className="text-2xl font-extrabold text-indigo-700 mb-4">
//                   Have a Cool Idea?
//                 </h2>
//                 <p className="text-gray-600 mb-6 text-lg">
//                   Share your thoughts with us, and we’ll bring your ideas to
//                   life!
//                 </p>
//                 <textarea
//                   className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-inner resize-none mb-6"
//                   placeholder="Share your idea here..."
//                 ></textarea>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
//                     onClick={handleClose}
//                   >
//                     Cancel
//                   </button>
//                   <button className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md">
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import Link from "next/link";

export default function Sidebar({ onSelect }) {
  // State to keep track of the selected item for display in the header
  const [selectedItem, setSelectedItem] = useState("Sidebar");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const handleSelect = (item, key) => {
    setSelectedItem(item);
    onSelect(key);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 mt-20">
      <div className="bg-white shadow-md rounded-md p-4 max-w-sm mx-auto">
        <h1 className="text-center text-3xl font-bold mb-2">{selectedItem}</h1>
      </div>

      <div className="bg-white shadow-md rounded-md mt-6 p-4 max-w-sm mx-auto">
        <ul className="space-y-3">
          <li>
            <Link
              href="/trade-history"
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => handleSelect("Trade History", "trade-history")}
            >
              <i className="bx bx-trending-up text-xl pr-2"></i>
              Trade History
            </Link>
          </li>
          <li>
            <a
              // href="/convert"
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => handleSelect("Convert", "convert")}
            >
              <i className="bx bx-recycle text-xl pr-2"></i>
              Convert
            </a>
          </li>
          <li>
            <Link
              href="/trade-statics"
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => handleSelect("Trade Statistics", "trade-statics")}
            >
              <i className="bx bx-download text-xl pr-2"></i>
              Trade Statistics
            </Link>
          </li>
          <li>
            <Link
              href="/trade-partner"
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => handleSelect("Trade Partner", "trade-partner")}
            >
              <i className="bx bx-recycle text-xl pr-2"></i>
              Trade Partner
            </Link>
          </li>
          <li>
            <Link
              href="/my-offer"
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => handleSelect("My Offer", "my-offer")}
            >
              <i className="bx bx-wallet-alt text-xl pr-2"></i>
              My Offers
            </Link>
          </li>
          <li>
            <Link
              href="/favourite-offers"
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => handleSelect("Favourite Offers", "favourite-offers")}
            >
              <i className="bx bxs-hand-right text-xl pr-2"></i>
              Favourite Offers
            </Link>
          </li>
          <li>
            <Link
              href="/trade-program-budgets"
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => handleSelect("Trade Program Budgets", "trade-program-budgets")}
            >
              <i className="bx bx-bolt-circle text-xl pr-2"></i>
              Trade Program Budgets
            </Link>
          </li>
          <li>
            <Link
              href="/invite-a-friend"
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => handleSelect("Invite a Friend", "invite-a-friend")}
            >
              <i className="bx bx-check-double text-xl pr-2"></i>
              Invite a Friend
            </Link>
          </li>
        </ul>
        <hr className="my-4" />

        <ol className="space-y-2">
          <li>
            <Link
              href="/account-setting"
              className="flex items-center text-gray-600 hover:text-purple-600 hover:underline"
              onClick={() => handleSelect("Account Setting", "account-setting")}
            >
              <i className="bx bx-cog text-xl pr-2"></i>
              Account Setting
            </Link>
          </li>
          <li>
            <Link
              href="/paxful-university"
              className="flex items-center text-gray-600 hover:text-purple-600 hover:underline"
              onClick={() => handleSelect("Paxful University", "paxful-university")}
            >
              <i className="bx bx-building-house text-xl pr-2"></i>
              Paxful University
            </Link>
          </li>
          <li>
            <Link
              href="/paxful-community"
              className="flex items-center text-gray-600 hover:text-purple-600 hover:underline"
              onClick={() => handleSelect("Paxful Community", "paxful-community")}
            >
              <i className="bx bx-user-plus text-xl pr-2"></i>
              Paxful Community
            </Link>
          </li>
          <li>
            <Link
              href="/developer"
              className="flex items-center text-gray-600 hover:text-purple-600 hover:underline"
              onClick={() => handleSelect("Developer", "developer")}
            >
              <i className="bx bx-expand-horizontal text-xl pr-2"></i>
              Developer
            </Link>
          </li>
        </ol>
        
        <div>
          <button
            className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-md w-72 font-semibold hover:from-blue-600 hover:to-indigo-700 shadow-lg transition duration-300"
            onClick={() => setShowModal(true)}
          >
            Do You Have an Idea For Us?
          </button>

          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
              onClick={handleClose}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-[90%] md:w-[60%] lg:w-[40%] p-8 transform transition-all duration-500 ease-in-out scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-extrabold text-indigo-700 mb-4">
                  Have a Cool Idea?
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Share your thoughts with us, and we’ll bring your ideas to
                  life!
                </p>
                <textarea
                  className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-inner resize-none mb-6"
                  placeholder="Share your idea here..."
                ></textarea>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
