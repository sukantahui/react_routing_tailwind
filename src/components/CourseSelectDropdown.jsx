// ============================================================================
// CourseSelectDropdown.jsx - Ultra-Modern Rich Course Selector Dropdown
// ============================================================================

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Check,
  BookOpen,
  Sparkles,
  Clock,
  Tag,
  X,
  GraduationCap,
  Code2,
  Database,
  Calculator,
  BarChart3,
  Layers,
} from "lucide-react";

// Category theme helper
export const getCategoryTheme = (category = "") => {
  const cat = String(category).toLowerCase();
  if (cat.includes("web")) {
    return {
      text: "text-cyan-400",
      bg: "bg-cyan-500/15",
      border: "border-cyan-500/30",
      badge: "text-cyan-300 bg-cyan-500/20 border-cyan-500/40",
      icon: Code2,
    };
  }
  if (cat.includes("program") || cat.includes("python") || cat.includes("java") || cat.includes("c++")) {
    return {
      text: "text-emerald-400",
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/30",
      badge: "text-emerald-300 bg-emerald-500/20 border-emerald-500/40",
      icon: Layers,
    };
  }
  if (cat.includes("sql") || cat.includes("rdbms") || cat.includes("database")) {
    return {
      text: "text-purple-400",
      bg: "bg-purple-500/15",
      border: "border-purple-500/30",
      badge: "text-purple-300 bg-purple-500/20 border-purple-500/40",
      icon: Database,
    };
  }
  if (cat.includes("account") || cat.includes("tax") || cat.includes("tally") || cat.includes("gst")) {
    return {
      text: "text-amber-400",
      bg: "bg-amber-500/15",
      border: "border-amber-500/30",
      badge: "text-amber-300 bg-amber-500/20 border-amber-500/40",
      icon: Calculator,
    };
  }
  if (cat.includes("data") || cat.includes("excel") || cat.includes("power bi") || cat.includes("machine")) {
    return {
      text: "text-blue-400",
      bg: "bg-blue-500/15",
      border: "border-blue-500/30",
      badge: "text-blue-300 bg-blue-500/20 border-blue-500/40",
      icon: BarChart3,
    };
  }
  if (cat.includes("school") || cat.includes("icse") || cat.includes("isc") || cat.includes("cbse") || cat.includes("wb")) {
    return {
      text: "text-rose-400",
      bg: "bg-rose-500/15",
      border: "border-rose-500/30",
      badge: "text-rose-300 bg-rose-500/20 border-rose-500/40",
      icon: GraduationCap,
    };
  }
  return {
    text: "text-sky-400",
    bg: "bg-sky-500/15",
    border: "border-sky-500/30",
    badge: "text-sky-300 bg-sky-500/20 border-sky-500/40",
    icon: BookOpen,
  };
};

