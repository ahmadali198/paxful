import { useState, useEffect } from "react";

const TradeHistory = () => {
    const [pastTrades, setPastTrades] = useState([]);

    useEffect(() => {
        const storedTrades = localStorage.getItem("partners");
        if (storedTrades) {
            setPastTrades(JSON.parse(storedTrades));
        }
    }, []);

    // Function to convert trade history to CSV format
    const convertToCSV = (data) => {
        const headers = ['ID', 'Name', 'Trade Amount', 'Currency'];
        const rows = data.map((trade, index) => [
            index + 1, 
            trade.name, 
            trade.amount, 
            trade.currency
        ]);

        // Combine headers and rows
        const csvContent = [
            headers.join(','), // Add header row
            ...rows.map(row => row.join(',')) // Add each trade as a new row
        ].join('\n');

        return csvContent;
    };

    // Function to trigger CSV file download
    const downloadCSV = () => {
        const csvData = convertToCSV(pastTrades);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            // Create a temporary download link and click it programmatically
            const filename = 'trade_history.csv';
            link.setAttribute("href", URL.createObjectURL(blob));
            link.setAttribute("download", filename);
            link.click();
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen mt-8">
            <h1 className="text-3xl font-bold text-center mb-8">Trade History</h1>

            {/* Export Button */}
            <div className="text-center mb-4">
                <button 
                    onClick={downloadCSV}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                    Export Trade History
                </button>
            </div>

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="text-left px-4 py-2 border-b">ID</th>
                        <th className="text-left px-4 py-2 border-b">Name</th>
                        <th className="text-left px-4 py-2 border-b">Trade Amount</th>
                        <th className="text-left px-4 py-2 border-b">Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {pastTrades.map((trade, index) => (
                        <tr key={trade.id}>
                            <td className="px-4 py-2 border-b">{index + 1}</td>
                            <td className="px-4 py-2 border-b">{trade.name}</td>
                            <td className="px-4 py-2 border-b">{trade.amount}</td>
                            <td className="px-4 py-2 border-b">{trade.currency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TradeHistory;
