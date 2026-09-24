import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import * as htmlToImage from "html-to-image";
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
  Calendar,
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
  Trash2,
  PlusCircle,
  AlertCircle,
  Users,
  Award,
  ExternalLink,
  Share2,
  Star,
  Printer,
  Ticket,
  Clock,
  Camera,
  Send,
  X,
  LogIn,
  LogOut,
  Shield,
  GitCompare,
  Filter,
  Link2,
  Unlink,
  Crown,
  Heart,
  UserPlus,
  Users2,
  ChevronRight,
  ArrowRight,
  Flame,
  Navigation,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { authService } from "../api/auth.service";
import { loginService } from "../services/loginService";
import LinkPhoneGroupModal from "../components/bijoya/LinkPhoneGroupModal";
import qr from "../assets/google_review_QR.png";
import maitriLogo from "../assets/maitri-mahotsav-27.png";

// Dedicated vector logos for Man (Male) and Woman (Female)
const ManLogo = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0Z" />
  </svg>
);

const WomanLogo = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
  </svg>
);

// Proper Case (Title Case) helper for names
// eslint-disable-next-line react-refresh/only-export-components
export const toProperCase = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.replace(/\b\w+/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
};

// Phone masking helper for privacy
// eslint-disable-next-line react-refresh/only-export-components
export const maskPhone = (phone) => {
  if (!phone) return "-";
  const str = String(phone).trim();
  const digits = str.replace(/\D/g, "");
  if (digits.length >= 10) {
    const last4 = digits.slice(-4);
    const first2 = digits.slice(0, 2);
    return `${first2}******${last4}`;
  }
  if (str.length > 4) {
    return str.slice(0, 2) + "****" + str.slice(-2);
  }
  return str;
};

