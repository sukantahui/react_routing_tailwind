import React, { useState, useEffect, useRef } from "react";
import {
  X,
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  GraduationCap,
  Layers,
  Compass,
  ArrowRight
} from "lucide-react";
import { getBengaliExplanation } from "./topicBengaliExplanations";
import { BlockMath, InlineMath } from "./MathView";

export default function TopicBengaliExplanationModal({
  isOpen,
  onClose,
  topicIndex = 0,
  topicTitle = "",
  moduleTitle = "",
  moduleSlug = ""
}) {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'keypoints' | 'analogy' | 'exam'
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef(null);

  const data = getBengaliExplanation(topicIndex, topicTitle, moduleSlug, moduleTitle);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleStopSpeech();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset tab and stop speaking when topic changes or closes
  useEffect(() => {
    if (!isOpen) {
      handleStopSpeech();
    }
    setActiveTab("overview");
  }, [isOpen, topicIndex]);

  // Clean speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyNotes = () => {
    const textToCopy = `📌 ${data.titleBn} (${data.titleEn})
মডিউল: ${moduleTitle || "Machine Learning"}

১. সহজ সারসংক্ষেপ:
${data.simpleSummary}

২. মূল ধারণা ও ব্যাকগ্রাউন্ড:
${data.coreIntuition}

৩. কেন প্রয়োজন:
${data.whyImportant}

৪. প্রয়োজনীয় মূল বিষয়সমূহ:
${data.keyPoints?.map((p, idx) => `• ${p.title}: ${p.explanation}`).join("\n")}

৫. বাস্তব জীবনের উদাহরণ:
${data.realWorldAnalogy}

৬. পরীক্ষা ও ইন্টারভিউ টিপস:
${data.examTips}
${data.commonMistakes ? `\n৭. সাধারণ ভুল: ${data.commonMistakes}` : ""}
`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleToggleSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isSpeaking) {
      handleStopSpeech();
      return;
    }

    window.speechSynthesis.cancel();

    // Construct text to speak based on current active tab
    let speakText = `${data.titleBn}। ${data.simpleSummary}। `;
    if (activeTab === "overview") {
      speakText += `মূল ধারণা: ${data.coreIntuition}। কেন প্রয়োজন: ${data.whyImportant}`;
    } else if (activeTab === "keypoints") {
      speakText += `প্রয়োজনীয় বিষয়সমূহ: ${data.keyPoints?.map((p) => `${p.title}। ${p.explanation}`).join(" ")}`;
    } else if (activeTab === "analogy") {
      speakText += `বাস্তব জীবনের উদাহরণ: ${data.realWorldAnalogy}`;
    } else if (activeTab === "exam") {
      speakText += `পরীক্ষার টিপস: ${data.examTips}। সাধারণ ভুল: ${data.commonMistakes}`;
    }

    const utterance = new SpeechSynthesisUtterance(speakText);
    utterance.lang = "bn-IN"; // Bengali (India) or fallback
    utterance.rate = 0.95; // Slightly slower for clear educational comprehension

    // Pick a Bengali voice if available
    const voices = window.speechSynthesis.getVoices();
    const bnVoice = voices.find((v) => v.lang.startsWith("bn"));
    if (bnVoice) {
      utterance.voice = bnVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    speechRef.current = utterance;
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleStopSpeech();
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl shadow-emerald-950/40 overflow-hidden text-slate-200">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ============================================================== */}
        {/* MODAL HEADER */}
        {/* ============================================================== */}
        <div className="relative z-10 px-6 py-5 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 font-sans">
                <span>🇧🇩</span>
                <span>Bilingual Study Guide • সহজ বাংলা পাঠ</span>
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-sans">
                Topic {topicIndex} • {data.titleEn}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{data.titleBn}</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-400 font-medium">
              {data.subtitleBn}
            </p>
          </div>

          {/* Close & Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Audio Button */}
            <button
              onClick={handleToggleSpeech}
              className={`p-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold ${
                isSpeaking
                  ? "bg-emerald-600 border-emerald-500 text-white animate-pulse"
                  : "bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200"
              }`}
              title={isSpeaking ? "Stop Voice" : "Listen in Bengali"}
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="hidden sm:inline">{isSpeaking ? "Stop" : "Listen"}</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopyNotes}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 transition flex items-center gap-1.5 text-xs font-semibold"
              title="Copy Study Notes"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Notes"}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                handleStopSpeech();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/80 hover:text-rose-300 border border-slate-700 hover:border-rose-700/60 text-slate-400 transition cursor-pointer"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* NAVIGATION TABS */}
        {/* ============================================================== */}
        <div className="relative z-10 px-6 pt-3 pb-1 border-b border-slate-800/80 bg-slate-900/90 flex flex-wrap gap-2 text-xs">
          {[
            { id: "overview", label: "1. Overview & Core Concept", icon: Sparkles },
            { id: "keypoints", label: "2. Key Points & Deep Dive", icon: Layers },
            { id: "analogy", label: "3. Real-World Analogy (বাস্তব উদাহরণ)", icon: Lightbulb },
            { id: "exam", label: "4. Exam Tips & Pitfalls", icon: GraduationCap }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (isSpeaking) handleStopSpeech();
                }}
                className={`px-3.5 py-2 rounded-xl font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <Icon size={14} className={isActive ? "text-emerald-400" : "text-slate-400"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB CONTENT (SCROLLABLE) */}
        {/* ============================================================== */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Simple Summary Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Sparkles size={16} />
                  <span>এক নজরে সহজ সারসংক্ষেপ:</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                  {data.simpleSummary}
                </p>
              </div>

              {/* Core Intuition */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Compass size={16} />
                  <span>গোড়ার কথা ও মূল ধারণা (Core Intuition):</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {data.coreIntuition}
                </p>
              </div>

              {/* Why Important */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <HelpCircle size={16} />
                  <span>মেশিন লার্নিংয়ে এটি কেন এত গুরুত্বপূর্ণ?</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {data.whyImportant}
                </p>
              </div>

              {/* Formula or Rule if exists */}
              {data.formulaOrRule && (
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/40 space-y-1.5">
                  <span className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">
                    গাণিতিক নীতি / নিয়ম (Core Rule):
                  </span>
                  <div className="text-xs sm:text-sm font-mono text-cyan-200 p-2.5 bg-slate-900 rounded-lg overflow-x-auto border border-cyan-950">
                    {data.formulaOrRule}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KEY POINTS */}
          {activeTab === "keypoints" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Layers size={16} />
                  <span>প্রয়োজনীয় বিষয়গুলির পুঙ্খানুপুঙ্খ ব্যাখ্যা ({data.keyPoints?.length || 0} টি মূল বিষয়):</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {data.keyPoints?.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition space-y-1.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {point.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pl-8">
                      {point.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REAL-WORLD ANALOGY */}
          {activeTab === "analogy" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-950 to-slate-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Lightbulb size={20} />
                  <span>বাস্তব জীবনের দৃশ্যকল্প (Real-World Intuition):</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                  {data.realWorldAnalogy}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                <span className="text-emerald-400 font-bold">💡 কেন বাস্তব উদাহরণের সাথে মেলানো জরুরি?</span>
                <p>
                  মেশিন লার্নিংয়ের অনেক জটিল টার্ম শুনলে খটমট মনে হতে পারে। কিন্তু বাস্তব জীবনের সহজ বিষয়ের সাথে মেলালে যেকোনো অ্যালগরিদমের ভেতরের যুক্তিবোধ অত্যন্ত স্বচ্ছ হয়ে ওঠে এবং দীর্ঘদিন স্মৃতিতে স্থায়ী থাকে।
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: EXAM TIPS & PITFALLS */}
          {activeTab === "exam" && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Exam & Interview Tips */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <GraduationCap size={18} />
                  <span>পরীক্ষা ও ইন্টারভিউয়ের জন্য সেরা টিপস:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {data.examTips}
                </p>
              </div>

              {/* Common Pitfalls / Mistakes */}
              {data.commonMistakes && (
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-rose-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertTriangle size={18} />
                    <span>সাধারণ ভুল যা শিক্ষার্থীরা করে থাকে (Common Pitfalls):</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {data.commonMistakes}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* MODAL FOOTER */}
        {/* ============================================================== */}
        <div className="relative z-10 px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 flex items-center gap-2">
            <span>কীবোর্ড শর্টকাট:</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">ESC</kbd>
            <span>দিয়ে বন্ধ করতে পারেন</span>
          </div>

          <button
            onClick={() => {
              handleStopSpeech();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition shadow-lg shadow-emerald-950/60 cursor-pointer active:scale-95"
          >
            বুঝেছি, ধন্যবাদ! (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