export default function CourseSelectDropdown({
  courses = [],
  selectedCourseId = "",
  onSelectCourse,
  onSwitchToCustom,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Selected course object
  const selectedCourse = useMemo(() => {
    return courses.find((c) => c.courseID === selectedCourseId) || courses[0] || null;
  }, [courses, selectedCourseId]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    courses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [courses]);

  // Filtered courses based on search & category
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchCategory = selectedCategory === "all" || c.category === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const titleMatch = c.title?.toLowerCase().includes(q);
      const catMatch = c.category?.toLowerCase().includes(q);
      const descMatch = c.desc?.toLowerCase().includes(q);
      const skillsMatch = Array.isArray(c.skills) && c.skills.some((s) => s.toLowerCase().includes(q));
      const feeMatch = c.fee?.toLowerCase().includes(q);
      return titleMatch || catMatch || descMatch || skillsMatch || feeMatch;
    });
  }, [courses, selectedCategory, searchQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
      setSelectedCategory("all");
    }
  }, [isOpen]);

  // Keyboard navigation listener (Escape to close)
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const selectedTheme = getCategoryTheme(selectedCourse?.category);
  const SelectedIcon = selectedTheme.icon;

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef} onKeyDown={handleKeyDown}>
      {/* Trigger Button: Shows selected course with rich details */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border transition-all duration-200 cursor-pointer shadow-lg group focus:outline-none ${
          isOpen
            ? "border-sky-500/80 ring-2 ring-sky-500/30 shadow-sky-500/10"
            : "border-slate-700/80 hover:border-slate-600 hover:bg-slate-850"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {/* Category Icon Badge */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${selectedTheme.bg} ${selectedTheme.border} ${selectedTheme.text} shadow-sm group-hover:scale-105 transition-transform duration-200 mt-0.5`}
            >
              <SelectedIcon size={20} />
            </div>

            {/* Course Title & Category Meta */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${selectedTheme.badge}`}
                >
                  {selectedCourse?.category || "Course"}
                </span>
                {selectedCourse?.level && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                    {selectedCourse.level}
                  </span>
                )}
                {selectedCourse?.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Sparkles size={10} />
                    {selectedCourse.badge}
                  </span>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                {selectedCourse?.title || "Select a Course"}
              </h4>

              {/* Quick Details Chips */}
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {selectedCourse?.fee || "Standard Fee"}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                  <Clock size={11} className="text-sky-400" />
                  {selectedCourse?.duration || "Regular Track"}
                </span>
                {selectedCourse?.mode && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-md border border-slate-700/30">
                    {selectedCourse.mode}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Chevron Indicator */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-slate-800 group-hover:bg-slate-700 text-slate-300 group-hover:text-white flex items-center justify-center transition-colors">
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-sky-400" : ""}`}
              />
            </div>
          </div>
        </div>
      </button>

      {/* Rich Dropdown Overlay Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-slate-950/98 backdrop-blur-2xl border border-slate-700/90 rounded-2xl shadow-2xl shadow-black/90 p-3 z-50 ring-1 ring-sky-500/20 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Search Header */}
          <div className="relative mb-2.5">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course name, category, or skill (e.g. React, Python, GST, DSA)..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 border-b border-slate-800/80 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              All Tracks ({courses.length})
            </button>
            {categories.map((cat) => {
              const theme = getCategoryTheme(cat);
              const isCatActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isCatActive
                      ? `${theme.bg} ${theme.text} border ${theme.border} shadow-sm font-bold`
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Courses List Container */}
          <div className="max-h-[340px] overflow-y-auto space-y-1.5 pr-1 focus:outline-none">
            {filteredCourses.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs sm:text-sm space-y-2">
                <BookOpen size={28} className="mx-auto text-slate-600 opacity-60" />
                <p className="font-semibold text-slate-300">No courses match "{searchQuery}"</p>
                <p className="text-slate-500 text-xs">
                  Try searching for another topic or create a custom subject.
                </p>
                {onSwitchToCustom && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onSwitchToCustom();
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/30 text-xs font-semibold transition cursor-pointer"
                  >
                    <span>+ Enter Custom Subject / Topic</span>
                  </button>
                )}
              </div>
            ) : (
              filteredCourses.map((c) => {
                const isSelected = c.courseID === selectedCourseId;
                const theme = getCategoryTheme(c.category);
                const ItemIcon = theme.icon;

                return (
                  <button
                    key={c.courseID}
                    type="button"
                    onClick={() => {
                      onSelectCourse(c);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-150 cursor-pointer group flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-gradient-to-r from-sky-500/20 via-indigo-500/15 to-purple-500/10 border-sky-500/50 shadow-md ring-1 ring-sky-500/30"
                        : "bg-slate-900/60 hover:bg-slate-850 border-slate-800/80 hover:border-slate-700 text-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      {/* Icon */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${theme.bg} ${theme.border} ${theme.text} mt-0.5 group-hover:scale-105 transition`}
                      >
                        <ItemIcon size={16} />
                      </div>

                      <div className="min-w-0 flex-1">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${theme.badge}`}>
                            {c.category}
                          </span>
                          {c.level && (
                            <span className="text-[9px] text-slate-400 bg-slate-800 px-1 py-0.2 rounded">
                              {c.level}
                            </span>
                          )}
                          {c.badge && (
                            <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {c.badge}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h5
                          className={`text-xs sm:text-sm font-bold truncate group-hover:text-sky-300 transition-colors ${
                            isSelected ? "text-sky-200 font-extrabold" : "text-white"
                          }`}
                        >
                          {c.title}
                        </h5>

                        {/* Description / Skills */}
                        {c.desc && (
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 group-hover:text-slate-300">
                            {c.desc}
                          </p>
                        )}

                        {/* Fee and Duration Pill row */}
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px]">
                          <span className="font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            {c.fee || "Standard Fee"}
                          </span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock size={10} className="text-slate-500" />
                            {c.duration || "Course"}
                          </span>
                          {c.mode && <span className="text-slate-500 hidden sm:inline">• {c.mode}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Selected Checkmark badge */}
                    <div className="flex-shrink-0 self-center">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/30">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-slate-700 group-hover:border-sky-500/40 flex items-center justify-center text-transparent group-hover:text-slate-500 transition">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer with summary and custom course trigger */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>
              Showing <strong className="text-slate-200">{filteredCourses.length}</strong> of {courses.length} courses
            </span>
            {onSwitchToCustom && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onSwitchToCustom();
                }}
                className="text-sky-400 hover:text-sky-300 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>+ Custom Subject</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
