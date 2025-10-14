import React, { useState } from "react";
import { authService } from "../services/auth.service";

export default function Admin() {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch guest data
    const fetchGuests = async () => {
        setLoading(true);
        setError(null);

        try {
            const fetchedData = await authService.getAllGuest();
            setGuests(fetchedData.data);
        } catch (err) {
            setError(err.message || "Failed to fetch guests.");
        } finally {
            setLoading(false);
        }
    };

    // CSV download function
    const exportToCSV = () => {
        if (!guests.length) {
            alert("No data to export!");
            return;
        }

        const headers = [
            "#",
            "ID",
            "Name",
            "Mobile",
            "Whatsapp",
            "Gender",
            "Food",
        ];

        const rows = guests.map((guest, index) => [
            index + 1,
            guest.guestId,
            guest.guestName,
            guest.mobile,
            guest.wpNumber,
            guest.genderName,
            guest.foodPreferenceName,
        ]);

        const csvContent =
            [headers, ...rows]
                .map((row) => row.map((item) => `"${item}"`).join(","))
                .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "guests_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // WhatsApp message sender
    const sendWhatsApp = (guest) => {
        const phone =
            guest.wpNumber.startsWith("+") ? guest.wpNumber : "+91" + guest.wpNumber;

        const message = `Hello ${guest.guestName} [${guest.token}]! 
                        We’re super excited to welcome you to our upcoming celebration, "মৈত্রী মহোৎসব" on 19th October 2025, from 7:32 PM onwards!
                        Your food preference: ${guest.foodPreferenceName}
                        Looking forward to seeing you and making this celebration memorable!
                        Please share your review with us here: [https://g.page/r/CTBkwqHJ6mZ2EBM/review]

                                                — Coder & AccoTax Team`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="p-6 text-center bg-gray-50 min-h-screen text-black">
            <h2 className="text-2xl font-semibold mb-4">Admin Area</h2>

            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={fetchGuests}
                    className="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                    Fetch Guests
                </button>

                <button
                    onClick={exportToCSV}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                    Download CSV
                </button>
            </div>

            {loading && <p className="mt-4 text-gray-600">Loading...</p>}
            {error && <p className="mt-4 text-red-500">Error: {error}</p>}

            {guests.length > 0 && (
                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md text-left">
                        <thead className="bg-gray-200 text-black">
                            <tr>
                                <th className="px-4 py-2 border border-gray-300">#</th>
                                <th className="px-4 py-2 border border-gray-300">Name</th>
                                <th className="px-4 py-2 border border-gray-300">Whatsapp</th>
                                <th className="px-4 py-2 border border-gray-300">Gender</th>
                                <th className="px-4 py-2 border border-gray-300">Food</th>
                                <th className="px-4 py-2 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map((guest, index) => (
                                <tr
                                    key={guest.id || index}
                                    className="hover:bg-gray-100 transition-colors"
                                >
                                    <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                                    <td className="px-4 py-2 border border-gray-300">{guest.guestName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{guest.wpNumber}</td>
                                    <td className="px-4 py-2 border border-gray-300">{guest.genderName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{guest.foodPreferenceName}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button
                                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-2 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
                                            onClick={() => sendWhatsApp(guest)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20.52 3.48A11.948 11.948 0 0012 0C5.372 0 0 5.373 0 12c0 2.117.554 4.094 1.518 5.842L0 24l6.43-1.514A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12 0-3.21-1.26-6.21-3.48-8.52zm-8.52 19.02c-2.078 0-4.022-.555-5.69-1.514l-.406-.242-3.814.898.883-3.71-.262-.41A9.948 9.948 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm5.533-7.427c-.292-.146-1.728-.853-1.996-.951-.268-.099-.464-.146-.66.147-.197.292-.758.951-.93 1.145-.172.197-.345.22-.637.073-.292-.146-1.232-.454-2.347-1.447-.868-.772-1.452-1.724-1.624-2.016-.172-.293-.018-.452.128-.598.131-.13.293-.345.439-.518.146-.172.195-.293.293-.488.098-.197.049-.366-.024-.512-.073-.146-.66-1.59-.905-2.177-.238-.572-.48-.494-.66-.504-.172-.01-.366-.012-.56-.012s-.512.073-.78.366c-.268.293-1.024 1-1.024 2.44s1.048 2.828 1.195 3.027c.146.197 2.064 3.153 5 4.417.698.302 1.24.482 1.662.618.698.225 1.334.194 1.835.118.56-.085 1.728-.707 1.972-1.392.244-.683.244-1.27.171-1.392-.073-.122-.268-.197-.56-.342z" />
                                            </svg>
                                            WhatsApp
                                        </button>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
