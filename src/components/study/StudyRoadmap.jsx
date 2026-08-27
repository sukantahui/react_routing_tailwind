// src/components/study/quantitative-analysis/QuantitativeAnalysisRoadmap.jsx

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Code2,
  ShieldCheck,
  Sparkles,
  Clock,
  CheckCircle2,
  Circle,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Search,
  X,
  BookOpen,
  GraduationCap,
  Award,
  BookMarked,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  TrendingUp,
  Flame,
  ArrowRight,
  RotateCcw,
  Lock,
  Unlock,
  Linkedin,
  Twitter,
  Globe,
  Github,
  Mail,
  Phone,
  MessageSquare,
  Compass,
  ListOrdered
} from "lucide-react";
import TeacherProfileCard, { defaultTeacher } from "./common/TeacherProfileCard";

// Subtle, refined segment themes (calm & professional)
const SEGMENT_THEMES = [
  {
    name: "sky",
    badge: "bg-slate-900 text-sky-300 border-slate-750",
    accent: "text-sky-400",
    border: "border-slate-800 hover:border-slate-700",
    dot: "bg-sky-400"
  },
  {
    name: "teal",
    badge: "bg-slate-900 text-teal-300 border-slate-750",
    accent: "text-teal-400",
    border: "border-slate-800 hover:border-slate-700",
    dot: "bg-teal-400"
  },
  {
    name: "amber",
    badge: "bg-slate-900 text-amber-300 border-slate-750",
    accent: "text-amber-400",
    border: "border-slate-800 hover:border-slate-700",
    dot: "bg-amber-400"
  },
  {
    name: "indigo",
    badge: "bg-slate-900 text-indigo-300 border-slate-750",
    accent: "text-indigo-400",
    border: "border-slate-800 hover:border-slate-700",
    dot: "bg-indigo-400"
  },
  {
    name: "rose",
    badge: "bg-slate-900 text-rose-300 border-slate-750",
    accent: "text-rose-400",
    border: "border-slate-800 hover:border-slate-700",
    dot: "bg-rose-400"
  }
];

