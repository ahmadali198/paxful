import Image from 'next/image';

export default function TradeStatics() {
  const cryptoData = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '/asset/bitcoin-btc-logo-removebg-preview.png',
      tradedAmount: '0 BTC',
      month: 'September'
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      logo: '/asset/thrther_logo-removebg-preview (1).png',
      tradedAmount: '0 USDT',
      month: 'September'
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '/asset/ethereum-logo-removebg-preview.png',
      tradedAmount: '0 ETH',
      month: 'September'
    },
    {
      name: 'USDC',
      symbol: 'USDC',
      logo: '/asset/USDC-logo.png',
      tradedAmount: '0 USDC',
      month: 'September'
    }
  ];

  return (
    <>

    
      <div className="flex flex-col items-center p-8">
         {/* Balance Overview Section */}
         <div className="bg-white rounded-lg shadow-xl p-8 w-full sm:w-3/4 lg:w-2/3 mt-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Balance Overview</h2>
          {cryptoData.map((crypto, index) => (
            <div key={index} className={`flex items-center justify-between p-5 ${index < cryptoData.length - 1 ? 'border-b border-gray-300' : ''}`}>
              <div className="flex items-center">
                <Image
                  src={crypto.logo}
                  alt={`${crypto.name} logo`}
                  width={64} 
                  height={64} 
                  className="mr-5"
                />
                <div>
                  <h3 className="text-xl font-semibold">{crypto.name}</h3>
                  <span className="text-gray-600 text-lg">{crypto.symbol}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{crypto.tradedAmount}</p>
                <p className="text-gray-500 text-sm">{`${crypto.tradedAmount} were sold and bought in the previous month (${crypto.month})`}</p>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-6  mt-6">Trades</h2>

        {/* Container for Summary Boxes */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 w-full sm:w-3/4 lg:w-2/3">
          <div className="bg-blue-300 rounded-lg shadow-md p-6 flex-1 min-w-[200px]">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Monthly Successful Trades</h3>
            <p className="text-2xl font-bold text-blue-900">0</p>
          </div>
          <div className="bg-green-300 rounded-lg shadow-md p-6 flex-1 min-w-[200px]">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Monthly Total</h3>
            <p className="text-2xl font-bold text-green-900">0</p>
          </div>
          <div className="bg-yellow-200 rounded-lg shadow-md p-6 flex-1 min-w-[200px]">
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">Monthly Closing Ratio</h3>
            <p className="text-2xl font-bold text-yellow-900">0%</p>
          </div>
        </div>

      </div>
    </>
  );
}
