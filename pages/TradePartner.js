import { useState, useEffect } from "react";

const MyTradePartner = () => {
    const [partners, setPartners] = useState(() => {
        const storedPartners = localStorage.getItem("partners");
        return storedPartners ? JSON.parse(storedPartners) : [];
    });
    const [newPartner, setNewPartner] = useState({ name: "", amount: "", currency: "" });
    const [isAdding, setIsAdding] = useState(false);
    const [editingPartner, setEditingPartner] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        localStorage.setItem("partners", JSON.stringify(partners));
    }, [partners]);

    const handleAddPartner = () => {
        setErrors({});
        const partnerData = { ...newPartner };

        if (!partnerData.name || !partnerData.amount || !partnerData.currency) {
            setErrors({
                name: !partnerData.name ? "Name is required" : "",
                amount: !partnerData.amount ? "Trade Amount is required" : "",
                currency: !partnerData.currency ? "Currency is required" : ""
            });
            return;
        }

        const newEntry = { id: Date.now(), ...partnerData };
        setPartners((prev) => [...prev, newEntry]); // Update partners state
        setNewPartner({ name: "", amount: "", currency: "" });
        setIsAdding(false);
    };

    const handleEditClick = (partner) => {
        setEditingPartner({ ...partner });
    };

    const handleSaveChanges = () => {
        if (!editingPartner) return;

        setPartners((prev) =>
            prev.map((partner) =>
                partner.id === editingPartner.id ? editingPartner : partner
            )
        );
        setEditingPartner(null);
    };

    const handleDelete = (id) => {
        setPartners((prev) => prev.filter((partner) => partner.id !== id));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen mt-8">
            <h1 className="text-3xl font-bold text-center mb-8">My Trade Partners</h1>

            <div className="flex justify-between mb-6">
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    {isAdding ? "Cancel" : "Add Partner"}
                </button>
            </div>

            {isAdding && (
                <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
                    <input
                        type="text"
                        value={newPartner.name}
                        onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                        placeholder="Name"
                        className="border border-gray-300 p-2 rounded w-full mb-2"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                    <input
                        type="number"
                        value={newPartner.amount}
                        onChange={(e) => setNewPartner({ ...newPartner, amount: e.target.value })}
                        placeholder="Trade Amount"
                        className="border border-gray-300 p-2 rounded w-full mb-2"
                    />
                    {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                    <input
                        type="text"
                        value={newPartner.currency}
                        onChange={(e) => setNewPartner({ ...newPartner, currency: e.target.value })}
                        placeholder="Enter Currency"
                        className="border border-gray-300 p-2 rounded w-full mb-2"
                    />
                    {errors.currency && <p className="text-red-500">{errors.currency}</p>}
                    <button
                        onClick={handleAddPartner}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Add Partner
                    </button>
                </div>
            )}

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="text-left px-4 py-2 border-b">ID</th>
                        <th className="text-left px-4 py-2 border-b">Name</th>
                        <th className="text-left px-4 py-2 border-b">Trade Amount</th>
                        <th className="text-left px-4 py-2 border-b">Currency</th>
                        <th className="text-left px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {partners.map((partner, index) => (
                        <tr key={partner.id}>
                            <td className="px-4 py-2 border-b">{index + 1}</td>
                            <td className="px-4 py-2 border-b">{partner.name}</td>
                            <td className="px-4 py-2 border-b">{partner.amount}</td>
                            <td className="px-4 py-2 border-b">{partner.currency}</td>
                            <td className="px-4 py-2 border-b">
                                <button
                                    onClick={() => handleEditClick(partner)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(partner.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingPartner && (
                <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
                    <input
                        type="text"
                        value={editingPartner.name}
                        onChange={(e) =>
                            setEditingPartner({ ...editingPartner, name: e.target.value })
                        }
                        placeholder="Name"
                        className="border border-gray-300 p-2 rounded w-full mb-2"
                    />
                    <input
                        type="number"
                        value={editingPartner.amount}
                        onChange={(e) =>
                            setEditingPartner({ ...editingPartner, amount: e.target.value })
                        }
                        placeholder="Trade Amount"
                        className="border border-gray-300 p-2 rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        value={editingPartner.currency}
                        onChange={(e) =>
                            setEditingPartner({ ...editingPartner, currency: e.target.value })
                        }
                        placeholder="Currency"
                        className="border border-gray-300 p-2 rounded w-full mb-2"
                    />
                    <button
                        onClick={handleSaveChanges}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mr-2"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => setEditingPartner(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyTradePartner;