export default function Bijoya() {
  const [guests, setGuests] = useState([]);
  const [savedGuests, setSavedGuests] = useState({});
  const [_isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    guestName: "",
    age: "",
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
  const [showPinExplanation, setShowPinExplanation] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editGuestId, setEditGuestId] = useState(null);
  const [storedPin, setStoredPin] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'veg' | 'non-veg' | 'present'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [isSavingJpeg, setIsSavingJpeg] = useState(false);

  // Admin and Authentication State
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminLoginForm, setAdminLoginForm] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    showPassword: false,
  });

  // WhatsApp Messaging Modal State
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("invitation"); // 'invitation' | 'reminder' | 'confirmation' | 'feedback' | 'custom'
  const [customMessageText, setCustomMessageText] = useState("");
  const [selectedPhoneType, setSelectedPhoneType] = useState("wp"); // 'wp' | 'mobile'
  const [copiedCustomMessage, setCopiedCustomMessage] = useState(false);

  // Logical Duplicate Entry Governance State (Admin Only)
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateFilterCriteria, setDuplicateFilterCriteria] = useState("all"); // 'all' | 'unresolved' | 'linked' | 'phone' | 'name' | 'email'

  // Linked Phone Groups State (Family & Shared Contact Groups)
  const [linkedPhoneGroups, setLinkedPhoneGroups] = useState(() => {
    try {
      const saved = localStorage.getItem("bijoya_linked_phone_groups");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [activePhoneGroupToLink, setActivePhoneGroupToLink] = useState(null);
  const [showLinkGroupModal, setShowLinkGroupModal] = useState(false);

  // Live Event Countdown (Target: Nov 1, 2026, 19:30 IST)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const targetDate = new Date("2026-11-01T19:30:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const formRef = useRef(null);
  const ticketRef = useRef(null);

  // Soothing Obsidian-Gold Glassmorphic Theme for SweetAlerts in Bijoya
  const getBijoyaSwalTheme = (options = {}) => ({
    background: "linear-gradient(145deg, #0b1120 0%, #0f172a 60%, #1a122c 100%)",
    color: "#f8fafc",
    confirmButtonColor: "#f59e0b",
    cancelButtonColor: "#334155",
    didOpen: (popup) => {
      popup.style.borderRadius = "1.5rem";
      popup.style.border = "1px solid rgba(245, 158, 11, 0.35)";
      popup.style.boxShadow = "0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 40px -10px rgba(245, 158, 11, 0.25)";
      popup.style.backdropFilter = "blur(18px)";
      popup.style.padding = "1.75rem 1.5rem";

      const title = popup.querySelector(".swal2-title");
      if (title) {
        title.style.color = "#ffffff";
        title.style.fontSize = "1.35rem";
        title.style.fontWeight = "800";
      }

      const content = popup.querySelector(".swal2-html-container");
      if (content) {
        content.style.color = "#cbd5e1";
      }

      const confirmBtn = popup.querySelector(".swal2-confirm");
      if (confirmBtn) {
        confirmBtn.style.background = "linear-gradient(135deg, #f59e0b, #e11d48, #9333ea)";
        confirmBtn.style.boxShadow = "0 8px 22px -4px rgba(245, 158, 11, 0.4)";
        confirmBtn.style.borderRadius = "0.75rem";
        confirmBtn.style.fontWeight = "700";
        confirmBtn.style.fontSize = "0.875rem";
        confirmBtn.style.padding = "0.65rem 1.6rem";
        confirmBtn.style.border = "none";
        confirmBtn.style.cursor = "pointer";
      }

      const cancelBtn = popup.querySelector(".swal2-cancel");
      if (cancelBtn) {
        cancelBtn.style.borderRadius = "0.75rem";
        cancelBtn.style.fontWeight = "600";
        cancelBtn.style.fontSize = "0.875rem";
        cancelBtn.style.padding = "0.65rem 1.35rem";
        cancelBtn.style.border = "1px solid rgba(148, 163, 184, 0.2)";
        cancelBtn.style.background = "#1e293b";
        cancelBtn.style.color = "#cbd5e1";
        cancelBtn.style.cursor = "pointer";
      }

      const closeBtn = popup.querySelector(".swal2-close");
      if (closeBtn) {
        closeBtn.style.color = "#94a3b8";
      }
    },
    ...options,
  });

  // Helper to find all attendees sharing a phone number
  const getGuestsByPhone = useCallback(
    (phone) => {
      if (!phone) return [];
      const clean = String(phone).replace(/\D/g, "").slice(-10);
      if (!clean || clean.length < 10) return [];
      return guests.filter((g) => {
        const m = (g.mobile || "").replace(/\D/g, "").slice(-10);
        const w = (g.wpNumber || "").replace(/\D/g, "").slice(-10);
        return m === clean || w === clean;
      });
    },
    [guests]
  );

  // Open Link Modal for a Phone Number
  const handleOpenLinkModalForPhone = (phone, customGuests = null) => {
    const clean = String(phone).replace(/\D/g, "").slice(-10);
    if (!clean) return;
    const groupGuests = customGuests || getGuestsByPhone(clean);
    const existing = linkedPhoneGroups[clean] || null;

    setActivePhoneGroupToLink({
      phone: clean,
      guests: groupGuests,
      existingGroup: existing,
    });
    setShowLinkGroupModal(true);
  };

  // Save/Update Linked Phone Group
  const handleSaveLinkedGroup = (groupData) => {
    const clean = String(groupData.phone).replace(/\D/g, "").slice(-10);
    if (!clean) return;

    setLinkedPhoneGroups((prev) => {
      const updated = {
        ...prev,
        [clean]: groupData,
      };
      try {
        localStorage.setItem("bijoya_linked_phone_groups", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save linked phone groups:", err);
      }
      return updated;
    });

    Swal.fire({
      ...getBijoyaSwalTheme(),
      icon: "success",
      title: "Family Group Linked! 🔗",
      html: `
        <div class="text-xs text-slate-300 space-y-1.5 pt-1">
          <p>Attendees sharing phone <strong class="text-amber-300 font-mono">${maskPhone(clean)}</strong> are now linked under <strong class="text-white">${groupData.groupName}</strong>.</p>
          <p class="text-slate-400 text-[11px]">This group is now recognized as a valid linked unit in the guest registry &amp; duplicate analyzer.</p>
        </div>
      `,
      timer: 2200,
      showConfirmButton: false,
    });
  };

  // Unlink Phone Group
  const handleUnlinkGroup = (phone) => {
    const clean = String(phone).replace(/\D/g, "").slice(-10);
    if (!clean) return;

    setLinkedPhoneGroups((prev) => {
      const updated = { ...prev };
      delete updated[clean];
      try {
        localStorage.setItem("bijoya_linked_phone_groups", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to update linked phone groups:", err);
      }
      return updated;
    });

    Swal.fire({
      ...getBijoyaSwalTheme(),
      icon: "info",
      title: "Group Unlinked",
      text: `Phone link for ${maskPhone(clean)} has been removed.`,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  // Check login status on mount & listen to storage
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");
    let parsedUser = null;
    try {
      parsedUser = rawUser ? JSON.parse(rawUser) : null;
    } catch {
      parsedUser = null;
    }

    const loggedIn = Boolean(token);
    setIsLoggedIn(loggedIn);
    setCurrentUser(parsedUser);

    const role = (
      parsedUser?.userType?.userTypeName ||
      parsedUser?.role ||
      parsedUser?.roleName ||
      parsedUser?.user_type ||
      ""
    ).toLowerCase();

    // Any logged in user with a token is granted admin powers on the Bijoya portal
    const hasAdminRole =
      loggedIn &&
      (!role ||
        ["admin", "developer", "owner", "manager", "superadmin", "faculty", "staff"].some((r) =>
          role.includes(r)
        ));
    setIsAdmin(hasAdminRole);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChanged", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChanged", checkAuth);
    };
  }, []);

  // Admin Login Handler
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminLoginForm((prev) => ({ ...prev, error: "", loading: true }));

    try {
      const res = await loginService.login({
        email: adminLoginForm.email.trim(),
        password: adminLoginForm.password,
      });

      let responseData = res;
      if (typeof responseData === "string") {
        try {
          responseData = JSON.parse(responseData.replace(/^\uFEFF/, "").trim());
        } catch {
          // ignore
        }
      }

      if (responseData?.status && responseData?.data?.token) {
        const { token, user } = responseData.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        try {
          window.dispatchEvent(new Event("storage"));
          window.dispatchEvent(new Event("authChanged"));
        } catch {
          // ignore
        }

        checkAuth();
        setShowAdminLoginModal(false);
        setAdminLoginForm({ email: "", password: "", error: "", loading: false, showPassword: false });

        Swal.fire({
          ...getBijoyaSwalTheme(),
          title: "Admin Access Granted! 🛡️",
          text: `Welcome, ${user?.userName || user?.name || "Administrator"}. You now have full admin powers.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        setAdminLoginForm((prev) => ({
          ...prev,
          loading: false,
          error: responseData?.message || "Invalid credentials. Please try again.",
        }));
      }
    } catch (err) {
      console.error("Admin login failed:", err);
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";
      setAdminLoginForm((prev) => ({
        ...prev,
        loading: false,
        error: errMsg,
      }));
    }
  };

  // Admin Logout Handler
  const handleAdminLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    try {
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("authChanged"));
    } catch {
      // ignore
    }
    checkAuth();
    if (isEdit) {
      cancelEdit();
    }
    Swal.fire({
      ...getBijoyaSwalTheme(),
      title: "Logged Out",
      text: "Admin mode exited.",
      icon: "info",
      timer: 1800,
      showConfirmButton: false,
    });
  };

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

    if (name === "guestName") {
      setFormData((prev) => ({
        ...prev,
        guestName: toProperCase(value),
      }));
    } else if (name === "mobile" && sameAsMobile) {
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
  const isAgeValid =
    !formData.age ||
    (/^\d+$/.test(formData.age) && Number(formData.age) >= 1 && Number(formData.age) <= 120);
  const isMobileValid =
    !formData.mobile || /^\d{10,}$/.test(formData.mobile.replace(/\D/g, ""));
  const isWpValid = /^\d{10,}$/.test(formData.wpNumber.replace(/\D/g, ""));
  const isPinValid = /^\d{4}$/.test(formData.pin);
  const isPinMatched = isEdit
    ? (isAdmin || (isPinValid && (!storedPin || formData.pin === storedPin)))
    : isPinValid && formData.pin === formData.confirmPin;
  const isGenderValid = Boolean(formData.genderId);
  const isFoodValid = Boolean(formData.foodPreferenceId);

  const isValid = () => {
    if (isEdit && isAdmin) {
      return (
        isNameValid &&
        isAgeValid &&
        isMobileValid &&
        isWpValid &&
        isGenderValid &&
        isFoodValid &&
        (!formData.pin || /^\d{4}$/.test(formData.pin))
      );
    }
    return (
      isNameValid &&
      isAgeValid &&
      isMobileValid &&
      isWpValid &&
      isGenderValid &&
      isFoodValid &&
      isPinValid &&
      isPinMatched
    );
  };

  // Helper functions for attendance and diet
  const checkIsAttending = (g) => {
    return (
      g.is_present === true ||
      g.isAttending === true ||
      g.is_attending === true ||
      g.is_present === 1 ||
      g.isAttending === 1 ||
      g.is_attending === 1
    );
  };

  const checkIsVeg = (g) => {
    return (
      g.foodPreferenceId === "1" ||
      g.foodPreferenceId === 1 ||
      (String(g.foodPreferenceName || "").toLowerCase().includes("veg") &&
        !String(g.foodPreferenceName || "").toLowerCase().includes("non"))
    );
  };

  // Helper to format token as #CNAT-1002-2026 (#CNAT-{num}-year)
  const formatToken = (guestOrToken, defaultYear = "2026") => {
    if (!guestOrToken) return `#CNAT-1001-${defaultYear}`;

    let rawVal = "";
    let eventYear = defaultYear;

    if (typeof guestOrToken === "object") {
      rawVal = guestOrToken.token || "";
      if (guestOrToken.year) eventYear = String(guestOrToken.year);
      if (!rawVal && (guestOrToken.guestId || guestOrToken.id)) {
        rawVal = `CNAT-${1000 + Number(guestOrToken.guestId || guestOrToken.id)}`;
      }
    } else {
      rawVal = String(guestOrToken);
    }

    rawVal = String(rawVal).trim().replace(/^#/, "");
    if (!rawVal) return `#CNAT-1001-${eventYear}`;

    // If it already ends with a 4-digit year e.g. CNAT-1002-2026
    if (/^CNAT-.*-\d{4}$/i.test(rawVal)) {
      return `#${rawVal.toUpperCase()}`;
    }

    // If it starts with CNAT- e.g. "CNAT-1002"
    if (/^CNAT-/i.test(rawVal)) {
      return `#${rawVal.toUpperCase()}-${eventYear}`;
    }

    // If it's a numeric string e.g. "1002"
    if (/^\d+$/.test(rawVal)) {
      return `#CNAT-${rawVal}-${eventYear}`;
    }

    // Default fallback
    return `#CNAT-${rawVal}-${eventYear}`;
  };

  // Fetch all guests
  const getAllGuest = async () => {
    setIsLoading(true);
    try {
      const guestData = await authService.getAllGuest();
      if (guestData?.status && Array.isArray(guestData.data)) {
        setGuests(guestData.data);
      } else if (Array.isArray(guestData)) {
        setGuests(guestData);
      } else {
        setGuests([]);
      }
    } catch (error) {
      console.error("Failed to load guests:", error);
      setGuests([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Detect if entered guest name or phone already exists in registered guests
  const existingGuest = useMemo(() => {
    if (isEdit) return null;
    const name = formData.guestName?.trim().toLowerCase();
    const cleanWp = formData.wpNumber ? formData.wpNumber.replace(/\D/g, "") : "";
    const cleanMob = formData.mobile ? formData.mobile.replace(/\D/g, "") : "";

    // 1. First priority: Exact match by Name
    if (name && name.length >= 2) {
      const matchByName = guests.find(
        (g) => g.guestName && g.guestName.trim().toLowerCase() === name
      );
      if (matchByName) return matchByName;
    }

    // 2. Second priority: Match by WhatsApp number
    if (cleanWp && cleanWp.length >= 10) {
      const matchByWp = guests.find(
        (g) =>
          (g.wpNumber && g.wpNumber.replace(/\D/g, "") === cleanWp) ||
          (g.mobile && g.mobile.replace(/\D/g, "") === cleanWp)
      );
      if (matchByWp) return matchByWp;
    }

    // 3. Third priority: Match by Mobile number
    if (cleanMob && cleanMob.length >= 10) {
      const matchByMob = guests.find(
        (g) =>
          (g.mobile && g.mobile.replace(/\D/g, "") === cleanMob) ||
          (g.wpNumber && g.wpNumber.replace(/\D/g, "") === cleanMob)
      );
      if (matchByMob) return matchByMob;
    }

    return null;
  }, [guests, formData.guestName, formData.wpNumber, formData.mobile, isEdit]);

  // View Existing Guest Pass
  const handleViewExistingPass = (guest) => {
    setSavedGuests(guest);
    setIsSaved(true);
    setTimeout(() => {
      if (ticketRef.current) {
        ticketRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  // Form Submit (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      Swal.fire({
        ...getBijoyaSwalTheme(),
        title: "Incomplete Form",
        text: "Please verify all required fields highlighted in the form.",
        icon: "warning",
      });
      return;
    }

    const formattedGuestName = toProperCase(formData.guestName.trim());
    const cleanWp = formData.wpNumber
      ? formData.wpNumber.replace(/\D/g, "")
      : (formData.mobile ? formData.mobile.replace(/\D/g, "") : "");
    const cleanMobile = formData.mobile ? formData.mobile.replace(/\D/g, "") : "";

    // 1. Check for exact duplicate (Same Name AND Same Phone / WhatsApp)
    const exactExisting = guests.find((g) => {
      const nameMatch = g.guestName && g.guestName.trim().toLowerCase() === formattedGuestName.toLowerCase();
      const gWp = (g.wpNumber || g.mobile || "").replace(/\D/g, "");
      const phoneMatch = cleanWp && gWp && gWp === cleanWp;
      return nameMatch && phoneMatch;
    });

    // 2. Check for same attendee name (different phone)
    const nameExisting = !exactExisting
      ? guests.find((g) => g.guestName && g.guestName.trim().toLowerCase() === formattedGuestName.toLowerCase())
      : null;

    // 3. Check for same WhatsApp / phone (different name, e.g. family member)
    const phoneExisting = !exactExisting && !nameExisting && cleanWp
      ? guests.find((g) => {
          const gWp = (g.wpNumber || g.mobile || "").replace(/\D/g, "");
          const gMob = (g.mobile || "").replace(/\D/g, "");
          return (cleanWp && (gWp === cleanWp || gMob === cleanWp)) ||
                 (cleanMobile && (gWp === cleanMobile || gMob === cleanMobile));
        })
      : null;

    const existing = exactExisting || nameExisting || phoneExisting;

    if (existing) {
      const guestToken = formatToken(existing);
      const isVeg = checkIsVeg(existing);
      const isAtt = checkIsAttending(existing);

      let modalTitle = "Guest Already Registered!";
      let modalNotice = "";
      let cancelBtnText = "Cancel";

      if (exactExisting) {
        modalTitle = "Guest Already Registered!";
        modalNotice = `An attendee named <strong class="text-white">${toProperCase(exactExisting.guestName)}</strong> with phone <strong class="text-amber-300">${exactExisting.wpNumberMasked || maskPhone(cleanWp)}</strong> is already registered. You can view the pass or update details.`;
        cancelBtnText = "Cancel";
      } else if (nameExisting) {
        modalTitle = "Name Already Registered";
        modalNotice = `An attendee named <strong class="text-white">${toProperCase(nameExisting.guestName)}</strong> is already registered with phone <strong class="text-slate-200">${nameExisting.mobileMasked || maskPhone(nameExisting.mobile || nameExisting.wpNumber)}</strong>. If you are a different person with this name, click "Register as New Person".`;
        cancelBtnText = "Register as New Person";
      } else if (phoneExisting) {
        modalTitle = "Phone Already Used";
        modalNotice = `The WhatsApp/phone number <strong class="text-amber-300">${phoneExisting.mobileMasked || maskPhone(cleanWp)}</strong> is registered under <strong class="text-white">${toProperCase(phoneExisting.guestName)}</strong>. If you are registering another family member with this number, click "Register Family Member".`;
        cancelBtnText = "Register Family Member";
      }

      const result = await Swal.fire({
        ...getBijoyaSwalTheme(),
        title: modalTitle,
        html: `
          <div class="text-left space-y-3 pt-1 text-xs sm:text-sm">
            <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
              ${modalNotice}
            </div>

            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-400">Digital Token:</span>
                <span class="text-amber-300 font-bold">${guestToken}</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-400">Registered Phone:</span>
                <span class="text-slate-200">${existing.mobileMasked || maskPhone(existing.mobile || existing.wpNumber)}</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-400">Meal Preference:</span>
                <span class="text-slate-200">${isVeg ? "🌱 Vegetarian" : "🍗 Non-Vegetarian"}</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-400">Attendance:</span>
                <span class="text-emerald-400 font-bold">${isAtt ? "✅ Confirmed Attending" : "Invited"}</span>
              </div>
            </div>

            <p class="text-slate-300 text-center text-xs">
              Would you like to view the digital event pass or update registration details?
            </p>
          </div>
        `,
        icon: "info",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "View Event Pass 🎫",
        denyButtonText: "Edit Details ✏️",
        cancelButtonText: cancelBtnText,
        confirmButtonColor: "#f59e0b",
        denyButtonColor: "#8b5cf6",
        cancelButtonColor: "#475569",
      });

      if (result.isConfirmed) {
        handleViewExistingPass(existing);
        return;
      } else if (result.isDenied) {
        handleEdit(existing);
        return;
      } else if (exactExisting || !result.isDismissed || result.dismiss !== Swal.DismissReason.cancel) {
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const payload = {
        guestName: formattedGuestName,
        age: formData.age ? Number(formData.age) : null,
        mobile: formData.mobile ? formData.mobile.replace(/\D/g, "") : null,
        wpNumber: formData.wpNumber
          ? formData.wpNumber.replace(/\D/g, "")
          : (formData.mobile ? formData.mobile.replace(/\D/g, "") : null),
        address: formData.address?.trim() || null,
        email: formData.email?.trim() || null,
        pin: formData.pin?.trim(),
        genderId: Number(formData.genderId),
        foodPreferenceId: Number(formData.foodPreferenceId),
        is_attending: Boolean(formData.is_present),
        is_present: Boolean(formData.is_present),
        comment: formData.comment?.trim() || null,
        year: new Date().getFullYear(),
      };

      const successData = await authService.saveGuest(payload);
      if (successData.status) {
        setIsSaved(true);
        // Merge payload to preserve all attendee details on the digital pass
        const mergedGuest = {
          ...payload,
          ...(successData.data || {}),
        };
        setSavedGuests(mergedGuest);

        const guestToken = formatToken(mergedGuest);

        await Swal.fire({
          ...getBijoyaSwalTheme(),
          html: `
            <div class="text-center space-y-3 pt-1">
              <!-- Soothing Glowing Celebration Emblem -->
              <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-500/20 via-emerald-500/20 to-purple-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/15 animate-bounce" style="animation-duration: 2.5s;">
                🌸
              </div>

              <!-- Festive Badge -->
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <span>✨ ২৭ তম মৈত্রী মহোৎসব ২০২৬</span>
              </div>

              <!-- Title -->
              <h3 class="text-xl sm:text-2xl font-black tracking-tight text-white">
                Registration Confirmed! 🎉
              </h3>

              <!-- Soothing Warm Greeting -->
              <div class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                Welcome, <strong class="text-amber-300 font-bold">${payload.guestName || "Dear Guest"}</strong>!
                <p class="mt-1 text-slate-300">
                  Your VIP invitation pass and digital entry token have been generated for:
                </p>
                <div class="mt-1.5 py-1 px-3 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 text-xs font-medium inline-block">
                  📅 <strong>1st November, 2026</strong> • ⏰ <strong class="text-amber-300">7:30 PM onwards</strong>
                </div>
              </div>

              <!-- Entry Token Card -->
              <div class="my-3 p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between text-left shadow-inner">
                <div>
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Digital Entry Token</span>
                  <span class="text-base sm:text-lg font-mono font-black text-amber-300 tracking-wider">
                    ${guestToken}
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Event Pass</span>
                  <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    VIP Confirmed
                  </span>
                </div>
              </div>

              <!-- Welcoming Theme Quote -->
              <div class="pt-2 border-t border-slate-800/80 space-y-0.5">
                <p class="text-xs font-bold text-amber-200/95 font-serif">
                  “আপনি অতিথিও, আবার আতিথেয়তাকারীও”
                </p>
                <p class="text-xs font-semibold text-rose-200/95 font-hindi tracking-wide">
                  “आप मेहमान भी हैं और मेज़बान भी”
                </p>
                <p class="text-[10px] text-slate-400 italic">
                  “You are the guest, yet you are the host too.”
                </p>
              </div>
            </div>
          `,
          confirmButtonText: "View My Digital Pass ✨",
          showCloseButton: true,
          timer: 8000,
          timerProgressBar: true,
        });

        getAllGuest();
        resetForm();

        // Smoothly scroll down to the generated VIP pass
        setTimeout(() => {
          if (ticketRef.current) {
            ticketRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
      }
    } catch (error) {
      let validationDetails = null;
      const errorData = error?.response?.data?.data || error?.response?.data?.errors;
      if (errorData && typeof errorData === "object") {
        const errorList = Object.values(errorData).flat().filter(Boolean);
        if (errorList.length > 0) {
          validationDetails = errorList.join(" • ");
        }
      }

      const errorMessage =
        validationDetails ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save registration. Please try again.";

      Swal.fire({
        ...getBijoyaSwalTheme(),
        title: error?.response?.status === 422 ? "Registration Notice" : "Registration Error",
        text: errorMessage,
        icon: error?.response?.status === 422 ? "warning" : "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger Edit Mode
  const handleEdit = (guestData) => {
    setIsEdit(true);
    setEditGuestId(guestData.guestId || guestData.id);
    const guestPin = guestData.pin !== undefined && guestData.pin !== null ? String(guestData.pin).trim() : "";
    setStoredPin(guestPin);
    const isAtt = checkIsAttending(guestData);

    setFormData({
      guestName: toProperCase(guestData.guestName || ""),
      age: guestData.age !== undefined && guestData.age !== null ? String(guestData.age) : "",
      mobile: guestData.mobile || "",
      wpNumber: guestData.wpNumber || guestData.mobile || "",
      address: guestData.address || "",
      email: guestData.email || "",
      pin: "", // 4-digit PIN should NOT be auto-filled on update
      confirmPin: "", // 4-digit PIN should NOT be auto-filled on update
      genderId: String(guestData.genderId || "1"),
      foodPreferenceId: String(guestData.foodPreferenceId || "2"),
      is_present: isAtt,
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
    setStoredPin(null);
    resetForm();
  };

  // Update Guest API Call
  const updateDetails = async () => {
    // Regular guests must provide matching PIN; Admin bypasses
    if (!isAdmin && storedPin && formData.pin !== storedPin) {
      Swal.fire({
        ...getBijoyaSwalTheme(),
        title: "Incorrect Security PIN",
        text: "The 4-digit PIN does not match the stored PIN for this attendee. Please enter the correct PIN to authorize changes.",
        icon: "error",
      });
      return;
    }

    if (!isValid()) {
      Swal.fire({
        ...getBijoyaSwalTheme(),
        title: "Incomplete Details",
        text: "Please ensure all mandatory fields are valid.",
        icon: "warning",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedGuestName = toProperCase(formData.guestName.trim());
      const payload = {
        guestName: formattedGuestName,
        age: formData.age ? Number(formData.age) : null,
        mobile: formData.mobile ? formData.mobile.replace(/\D/g, "") : null,
        wpNumber: formData.wpNumber
          ? formData.wpNumber.replace(/\D/g, "")
          : (formData.mobile ? formData.mobile.replace(/\D/g, "") : null),
        address: formData.address?.trim() || null,
        email: formData.email?.trim() || null,
        pin: formData.pin?.trim() || storedPin || null,
        genderId: Number(formData.genderId),
        foodPreferenceId: Number(formData.foodPreferenceId),
        is_attending: Boolean(formData.is_present),
        is_present: Boolean(formData.is_present),
        comment: formData.comment?.trim() || null,
      };

      const successData = await authService.updateGuest(editGuestId, payload);
      if (successData.status) {
        Swal.fire({
          ...getBijoyaSwalTheme(),
          title: "Updated Successfully! ✨",
          text: isAdmin
            ? `Admin update: ${formattedGuestName}'s details have been saved.`
            : "Guest details have been updated in the portal.",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        getAllGuest();
        cancelEdit();
      }
    } catch (error) {
      let validationDetails = null;
      const errorData = error?.response?.data?.data || error?.response?.data?.errors;
      if (errorData && typeof errorData === "object") {
        const errorList = Object.values(errorData).flat().filter(Boolean);
        if (errorList.length > 0) {
          validationDetails = errorList.join(" • ");
        }
      }

      const errorMessage =
        validationDetails ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update details. Please verify your entries.";

      Swal.fire({
        ...getBijoyaSwalTheme(),
        title: error?.response?.status === 422 ? "Validation Notice" : "Update Failed",
        text: errorMessage,
        icon: error?.response?.status === 422 ? "warning" : "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Guest
  const handleDelete = async (guest) => {
    const id = guest.guestId || guest.id;
    const guestName = toProperCase(guest.guestName || "Guest");
    const guestToken = formatToken(guest);

    if (!isAdmin) {
      const authPrompt = await Swal.fire({
        ...getBijoyaSwalTheme(),
        title: "Admin Privileges Required 🛡️",
        html: `
          <div class="text-left space-y-2 text-xs sm:text-sm text-slate-300">
            <p>Only authorized administrators can delete attendee records.</p>
            <p class="text-slate-400">Please sign in with your administrative credentials to continue.</p>
          </div>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sign In as Admin 🔐",
        cancelButtonText: "Cancel",
      });

      if (authPrompt.isConfirmed) {
        setShowAdminLoginModal(true);
      }
      return;
    }

    const result = await Swal.fire({
      ...getBijoyaSwalTheme(),
      title: "Delete Guest Record?",
      html: `
        <div class="text-left space-y-3 pt-1 text-xs sm:text-sm">
          <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200">
            ⚠️ <strong>Warning:</strong> You are about to permanently remove this guest registration. This cannot be undone.
          </div>
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
            <div class="flex justify-between items-center"><span class="text-slate-400">Name:</span> <strong class="text-white">${guestName}</strong></div>
            <div class="flex justify-between items-center"><span class="text-slate-400">Token:</span> <strong class="text-amber-300">${guestToken}</strong></div>
            <div class="flex justify-between items-center"><span class="text-slate-400">Phone:</span> <span class="text-slate-200">${guest.wpNumber || guest.mobile || "—"}</span></div>
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete Record",
      confirmButtonColor: "#ef4444",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await authService.deleteGuest(id);
        Swal.fire({
          ...getBijoyaSwalTheme(),
          title: "Guest Deleted! 🗑️",
          text: `${guestName} (${guestToken}) has been removed.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        getAllGuest();
      } catch (error) {
        console.error("Failed to delete guest:", error);
        Swal.fire({
          ...getBijoyaSwalTheme(),
          title: "Error",
          text: error?.response?.data?.message || "Failed to delete guest record.",
          icon: "error",
        });
      }
    }
  };

  // 1-Click Fast Attendance Toggle Handler (Admin Only)
  const handleToggleAttendance = async (guest) => {
    if (!guest) return;
    const guestId = guest.guestId || guest.id;
    if (!guestId) return;

    if (!isAdmin) {
      const authPrompt = await Swal.fire({
        ...getBijoyaSwalTheme(),
        title: "Admin Privileges Required 🛡️",
        html: `
          <div class="text-left space-y-2 text-xs sm:text-sm text-slate-300">
            <p>Only authorized administrators can modify attendee attendance / RSVP status.</p>
            <p class="text-slate-400">Please sign in with your administrative credentials to continue.</p>
          </div>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sign In as Admin 🔐",
        cancelButtonText: "Cancel",
      });

      if (authPrompt.isConfirmed) {
        setShowAdminLoginModal(true);
      }
      return;
    }

    const currentAttending = checkIsAttending(guest);
    const newAttending = !currentAttending;
    const guestName = toProperCase(guest.guestName || "Guest");
    const tokenDisplay = formatToken(guest);

    // Optimistic Local State Update for instantaneous UI responsiveness
    setGuests((prevGuests) =>
      prevGuests.map((g) => {
        const gId = g.guestId || g.id;
        if (gId === guestId) {
          return {
            ...g,
            is_present: newAttending,
            is_attending: newAttending,
            isAttending: newAttending,
          };
        }
        return g;
      })
    );

    try {
      const payload = {
        guestName: guest.guestName,
        age: guest.age ? Number(guest.age) : null,
        mobile: guest.mobile ? String(guest.mobile).replace(/\\D/g, "") : null,
        wpNumber: guest.wpNumber
          ? String(guest.wpNumber).replace(/\\D/g, "")
          : (guest.mobile ? String(guest.mobile).replace(/\\D/g, "") : null),
        address: guest.address || null,
        email: guest.email || null,
        pin: guest.pin !== undefined && guest.pin !== null ? String(guest.pin) : null,
        genderId: Number(guest.genderId || 1),
        foodPreferenceId: Number(guest.foodPreferenceId || 2),
        is_attending: newAttending,
        is_present: newAttending,
        comment: guest.comment || null,
      };

      const response = await authService.updateGuest(guestId, payload);
      if (response?.status || response) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: newAttending ? "success" : "info",
          title: newAttending
            ? `✅ Marked ATTENDING: ${guestName}`
            : `⭕ Marked NOT ATTENDING: ${guestName}`,
          html: `<span class="text-[11px] text-amber-300 font-mono font-bold">${tokenDisplay}</span>`,
          showConfirmButton: false,
          timer: 2200,
          timerProgressBar: true,
          background: "#0f172a",
          color: "#f8fafc",
          customClass: {
            popup: "border border-amber-500/30 rounded-2xl shadow-xl",
          },
        });
      }
    } catch (err) {
      console.error("Failed to update attendance status:", err);
      // Rollback optimistic update
      setGuests((prevGuests) =>
        prevGuests.map((g) => {
          const gId = g.guestId || g.id;
          if (gId === guestId) {
            return {
              ...g,
              is_present: currentAttending,
              is_attending: currentAttending,
              isAttending: currentAttending,
            };
          }
          return g;
        })
      );

      Swal.fire({
        ...getBijoyaSwalTheme(),
        title: "Attendance Update Failed",
        text:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update attendance status on the server.",
        icon: "error",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      guestName: "",
      age: "",
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

  // ============================================================================
  // WHATSAPP MESSAGE TEMPLATES & CUSTOM MESSAGING ENGINE
  // ============================================================================
  const getInvitationMessage = (guest) => {
    const tokenDisplay = formatToken(guest);
    const isVeg = checkIsVeg(guest);
    const foodText = isVeg ? "🌱 Vegetarian (নিরামিষ)" : "🍗 Non-Vegetarian (আমিষ)";
    const isAtt = checkIsAttending(guest);
    const name = toProperCase(guest?.guestName || "Guest");

    return `🌸 *২৭ তম মৈত্রী মহোৎসব ২০২৬ (27th Maitri Mahotsav)* 🌸
━━━━━━━━━━━━━━━━━━
শ্রদ্ধেয়/শ্রদ্ধেয়া *${name}*,

✨ *“আপনি অতিথিও, আবার আতিথেয়তাকারীও”*
_“आप मेहमान भी हैं और मेज़बान भी”_
_“You are the guest, yet you are the host too.”_

আপনাকে ও আপনার পরিবারের সকলকে জানাই Coder & AccoTax পরিবারের পক্ষ থেকে আন্তরিক প্রীতি, শুভেচ্ছা ও অভিনন্দন! 🎉

🎫 *Entry Token:* \`${tokenDisplay}\`
📅 *Date:* 1st November, 2026 (Sunday)
⏰ *Time:* 7:30 PM onwards (সন্ধ্যা ৭:৩০ থেকে)
📍 *Venue:* Coder & AccoTax, Barrackpore
🍽️ *Food Preference:* ${foodText}
✨ *Status:* ${isAtt ? "✅ Confirmed (উপস্থিত থাকবেন)" : "Invited"}

━━━━━━━━━━━━━━━━━━
⭐ *আমাদের সম্পর্কে আপনার মূল্যবান মতামত দিন:*
অনুগ্রহ করে নিচের লিঙ্কে ক্লিক করে একটি ৫-স্টার রিভিউ দিন:
👉 https://g.page/r/CTBkwqHJ6mZ2EBM/review

📸 *অনুষ্ঠানের ছবি ও লাইভ আপডেটের জন্য আমাদের সোশ্যাল মিডিয়া ফলো করুন:*
Facebook: https://www.facebook.com/profile.php?id=61561702110617
Instagram: https://www.instagram.com/codernaccotax

আপনার উপস্থিতি আমাদের অনুষ্ঠানকে আরও সমৃদ্ধ করবে।

সাদর আমন্ত্রণান্তে,
*Team Coder & AccoTax* 💐
━━━━━━━━━━━━━━━━━━`;
  };

  const getReminderMessage = (guest) => {
    const tokenDisplay = formatToken(guest);
    const name = toProperCase(guest?.guestName || "Guest");
    return `🌸 *২৭ তম মৈত্রী মহোৎসব ২০২৬ • Reminder* 🌸
━━━━━━━━━━━━━━━━━━
নমস্কার *${name}*,
মৈত্রী মহোৎসব ২০২৬ সমাগত! আগামী *১লা নভেম্বর, ২০২৬ (রবিবার), সন্ধ্যা ৭:৩০ ঘটিকায়* Coder & AccoTax প্রাঙ্গণে আপনার উপস্থিতি একান্ত কাম্য।

🎫 *Entry Token:* \`${tokenDisplay}\`
📅 *Date:* 1st November, 2026
⏰ *Time:* 7:30 PM onwards
📍 *Venue:* Coder & AccoTax, Barrackpore

অনুষ্ঠানে আপনার উপস্থিতি আমাদের আনন্দিত করবে! ✨
সাদর আমন্ত্রণান্তে,
*Team Coder & AccoTax* 💐
━━━━━━━━━━━━━━━━━━`;
  };

  const getConfirmationMessage = (guest) => {
    const isVeg = checkIsVeg(guest);
    const foodText = isVeg ? "🌱 Vegetarian (নিরামিষ)" : "🍗 Non-Vegetarian (আমিষ)";
    const name = toProperCase(guest?.guestName || "Guest");
    const tokenDisplay = formatToken(guest);

    return `🌸 *মৈত্রী মহোৎসব ২০২৬ • Feast & Catering Confirmation* 🌸
━━━━━━━━━━━━━━━━━━
নমস্কার *${name}*,
আমরা মহা সমারোহে ২৭ তম মৈত্রী মহোৎসবের ভোজের আয়োজন করছি।
আপনার ডিজিটাল টোকেন: \`${tokenDisplay}\`
আমাদের রেকর্ডে আপনার আহারের পছন্দ: *${foodText}*।

এতে কোনো পরিবর্তন বা বিশেষ অনুরোধ থাকলে অনুগ্রহ করে আমাদের জানান।
ধন্যবাদ ও শুভেচ্ছা!
— Team Coder & AccoTax 💐`;
  };

  const getFeedbackMessage = (guest) => {
    const name = toProperCase(guest?.guestName || "Guest");
    return `🌸 *Coder & AccoTax • Greetings & Feedback* 🌸
━━━━━━━━━━━━━━━━━━
শ্রদ্ধেয়/শ্রদ্ধেয়া *${name}*,
Coder & AccoTax পরিবারের সঙ্গে থাকার জন্য আপনাকে আন্তরিক ধন্যবাদ! ✨

আমাদের সেবা ও উদ্যোগ সম্পর্কে আপনার মূল্যবান মতামত জানাতে অনুগ্রহ করে গুগলে একটি ৫-স্টার রিভিউ দিন:
👉 https://g.page/r/CTBkwqHJ6mZ2EBM/review

আপনার আশীর্বাদ ও সমর্থন আমাদের পথচলার প্রেরণা।
ধন্যবাদ ও শুভকামনা! 💐
— Coder & AccoTax Team`;
  };

  // Helper to interpolate placeholders
  const resolveMessagePlaceholders = (text, guest) => {
    if (!text || !guest) return text || "";
    const tokenDisplay = formatToken(guest);
    const isVeg = checkIsVeg(guest);
    const foodText = isVeg ? "Vegetarian (নিরামিষ)" : "Non-Vegetarian (আমিষ)";
    const name = toProperCase(guest.guestName || "Guest");
    const phone = guest.wpNumber || guest.mobile || "";

    return text
      .replace(/\{name\}/gi, name)
      .replace(/\{token\}/gi, tokenDisplay)
      .replace(/\{food\}/gi, foodText)
      .replace(/\{date\}/gi, "1st November, 2026")
      .replace(/\{time\}/gi, "7:30 PM onwards")
      .replace(/\{venue\}/gi, "Coder & AccoTax, Barrackpore")
      .replace(/\{phone\}/gi, phone)
      .replace(/\{review_link\}/gi, "https://g.page/r/CTBkwqHJ6mZ2EBM/review");
  };

  // Open Message Composer Modal
  const openMessageModal = (guest, templateType = "invitation") => {
    setMessageRecipient(guest);
    setSelectedTemplate(templateType);
    setSelectedPhoneType(guest.wpNumber ? "wp" : "mobile");

    let initialText = "";
    if (templateType === "invitation") {
      initialText = getInvitationMessage(guest);
    } else if (templateType === "reminder") {
      initialText = getReminderMessage(guest);
    } else if (templateType === "confirmation") {
      initialText = getConfirmationMessage(guest);
    } else if (templateType === "feedback") {
      initialText = getFeedbackMessage(guest);
    } else {
      initialText = `Hello ${toProperCase(guest.guestName || "Guest")},\n\n`;
    }

    setCustomMessageText(initialText);
    setCopiedCustomMessage(false);
    setIsMessageModalOpen(true);
  };

  // Switch Template inside Modal
  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    if (!messageRecipient) return;

    if (template === "invitation") {
      setCustomMessageText(getInvitationMessage(messageRecipient));
    } else if (template === "reminder") {
      setCustomMessageText(getReminderMessage(messageRecipient));
    } else if (template === "confirmation") {
      setCustomMessageText(getConfirmationMessage(messageRecipient));
    } else if (template === "feedback") {
      setCustomMessageText(getFeedbackMessage(messageRecipient));
    } else if (template === "custom") {
      setCustomMessageText(`Hello ${toProperCase(messageRecipient.guestName || "Guest")},\n\n`);
    }
  };

  // Send WhatsApp from Modal
  const handleSendFromModal = () => {
    if (!messageRecipient) return;

    const rawPhone = selectedPhoneType === "mobile"
      ? (messageRecipient.mobile || messageRecipient.wpNumber || "")
      : (messageRecipient.wpNumber || messageRecipient.mobile || "");

    const cleanPhone = rawPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      Swal.fire({
        ...getBijoyaSwalTheme(),
        title: "Missing Phone Number",
        text: "This attendee does not have a valid WhatsApp or mobile number registered.",
        icon: "warning",
      });
      return;
    }

    const formattedPhone = cleanPhone.startsWith("91") && cleanPhone.length > 10 ? cleanPhone : `91${cleanPhone}`;
    const resolvedText = resolveMessagePlaceholders(customMessageText, messageRecipient);

    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(resolvedText)}`, "_blank");
  };

  // Copy Custom Message to Clipboard
  const handleCopyCustomMessage = () => {
    const resolvedText = resolveMessagePlaceholders(customMessageText, messageRecipient);
    navigator.clipboard.writeText(resolvedText);
    setCopiedCustomMessage(true);
    setTimeout(() => setCopiedCustomMessage(false), 2000);
  };

  // Quick 1-Click WhatsApp Invitation Sender
  const sendWhatsApp = (guest) => {
    const rawPhone = (guest.wpNumber || guest.mobile || "").replace(/\D/g, "");
    if (!rawPhone || rawPhone.length < 10) {
      Swal.fire({
        ...getBijoyaSwalTheme(),
        title: "No Contact Number",
        text: "Please add a valid WhatsApp number to send the invitation.",
        icon: "warning",
      });
      return;
    }
    const formattedPhone = rawPhone.startsWith("91") && rawPhone.length > 10 ? rawPhone : `91${rawPhone}`;
    const message = getInvitationMessage(guest);

    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!guests.length) {
      Swal.fire({
        ...getBijoyaSwalTheme(),
        title: "No Data",
        text: "No guests found to export.",
        icon: "info",
        timer: 2500,
        showConfirmButton: false,
      });
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
      formatToken(guest),
      guest.guestName || "",
      guest.mobile || "",
      guest.wpNumber || "",
      guest.genderName || (guest.genderId === "1" ? "Male" : "Female"),
      guest.foodPreferenceName || (guest.foodPreferenceId === "1" ? "Vegetarian" : "Non-Vegetarian"),
      checkIsAttending(guest) ? "Yes" : "No",
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
    link.setAttribute("download", `Maitri_Mahotsav_2026_Guests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Logical Duplicate Entries Clustering Engine (Admin Only)
  const duplicateAnalysis = useMemo(() => {
    if (!isAdmin || !Array.isArray(guests) || guests.length < 2) {
      return {
        clusters: [],
        duplicateGuestIds: new Set(),
        totalDuplicates: 0,
        totalClusters: 0,
        phoneClustersCount: 0,
        nameClustersCount: 0,
        emailClustersCount: 0,
      };
    }

    const normalizePhone = (num) => {
      if (!num) return "";
      const digits = String(num).replace(/\D/g, "");
      return digits.length >= 10 ? digits.slice(-10) : digits;
    };

    const normalizeName = (name) => {
      if (!name || typeof name !== "string") return "";
      return name.trim().toLowerCase().replace(/\s+/g, " ");
    };

    const normalizeEmail = (email) => {
      if (!email || typeof email !== "string") return "";
      return email.trim().toLowerCase();
    };

    const getGuestKey = (g) => String(g.guestId || g.id || g._id || g.token);

    // Group by Phone
    const phoneMap = new Map();
    // Group by Name
    const nameMap = new Map();
    // Group by Email
    const emailMap = new Map();

    guests.forEach((g) => {
      const m = normalizePhone(g.mobile);
      const w = normalizePhone(g.wpNumber);
      const phones = new Set([m, w].filter((p) => p && p.length >= 10));
      phones.forEach((p) => {
        if (!phoneMap.has(p)) phoneMap.set(p, []);
        phoneMap.get(p).push(g);
      });

      const n = normalizeName(g.guestName);
      if (n && n.length >= 2) {
        if (!nameMap.has(n)) nameMap.set(n, []);
        nameMap.get(n).push(g);
      }

      const e = normalizeEmail(g.email);
      if (e && e.includes("@")) {
        if (!emailMap.has(e)) emailMap.set(e, []);
        emailMap.get(e).push(g);
      }
    });

    // Adjacency graph for clustering
    const adj = new Map();
    const guestByKey = new Map();

    guests.forEach((g) => {
      const k = getGuestKey(g);
      guestByKey.set(k, g);
      if (!adj.has(k)) adj.set(k, new Map());
    });

    const addEdge = (g1, g2, reason, type) => {
      const k1 = getGuestKey(g1);
      const k2 = getGuestKey(g2);
      if (k1 === k2) return;

      if (!adj.get(k1).has(k2)) {
        adj.get(k1).set(k2, { guest: g2, reasons: [], types: new Set() });
      }
      adj.get(k1).get(k2).reasons.push(reason);
      adj.get(k1).get(k2).types.add(type);

      if (!adj.get(k2).has(k1)) {
        adj.get(k2).set(k1, { guest: g1, reasons: [], types: new Set() });
      }
      adj.get(k2).get(k1).reasons.push(reason);
      adj.get(k2).get(k1).types.add(type);
    };

    // Phone edges
    phoneMap.forEach((list, phone) => {
      if (list.length > 1) {
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            addEdge(list[i], list[j], `Matching Phone/WhatsApp: ${phone}`, "phone");
          }
        }
      }
    });

    // Name edges
    nameMap.forEach((list, name) => {
      if (list.length > 1) {
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            addEdge(list[i], list[j], `Matching Name: "${toProperCase(name)}"`, "name");
          }
        }
      }
    });

    // Email edges
    emailMap.forEach((list, email) => {
      if (list.length > 1) {
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            addEdge(list[i], list[j], `Matching Email: ${email}`, "email");
          }
        }
      }
    });

    // Traverse components (BFS)
    const visited = new Set();
    const clusters = [];
    const duplicateGuestIds = new Set();

    guests.forEach((g) => {
      const startKey = getGuestKey(g);
      if (visited.has(startKey)) return;

      const neighbors = adj.get(startKey);
      if (!neighbors || neighbors.size === 0) return;

      const componentGuests = [];
      const componentReasons = new Set();
      const componentTypes = new Set();
      const queue = [startKey];
      visited.add(startKey);

      while (queue.length > 0) {
        const currKey = queue.shift();
        const currGuest = guestByKey.get(currKey);
        componentGuests.push(currGuest);
        duplicateGuestIds.add(currKey);

        const currNeighbors = adj.get(currKey);
        if (currNeighbors) {
          currNeighbors.forEach((edgeData, neighborKey) => {
            edgeData.reasons.forEach((r) => componentReasons.add(r));
            edgeData.types.forEach((t) => componentTypes.add(t));

            if (!visited.has(neighborKey)) {
              visited.add(neighborKey);
              queue.push(neighborKey);
            }
          });
        }
      }

      if (componentGuests.length > 1) {
        const clusterPhones = new Set();
        componentGuests.forEach((g) => {
          const p1 = normalizePhone(g.mobile);
          const p2 = normalizePhone(g.wpNumber);
          if (p1) clusterPhones.add(p1);
          if (p2) clusterPhones.add(p2);
        });
        const primaryPhone = Array.from(clusterPhones)[0] || "";
        const linkedGroupData = primaryPhone ? linkedPhoneGroups[primaryPhone] : null;

        clusters.push({
          id: `cluster-${clusters.length + 1}-${startKey}`,
          index: clusters.length + 1,
          guests: componentGuests,
          reasons: Array.from(componentReasons),
          types: Array.from(componentTypes),
          hasPhone: componentTypes.has("phone"),
          hasName: componentTypes.has("name"),
          hasEmail: componentTypes.has("email"),
          primaryPhone,
          clusterPhones: Array.from(clusterPhones),
          isLinkedGroup: Boolean(linkedGroupData?.isLinked),
          linkedGroupData,
        });
      }
    });

    const phoneClusters = clusters.filter((c) => c.hasPhone);
    const linkedGroupsCount = clusters.filter((c) => c.isLinkedGroup).length;
    const unresolvedDuplicates = clusters.filter((c) => !c.isLinkedGroup).length;

    return {
      clusters,
      duplicateGuestIds,
      totalDuplicates: duplicateGuestIds.size,
      totalClusters: clusters.length,
      phoneClustersCount: phoneClusters.length,
      linkedGroupsCount,
      unresolvedDuplicates,
      nameClustersCount: clusters.filter((c) => c.hasName).length,
      emailClustersCount: clusters.filter((c) => c.hasEmail).length,
    };
  }, [guests, isAdmin, linkedPhoneGroups]);

  // Export Duplicates Audit Report to CSV (Admin Only)
  const exportDuplicatesToCSV = () => {
    if (!duplicateAnalysis.clusters.length) {
      Swal.fire({
        ...getBijoyaSwalTheme(),
        title: "No Duplicates",
        text: "No duplicate records found to export.",
        icon: "info",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const headers = [
      "Cluster ID",
      "Duplicate Conflict Reasons",
      "Token",
      "Guest Name",
      "Mobile",
      "WhatsApp",
      "Email",
      "Gender",
      "Food Preference",
      "Attending",
      "Address",
      "Comment",
    ];

    const rows = [];
    duplicateAnalysis.clusters.forEach((cluster) => {
      cluster.guests.forEach((guest) => {
        rows.push([
          `Cluster #${cluster.index}`,
          cluster.reasons.join(" | "),
          formatToken(guest),
          guest.guestName || "",
          guest.mobile || "",
          guest.wpNumber || "",
          guest.email || "",
          guest.genderName || (guest.genderId === "1" ? "Male" : "Female"),
          guest.foodPreferenceName || (guest.foodPreferenceId === "1" ? "Vegetarian" : "Non-Vegetarian"),
          checkIsAttending(guest) ? "Yes" : "No",
          guest.address || "",
          guest.comment || "",
        ]);
      });
    });

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
    link.setAttribute(
      "download",
      `Bijoya_2026_Duplicate_Records_${new Date().toISOString().slice(0, 10)}.csv`
    );
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
      const tokenMatch =
        String(guest.token || "").toLowerCase().includes(q) ||
        formatToken(guest).toLowerCase().includes(q);
      const matchesSearch = !q || nameMatch || mobileMatch || tokenMatch;

      if (!matchesSearch) return false;

      if (activeFilter === "veg") {
        return checkIsVeg(guest);
      }
      if (activeFilter === "non-veg") {
        return !checkIsVeg(guest);
      }
      if (activeFilter === "present") {
        return checkIsAttending(guest);
      }
      if (activeFilter === "duplicates") {
        const gId = String(guest.guestId || guest.id || guest._id || guest.token);
        return duplicateAnalysis.duplicateGuestIds.has(gId);
      }

      return true;
    });
  }, [guests, searchQuery, activeFilter, duplicateAnalysis]);

  // Dynamic Statistics
  const stats = useMemo(() => {
    const total = guests.length;
    const veg = guests.filter((g) => checkIsVeg(g)).length;
    const nonVeg = guests.filter((g) => !checkIsVeg(g)).length;
    const present = guests.filter((g) => checkIsAttending(g)).length;
    const duplicates = duplicateAnalysis.totalDuplicates;
    const vegPct = total > 0 ? Math.round((veg / total) * 100) : 0;
    const nonVegPct = total > 0 ? Math.round((nonVeg / total) * 100) : 0;
    const presentPct = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, veg, nonVeg, present, duplicates, vegPct, nonVegPct, presentPct };
  }, [guests, duplicateAnalysis]);

  const handleCopyToken = () => {
    const tokenVal = formatToken(savedGuests);
    navigator.clipboard.writeText(String(tokenVal));
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  // Save Event Ticket Pass as High-Quality JPEG
  const handleSaveJpeg = async () => {
    if (!ticketRef.current) return;
    setIsSavingJpeg(true);
    try {
      const dataUrl = await htmlToImage.toJpeg(ticketRef.current, {
        quality: 0.96,
        backgroundColor: "#020617",
        pixelRatio: 2,
        skipFonts: true,
        fontEmbedCSS: "",
        filter: (node) => {
          // Exclude buttons or elements with ticket-export-hide class
          if (node.classList && node.classList.contains("ticket-export-hide")) {
            return false;
          }
          return true;
        },
      });

      const tokenFormatted = formatToken(savedGuests).replace(/[^a-zA-Z0-9_-]/g, "");
      const gName = (savedGuests.guestName || "Guest").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
      const filename = `Maitri_Mahotsav_Pass_${tokenFormatted}_${gName}.jpeg`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Pass saved as JPEG! 📸",
        showConfirmButton: false,
        timer: 2500,
        background: "#0f172a",
        color: "#f8fafc",
      });
    } catch (err) {
      console.error("Failed to generate ticket JPEG:", err);
      Swal.fire({
        icon: "error",
        title: "Image Export Failed",
        text: "Could not generate JPEG. You can also use the 'Print Pass' button to save as PDF.",
        background: "#0f172a",
        color: "#f8fafc",
      });
    } finally {
      setIsSavingJpeg(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Dynamic Ambient Background Illumination */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/12 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Subtle Geometric Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* ============================================================== */}
        {/* TOP FLOATING QUICK NAVIGATION & BRANDING BAR                   */}
        {/* ============================================================== */}
        <header className="sticky top-3 z-40 max-w-5xl mx-auto">
          <div className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-slate-950/85 backdrop-blur-2xl border border-slate-800/90 shadow-2xl shadow-black/80 flex items-center justify-between gap-3">
            {/* Brand Logo & Event Tag */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px] shrink-0 shadow-md shadow-amber-500/20">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-white tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-purple-200">
                    ২৭ তম মৈত্রী মহোৎসব
                  </span>
                  <span className="hidden md:inline px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    2026
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate hidden sm:block">
                  Coder & AccoTax • Barrackpore
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Links */}
            <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-amber-300 hover:bg-slate-900 transition cursor-pointer flex items-center gap-1"
              >
                <span>📝 Register</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const dir = document.getElementById("guest-directory");
                  dir?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-purple-300 hover:bg-slate-900 transition cursor-pointer flex items-center gap-1.5"
              >
                <span>👥 Guests</span>
                <span className="px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                  {stats.total}
                </span>
              </button>

              {/* Admin Access / Status Button */}
              {isAdmin ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="hidden sm:inline">Admin:</span>
                  <span className="text-white max-w-[90px] sm:max-w-[120px] truncate">
                    {currentUser?.employee?.employeeName || currentUser?.name || currentUser?.userName || "Admin"}
                  </span>
                  <button
                    type="button"
                    onClick={handleAdminLogout}
                    title="Sign out of Admin Mode"
                    className="p-0.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition cursor-pointer ml-1"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAdminLoginModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-500/30 text-amber-300 hover:text-white hover:border-amber-400 text-xs font-bold transition cursor-pointer shadow-sm shadow-amber-500/5 active:scale-95"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">Admin Sign In</span>
                  <span className="sm:hidden">Admin</span>
                </button>
              )}
            </nav>
          </div>
        </header>

        {/* ============================================================== */}
        {/* HERO HEADER SECTION                                            */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5 sm:space-y-6"
        >
          {/* Top Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-amber-500/5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
            <span>🌸 ২৭ তম মৈত্রী মহোৎসব ২০২৬ • 27th Maitri Mahotsav</span>
          </div>

          {/* Accessible H1 for SEO & screen readers */}
          <h1 className="sr-only">২৭ তম মৈত্রী মহোৎসব ২০২৬ • Maitri Mahotsav 2026 • Coder & AccoTax Barrackpore</h1>

          {/* Hero Banner Image Card */}
          <div className="my-1">
            <div className="relative inline-block w-full max-w-[280px] sm:max-w-md md:max-w-lg mx-auto group">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 via-rose-500/25 to-purple-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/40 shadow-2xl shadow-amber-500/10 bg-slate-950/80 p-2 sm:p-3">
                <img
                  src={maitriLogo}
                  alt="২৭ তম মৈত্রী মহোৎসব ২০২৬"
                  className="w-full h-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>

          {/* Welcoming Cultural Theme Quote Card */}
          <div className="inline-block px-5 py-3 sm:px-7 sm:py-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-500/25 backdrop-blur-xl shadow-xl shadow-amber-500/5 max-w-xl mx-auto space-y-1">
            <p className="text-sm sm:text-lg font-bold text-amber-200 tracking-wide font-serif">
              “আপনি অতিথিও, আবার আতিথেয়তাকারীও”
            </p>
            <p className="text-xs sm:text-sm font-semibold text-rose-200/95 font-hindi tracking-wide">
              “आप मेहमान भी हैं और मेज़बान भी”
            </p>
            <p className="text-[11px] sm:text-xs text-slate-300/90 italic">
              “You are the guest, yet you are the host too.”
            </p>
          </div>

          {/* Real-Time Live Event Countdown Timer */}
          <div className="max-w-2xl mx-auto pt-1">
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-2xl shadow-2xl space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Event Countdown: 1st November, 2026 • 7:30 PM IST</span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
                {[
                  { value: timeLeft.days, label: "Days", color: "from-amber-400 to-amber-600" },
                  { value: timeLeft.hours, label: "Hours", color: "from-rose-400 to-rose-600" },
                  { value: timeLeft.minutes, label: "Minutes", color: "from-purple-400 to-purple-600" },
                  { value: timeLeft.seconds, label: "Seconds", color: "from-cyan-400 to-cyan-600" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center shadow-inner"
                  >
                    <span className={`text-xl sm:text-3xl md:text-4xl font-black font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-b ${item.color}`}>
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Event Location & Schedule Meta Chips */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sunday, 1st November, 2026</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>7:30 PM Onwards</span>
                </span>

                <a
                  href="https://maps.google.com/?q=Coder+and+AccoTax+Barrackpore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 text-amber-300 hover:text-amber-200 transition"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Coder & AccoTax, Barrackpore</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 max-w-4xl mx-auto">
            {/* Total Registered */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-4 rounded-3xl bg-slate-900/70 border border-purple-500/25 hover:border-purple-500/40 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-xl shadow-purple-950/20 transition group"
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-2 group-hover:scale-110 transition">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white">{stats.total}</span>
              <span className="text-xs text-purple-200/80 font-semibold mt-0.5">Total Registered</span>
              <span className="text-[10px] text-purple-300/60 font-mono mt-0.5">Live Guest Count</span>
            </motion.div>

            {/* Non-Vegetarian Feast */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-4 rounded-3xl bg-slate-900/70 border border-rose-500/25 hover:border-rose-500/40 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-xl shadow-rose-950/20 transition group"
            >
              <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-300 mb-2 group-hover:scale-110 transition">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-rose-300">{stats.nonVeg}</span>
              <span className="text-xs text-rose-200/80 font-semibold mt-0.5">🍗 Non-Vegetarian</span>
              <span className="text-[10px] text-rose-300/70 font-mono mt-0.5">{stats.nonVegPct}% of attendees</span>
            </motion.div>

            {/* Vegetarian Feast */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-4 rounded-3xl bg-slate-900/70 border border-emerald-500/25 hover:border-emerald-500/40 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-xl shadow-emerald-950/20 transition group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-2 group-hover:scale-110 transition">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-300">{stats.veg}</span>
              <span className="text-xs text-emerald-200/80 font-semibold mt-0.5">🌱 Vegetarian</span>
              <span className="text-[10px] text-emerald-300/70 font-mono mt-0.5">{stats.vegPct}% of attendees</span>
            </motion.div>

            {/* Attending Guests */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-4 rounded-3xl bg-slate-900/70 border border-cyan-500/25 hover:border-cyan-500/40 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-xl shadow-cyan-950/20 transition group"
            >
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-2 group-hover:scale-110 transition">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-cyan-300">{stats.present}</span>
              <span className="text-xs text-cyan-200/80 font-semibold mt-0.5">Confirmed RSVP</span>
              <span className="text-[10px] text-cyan-300/70 font-mono mt-0.5">{stats.presentPct}% attendance</span>
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
                  <div
                    className={`mb-6 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isAdmin
                        ? "bg-gradient-to-r from-purple-950/60 via-slate-900 to-amber-950/40 border-purple-500/40 shadow-lg shadow-purple-950/40"
                        : "bg-amber-500/10 border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-sm font-medium">
                      {isAdmin ? (
                        <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
                      ) : (
                        <Edit3 className="w-4 h-4 text-amber-300 shrink-0" />
                      )}
                      <div>
                        <span className={isAdmin ? "text-purple-200 font-semibold" : "text-amber-300"}>
                          {isAdmin ? "Admin Edit Mode: " : "Editing details for "}
                          <strong className="text-white">{toProperCase(formData.guestName)}</strong>
                        </span>
                        {isAdmin && (
                          <p className="text-xs text-slate-400 font-normal mt-0.5">
                            Admin override active. You can update any detail without needing the attendee's PIN.
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition cursor-pointer self-start sm:self-auto"
                    >
                      Cancel Edit
                    </button>
                  </div>
                )}

                {/* Form Header */}
                <div className="text-center mb-8 space-y-2.5">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
                    {isEdit ? "Update Guest Information" : "Guest Registration"}
                  </h2>

                  {/* Welcoming Theme Quote Banner */}
                  <div className="inline-block px-4 py-2 sm:px-5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-500/25 backdrop-blur-md shadow-sm space-y-0.5 max-w-md mx-auto">
                    <p className="text-xs sm:text-sm font-bold text-amber-200 tracking-wide font-serif">
                      “আপনি অতিথিও, আবার আতিথেয়তাকারীও”
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-rose-200/95 font-hindi tracking-wide">
                      “आप मेहमान भी हैं और मेज़बान भी”
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-300/80 italic">
                      “You are the guest, yet you are the host too.”
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400">
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
                      onBlur={() => {
                        setFormData((prev) => ({
                          ...prev,
                          guestName: toProperCase(prev.guestName.trim()),
                        }));
                      }}
                      autoCapitalize="words"
                      autoComplete="name"
                      placeholder="e.g. Subhankar Roy"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm sm:text-base capitalize"
                    />

                    {/* Already Registered Guest Details Card */}
                    <AnimatePresence>
                      {existingGuest && !isEdit && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pt-2"
                        >
                          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/35 text-slate-200 space-y-3 shadow-xl shadow-amber-500/5 backdrop-blur-md">
                            {/* Alert Title & Token */}
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm">
                                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 animate-pulse" />
                                <span>Guest Already Registered!</span>
                              </div>
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40 tracking-wider">
                                {formatToken(existingGuest)}
                              </span>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                              An attendee under the name <strong className="text-white font-semibold">{toProperCase(existingGuest.guestName)}</strong> is already registered. Here are the existing details:
                            </p>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Entry Token</span>
                                <span className="font-mono font-bold text-amber-300 text-xs sm:text-sm">{formatToken(existingGuest)}</span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Registered Phone</span>
                                <span className="font-mono text-slate-200 text-xs sm:text-sm">
                                  {existingGuest.mobileMasked || maskPhone(existingGuest.mobile || existingGuest.wpNumber)}
                                </span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Feast Diet</span>
                                <span className="text-slate-200 text-xs sm:text-sm font-medium">
                                  {checkIsVeg(existingGuest) ? "🌱 Vegetarian" : "🍗 Non-Veg"}
                                </span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Age</span>
                                <span className="text-slate-200 text-xs sm:text-sm">{existingGuest.age || "N/A"} yrs</span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Gender</span>
                                <span className="text-slate-200 text-xs sm:text-sm">
                                  {existingGuest.genderName || (existingGuest.genderId === "2" ? "Female" : "Male")}
                                </span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Attendance</span>
                                <span className={checkIsAttending(existingGuest) ? "text-emerald-400 font-bold text-xs" : "text-amber-400 font-bold text-xs"}>
                                  {checkIsAttending(existingGuest) ? "✅ Confirmed" : "Invited"}
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-500/20">
                              <button
                                type="button"
                                onClick={() => handleViewExistingPass(existingGuest)}
                                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-amber-500/20 cursor-pointer active:scale-95"
                              >
                                <Ticket className="w-3.5 h-3.5" />
                                <span>View Event Pass</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleEdit(existingGuest)}
                                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 transition cursor-pointer active:scale-95"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                                <span>Update / Edit</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => sendWhatsApp(existingGuest)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs flex items-center gap-1.5 transition cursor-pointer active:scale-95"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Share on WhatsApp</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Age Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="age" className="flex items-center justify-between text-sm font-medium text-slate-200">
                      <span className="flex items-center gap-2">
                        <CalendarCheck className="w-4 h-4 text-amber-400" />
                        <span>Age <span className="text-slate-400 font-normal text-xs">(Optional)</span></span>
                      </span>
                      {formData.age && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            isAgeValid
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-rose-500/20 text-rose-400"
                          }`}
                        >
                          {isAgeValid ? "Valid" : "1–120"}
                        </span>
                      )}
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      min={1}
                      max={120}
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 35 (optional)"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm sm:text-base"
                    />
                  </div>

                  {/* Contact Numbers Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="mobile" className="flex items-center justify-between text-sm font-medium text-slate-200">
                        <span className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-cyan-400" />
                          <span>Mobile No. <span className="text-slate-400 font-normal text-xs">(Optional)</span></span>
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
                        placeholder="10-digit mobile number (optional)"
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
                        placeholder="10-digit WhatsApp number (required)"
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

                  {/* PIN Section */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4 shadow-inner">
                    <div className="flex items-center justify-between gap-2 flex-wrap pb-1 border-b border-slate-800/80">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>{isEdit ? "Security Authorization PIN" : "Security PIN for Self-Service & Protection"}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!isEdit && (
                          <button
                            type="button"
                            onClick={() => setShowPinExplanation((prev) => !prev)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-[11px] font-semibold transition cursor-pointer active:scale-95 shadow-sm"
                            title="Click to learn why a 4-digit PIN is needed"
                          >
                            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                            <span>Why do I need a PIN?</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showPinExplanation ? "rotate-180" : ""}`} />
                          </button>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                          4-Digit Key
                        </span>
                      </div>
                    </div>

                    {/* On-Demand Explanatory Info Accordion Card */}
                    <AnimatePresence>
                      {showPinExplanation && !isEdit && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -6 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-slate-900 border border-amber-500/30 space-y-2 text-xs relative shadow-md">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 text-amber-300 font-bold">
                                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>Why you need to set a 4-Digit Security PIN:</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowPinExplanation(false)}
                                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                                title="Close explanation"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <ul className="space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
                              <li className="flex items-start gap-2">
                                <span className="text-amber-400 font-bold">✓</span>
                                <span>
                                  <strong className="text-white font-semibold">Self-Service Pass Access:</strong> Allows you to re-download, reprint, or view your digital event pass anytime without re-registering.
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-amber-400 font-bold">✓</span>
                                <span>
                                  <strong className="text-white font-semibold">Prevent Unauthorized Edits:</strong> Only you can update your meal preference (Veg / Non-Veg) or contact details later.
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-amber-400 font-bold">✓</span>
                                <span>
                                  <strong className="text-white font-semibold">Fast Entrance Verification:</strong> Used as your confidential check-in code at the reception and buffet counters.
                                </span>
                              </li>
                            </ul>
                            <div className="pt-1 text-[10px] text-amber-200/90 font-medium italic flex items-center gap-1 border-t border-amber-500/15">
                              <span>💡 <strong>Tip:</strong> Choose an easy-to-remember 4-digit code (e.g. birth year or memorable 4 numbers).</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {isEdit ? (
                        <div className="space-y-1.5 col-span-1 sm:col-span-2">
                          {isAdmin ? (
                            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-purple-200 flex items-center gap-1.5">
                                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                                  <span>Admin Security PIN Override (Optional)</span>
                                </span>
                                <span className="text-[11px] text-purple-300 font-mono">
                                  {storedPin ? "PIN is set on record" : "No PIN set"}
                                </span>
                              </div>
                              <div className="relative">
                                <input
                                  type={showPin ? "text" : "password"}
                                  name="pin"
                                  maxLength={4}
                                  value={formData.pin}
                                  onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    setFormData((prev) => ({
                                      ...prev,
                                      pin: val,
                                      confirmPin: val,
                                    }));
                                  }}
                                  placeholder="Leave blank to preserve current PIN, or type 4 digits to reset"
                                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm tracking-widest"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPin(!showPin)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                                >
                                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                              <p className="text-[11px] text-slate-400">
                                🛡️ As an admin, you can save updates directly without knowing the guest's PIN. Entering 4 digits here will reset the guest's PIN.
                              </p>
                            </div>
                          ) : (
                            <>
                              <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <span>Enter Stored 4-Digit PIN <span className="text-rose-400">*</span></span>
                                </span>
                                {formData.pin && (
                                  <span
                                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                      formData.pin === storedPin
                                        ? "bg-emerald-500/20 text-emerald-400"
                                        : formData.pin.length === 4
                                        ? "bg-rose-500/20 text-rose-400"
                                        : "text-slate-400"
                                    }`}
                                  >
                                    {formData.pin === storedPin
                                      ? "✓ PIN Matched"
                                      : formData.pin.length === 4
                                      ? "✗ PIN Mismatch"
                                      : `${formData.pin.length}/4 digits`}
                                  </span>
                                )}
                              </label>
                              <div className="relative">
                                <input
                                  type={showPin ? "text" : "password"}
                                  name="pin"
                                  maxLength={4}
                                  value={formData.pin}
                                  onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    setFormData((prev) => ({
                                      ...prev,
                                      pin: val,
                                      confirmPin: val,
                                    }));
                                  }}
                                  placeholder="Enter the 4-digit PIN set during registration"
                                  required
                                  className={`w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 text-sm tracking-widest ${
                                    formData.pin.length === 4
                                      ? formData.pin === storedPin
                                      : "border-slate-700 focus:ring-amber-500"
                                  }`}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPin(!showPin)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                                >
                                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                              <p className="text-[11px] text-slate-400">
                                🔒 For security, you must enter the original 4-digit PIN matching this record to save updates.
                              </p>
                            </>
                          )}
                        </div>
                      ) : (
                        <>
                          {/* 4 Digit PIN */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                              <span>Set 4-Digit Security PIN <span className="text-rose-400">*</span></span>
                              {formData.pin && (
                                <span className={isPinValid ? "text-emerald-400 text-xs font-semibold" : "text-rose-400 text-xs"}>
                                  {formData.pin.length}/4 digits
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
                                placeholder="e.g. 1995"
                                required
                                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm tracking-widest font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPin(!showPin)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                                title={showPin ? "Hide PIN" : "Show PIN"}
                              >
                                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                            <span className="text-[10px] text-slate-500 block">4 numeric digits (0–9)</span>
                          </div>

                          {/* Confirm PIN */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                              <span>Confirm 4-Digit PIN <span className="text-rose-400">*</span></span>
                              {formData.confirmPin && (
                                <span className={isPinMatched ? "text-emerald-400 text-xs font-semibold flex items-center gap-1" : "text-rose-400 text-xs font-semibold"}>
                                  {isPinMatched ? "✓ Matched" : "✗ Mismatch"}
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
                                placeholder="Re-enter 4-digit PIN"
                                required
                                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm tracking-widest font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPin(!showConfirmPin)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                                title={showConfirmPin ? "Hide PIN" : "Show PIN"}
                              >
                                {showConfirmPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                            <span className="text-[10px] text-slate-500 block">Re-type to confirm</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Gender & Food Preferences Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Gender Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-200 block">
                        Gender <span className="text-rose-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Male Button */}
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, genderId: "1" }))}
                          className={`py-2 px-3 rounded-xl border text-sm font-medium transition flex items-center justify-between gap-2 cursor-pointer ${
                            formData.genderId === "1"
                              ? "bg-gradient-to-r from-sky-950/70 via-slate-900 to-sky-950/40 border-sky-500 text-white shadow-lg shadow-sky-950/50 ring-1 ring-sky-500/30"
                              : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition ${
                                formData.genderId === "1"
                                  ? "bg-sky-500 text-slate-950 shadow-sm"
                                  : "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                              }`}
                            >
                              <ManLogo className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-sm truncate">Male</span>
                          </div>
                          {formData.genderId === "1" && (
                            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 ml-auto" />
                          )}
                        </button>

                        {/* Female Button */}
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, genderId: "2" }))}
                          className={`py-2 px-3 rounded-xl border text-sm font-medium transition flex items-center justify-between gap-2 cursor-pointer ${
                            formData.genderId === "2"
                              ? "bg-gradient-to-r from-pink-950/70 via-slate-900 to-pink-950/40 border-pink-500 text-white shadow-lg shadow-pink-950/50 ring-1 ring-pink-500/30"
                              : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition ${
                                formData.genderId === "2"
                                  ? "bg-pink-500 text-slate-950 shadow-sm"
                                  : "bg-pink-500/15 text-pink-400 border border-pink-500/30"
                              }`}
                            >
                              <WomanLogo className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-sm truncate">Female</span>
                          </div>
                          {formData.genderId === "2" && (
                            <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 ml-auto" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Food Preference Cards */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-200 block">
                        Food Preference <span className="text-rose-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Non-Veg Button */}
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, foodPreferenceId: "2" }))}
                          className={`py-2 px-3 rounded-xl border text-sm font-medium transition flex items-center justify-between gap-2 cursor-pointer ${
                            formData.foodPreferenceId === "2"
                              ? "bg-gradient-to-r from-rose-950/70 via-slate-900 to-rose-950/40 border-rose-500 text-white shadow-lg shadow-rose-950/50 ring-1 ring-rose-500/30"
                              : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition ${
                                formData.foodPreferenceId === "2"
                                  ? "bg-rose-500 text-white shadow-sm"
                                  : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                              }`}
                            >
                              <span className="text-sm leading-none">🍗</span>
                            </div>
                            <span className="font-semibold text-sm truncate">Non-Veg</span>
                          </div>
                          {formData.foodPreferenceId === "2" && (
                            <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 ml-auto" />
                          )}
                        </button>

                        {/* Veg Button */}
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, foodPreferenceId: "1" }))}
                          className={`py-2 px-3 rounded-xl border text-sm font-medium transition flex items-center justify-between gap-2 cursor-pointer ${
                            formData.foodPreferenceId === "1"
                              ? "bg-gradient-to-r from-emerald-950/70 via-slate-900 to-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/30"
                              : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition ${
                                formData.foodPreferenceId === "1"
                                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                                  : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              }`}
                            >
                              <span className="text-sm leading-none">🌱</span>
                            </div>
                            <span className="font-semibold text-sm truncate">Veg</span>
                          </div>
                          {formData.foodPreferenceId === "1" && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-auto" />
                          )}
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
                  <label className={`flex items-start sm:items-center gap-3 p-3.5 rounded-2xl transition cursor-pointer ${
                    isEdit && isAdmin
                      ? "bg-purple-950/30 border border-purple-500/40 ring-1 ring-purple-500/20"
                      : "bg-slate-950/50 border border-slate-800 hover:border-slate-700"
                  }`}>
                    <input
                      type="checkbox"
                      name="is_present"
                      checked={formData.is_present}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 sm:mt-0 rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500 shrink-0 cursor-pointer"
                    />
                    <div className="text-sm flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-slate-100">
                          {formData.is_present ? "Confirmed Attending ২৭ তম মৈত্রী মহোৎসব ২০২৬" : "Not Attending (Absent / Regrets)"}
                        </span>
                        {isEdit && isAdmin && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                            🛡️ Admin Attendance Override
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formData.is_present
                          ? "Marked as attending on 1st Nov, 2026 • 7:30 PM onwards at Coder & AccoTax."
                          : "Attendee will be marked as not attending (excluded from active catering headcount)."}
                      </p>
                    </div>
                  </label>

                  {/* Live Validation Checklist */}
                  {!isValid() && (
                    <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-400 space-y-1">
                      <span className="font-semibold text-slate-300 block mb-1">To proceed, please ensure:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        <span className={isNameValid ? "text-emerald-400 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                          {isNameValid ? "✓" : "✗"} Full Name (min 2 chars)
                        </span>
                        <span className={isAgeValid ? "text-emerald-400 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                          {isAgeValid ? "✓" : "✗"} Age (3–85)
                        </span>
                        <span className={isMobileValid ? "text-emerald-400 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                          {isMobileValid ? "✓" : "✗"} 10-Digit Mobile Number
                        </span>
                        <span className={isWpValid ? "text-emerald-400 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                          {isWpValid ? "✓" : "✗"} 10-Digit WhatsApp No.
                        </span>
                        <span className={isPinMatched ? "text-emerald-400 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                          {isPinMatched ? "✓" : "✗"} {isEdit && isAdmin ? "Admin Authorized" : isEdit ? "Matching Stored PIN" : "Matching 4-Digit PIN"}
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
              /* SUCCESS SCREEN / DIGITAL VIP EVENT PASS                       */
              /* ============================================================== */
              <motion.div
                key="pass-container"
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -15 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative rounded-3xl bg-slate-900/90 border border-amber-500/30 p-4 sm:p-7 shadow-2xl backdrop-blur-2xl space-y-6 overflow-hidden"
              >
                {/* Print styling for direct pass printing */}
                <style>{`
                  @media print {
                    body * {
                      visibility: hidden !important;
                    }
                    #bijoya-event-ticket, #bijoya-event-ticket * {
                      visibility: visible !important;
                    }
                    #bijoya-event-ticket {
                      position: fixed !important;
                      left: 50% !important;
                      top: 20px !important;
                      transform: translateX(-50%) !important;
                      width: 100% !important;
                      max-width: 560px !important;
                      background: #ffffff !important;
                      color: #0f172a !important;
                      border: 2px solid #cbd5e1 !important;
                      box-shadow: none !important;
                      padding: 24px !important;
                    }
                    #bijoya-event-ticket .print-hide {
                      display: none !important;
                    }
                    #bijoya-event-ticket .text-white {
                      color: #0f172a !important;
                    }
                    #bijoya-event-ticket .text-slate-200,
                    #bijoya-event-ticket .text-slate-300,
                    #bijoya-event-ticket .text-slate-400 {
                      color: #475569 !important;
                    }
                    #bijoya-event-ticket .bg-slate-950\\/80,
                    #bijoya-event-ticket .bg-slate-900\\/60 {
                      background: #f8fafc !important;
                      border-color: #e2e8f0 !important;
                    }
                  }
                `}</style>

                {/* Ambient Top Glow */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-28 bg-gradient-to-r from-amber-500/20 via-rose-500/25 to-purple-500/20 blur-3xl pointer-events-none rounded-full" />

                {/* Celebratory Header */}
                <div className="text-center space-y-3 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold shadow-lg shadow-amber-500/10">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
                    <span>🌸 ২৭ তম মৈত্রী মহোৎসব ২০২৬ • 27th MAITRI MAHOTSAV 🌸</span>
                  </div>

                  <div className="flex justify-center my-1">
                    <div className="overflow-hidden rounded-2xl border border-amber-500/40 shadow-xl max-w-[240px] sm:max-w-[280px]">
                      <img
                        src={maitriLogo}
                        alt="২৭ তম মৈত্রী মহোৎসব"
                        className="w-full h-auto object-contain mx-auto"
                      />
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Registration Confirmed! 🎉
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Welcome to <strong>২৭ তম মৈত্রী মহোৎসব ২০২৬</strong> (Maitri Mahotsav 2026) on <strong>1st November, 2026 at 7:30 PM onwards</strong> at <strong>Coder & AccoTax</strong>. Your digital invitation pass is ready!
                  </p>
                  <p className="text-xs sm:text-sm text-amber-200/90 font-medium italic mt-1 font-serif">
                    “আপনি অতিথিও, আবার আতিথেয়তাকারীও” • <span className="font-hindi not-italic font-semibold text-rose-200">“आप मेहमान भी हैं और मेज़बान भी”</span> • “You are the guest, yet you are the host too.”
                  </p>
                </div>

                {/* ============================================================== */}
                {/* THE VIP PERFORATED EVENT TICKET                                */}
                {/* ============================================================== */}
                <div
                  ref={ticketRef}
                  id="bijoya-event-ticket"
                  className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 shadow-2xl p-4 sm:p-6 space-y-4 overflow-hidden"
                >
                  {/* Top Golden Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500" />

                  {/* Ticket Header & Branding */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Ticket className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                          Coder & AccoTax Presents
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5 flex-wrap">
                          <span className="text-amber-300">২৭ তম মৈত্রী মহোৎসব</span>
                          <span className="text-slate-500">•</span>
                          <span>2026</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] sm:text-xs font-bold tracking-wide shadow-sm">
                        <Award className="w-3 h-3 text-amber-400" />
                        <span>VIP PASS</span>
                      </div>
                      <span className="text-[10px] text-amber-300/80 font-mono font-semibold mt-0.5">1st Nov • 7:30 PM</span>
                    </div>
                  </div>

                  {/* Official Festive Calligraphy Emblem on Ticket */}
                  <div className="overflow-hidden rounded-2xl border border-amber-500/40 shadow-md">
                    <img
                      src={maitriLogo}
                      alt="২৭ তম মৈত্রী মহোৎসব"
                      className="w-full h-auto max-h-28 object-cover sm:object-contain mx-auto"
                    />
                  </div>

                  {/* Entry Token Hero Card */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                    <div>
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-0.5">
                        Digital Entry Token
                      </span>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-black font-mono tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-purple-300 select-all">
                        {formatToken(savedGuests)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyToken}
                      className="print-hide self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer shadow-sm"
                    >
                      {copiedToken ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Token</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Perforated Cutout Notches & Tear Line */}
                  <div className="relative py-1">
                    {/* Left Cutout */}
                    <div className="absolute -left-7 sm:-left-9 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-900 border border-amber-500/40" />
                    {/* Dashed Tear Line */}
                    <div className="border-t-2 border-dashed border-slate-700/80 mx-2 sm:mx-3" />
                    {/* Right Cutout */}
                    <div className="absolute -right-7 sm:-right-9 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-900 border border-amber-500/40" />
                  </div>

                  {/* Attendee Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-left">
                    {/* Guest Name */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 col-span-2 sm:col-span-1">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block">Guest Name</span>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="text-sm sm:text-base font-bold text-white truncate">
                          {toProperCase(savedGuests.guestName) || "Guest Attendee"}
                        </span>
                        {savedGuests.genderId === "2" || savedGuests.genderName === "Female" ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-pink-500/15 border border-pink-500/30 text-pink-300 shrink-0">
                            <WomanLogo className="w-3 h-3" /> Female
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/15 border border-sky-500/30 text-sky-300 shrink-0">
                            <ManLogo className="w-3 h-3" /> Male
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block">Contact</span>
                      <span className="text-xs sm:text-sm font-mono font-semibold text-slate-200 block truncate mt-0.5">
                        {savedGuests.mobileMasked || savedGuests.mobile || "—"}
                      </span>
                    </div>

                    {/* Food Preference */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block mb-1">Feast Diet</span>
                      {checkIsVeg(savedGuests) ? (
                        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                          <Leaf className="w-3 h-3 text-emerald-400" />
                          <span>🌱 Veg</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300">
                          <Utensils className="w-3 h-3 text-rose-400" />
                          <span>🍗 Non-Veg</span>
                        </span>
                      )}
                    </div>

                    {/* Event Date & Time */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block">Date & Time</span>
                      <div className="text-xs sm:text-sm font-bold text-amber-300 flex flex-col gap-0.5 mt-0.5">
                        <span className="flex items-center gap-1">
                          <CalendarCheck className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                          <span>1st Nov, 2026</span>
                        </span>
                        <span className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-amber-200/90">
                          <Clock className="w-3 h-3 shrink-0 text-amber-400" />
                          <span>7:30 PM onwards</span>
                        </span>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block">Venue</span>
                      <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                        <span className="truncate">Coder & AccoTax</span>
                      </span>
                    </div>

                    {/* Attendance Status */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block mb-1">Status</span>
                      <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Confirmed</span>
                      </span>
                    </div>
                  </div>

                  {/* Theme Quote on Ticket (Saved in JPEG) */}
                  <div className="py-2.5 px-3 rounded-xl bg-slate-950/70 border border-amber-500/20 text-center space-y-0.5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                    <p className="text-xs sm:text-sm font-bold text-amber-200 tracking-wide font-serif">
                      “আপনি অতিথিও, আবার আতিথেয়তাকারীও”
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-rose-200/95 font-hindi tracking-wide">
                      “आप मेहमान भी हैं और मेज़बान भी”
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-400 italic">
                      “You are the guest, yet you are the host too.”
                    </p>
                  </div>

                  {/* Direct Pass Action Buttons (WhatsApp, Save JPEG & Print) */}
                  <div className="ticket-export-hide print-hide pt-2 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                    {(savedGuests.wpNumber || savedGuests.mobile) && (
                      <button
                        type="button"
                        onClick={() => sendWhatsApp(savedGuests)}
                        className="w-full sm:flex-1 py-3 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                        <span className="truncate">Send to WhatsApp</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleSaveJpeg}
                      disabled={isSavingJpeg}
                      className="w-full sm:flex-1 py-3 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                    >
                      {isSavingJpeg ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                          <span>Saving JPEG...</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4 shrink-0" />
                          <span>Save as JPEG</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-slate-300 shrink-0" />
                      <span>Print Pass</span>
                    </button>
                  </div>

                  {/* Security PIN Self-Service Reminder on Pass */}
                  <div className="ticket-export-hide print-hide pt-1 flex items-center justify-center gap-1.5 text-[11px] text-amber-300/90 bg-amber-500/10 py-1.5 px-3 rounded-xl border border-amber-500/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Remember your 4-digit PIN for future self-service edits or pass re-downloads.</span>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* COMPACT GOOGLE REVIEW & FEEDBACK CARD                          */}
                {/* ============================================================== */}
                <div className="rounded-2xl bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-950/80 border border-amber-500/20 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-lg">
                  {/* Compact QR Code */}
                  <div className="p-2 bg-white rounded-xl shadow-md shrink-0 border border-slate-200">
                    <img src={qr} alt="Google Review QR" className="w-20 h-20 sm:w-22 sm:h-22 object-contain" />
                    <span className="text-[9px] font-bold text-slate-800 block text-center mt-1 uppercase tracking-tight">
                      Scan to Review
                    </span>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-amber-300 ml-1">5-Star Review</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white">
                      Share Your Experience on Google ⭐
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                      Your valuable feedback helps Coder & AccoTax grow. Scan the QR code or tap the button below.
                    </p>

                    <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                      <a
                        href="https://g.page/r/CTBkwqHJ6mZ2EBM/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition"
                      >
                        <span>Write Google Review</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://www.facebook.com/profile.php?id=61561702110617"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span>Follow on Facebook</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://www.instagram.com/codernaccotax"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:opacity-90 active:scale-95 text-white font-bold text-xs shadow-md shadow-pink-600/20 transition"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span>Follow on Instagram</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* BOTTOM NAVIGATION ACTIONS                                      */}
                {/* ============================================================== */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSaved(false);
                      resetForm();
                    }}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 active:scale-98 text-white font-bold text-sm shadow-lg shadow-purple-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Register Another Guest</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSaved(false);
                      const directoryElement = document.getElementById("guest-directory");
                      if (directoryElement) {
                        directoryElement.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:scale-98 text-slate-200 font-semibold text-sm border border-slate-700 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>View Guest Directory</span>
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

            {/* Controls Ribbon */}
            <div className="flex flex-wrap items-center gap-2">
              {isAdmin ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin Active</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAdminLoginModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-xs font-semibold transition cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Sign In</span>
                </button>
              )}

              {/* LOGICAL DUPLICATE FINDER (ONLY ADMIN CAN DO THAT) */}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setShowDuplicateModal(true)}
                  title="Logically scan and detect duplicate guest registrations across mobile, WhatsApp, and names"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                    duplicateAnalysis.totalDuplicates > 0
                      ? "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10"
                      : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800"
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5 text-amber-400" />
                  <span>Find Duplicates</span>
                  {duplicateAnalysis.totalDuplicates > 0 ? (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] leading-none">
                      {duplicateAnalysis.totalDuplicates}
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium text-[10px] leading-none">
                      0
                    </span>
                  )}
                </button>
              )}

              <button
                onClick={getAllGuest}
                disabled={isLoading}
                title="Refresh List"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>

              <button
                onClick={exportToCSV}
                title="Export CSV"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              {/* View Toggle */}
              <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                    viewMode === "table"
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="Table View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Box */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, mobile, or #token..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="sm:col-span-6 flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: `All (${stats.total})` },
                { id: "present", label: `Attending (${stats.present})` },
                { id: "veg", label: `Veg (${stats.veg})` },
                { id: "non-veg", label: `Non-Veg (${stats.nonVeg})` },
                ...(isAdmin
                  ? [
                      {
                        id: "duplicates",
                        label: `Duplicates (${duplicateAnalysis.totalDuplicates})`,
                        isAdminPill: true,
                      },
                    ]
                  : []),
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                    activeFilter === filter.id
                      ? filter.isAdminPill
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/10"
                        : "bg-purple-500/20 border-purple-500/40 text-purple-200"
                      : filter.isAdminPill
                        ? "bg-slate-900/80 border-slate-800 text-amber-400/80 hover:text-amber-300 hover:border-amber-500/30"
                        : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {filter.isAdminPill && <GitCompare className="w-3 h-3 text-amber-400" />}
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Admin Active Duplicate Banner */}
          {isAdmin && activeFilter === "duplicates" && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-200 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <GitCompare className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white text-sm block">
                    Showing {duplicateAnalysis.totalDuplicates} Duplicate Entries ({duplicateAnalysis.totalClusters} Clusters)
                  </strong>
                  <span className="text-slate-300">
                    Entries filtered logically by matching 10-digit phone numbers, WhatsApp numbers, or identical names.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={exportDuplicatesToCSV}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV Report</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowDuplicateModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Open Side-by-Side Reviewer</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* Directory Content */}
          {filteredGuests.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
              <Users className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-base font-bold text-slate-300">No guests found</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {searchQuery
                  ? "No results matched your search criteria. Try modifying your query."
                  : "No guests have registered yet. Fill out the form above to register the first attendee!"}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            /* --- GRID VIEW --- */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGuests.map((guest, idx) => {
                const isVeg = checkIsVeg(guest);
                const isAtt = checkIsAttending(guest);

                return (
                  <motion.div
                    key={guest.guestId || guest.id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 backdrop-blur-xl transition space-y-4 shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Tag & Token */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                          {formatToken(guest)}
                        </span>

                        <span className="text-[11px] text-slate-500">
                          {guest.createdAt ? new Date(guest.createdAt).toLocaleDateString() : ""}
                        </span>
                      </div>

                      {/* Guest Name & Phone */}
                      <div className="mt-3">
                        <h3 className="text-base font-bold text-white truncate">{toProperCase(guest.guestName)}</h3>
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                          <p className="text-xs font-mono text-slate-400">
                            {guest.mobileMasked || guest.mobile || guest.wpNumberMasked || guest.wpNumber || "No Phone"}
                          </p>

                          {/* Linked Family Group Badge or Shared Phone Trigger */}
                          {(() => {
                            const rawPhone = guest.mobile || guest.wpNumber || "";
                            const clean = rawPhone.replace(/\D/g, "").slice(-10);
                            if (!clean || clean.length < 10) return null;
                            const familyGroup = linkedPhoneGroups[clean];
                            const sharedGuests = getGuestsByPhone(clean);

                            if (familyGroup?.isLinked) {
                              return (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenLinkModalForPhone(clean, sharedGuests);
                                  }}
                                  className="px-2 py-0.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 flex items-center gap-1 transition cursor-pointer"
                                  title={`Linked to ${familyGroup.groupName} (${sharedGuests.length} Guests) - Click to manage`}
                                >
                                  <Users className="w-3 h-3" />
                                  <span>{familyGroup.groupName || "Family Group"} ({sharedGuests.length})</span>
                                </button>
                              );
                            }

                            if (sharedGuests.length > 1) {
                              return (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenLinkModalForPhone(clean, sharedGuests);
                                  }}
                                  className="px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[10px] font-bold text-amber-300 flex items-center gap-1 transition cursor-pointer"
                                  title={`${sharedGuests.length} attendees share this phone - Click to link as Family`}
                                >
                                  <Link2 className="w-3 h-3" />
                                  <span>Shared Phone ({sharedGuests.length})</span>
                                </button>
                              );
                            }

                            return null;
                          })()}
                        </div>
                      </div>

                      {/* Badges Ribbon */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                            isVeg
                              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                              : "bg-rose-500/15 border border-rose-500/30 text-rose-300"
                          }`}
                        >
                          {isVeg ? "🌱 Veg" : "🍗 Non-Veg"}
                        </span>

                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 inline-flex items-center gap-1">
                          {(guest.genderId === "2" || guest.genderName === "Female") ? (
                            <>
                              <WomanLogo className="w-3.5 h-3.5 text-pink-400" />
                              <span>Female</span>
                            </>
                          ) : (
                            <>
                              <ManLogo className="w-3.5 h-3.5 text-sky-400" />
                              <span>Male</span>
                            </>
                          )}
                        </span>

                        {/* Attendance Status & Admin 1-Click Toggle */}
                        {isAdmin ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleAttendance(guest);
                            }}
                            title={isAtt ? "Admin: Click to mark as Not Attending" : "Admin: Click to mark as Attending"}
                            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border transition cursor-pointer flex items-center gap-1 group shadow-sm ${
                              isAtt
                                ? "bg-cyan-500/15 hover:bg-rose-500/20 text-cyan-300 hover:text-rose-300 border-cyan-500/30 hover:border-rose-500/40"
                                : "bg-slate-800 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border-slate-700 hover:border-cyan-500/40"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full transition ${
                                isAtt
                                  ? "bg-cyan-400 group-hover:bg-rose-400"
                                  : "bg-slate-500 group-hover:bg-cyan-400"
                              }`}
                            />
                            <span className="group-hover:hidden">{isAtt ? "Attending" : "Not Attending"}</span>
                            <span className="hidden group-hover:inline">{isAtt ? "Mark Absent" : "Mark Attending"}</span>
                          </button>
                        ) : (
                          isAtt && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
                              Attending
                            </span>
                          )
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
                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      {/* Primary WhatsApp Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => sendWhatsApp(guest)}
                          title="Quick 1-Click Official Invitation"
                          className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">Send Invite</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openMessageModal(guest, "custom")}
                          title="Compose Custom WhatsApp Message"
                          className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="truncate">Custom Msg</span>
                        </button>
                      </div>

                      {/* Admin Governance Actions: Edit & Delete */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                        <span className="text-[10px] text-slate-500 font-mono">
                          {isAdmin ? "Admin Controls:" : "Attendee Actions:"}
                        </span>

                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEdit(guest)}
                            title={isAdmin ? "Edit Details (Admin Override)" : "Edit Details (Requires PIN)"}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-semibold border border-purple-500/30 transition cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(guest)}
                            title={isAdmin ? "Delete Guest (Admin)" : "Delete Guest (Admin Required)"}
                            className={`p-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                              isAdmin
                                ? "bg-rose-600/15 hover:bg-rose-600/30 text-rose-300 border-rose-500/30"
                                : "bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border-slate-700"
                            }`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
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
                    <th className="px-4 py-3.5 font-semibold">Attendance</th>
                    <th className="px-4 py-3.5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredGuests.map((guest, idx) => {
                    const isVeg = checkIsVeg(guest);
                    const isAtt = checkIsAttending(guest);

                    return (
                      <tr key={guest.guestId || guest.id || idx} className="hover:bg-slate-800/40 transition">
                        <td className="px-4 py-3 text-xs text-slate-500">{idx + 1}</td>
                        <td className="px-4 py-3 font-mono font-bold text-amber-400 text-xs">
                          {formatToken(guest)}
                        </td>
                        <td className="px-4 py-3 font-semibold text-white">
                          <div>{toProperCase(guest.guestName)}</div>
                          {guest.address && (
                            <div className="text-xs text-slate-400 font-normal">{guest.address}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-300">
                          <div>{guest.mobileMasked || guest.mobile || guest.wpNumberMasked || guest.wpNumber || "-"}</div>
                          {/* Table Row Linked Group / Shared Phone Badge */}
                          {(() => {
                            const rawPhone = guest.mobile || guest.wpNumber || "";
                            const clean = rawPhone.replace(/\D/g, "").slice(-10);
                            if (!clean || clean.length < 10) return null;
                            const familyGroup = linkedPhoneGroups[clean];
                            const sharedGuests = getGuestsByPhone(clean);

                            if (familyGroup?.isLinked) {
                              return (
                                <button
                                  type="button"
                                  onClick={() => handleOpenLinkModalForPhone(clean, sharedGuests)}
                                  className="mt-1 px-1.5 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-[9px] font-bold text-emerald-300 inline-flex items-center gap-1 transition cursor-pointer"
                                  title="Linked Family Group"
                                >
                                  <Users className="w-2.5 h-2.5" />
                                  <span className="truncate max-w-[110px]">{familyGroup.groupName || "Family"} ({sharedGuests.length})</span>
                                </button>
                              );
                            }

                            if (sharedGuests.length > 1) {
                              return (
                                <button
                                  type="button"
                                  onClick={() => handleOpenLinkModalForPhone(clean, sharedGuests)}
                                  className="mt-1 px-1.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[9px] font-bold text-amber-300 inline-flex items-center gap-1 transition cursor-pointer"
                                  title="Shared Phone - Click to link"
                                >
                                  <Link2 className="w-2.5 h-2.5" />
                                  <span>Shared ({sharedGuests.length})</span>
                                </button>
                              );
                            }

                            return null;
                          })()}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                              isVeg
                                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                            }`}
                          >
                            {isVeg ? "🌱 Veg" : "🍗 Non-Veg"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-300">
                          <span className="inline-flex items-center gap-1.5">
                            {(guest.genderId === "2" || guest.genderName === "Female") ? (
                              <>
                                <WomanLogo className="w-3.5 h-3.5 text-pink-400" />
                                <span>Female</span>
                              </>
                            ) : (
                              <>
                                <ManLogo className="w-3.5 h-3.5 text-sky-400" />
                                <span>Male</span>
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {isAdmin ? (
                            <button
                              type="button"
                              onClick={() => handleToggleAttendance(guest)}
                              title={isAtt ? "Admin: Click to mark as Not Attending" : "Admin: Click to mark as Attending"}
                              className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 group shadow-sm ${
                                isAtt
                                  ? "bg-cyan-500/15 hover:bg-rose-500/20 text-cyan-300 hover:text-rose-300 border-cyan-500/30 hover:border-rose-500/40"
                                  : "bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 border-slate-700 hover:border-emerald-500/40"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full transition ${
                                  isAtt
                                    ? "bg-cyan-400 group-hover:bg-rose-400"
                                    : "bg-slate-500 group-hover:bg-emerald-400"
                                }`}
                              />
                              <span className="group-hover:hidden">{isAtt ? "Attending" : "Not Attending"}</span>
                              <span className="hidden group-hover:inline font-bold">
                                {isAtt ? "Mark Absent ❌" : "Mark Attending ✅"}
                              </span>
                            </button>
                          ) : (
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                                isAtt
                                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {isAtt ? "Attending" : "Invited"}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {/* Quick Send Invite */}
                            <button
                              type="button"
                              onClick={() => sendWhatsApp(guest)}
                              title="Quick 1-Click Official Invitation"
                              className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition cursor-pointer"
                            >
                              <MessageCircle className="w-4 h-4 text-emerald-400" />
                            </button>

                            {/* Custom Message Modal */}
                            <button
                              type="button"
                              onClick={() => openMessageModal(guest, "custom")}
                              title="Compose Custom Message"
                              className="p-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 transition cursor-pointer"
                            >
                              <Send className="w-4 h-4 text-indigo-400" />
                            </button>

                            {/* Edit */}
                            <button
                              type="button"
                              onClick={() => handleEdit(guest)}
                              title={isAdmin ? "Edit Details (Admin Override)" : "Edit Details (Requires PIN)"}
                              className="p-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4 text-purple-400" />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDelete(guest)}
                              title={isAdmin ? "Delete Guest (Admin)" : "Delete Guest (Admin Required)"}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                isAdmin
                                  ? "bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border-rose-500/30"
                                  : "bg-slate-800 text-slate-400 hover:text-rose-400 border-slate-700"
                              }`}
                            >
                              <Trash2 className="w-4 h-4" />
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

      {/* ============================================================== */}
      {/* WHATSAPP MESSAGE COMPOSER MODAL (OFFICIAL & CUSTOM)           */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isMessageModalOpen && messageRecipient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-8"
            >
              {/* Top Accent Gradient */}
              <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-indigo-500" />

              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <span>WhatsApp Message Composer</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Send official invitations or compose customized messages to attendees.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMessageModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                {/* Recipient Information Card */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">
                        {toProperCase(messageRecipient.guestName)}
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {formatToken(messageRecipient)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                      <span>Meal: <strong className="text-slate-200">{checkIsVeg(messageRecipient) ? "🌱 Veg" : "🍗 Non-Veg"}</strong></span>
                      <span>•</span>
                      <span>Status: <strong className="text-cyan-300">{checkIsAttending(messageRecipient) ? "Attending" : "Invited"}</strong></span>
                    </div>
                  </div>

                  {/* Target Phone Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Send to:</span>
                    <div className="inline-flex rounded-xl bg-slate-900 border border-slate-700/80 p-1 text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedPhoneType("wp")}
                        className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                          selectedPhoneType === "wp"
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        WhatsApp ({messageRecipient.wpNumber || messageRecipient.mobile || "—"})
                      </button>
                      {messageRecipient.mobile && messageRecipient.mobile !== messageRecipient.wpNumber && (
                        <button
                          type="button"
                          onClick={() => setSelectedPhoneType("mobile")}
                          className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                            selectedPhoneType === "mobile"
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Mobile ({messageRecipient.mobile})
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Template Selection Pills */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Message Template
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "invitation", label: "🌸 Official Invitation" },
                      { id: "reminder", label: "⏰ Event Reminder" },
                      { id: "confirmation", label: "🍽️ Feast & Catering" },
                      { id: "feedback", label: "⭐ Google Review" },
                      { id: "custom", label: "✍️ Custom Message" },
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => handleTemplateChange(tpl.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                          selectedTemplate === tpl.id
                            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200 shadow-sm"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Placeholder Insertion Chips */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">Quick Insert Variables:</span>
                    <span className="text-[11px] text-slate-500">Click to insert tag at end</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "{name}", desc: "Guest Name" },
                      { label: "{token}", desc: "Token No." },
                      { label: "{food}", desc: "Veg/Non-Veg" },
                      { label: "{date}", desc: "1st Nov 2026" },
                      { label: "{time}", desc: "7:30 PM" },
                      { label: "{venue}", desc: "Coder & AccoTax" },
                      { label: "{review_link}", desc: "Google Review URL" },
                    ].map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => setCustomMessageText((prev) => prev + " " + chip.label)}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700/80 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 text-[11px] font-mono transition cursor-pointer flex items-center gap-1"
                        title={chip.desc}
                      >
                        <span className="text-emerald-400 font-bold">+</span>
                        <span>{chip.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Message Content
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {customMessageText.length} chars • {customMessageText.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={customMessageText}
                    onChange={(e) => setCustomMessageText(e.target.value)}
                    placeholder="Type your message here. You can use WhatsApp markdown like *bold*, _italics_, and emojis..."
                    className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y leading-relaxed"
                  />
                </div>

                {/* Live Preview Card (WhatsApp Bubble Style) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Live Preview (As Recipient Sees on WhatsApp)
                  </span>
                  <div className="p-4 rounded-2xl bg-[#0b141a] border border-slate-800 relative overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] text-emerald-400/90 pb-2 mb-2 border-b border-slate-800 font-sans">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Chat with {toProperCase(messageRecipient.guestName)}
                      </span>
                      <span className="text-slate-500 text-[10px]">Preview</span>
                    </div>
                    <div className="max-w-[90%] p-3.5 rounded-2xl rounded-tl-sm bg-[#005c4b] text-white text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-md">
                      {resolveMessagePlaceholders(customMessageText, messageRecipient)}
                      <div className="text-right text-[10px] text-emerald-200/60 mt-1 flex items-center justify-end gap-1">
                        <span>Just now</span>
                        <Check className="w-3 h-3 text-emerald-300 inline" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCopyCustomMessage}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {copiedCustomMessage ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Message</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsMessageModalOpen(false)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSendFromModal}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* ADMIN LOGIN MODAL                                              */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showAdminLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-purple-500/40 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-5"
            >
              <div className="h-1.5 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 -mx-7 -mt-7 mb-5" />

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Administrator Access</h3>
                    <p className="text-xs text-slate-400">Sign in to manage attendee records & communication</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdminLoginModal(false)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {adminLoginForm.error && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminLoginForm.error}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Username or Email</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      autoComplete="username"
                      autoCapitalize="none"
                      spellCheck="false"
                      value={adminLoginForm.email}
                      onChange={(e) => setAdminLoginForm((prev) => ({ ...prev, email: e.target.value, error: "" }))}
                      placeholder="Username or email (e.g. sukantahui)"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={adminLoginForm.showPassword ? "text" : "password"}
                      required
                      value={adminLoginForm.password}
                      onChange={(e) => setAdminLoginForm((prev) => ({ ...prev, password: e.target.value, error: "" }))}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setAdminLoginForm((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      {adminLoginForm.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminLoginModal(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold border border-slate-700 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={adminLoginForm.loading}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white text-sm font-bold shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {adminLoginForm.loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* ============================================================== */}
      {/* LOGICAL DUPLICATE RESOLUTION MODAL (ADMIN ONLY)                */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showDuplicateModal && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Top Accent Gradient */}
              <div className="h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 w-full shrink-0" />

              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0 bg-slate-900/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
                    <GitCompare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        Duplicate Entry Analyzer
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] border border-amber-500/30">
                        Admin Only 🛡️
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Logical detection and resolution across phone numbers, WhatsApp numbers, names, and emails.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {duplicateAnalysis.totalClusters > 0 && (
                    <button
                      type="button"
                      onClick={exportDuplicatesToCSV}
                      title="Download Duplicates Audit Report"
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Export CSV</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowDuplicateModal(false)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* KPI Metrics Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-4 sm:px-6 bg-slate-950/60 border-b border-slate-800/80 shrink-0 text-center">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                    Duplicate Records
                  </span>
                  <span className="text-lg font-bold text-amber-400 font-mono">
                    {duplicateAnalysis.totalDuplicates}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                    Conflict Clusters
                  </span>
                  <span className="text-lg font-bold text-white font-mono">
                    {duplicateAnalysis.totalClusters}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-emerald-500/30 bg-emerald-500/5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 block font-semibold">
                    Linked Groups 🔗
                  </span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    {duplicateAnalysis.linkedGroupsCount}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                    Phone Matches
                  </span>
                  <span className="text-lg font-bold text-cyan-400 font-mono">
                    {duplicateAnalysis.phoneClustersCount}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                    Name Matches
                  </span>
                  <span className="text-lg font-bold text-purple-400 font-mono">
                    {duplicateAnalysis.nameClustersCount}
                  </span>
                </div>
              </div>

              {/* Filter Tabs inside Modal */}
              <div className="px-4 sm:px-6 py-2.5 bg-slate-900/70 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
                <span className="text-xs text-slate-400 font-semibold shrink-0">Filter By:</span>
                {[
                  { id: "all", label: `All Clusters (${duplicateAnalysis.totalClusters})` },
                  { id: "unresolved", label: `Unresolved (${duplicateAnalysis.unresolvedDuplicates})` },
                  { id: "linked", label: `Linked Groups (${duplicateAnalysis.linkedGroupsCount})` },
                  { id: "phone", label: `Phone Matches (${duplicateAnalysis.phoneClustersCount})` },
                  { id: "name", label: `Name Matches (${duplicateAnalysis.nameClustersCount})` },
                  { id: "email", label: `Email Matches (${duplicateAnalysis.emailClustersCount})` },
                ].map((crit) => (
                  <button
                    key={crit.id}
                    type="button"
                    onClick={() => setDuplicateFilterCriteria(crit.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 border ${
                      duplicateFilterCriteria === crit.id
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {crit.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Clusters Container */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                {(() => {
                  const visibleClusters = duplicateAnalysis.clusters.filter((c) => {
                    if (duplicateFilterCriteria === "unresolved") return !c.isLinkedGroup;
                    if (duplicateFilterCriteria === "linked") return c.isLinkedGroup;
                    if (duplicateFilterCriteria === "phone") return c.hasPhone;
                    if (duplicateFilterCriteria === "name") return c.hasName;
                    if (duplicateFilterCriteria === "email") return c.hasEmail;
                    return true;
                  });

                  if (visibleClusters.length === 0) {
                    return (
                      <div className="py-16 text-center space-y-3">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-200">
                          No Duplicate Entries Found!
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                          {duplicateAnalysis.totalClusters === 0
                            ? "Clean database! All registered attendee records have unique phone numbers, WhatsApp numbers, and names."
                            : "No clusters match your selected filter criteria. Try viewing 'All Clusters'."}
                        </p>
                      </div>
                    );
                  }

                  return visibleClusters.map((cluster) => (
                    <div
                      key={cluster.id}
                      className={`p-4 sm:p-5 rounded-2xl bg-slate-950/80 border space-y-4 shadow-xl ${
                        cluster.isLinkedGroup
                          ? "border-emerald-500/40 ring-1 ring-emerald-500/20"
                          : "border-amber-500/30"
                      }`}
                    >
                      {/* Cluster Header with Link Options */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-lg font-extrabold text-xs ${
                            cluster.isLinkedGroup
                              ? "bg-emerald-500 text-slate-950"
                              : "bg-amber-500 text-slate-950"
                          }`}>
                            Cluster #{cluster.index}
                          </span>

                          {/* Linked Group Status Tag */}
                          {cluster.isLinkedGroup && (
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>Linked Group: "{cluster.linkedGroupData?.groupName || "Family"}"</span>
                            </span>
                          )}

                          <div className="flex flex-wrap gap-1.5">
                            {cluster.reasons.map((r, rIdx) => (
                              <span
                                key={rIdx}
                                className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium"
                              >
                                ⚠️ {r}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Cluster Action Ribbon: Link Option for Phone Duplicates */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {cluster.hasPhone && (
                            <button
                              type="button"
                              onClick={() => handleOpenLinkModalForPhone(cluster.primaryPhone, cluster.guests)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                                cluster.isLinkedGroup
                                  ? "bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300"
                                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20"
                              }`}
                              title={cluster.isLinkedGroup ? "Edit Family Linkage" : "Link these attendees as a Family Group"}
                            >
                              <Link2 className="w-3.5 h-3.5" />
                              <span>{cluster.isLinkedGroup ? "Edit Family Link" : "Link as Family Group"}</span>
                            </button>
                          )}

                          <span className="text-xs font-bold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                            {cluster.guests.length} Conflicting Records
                          </span>
                        </div>
                      </div>

                      {/* Cluster Comparative Cards */}
                      <div
                        className={`grid grid-cols-1 ${
                          cluster.guests.length === 2
                            ? "md:grid-cols-2"
                            : "md:grid-cols-2 lg:grid-cols-3"
                        } gap-3.5`}
                      >
                        {cluster.guests.map((guest, gIdx) => {
                          const isVeg = checkIsVeg(guest);
                          const isAttending = checkIsAttending(guest);
                          const gId = String(guest.guestId || guest.id || guest.token || gIdx);
                          const isPrimaryInGroup =
                            cluster.isLinkedGroup &&
                            String(cluster.linkedGroupData?.primaryGuestId) === gId;
                          const guestRoleInGroup =
                            cluster.linkedGroupData?.relationships?.[gId] || null;

                          return (
                            <div
                              key={guest.guestId || guest.id || guest.token || gIdx}
                              className={`p-4 rounded-xl bg-slate-900/90 border flex flex-col justify-between gap-3 transition shadow-md ${
                                isPrimaryInGroup
                                  ? "border-amber-500/40 ring-1 ring-amber-500/20"
                                  : "border-slate-800 hover:border-slate-700"
                              }`}
                            >
                              <div className="space-y-2.5">
                                {/* Top Name & Token */}
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                                      {guest.genderId === "2" ? (
                                        <WomanLogo className="w-4 h-4 text-pink-400" />
                                      ) : (
                                        <ManLogo className="w-4 h-4 text-sky-400" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <h5 className="font-bold text-white text-sm">
                                          {toProperCase(guest.guestName || "Unnamed Guest")}
                                        </h5>
                                        {isPrimaryInGroup && (
                                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-extrabold border border-amber-500/40">
                                            👑 Primary
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                        {guest.age && <span>Age: {guest.age}</span>}
                                        {guestRoleInGroup && (
                                          <span className="text-emerald-400 font-semibold">• {guestRoleInGroup}</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <span className="font-mono font-bold text-xs text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 shrink-0">
                                    {formatToken(guest)}
                                  </span>
                                </div>

                                {/* Field Values with Conflict Highlights */}
                                <div className="space-y-1.5 text-xs">
                                  {/* Mobile */}
                                  <div
                                    className={`flex items-center justify-between p-1.5 rounded-lg font-mono ${
                                      cluster.hasPhone
                                        ? "bg-amber-500/10 border border-amber-500/20 text-amber-200"
                                        : "bg-slate-950 text-slate-300"
                                    }`}
                                  >
                                    <span className="text-[10px] text-slate-400">Mobile:</span>
                                    <span className="font-bold">{guest.mobile || "—"}</span>
                                  </div>

                                  {/* WhatsApp */}
                                  <div
                                    className={`flex items-center justify-between p-1.5 rounded-lg font-mono ${
                                      cluster.hasPhone
                                        ? "bg-amber-500/10 border border-amber-500/20 text-amber-200"
                                        : "bg-slate-950 text-slate-300"
                                    }`}
                                  >
                                    <span className="text-[10px] text-slate-400">WhatsApp:</span>
                                    <span className="font-bold">{guest.wpNumber || "—"}</span>
                                  </div>

                                  {/* Email */}
                                  {guest.email && (
                                    <div
                                      className={`flex items-center justify-between p-1.5 rounded-lg text-[11px] truncate ${
                                        cluster.hasEmail
                                          ? "bg-amber-500/10 border border-amber-500/20 text-amber-200"
                                          : "bg-slate-950 text-slate-300"
                                      }`}
                                    >
                                      <span className="text-[10px] text-slate-400">Email:</span>
                                      <span className="truncate">{guest.email}</span>
                                    </div>
                                  )}

                                  {/* Meal & Attendance */}
                                  <div className="flex items-center justify-between pt-1">
                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300">
                                      {isVeg ? (
                                        <>
                                          <Leaf className="w-3 h-3 text-emerald-400" />
                                          <span>Veg</span>
                                        </>
                                      ) : (
                                        <>
                                          <Utensils className="w-3 h-3 text-amber-400" />
                                          <span>Non-Veg</span>
                                        </>
                                      )}
                                    </span>

                                    {/* Admin 1-Click Attendance Toggle in Duplicate Reviewer */}
                                    <button
                                      type="button"
                                      onClick={() => handleToggleAttendance(guest)}
                                      title={isAttending ? "Admin: Click to mark as Not Attending" : "Admin: Click to mark as Attending"}
                                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition cursor-pointer flex items-center gap-1 border ${
                                        isAttending
                                          ? "bg-emerald-500/20 hover:bg-rose-500/20 text-emerald-300 hover:text-rose-300 border-emerald-500/30 hover:border-rose-500/40"
                                          : "bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 border-slate-700 hover:border-emerald-500/40"
                                      }`}
                                    >
                                      <span>{isAttending ? "✅ Attending" : "⭕ Absent"}</span>
                                    </button>
                                  </div>

                                  {/* Address */}
                                  {guest.address && (
                                    <div className="text-[10px] text-slate-400 line-clamp-1 pt-0.5">
                                      📍 {guest.address}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Admin Action Buttons */}
                              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowDuplicateModal(false);
                                    handleViewExistingPass(guest);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1"
                                  title="View Ticket Pass"
                                >
                                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                                  <span className="text-[11px]">Pass</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowDuplicateModal(false);
                                    handleEdit(guest);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1"
                                  title="Edit Attendee Record"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                                  <span className="text-[11px]">Edit</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDelete(guest)}
                                  className="py-1.5 px-2.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1"
                                  title="Delete Redundant Duplicate Entry"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                                  <span className="text-[11px]">Delete</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <p className="text-[11px] text-slate-400 leading-normal">
                  💡 <strong className="text-slate-300">Admin Guidance:</strong> Duplicate phone numbers can be linked into a coordinated Family/Shared Contact Group or pruned if redundant.
                </p>

                <button
                  type="button"
                  onClick={() => setShowDuplicateModal(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer shrink-0"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Link Phone Group / Family Modal */}
      {showLinkGroupModal && activePhoneGroupToLink && (
        <LinkPhoneGroupModal
          isOpen={showLinkGroupModal}
          onClose={() => {
            setShowLinkGroupModal(false);
            setActivePhoneGroupToLink(null);
          }}
          phone={activePhoneGroupToLink.phone}
          guests={activePhoneGroupToLink.guests}
          existingGroup={activePhoneGroupToLink.existingGroup}
          isAdmin={isAdmin}
          onToggleAttendance={handleToggleAttendance}
          onSaveGroup={handleSaveLinkedGroup}
          onUnlinkGroup={handleUnlinkGroup}
          onViewPass={(guest) => {
            setShowLinkGroupModal(false);
            setShowDuplicateModal(false);
            handleViewExistingPass(guest);
          }}
        />
      )}
    </div>
  );
}
