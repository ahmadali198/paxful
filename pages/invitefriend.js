import Image from 'next/image';

const InviteFriend = () => {
  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg w-[94%] p-10">
        <h1 className="text-center text-3xl font-semibold mb-8">
          Invite friends to join <span className="text-purple-600">Alpha</span>.
        </h1>

        <div className="flex flex-col md:flex-row space-x-4 space-y-4 md:space-y-0">
          {/* Referral Link Section */}
          <div className="flex-1 border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Referral Link</h2>
            <hr className="mb-2" />
            <p>Your referral link</p>
            <div className="relative mt-2">
              <input
                type="text"
                className="form-control w-full border border-gray-300 rounded-md p-2"
                placeholder="https://paxful.com/register"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white font-bold px-4 py-1 rounded-md">
                Copy
              </button>
            </div>
            <p className="mt-2">
              Anyone who uses this link will become your referral on Paxful.
            </p>
            <p className="font-bold">Share your link on social media:</p>
            <div className="flex space-x-4 mt-2">
              <i className="bx bxl-facebook-circle text-3xl hover:text-purple-600"></i>
              <i className="bx bxl-linkedin-square text-3xl hover:text-purple-600"></i>
              <i className="bx bxl-twitter text-3xl hover:text-purple-600"></i>
              <i className="bx bxl-instagram-alt text-3xl hover:text-purple-600"></i>
            </div>
          </div>

          {/* Referral QR Code Section */}
          <div className="flex-1 border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Referral QR Code</h2>
            <hr className="mb-2" />
            <div className="flex items-center">
              <Image
                src="/code.jpg" // Ensure the image is in the public directory
                alt="Referral QR Code"
                width={130}
                height={130}
                className="border border-black rounded-lg p-2"
              />
              <p className="ml-4 mt-6">
                Anyone who scans this QR code will become your referral on Paxful.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriend;
