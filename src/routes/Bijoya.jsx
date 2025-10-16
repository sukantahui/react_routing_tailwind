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
    confirmPin: "",
    genderId: "",
    foodPreferenceId: "2",
    is_present: true,
    comment: ""
  });
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editGuestId, setEditGuestId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuests = guests.filter((guest) =>
    guest.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.mobile?.includes(searchQuery)
  );

  useEffect(() => {
    getAllGuest();
  }, []);

  useEffect(() => {
    if (sameAsMobile) {
      setFormData((prev) => ({ ...prev, wpNumber: prev.mobile }));
    }
  }, [sameAsMobile, formData.mobile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "mobile" && sameAsMobile) {
      setFormData({
        ...formData,
        mobile: value,
        wpNumber: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const isValid = () => {
    return (
      formData.guestName.trim() !== "" &&
      /^\d{10,}$/.test(formData.mobile) &&
      /^\d{10,}$/.test(formData.wpNumber) &&
      formData.genderId !== "" &&
      formData.foodPreferenceId !== "" &&
      /^\d{4}$/.test(formData.pin) &&
      formData.pin === formData.confirmPin
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    try {
      const successData = await authService.saveGuest(formData);
      if (successData.status) {
        setIsSaved(true);
        setSavedGuests(successData.data);
        Swal.fire({
          title: "Success!",
          text: "Registration completed 🎉",
          icon: "success",
          confirmButtonText: "OK",
        });
        getAllGuest();
        setFormData({
          guestName: "",
          mobile: "",
          wpNumber: "",
          address: "Barrackpore",
          email: "",
          pin: "",
          confirmPin: "",
          genderId: "",
          foodPreferenceId: "2",
          is_present: true,
          comment: ""
        });
        setSameAsMobile(false);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save guest. Please try again.";
      Swal.fire({
        title: "Error!",
        text: "Failed to save guest. Please try again. " + errorMessage,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const getAllGuest = async () => {
    const guestData = await authService.getAllGuest();
    if (guestData.status) {
      setGuests(guestData.data);
    }
  };

  const handleEdit = (guestData) => {
    setIsEdit(true);
    setFormData(guestData);
    setEditGuestId(guestData.guestId);
    setSameAsMobile(false);
  };

  const updateDetails = async () => {
    const successData = await authService.updateGuest(editGuestId, formData);
    if (successData.status) {
      Swal.fire({
        title: "Updated!",
        text: "Guest details updated successfully ✅",
        icon: "success",
        confirmButtonText: "OK",
      });
      getAllGuest();
      setIsEdit(false);
      setFormData({
        guestName: "",
        mobile: "",
        wpNumber: "",
        address: "Barrackpore",
        email: "",
        pin: "",
        confirmPin: "",
        genderId: "",
        foodPreferenceId: "",
        is_present: true,
        comment: ""
      });
      setSameAsMobile(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-teal-700 p-4">
      {!isSaved ? (
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-purple-700">
            {isEdit ? "Edit Guest" : "Guest Registration"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
            {/* Guest Name */}
            <div>
              <label htmlFor="guest-name" className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <User className="w-5 h-5 text-blue-500" />
                Guest Name
              </label>
              <input
                type="text"
                name="guestName"
                id="guest-name"
                value={formData.guestName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <Mail className="w-5 h-5 text-blue-500" />
                Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
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
                WhatsApp Number
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="sameAsMobile"
                  checked={sameAsMobile}
                  onChange={(e) => {
                    setSameAsMobile(e.target.checked);
                    setFormData({
                      ...formData,
                      wpNumber: e.target.checked ? formData.mobile : "",
                    });
                  }}
                  className="w-4 h-4 border-gray-300 rounded focus:ring-purple-400"
                />
                <label
                  htmlFor="sameAsMobile"
                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                >
                  Same as Mobile
                </label>
              </div>
              <input
                type="tel"
                name="wpNumber"
                value={formData.wpNumber}
                onChange={handleChange}
                placeholder="WhatsApp number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* PIN */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                PIN (Enter any 4 digit number it will help you to edit later)
              </label>
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

            {/* Confirm PIN */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Confirm PIN
              </label>
              <input
                type="password"
                name="confirmPin"
                value={formData.confirmPin}
                onChange={handleChange}
                placeholder="Confirm 4 Digit PIN"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">*Gender</label>
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
              <label className="block text-sm text-gray-700 mb-1">*Food Preference</label>
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black focus:ring-2 focus:ring-purple-400 outline-none"
                rows={3}
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Your Comment (Optional)</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Your comment"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-black focus:ring-2 focus:ring-purple-400 outline-none"
                rows={3}
              />
            </div>

            {/* Present Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_present"
                checked={formData.is_present}
                onChange={handleChange}
                className="w-5 h-5 border-gray-300 rounded focus:ring-purple-400"
              />
              <label className="text-sm text-gray-800">
                I'll be present that day
              </label>
            </div>

            {/* Submit / Update */}
            {!isEdit ? (
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
            ) : (
              <button
                type="button"
                onClick={updateDetails}
                disabled={!isValid()}
                className={`w-full py-3 px-4 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition
                ${isValid()
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 active:scale-[0.98]"
                    : "bg-gray-400 text-white cursor-not-allowed opacity-70"
                  }`}
              >
                Update Guest
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className="text-center text-white">
          <img src={qr} width={200} alt="QR" className="mx-auto mb-4" />
          <a
            href="https://www.google.com/search?q=Coder+%26+AccoTax+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 underline"
          >
            ✍🏻 Click here to give a review
          </a>
          <h1 className="text-2xl mt-4">
            Your token is{" "}
            <span className="text-yellow-400 font-bold drop-shadow-md">
              {savedGuests.token}
            </span>
          </h1>

          <button
            onClick={() => {
              setIsSaved(false);
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
              setSameAsMobile(false);
            }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:from-green-700 hover:to-teal-700 transition active:scale-95"
          >
            ➕ Add New Guest
          </button>
        </div>
      )}

      {/* Guest List */}
      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4 text-white">Guest List</h2>
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search by name or mobile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full border border-gray-200">
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
            <tbody className="text-black">
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest, index) => (
                  <tr key={guest.guestId} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border font-medium">{guest.guestName}</td>
                    <td className="px-4 py-2 border">{guest.mobileMasked}</td>
                    <td className="px-4 py-2 border">{guest.genderName}</td>
                    <td className="px-4 py-2 border">{guest.foodPreferenceName}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleEdit(guest)}
                        className="text-xl hover:scale-110 transition"
                        title="Edit"
                      >
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-4 border text-center text-gray-500">
                    {searchQuery ? "No guests found matching your search" : "No guests registered yet"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}