export default function StudyRoadmap({ roadmapData, subjectKey }) {
  // ==========================================================
  // State
  // ==========================================================
  const [search, setSearch] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'completed' | 'incomplete' | 'bookmarked'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'timeline'
  const [activeTabModal, setActiveTabModal] = useState(null); // 'outcomes' | 'books' | 'prereq' | null
  const [expandedTopics, setExpandedTopics] = useState({});
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [lastVisited, setLastVisited] = useState(null);
  const [, setAuthVersion] = useState(0);

  // Storage Keys — unique per subject/course
  const storageSubject = subjectKey || roadmapData?.folder || roadmapData?.subjectCode || "study";
  const COMPLETED_KEY_PREFIX = `${storageSubject}-module-completed::`;
  const BOOKMARKED_KEY_PREFIX = `${storageSubject}-module-bookmarked::`;
  const LAST_VISITED_KEY = `${storageSubject}-last-visited-module`;

  // Helper to determine the active segment ID from lastVisited or storage
  const resolveActiveSegmentId = useCallback((visitedData) => {
    if (visitedData?.segmentId) {
      const exists = (roadmapData?.segments || []).some(s => s.segmentId === visitedData.segmentId);
      if (exists) return visitedData.segmentId;
    }
    if (visitedData?.slug || visitedData?.moduleId) {
      for (const seg of roadmapData?.segments || []) {
        if (seg.modules?.some(m => m.slug === visitedData.slug || m.moduleId === visitedData.moduleId)) {
          return seg.segmentId;
        }
      }
    }
    return roadmapData?.segments?.[0]?.segmentId || null;
  }, [roadmapData]);

  // Initial active segment (defaults to last visited or first segment)
  const [activeSegmentId, setActiveSegmentId] = useState(() => {
    try {
      const stored = localStorage.getItem(LAST_VISITED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return resolveActiveSegmentId(parsed);
      }
    } catch {
      // ignore
    }
    return roadmapData?.segments?.[0]?.segmentId || null;
  });

  // Track expanded state per segment: only current/last visited is open initially; others minimized
  const [expandedSegments, setExpandedSegments] = useState(() => {
    let initId = null;
    try {
      const stored = localStorage.getItem(LAST_VISITED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        initId = resolveActiveSegmentId(parsed);
      }
    } catch {
      // ignore
    }
    if (!initId) {
      initId = roadmapData?.segments?.[0]?.segmentId;
    }
    const map = {};
    (roadmapData?.segments || []).forEach(seg => {
      map[seg.segmentId] = seg.segmentId === initId;
    });
    return map;
  });

  // Segment accordion controls (expanding one minimizes all others)
  const toggleSegment = (segmentId) => {
    setExpandedSegments(prev => {
      const isCurrentlyExpanded = !!prev[segmentId];
      if (isCurrentlyExpanded) {
        return { ...prev, [segmentId]: false };
      } else {
        setActiveSegmentId(segmentId);
        const map = {};
        (roadmapData?.segments || []).forEach(seg => {
          map[seg.segmentId] = seg.segmentId === segmentId;
        });
        return map;
      }
    });
  };

  const expandOnlySegment = (segmentId) => {
    setActiveSegmentId(segmentId);
    setExpandedSegments(() => {
      const map = {};
      (roadmapData?.segments || []).forEach(seg => {
        map[seg.segmentId] = seg.segmentId === segmentId;
      });
      return map;
    });
  };

  const expandAllSegments = () => {
    const map = {};
    (roadmapData?.segments || []).forEach(seg => {
      map[seg.segmentId] = true;
    });
    setExpandedSegments(map);
  };

  const collapseAllSegments = () => {
    const map = {};
    (roadmapData?.segments || []).forEach(seg => {
      map[seg.segmentId] = false;
    });
    setExpandedSegments(map);
  };

  if (!roadmapData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold mb-2">Course data not provided</h1>
          <p className="text-sm text-slate-400">StudyRoadmap requires a roadmapData object.</p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // Auth & Storage Listeners
  // ==========================================================
  useEffect(() => {
    const handleAuthChange = () => {
      setAuthVersion(v => v + 1);
      try {
        const stored = localStorage.getItem(LAST_VISITED_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setLastVisited(parsed);
          const resolvedId = resolveActiveSegmentId(parsed);
          if (resolvedId) {
            setActiveSegmentId(resolvedId);
          }
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("authChange", handleAuthChange);
    document.addEventListener("visibilitychange", handleAuthChange);

    // Retrieve last visited on mount and auto-open active segment
    try {
      const stored = localStorage.getItem(LAST_VISITED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLastVisited(parsed);
        const resolvedId = resolveActiveSegmentId(parsed);
        if (resolvedId) {
          setActiveSegmentId(resolvedId);
          // Keep only current segment open, minimize others
          setExpandedSegments({ [resolvedId]: true });
        }
      }
    } catch {
      // ignore
    }

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("authChange", handleAuthChange);
      document.removeEventListener("visibilitychange", handleAuthChange);
    };
  }, [roadmapData, LAST_VISITED_KEY, resolveActiveSegmentId]);

  const isLoggedIn = useCallback(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!(token && user);
  }, []);

  // Show quick toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  // Module completion helpers
  const isCompleted = useCallback((moduleId) => {
    return localStorage.getItem(`${COMPLETED_KEY_PREFIX}${moduleId}`) === "true";
  }, [COMPLETED_KEY_PREFIX]);

  const toggleCompleted = (moduleId, title) => {
    const current = isCompleted(moduleId);
    const nextVal = !current;
    localStorage.setItem(`${COMPLETED_KEY_PREFIX}${moduleId}`, nextVal.toString());
    setAuthVersion(v => v + 1);
    showToast(nextVal ? `Completed: "${title}"` : `Marked incomplete: "${title}"`);
  };

  // Bookmark helpers
  const isBookmarked = useCallback((moduleId) => {
    return localStorage.getItem(`${BOOKMARKED_KEY_PREFIX}${moduleId}`) === "true";
  }, [BOOKMARKED_KEY_PREFIX]);

  const toggleBookmark = (moduleId, title) => {
    const current = isBookmarked(moduleId);
    const nextVal = !current;
    localStorage.setItem(`${BOOKMARKED_KEY_PREFIX}${moduleId}`, nextVal.toString());
    setAuthVersion(v => v + 1);
    showToast(nextVal ? `Bookmarked "${title}"` : `Removed bookmark from "${title}"`);
  };

  // Record last visited module & segment
  const recordVisit = (module, segmentId, segmentTitle) => {
    const data = {
      slug: module.slug,
      title: module.title,
      moduleId: module.moduleId,
      segmentId: segmentId || "",
      segmentTitle: segmentTitle || "",
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(data));
      setLastVisited(data);
      if (segmentId) {
        setActiveSegmentId(segmentId);
      }
    } catch {
      // ignore
    }
  };

  // Copy Direct Link
  const copyDirectLink = (slug, title) => {
    const directURL = `${window.location.origin}/${roadmapData.folder}/module/${slug}`;
    navigator.clipboard.writeText(directURL);
    setCopiedSlug(slug);
    showToast(`Link copied for: "${title}"`);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  // Toggle topic list expansion (expanding one minimizes others)
  const toggleTopicExpand = (moduleId) => {
    setExpandedTopics(prev => {
      const isCurrentlyExpanded = !!prev[moduleId];
      if (isCurrentlyExpanded) {
        return { ...prev, [moduleId]: false };
      } else {
        return { [moduleId]: true };
      }
    });
  };

  // Module Visibility Check
  const isModuleVisible = useCallback((module) => {
    if (!module || !('visibility' in module)) return true;
    const vis = module.visibility.toLowerCase();
    if (vis === "public") return true;
    if (vis === "loggedin") return isLoggedIn();
    return false;
  }, [isLoggedIn]);

  // ==========================================================
  // Compute Stats & Filtered Modules
  // ==========================================================
  const flatModules = useMemo(() => {
    const list = [];
    roadmapData.segments.forEach((seg, sIndex) => {
      seg.modules.forEach((mod, mIndex) => {
        list.push({
          ...mod,
          segmentId: seg.segmentId,
          segmentTitle: seg.title,
          segmentIndex: sIndex,
          indexOverall: list.length + 1,
          moduleIndexInSegment: mIndex + 1
        });
      });
    });
    return list;
  }, []);

  // Completion & Progress Metrics
  const stats = useMemo(() => {
    const total = flatModules.length;
    let completedCount = 0;
    let completedHours = 0;
    let totalHours = 0;
    let bookmarkedCount = 0;

    flatModules.forEach(m => {
      const hrs = Number(m.estimatedHours) || 0;
      totalHours += hrs;
      if (isCompleted(m.moduleId)) {
        completedCount++;
        completedHours += hrs;
      }
      if (isBookmarked(m.moduleId)) {
        bookmarkedCount++;
      }
    });

    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    return {
      total,
      completedCount,
      remainingCount: total - completedCount,
      percent,
      totalHours: roadmapData.course?.totalAllottedHours || totalHours,
      completedHours,
      bookmarkedCount,
      totalTopics: flatModules.reduce((acc, curr) => acc + (curr.topics?.length || 0), 0)
    };
  }, [flatModules, isCompleted, isBookmarked]);

  // Next suggested module
  const nextIncompleteModule = useMemo(() => {
    return flatModules.find(m => !isCompleted(m.moduleId) && isModuleVisible(m));
  }, [flatModules, isCompleted, isModuleVisible]);

  // Search & Filtering Logic
  const matchesSearch = useCallback((module) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    const titleMatch = module.title?.toLowerCase().includes(q);
    const idMatch = module.moduleId?.toLowerCase().includes(q);
    const summaryMatch = module.summary?.toLowerCase().includes(q);
    const topicMatch = Array.isArray(module.topics) &&
      module.topics.some(t => t.toLowerCase().includes(q));
    return titleMatch || idMatch || summaryMatch || topicMatch;
  }, [search]);

  const matchesFilters = useCallback((module) => {
    // Segment filter
    if (selectedSegment !== "all" && module.segmentId !== selectedSegment) {
      return false;
    }

    // Difficulty filter
    if (difficultyFilter !== "all") {
      const diff = (module.difficulty || "").toLowerCase();
      if (difficultyFilter === "easy" && !diff.includes("easy")) return false;
      if (difficultyFilter === "medium" && !diff.includes("medium")) return false;
      if (difficultyFilter === "advanced" && !diff.includes("advanced")) return false;
    }

    // Status filter
    if (statusFilter === "completed" && !isCompleted(module.moduleId)) return false;
    if (statusFilter === "incomplete" && isCompleted(module.moduleId)) return false;
    if (statusFilter === "bookmarked" && !isBookmarked(module.moduleId)) return false;
    if (statusFilter === "premium" && module.visibility !== "loggedIn") return false;

    // Search query
    return matchesSearch(module);
  }, [selectedSegment, difficultyFilter, statusFilter, isCompleted, isBookmarked, matchesSearch]);

  // Segments with filtered modules
  const filteredSegments = useMemo(() => {
    return roadmapData.segments.map((seg, sIndex) => {
      const filtered = seg.modules
        .map((mod, mIndex) => ({
          ...mod,
          segmentId: seg.segmentId,
          segmentTitle: seg.title,
          segmentIndex: sIndex,
          moduleIndexInSegment: mIndex + 1
        }))
        .filter(matchesFilters);

      return {
        ...seg,
        theme: SEGMENT_THEMES[sIndex % SEGMENT_THEMES.length],
        filteredModules: filtered,
        totalModulesInSegment: seg.modules.length,
        completedInSegment: seg.modules.filter(m => isCompleted(m.moduleId)).length
      };
    }).filter(seg => seg.filteredModules.length > 0);
  }, [matchesFilters, isCompleted]);

  const totalFilteredCount = useMemo(() => {
    return filteredSegments.reduce((acc, s) => acc + s.filteredModules.length, 0);
  }, [filteredSegments]);

  const teacher = roadmapData.teacher || defaultTeacher;

  // Reset Progress Handler
  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all completion and bookmark progress for this course?")) {
      flatModules.forEach(m => {
        localStorage.removeItem(`${COMPLETED_KEY_PREFIX}${m.moduleId}`);
        localStorage.removeItem(`${BOOKMARKED_KEY_PREFIX}${m.moduleId}`);
      });
      localStorage.removeItem(LAST_VISITED_KEY);
      setLastVisited(null);
      setAuthVersion(v => v + 1);
      showToast("Progress reset successfully.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-slate-800 selection:text-slate-200">
      
      {/* ========================================================== */}
      {/* Toast Notification */}
      {/* ========================================================== */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 shadow-xl backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* ========================================================== */}
        {/* Course Header & Hero */}
        {/* ========================================================== */}
        <header className="mb-10 text-center relative">
          
          {/* Top Pill Badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800">
              <GraduationCap size={13} className="text-sky-400" />
              {roadmapData.subjectCode || "LLM104"} · {roadmapData.course?.program || "Master of Law"}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800">
              <Compass size={13} className="text-indigo-400" />
              {roadmapData.course?.semester || "Semester-I"} · {roadmapData.course?.academicYear || "2026"}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800">
              <Clock size={13} className="text-emerald-400" />
              {roadmapData.course?.credits || 4} Credits ({roadmapData.course?.totalAllottedHours || 60} Total Hours)
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            {roadmapData.trackTitle || "Quantitative Analysis"}
          </h1>

          {/* Description */}
          <p className="max-w-3xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed mb-6">
            {roadmapData.description}
          </p>

          {/* Quick Academic Modals / Action Trigger Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => setActiveTabModal(activeTabModal === "outcomes" ? null : "outcomes")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                activeTabModal === "outcomes"
                  ? "bg-slate-800 border-slate-600 text-white shadow-sm"
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <Award size={14} className="text-sky-400" />
              Course Outcomes (CO1–CO4)
              <ChevronDown size={13} className={`transition-transform ${activeTabModal === "outcomes" ? "rotate-180" : ""}`} />
            </button>

            <button
              onClick={() => setActiveTabModal(activeTabModal === "books" ? null : "books")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                activeTabModal === "books"
                  ? "bg-slate-800 border-slate-600 text-white shadow-sm"
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <BookOpen size={14} className="text-indigo-400" />
              Textbooks & References
              <ChevronDown size={13} className={`transition-transform ${activeTabModal === "books" ? "rotate-180" : ""}`} />
            </button>

            <button
              onClick={() => setActiveTabModal(activeTabModal === "prereq" ? null : "prereq")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                activeTabModal === "prereq"
                  ? "bg-slate-800 border-slate-600 text-white shadow-sm"
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <FileText size={14} className="text-emerald-400" />
              Prerequisites & Assessment
              <ChevronDown size={13} className={`transition-transform ${activeTabModal === "prereq" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* ========================================================== */}
          {/* Interactive Collapsible Drawers / Modals */}
          {/* ========================================================== */}
          <AnimatePresence>
            {activeTabModal && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden max-w-4xl mx-auto mt-6 text-left"
              >
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl relative">
                  <button
                    onClick={() => setActiveTabModal(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    <X size={16} />
                  </button>

                  {/* Course Outcomes Panel */}
                  {activeTabModal === "outcomes" && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-4 h-4 text-sky-400" />
                        <h3 className="text-sm sm:text-base font-bold text-white">Course Outcomes & Bloom's Taxonomy Mapping</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {roadmapData.courseOutcomes?.map((co) => (
                          <div key={co.code} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-sky-300 border border-slate-700">
                                  {co.code}
                                </span>
                                <div className="flex gap-1">
                                  {co.learningLevels?.map((lvl) => (
                                    <span key={lvl} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-900 text-slate-400 border border-slate-800">
                                      Level {lvl}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed">{co.description}</p>
                            </div>
                            <div className="mt-3 pt-2 border-t border-slate-850 text-[11px] text-slate-400">
                              Mapped Modules: <span className="text-slate-300 font-mono">{co.mappedModules?.join(", ")}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Textbooks & References Panel */}
                  {activeTabModal === "books" && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        <h3 className="text-sm sm:text-base font-bold text-white">Recommended Textbooks & Literature</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Core Textbooks</h4>
                          <ul className="space-y-2">
                            {roadmapData.textBooks?.map((book, i) => (
                              <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                                <BookMarked size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                                <span>{book}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Reference Books</h4>
                          <ul className="space-y-2">
                            {roadmapData.referenceBooks?.map((ref, i) => (
                              <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                                <FileText size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                                <span>{ref}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prerequisites & Assessment Panel */}
                  {activeTabModal === "prereq" && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-sm sm:text-base font-bold text-white">Prerequisites & Examination Scheme</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                            <ShieldCheck size={13} className="text-emerald-400" /> Course Prerequisites
                          </h4>
                          <ul className="space-y-2">
                            {roadmapData.course?.prerequisites?.map((pre, i) => (
                              <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                                <span>{pre}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                            <HelpCircle size={13} className="text-amber-400" /> Assessment Methodology
                          </h4>
                          <p className="text-xs text-slate-300 mb-3">
                            <span className="font-semibold text-slate-200">Evaluation:</span> {roadmapData.assessment?.type}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {roadmapData.assessment?.recommendedPractice?.map((item, i) => (
                              <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-800 text-slate-300">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ========================================================== */}
        {/* Progress Analytics Dashboard & Quick Resume Bar */}
        {/* ========================================================== */}
        <section className="mb-8 p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Left: Overall Progress Metric */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
                  <TrendingUp size={13} className="text-slate-400" />
                  Your Course Progress
                </span>
                <span className="text-lg font-bold text-slate-200">{stats.percent}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.percent}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-sky-600 to-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{stats.completedCount} of {stats.total} Modules Completed</span>
                <span>{stats.completedHours} / {stats.totalHours} hrs</span>
              </div>
            </div>

            {/* Middle: Quick Metrics Ticker */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                <div className="text-base sm:text-lg font-bold text-slate-200">{stats.total}</div>
                <div className="text-[11px] text-slate-400">Total Modules</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                <div className="text-base sm:text-lg font-bold text-slate-200">{roadmapData.segments?.length || 5}</div>
                <div className="text-[11px] text-slate-400">Segments</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                <div className="text-base sm:text-lg font-bold text-slate-200">{stats.totalTopics}+</div>
                <div className="text-[11px] text-slate-400">Topics</div>
              </div>
            </div>

            {/* Right: Quick Action / Continue Learning */}
            <div className="lg:col-span-3 flex flex-col gap-2">
              {lastVisited ? (
                <Link
                  to={`/${roadmapData.folder}/module/${lastVisited.slug}`}
                  className="group flex items-center justify-between p-3 rounded-xl bg-slate-850 border border-slate-700/80 hover:border-slate-600 hover:bg-slate-800 transition"
                >
                  <div className="truncate pr-2">
                    <div className="text-[10px] uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-1">
                      <Flame size={12} className="text-amber-400" /> Resume Learning
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate">{lastVisited.title}</div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition shrink-0" />
                </Link>
              ) : nextIncompleteModule ? (
                <Link
                  to={`/${roadmapData.folder}/module/${nextIncompleteModule.slug}`}
                  className="group flex items-center justify-between p-3 rounded-xl bg-slate-850 border border-slate-700/80 hover:border-slate-600 hover:bg-slate-800 transition"
                >
                  <div className="truncate pr-2">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                      <Flame size={12} className="text-emerald-400" /> Start First Module
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate">{nextIncompleteModule.title}</div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition shrink-0" />
                </Link>
              ) : (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center text-xs text-slate-400 font-medium">
                  All modules completed!
                </div>
              )}

              {stats.completedCount > 0 && (
                <button
                  onClick={handleResetProgress}
                  className="text-[11px] text-slate-500 hover:text-slate-400 flex items-center justify-center gap-1 hover:underline transition self-center"
                >
                  <RotateCcw size={11} /> Reset progress
                </button>
              )}
            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* Filter, Search & View Controls */}
        {/* ========================================================== */}
        <section className="mb-8 space-y-3.5">
          
          {/* Top Row: Search Input & View Mode Toggles */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            {/* Search Box */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search modules and topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-slate-600 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* View Mode & Filter Quick Indicators */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Showing <strong className="text-slate-200">{totalFilteredCount}</strong> of {stats.total}
              </span>

              <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800">
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${
                    viewMode === "grid"
                      ? "bg-slate-800 text-slate-200 shadow-sm"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <LayoutGrid size={14} />
                  <span className="hidden md:inline">Grid</span>
                </button>

                <button
                  onClick={() => setViewMode("timeline")}
                  title="Timeline / Sequential View"
                  className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${
                    viewMode === "timeline"
                      ? "bg-slate-800 text-slate-200 shadow-sm"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <ListOrdered size={14} />
                  <span className="hidden md:inline">Timeline</span>
                </button>
              </div>
            </div>

          </div>

          {/* Segment Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
              <Layers size={12} /> Segments:
            </span>

            <button
              onClick={() => {
                setSelectedSegment("all");
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedSegment === "all"
                  ? "bg-slate-200 text-slate-950 font-semibold"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              All Segments ({roadmapData.segments?.length || 0})
            </button>

            {roadmapData.segments?.map((seg, idx) => {
              const count = seg.modules?.length || 0;
              const isSelected = selectedSegment === seg.segmentId;
              const theme = SEGMENT_THEMES[idx % SEGMENT_THEMES.length];

              return (
                <button
                  key={seg.segmentId}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedSegment("all");
                    } else {
                      setSelectedSegment(seg.segmentId);
                      expandOnlySegment(seg.segmentId);
                    }
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-slate-800 border border-slate-600 text-slate-100 font-semibold"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                  <span>{seg.title.split("–")[0].trim()} ({count})</span>
                </button>
              );
            })}
          </div>

          {/* Secondary Filter Chips: Difficulty & Completion Status */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-xs font-medium text-slate-400 mr-1">Filter:</span>

            {/* Difficulty pills */}
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              {["all", "easy", "medium", "advanced"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setDifficultyFilter(lvl)}
                  className={`px-2 py-0.5 rounded-md text-[11px] capitalize transition ${
                    difficultyFilter === lvl
                      ? "bg-slate-800 text-slate-200 font-medium"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {lvl === "all" ? "All Levels" : lvl}
                </button>
              ))}
            </div>

            {/* Status pills */}
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2 py-0.5 rounded-md text-[11px] transition ${
                  statusFilter === "all"
                    ? "bg-slate-800 text-slate-200 font-medium"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                All Status
              </button>

              <button
                onClick={() => setStatusFilter(statusFilter === "incomplete" ? "all" : "incomplete")}
                className={`px-2 py-0.5 rounded-md text-[11px] transition flex items-center gap-1 ${
                  statusFilter === "incomplete"
                    ? "bg-slate-800 text-slate-200 font-medium"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Circle size={9} className="text-slate-400" />
                Unfinished ({stats.remainingCount})
              </button>

              <button
                onClick={() => setStatusFilter(statusFilter === "completed" ? "all" : "completed")}
                className={`px-2 py-0.5 rounded-md text-[11px] transition flex items-center gap-1 ${
                  statusFilter === "completed"
                    ? "bg-slate-800 text-slate-200 font-medium"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <CheckCircle2 size={10} className="text-emerald-400" />
                Completed ({stats.completedCount})
              </button>

              <button
                onClick={() => setStatusFilter(statusFilter === "bookmarked" ? "all" : "bookmarked")}
                className={`px-2 py-0.5 rounded-md text-[11px] transition flex items-center gap-1 ${
                  statusFilter === "bookmarked"
                    ? "bg-slate-800 text-slate-200 font-medium"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Bookmark size={10} className="text-amber-400" />
                Bookmarked ({stats.bookmarkedCount})
              </button>
            </div>

            {/* Clear All Filters Button if any active */}
            {(selectedSegment !== "all" || difficultyFilter !== "all" || statusFilter !== "all" || search) && (
              <button
                onClick={() => {
                  setSelectedSegment("all");
                  setDifficultyFilter("all");
                  setStatusFilter("all");
                  setSearch("");
                }}
                className="px-2 py-0.5 rounded-md text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition flex items-center gap-1"
              >
                <RotateCcw size={10} /> Reset Filters
              </button>
            )}

          </div>

        </section>

        {/* ========================================================== */}
        {/* Auth Status Notification Banner */}
        {/* ========================================================== */}
        {!isLoggedIn() ? (
          <div className="mb-8 p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-xs">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                Browsing public roadmap modules. Sign in to unlock complete tracking and premium exercises.
              </span>
            </div>
            <Link
              to="/login"
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium text-xs transition shrink-0"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div className="mb-8 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <Unlock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Full Access Active · All {roadmapData.trackTitle || "course"} modules, interactive tests, and exercises available.</span>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* Segmented Curriculum Modules View */}
        {/* ========================================================== */}
        {filteredSegments.length > 0 ? (
          <div className="space-y-6">
            {/* Toolbar for quick expand/collapse */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 pb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={13} className="text-sky-400" />
                  Curriculum Segments
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  ({filteredSegments.length} total)
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={expandAllSegments}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 transition flex items-center gap-1"
                  title="Expand all segments"
                >
                  <ChevronDown size={13} />
                  <span>Expand All</span>
                </button>

                <button
                  type="button"
                  onClick={() => activeSegmentId && expandOnlySegment(activeSegmentId)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-sky-300 border border-slate-800 transition flex items-center gap-1"
                  title="Minimize others and keep only the active segment open"
                >
                  <Sparkles size={12} className="text-sky-400" />
                  <span>Focus Current</span>
                </button>

                <button
                  type="button"
                  onClick={collapseAllSegments}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 transition flex items-center gap-1"
                  title="Minimize all segments"
                >
                  <ChevronUp size={13} />
                  <span>Collapse All</span>
                </button>
              </div>
            </div>

            {/* Segment Sections */}
            {filteredSegments.map((segment) => {
              const theme = segment.theme;
              const segmentPercent = segment.totalModulesInSegment > 0
                ? Math.round((segment.completedInSegment / segment.totalModulesInSegment) * 100)
                : 0;
              const isExpanded = expandedSegments[segment.segmentId] === true;
              const isCurrent = activeSegmentId === segment.segmentId;

              return (
                <section
                  key={segment.segmentId}
                  id={`segment-${segment.segmentId}`}
                  className={`rounded-2xl border transition-all duration-200 backdrop-blur-sm shadow-sm ${
                    isExpanded
                      ? isCurrent
                        ? "border-sky-500/40 bg-slate-900/80 shadow-sky-950/20 p-5 sm:p-6 md:p-7"
                        : "border-slate-800 bg-slate-900/70 p-5 sm:p-6 md:p-7"
                      : isCurrent
                      ? "border-sky-800/40 bg-sky-950/15 hover:bg-sky-950/25 hover:border-sky-700/50 p-4 sm:p-5 md:py-4 md:px-6"
                      : "border-slate-850/80 bg-slate-950/45 hover:bg-slate-900/40 hover:border-slate-750/70 p-4 sm:p-5 md:py-4 md:px-6"
                  }`}
                >
                  {/* Segment Header (Clickable Accordion) */}
                  <div
                    onClick={() => toggleSegment(segment.segmentId)}
                    className={`cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-3.5 select-none ${
                      isExpanded ? "pb-2" : "pb-0"
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                          isExpanded
                            ? "bg-slate-900 text-slate-300 border-slate-800"
                            : "bg-slate-950/80 text-slate-400 border-slate-850"
                        }`}>
                          {segment.level || "Core Segment"}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={11} className="text-slate-400" />
                          {segment.allocatedHours} Hours
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Layers size={11} className="text-slate-400" />
                          {segment.totalModulesInSegment} Modules
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-950/90 text-sky-300 border border-sky-600/70 flex items-center gap-1 shadow-sm">
                            <Sparkles size={10} className="text-sky-400" /> Current Segment
                          </span>
                        )}
                      </div>

                      <h2 className={`font-bold transition-colors flex items-center gap-2 ${
                        isExpanded
                          ? "text-lg sm:text-xl md:text-2xl text-white group-hover:text-sky-300"
                          : "text-base sm:text-lg text-slate-200 group-hover:text-sky-300"
                      }`}>
                        <Layers className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.accent}`} />
                        <span>{segment.title}</span>
                      </h2>

                      {segment.summary && (
                        <p className={`text-slate-400 mt-1 max-w-3xl leading-relaxed ${
                          isExpanded
                            ? "text-xs sm:text-sm line-clamp-2"
                            : "text-xs line-clamp-1 text-slate-500 group-hover:text-slate-400"
                        }`}>
                          {segment.summary}
                        </p>
                      )}
                    </div>

                    {/* Right side: Progress Badge + Minimize/Expand Button */}
                    <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
                      <div className={`flex items-center gap-2.5 rounded-xl border ${
                        isExpanded
                          ? "bg-slate-950/80 px-3.5 py-2 border-slate-800"
                          : "bg-slate-950/50 px-3 py-1.5 border-slate-850"
                      }`}>
                        <div className="text-right">
                          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Progress</div>
                          <div className="text-xs font-semibold text-slate-300">
                            {segment.completedInSegment} / {segment.totalModulesInSegment} Done
                          </div>
                        </div>
                        <div className={`rounded-full border flex items-center justify-center font-semibold text-slate-300 ${
                          isExpanded
                            ? "w-8 h-8 bg-slate-900 border-slate-700 text-xs"
                            : "w-7 h-7 bg-slate-900/80 border-slate-800 text-[11px]"
                        }`}>
                          {segmentPercent}%
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSegment(segment.segmentId);
                        }}
                        className={`rounded-xl border text-xs font-medium transition flex items-center gap-1.5 ${
                          isExpanded
                            ? "p-2 bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750"
                            : "py-1.5 px-2.5 bg-slate-900/80 text-sky-400 border-slate-800 hover:bg-slate-850 hover:border-slate-700"
                        }`}
                        title={isExpanded ? "Minimize this segment" : "Expand this segment"}
                      >
                        {isExpanded ? (
                          <>
                            <span className="hidden sm:inline text-[11px]">Minimize</span>
                            <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            <span className="hidden sm:inline text-[11px] font-semibold">Expand</span>
                            <ChevronDown size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Minimized Hint Bar */}
                  {!isExpanded && (
                    <div
                      onClick={() => toggleSegment(segment.segmentId)}
                      className="mt-2.5 py-1.5 px-3 rounded-xl bg-slate-950/40 hover:bg-slate-950/80 border border-slate-850/60 hover:border-slate-750 text-xs text-slate-400 hover:text-slate-200 flex items-center justify-between cursor-pointer transition select-none"
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                        <span className="text-[11px] text-slate-400">{segment.filteredModules.length} modules hidden</span>
                      </span>
                      <span className="text-[11px] font-medium text-sky-400/90 flex items-center gap-1 group-hover:text-sky-300">
                        View Modules <ChevronDown size={12} />
                      </span>
                    </div>
                  )}

                  {/* Modules Display (Expanded Body with Smooth Animation) */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 mt-3 border-t border-slate-800/80">
                          {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {segment.filteredModules.map((module) => (
                                <ModuleCard
                                  key={module.moduleId}
                                  module={module}
                                  theme={theme}
                                  isCompleted={isCompleted(module.moduleId)}
                                  isBookmarked={isBookmarked(module.moduleId)}
                                  isExpanded={!!expandedTopics[module.moduleId]}
                                  isLocked={!isModuleVisible(module)}
                                  copiedSlug={copiedSlug}
                                  onToggleComplete={() => toggleCompleted(module.moduleId, module.title)}
                                  onToggleBookmark={() => toggleBookmark(module.moduleId, module.title)}
                                  onToggleExpand={() => toggleTopicExpand(module.moduleId)}
                                  onCopyLink={() => copyDirectLink(module.slug, module.title)}
                                  onRecordVisit={() => recordVisit(module, segment.segmentId, segment.title)}
                                  roadmapFolder={roadmapData.folder}
                                />
                              ))}
                            </div>
                          ) : (
                            /* Timeline View */
                            <div className="relative pl-6 sm:pl-7 border-l border-slate-800 space-y-5">
                              {segment.filteredModules.map((module) => (
                                <div key={module.moduleId} className="relative">
                                  {/* Timeline Dot */}
                                  <div
                                    className={`absolute -left-[30px] sm:-left-[35px] top-4 w-4 h-4 rounded-full border flex items-center justify-center ${
                                      isCompleted(module.moduleId)
                                        ? "bg-emerald-600 border-emerald-400 text-slate-950"
                                        : "bg-slate-900 border-slate-700 text-slate-500"
                                    }`}
                                  >
                                    {isCompleted(module.moduleId) ? <Check size={10} /> : <div className="w-1 h-1 rounded-full bg-slate-500" />}
                                  </div>

                                  <ModuleCard
                                    module={module}
                                    theme={theme}
                                    isCompleted={isCompleted(module.moduleId)}
                                    isBookmarked={isBookmarked(module.moduleId)}
                                    isExpanded={!!expandedTopics[module.moduleId]}
                                    isLocked={!isModuleVisible(module)}
                                    copiedSlug={copiedSlug}
                                    onToggleComplete={() => toggleCompleted(module.moduleId, module.title)}
                                    onToggleBookmark={() => toggleBookmark(module.moduleId, module.title)}
                                    onToggleExpand={() => toggleTopicExpand(module.moduleId)}
                                    onCopyLink={() => copyDirectLink(module.slug, module.title)}
                                    onRecordVisit={() => recordVisit(module, segment.segmentId, segment.title)}
                                    roadmapFolder={roadmapData.folder}
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Logged in prompt for locked modules */}
                          {!isLoggedIn() && segment.modules.some(m => m.visibility === "loggedIn") && (
                            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                              <div className="flex items-center gap-2">
                                <Lock size={13} className="text-slate-400" />
                                <span>Additional case studies and practice tests require login.</span>
                              </div>
                              <Link to="/login" className="font-semibold text-slate-200 hover:underline">
                                Sign In →
                              </Link>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-14 px-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200 mb-1">No modules found matching your search</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-5">
              We couldn't find any modules matching "{search}".
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedSegment("all");
                setDifficultyFilter("all");
                setStatusFilter("all");
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition border border-slate-700"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* ========================================================== */}
        {/* Teacher / Instructor Profile & Institutional Card */}
        {/* ========================================================== */}
        <TeacherProfileCard teacher={teacher} />


        {/* ========================================================== */}
        {/* Footer */}
        {/* ========================================================== */}
        <footer className="text-center pt-6 pb-10 border-t border-slate-800 text-xs text-slate-500 space-y-1.5">
          <p>
            © {new Date().getFullYear()} {roadmapData.institute?.name || "Coder & AccoTax"} · {roadmapData.trackTitle} ({roadmapData.subjectCode || "LLM104"})
          </p>
          <p className="text-[11px] text-slate-600">
            {roadmapData.course?.program || "Learning Curriculum"} · {roadmapData.trackTitle || "Course"}
          </p>
        </footer>

      </div>
    </div>
  );
}

// =========================================================================
// Reusable Rich Module Card Component (Refined Muted Styling)
// =========================================================================
function ModuleCard({
  module,
  theme,
  isCompleted,
  isBookmarked,
  isExpanded,
  isLocked,
  copiedSlug,
  onToggleComplete,
  onToggleBookmark,
  onToggleExpand,
  onCopyLink,
  onRecordVisit,
  roadmapFolder
}) {
  const topicsCount = module.topics?.length || 0;
  const isCopied = copiedSlug === module.slug;

  // Difficulty badge dot indicator
  const getDifficultyDot = (diff = "") => {
    const d = diff.toLowerCase();
    if (d.includes("easy")) return "bg-emerald-400";
    if (d.includes("advanced")) return "bg-rose-400";
    return "bg-amber-400";
  };

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between ${
        isCompleted
          ? "border border-slate-800 bg-slate-900/40"
          : isLocked
          ? "border border-slate-800 bg-slate-900/30"
          : "border border-slate-800 bg-slate-900/70 hover:bg-slate-900 hover:border-slate-700"
      }`}
    >
      <div>
        
        {/* Top Header Line: Module Index + Meta Pills + Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 px-1.5 items-center justify-center rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono font-semibold text-slate-400">
              #{module.moduleIndexInSegment || module.indexOverall || "M"}
            </span>

            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              {module.moduleId}
            </span>

            {isCompleted && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-950 text-emerald-400 border border-slate-800">
                <CheckCircle2 size={10} className="text-emerald-400" /> Completed
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Copy link button */}
            <button
              onClick={onCopyLink}
              title="Copy direct module link"
              className="p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition relative"
            >
              {isCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>

            {/* Bookmark button */}
            <button
              onClick={onToggleBookmark}
              title={isBookmarked ? "Remove bookmark" : "Bookmark module"}
              className={`p-1 rounded-md transition ${
                isBookmarked
                  ? "text-amber-400 bg-slate-800"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
              }`}
            >
              {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            </button>
          </div>
        </div>

        {/* Module Title */}
        <Link
          to={`/${roadmapFolder}/module/${module.slug}`}
          onClick={onRecordVisit}
          className="group block"
        >
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors flex items-start gap-2 leading-snug">
            <Code2 size={16} className={`shrink-0 mt-0.5 ${isCompleted ? "text-emerald-400" : theme.accent}`} />
            <span>{module.title}</span>
          </h3>
        </Link>

        {/* Module Summary */}
        {module.summary && (
          <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-2">
            {module.summary}
          </p>
        )}

        {/* Topics Accordion Preview */}
        {topicsCount > 0 && (
          <div className="mt-2.5">
            <div className="flex flex-wrap gap-1">
              {(isExpanded ? module.topics : module.topics.slice(0, 3)).map((topic, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[10px] bg-slate-950 text-slate-400 border border-slate-850 truncate max-w-full"
                >
                  {topic}
                </span>
              ))}
            </div>

            {topicsCount > 3 && (
              <button
                onClick={onToggleExpand}
                className="mt-1 inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-200 font-medium transition"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp size={11} /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown size={11} /> +{topicsCount - 3} more topics & worked examples
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>

      {/* Footer Area: Meta Badges + Actions */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80">
        
        {/* Meta badges row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-[11px]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800 flex items-center gap-1 text-[10px]">
              <span className={`w-1.5 h-1.5 rounded-full ${getDifficultyDot(module.difficulty)}`} />
              {module.difficulty || "Standard"}
            </span>

            <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800 flex items-center gap-1 text-[10px]">
              <Clock size={10} className="text-slate-400" />
              {module.estimatedHours} hrs
            </span>
          </div>

          {topicsCount > 0 && (
            <span className="text-slate-500 text-[10px]">
              {topicsCount} {topicsCount === 1 ? "topic" : "topics"}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {isLocked ? (
            <Link
              to="/login"
              className="flex-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-medium text-center transition flex items-center justify-center gap-1.5"
            >
              <Lock size={12} /> Unlock Module
            </Link>
          ) : (
            <Link
              to={`/${roadmapFolder}/module/${module.slug}`}
              onClick={onRecordVisit}
              className={`group flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5 ${
                isCompleted
                  ? "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 shadow-sm"
              }`}
            >
              <span>Explore Module</span>
              <ArrowRight size={13} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}

          <button
            onClick={onToggleComplete}
            title={isCompleted ? "Mark incomplete" : "Mark completed"}
            className={`p-1.5 rounded-lg border text-xs transition flex items-center justify-center shrink-0 ${
              isCompleted
                ? "border-slate-700 bg-slate-800 text-emerald-400 hover:bg-slate-750"
                : "border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700 hover:text-slate-300"
            }`}
          >
            {isCompleted ? <CheckCircle2 size={15} /> : <Circle size={15} />}
          </button>
        </div>

      </div>

    </div>
  );
}