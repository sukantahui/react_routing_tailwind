// ============================================================================
// Admin.jsx - Ultra-Modern Admin Command Center & Guest Governance Portal
// ============================================================================

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { authService } from "../api/auth.service";
import { toProperCase } from "./Bijoya";

export default function Admin() {
    const navigate = useNavigate();
    const [guests, setGuests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [dietFilter, setDietFilter] = useState("all"); // 'all' | 'veg' | 'non-veg'
    const [genderFilter, setGenderFilter] = useState("all"); // 'all' | 'male' | 'female'
    const [viewMode, setViewMode] = useState("table"); // 'table' | 'cards'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    // Set page title for admin tab
    useEffect(() => {
        document.title = "Admin Command Center | Coder & AccoTax Barrackpore";
    }, []);

    // Auto-fetch guest data on mount or manual refresh
    const fetchGuests = useCallback(async (showToast = false) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.getAllGuest();
            const data = response?.data || response || [];
            const list = Array.isArray(data) ? data : [];
            setGuests(list);

            if (showToast) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: `Refreshed ${list.length} attendees`,
                    showConfirmButton: false,
                    timer: 2000,
                    background: "#0f172a",
                    color: "#f8fafc",
                });
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to fetch attendees.";
            setError(msg);
            console.error("Failed to load guests:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGuests(false);
    }, [fetchGuests]);

    // Live filtered list based on search, diet, and gender
    const filteredGuests = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return guests.filter((guest) => {
            // Search text match across multiple attributes
            const name = (guest.guestName || "").toLowerCase();
            const wp = (guest.wpNumber || "").toLowerCase();
            const mob = (guest.mobile || "").toLowerCase();
            const token = (guest.token || "").toLowerCase();
            const id = String(guest.guestId || guest.id || "").toLowerCase();

            const matchesSearch =
                !query ||
                name.includes(query) ||
                wp.includes(query) ||
                mob.includes(query) ||
                token.includes(query) ||
                id.includes(query);

            if (!matchesSearch) return false;

            // Diet filter
            if (dietFilter !== "all") {
                const food = (guest.foodPreferenceName || "").toLowerCase();
                if (dietFilter === "veg" && !food.includes("veg")) return false;
                if (dietFilter === "veg" && food.includes("non")) return false;
                if (dietFilter === "non-veg" && !food.includes("non")) return false;
            }

            // Gender filter
            if (genderFilter !== "all") {
                const gender = (guest.genderName || "").toLowerCase();
                if (genderFilter === "male" && !gender.includes("male")) return false;
                if (genderFilter === "female" && !gender.includes("female")) return false;
            }

            return true;
        });
    }, [guests, searchTerm, dietFilter, genderFilter]);

    // Metrics and KPI statistics
    const stats = useMemo(() => {
        const total = guests.length;
        let veg = 0;
        let nonVeg = 0;
        let withWp = 0;
        let males = 0;
        let females = 0;

        guests.forEach((g) => {
            const food = (g.foodPreferenceName || "").toLowerCase();
            if (food.includes("non")) {
                nonVeg++;
            } else if (food.includes("veg")) {
                veg++;
            }

            if (g.wpNumber && String(g.wpNumber).trim().length >= 8) {
                withWp++;
            }

            const gen = (g.genderName || "").toLowerCase();
            if (gen.includes("female")) {
                females++;
            } else if (gen.includes("male")) {
                males++;
            }
        });

        return {
            total,
            veg,
            vegPct: total > 0 ? Math.round((veg / total) * 100) : 0,
            nonVeg,
            nonVegPct: total > 0 ? Math.round((nonVeg / total) * 100) : 0,
            withWp,
            withWpPct: total > 0 ? Math.round((withWp / total) * 100) : 0,
            males,
            females,
        };
    }, [guests]);

    // Copy to clipboard helper
    const handleCopy = (text, id) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // CSV download function with RFC 4180 escaping and timestamp
    const exportToCSV = () => {
        if (!filteredGuests.length) {
            Swal.fire({
                icon: "info",
                title: "No Data to Export",
                text: "There are no guests matching the active filters.",
                confirmButtonColor: "#3b82f6",
                background: "#0f172a",
                color: "#f8fafc",
            });
            return;
        }

        const headers = [
            "#",
            "Guest ID",
            "Token",
            "Name",
            "Mobile",
            "WhatsApp",
            "Gender",
            "Food Preference",
            "Attendance Status",
        ];

        const escapeCell = (val) => {
            const str = String(val ?? "").replace(/"/g, '""');
            return `"${str}"`;
        };

        const rows = filteredGuests.map((guest, index) => [
            index + 1,
            guest.guestId || guest.id || "",
            guest.token || "",
            toProperCase(guest.guestName),
            guest.mobile || "",
            guest.wpNumber || "",
            guest.genderName || "",
            guest.foodPreferenceName || "",
            guest.is_present ? "Present" : "Invited",
        ]);

        const csvContent =
            [headers.map(escapeCell).join(","), ...rows.map((r) => r.map(escapeCell).join(","))].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const dateStr = new Date().toISOString().split("T")[0];
        link.href = url;
        link.setAttribute("download", `maitri_mahotsav_guests_${dateStr}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: `Exported ${filteredGuests.length} rows to CSV`,
            showConfirmButton: false,
            timer: 2500,
            background: "#0f172a",
            color: "#f8fafc",
        });
    };

    // WhatsApp 2026 invitation message sender
    const sendWhatsApp = (guest) => {
        if (!guest.wpNumber) {
            Swal.fire({
                icon: "warning",
                title: "Missing WhatsApp Number",
                text: `${toProperCase(guest.guestName)} does not have a WhatsApp number registered.`,
                confirmButtonColor: "#3b82f6",
                background: "#0f172a",
                color: "#f8fafc",
            });
            return;
        }

        const phone = guest.wpNumber.startsWith("+") ? guest.wpNumber : "+91" + guest.wpNumber;
        const qrLink = `${window.location.origin}/assets/google_review_QR.png`;
        const name = toProperCase(guest.guestName);
        const token = guest.token || guest.guestId || "2026";
        const food = guest.foodPreferenceName || "Non-Veg";

        const message =
`🌸 *কোদর অ্যান্ড অ্যাকোট্যাক্স - মৈত্রী মহোৎসব ২০২৬* 🌸
*Coder & AccoTax — Maitri Mahotsav 2026*

নমস্কার / Greetings, *${name}*! 🎉
Digital Event Token: *[${token}]*

We are delighted to invite you and your family to our grand annual reunion & celebration!

📅 *Date:* 1st November 2026 (Sunday)  
🕢 *Time:* 7:30 PM onwards  
📍 *Venue:* Coder & AccoTax Campus, Barrackpore  
🍽️ *Food Preference:* ${food}

⭐ *Share your valuable review & feedback:*  
https://g.page/r/CTBkwqHJ6mZ2EBM/review  

📸 *Google Review QR Link:*  
${qrLink}

We eagerly await your gracious presence!  
— *Sukanta Hui & The Coder & AccoTax Team*`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black text-slate-100 p-4 sm:p-6 lg:p-8 pt-20">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* 1. TOP HEADER & SYSTEM CONTROL RIBBON */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg shadow-amber-500/20">
                                🛡️
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                                    <span>Admin Command Center</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                        Super Admin
                                    </span>
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-400">
                                    Unified institutional governance, guest directory, database tools & account controls.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                        <button
                            type="button"
                            onClick={() => fetchGuests(true)}
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-50"
                            title="Refresh attendee records from database"
                        >
                            <i className={`bi bi-arrow-clockwise text-sky-400 text-sm ${loading ? "animate-spin" : ""}`}></i>
                            <span>{loading ? "Refreshing..." : "Refresh"}</span>
                        </button>

                        <button
                            type="button"
                            onClick={exportToCSV}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
                            title="Export filtered list as RFC-compliant CSV"
                        >
                            <i className="bi bi-file-earmark-spreadsheet-fill text-sm"></i>
                            <span>Export CSV</span>
                        </button>

                        <Link
                            to="/bijoya"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-amber-500/20 transition active:scale-95"
                        >
                            <span>🌸</span>
                            <span>Bijoya 2026 Portal</span>
                            <i className="bi bi-arrow-right text-[10px]"></i>
                        </Link>
                    </div>
                </div>

                {/* 2. CORE INSTITUTIONAL QUICK ACTIONS (INSTANT ACCESS TILES) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <Link
                        to="/bijoya"
                        className="group p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-transparent border border-amber-500/30 hover:border-amber-400/60 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
                    >
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center text-base mb-2 group-hover:scale-110 transition-transform">
                            🌸
                        </div>
                        <p className="text-xs font-bold text-amber-200 truncate">Bijoya 2026</p>
                        <p className="text-[10px] text-slate-400 truncate">Passes, edits & WhatsApp</p>
                    </Link>

                    <Link
                        to="/admin/backups"
                        className="group p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
                    >
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-sm mb-2 group-hover:scale-110 transition-transform">
                            <i className="bi bi-database-fill-down"></i>
                        </div>
                        <p className="text-xs font-bold text-white truncate">DB Backups</p>
                        <p className="text-[10px] text-slate-400 truncate">Create & download dumps</p>
                    </Link>

                    <Link
                        to="/admin/users"
                        className="group p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
                    >
                        <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-sm mb-2 group-hover:scale-110 transition-transform">
                            <i className="bi bi-people-fill"></i>
                        </div>
                        <p className="text-xs font-bold text-white truncate">User Directory</p>
                        <p className="text-[10px] text-slate-400 truncate">Roles & credentials</p>
                    </Link>

                    <Link
                        to="/users/add"
                        className="group p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
                    >
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-sm mb-2 group-hover:scale-110 transition-transform">
                            <i className="bi bi-person-plus-fill"></i>
                        </div>
                        <p className="text-xs font-bold text-white truncate">Add New User</p>
                        <p className="text-[10px] text-slate-400 truncate">Onboard staff accounts</p>
                    </Link>

                    <Link
                        to="/students/student-admission"
                        className="group p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
                    >
                        <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center text-sm mb-2 group-hover:scale-110 transition-transform">
                            <i className="bi bi-mortarboard-fill"></i>
                        </div>
                        <p className="text-xs font-bold text-white truncate">Fast Enroll</p>
                        <p className="text-[10px] text-slate-400 truncate">Student admission wizard</p>
                    </Link>

                    <Link
                        to="/payments"
                        className="group p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
                    >
                        <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center text-sm mb-2 group-hover:scale-110 transition-transform">
                            <i className="bi bi-receipt-cutoff"></i>
                        </div>
                        <p className="text-xs font-bold text-white truncate">Fee Payments</p>
                        <p className="text-[10px] text-slate-400 truncate">Receipts & ledger sync</p>
                    </Link>
                </div>

                {/* 3. KPI METRIC SUMMARY CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Total Attendees
                            </span>
                            <span className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center text-sm">
                                👥
                            </span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-extrabold text-white">
                                {loading ? "..." : stats.total}
                            </span>
                            <span className="text-xs text-slate-400">Registered</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                            {stats.males} Males • {stats.females} Females
                        </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Pure Veg Preference
                            </span>
                            <span className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-sm">
                                🥗
                            </span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                                {loading ? "..." : stats.veg}
                            </span>
                            <span className="text-xs font-bold text-emerald-400/80">
                                ({stats.vegPct}%)
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Pure vegetarian feast count</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Non-Veg Preference
                            </span>
                            <span className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center text-sm">
                                🍗
                            </span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                                {loading ? "..." : stats.nonVeg}
                            </span>
                            <span className="text-xs font-bold text-amber-400/80">
                                ({stats.nonVegPct}%)
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Non-veg catering arrangement</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                WhatsApp Connected
                            </span>
                            <span className="w-8 h-8 rounded-lg bg-green-500/15 text-green-400 flex items-center justify-center text-sm">
                                💬
                            </span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-extrabold text-green-400">
                                {loading ? "..." : stats.withWp}
                            </span>
                            <span className="text-xs font-bold text-green-400/80">
                                ({stats.withWpPct}%)
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Direct message reachable</p>
                    </div>
                </div>

                {/* 4. SEARCH, FILTER PILLS & VIEW CONTROLS */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    
                    {/* Live Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input
                            type="text"
                            placeholder="Search by Name, WhatsApp, Mobile, Token or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/70 shadow-inner"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                            >
                                <i className="bi bi-x-circle-fill"></i>
                            </button>
                        )}
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                        {/* Diet Filter */}
                        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
                            <button
                                type="button"
                                onClick={() => setDietFilter("all")}
                                className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                                    dietFilter === "all" ? "bg-sky-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                All Diets
                            </button>
                            <button
                                type="button"
                                onClick={() => setDietFilter("non-veg")}
                                className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                                    dietFilter === "non-veg" ? "bg-amber-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                Non-Veg
                            </button>
                            <button
                                type="button"
                                onClick={() => setDietFilter("veg")}
                                className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                                    dietFilter === "veg" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                Veg
                            </button>
                        </div>

                        {/* Gender Filter */}
                        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
                            <button
                                type="button"
                                onClick={() => setGenderFilter("all")}
                                className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                                    genderFilter === "all" ? "bg-purple-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                All
                            </button>
                            <button
                                type="button"
                                onClick={() => setGenderFilter("male")}
                                className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                                    genderFilter === "male" ? "bg-purple-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                Male
                            </button>
                            <button
                                type="button"
                                onClick={() => setGenderFilter("female")}
                                className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                                    genderFilter === "female" ? "bg-purple-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                Female
                            </button>
                        </div>

                        {/* Table / Cards View Toggle */}
                        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 ml-auto md:ml-0">
                            <button
                                type="button"
                                onClick={() => setViewMode("table")}
                                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                                    viewMode === "table" ? "bg-slate-800 text-sky-400 font-bold" : "text-slate-400 hover:text-white"
                                }`}
                                title="Table layout"
                            >
                                <i className="bi bi-table"></i>
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode("cards")}
                                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                                    viewMode === "cards" ? "bg-slate-800 text-sky-400 font-bold" : "text-slate-400 hover:text-white"
                                }`}
                                title="Card grid layout"
                            >
                                <i className="bi bi-grid-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 5. ACTIVE STATUS & FILTER BADGE BAR */}
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <div className="flex items-center gap-2">
                        <span>
                            Showing <strong className="text-white">{filteredGuests.length}</strong> of{" "}
                            <strong className="text-white">{guests.length}</strong> registered attendees
                        </span>
                        {(searchTerm || dietFilter !== "all" || genderFilter !== "all") && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setDietFilter("all");
                                    setGenderFilter("all");
                                }}
                                className="text-sky-400 hover:text-sky-300 font-medium underline cursor-pointer"
                            >
                                Reset filters
                            </button>
                        )}
                    </div>
                    <div className="text-[11px] text-slate-500 hidden sm:block">
                        <i className="bi bi-shield-check text-emerald-400 mr-1"></i>
                        Direct WhatsApp & Bijoya PIN override enabled
                    </div>
                </div>

                {/* 6. ERROR NOTIFICATION */}
                {error && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <i className="bi bi-exclamation-triangle-fill text-rose-400 text-base"></i>
                            <span>{error}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => fetchGuests(true)}
                            className="px-3 py-1 rounded-lg bg-rose-500 text-white font-semibold cursor-pointer"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* 7. LOADING SKELETON */}
                {loading && guests.length === 0 && (
                    <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800/80">
                        <div className="inline-block w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-sm font-semibold text-slate-300">Loading attendee directory...</p>
                        <p className="text-xs text-slate-500">Connecting to secure database</p>
                    </div>
                )}

                {/* 8. MAIN DATA DISPLAY: TABLE VIEW */}
                {!loading && viewMode === "table" && (
                    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                                        <th className="p-3.5 w-12 text-center">#</th>
                                        <th className="p-3.5">Guest & Token</th>
                                        <th className="p-3.5">WhatsApp / Mobile</th>
                                        <th className="p-3.5">Gender</th>
                                        <th className="p-3.5">Feast Diet</th>
                                        <th className="p-3.5 text-right">Admin Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {filteredGuests.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center text-slate-500 text-sm">
                                                <i className="bi bi-search text-3xl block mb-2 opacity-40"></i>
                                                No attendees found matching your criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredGuests.map((guest, idx) => {
                                            const food = (guest.foodPreferenceName || "").toLowerCase();
                                            const isVeg = food.includes("veg") && !food.includes("non");
                                            const token = guest.token || guest.guestId || "—";
                                            const idKey = guest.guestId || guest.id || idx;

                                            return (
                                                <tr
                                                    key={idKey}
                                                    className="hover:bg-slate-800/50 transition-colors group"
                                                >
                                                    <td className="p-3.5 text-center text-slate-500 font-mono text-[11px]">
                                                        {idx + 1}
                                                    </td>

                                                    <td className="p-3.5">
                                                        <div className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors">
                                                            {toProperCase(guest.guestName)}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 mt-0.5">
                                                            <span className="px-1.5 py-0.2 rounded font-mono text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                                                Token: {token}
                                                            </span>
                                                            <span className="text-[10px] text-slate-500">
                                                                ID: {guest.guestId || guest.id}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="p-3.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-mono text-emerald-400 font-semibold">
                                                                {guest.wpNumber || "—"}
                                                            </span>
                                                            {guest.wpNumber && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleCopy(guest.wpNumber, `wp-${idKey}`)}
                                                                    className="text-slate-500 hover:text-slate-200 transition cursor-pointer"
                                                                    title="Copy WhatsApp number"
                                                                >
                                                                    <i className={`bi ${copiedId === `wp-${idKey}` ? "bi-check2 text-emerald-400" : "bi-clipboard"} text-xs`}></i>
                                                                </button>
                                                            )}
                                                        </div>
                                                        {guest.mobile && guest.mobile !== guest.wpNumber && (
                                                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                                                                Alt: {guest.mobile}
                                                            </div>
                                                        )}
                                                    </td>

                                                    <td className="p-3.5">
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                                                            {guest.genderName || "Attendee"}
                                                        </span>
                                                    </td>

                                                    <td className="p-3.5">
                                                        <span
                                                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                                                isVeg
                                                                    ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                                                    : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                                            }`}
                                                        >
                                                            <span className={`w-1.5 h-1.5 rounded-full ${isVeg ? "bg-emerald-400" : "bg-amber-400"}`}></span>
                                                            {guest.foodPreferenceName || "Standard"}
                                                        </span>
                                                    </td>

                                                    <td className="p-3.5 text-right">
                                                        <div className="inline-flex items-center gap-1.5">
                                                            <button
                                                                type="button"
                                                                onClick={() => sendWhatsApp(guest)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-600/90 hover:bg-green-500 text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer"
                                                                title="Send 2026 Invitation via WhatsApp"
                                                            >
                                                                <i className="bi bi-whatsapp"></i>
                                                                <span className="hidden sm:inline">Invite</span>
                                                            </button>

                                                            <Link
                                                                to="/bijoya"
                                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition"
                                                                title="Open full pass, edit without PIN, or delete in Bijoya Portal"
                                                            >
                                                                <i className="bi bi-ticket-perforated text-amber-400"></i>
                                                                <span className="hidden md:inline">Pass & Edit</span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 9. CARD GRID VIEW */}
                {!loading && viewMode === "cards" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredGuests.length === 0 ? (
                            <div className="col-span-full py-16 text-center text-slate-500 text-sm bg-slate-900/60 rounded-2xl border border-slate-800">
                                <i className="bi bi-search text-3xl block mb-2 opacity-40"></i>
                                No attendees found matching your criteria.
                            </div>
                        ) : (
                            filteredGuests.map((guest, idx) => {
                                const food = (guest.foodPreferenceName || "").toLowerCase();
                                const isVeg = food.includes("veg") && !food.includes("non");
                                const token = guest.token || guest.guestId || "—";
                                const idKey = guest.guestId || guest.id || idx;

                                return (
                                    <div
                                        key={idKey}
                                        className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-xl transition space-y-3 flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-white text-base truncate">
                                                        {toProperCase(guest.guestName)}
                                                    </h3>
                                                    <p className="text-xs text-slate-400 mt-0.5">
                                                        {guest.genderName || "Attendee"}
                                                    </p>
                                                </div>
                                                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
                                                    Token: {token}
                                                </span>
                                            </div>

                                            <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-slate-400">WhatsApp:</span>
                                                    <span className="font-mono font-semibold text-emerald-400">
                                                        {guest.wpNumber || "—"}
                                                    </span>
                                                </div>
                                                {guest.mobile && guest.mobile !== guest.wpNumber && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-slate-400">Mobile:</span>
                                                        <span className="font-mono text-slate-300">
                                                            {guest.mobile}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-slate-400">Diet Preference:</span>
                                                    <span
                                                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                                            isVeg
                                                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                                                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                                        }`}
                                                    >
                                                        {guest.foodPreferenceName || "Standard"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2 flex items-center justify-between gap-2">
                                            <button
                                                type="button"
                                                onClick={() => sendWhatsApp(guest)}
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
                                            >
                                                <i className="bi bi-whatsapp"></i>
                                                <span>Send Invite</span>
                                            </button>
                                            <Link
                                                to="/bijoya"
                                                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs transition"
                                                title="Open in Bijoya Portal"
                                            >
                                                <i className="bi bi-ticket-perforated-fill text-base"></i>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
