import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { User, Mail } from "lucide-react";
import { authService } from "../services/auth.service";
import qr from "../assets/google_review_QR.png";

export default function Bijoya() {
  const [guests, setGuests] = useState([]);
  const [savedGuests, setSavedGuests] = useState({});
  const [formData, setFormData] = useState({
    guestName: "",
    mobile: "",
    wpNumber: "",
    address: "",
    email: "",
    pin: "",
    genderId: "",
    foodPreferenceId: "",
    is_present: true,
    comment: ""
  });
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
      /^\d{10,}$/.test(formData.wpNumber) &&
      formData.genderId !== "" &&
      formData.foodPreferenceId !== "" &&
      /^\d{4}$/.test(formData.pin) && // ensure 4-digit PIN
      formData.pin === formData.confirmPin // confirm match
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    try {
      await authService.saveGuest(formData).then((successData) => {
        if(successData.status){
          setIsSaved(true);
          setSavedGuests(successData.data);
        }
      });

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
        pin: "",
        confirmPin: "",
        genderId: "",
        foodPreferenceId: "",
        is_present: true,
        comment: ""
      });
    } catch (error) {
      // extract API error or fallback to generic message
      const errorMessage =
        error?.response?.data?.message ||
        error?.message || // if plain JS error
        "Failed to save guest. Please try again.";
      // ❌ Error popup
      Swal.fire({
        title: "Error!",
        text: "Failed to save guest. Please try again." + errorMessage,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const getAllGuest = () => {
    authService.getAllGuest().then((guestData) => {
      console.log("guestData :: ", guestData);
      if (guestData.status) {
        setGuests(guestData.data);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-teal-700 p-4">
      {!isSaved?  (


        <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-purple-700">
            Guest Registration
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
            {/* Guest Name */}
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <User className="w-5 h-5 text-blue-500" />
                Guest Name
              </label>
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
              <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <Mail className="w-5 h-5 text-blue-500" />
                Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                WhatsApp Number &nbsp;
                <input
                  type="checkbox"
                  id="sameAsMobile"
                  checked={sameAsMobile}
                  onChange={(e) => {
                    setSameAsMobile(e.target.checked);
                    setFormData({
                      ...formData,
                      wpNumber: e.target.checked ? formData.mobile : "", // copy or clear
                    });
                  }}
                  className="w-4 h-4 border-gray-300 rounded focus:ring-purple-400"
                />
                <label htmlFor="sameAsMobile" className="text-sm text-gray-700">
                  Same as Mobile
                </label>
              </label>
              <input
                type="tel"
                name="wpNumber"
                value={formData.wpNumber}
                onChange={handleChange}
                placeholder="WhatsApp number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
              <div className="flex items-center gap-2 mt-2">


              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* Pin */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">PIN</label>
              <input
                type="password"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                placeholder="Enter 4 Digit PIN"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            {/* confirmPin */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Confirm PIN</label>
              <input
                type="password"
                name="confirmPin"
                value={formData.confirmPin}
                onChange={handleChange}
                placeholder="Enter 4 Digit PIN"
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
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
                rows={3}
              />
            </div>

            {/* comment */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Your Comment (Optional)</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Your address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
                rows={3}
              />
            </div>



            {/* is_present */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_present"
                checked={formData.is_present}
                onChange={handleChange}
                className="w-5 h-5 border-gray-300 rounded focus:ring-purple-400"
              />
              <label className="text-sm text-gray-800">I'll be present that day</label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!isValid()}
              className={`w-full py-3 px-4 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition
              ${isValid()
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 active:scale-[0.98]"
                  : "bg-gray-400 text-white cursor-not-allowed opacity-70"
                }`}
            >
              Save Guest
            </button>
          </form>
        </div>
      ):(
        <div style={{textAlign: "center"}} >
          <img src={qr} width={200}/>
          <a href="https://www.google.com/search?sca_esv=8b6aaa0e07ec78a3&rlz=1C1CHBF_enIN996IN996&sxsrf=AE3TifP-qIbfhVoZsHixKv_VuWtMtcKdsQ:1758739494270&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-Ey7zsWzoaphhJlShRSwn8RvyM5WSKZyqmWXSgrKFE0sOAoB3NxIsuEZ_4gEoTF7cZR8azWz3GgiUBdUxn3RMP5b_7pET&q=Coder+%26+AccoTax+Reviews&sa=X&ved=2ahUKEwjRzruWh_KPAxXbyzgGHbVpAA0Q0bkNegQILBAE&biw=1366&bih=651&dpr=1&zx=1758739511915&no_sw_cr=1" target="blank">✍🏻 Click here to give the review</a>
          <h1 style={{ fontSize: "30px"}}>Your token is <span style={{ textShadow: "0 0 3px #ffea00ff, 0 0 5px #ffdd00ff"}}> {savedGuests.token}</span></h1>
        </div>
      )}
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
        <h2 className="text-xl font-bold mb-4">Guest List</h2>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-black text-left">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Mobile</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Food Preference</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody className="text-black text-left">              
              {guests.map((guest, index) => (
                <tr key={guest.guestId} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border font-medium">
                    {guest.guestName}
                  </td>
                  <td className="px-4 py-2 border">{guest.mobileMasked}</td>
                  <td className="px-4 py-2 border">
                    {guest.genderId === 1 && (
                      <span className="flex items-center gap-1">
                        <User className="w-6 h-6 text-blue-500" /> Male
                      </span>
                    )}
                    {guest.genderId === 2 && (
                      <span className="flex items-center gap-1">
                        <User className="w-6 h-6 text-pink-500" /> Female
                      </span>
                    )}
                    {guest.genderId === 3 && (
                      <span className="flex items-center gap-1">
                        <User className="w-6 h-6 text-purple-500" /> Other
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {guest.foodPreferenceName}
                  </td>

                  <td className="px-4 py-2 border">Edit</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
