// src/components/study/NetworkTopicView.jsx

import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { useParams, Link } from "react-router-dom";

import {
  Map as MapIcon,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Layers,
  Menu,
  X,
  ArrowUp,
} from "lucide-react";
import roadmapData from "./network-roadmap.json";

const topicModules = import.meta.glob("./topics/*/Topic*.jsx");

export default function NetworkTopicView() {
  const { moduleSlug, topicIndex } = useParams();
  return (
    <TopicViewInner
      key={`${moduleSlug}-${topicIndex}`}
      moduleSlug={moduleSlug}
      topicIndex={topicIndex}
    />
  );
}

// ------------------------------------------------------------------
// Scroll button – isolated, with reliable scroll detection
// ------------------------------------------------------------------
function ScrollButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const shouldShow = window.scrollY > 300;
      setShowScrollTop(shouldShow);
    };

    checkScroll(); // initial check

    let timeoutId;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        checkScroll();
        timeoutId = null;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={`
        fixed bottom-6 left-6 z-[9999] group
        transition-all duration-300
        ${showScrollTop ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
      `}
    >
      <div className="absolute left-14 bottom-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900 text-slate-200 border border-slate-700 text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
        Scroll to top
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="
          w-12 h-12 rounded-full
          bg-gradient-to-br from-sky-500 to-indigo-600
          hover:from-sky-400 hover:to-indigo-500
          shadow-[0_8px_25px_rgba(14,165,233,0.45)]
          border border-sky-400/40
          flex items-center justify-center
          text-white text-xl
          hover:scale-[1.06]
          transition-all will-change-transform
        "
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

