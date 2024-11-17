// components/Footer.js
import { useState } from 'react';
import { FaApple } from 'react-icons/fa'; // Using react-icons for app store icons
import { BiWorld, BiChevronDown, BiQuestionMark } from 'react-icons/bi';
import { BsMoon, BsShieldPlus } from 'react-icons/bs';
import { FiInstagram, FiFacebook, FiYoutube, FiTwitter } from 'react-icons/fi';
import classes from '../app/styles/globals.css';
import Image from 'next/image'; 


const Footer = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <footer className="bg-white pt-10">
            <div className="flex justify-between items-center pl-20">
                <h1 className="text-2xl">PA <i></i>FUL</h1>
                <button className="flex items-center bg-white border border-gray-400 rounded p-2">
                    <BiQuestionMark className="mr-2" /> FAQ & Help Center
                </button>
                <div className="relative pr-20">
                    <button onClick={toggleDropdown} className="flex items-center bg-white border border-gray-400 rounded p-2">
                        <BiWorld className="mr-2" /> Language <BiChevronDown />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md z-10">
                            <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">English</a>
                            <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Urdu</a>
                            <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Arabic</a>
                        </div>
                    )}
                </div>
            </div>
            <table className="w-11/12 mx-auto mt-10 text-sm">
    <thead className="font-bold">
        <tr>
            <td>For You</td>
            <td>For Your Business</td>
            <td>Growth</td>
            <td>Buy Anywhere</td>
            <td>Useful Links</td>
            <td>About Paxful</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Bitcoin</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Business Solutions</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Investment Tips</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Bitcoin</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">FAQ</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">About Us</a></td>
        </tr>
        <tr>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Tether</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Merchant Services</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Market Analysis</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Ethereum</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Help Center</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Our Team</a></td>
        </tr>
        <tr>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Ethereum</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Bulk Transactions</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Growth Strategies</a></td>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Litecoin</a></td>
            <td></td>
            <td><a href="#" className="text-gray-700 hover:underline">Careers</a></td>
        </tr>
        <tr>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Litecoin</a></td>
            <td></td>
            <td><a href="#" className="text-gray-700 hover:underline">Portfolio Management</a></td>
            <td></td>
            <td></td>
            <td><a href="#" className="text-gray-700 hover:underline">News</a></td>
        </tr>
        <tr>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Bitcoin Cash</a></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td> 
            <td><a href="#" className="text-gray-700 hover:underline">Contact Us</a></td>
        </tr>
        <tr>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Dogecoin</a></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Ripple</a></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="#" className="text-gray-700 hover:underline">Buy Cardano</a></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>




            <div className="mt-10 border-t border-gray-300 py-4 px-8">
                <p className="text-gray-500 text-xs">
                    Legal Terms & Conditions | Vendor Reminder | AML Policy | Privacy Notice | Cookie Policy | Restricted Countries
                </p>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
    <button className="flex items-center bg-black text-white border border-black rounded px-4 py-2 hover:bg-white hover:text-black hover:border-black transition duration-300">
        <FaApple className="mr-1 h-8 w-8" /> Download on the App Store
    </button>
    <button className="flex items-center bg-black text-white border border-black rounded px-4 py-2 hover:bg-white hover:text-black hover:border-black transition duration-300">
        <Image 
            src="/asset/png-clipart-goggle-playstore-icon-google-play-computer-icons-android-play-button-angle-rectangle-thumbnail-removebg-preview.png" 
            alt="Get it on Google Play" 
            width={32} 
            height={32}
            className="h-8 mr-1" 
        />
        Get it on Google Play
    </button>
</div>


            <div className="flex justify-center space-x-4 mt-4">
                <button className="bg-white border rounded p-2 hover:bg-blue-800">
                    <FiInstagram className="text-gray-700" />
                </button>
                <button className="bg-white border rounded p-2 hover:bg-blue-800">
                    <FiFacebook className="text-gray-700" />
                </button>
                <button className="bg-white border rounded p-2 hover:bg-blue-800">
                    <FiYoutube className="text-gray-700" />
                </button>
                <button className="bg-white border rounded p-2 hover:bg-blue-800">
                    <FiTwitter className="text-gray-700" />
                </button>
            </div>
            <p className="text-gray-500 text-xs text-center mt-4 py-6">
                “PAXFUL” is a registered trademark of Paxful, Inc. Copyright © 2024 Paxful, Inc. All Rights Reserved. Paxful Inc. has no relation to MoneyGram, Western Union, Payoneer, WorldRemit, Paxum, PayPal, Amazon, OkPay, Payza, Walmart, Reloadit, Perfect Money, WebMoney, Google Wallet, BlueBird, Serve, Square Cash, NetSpend, Chase QuickPay, Skrill, Vanilla, MyVanilla, OneVanilla, Neteller, Venmo, Apple, ChimpChange or any other payment method. We make no claims about being supported by or supporting these services. Their respective wordmarks and trademarks belong to them alone. Official mailing address: 4023 Kennett Pike #50541, Wilmington, DE 19807
            </p>
        </footer>
    );
};

export default Footer;
