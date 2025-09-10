import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { authService } from "../services/auth.service";

export default function Bijoya() {
  const[guests, setGuests] = useState([]);
  const [formData, setFormData] = useState({
    guestName: "",
    mobile: "",
    wpNumber: "",
    address: "",
    email: "",
    genderId: "",
    foodPreferenceId: "",
    inforce: true,
  });

  useEffect(() => {
    getAllGuest();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Validation rules
  const isValid = () => {
    return (
      formData.guestName.trim() !== "" &&
      /^\d{10,}$/.test(formData.mobile) &&
      formData.email.includes("@") &&
      formData.genderId !== "" &&
      formData.foodPreferenceId !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    try {
      await authService.saveGuest(formData);

      // ✅ Success popup
      Swal.fire({
        title: "Success!",
        text: "Guest saved successfully 🎉",
        icon: "success",
        confirmButtonText: "OK",
      });

      // reset form
      setFormData({
        guestName: "",
        mobile: "",
        wpNumber: "",
        address: "",
        email: "",
        genderId: "",
        foodPreferenceId: "",
        inforce: true,
      });
    } catch (error) {
      // ❌ Error popup
      Swal.fire({
        title: "Error!",
        text: "Failed to save guest. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };
  
  const getAllGuest = ()=>{
    authService.getAllGuest().then((guestData)=>{
      console.log("guestData :: ", guestData);
      if(guestData.status){
         setGuests(guestData.data);
      }
     
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-purple-700">
          Guest Registration
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          {/* Guest Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Guest Name</label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">WhatsApp Number</label>
            <input
              type="tel"
              name="wpNumber"
              value={formData.wpNumber}
              onChange={handleChange}
              placeholder="WhatsApp number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Gender</label>
            <select
              name="genderId"
              value={formData.genderId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black focus:ring-2 focus:ring-purple-400 outline-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Other</option>
            </select>
          </div>

          {/* Food Preference */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Food Preference
            </label>
            <select
              name="foodPreferenceId"
              value={formData.foodPreferenceId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black focus:ring-2 focus:ring-purple-400 outline-none"
              required
            >
              <option value="">Select Preference</option>
              <option value="1">Vegetarian</option>
              <option value="2">Non-Vegetarian</option>
              <option value="3">Vegan</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123, Lake Town, Kolkata"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
              rows={3}
            />
          </div>

          {/* Inforce */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="inforce"
              checked={formData.inforce}
              onChange={handleChange}
              className="w-5 h-5 border-gray-300 rounded focus:ring-purple-400"
            />
            <label className="text-sm text-gray-800">Inforce</label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!isValid()}
            className={`w-full py-3 px-4 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition
              ${
                isValid()
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 active:scale-[0.98]"
                  : "bg-gray-400 text-white cursor-not-allowed opacity-70"
              }`}
          >
            Save Guest
          </button>
        </form>
      </div>

      {/* Debug Panel - Only in Dev Mode */}
      {import.meta.env.MODE === "development" && (
        <div className="w-full max-w-lg mt-6 p-4 bg-black text-green-400 rounded-lg shadow-lg text-sm overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">Debug Data (Dev Mode)</h3>
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
      <div>
        {/* <pre>{JSON.stringify(guests, null, 2)}</pre> */}
        <h2 className="text-xl font-bold mb-4">Guest List</h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Mobile</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">Food Preference</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {guests.map((guest, index) => (
              <tr key={guest.guestId} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border font-medium">{guest.guestName}</td>
                <td className="px-4 py-2 border">{guest.email}</td>
                <td className="px-4 py-2 border">{guest.mobile}</td>
                <td className="px-4 py-2 border">{guest.genderName}</td>
                <td className="px-4 py-2 border">{guest.foodPreferenceName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