// ------------------------------------------------------------------
// Main view
// ------------------------------------------------------------------
function TopicViewInner({ moduleSlug, topicIndex }) {
  const index = Number.parseInt(topicIndex, 10) || 0;
  const activeTopicRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Find module data
  let moduleData = null;
  let segmentData = null;
  for (const segment of roadmapData.segments) {
    const found = segment.modules.find((m) => m.slug === moduleSlug);
    if (found) {
      moduleData = found;
      segmentData = segment;
      break;
    }
  }

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl text-red-400 font-bold">Module Not Found</h1>
        <Link to={`/${roadmapData.folder}/roadmap`} className="text-sky-400 underline mt-4 inline-block">
          ← Back to Roadmap
        </Link>
      </div>
    );
  }

  const topicTitle = moduleData.topics[index];
  if (!topicTitle) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl text-red-400 font-bold">Topic Not Found</h1>
        <Link
          to={`/${roadmapData.folder}/module/${moduleSlug}`}
          className="text-sky-400 underline mt-4 inline-block"
        >
          ← Back to Module
        </Link>
      </div>
    );
  }

  // Progress system
  const storageKey = `js-progress-${moduleSlug}`;
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey) || "[]";
    let parsed = [];
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = [];
    }
    if (!parsed.includes(index)) parsed.push(index);
    parsed.sort((a, b) => a - b);
    localStorage.setItem(storageKey, JSON.stringify(parsed));
    setCompletedTopics(parsed);
  }, [index, storageKey]);

  const totalTopics = moduleData.topics.length;
  const completedCount = completedTopics.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  const hasPrev = index > 0;
  const hasNext = index < totalTopics - 1;

  const resetProgress = () => {
    localStorage.removeItem(storageKey);
    setCompletedTopics([]);
  };

  // Dynamic topic import
  const topicKey = `./topics/${moduleSlug}/Topic${topicIndex}.jsx`;
  const TopicPage = topicModules[topicKey] ? React.lazy(topicModules[topicKey]) : null;

  // Scroll active topic into view (useLayoutEffect avoids flicker)
  useLayoutEffect(() => {
    if (activeTopicRef.current) {
      activeTopicRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [index]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [moduleSlug, topicIndex]);

  // WhatsApp sidebar states
  const [waPhone, setWaPhone] = useState("");
  const [waStudentName, setWaStudentName] = useState(() => {
    try {
      return localStorage.getItem("student_name") || "";
    } catch {
      return "";
    }
  });
  const [waIncludeLink, setWaIncludeLink] = useState(true);
  const [waPreviewOpen, setWaPreviewOpen] = useState(false);
  const [waLastMessage, setWaLastMessage] = useState("");

  const buildTopicListText = (topics) =>
    topics.map((t, i) => `${i + 1}. ${t}`).join("\n");

  // ------------------------------------------------------------------
  // UI
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background layers – unchanged */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -top-40 -left-40 opacity-40" width="420" height="420">
          <defs>
            <radialGradient id="jsTopicBlob1" cx="0" cy="0" r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(0,0) rotate(45) scale(400)">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="200" fill="url(#jsTopicBlob1)" />
        </svg>

        <svg className="absolute bottom-[-160px] right-[-130px] opacity-40" width="420" height="420">
          <defs>
            <radialGradient id="jsTopicBlob2" cx="0" cy="0" r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(400,400) rotate(225) scale(400)">
              <stop stopColor="#a855f7" />
              <stop offset="1" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="200" fill="url(#jsTopicBlob2)" />
        </svg>

        <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
          <defs>
            <pattern id="jsTopicGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#1f2937" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#jsTopicGrid)" />
        </svg>
      </div>

      {/* Header – unchanged */}
      <header className="relative z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to={`/${roadmapData.folder}/roadmap`}
              className="hidden sm:inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-300 hover:border-sky-500 hover:text-sky-300"
            >
              <ArrowLeft size={12} className="mr-1" />
              Roadmap
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <Layers size={12} className="text-sky-400" />
                <span>{roadmapData.trackTitle}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {segmentData?.title} • {moduleData.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <BookOpen size={13} className="text-sky-400" />
                <span>Topic {index + 1} of {totalTopics}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-28 h-1.5 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-emerald-400"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] text-sky-300 font-semibold">
                  {progressPercent}%
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              {hasPrev ? (
                <Link
                  to={`/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-200 hover:bg-slate-800"
                >
                  <ArrowLeft size={13} /> Prev
                </Link>
              ) : (
                <button disabled className="px-2.5 py-1.5 rounded-lg bg-slate-950 text-slate-600 border border-slate-900 text-[11px]">
                  <ArrowLeft size={13} /> Prev
                </button>
              )}
              {hasNext ? (
                <Link
                  to={`/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`}
                  className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 border border-sky-500 text-[11px] text-white"
                >
                  Next <ArrowRight size={13} />
                </Link>
              ) : (
                <button disabled className="px-2.5 py-1.5 rounded-lg bg-slate-950 text-slate-600 border border-slate-900 text-[11px]">
                  Next <ArrowRight size={13} />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-100 sm:hidden"
            >
              <Menu size={14} /> Topics
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="relative z-20 flex-1 flex justify-center">
        <div className="w-full max-w-6xl mx-auto flex">
          {/* Desktop sidebar – unchanged except content-visibility on topic list */}
          <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-slate-800 bg-slate-950/60 backdrop-blur-xl pt-6 pb-8 px-4">
            <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="uppercase tracking-[0.18em] text-[10px] text-slate-500">Progress</span>
                <span className="text-[11px] text-sky-300 font-semibold">{completedCount}/{totalTopics}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${progressPercent}%` }} />
              </div>
              <button type="button" onClick={resetProgress} className="mt-2 text-[11px] text-rose-300 hover:text-rose-400">
                Reset Progress
              </button>
            </div>

            <div className="space-y-2 text-sm" style={{ contentVisibility: "auto" }}>
              {moduleData.topics.map((title, i) => {
                const isActive = i === index;
                const isCompleted = completedTopics.includes(i);
                return (
                  <Link
                    key={i}
                    ref={isActive ? activeTopicRef : null}
                    to={`/${roadmapData.folder}/topic/${moduleSlug}/${i}`}
                    className={`
                      relative flex items-center gap-3 px-3 py-2 rounded-xl border transition
                      ${isActive
                        ? "border-sky-500 bg-sky-600/90 text-white shadow-lg"
                        : "border-slate-800 bg-slate-900/90 text-slate-200 hover:bg-slate-800/90"}
                    `}
                  >
                    <span className={`absolute left-0 top-0 h-full w-[3px] ${isActive ? "bg-sky-300" : "bg-slate-700"}`} />
                    {isCompleted ? (
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-500 shrink-0" />
                    )}
                    <span className="truncate">
                      <span className="text-sky-300 mr-1 text-xs">{i + 1}.</span>
                      {title}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
              <Link to={`/${roadmapData.folder}/module/${moduleSlug}`} className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">
                ← Back to Module Overview
              </Link>
              <Link to={`/${roadmapData.folder}/roadmap`} className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">
                📍 {roadmapData.subject} Roadmap
              </Link>
              <a href="/play" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">
                🧪 CNAT Playground
              </a>
            </div>

            {/* WhatsApp send topics section – unchanged */}
            <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] uppercase tracking-[0.15em] text-slate-500">Send Topics List</p>
                <span className="text-[11px] text-slate-400">{moduleData.topics.length} topics</span>
              </div>
              <label className="text-[11px] text-slate-400">Student name (optional)</label>
              <input
                value={waStudentName}
                onChange={(e) => setWaStudentName(e.target.value)}
                type="text"
                placeholder="e.g., Ritaja Ghosh"
                className="w-full bg-slate-800 text-slate-200 p-2 rounded-lg border border-slate-600 text-xs mt-1 mb-3 focus:outline-none focus:border-sky-500"
              />
              <label className="text-[11px] text-slate-400">WhatsApp number</label>
              <input
                value={waPhone}
                onChange={(e) => setWaPhone(e.target.value)}
                type="text"
                placeholder="e.g., 919876543210"
                className="w-full bg-slate-800 text-slate-200 p-2 rounded-lg border border-slate-600 text-xs mt-1 focus:outline-none focus:border-sky-500"
              />
              <div className="flex items-center gap-2 mt-3">
                <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                  <input type="checkbox" checked={waIncludeLink} onChange={() => setWaIncludeLink(v => !v)} className="accent-sky-500" />
                  Include module link
                </label>
                <button
                  onClick={() => {
                    const phone = waPhone.trim();
                    if (!phone) return alert("Please enter a WhatsApp phone number.");
                    const moduleLink = `${window.location.origin}/${roadmapData.folder}/module/${moduleSlug}`;
                    const topicsText = buildTopicListText(moduleData.topics);
                    const namePart = waStudentName.trim() ? `Hi ${waStudentName.trim()},\n\n` : "";
                    const greeting = `${namePart}📘 *Ultra Premium Topic List*\n━━━━━━━━━━━━━━━━━━━━`;
                    const header = `*Module:* ${moduleData.title}\n*Topics:* ${moduleData.topics.length}\n`;
                    const body = `\n*Topics Preview:*\n${topicsText}\n`;
                    const linkPart = waIncludeLink ? `\n🔗 Module Link:\n${moduleLink}\n` : "";
                    const footer = `\n━━━━━━━━━━━━━━━━━━━━\nSent via Coder & AccoTax Learning Platform • Barrackpore\nwww.codernaccotax.co.in`;
                    const fullMessage = `${greeting}\n${header}\n${body}${linkPart}${footer}`;
                    try {
                      navigator.clipboard.writeText(fullMessage);
                      alert("Message preview copied to clipboard.");
                      setWaLastMessage(fullMessage);
                      setWaPreviewOpen(true);
                    } catch {
                      setWaLastMessage(fullMessage);
                      setWaPreviewOpen(true);
                    }
                  }}
                  className="ml-auto px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:bg-slate-900"
                >
                  Copy Preview
                </button>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => {
                    const moduleLink = `${window.location.origin}/${roadmapData.folder}/module/${moduleSlug}`;
                    const topicsText = buildTopicListText(moduleData.topics);
                    const namePart = waStudentName.trim() ? `Hi ${waStudentName.trim()},\n\n` : "";
                    const greeting = `${namePart}📘 *Ultra Premium Topic List*\n━━━━━━━━━━━━━━━━━━━━`;
                    const header = `*Module:* ${moduleData.title}\n*Topics:* ${moduleData.topics.length}\n`;
                    const body = `\n*Topics Preview:*\n${topicsText}\n`;
                    const linkPart = waIncludeLink ? `\n🔗 Module Link:\n${moduleLink}\n` : "";
                    const footer = `\n━━━━━━━━━━━━━━━━━━━━\nSent via Coder & AccoTax Learning Platform • Barrackpore\nwww.codernaccotax.co.in`;
                    const fullMessage = `${greeting}\n${header}\n${body}${linkPart}${footer}`;
                    setWaLastMessage(fullMessage);
                    setWaPreviewOpen(s => !s);
                  }}
                  className="w-full mt-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white transition"
                >
                  {waPreviewOpen ? "Hide Preview" : "Preview Message"}
                </button>
              </div>
              {waPreviewOpen && (
                <pre className="mt-3 whitespace-pre-wrap text-[13px] bg-slate-900 border border-slate-800 rounded-lg p-3 text-slate-200 text-xs">
                  {waLastMessage || "No preview available."}
                </pre>
              )}
              <button
                onClick={() => {
                  const phoneRaw = waPhone.trim();
                  if (!phoneRaw) return alert("Please enter the WhatsApp phone number (with country code).");
                  const phone = phoneRaw.replace(/[^0-9]/g, "");
                  if (!/^\d{10,15}$/.test(phone) && !confirm("Phone number looks unusual. Continue?")) return;
                  const moduleLink = `${window.location.origin}/${roadmapData.folder}/module/${moduleSlug}`;
                  const topicsText = buildTopicListText(moduleData.topics);
                  const namePart = waStudentName.trim() ? `Hi ${waStudentName.trim()},\n\n` : "";
                  const greeting = `${namePart}📘 *Ultra Premium Topic List*\n━━━━━━━━━━━━━━━━━━━━`;
                  const header = `*Module:* ${moduleData.title}\n*Topics:* ${moduleData.topics.length}\n`;
                  const body = `\n*Topics Preview:*\n${topicsText}\n`;
                  const linkPart = waIncludeLink ? `\n🔗 Module Link:\n${moduleLink}\n` : "";
                  const closing = `\n━━━━━━━━━━━━━━━━━━━━\nNeed help? Reply with "HELP" and we'll assist you.\nSent via Coder & AccoTax Learning Platform • Barrackpore\nwww.codernaccotax.co.in`;
                  const fullMessage = `${greeting}\n${header}\n${body}${linkPart}${closing}`;
                  try { localStorage.setItem("student_name", waStudentName.trim()); } catch {}
                  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`, "_blank");
                }}
                className="w-full mt-3 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-xs font-semibold text-white transition"
              >
                📤 Send Ultra Premium Topic Message
              </button>
              <p className="text-[11px] text-slate-500 mt-2">
                Tip: include country code (e.g., 91 for India). You can preview or copy the message before sending.
              </p>
            </div>
          </aside>

          {/* Mobile sidebar – unchanged */}
          {sidebarOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
              <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 pt-4 pb-6 px-4 flex flex-col lg:hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-sky-400" />
                    <span className="text-sm font-semibold text-sky-300">{moduleData.title}</span>
                  </div>
                  <button type="button" onClick={() => setSidebarOpen(false)} className="p-1 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300">
                    <X size={14} />
                  </button>
                </div>
                <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-[11px] text-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="uppercase tracking-[0.18em] text-[10px] text-slate-500">Progress</span>
                    <span className="text-sky-300 font-semibold">{completedCount}/{totalTopics}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 border border-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <button type="button" onClick={resetProgress} className="mt-2 text-[10px] text-rose-300 hover:text-rose-400">
                    Reset Progress
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 text-sm">
                  {moduleData.topics.map((title, i) => {
                    const isActive = i === index;
                    const isCompleted = completedTopics.includes(i);
                    return (
                      <Link
                        key={i}
                        to={`/${roadmapData.folder}/topic/${moduleSlug}/${i}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`relative flex items-center gap-3 px-3 py-2 rounded-xl border transition ${isActive ? "border-sky-500 bg-sky-600/90 text-white shadow-lg" : "border-slate-800 bg-slate-900/90 text-slate-200 hover:bg-slate-800/90"}`}
                      >
                        <span className={`absolute left-0 top-0 h-full w-[3px] ${isActive ? "bg-sky-300" : "bg-slate-700"}`} />
                        {isCompleted ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> : <span className="w-4 h-4 rounded-full border border-slate-500 shrink-0" />}
                        <span className="truncate"><span className="text-sky-300 mr-1 text-xs">{i + 1}.</span>{title}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <Link to={`/${roadmapData.folder}/module/${moduleSlug}`} onClick={() => setSidebarOpen(false)} className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">
                    ← Back to Module Overview
                  </Link>
                  <Link to={`/${roadmapData.folder}/roadmap`} onClick={() => setSidebarOpen(false)} className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">
                    📍 {roadmapData.subject} Roadmap
                  </Link>
                  <a href="/play" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">
                    🧪 CNAT Playground
                  </a>
                </div>
              </aside>
            </>
          )}

          {/* MAIN TOPIC READER */}
          <main className="flex-1 flex justify-center px-4 lg:px-8 py-6 lg:py-10 will-change-transform">
            <div className="w-full max-w-3xl">
              {/* Topic Header */}
              <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-xl relative overflow-hidden">
                <svg className="absolute top-0 left-0 w-full h-1.5">
                  <defs>
                    <linearGradient id="jsTopicHeaderLine" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#jsTopicHeaderLine)" />
                </svg>
                <div className="p-6 flex flex-col md:flex-row md:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 px-2 py-[2px] text-[9px] text-sky-300">
                        Topic {index + 1} / {totalTopics}
                      </span>
                      {moduleData.level || "Module"} • {moduleData.difficulty || "Difficulty"}
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold text-sky-300">{topicTitle}</h1>
                    <p className="text-[12px] text-slate-400 mt-1">
                      Module: <span className="text-slate-200">{moduleData.title}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    {hasPrev ? (
                      <Link to={`/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`} className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-200 hover:bg-slate-800">
                        <ArrowLeft size={13} /> Prev
                      </Link>
                    ) : (
                      <button disabled className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-[11px] text-slate-600">
                        <ArrowLeft size={13} /> Prev
                      </button>
                    )}
                    {hasNext ? (
                      <Link to={`/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`} className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 border border-sky-500 text-[11px] text-white">
                        Next <ArrowRight size={13} />
                      </Link>
                    ) : (
                      <button disabled className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-[11px] text-slate-600">
                        Next <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Topic Content Panel – removed backdrop-blur for performance */}
              <section className="relative rounded-3xl border border-slate-800 bg-slate-900/70 px-5 md:px-8 py-6 md:py-8 shadow-[0_22px_45px_rgba(15,23,42,0.75)]">
                <Suspense fallback={<p className="text-slate-400 text-sm">Loading topic content…</p>}>
                  {TopicPage ? (
                    <TopicPage key={topicKey} />
                  ) : (
                    <div className="text-slate-300 text-sm">
                      <p className="mb-1">Topic file missing:</p>
                      <pre className="text-sky-400 mt-2 text-xs bg-slate-950/60 rounded-lg p-3 border border-slate-800 overflow-x-auto">
                        {`src/components/study/${roadmapData.folder}/topics/${moduleSlug}/Topic${topicIndex}.jsx`}
                      </pre>
                    </div>
                  )}
                </Suspense>

                {/* WhatsApp Query Box */}
                <div className="mt-10 p-5 rounded-2xl border border-slate-700 bg-slate-900/60 shadow-lg space-y-3">
                  <h3 className="text-lg font-semibold text-sky-300">Have a Question About This Topic?</h3>
                  <p className="text-sm text-slate-400">Send your doubts directly on WhatsApp. I will reply as soon as possible.</p>
                  <textarea
                    id="waQuery"
                    placeholder="Type your question here..."
                    className="w-full bg-slate-800 text-slate-200 p-3 rounded-xl border border-slate-600 text-sm focus:outline-none focus:border-sky-500"
                    rows={3}
                  />
                  <button
                    onClick={() => {
                      const msg = document.getElementById("waQuery").value.trim();
                      if (!msg) return alert("Please type your question first.");
                      const phone = "919432456083";
                      const text = encodeURIComponent(
                        `Hello Sir,\nI have a query regarding:\n\n• Module: ${moduleData.title}\n• Topic: ${topicTitle}\n\nMy Question:\n${msg}`
                      );
                      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
                    }}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition"
                  >
                    📲 Send WhatsApp Query
                  </button>
                </div>
              </section>
            </div>

            {/* FLOATING WHATSAPP BUTTON */}
            <div className="fixed bottom-6 right-6 z-[9999] group">
              <div className="absolute right-14 bottom-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900 text-slate-200 border border-slate-700 text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                Ask your question on WhatsApp
              </div>
              <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
                <div id="waBox" className="w-72 bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-[0_8px_30px_rgba(0,0,0,0.55)] rounded-2xl p-4 text-slate-200 hidden animate-fadeIn">
                  <p className="text-[11px] text-slate-400 mb-2">Ask your question regarding this topic:</p>
                  <textarea id="waMessage" placeholder="Type your doubt here…" rows={3} className="w-full bg-slate-800 text-slate-200 border border-slate-600 rounded-lg text-sm p-2 focus:outline-none focus:border-sky-500" />
                  <button
                    onClick={() => {
                      const rawMsg = document.getElementById("waMessage").value.trim();
                      const userMsg = rawMsg || "(No question typed)";
                      const phone = "919432456083";
                      const text = encodeURIComponent(
                        `📘 *Topic Support Query*\n\n• *Module:* ${moduleData.title}\n• *Topic:* ${topicTitle}\n\n📝 *Student Question:*\n${userMsg}\n\n— Sent from Coder & AccoTax Learning Platform`
                      );
                      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
                    }}
                    className="w-full mt-3 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-semibold text-white transition"
                  >
                    📲 Send on WhatsApp
                  </button>
                </div>
                <button
                  onClick={() => {
                    const box = document.getElementById("waBox");
                    box.classList.toggle("hidden");
                  }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 shadow-[0_8px_25px_rgba(16,185,129,0.45)] border border-green-400/40 flex items-center justify-center text-white text-2xl hover:scale-[1.06] transition-all will-change-transform"
                >
                  💬
                </button>
              </div>
            </div>

            {/* SCROLL TO TOP BUTTON – now outside main */}
            <ScrollButton />

            {/* ROADMAP FLOATING BUTTON */}
            <div className="fixed bottom-24 left-6 z-[9999] group">
              <div className="absolute left-14 bottom-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900 text-slate-200 border border-slate-700 text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                Go to Roadmap
              </div>
              <Link
                to={`/${roadmapData.folder}/roadmap`}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-[0_8px_25px_rgba(168,85,247,0.45)] border border-purple-400/40 flex items-center justify-center text-white text-xl hover:scale-[1.06] transition-all will-change-transform"
              >
                <MapIcon size={20} />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}