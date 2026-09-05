// ============================================================================
// EventToday.jsx - Dynamic Today's Event & Mood Celebration Banner
// ============================================================================

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eventData from "./event_list.json";

const ALL_EVENTS = eventData?.events || [];

export default function EventToday() {
  // Calendar data
  const events = ALL_EVENTS;

  // Current real-world date
  const today = useMemo(() => new Date(), []);
  const realDay = today.getDate();
  const realMonth = today.getMonth() + 1;
  const realYear = today.getFullYear();

  // Selected date state (defaults to today, allows interactive preview)
  const [selectedDay, setSelectedDay] = useState(realDay);
  const [selectedMonth, setSelectedMonth] = useState(realMonth);
  const [selectedYear] = useState(realYear);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // Month names helper
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Formatted date string for display
  const formattedDisplayDate = useMemo(() => {
    const d = new Date(selectedYear, selectedMonth - 1, selectedDay);
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [selectedDay, selectedMonth, selectedYear]);

  // Check if viewing today's actual date
  const isActualToday = selectedDay === realDay && selectedMonth === realMonth;

  // Events matching the selected date
  const currentEvents = useMemo(() => {
    return events.filter((e) => {
      if (e.isVisible === false) return false;
      if (e.day !== selectedDay || e.month !== selectedMonth) return false;
      if (e.yearSpecific && e.year !== selectedYear) return false;
      return true;
    });
  }, [events, selectedDay, selectedMonth, selectedYear]);

  // Primary active event for the date
  const activeEvent = currentEvents[activeEventIndex] || currentEvents[0] || null;

  // Upcoming upcoming events (next 4 upcoming events from today)
  const upcomingEvents = useMemo(() => {
    const sorted = [...events].filter((e) => e.isVisible !== false);

    // Calculate days until event
    const withDays = sorted.map((e) => {
      let targetYear = realYear;
      if (e.yearSpecific && e.year) targetYear = e.year;

      let eventDate = new Date(targetYear, e.month - 1, e.day);
      const todayDate = new Date(realYear, realMonth - 1, realDay);

      // If already passed this year and not year-specific, check next year
      if (eventDate < todayDate && !e.yearSpecific) {
        eventDate = new Date(targetYear + 1, e.month - 1, e.day);
      }

      const diffTime = eventDate - todayDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return { ...e, diffDays, targetDate: eventDate };
    });

    return withDays
      .filter((e) => e.diffDays > 0)
      .sort((a, b) => a.diffDays - b.diffDays)
      .slice(0, 4);
  }, [events, realDay, realMonth, realYear]);

  // Nearest upcoming event fallback if today has no event
  const nextUpcoming = upcomingEvents[0] || null;

  // Dynamic Mood Palette tokens based on active event
  const moodTokens = useMemo(() => {
    const event = activeEvent || nextUpcoming;
    if (!event) {
      return {
        accent: "#38bdf8",
        border: "#0284c7",
        glow: "rgba(56, 189, 248, 0.25)",
        darkBg: "rgba(56, 189, 248, 0.08)",
        gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(2, 132, 199, 0.08), transparent)",
        mood: "Inspired & Academic",
        emoji: "✨",
        icon: "bi-stars",
      };
    }

    const c = event.colorUsed || {};
    return {
      accent: c.accent || "#38bdf8",
      border: c.border || "#0284c7",
      glow: c.glow || "rgba(56, 189, 248, 0.3)",
      darkBg: c.darkBg || "rgba(56, 189, 248, 0.08)",
      gradient: c.gradient || `linear-gradient(135deg, ${c.accent}25, ${c.border}15, transparent)`,
      mood: event.mood || "Celebration & Significance",
      emoji: event.moodEmoji || "🎉",
      icon: event.icon || "bi-calendar-event-fill",
    };
  }, [activeEvent, nextUpcoming]);

  // Handle quote copying
  const handleCopy = (event) => {
    if (!event) return;
    const text = `"${event.quote}"\n— On the occasion of ${event.event} (${formattedDisplayDate})\nShared from Coder & AccoTax Institute`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2400);
    });
  };

  return (
    <section className="relative w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#030712] overflow-hidden border-b border-slate-800/80">
      {/* Dynamic Ambient Background Glows tailored to Mood Color */}
      <div
        className="absolute w-[500px] h-[350px] rounded-full blur-[140px] -top-24 -left-20 pointer-events-none transition-all duration-700 opacity-60"
        style={{ backgroundColor: moodTokens.accent }}
      />
      <div
        className="absolute w-[400px] h-[300px] rounded-full blur-[140px] -bottom-24 -right-16 pointer-events-none transition-all duration-700 opacity-40"
        style={{ backgroundColor: moodTokens.border }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Mini Header: Date Badge & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors duration-300 border shadow-sm"
              style={{
                backgroundColor: moodTokens.darkBg,
                borderColor: `${moodTokens.border}50`,
                color: moodTokens.border,
              }}
            >
              <i className="bi bi-calendar2-heart-fill"></i>
              <span>{isActualToday ? "TODAY'S OCCASION" : "OBSERVANCE PREVIEW"}</span>
            </span>

            <span className="text-xs sm:text-sm font-medium text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
              {formattedDisplayDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick reset to Today if user clicked preview */}
            {!isActualToday && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDay(realDay);
                  setSelectedMonth(realMonth);
                  setActiveEventIndex(0);
                }}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                title="Jump back to current real-world date"
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                <span>Jump to Today</span>
              </button>
            )}

            {/* Toggle upcoming events drawer */}
            <button
              type="button"
              onClick={() => setShowUpcoming(!showUpcoming)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition cursor-pointer flex items-center gap-1.5"
            >
              <i className="bi bi-calendar3"></i>
              <span>{showUpcoming ? "Hide Calendar" : "Upcoming Days"}</span>
              <i className={`bi ${showUpcoming ? "bi-chevron-up" : "bi-chevron-down"} text-[10px]`}></i>
            </button>
          </div>
        </div>

        {/* Main Event Showcase Card */}
        {activeEvent ? (
          <motion.div
            key={`${activeEvent.event}-${selectedDay}-${selectedMonth}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative rounded-3xl border backdrop-blur-2xl overflow-hidden shadow-2xl p-6 sm:p-8 md:p-10 transition-all duration-500"
            style={{
              borderColor: `${moodTokens.border}50`,
              background: `radial-gradient(ellipse at top left, ${moodTokens.darkBg}, rgba(15, 23, 42, 0.85) 60%)`,
              boxShadow: `0 20px 50px -15px ${moodTokens.glow}`,
            }}
          >
            {/* Top Multi-Color Accent Glow Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-700"
              style={{
                background: `linear-gradient(to right, ${moodTokens.accent}, ${moodTokens.border}, #38bdf8)`,
              }}
            />

            {/* Multi-event switcher tabs (if more than 1 event falls on today) */}
            {currentEvents.length > 1 && (
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800/80 overflow-x-auto">
                <span className="text-xs text-slate-400 font-semibold mr-1">Observances:</span>
                {currentEvents.map((ev, idx) => (
                  <button
                    key={ev.event}
                    type="button"
                    onClick={() => setActiveEventIndex(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      idx === activeEventIndex
                        ? "bg-white text-slate-950 shadow-md scale-105"
                        : "bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60"
                    }`}
                  >
                    <span>{ev.moodEmoji || "✨"}</span>
                    <span>{ev.event}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              {/* Left Column: Event Details & Badges */}
              <div className="lg:col-span-7 space-y-4">
                {/* Mood Tag & Category */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-sm border"
                    style={{
                      backgroundColor: `${moodTokens.accent}20`,
                      borderColor: `${moodTokens.accent}60`,
                      color: moodTokens.accent,
                    }}
                  >
                    <span className="text-sm">{activeEvent.moodEmoji}</span>
                    <span>{activeEvent.category}</span>
                  </span>

                  {/* Mood depiction pill */}
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 border border-slate-700/80 text-slate-200"
                    title="Mood depicted by today's calendar color scheme"
                  >
                    <i className="bi bi-palette text-xs" style={{ color: moodTokens.accent }}></i>
                    <span className="text-slate-400">Mood:</span>
                    <span className="font-bold text-slate-100">{activeEvent.mood}</span>
                  </span>
                </div>

                {/* Event Title with Large Icon */}
                <div className="flex items-start gap-3.5 sm:gap-4 pt-1">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border transition-transform duration-300 hover:scale-105"
                    style={{
                      backgroundColor: moodTokens.darkBg,
                      borderColor: `${moodTokens.border}70`,
                      color: moodTokens.accent,
                    }}
                  >
                    <i className={`bi ${moodTokens.icon} text-2xl sm:text-3xl`}></i>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      {activeEvent.event}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 mt-1.5 leading-relaxed font-normal">
                      {activeEvent.description}
                    </p>
                  </div>
                </div>

                {/* Event Metadata Chips */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-lg">
                    <i className="bi bi-clock-history text-sky-400"></i>
                    <span>Observed Annually</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-lg">
                    <i className="bi bi-geo-alt-fill text-rose-400"></i>
                    <span>National & Academic Calendar</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Mood Quote Box with Interactive Sharing */}
              <div className="lg:col-span-5">
                <div
                  className="relative rounded-2xl p-5 sm:p-6 border backdrop-blur-md shadow-xl flex flex-col justify-between h-full group"
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.75)",
                    borderColor: `${moodTokens.border}45`,
                  }}
                >
                  {/* Watermark Quote Icon */}
                  <i
                    className="bi bi-quote absolute right-4 bottom-2 text-6xl pointer-events-none opacity-10 transition-opacity group-hover:opacity-20"
                    style={{ color: moodTokens.accent }}
                  ></i>

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <i className="bi bi-chat-heart-fill text-amber-400"></i>
                        Thought for the Day
                      </span>

                      <button
                        type="button"
                        onClick={() => handleCopy(activeEvent)}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer flex items-center gap-1"
                        title="Copy quote and celebration message"
                      >
                        <i className={`bi ${copiedQuote ? "bi-check2 text-emerald-400" : "bi-share"}`}></i>
                        <span>{copiedQuote ? "Copied!" : "Share Wish"}</span>
                      </button>
                    </div>

                    <blockquote className="text-base sm:text-lg font-medium text-slate-100 italic leading-relaxed">
                      "{activeEvent.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold" style={{ color: moodTokens.border }}>
                      {activeEvent.event} Special
                    </span>
                    <span className="text-[11px] text-slate-500">Coder & AccoTax Academy</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          /* Fallback when no event falls exactly on this day */
          <div
            className="rounded-3xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 text-center relative overflow-hidden"
          >
            <div className="max-w-xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                <i className="bi bi-lightbulb-fill"></i>
                <span>Daily Academic Inspiration</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Every Day is an Opportunity to Learn & Code
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                "Continuous learning is the minimum requirement for success in technology and life."
              </p>

              {nextUpcoming && (
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                    <span className="text-base">{nextUpcoming.moodEmoji}</span>
                    <span>Next celebration:</span>
                    <strong className="text-sky-400">{nextUpcoming.event}</strong>
                    <span className="text-slate-400">({nextUpcoming.day} {monthNames[nextUpcoming.month - 1]})</span>
                    <span className="bg-sky-950 text-sky-300 px-2 py-0.5 rounded-full text-[10px] font-bold border border-sky-800/60">
                      in {nextUpcoming.diffDays} {nextUpcoming.diffDays === 1 ? "day" : "days"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Collapsible Upcoming Occasions Drawer */}
        <AnimatePresence>
          {showUpcoming && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 overflow-hidden"
            >
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <i className="bi bi-calendar-check-fill text-sky-400"></i>
                      <span>Upcoming Significant Occasions</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      National holidays, education milestones & cultural celebrations on our radar
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {upcomingEvents.map((item) => (
                    <div
                      key={`${item.event}-${item.day}`}
                      onClick={() => {
                        setSelectedDay(item.day);
                        setSelectedMonth(item.month);
                        setActiveEventIndex(0);
                      }}
                      className="group p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 flex flex-col justify-between"
                      style={{
                        backgroundColor: "rgba(15, 23, 42, 0.7)",
                        borderColor: `${item.colorUsed?.border || "#334155"}40`,
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-2 text-slate-400">
                          <span className="font-bold flex items-center gap-1" style={{ color: item.colorUsed?.border || "#38bdf8" }}>
                            <span>{item.moodEmoji}</span>
                            <span>{item.day} {monthNames[item.month - 1]}</span>
                          </span>
                          <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 font-medium">
                            in {item.diffDays}d
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition">
                          {item.event}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 font-medium">{item.category}</span>
                        <span className="text-sky-400 font-semibold group-hover:underline flex items-center gap-0.5">
                          <span>Preview</span>
                          <i className="bi bi-arrow-right text-[9px]"></i>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
