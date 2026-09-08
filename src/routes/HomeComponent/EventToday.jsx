// ============================================================================
// EventToday.jsx - Professional & Efficient Today's Occasion Spotlight
// ============================================================================
// Features:
// - Spatially efficient layout (compact vertical footprint under hero)
// - Dynamic mood & accent token styling matching Coder & AccoTax dark theme
// - Real-time date indicator with live pulsing badge
// - Multi-observance segmented switchers for concurrent occasions
// - Actionable sharing: 1-click WhatsApp greeting share + instant copy to clipboard
// - Intelligent fallback: Daily tech/accounting byte + next milestone countdown
// - Expandable Calendar Explorer: live search, category filters, and quick preview
// ============================================================================

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eventData from "./event_list.json";

const ALL_EVENTS = eventData?.events || [];

// Generic dynamic rule resolver: computes exact day & month for any year based on JSON dynamicRule
const getResolvedEventDate = (eventItem, targetYear) => {
  const rule = eventItem.dynamicRule;
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

  // 2. Leap year day override (e.g. leapDay: 12, nonLeapDay: 13)
  if (rule.type === "leapYearOverride") {
    const isLeap = (targetYear % 4 === 0 && targetYear % 100 !== 0) || targetYear % 400 === 0;
    return {
      day: isLeap ? rule.leapDay : rule.nonLeapDay,
      month: rule.month || eventItem.month,
    };
  }

  // 3. Nth weekday of month (e.g. 2nd Sunday of May: month: 5, nth: 2, weekday: 0)
  if (rule.type === "nthWeekdayOfMonth") {
    const firstDay = new Date(targetYear, rule.month - 1, 1).getDay();
    const day = 1 + ((rule.weekday - firstDay + 7) % 7) + (rule.nth - 1) * 7;
    return { day, month: rule.month };
  }

  // 4. Last weekday of month (e.g. Last Friday of July: month: 7, weekday: 5)
  if (rule.type === "lastWeekdayOfMonth") {
    const lastDayOfMonth = new Date(targetYear, rule.month, 0).getDate();
    const lastDayWeekday = new Date(targetYear, rule.month - 1, lastDayOfMonth).getDay();
    const day = lastDayOfMonth - ((lastDayWeekday - rule.weekday + 7) % 7);
    return { day, month: rule.month };
  }

  return { day: eventItem.day, month: eventItem.month };
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CATEGORY_TABS = [
  { id: "all", label: "All Occasions" },
  { id: "tech", label: "Tech & Code", icon: "bi-code-slash" },
  { id: "national", label: "National & India", icon: "bi-flag" },
  { id: "education", label: "Education & STEM", icon: "bi-book" },
  { id: "festival", label: "Festivals", icon: "bi-balloon-heart" },
  { id: "international", label: "Global Observance", icon: "bi-globe2" },
];

export default function EventToday() {
  const events = ALL_EVENTS;

  // Real-world current date
  const today = useMemo(() => new Date(), []);
  const realDay = today.getDate();
  const realMonth = today.getMonth() + 1;
  const realYear = today.getFullYear();

  // Navigation & preview state
  const [selectedDay, setSelectedDay] = useState(realDay);
  const [selectedMonth, setSelectedMonth] = useState(realMonth);
  const [selectedYear] = useState(realYear);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // Drawer & Filter controls
  const [showExplorer, setShowExplorer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [timeframe, setTimeframe] = useState("upcoming"); // 'upcoming' | 'this_month' | 'all'

  // Notification / Feedback states
  const [copiedQuote, setCopiedQuote] = useState(false);

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

  const isActualToday = selectedDay === realDay && selectedMonth === realMonth;

  // Resolved list of events on the selected date
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

  // All events with computed day offsets relative to real-world today
  const allEventsWithTimeline = useMemo(() => {
    const todayDate = new Date(realYear, realMonth - 1, realDay);

    return events
      .filter((e) => e.isVisible !== false)
      .map((e) => {
        let targetYear = realYear;
        if (e.yearSpecific && e.year) targetYear = e.year;

        const resolved = getResolvedEventDate(e, targetYear);
        let eventDate = new Date(targetYear, resolved.month - 1, resolved.day);

        // If already passed this year and not year-specific, project to next year for upcoming sorting
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

  // Nearest upcoming event for countdown fallback
  const nextUpcoming = useMemo(() => {
    return allEventsWithTimeline.find((e) => e.diffDays > 0) || null;
  }, [allEventsWithTimeline]);

  // Filtered explorer items
  const filteredEvents = useMemo(() => {
    return allEventsWithTimeline.filter((e) => {
      // Timeframe filter
      if (timeframe === "upcoming" && (e.diffDays < 0 || e.diffDays > 45)) return false;
      if (timeframe === "this_month" && e.month !== realMonth) return false;

      // Category filter
      if (activeCategory !== "all") {
        const cat = (e.category || "").toLowerCase();
        if (activeCategory === "tech" && !cat.includes("tech") && !cat.includes("code") && !cat.includes("computing") && !cat.includes("software")) return false;
        if (activeCategory === "national" && !cat.includes("india") && !cat.includes("national")) return false;
        if (activeCategory === "education" && !cat.includes("education") && !cat.includes("science") && !cat.includes("stem")) return false;
        if (activeCategory === "festival" && !cat.includes("festival")) return false;
        if (activeCategory === "international" && !cat.includes("international")) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = e.event.toLowerCase().includes(q);
        const matchesDesc = (e.description || "").toLowerCase().includes(q);
        const matchesCat = (e.category || "").toLowerCase().includes(q);
        const matchesQuote = (e.quote || "").toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesQuote) return false;
      }

      return true;
    });
  }, [allEventsWithTimeline, timeframe, activeCategory, searchQuery, realMonth]);

  // Dynamic Mood Palette tokens
  const moodTokens = useMemo(() => {
    const event = activeEvent || nextUpcoming;
    if (!event) {
      return {
        accent: "#38bdf8",
        border: "#0284c7",
        glow: "rgba(56, 189, 248, 0.15)",
        darkBg: "rgba(56, 189, 248, 0.05)",
        gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(2, 132, 199, 0.05), transparent)",
        mood: "Academic Excellence",
        emoji: "✨",
        icon: "bi-stars",
      };
    }

    const c = event.colorUsed || {};
    return {
      accent: c.accent || "#38bdf8",
      border: c.border || "#0284c7",
      glow: c.glow ? `${c.accent}20` : "rgba(56, 189, 248, 0.15)",
      darkBg: c.darkBg || "rgba(56, 189, 248, 0.05)",
      gradient: c.gradient || `linear-gradient(135deg, ${c.accent}20, ${c.border}08, transparent)`,
      mood: event.mood || "Celebration & Significance",
      emoji: event.moodEmoji || "🎉",
      icon: event.icon || "bi-calendar-event-fill",
    };
  }, [activeEvent, nextUpcoming]);

  // Jump to specific event
  const handleSelectEvent = useCallback((e) => {
    setSelectedDay(e.day);
    setSelectedMonth(e.month);
    setActiveEventIndex(0);
    // Smooth scroll back to section top if user was deep in drawer
    const element = document.getElementById("today-occasion-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Jump back to real-world today
  const handleResetToToday = useCallback(() => {
    setSelectedDay(realDay);
    setSelectedMonth(realMonth);
    setActiveEventIndex(0);
  }, [realDay, realMonth]);

  // Share via WhatsApp
  const handleShareWhatsApp = useCallback((event) => {
    if (!event) return;
    const shareMessage = `✨ *${event.event}* (${formattedDisplayDate})\n\n"${event.quote}"\n\n${event.description}\n\n— *Coder & AccoTax Institute*\nhttps://codernaccotax.co.in/`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [formattedDisplayDate]);

  // Copy wish to clipboard
  const handleCopy = useCallback((event) => {
    if (!event) return;
    const text = `✨ ${event.event} (${formattedDisplayDate})\n\n"${event.quote}"\n\n${event.description}\n\n— Shared from Coder & AccoTax Institute\nhttps://codernaccotax.co.in/`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2200);
    });
  }, [formattedDisplayDate]);

  return (
    <section
      id="today-occasion-section"
      className="relative w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-[#030712] border-b border-slate-800/80 overflow-hidden"
    >
      {/* Refined, Low-Distraction Ambient Background Lighting */}
      <div
        className="absolute w-[500px] h-[260px] rounded-full blur-[140px] -top-16 left-1/3 pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: moodTokens.accent }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ==================================================================== */}
        {/* Top Control Bar: Date Badge, Live Status & Quick Action Buttons      */}
        {/* ==================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Live Indicator / Occasion Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 border border-slate-800 text-slate-300 shadow-sm">
              {isActualToday ? (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              ) : (
                <i className="bi bi-clock-history text-amber-400 text-[11px]"></i>
              )}
              <span className="tracking-wide uppercase font-bold text-[11px] text-slate-200">
                {isActualToday ? "Today's Observance" : "Observance Preview"}
              </span>
            </div>

            {/* Formatted Date */}
            <div className="text-xs sm:text-sm font-medium text-slate-400 flex items-center gap-1.5">
              <i className="bi bi-calendar3 text-slate-500"></i>
              <span>{formattedDisplayDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Reset to Today Button (when previewing other days) */}
            {!isActualToday && (
              <button
                type="button"
                onClick={handleResetToToday}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-950/70 hover:bg-sky-900/80 text-sky-300 border border-sky-800/80 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="Return to today's date"
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                <span>Today</span>
              </button>
            )}

            {/* Calendar Explorer Toggle */}
            <button
              type="button"
              onClick={() => setShowExplorer(!showExplorer)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                showExplorer
                  ? "bg-slate-800 text-white border-slate-600"
                  : "bg-slate-900/90 hover:bg-slate-800/90 text-slate-300 hover:text-white border-slate-800"
              }`}
            >
              <i className="bi bi-calendar2-range text-sky-400"></i>
              <span>{showExplorer ? "Close Explorer" : "Explore Calendar"}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                {allEventsWithTimeline.filter((e) => e.diffDays >= 0 && e.diffDays <= 30).length} upcoming
              </span>
              <i className={`bi ${showExplorer ? "bi-chevron-up" : "bi-chevron-down"} text-[10px] text-slate-400`}></i>
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* Main Showcase: Spatially Efficient Event Card                        */}
        {/* ==================================================================== */}
        {activeEvent ? (
          <motion.div
            key={`${activeEvent.event}-${selectedDay}-${selectedMonth}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative rounded-2xl border backdrop-blur-xl overflow-hidden shadow-xl p-5 sm:p-6 lg:p-7 transition-all duration-300"
            style={{
              borderColor: `${moodTokens.border}40`,
              background: `radial-gradient(ellipse at top left, ${moodTokens.darkBg}, rgba(15, 23, 42, 0.85) 75%)`,
              boxShadow: `0 12px 35px -12px ${moodTokens.glow}`,
            }}
          >
            {/* Crisp Top Highlight Accent Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2.5px] transition-all duration-500"
              style={{
                background: `linear-gradient(to right, ${moodTokens.accent}, ${moodTokens.border}, #38bdf8)`,
              }}
            />

            {/* Multi-observance switcher (if 2+ events coincide today) */}
            {currentEvents.length > 1 && (
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/80 overflow-x-auto">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                  Coinciding Events:
                </span>
                {currentEvents.map((ev, idx) => (
                  <button
                    key={ev.event}
                    type="button"
                    onClick={() => setActiveEventIndex(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      idx === activeEventIndex
                        ? "bg-white text-slate-950 shadow-md font-bold"
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
              
              {/* Left Column (7 cols): Event Context & Detail */}
              <div className="lg:col-span-7 space-y-3">
                {/* Category & Mood Badges */}
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
                </div>

                {/* Event Headline with Streamlined Icon */}
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
                    <p className="text-sm sm:text-base text-slate-300 mt-1 leading-relaxed font-normal">
                      {activeEvent.description}
                    </p>
                  </div>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-md">
                    <i className="bi bi-arrow-repeat text-sky-400"></i>
                    <span>Annual Observance</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-md">
                    <i className="bi bi-geo-alt-fill text-rose-400"></i>
                    <span>National & Academic Calendar</span>
                  </span>
                </div>
              </div>

              {/* Right Column (5 cols): Editorial Quote Box & Quick Share */}
              <div className="lg:col-span-5">
                <div
                  className="relative rounded-xl p-4 sm:p-5 border backdrop-blur-md shadow-md flex flex-col justify-between h-full group transition-all"
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.7)",
                    borderColor: `${moodTokens.border}35`,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <i className="bi bi-quote text-sky-400 text-sm"></i>
                        <span>Thought for the Occasion</span>
                      </span>

                      {/* Share & Copy Action Group */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleShareWhatsApp(activeEvent)}
                          className="px-2 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 hover:text-white border border-emerald-800/80 transition-all cursor-pointer flex items-center gap-1"
                          title="Share occasion quote directly to WhatsApp"
                        >
                          <i className="bi bi-whatsapp text-emerald-400"></i>
                          <span className="hidden sm:inline">WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopy(activeEvent)}
                          className="px-2 py-1 rounded-md text-[11px] font-semibold bg-slate-800/90 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
                          title="Copy wish message to clipboard"
                        >
                          <i className={`bi ${copiedQuote ? "bi-check2 text-emerald-400" : "bi-clipboard"}`}></i>
                          <span>{copiedQuote ? "Copied!" : "Copy"}</span>
                        </button>
                      </div>
                    </div>

                    <blockquote className="text-sm sm:text-base font-medium text-slate-200 italic leading-relaxed pt-1">
                      "{activeEvent.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold truncate max-w-[180px]" style={{ color: moodTokens.border }}>
                      {activeEvent.event}
                    </span>
                    <span className="text-[10px] text-slate-500">Coder & AccoTax Academy</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          /* ==================================================================== */
          /* Fallback Mode: Compact Daily Insight + Next Occasion Countdown       */
          /* ==================================================================== */
          <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* Daily Academic Focus */}
              <div className="md:col-span-7 space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  <i className="bi bi-lightbulb-fill"></i>
                  <span>Daily Learning & Innovation Byte</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Consistent Practice Builds Real Industry Mastery
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  "Excellence in programming and financial compliance is not an act, but a daily habit of structured logic, clean syntax, and verified accuracy."
                </p>
              </div>

              {/* Next Milestone Countdown Pill */}
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
          </div>
        )}

        {/* ==================================================================== */}
        {/* Expandable Calendar Explorer: Search, Category Filters & Timeline   */}
        {/* ==================================================================== */}
        <AnimatePresence>
          {showExplorer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-4 sm:p-6 shadow-2xl space-y-4">
                
                {/* Header & Search */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <i className="bi bi-calendar-check-fill text-sky-400"></i>
                      <span>Academic, National & Cultural Calendar</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Explore technology milestones, tax seasons, national holidays, and festivals across the year
                    </p>
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-72">
                    <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search occasions or keywords..."
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

                {/* Filter Controls: Timeframe & Category Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {CATEGORY_TABS.map((tab) => (
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

                  {/* Timeframe Selector */}
                  <div className="flex items-center rounded-lg bg-slate-950 p-0.5 border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setTimeframe("upcoming")}
                      className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                        timeframe === "upcoming" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Upcoming
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
                      All Year
                    </button>
                  </div>
                </div>

                {/* Events Grid */}
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 max-h-[360px] overflow-y-auto pr-1">
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
                            {/* Date & Badge */}
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

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
