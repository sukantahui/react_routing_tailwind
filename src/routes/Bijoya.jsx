import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  MessageSquare,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  CalendarCheck,
  Utensils,
  Leaf,
  ShieldCheck,
  Search,
  LayoutGrid,
  List,
  Download,
  RefreshCw,
  Copy,
  Check,
  Edit3,
  PlusCircle,
  AlertCircle,
  Users,
  Award,
  ExternalLink,
  Share2,
} from "lucide-react";
import { authService } from "../api/auth.service";
import qr from "../assets/google_review_QR.png";

export default function Bijoya() {
  const [guests, setGuests] = useState([]);
  const [savedGuests, setSavedGuests] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    guestName: "",
    mobile: "",
    wpNumber: "",
    address: "",
    email: "",
    pin: "",
    confirmPin: "",
    genderId: "1",
    foodPreferenceId: "2",
    is_present: true,
    comment: "",
  });

  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editGuestId, setEditGuestId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'veg' | 'non-veg' | 'present'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  const formRef = useRef(null);

  // Check login status on mount & listen to storage
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Fetch all guests on mount
  useEffect(() => {
    getAllGuest();
  }, []);

  // Sync WhatsApp number when sameAsMobile is checked
  useEffect(() => {
    if (sameAsMobile) {
      setFormData((prev) => ({ ...prev, wpNumber: prev.mobile }));
    }
  }, [sameAsMobile, formData.mobile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "mobile" && sameAsMobile) {
      setFormData((prev) => ({
        ...prev,
        mobile: value,
        wpNumber: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Validation rules
  const isNameValid = formData.guestName.trim().length >= 2;
  const isMobileValid = /^\d{10,}$/.test(formData.mobile.replace(/\D/g, ""));
  const isWpValid = /^\d{10,}$/.test(formData.wpNumber.replace(/\D/g, ""));
  const isPinValid = /^\d{4}$/.test(formData.pin);
  const isPinMatched = formData.pin === formData.confirmPin && isPinValid;
  const isGenderValid = Boolean(formData.genderId);
  const isFoodValid = Boolean(formData.foodPreferenceId);

  const isValid = () => {
    return (
      isNameValid &&
      isMobileValid &&
      isWpValid &&
      isGenderValid &&
      isFoodValid &&
      isPinValid &&
      isPinMatched
    );
  };

  // Fetch all guests
  const getAllGuest = async () => {
    setIsLoading(true);
    try {
      const guestData = await authService.getAllGuest();
      if (guestData?.status && Array.isArray(guestData.data)) {
        setGuests(guestData.data);
      }
    } catch (error) {
      console.error("Failed to load guests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Form Submit (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      Swal.fire({
        title: "Incomplete Form",
        text: "Please verify all required fields highlighted in the form.",
        icon: "warning",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const successData = await authService.saveGuest(formData);
      if (successData.status) {
        setIsSaved(true);
        setSavedGuests(successData.data || {});
        Swal.fire({
          title: "Registration Confirmed! 🎉",
          text: "Welcome to Bijoya Sammilani. Your digital token has been generated.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
        getAllGuest();
        resetForm();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save registration. Please try again.";
      Swal.fire({
        title: "Registration Error",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger Edit Mode
  const handleEdit = (guestData) => {
    setIsEdit(true);
    setEditGuestId(guestData.guestId || guestData.id);
    setFormData({
      guestName: guestData.guestName || "",
      mobile: guestData.mobile || "",
      wpNumber: guestData.wpNumber || guestData.mobile || "",
      address: guestData.address || "",
      email: guestData.email || "",
      pin: guestData.pin || "",
      confirmPin: guestData.pin || "",
      genderId: String(guestData.genderId || "1"),
      foodPreferenceId: String(guestData.foodPreferenceId || "2"),
      is_present: guestData.is_present ?? true,
      comment: guestData.comment || "",
    });
    setSameAsMobile(false);
    setIsSaved(false);

    // Scroll to form smoothly
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Cancel Edit Mode
  const cancelEdit = () => {
    setIsEdit(false);
    setEditGuestId(null);
    resetForm();
  };

  // Update Guest API Call
  const updateDetails = async () => {
    if (!isValid()) {
      Swal.fire({
        title: "Incomplete Details",
        text: "Please ensure all mandatory fields and the 4-digit PIN are valid.",
        icon: "warning",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const successData = await authService.updateGuest(editGuestId, formData);
      if (successData.status) {
        Swal.fire({
          title: "Updated Successfully! ✅",
          text: "Guest details have been updated in the portal.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
        getAllGuest();
        cancelEdit();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update details. Please verify your 4-digit PIN.";
      Swal.fire({
        title: "Update Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      guestName: "",
      mobile: "",
      wpNumber: "",
      address: "",
      email: "",
      pin: "",
      confirmPin: "",
      genderId: "1",
      foodPreferenceId: "2",
      is_present: true,
      comment: "",
    });
    setSameAsMobile(false);
  };

  // WhatsApp Invite / Message Sender (Protected by Login)
  const sendWhatsApp = (guest) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Login Required 🔒",
        text: "Sending WhatsApp invitations is only available for logged-in organizers.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Log In Now",
        confirmButtonColor: "#8b5cf6",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    const phone = (guest.wpNumber || guest.mobile || "").replace(/\D/g, "");
    const formattedPhone = phone.startsWith("91") && phone.length > 10 ? phone : `91${phone}`;
    const tokenDisplay = guest.token ? `#${guest.token}` : `CNAT-${guest.guestId || "VIP"}`;

    const isVeg =
      guest.foodPreferenceId === "1" ||
      guest.foodPreferenceId === 1 ||
      (guest.foodPreferenceName?.toLowerCase().includes("veg") &&
        !guest.foodPreferenceName?.toLowerCase().includes("non"));
    const foodText = isVeg ? "🥬 Vegetarian (নিরামিষ)" : "🍗 Non-Vegetarian (আমিষ)";

    const message = `🌸 *শুভ বিজয়া সম্মিলনী ও মৈত্রী মহোৎসব* 🌸
━━━━━━━━━━━━━━━━━━
নমস্কার *${guest.guestName}*,

বিজয়ার প্রীতি, শুভেচ্ছা ও আন্তরিক ভালোবাসা জানাই। Coder & AccoTax পরিবারের পক্ষ থেকে আমাদের বিশেষ বিজয়া প্রীতি সম্মেলন ও আনন্দ সম্মিলনে আপনাকে সপরিবারে আন্তরিক সাদর আমন্ত্রণ! 🎉

🎟️ *Entry Token:* \`${tokenDisplay}\`
📍 *Venue:* Coder & AccoTax, Barrackpore
🍽️ *Food Preference:* ${foodText}
✨ *Status:* ${guest.is_present ? "✅ Confirmed (উপস্থিত থাকবেন)" : "Invited"}

━━━━━━━━━━━━━━━━━━
⭐ *আপনার মূল্যবান মতামত আমাদের জন্য অত্যন্ত মূল্যবান:*
অনুগ্রহ করে নিচের লিঙ্কে ক্লিক করে আমাদের একটি গুগল রিভিউ দিয়ে অনুপ্রাণিত করুন:
👉 https://g.page/r/CTBkwqHJ6mZ2EBM/review

আপনাকে আমাদের মাঝে পেয়ে আমরা আনন্দিত হব।

আন্তরিক শুভেচ্ছাসহ,
*Team Coder & AccoTax* 💐
━━━━━━━━━━━━━━━━━━`;

    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!guests.length) {
      Swal.fire("No Data", "No guests found to export.", "info");
      return;
    }

    const headers = [
      "SL",
      "Token",
      "Guest Name",
      "Mobile",
      "WhatsApp",
      "Gender",
      "Food Preference",
      "Attending",
      "Address",
      "Comment",
    ];

    const rows = filteredGuests.map((guest, idx) => [
      idx + 1,
      guest.token || "N/A",
      guest.guestName || "",
      guest.mobile || "",
      guest.wpNumber || "",
      guest.genderName || (guest.genderId === "1" ? "Male" : "Female"),
      guest.foodPreferenceName || (guest.foodPreferenceId === "1" ? "Vegetarian" : "Non-Vegetarian"),
      guest.is_present ? "Yes" : "No",
      guest.address || "",
      guest.comment || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((item) => `"${String(item).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Bijoya_Guests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered Guests computation
  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = guest.guestName?.toLowerCase().includes(q);
      const mobileMatch = guest.mobile?.includes(q) || guest.wpNumber?.includes(q);
      const tokenMatch = String(guest.token || "").toLowerCase().includes(q);
      const matchesSearch = !q || nameMatch || mobileMatch || tokenMatch;

      if (!matchesSearch) return false;

      if (activeFilter === "veg") {
        return (
          guest.foodPreferenceId === "1" ||
          guest.foodPreferenceId === 1 ||
          (guest.foodPreferenceName?.toLowerCase().includes("veg") &&
            !guest.foodPreferenceName?.toLowerCase().includes("non"))
        );
      }
      if (activeFilter === "non-veg") {
        return (
          guest.foodPreferenceId === "2" ||
          guest.foodPreferenceId === 2 ||
          guest.foodPreferenceName?.toLowerCase().includes("non")
        );
      }
      if (activeFilter === "present") {
        return guest.is_present === true || guest.is_present === 1 || guest.is_present === "true";
      }

      return true;
    });
  }, [guests, searchQuery, activeFilter]);

  // Dynamic Statistics
  const stats = useMemo(() => {
    const total = guests.length;
    const veg = guests.filter(
      (g) =>
        g.foodPreferenceId === "1" ||
        g.foodPreferenceId === 1 ||
        (g.foodPreferenceName?.toLowerCase().includes("veg") &&
          !g.foodPreferenceName?.toLowerCase().includes("non"))
    ).length;
    const nonVeg = guests.filter(
      (g) =>
        g.foodPreferenceId === "2" ||
        g.foodPreferenceId === 2 ||
        g.foodPreferenceName?.toLowerCase().includes("non")
    ).length;
    const present = guests.filter(
      (g) => g.is_present === true || g.is_present === 1 || g.is_present === "true"
    ).length;

    return { total, veg, nonVeg, present };
  }, [guests]);

  const handleCopyToken = () => {
    const tokenVal = savedGuests.token || "BIJOYA-TOKEN";
    navigator.clipboard.writeText(String(tokenVal));
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Radiant Background Aura */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* ============================================================== */}
        {/* HERO HEADER                                                   */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-amber-500/5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
            <span>মৈত্রী মহোৎসব ও বিজয়া সম্মিলনী</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">Barrackpore</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-purple-400">
              Bijoya Sammilani Guest Portal
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Welcome to the official guest registration and attendance hub. Register your presence,
            customize food preferences, and receive your celebratory digital pass.
          </p>

          {/* Quick Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{stats.total}</span>
              <span className="text-xs text-slate-400 font-medium">Total Registered</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-2">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-300">{stats.nonVeg}</span>
              <span className="text-xs text-slate-400 font-medium">🍗 Non-Vegetarian</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300">{stats.veg}</span>
              <span className="text-xs text-slate-400 font-medium">🥬 Vegetarian</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300">{stats.present}</span>
              <span className="text-xs text-slate-400 font-medium">Attending Guests</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* MAIN REGISTRATION SECTION / SUCCESS PASS CARD                 */}
        {/* ============================================================== */}
        <div ref={formRef} className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSaved ? (
              <motion.div
                key="form-container"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-2xl p-6 sm:p-8 overflow-hidden"
              >
                {/* Accent top gradient stripe */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600" />

                {/* Edit Mode Banner */}
                {isEdit && (
                  <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-300 text-sm font-medium">
                      <Edit3 className="w-4 h-4" />
                      <span>
                        Editing details for <strong className="text-white">{formData.guestName}</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  </div>
                )}

                {/* Form Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
                    {isEdit ? "Update Guest Information" : "Guest Registration"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    {isEdit
                      ? "Make changes below and submit using your 4-digit PIN."
                      : "Please fill in your details to receive your event pass."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Guest Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="guestName" className="flex items-center gap-2 text-sm font-medium text-slate-200">
                      <User className="w-4 h-4 text-purple-400" />
                      <span>Guest Full Name <span className="text-rose-400">*</span></span>
                    </label>
                    <input
                      type="text"
                      id="guestName"
                      name="guestName"
                      value={formData.guestName}
                      onChange={handleChange}
                      placeholder="e.g. Subhankar Roy"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm sm:text-base"
                    />
                  </div>

                  {/* Contact Group: Mobile & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="mobile" className="flex items-center justify-between text-sm font-medium text-slate-200">
                        <span className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-cyan-400" />
                          <span>Mobile Number <span className="text-rose-400">*</span></span>
                        </span>
                        {formData.mobile && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              isMobileValid
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-rose-500/20 text-rose-400"
                            }`}
                          >
                            {formData.mobile.replace(/\D/g, "").length}/10
                          </span>
                        )}
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-sm sm:text-base"
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="wpNumber" className="flex items-center gap-2 text-sm font-medium text-slate-200">
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          <span>WhatsApp No. <span className="text-rose-400">*</span></span>
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={sameAsMobile}
                            onChange={(e) => {
                              setSameAsMobile(e.target.checked);
                              if (e.target.checked) {
                                setFormData((prev) => ({
                                  ...prev,
                                  wpNumber: prev.mobile,
                                }));
                              }
                            }}
                            className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 w-3.5 h-3.5"
                          />
                          <span>Same as mobile</span>
                        </label>
                      </div>
                      <input
                        type="tel"
                        id="wpNumber"
                        name="wpNumber"
                        value={formData.wpNumber}
                        onChange={handleChange}
                        placeholder="10-digit WhatsApp number"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Email (Optional) */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-slate-200">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span>Email Address <span className="text-xs text-slate-400">(Optional)</span></span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base"
                    />
                  </div>

                  {/* Security PINs Group */}
                  <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Security PIN for Self-Service & Verification</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 4 Digit PIN */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                          <span>Enter 4-Digit PIN <span className="text-rose-400">*</span></span>
                          {formData.pin && (
                            <span className={isPinValid ? "text-emerald-400 text-xs" : "text-rose-400 text-xs"}>
                              {formData.pin.length}/4
                            </span>
                          )}
                        </label>
                        <div className="relative">
                          <input
                            type={showPin ? "text" : "password"}
                            name="pin"
                            maxLength={4}
                            value={formData.pin}
                            onChange={handleChange}
                            placeholder="e.g. 1234"
                            required
                            className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm tracking-widest"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPin(!showPin)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                          >
                            {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm PIN */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                          <span>Confirm 4-Digit PIN <span className="text-rose-400">*</span></span>
                          {formData.confirmPin && (
                            <span className={isPinMatched ? "text-emerald-400 text-xs flex items-center gap-1" : "text-rose-400 text-xs"}>
                              {isPinMatched ? "✓ Matched" : "Mismatch"}
                            </span>
                          )}
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPin ? "text" : "password"}
                            name="confirmPin"
                            maxLength={4}
                            value={formData.confirmPin}
                            onChange={handleChange}
                            placeholder="Re-enter 4-Digit PIN"
                            required
                            className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm tracking-widest"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPin(!showConfirmPin)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                          >
                            {showConfirmPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gender & Food Preference Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Gender Selector */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-200 block">
                        Gender <span className="text-rose-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "1", label: "Male" },
                          { id: "2", label: "Female" },
                        ].map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, genderId: g.id }))}
                            className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition flex items-center justify-center gap-2 cursor-pointer ${
                              formData.genderId === g.id
                                ? "bg-purple-600/20 border-purple-500 text-purple-200 shadow-md shadow-purple-500/10"
                                : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            {formData.genderId === g.id && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                            <span>{g.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Food Preference Cards */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-200 block">
                        Food Preference <span className="text-rose-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, foodPreferenceId: "2" }))}
                          className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition flex items-center justify-center gap-2 cursor-pointer ${
                            formData.foodPreferenceId === "2"
                              ? "bg-rose-500/20 border-rose-500 text-rose-200 shadow-md shadow-rose-500/10"
                              : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <span>🍗 Non-Veg</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, foodPreferenceId: "1" }))}
                          className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition flex items-center justify-center gap-2 cursor-pointer ${
                            formData.foodPreferenceId === "1"
                              ? "bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10"
                              : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <span>🥬 Veg</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="address" className="flex items-center gap-2 text-sm font-medium text-slate-200">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>Address / Location</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. Barrackpore, Kolkata"
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm resize-none"
                    />
                  </div>

                  {/* Comments / Wishes */}
                  <div className="space-y-1.5">
                    <label htmlFor="comment" className="flex items-center gap-2 text-sm font-medium text-slate-200">
                      <MessageSquare className="w-4 h-4 text-indigo-400" />
                      <span>Special Note / Wishes <span className="text-xs text-slate-400">(Optional)</span></span>
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      placeholder="Share any greetings, food allergies, or message for the organizers..."
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm resize-none"
                    />
                  </div>

                  {/* Attendance Switch */}
                  <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
                    <input
                      type="checkbox"
                      name="is_present"
                      checked={formData.is_present}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="text-sm">
                      <span className="font-semibold text-slate-100">I will attend the Bijoya Sammilani celebration</span>
                      <p className="text-xs text-slate-400">Help us arrange feast catering accurately.</p>
                    </div>
                  </label>

                  {/* Live Validation Checklist */}
                  {!isValid() && (
                    <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-400 space-y-1">
                      <span className="font-semibold text-slate-300 block mb-1">To proceed, please ensure:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        <span className={isNameValid ? "text-emerald-400 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                          {isNameValid ? "✓" : "○"} Full Name (min 2 chars)
                        </span>
                        <span className={isMobileValid ? "text-emerald-400 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                          {isMobileValid ? "✓" : "○"} 10-Digit Mobile Number
                        </span>
                        <span className={isWpValid ? "text-emerald-400 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                          {isWpValid ? "✓" : "○"} 10-Digit WhatsApp No.
                        </span>
                        <span className={isPinMatched ? "text-emerald-400 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                          {isPinMatched ? "✓" : "○"} Matching 4-Digit PIN
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Submit / Update Button */}
                  <div>
                    {!isEdit ? (
                      <motion.button
                        whileHover={isValid() && !isSubmitting ? { scale: 1.01 } : {}}
                        whileTap={isValid() && !isSubmitting ? { scale: 0.99 } : {}}
                        type="submit"
                        disabled={!isValid() || isSubmitting}
                        className={`w-full py-3.5 px-6 rounded-xl font-bold shadow-xl transition flex items-center justify-center gap-2 text-base ${
                          isValid() && !isSubmitting
                            ? "bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white shadow-purple-500/20 cursor-pointer"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Confirming Registration...</span>
                          </div>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            <span>Register & Generate Event Pass</span>
                          </>
                        )}
                      </motion.button>
                    ) : (
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={isValid() && !isSubmitting ? { scale: 1.01 } : {}}
                          whileTap={isValid() && !isSubmitting ? { scale: 0.99 } : {}}
                          type="button"
                          onClick={updateDetails}
                          disabled={!isValid() || isSubmitting}
                          className={`flex-1 py-3.5 px-6 rounded-xl font-bold shadow-xl transition flex items-center justify-center gap-2 text-base ${
                            isValid() && !isSubmitting
                              ? "bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white shadow-amber-500/20 cursor-pointer"
                              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                          }`}
                        >
                          {isSubmitting ? (
                            <span>Updating...</span>
                          ) : (
                            <>
                              <Edit3 className="w-5 h-5" />
                              <span>Save Updated Details</span>
                            </>
                          )}
                        </motion.button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 transition cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </motion.div>
            ) : (
              /* ============================================================== */
              /* SUCCESS SCREEN / DIGITAL EVENT PASS                           */
              /* ============================================================== */
              <motion.div
                key="pass-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/40 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-2xl space-y-6"
              >
                {/* Radiant celebration accent */}
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-amber-400/20 to-rose-500/20 border border-amber-400/30 text-amber-300 mb-2">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Registration Confirmed! 🎉
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    Thank you for registering for Bijoya Sammilani. Here is your official pass.
                  </p>
                </div>

                {/* Event Pass Card */}
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 relative overflow-hidden space-y-4">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-bl-xl border-l border-b border-amber-500/30">
                    VIP INVITATION
                  </div>

                  <div className="text-xs text-slate-400 uppercase tracking-wider">Your Digital Entry Token</div>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-purple-300">
                    {savedGuests.token ? `#${savedGuests.token}` : "#MM-BIJOYA"}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <button
                      onClick={handleCopyToken}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
                    >
                      {copiedToken ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Token Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Token</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp share action on pass (Login-protected) */}
                    {(savedGuests.wpNumber || savedGuests.mobile) && (
                      <button
                        onClick={() => sendWhatsApp(savedGuests)}
                        title={isLoggedIn ? "Send confirmation via WhatsApp" : "Login required to send WhatsApp"}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                          isLoggedIn
                            ? "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border-emerald-500/30"
                            : "bg-slate-800 text-slate-400 hover:text-amber-300 border-slate-700"
                        }`}
                      >
                        {isLoggedIn ? (
                          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                        )}
                        <span>{isLoggedIn ? "Send to WhatsApp" : "WhatsApp (Login Required)"}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Google Review QR Section */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center space-y-4">
                  <div className="p-3 bg-white rounded-2xl shadow-xl">
                    <img src={qr} alt="Google Review QR" className="w-36 h-36 object-contain" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-100">Leave Us a Google Review ⭐</h3>
                    <p className="text-xs text-slate-400 max-w-sm">
                      Scan the QR code above or tap below to share your experience with Coder & AccoTax.
                    </p>
                  </div>

                  <a
                    href="https://www.google.com/search?q=Coder+%26+AccoTax+Reviews"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition active:scale-95"
                  >
                    <span>Write Google Review</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsSaved(false);
                      resetForm();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Register Another Guest</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsSaved(false);
                      const directoryElement = document.getElementById("guest-directory");
                      if (directoryElement) {
                        directoryElement.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition cursor-pointer"
                  >
                    View Guest Directory
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ============================================================== */}
        {/* GUEST DIRECTORY & DIRECTORY CONTROLS                          */}
        {/* ============================================================== */}
        <div id="guest-directory" className="space-y-6 pt-6 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Guest Directory</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                  {filteredGuests.length} Guests
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Browse, search, and manage registered attendees.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={getAllGuest}
                disabled={isLoading}
                title="Refresh guest list"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-purple-400" : ""}`} />
              </button>

              <button
                onClick={exportToCSV}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export CSV</span>
              </button>

              {/* View Toggle */}
              <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    viewMode === "grid" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    viewMode === "table" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar & Category Filter Pills */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, mobile, or token..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="md:col-span-6 flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: `All (${guests.length})` },
                { id: "non-veg", label: `🍗 Non-Veg (${stats.nonVeg})` },
                { id: "veg", label: `🥬 Veg (${stats.veg})` },
                { id: "present", label: `Attending (${stats.present})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    activeFilter === tab.id
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* GUEST DISPLAY (GRID OR TABLE VIEW)                            */}
          {/* ============================================================== */}
          {isLoading ? (
            <div className="py-16 text-center">
              <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-400">Loading guest directory...</p>
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 p-8">
              <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-200">No Guests Found</h3>
              <p className="text-sm text-slate-400 mt-1">
                {searchQuery
                  ? `No matches found for "${searchQuery}". Try a different keyword.`
                  : "No registrations in this category yet."}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            /* --- GRID VIEW --- */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGuests.map((guest, idx) => {
                const isVeg =
                  guest.foodPreferenceId === "1" ||
                  guest.foodPreferenceId === 1 ||
                  (guest.foodPreferenceName?.toLowerCase().includes("veg") &&
                    !guest.foodPreferenceName?.toLowerCase().includes("non"));

                return (
                  <motion.div
                    key={guest.guestId || guest.id || idx}
                    whileHover={{ y: -3 }}
                    className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/90 p-5 shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-4 transition"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-base leading-snug">
                            {guest.guestName}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono block">
                            {guest.mobileMasked || guest.mobile}
                          </span>
                        </div>

                        {guest.token ? (
                          <span className="px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs">
                            #{guest.token}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 text-xs">
                            #{idx + 1}
                          </span>
                        )}
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                            isVeg
                              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                              : "bg-rose-500/15 border border-rose-500/30 text-rose-300"
                          }`}
                        >
                          {isVeg ? "🥬 Veg" : "🍗 Non-Veg"}
                        </span>

                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {guest.genderName || (guest.genderId === "1" ? "Male" : "Female")}
                        </span>

                        {guest.is_present && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
                            Attending
                          </span>
                        )}
                      </div>

                      {guest.address && (
                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{guest.address}</span>
                        </p>
                      )}
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => sendWhatsApp(guest)}
                        title={isLoggedIn ? "Send WhatsApp invitation" : "Login required to send WhatsApp"}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                          isLoggedIn
                            ? "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border-emerald-500/30"
                            : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-amber-300 border-slate-700/60"
                        }`}
                      >
                        {isLoggedIn ? (
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                        )}
                        <span>{isLoggedIn ? "WhatsApp" : "WhatsApp (Login)"}</span>
                      </button>

                      <button
                        onClick={() => handleEdit(guest)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-semibold border border-purple-500/30 transition cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* --- TABLE VIEW --- */
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl backdrop-blur-xl">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3.5 font-semibold">#</th>
                    <th className="px-4 py-3.5 font-semibold">Token</th>
                    <th className="px-4 py-3.5 font-semibold">Guest Name</th>
                    <th className="px-4 py-3.5 font-semibold">Mobile</th>
                    <th className="px-4 py-3.5 font-semibold">Food</th>
                    <th className="px-4 py-3.5 font-semibold">Gender</th>
                    <th className="px-4 py-3.5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredGuests.map((guest, idx) => {
                    const isVeg =
                      guest.foodPreferenceId === "1" ||
                      guest.foodPreferenceId === 1 ||
                      (guest.foodPreferenceName?.toLowerCase().includes("veg") &&
                        !guest.foodPreferenceName?.toLowerCase().includes("non"));

                    return (
                      <tr key={guest.guestId || guest.id || idx} className="hover:bg-slate-800/40 transition">
                        <td className="px-4 py-3 text-xs text-slate-500">{idx + 1}</td>
                        <td className="px-4 py-3 font-mono font-bold text-amber-400 text-xs">
                          {guest.token ? `#${guest.token}` : "-"}
                        </td>
                        <td className="px-4 py-3 font-semibold text-white">
                          <div>{guest.guestName}</div>
                          {guest.address && (
                            <div className="text-xs text-slate-400 font-normal">{guest.address}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-300">
                          {guest.mobileMasked || guest.mobile}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                              isVeg
                                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                            }`}
                          >
                            {isVeg ? "🥬 Veg" : "🍗 Non-Veg"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-300">
                          {guest.genderName || (guest.genderId === "1" ? "Male" : "Female")}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => sendWhatsApp(guest)}
                              title={isLoggedIn ? "Send WhatsApp Invite" : "Login required to send WhatsApp"}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                isLoggedIn
                                  ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20"
                                  : "bg-slate-800 text-slate-400 hover:text-amber-300 border-slate-700"
                              }`}
                            >
                              {isLoggedIn ? (
                                <MessageCircle className="w-4 h-4" />
                              ) : (
                                <Lock className="w-4 h-4 text-amber-400/80" />
                              )}
                            </button>
                            <button
                              onClick={() => handleEdit(guest)}
                              title="Edit Details"
                              className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 transition cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}