// ============================================================================
// EventToday.jsx - Advanced Next-Gen Occasion Spotlight & Knowledge Hub
// ============================================================================
// Features:
// 1. Live HUD: Real-time IST digital clock & live milestone countdown ticker
// 2. Multi-Mode Hub:
//    - [Spotlight]: Dynamic mood-themed card with coinciding switcher
//    - [Calendar Matrix]: Interactive 7x5 month grid with category event dots
//    - [Quiz Lab]: Daily interactive coding & taxation multiple-choice quiz
//    - [365 Explorer]: Live search, category filtering & timeframe navigator
// 3. Action Suite:
//    - SpeechSynthesis Voice Narrator with animated audio wave bars
//    - 1-Click WhatsApp greeting share
//    - Instant clipboard copy with toast feedback
//    - Add to Google Calendar 1-click URL
//    - Client-side Canvas Festive Card Generator & instant PNG download
// ============================================================================

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eventData from "./event_list.json";

const ALL_EVENTS = eventData?.events || [];
const DAILY_WISDOM = eventData?.dailyWisdomBytes || [];
const DAILY_QUIZZES = eventData?.dailyQuizzes || [];
const CATEGORIES = eventData?.categories || [
  { id: "all", label: "All Occasions", icon: "bi-calendar3" },
  { id: "tech", label: "Tech & Code", icon: "bi-code-slash" },
  { id: "accounting", label: "Tax & Finance", icon: "bi-calculator" },
  { id: "national", label: "National & India", icon: "bi-flag" },
  { id: "education", label: "Education & STEM", icon: "bi-book" },
  { id: "festival", label: "Festivals & Culture", icon: "bi-balloon-heart" },
  { id: "international", label: "Global Observance", icon: "bi-globe2" },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Dynamic calendar date resolver
const getResolvedEventDate = (eventItem, targetYear) => {
  const rule = eventItem?.dynamicRule;
  if (!rule) {
    return { day: eventItem.day, month: eventItem.month };
  }

  // 1. Day of Year calculation (e.g. 256th day for Programmers' Day)
  if (rule.type === "dayOfYear" && typeof rule.dayOfYear === "number") {
    const calculated = new Date(targetYear, 0, rule.dayOfYear);
    return {
      day: calculated.getDate(),
      month: calculated.getMonth() + 1,
    };
  }

  // 2. Leap year override
  if (rule.type === "leapYearOverride") {
    const isLeap = (targetYear % 4 === 0 && targetYear % 100 !== 0) || targetYear % 400 === 0;
    return {
      day: isLeap ? rule.leapDay : rule.nonLeapDay,
      month: rule.month || eventItem.month,
    };
  }

  // 3. Nth weekday of month (e.g. 2nd Sunday of May)
  if (rule.type === "nthWeekdayOfMonth") {
    const firstDay = new Date(targetYear, rule.month - 1, 1).getDay();
    const day = 1 + ((rule.weekday - firstDay + 7) % 7) + (rule.nth - 1) * 7;
    return { day, month: rule.month };
  }

  // 4. Last weekday of month (e.g. Last Friday of July)
  if (rule.type === "lastWeekdayOfMonth") {
    const lastDayOfMonth = new Date(targetYear, rule.month, 0).getDate();
    const lastDayWeekday = new Date(targetYear, rule.month - 1, lastDayOfMonth).getDay();
    const day = lastDayOfMonth - ((lastDayWeekday - rule.weekday + 7) % 7);
    return { day, month: rule.month };
  }

  return { day: eventItem.day, month: eventItem.month };
};

export default function EventToday() {
  const events = ALL_EVENTS;

  // Real-world reference date
  const today = useMemo(() => new Date(), []);
  const realDay = today.getDate();
  const realMonth = today.getMonth() + 1;
  const realYear = today.getFullYear();

  // Active view mode: 'spotlight' | 'calendar' | 'quiz' | 'explorer'
  const [activeView, setActiveView] = useState("spotlight");

  // Selection state
  const [selectedDay, setSelectedDay] = useState(realDay);
  const [selectedMonth, setSelectedMonth] = useState(realMonth);
  const [selectedYear, setSelectedYear] = useState(realYear);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // Live Digital Clock & Countdown Ticker
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Quick Date Picker Popover
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  // Audio Speech state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Feedback states
  const [copiedToast, setCopiedToast] = useState(false);
  const [cardDownloading, setCardDownloading] = useState(false);

  // Quiz interactive state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnsweredCount, setQuizAnsweredCount] = useState(0);

  // Explorer search & filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [timeframe, setTimeframe] = useState("upcoming_30");

  // Close date picker on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setShowDatePicker(false);
      }
    }
    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDatePicker]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Reset quiz option when day changes
  useEffect(() => {
    setSelectedQuizAnswer(null);
  }, [selectedDay, selectedMonth]);

  const isActualToday = selectedDay === realDay && selectedMonth === realMonth;

  // Formatted date string
  const formattedDisplayDate = useMemo(() => {
    const d = new Date(selectedYear, selectedMonth - 1, selectedDay);
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [selectedDay, selectedMonth, selectedYear]);

  // Current live clock string (IST format)
  const formattedClock = useMemo(() => {
    return currentTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }, [currentTime]);

  // Events on selected date
  const currentEvents = useMemo(() => {
    return events
      .filter((e) => {
        if (e.isVisible === false) return false;
        const resolved = getResolvedEventDate(e, selectedYear);
        if (resolved.day !== selectedDay || resolved.month !== selectedMonth) return false;
        if (e.yearSpecific && e.year !== selectedYear) return false;
        return true;
      })
      .map((e) => {
        const resolved = getResolvedEventDate(e, selectedYear);
        return { ...e, day: resolved.day, month: resolved.month };
      });
  }, [events, selectedDay, selectedMonth, selectedYear]);

  const activeEvent = currentEvents[activeEventIndex] || currentEvents[0] || null;

  // Daily Wisdom Byte
  const dailyByte = useMemo(() => {
    const idx = (selectedDay - 1) % (DAILY_WISDOM.length || 1);
    return DAILY_WISDOM[idx] || null;
  }, [selectedDay]);

  // Daily Quiz Question
  const activeQuiz = useMemo(() => {
    const idx = (selectedDay - 1) % (DAILY_QUIZZES.length || 1);
    return DAILY_QUIZZES[idx] || null;
  }, [selectedDay]);

  // Timeline computation with day offsets
  const allEventsWithTimeline = useMemo(() => {
    const todayDate = new Date(realYear, realMonth - 1, realDay);

    return events
      .filter((e) => e.isVisible !== false)
      .map((e) => {
        let targetYear = realYear;
        if (e.yearSpecific && e.year) targetYear = e.year;

        const resolved = getResolvedEventDate(e, targetYear);
        let eventDate = new Date(targetYear, resolved.month - 1, resolved.day);

        // If already passed this year, project to next year for upcoming sorting
        if (eventDate < todayDate && !e.yearSpecific) {
          const nextResolved = getResolvedEventDate(e, targetYear + 1);
          eventDate = new Date(targetYear + 1, nextResolved.month - 1, nextResolved.day);
        }

        const diffTime = eventDate - todayDate;
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        return {
          ...e,
          day: resolved.day,
          month: resolved.month,
          diffDays,
          targetDate: eventDate,
        };
      })
      .sort((a, b) => a.diffDays - b.diffDays);
  }, [events, realDay, realMonth, realYear]);

  // Nearest upcoming event
  const nextUpcoming = useMemo(() => {
    return allEventsWithTimeline.find((e) => e.diffDays > 0) || null;
  }, [allEventsWithTimeline]);

  // Mood Tokens
  const moodTokens = useMemo(() => {
    const event = activeEvent || nextUpcoming;
    if (!event) {
      return {
        accent: "#38bdf8",
        border: "#0284c7",
        glow: "rgba(56, 189, 248, 0.25)",
        darkBg: "rgba(56, 189, 248, 0.06)",
        gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(2, 132, 199, 0.05), transparent)",
        mood: "Academic Excellence & Mastery",
        emoji: "✨",
        icon: "bi-stars",
      };
    }

    const c = event.colorUsed || {};
    return {
      accent: c.accent || "#38bdf8",
      border: c.border || "#0284c7",
      glow: c.glow || "rgba(56, 189, 248, 0.25)",
      darkBg: c.darkBg || "rgba(56, 189, 248, 0.06)",
      gradient: c.gradient || `linear-gradient(135deg, ${c.accent || "#38bdf8"}22, ${c.border || "#0284c7"}08, transparent)`,
      mood: event.mood || "Celebration & Significance",
      emoji: event.moodEmoji || "🎉",
      icon: event.icon || "bi-calendar-event-fill",
    };
  }, [activeEvent, nextUpcoming]);

  // Navigation handlers
  const handlePrevDay = useCallback(() => {
    const current = new Date(selectedYear, selectedMonth - 1, selectedDay);
    current.setDate(current.getDate() - 1);
    setSelectedDay(current.getDate());
    setSelectedMonth(current.getMonth() + 1);
    setActiveEventIndex(0);
  }, [selectedDay, selectedMonth, selectedYear]);

  const handleNextDay = useCallback(() => {
    const current = new Date(selectedYear, selectedMonth - 1, selectedDay);
    current.setDate(current.getDate() + 1);
    setSelectedDay(current.getDate());
    setSelectedMonth(current.getMonth() + 1);
    setActiveEventIndex(0);
  }, [selectedDay, selectedMonth, selectedYear]);

  const handleResetToToday = useCallback(() => {
    setSelectedDay(realDay);
    setSelectedMonth(realMonth);
    setActiveEventIndex(0);
    setActiveView("spotlight");
  }, [realDay, realMonth]);

  const handleSelectEvent = useCallback((e) => {
    setSelectedDay(e.day);
    setSelectedMonth(e.month);
    setActiveEventIndex(0);
    setActiveView("spotlight");
    const element = document.getElementById("today-occasion-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // WhatsApp Share
  const handleShareWhatsApp = useCallback((event) => {
    if (!event) return;
    const shareMessage = `✨ *${event.event}* (${formattedDisplayDate})\n${event.secondaryTitle ? `_${event.secondaryTitle}_\n\n` : "\n"}"${event.quote}"\n— *${event.quoteAuthor || "Inspirational Thought"}*\n\n${event.description}\n\n📍 *Coder & AccoTax Institute*\nhttps://codernaccotax.co.in/`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [formattedDisplayDate]);

  // Copy to clipboard
  const handleCopy = useCallback((event) => {
    if (!event) return;
    const text = `✨ ${event.event} (${formattedDisplayDate})\n${event.secondaryTitle ? `${event.secondaryTitle}\n\n` : "\n"}"${event.quote}"\n— ${event.quoteAuthor || "Inspirational Thought"}\n\n${event.description}\n\n— Shared from Coder & AccoTax Institute\nhttps://codernaccotax.co.in/`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2200);
    });
  }, [formattedDisplayDate]);

  // Google Calendar Add
  const handleAddToCalendar = useCallback((event) => {
    if (!event) return;
    const yearStr = selectedYear.toString();
    const monthStr = selectedMonth.toString().padStart(2, "0");
    const dayStr = selectedDay.toString().padStart(2, "0");
    const dateStr = `${yearStr}${monthStr}${dayStr}`;

    const title = `${event.moodEmoji || "✨"} ${event.event}`;
    const details = `${event.description}\n\n"${event.quote}"\n— ${event.quoteAuthor || "Inspirational Thought"}\n\nCoder & AccoTax Institute\nhttps://codernaccotax.co.in/`;
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dateStr}/${dateStr}&details=${encodeURIComponent(details)}&location=Coder+%26+AccoTax+Institute`;
    window.open(calendarUrl, "_blank", "noopener,noreferrer");
  }, [selectedDay, selectedMonth, selectedYear]);

  // Audio Speech Toggle
  const handleToggleAudio = useCallback((event) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if (!event) return;

    window.speechSynthesis.cancel();
    const textToSpeak = `${event.event}. ${event.description}. Thought for the day: ${event.quote}. By ${event.quoteAuthor || "Inspirational Heritage"}.`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  }, [isPlayingAudio]);

  // Client-Side Canvas Greeting Card Generator & Download
  const handleDownloadCard = useCallback((event) => {
    if (!event) return;
    setCardDownloading(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Dark theme background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
      bgGrad.addColorStop(0, "#030712");
      bgGrad.addColorStop(0.5, "#0b1329");
      bgGrad.addColorStop(1, "#030712");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 630);

      // Ambient radial glow
      const glowGrad = ctx.createRadialGradient(600, 200, 20, 600, 200, 450);
      glowGrad.addColorStop(0, event.colorUsed?.glow || "rgba(56, 189, 248, 0.35)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, 1200, 630);

      // Border frame
      ctx.strokeStyle = event.colorUsed?.border || "#0284c7";
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, 1140, 570);

      // Top Accent Header
      ctx.fillStyle = event.colorUsed?.accent || "#38bdf8";
      ctx.font = "bold 22px system-ui, -apple-system, sans-serif";
      ctx.fillText(`✨ ${event.category.toUpperCase()} • ${formattedDisplayDate.toUpperCase()}`, 70, 95);

      // Main Event Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 44px system-ui, -apple-system, sans-serif";
      ctx.fillText(event.event, 70, 165);

      // Quote Text (Wrapped)
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "italic 26px Georgia, serif";
      const quoteText = `"${event.quote}"`;

      // Word wrapping logic
      const words = quoteText.split(" ");
      let line = "";
      let y = 250;
      const maxLineWidth = 1040;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxLineWidth && n > 0) {
          ctx.fillText(line, 70, y);
          line = words[n] + " ";
          y += 40;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 70, y);

      // Author Attribution
      ctx.fillStyle = event.colorUsed?.accent || "#38bdf8";
      ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
      ctx.fillText(`— ${event.quoteAuthor || "Inspirational Thought"}`, 70, y + 45);

      // Footer Branding
      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px system-ui, -apple-system, sans-serif";
      ctx.fillText("Coder & AccoTax Academy • Barrackpore", 70, 550);
      ctx.fillText("https://codernaccotax.co.in/", 850, 550);

      // Export to PNG
      const link = document.createElement("a");
      link.download = `${event.event.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_greeting.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to generate greeting card", err);
    } finally {
      setCardDownloading(false);
    }
  }, [formattedDisplayDate]);

  // Quiz Answer Handler
  const handleQuizAnswer = useCallback((idx) => {
    if (selectedQuizAnswer !== null) return;
    setSelectedQuizAnswer(idx);
    setQuizAnsweredCount((prev) => prev + 1);
    if (activeQuiz && idx === activeQuiz.correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  }, [selectedQuizAnswer, activeQuiz]);

  // Month Calendar Grid Matrix computation
  const calendarGrid = useMemo(() => {
    const firstDayIndex = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    const daysInCurrentMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const daysInPrevMonth = new Date(selectedYear, selectedMonth - 1, 0).getDate();

    const matrix = [];

    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      matrix.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        month: selectedMonth === 1 ? 12 : selectedMonth - 1,
        year: selectedMonth === 1 ? selectedYear - 1 : selectedYear,
        hasEvents: [],
      });
    }

    // Current month days with matching events
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dayEvents = events.filter((e) => {
        if (e.isVisible === false) return false;
        const resolved = getResolvedEventDate(e, selectedYear);
        return resolved.day === d && resolved.month === selectedMonth;
      });

      matrix.push({
        day: d,
        isCurrentMonth: true,
        month: selectedMonth,
        year: selectedYear,
        hasEvents: dayEvents,
      });
    }

    // Next month filler days to complete 35 or 42 cells
    const remaining = (7 - (matrix.length % 7)) % 7;
    for (let n = 1; n <= remaining; n++) {
      matrix.push({
        day: n,
        isCurrentMonth: false,
        month: selectedMonth === 12 ? 1 : selectedMonth + 1,
        year: selectedMonth === 12 ? selectedYear + 1 : selectedYear,
        hasEvents: [],
      });
    }

    return matrix;
  }, [events, selectedMonth, selectedYear]);

  // Filtered Explorer Events
  const filteredEvents = useMemo(() => {
    return allEventsWithTimeline.filter((e) => {
      // Timeframe filter
      if (timeframe === "upcoming_7" && (e.diffDays < 0 || e.diffDays > 7)) return false;
      if (timeframe === "upcoming_30" && (e.diffDays < 0 || e.diffDays > 30)) return false;
      if (timeframe === "this_month" && e.month !== realMonth) return false;

      // Category filter
      if (activeCategory !== "all") {
        const cat = (e.category || "").toLowerCase();
        if (activeCategory === "tech" && !cat.includes("tech") && !cat.includes("code") && !cat.includes("computing") && !cat.includes("software")) return false;
        if (activeCategory === "accounting" && !cat.includes("account") && !cat.includes("tax") && !cat.includes("finance") && !cat.includes("gst")) return false;
        if (activeCategory === "national" && !cat.includes("india") && !cat.includes("national")) return false;
        if (activeCategory === "education" && !cat.includes("education") && !cat.includes("science") && !cat.includes("stem")) return false;
        if (activeCategory === "festival" && !cat.includes("festival") && !cat.includes("culture")) return false;
        if (activeCategory === "international" && !cat.includes("international") && !cat.includes("global")) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (e.event || "").toLowerCase().includes(q);
        const matchesSec = (e.secondaryTitle || "").toLowerCase().includes(q);
        const matchesDesc = (e.description || "").toLowerCase().includes(q);
        const matchesCat = (e.category || "").toLowerCase().includes(q);
        const matchesQuote = (e.quote || "").toLowerCase().includes(q);
        const matchesAuthor = (e.quoteAuthor || "").toLowerCase().includes(q);
        const matchesTags = Array.isArray(e.subCategory) && e.subCategory.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesSec && !matchesDesc && !matchesCat && !matchesQuote && !matchesAuthor && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [allEventsWithTimeline, timeframe, activeCategory, searchQuery, realMonth]);

  return (
    <section
      id="today-occasion-section"
      className="relative w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-[#030712] border-b border-slate-800/80 overflow-hidden"
    >
      {/* Ambient Lighting */}
      <div
        className="absolute w-[540px] h-[280px] rounded-full blur-[150px] -top-20 left-1/3 pointer-events-none transition-all duration-700 opacity-25"
        style={{ backgroundColor: moodTokens.accent }}
      />

      <div className="max-w-6xl mx-auto relative z-10 space-y-4">

        {/* ==================================================================== */}
        {/* Top Control Bar: HUD Telemetry, Live IST Clock & Mode Switcher       */}
        {/* ==================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-2.5 sm:p-3 rounded-2xl backdrop-blur-xl shadow-lg">
          
          {/* Left: Live Status, IST Clock & Day Skipper */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300 shadow-sm">
              {isActualToday ? (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              ) : (
                <i className="bi bi-clock-history text-amber-400 text-[11px]"></i>
              )}
              <span className="tracking-wide uppercase font-bold text-[10px] sm:text-[11px] text-slate-200">
                {isActualToday ? "Today Live" : "Preview"}
              </span>
              <span className="text-slate-500 text-[10px] hidden sm:inline">•</span>
              <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
                {formattedClock} IST
              </span>
            </div>

            {/* Inline Day Switcher (< Date >) */}
            <div className="relative inline-flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5 shadow-sm text-xs" ref={datePickerRef}>
              <button
                type="button"
                onClick={handlePrevDay}
                className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
                title="Previous Day"
              >
                <i className="bi bi-chevron-left text-[11px]"></i>
              </button>

              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="px-2.5 py-1 font-semibold text-slate-200 hover:text-sky-300 transition cursor-pointer flex items-center gap-1.5"
                title="Click to jump to any day/month"
              >
                <i className="bi bi-calendar3 text-sky-400 text-[11px]"></i>
                <span>{formattedDisplayDate}</span>
                <i className="bi bi-caret-down-fill text-[9px] text-slate-400"></i>
              </button>

              <button
                type="button"
                onClick={handleNextDay}
                className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
                title="Next Day"
              >
                <i className="bi bi-chevron-right text-[11px]"></i>
              </button>

              {/* Quick Date Picker Popover */}
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-2 z-50 p-4 bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-xl w-64 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white">Jump to Date</span>
                    <button
                      type="button"
                      onClick={() => setShowDatePicker(false)}
                      className="text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1 uppercase font-semibold">Month</label>
                      <select
                        value={selectedMonth}
                        onChange={(e) => {
                          setSelectedMonth(parseInt(e.target.value, 10));
                          setActiveEventIndex(0);
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-md p-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                      >
                        {MONTH_NAMES.map((m, idx) => (
                          <option key={m} value={idx + 1}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1 uppercase font-semibold">Day</label>
                      <select
                        value={selectedDay}
                        onChange={(e) => {
                          setSelectedDay(parseInt(e.target.value, 10));
                          setActiveEventIndex(0);
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-md p-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        handleResetToToday();
                        setShowDatePicker(false);
                      }}
                      className="px-2.5 py-1 rounded text-xs bg-sky-950 text-sky-300 border border-sky-800 hover:bg-sky-900 transition cursor-pointer"
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDatePicker(false)}
                      className="px-3 py-1 rounded text-xs bg-sky-600 text-white font-semibold hover:bg-sky-500 transition cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Reset Today Button */}
            {!isActualToday && (
              <button
                type="button"
                onClick={handleResetToToday}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-950 text-sky-300 border border-sky-800 hover:bg-sky-900 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="Return to today"
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                <span>Today</span>
              </button>
            )}
          </div>

          {/* Right: Multi-Mode Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveView("spotlight")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeView === "spotlight"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <i className="bi bi-stars text-amber-300"></i>
              <span>Spotlight</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView("calendar")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeView === "calendar"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <i className="bi bi-calendar3"></i>
              <span>Month Grid</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView("quiz")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeView === "quiz"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <i className="bi bi-question-diamond-fill text-purple-400"></i>
              <span>Daily Quiz</span>
              {quizAnsweredCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-purple-950 text-purple-200 border border-purple-800">
                  {quizScore}/{quizAnsweredCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveView("explorer")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeView === "explorer"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <i className="bi bi-search"></i>
              <span>365 Explorer</span>
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* VIEW 1: OCCASION SPOTLIGHT SHOWCASE CARD                             */}
        {/* ==================================================================== */}
        {activeView === "spotlight" && (
          <AnimatePresence mode="wait">
            {activeEvent ? (
              <motion.div
                key={`${activeEvent.event}-${selectedDay}-${selectedMonth}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-2xl border backdrop-blur-xl overflow-hidden shadow-2xl p-5 sm:p-6 lg:p-7 transition-all duration-300"
                style={{
                  borderColor: `${moodTokens.border}40`,
                  background: `radial-gradient(ellipse at top left, ${moodTokens.darkBg}, rgba(15, 23, 42, 0.9) 75%)`,
                  boxShadow: `0 12px 35px -12px ${moodTokens.glow}`,
                }}
              >
                {/* Top Accent Gradient Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] transition-all duration-500"
                  style={{
                    background: `linear-gradient(to right, ${moodTokens.accent}, ${moodTokens.border}, #38bdf8)`,
                  }}
                />

                {/* Coinciding Occasions Switcher */}
                {currentEvents.length > 1 && (
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/80 overflow-x-auto">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                      Coinciding Occasions ({currentEvents.length}):
                    </span>
                    {currentEvents.map((ev, idx) => (
                      <button
                        key={ev.event}
                        type="button"
                        onClick={() => setActiveEventIndex(idx)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          idx === activeEventIndex
                            ? "bg-white text-slate-950 shadow-md font-bold ring-2 ring-sky-400/50"
                            : "bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60"
                        }`}
                      >
                        <span>{ev.moodEmoji || "✨"}</span>
                        <span>{ev.event}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  
                  {/* Left Column (7 cols): Event Details & Action Prompt */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase border shadow-sm"
                        style={{
                          backgroundColor: `${moodTokens.accent}15`,
                          borderColor: `${moodTokens.accent}45`,
                          color: moodTokens.accent,
                        }}
                      >
                        <span>{activeEvent.moodEmoji}</span>
                        <span>{activeEvent.category}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-900/80 border border-slate-800 text-slate-300">
                        <span className="text-slate-400">Theme:</span>
                        <span className="font-semibold text-slate-200">{activeEvent.mood}</span>
                      </span>

                      {Array.isArray(activeEvent.subCategory) && activeEvent.subCategory.slice(0, 3).map((tag) => (
                        <span key={tag} className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-slate-800/80 text-slate-400 border border-slate-700/60 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-start gap-3.5 pt-0.5">
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 border shadow-md transition-transform duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: moodTokens.darkBg,
                          borderColor: `${moodTokens.border}60`,
                          color: moodTokens.accent,
                        }}
                      >
                        <i className={`bi ${moodTokens.icon} text-xl sm:text-2xl`}></i>
                      </div>

                      <div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                          {activeEvent.event}
                        </h2>
                        {activeEvent.secondaryTitle && (
                          <p className="text-xs sm:text-sm font-semibold text-sky-400/90 mt-0.5">
                            {activeEvent.secondaryTitle}
                          </p>
                        )}
                        <p className="text-sm sm:text-base text-slate-300 mt-1 leading-relaxed font-normal">
                          {activeEvent.description}
                        </p>
                      </div>
                    </div>

                    {/* Actionable Prompt */}
                    {activeEvent.actionPrompt && (
                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2 shadow-sm">
                        <i className="bi bi-lightbulb-fill text-amber-400 text-sm mt-0.5 flex-shrink-0"></i>
                        <p className="leading-relaxed text-slate-300 font-medium">
                          {activeEvent.actionPrompt}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column (5 cols): Thought Card & Action Suite */}
                  <div className="lg:col-span-5">
                    <div
                      className="relative rounded-xl p-4 sm:p-5 border backdrop-blur-md shadow-md flex flex-col justify-between h-full group transition-all"
                      style={{
                        backgroundColor: "rgba(15, 23, 42, 0.75)",
                        borderColor: `${moodTokens.border}35`,
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <i className="bi bi-quote text-sky-400 text-sm"></i>
                            <span>Thought for the Occasion</span>
                          </span>

                          {/* Action Suite (Narrator, WhatsApp, Copy, Calendar, Card Download) */}
                          <div className="flex items-center gap-1.5">
                            {/* Voice Narrator */}
                            <button
                              type="button"
                              onClick={() => handleToggleAudio(activeEvent)}
                              className={`p-1.5 rounded-md text-xs border transition cursor-pointer flex items-center justify-center ${
                                isPlayingAudio
                                  ? "bg-amber-500 text-slate-950 border-amber-400 animate-pulse font-bold"
                                  : "bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700"
                              }`}
                              title={isPlayingAudio ? "Stop reading" : "Read aloud"}
                            >
                              <i className={`bi ${isPlayingAudio ? "bi-volume-up-fill" : "bi-volume-up"}`}></i>
                            </button>

                            {/* WhatsApp Share */}
                            <button
                              type="button"
                              onClick={() => handleShareWhatsApp(activeEvent)}
                              className="px-2 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 hover:text-white border border-emerald-800/80 transition-all cursor-pointer flex items-center gap-1"
                              title="Share on WhatsApp"
                            >
                              <i className="bi bi-whatsapp text-emerald-400"></i>
                              <span className="hidden sm:inline">WhatsApp</span>
                            </button>

                            {/* Copy Wish */}
                            <button
                              type="button"
                              onClick={() => handleCopy(activeEvent)}
                              className="px-2 py-1 rounded-md text-[11px] font-semibold bg-slate-800/90 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
                              title="Copy wish"
                            >
                              <i className={`bi ${copiedToast ? "bi-check2 text-emerald-400" : "bi-clipboard"}`}></i>
                              <span>{copiedToast ? "Copied!" : "Copy"}</span>
                            </button>

                            {/* Google Calendar */}
                            <button
                              type="button"
                              onClick={() => handleAddToCalendar(activeEvent)}
                              className="p-1.5 rounded-md text-xs bg-slate-800/90 hover:bg-slate-700 text-sky-400 hover:text-white border border-slate-700 transition cursor-pointer"
                              title="Add to Google Calendar"
                            >
                              <i className="bi bi-calendar-plus"></i>
                            </button>

                            {/* Download Greeting Card */}
                            <button
                              type="button"
                              onClick={() => handleDownloadCard(activeEvent)}
                              disabled={cardDownloading}
                              className="p-1.5 rounded-md text-xs bg-slate-800/90 hover:bg-slate-700 text-purple-400 hover:text-white border border-slate-700 transition cursor-pointer"
                              title="Download Festive Card Image"
                            >
                              <i className={`bi ${cardDownloading ? "bi-hourglass-split" : "bi-image"}`}></i>
                            </button>
                          </div>
                        </div>

                        {/* Animated Voice Wave Bar when Speaking */}
                        {isPlayingAudio && (
                          <div className="flex items-center gap-1 py-1 mb-2">
                            <span className="h-2 w-1 bg-amber-400 animate-bounce rounded-full"></span>
                            <span className="h-4 w-1 bg-amber-400 animate-pulse rounded-full"></span>
                            <span className="h-3 w-1 bg-amber-400 animate-bounce rounded-full"></span>
                            <span className="h-5 w-1 bg-amber-400 animate-pulse rounded-full"></span>
                            <span className="text-[10px] text-amber-300 ml-1 font-mono">Narrating audio...</span>
                          </div>
                        )}

                        <blockquote className="text-sm sm:text-base font-medium text-slate-200 italic leading-relaxed pt-1">
                          "{activeEvent.quote}"
                        </blockquote>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold truncate max-w-[200px]" style={{ color: moodTokens.border }}>
                          — {activeEvent.quoteAuthor || "Inspirational Thought"}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">Coder & AccoTax</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              /* Daily Wisdom Fallback */
              <motion.div
                key={`daily-wisdom-${selectedDay}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 shadow-xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  
                  <div className="md:col-span-7 space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      <i className={`bi ${dailyByte?.icon || "bi-lightbulb-fill"}`}></i>
                      <span>Daily Tech & Tax Byte • Day {selectedDay}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {dailyByte?.topic || "Consistent Practice Builds Real Industry Mastery"}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      "{dailyByte?.byte || "Excellence in programming and financial compliance is not an act, but a daily habit of structured logic, clean syntax, and verified accuracy."}"
                    </p>
                    <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-2">
                      <span className="text-sky-400 font-semibold">{dailyByte?.category || "Professional Mastery"}</span>
                      <span>•</span>
                      <span>Coder & AccoTax Daily Curriculum</span>
                    </div>
                  </div>

                  {nextUpcoming && (
                    <div className="md:col-span-5 flex flex-col justify-center">
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <i className="bi bi-hourglass-split text-sky-400"></i>
                            <span>Next Milestone</span>
                          </span>
                          <span className="bg-sky-950 text-sky-300 px-2 py-0.5 rounded-full text-[10px] font-bold border border-sky-800/60">
                            in {nextUpcoming.diffDays} {nextUpcoming.diffDays === 1 ? "day" : "days"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-white text-sm flex items-center gap-1.5">
                              <span>{nextUpcoming.moodEmoji}</span>
                              <span>{nextUpcoming.event}</span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {nextUpcoming.day} {MONTH_NAMES[nextUpcoming.month - 1]} • {nextUpcoming.category}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSelectEvent(nextUpcoming)}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-slate-700 transition cursor-pointer flex-shrink-0"
                          >
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* ==================================================================== */}
        {/* VIEW 2: INTERACTIVE MONTH CALENDAR MATRIX                            */}
        {/* ==================================================================== */}
        {activeView === "calendar" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-slate-900/95 border border-slate-800 p-4 sm:p-6 shadow-2xl space-y-4"
          >
            {/* Month Header Navigation */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <i className="bi bi-calendar3 text-sky-400"></i>
                  <span>{MONTH_NAMES[selectedMonth - 1]} {selectedYear}</span>
                </h3>
                <span className="text-xs text-slate-400">
                  ({calendarGrid.reduce((acc, c) => acc + (c.isCurrentMonth ? c.hasEvents.length : 0), 0)} occasions this month)
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedMonth === 1) {
                      setSelectedMonth(12);
                      setSelectedYear((prev) => prev - 1);
                    } else {
                      setSelectedMonth((prev) => prev - 1);
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs border border-slate-700 cursor-pointer"
                >
                  <i className="bi bi-chevron-left mr-1"></i> Prev Month
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedMonth === 12) {
                      setSelectedMonth(1);
                      setSelectedYear((prev) => prev + 1);
                    } else {
                      setSelectedMonth((prev) => prev + 1);
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs border border-slate-700 cursor-pointer"
                >
                  Next Month <i className="bi bi-chevron-right ml-1"></i>
                </button>
              </div>
            </div>

            {/* Weekday Header */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-1">
              {WEEKDAY_NAMES.map((w) => (
                <div key={w} className="py-1">
                  {w}
                </div>
              ))}
            </div>

            {/* 7-Column Days Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {calendarGrid.map((cell, idx) => {
                const isCellToday = cell.isCurrentMonth && cell.day === realDay && cell.month === realMonth;
                const isCellSelected = cell.isCurrentMonth && cell.day === selectedDay && cell.month === selectedMonth;
                const eventCount = cell.hasEvents.length;

                return (
                  <div
                    key={`${cell.day}-${cell.month}-${idx}`}
                    onClick={() => {
                      if (cell.isCurrentMonth) {
                        setSelectedDay(cell.day);
                        setSelectedMonth(cell.month);
                        setActiveEventIndex(0);
                        setActiveView("spotlight");
                      }
                    }}
                    className={`min-h-[64px] sm:min-h-[76px] p-1.5 sm:p-2 rounded-xl border transition-all flex flex-col justify-between ${
                      !cell.isCurrentMonth
                        ? "opacity-30 bg-slate-950/40 border-slate-900 pointer-events-none"
                        : isCellSelected
                        ? "ring-2 ring-sky-400 bg-slate-800 border-sky-500/80 shadow-md cursor-pointer"
                        : eventCount > 0
                        ? "bg-slate-950 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700 cursor-pointer hover:-translate-y-0.5"
                        : "bg-slate-950/50 hover:bg-slate-900/40 border-slate-900 text-slate-500 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isCellToday
                            ? "bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full font-extrabold"
                            : isCellSelected
                            ? "text-sky-300 font-extrabold"
                            : "text-slate-300"
                        }`}
                      >
                        {cell.day}
                      </span>

                      {eventCount > 0 && (
                        <span className="text-[10px] font-bold text-sky-400">
                          {cell.hasEvents[0]?.moodEmoji || "✨"}
                        </span>
                      )}
                    </div>

                    {/* Event Preview Chips */}
                    {eventCount > 0 && (
                      <div className="mt-1 space-y-0.5">
                        <div className="text-[9px] sm:text-[10px] font-semibold text-slate-200 line-clamp-1 leading-tight">
                          {cell.hasEvents[0]?.event}
                        </div>
                        {eventCount > 1 && (
                          <div className="text-[8px] text-sky-400 font-bold">
                            +{eventCount - 1} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* VIEW 3: DAILY DEV & TAX QUIZ LAB                                     */}
        {/* ==================================================================== */}
        {activeView === "quiz" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-slate-900/95 border border-slate-800 p-5 sm:p-6 shadow-2xl space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 mb-1">
                  <i className="bi bi-question-diamond-fill"></i>
                  <span>Coder & AccoTax Daily Practice Lab • Day {selectedDay}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {activeQuiz?.category || "Coding & Taxation Daily Challenge"}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Score:</span>
                <span className="font-bold text-purple-300 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-800">
                  {quizScore} Correct / {quizAnsweredCount} Answered
                </span>
              </div>
            </div>

            {activeQuiz ? (
              <div className="space-y-4 pt-1">
                <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                  {activeQuiz.question}
                </p>

                {/* 4 Interactive Option Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeQuiz.options.map((opt, idx) => {
                    const isSelected = selectedQuizAnswer === idx;
                    const isCorrect = idx === activeQuiz.correctIndex;
                    const showResult = selectedQuizAnswer !== null;

                    let btnStyles = "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700";

                    if (showResult) {
                      if (isCorrect) {
                        btnStyles = "bg-emerald-950 border-emerald-600 text-emerald-200 font-bold ring-2 ring-emerald-500/40";
                      } else if (isSelected) {
                        btnStyles = "bg-rose-950 border-rose-600 text-rose-200 font-bold ring-2 ring-rose-500/40";
                      } else {
                        btnStyles = "bg-slate-950 opacity-40 border-slate-900 text-slate-500";
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={showResult}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-2.5 ${btnStyles}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {selectedQuizAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-sky-400">
                      <i className="bi bi-info-circle-fill"></i>
                      <span>Explanation & Industry Insight:</span>
                    </div>
                    <p className="leading-relaxed text-slate-300">
                      {activeQuiz.explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center text-slate-400 text-xs">
                No quiz question configured for this day.
              </div>
            )}
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* VIEW 4: 365-DAY EXPLORER & TIMELINE SEARCH                           */}
        {/* ==================================================================== */}
        {activeView === "explorer" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-slate-900/95 border border-slate-800 p-4 sm:p-6 shadow-2xl space-y-4"
          >
            {/* Header & Search Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <i className="bi bi-calendar-check-fill text-sky-400"></i>
                  <span>Coder & AccoTax Academic, Tax & Cultural Calendar</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Explore 144+ verified occasions across tech milestones, tax deadlines, national holidays, and festivals
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search occasions, tags (e.g. GST, Python, Nobel)..."
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-8 pr-8 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills & Timeframe Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {CATEGORIES.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      activeCategory === tab.id
                        ? "bg-sky-600 text-white shadow-sm"
                        : "bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    {tab.icon && <i className={`bi ${tab.icon} text-[11px]`}></i>}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center rounded-lg bg-slate-950 p-0.5 border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setTimeframe("upcoming_7")}
                  className={`px-2 py-1 rounded-md font-medium transition cursor-pointer ${
                    timeframe === "upcoming_7" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Next 7 Days
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe("upcoming_30")}
                  className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                    timeframe === "upcoming_30" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Next 30 Days
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe("this_month")}
                  className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                    timeframe === "this_month" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  This Month
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe("all")}
                  className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                    timeframe === "all" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  All Year ({allEventsWithTimeline.length})
                </button>
              </div>
            </div>

            {/* Results Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 max-h-[380px] overflow-y-auto pr-1">
                {filteredEvents.map((item) => {
                  const isItemToday = item.day === realDay && item.month === realMonth;
                  const isItemSelected = item.day === selectedDay && item.month === selectedMonth;

                  return (
                    <div
                      key={`${item.event}-${item.day}-${item.month}`}
                      onClick={() => handleSelectEvent(item)}
                      className={`group p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isItemSelected
                          ? "ring-2 ring-sky-500/80 bg-slate-800/90 border-transparent shadow-md"
                          : "bg-slate-950/60 hover:bg-slate-900/90 border-slate-800/80 hover:border-slate-700 hover:-translate-y-0.5"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
                          <span className="font-bold flex items-center gap-1 text-sky-400">
                            <span>{item.moodEmoji || "✨"}</span>
                            <span>{item.day} {MONTH_NAMES[item.month - 1]}</span>
                          </span>

                          {isItemToday ? (
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.2 rounded text-[10px] font-bold">
                              Today
                            </span>
                          ) : item.diffDays > 0 ? (
                            <span className="bg-slate-800 px-1.5 py-0.2 rounded text-[10px] text-slate-300 font-medium">
                              in {item.diffDays}d
                            </span>
                          ) : null}
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition line-clamp-1">
                          {item.event}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 font-medium truncate max-w-[120px]">
                          {item.category}
                        </span>
                        <span className="text-sky-400 font-semibold group-hover:underline flex items-center gap-0.5">
                          <span>Preview</span>
                          <i className="bi bi-arrow-right text-[9px]"></i>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                <i className="bi bi-calendar-x text-2xl text-slate-600 block mb-1"></i>
                No observances found matching your search or filters.
              </div>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}
