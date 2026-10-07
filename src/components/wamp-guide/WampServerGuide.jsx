// ============================================================================
// WampServerGuide.jsx - WampServer 3.4.0 & Visual C++ Master Installation Guide
// Bilingual (English & Bengali) Ultra-Modern Interactive Tool
// Author: Sukanta Hui (Coder & AccoTax)
// ============================================================================

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  translations,
  vcPackages,
  osData,
  stepsList,
  psBatchScript,
  mysqlRootPasswordGuide,
} from "./wampGuideData";
import {
  Server,
  Download,
  Terminal,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Languages,
  RotateCcw,
  Search,
  X,
  Printer,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Boxes,
  Globe,
  Database,
  Code2,
  Lightbulb,
  FileCode,
  Layers,
  Sparkles,
  ArrowUp,
  SlidersHorizontal,
  Info,
  Laptop,
  CheckCheck,
  FolderOpen,
  MousePointer,
  HelpCircle,
  Clock,
  Car,
  Key,
  Lock,
  Unlock,
} from "lucide-react";

export default function WampServerGuide() {
  // --------------------------------------------------------------------------
  // 1. Core State
  // --------------------------------------------------------------------------
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("wamp_guide_lang") || "en";
  });

  const [selectedOs, setSelectedOs] = useState("win11");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedSnippets, setCopiedSnippets] = useState({});
  const [openAccordion, setOpenAccordion] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [rootPassTab, setRootPassTab] = useState("console"); // 'console' | 'phpmyadmin' | 'config' | 'phpcode'

  const toastTimerRef = useRef(null);

  // --------------------------------------------------------------------------
  // 2. Checklist Persistence
  // --------------------------------------------------------------------------
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem("wamp_install_checklist_v1");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("wamp_guide_lang", lang);
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem("wamp_install_checklist_v1", JSON.stringify(checklist));
    } catch (err) {
      console.error("Checklist storage error:", err);
    }
  }, [checklist]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = translations[lang] || translations.en;
  const isBn = lang === "bn";

  // --------------------------------------------------------------------------
  // 3. Notification Toast Helper
  // --------------------------------------------------------------------------
  const triggerToast = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // --------------------------------------------------------------------------
  // 4. Checklist Actions
  // --------------------------------------------------------------------------
  const toggleCheckItem = (id) => {
    setChecklist((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const status = next[id]
        ? isBn
          ? "ধাপ সম্পন্ন চিহ্নিত করা হলো!"
          : "Item marked completed!"
        : isBn
        ? "ধাপ আনচেক করা হলো।"
        : "Item unmarked.";
      triggerToast(status);
      return next;
    });
  };

  const markAllVcInstalled = () => {
    setChecklist((prev) => {
      const next = { ...prev };
      vcPackages.forEach((p) => {
        next[p.id] = true;
      });
      triggerToast(
        isBn
          ? "সকল ১০টি Visual C++ প্যাকেজ সম্পন্ন চিহ্নিত করা হয়েছে!"
          : "All 10 Visual C++ packages marked as installed!"
      );
      return next;
    });
  };

  const resetVcChecklist = () => {
    setChecklist((prev) => {
      const next = { ...prev };
      vcPackages.forEach((p) => {
        delete next[p.id];
      });
      triggerToast(
        isBn
          ? "Visual C++ চেকলিস্ট রিসেট করা হয়েছে।"
          : "Visual C++ checklist reset."
      );
      return next;
    });
  };

  const resetAllChecklist = () => {
    setChecklist({});
    triggerToast(
      isBn ? "সম্পূর্ণ চেকলিস্ট রিসেট করা হয়েছে।" : "All checklist items reset."
    );
  };

  // --------------------------------------------------------------------------
  // 5. Progress Calculation
  // --------------------------------------------------------------------------
  const totalTasks = vcPackages.length + stepsList.length; // 10 + 6 = 16
  const completedCount = useMemo(() => {
    let count = 0;
    vcPackages.forEach((p) => {
      if (checklist[p.id]) count++;
    });
    stepsList.forEach((s) => {
      if (checklist[s.id]) count++;
    });
    return count;
  }, [checklist]);

  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  // --------------------------------------------------------------------------
  // 6. Filter & Search VC Packages
  // --------------------------------------------------------------------------
  const filteredPackages = useMemo(() => {
    return vcPackages.filter((pkg) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        pkg.name.toLowerCase().includes(q) ||
        pkg.arch.toLowerCase().includes(q) ||
        pkg.archLabel.toLowerCase().includes(q) ||
        pkg.year.toString().includes(q) ||
        pkg.dll.toLowerCase().includes(q) ||
        (pkg.notes_en && pkg.notes_en.toLowerCase().includes(q)) ||
        (pkg.notes_bn && pkg.notes_bn.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (filterCategory === "all") return true;
      if (filterCategory === "x64") return pkg.arch === "x64";
      if (filterCategory === "x86") return pkg.arch === "x86";
      if (filterCategory === "recent") return pkg.category === "recent";
      if (filterCategory === "legacy") return pkg.category === "legacy";
      return true;
    });
  }, [searchQuery, filterCategory]);

  // --------------------------------------------------------------------------
  // 7. Copy Helpers
  // --------------------------------------------------------------------------
  const handleCopyScript = () => {
    navigator.clipboard.writeText(psBatchScript);
    setCopiedScript(true);
    triggerToast(
      isBn
        ? "PowerShell স্ক্রিপ্ট কপি হয়েছে! Administrator হিসেবে PowerShell এ পেস্ট করুন।"
        : "PowerShell script copied to clipboard! Paste into PowerShell as Admin."
    );
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleCopySnippet = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippets((prev) => ({ ...prev, [key]: true }));
    triggerToast(isBn ? "কোড কপি হয়েছে!" : "Code copied to clipboard!");
    setTimeout(() => {
      setCopiedSnippets((prev) => ({ ...prev, [key]: false }));
    }, 2500);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentOs = osData[selectedOs] || osData.win11;

  return (
    <div
      className={`min-h-screen bg-[#030712] text-slate-100 ${
        isBn ? "font-bengali" : ""
      } selection:bg-sky-500/30 selection:text-sky-300 pb-20`}
    >
      {/* ================= STICKY SUB-BAR ================= */}
      <div className="sticky top-[106px] lg:top-14 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <Server size={16} className="text-sky-400 shrink-0" />
            <span className="font-semibold text-white">WampServer 3.4.0 (x64)</span>
            <span>/</span>
            <span className="text-sky-400 hidden sm:inline">Visual C++ Master Guide</span>
          </div>

          {/* Quick Actions Group */}
          <div className="flex items-center gap-2">
            {/* Language Switcher Button */}
            <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-0.5 shadow-inner">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  lang === "en"
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang("bn")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  lang === "bn"
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Languages size={13} />
                বাংলা
              </button>
            </div>

            {/* Checklist Drawer Trigger Pill */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-all hover:border-sky-500/40 cursor-pointer shadow-sm group"
              title="View Installation Checklist"
            >
              <CheckCircle2
                size={14}
                className={
                  progressPercent === 100
                    ? "text-emerald-400"
                    : "text-sky-400 group-hover:scale-110 transition-transform"
                }
              />
              <span className="font-medium">
                {completedCount}/{totalTasks} {isBn ? "টাস্ক" : "Tasks"} ({progressPercent}%)
              </span>
              <div className="w-14 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </button>

            {/* Print / Export PDF */}
            <button
              type="button"
              onClick={() => window.print()}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={isBn ? "প্রিন্ট বা PDF হিসেবে সংরক্ষণ করুন" : "Print or Export as PDF"}
            >
              <Printer size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-sky-500/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroTitle}{" "}
            <span className="block mt-1 bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              {t.heroTitleHighlight}
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
            {t.heroDesc}
          </p>

          {/* Author Attribution Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-sky-500/20">
                SH
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">Sukanta Hui (সুকান্ত হুই)</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    {t.authorRole}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{t.authorOrg}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 self-start sm:self-center">
              <ShieldCheck size={16} />
              <span>{t.authorVerified}</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="grid sm:grid-cols-3 gap-3 pt-2">
            <a
              href="https://wampserver.aviatechno.net/files/install/wampserver3.4.0_x64.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <Download size={22} className="group-hover:scale-110 transition-transform shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold leading-tight">{t.btnDownloadWamp}</div>
                <div className="text-[11px] text-sky-100/80 font-normal">{t.btnDownloadWampSub}</div>
              </div>
            </a>

            <button
              type="button"
              onClick={() => scrollToSection("fundamentals")}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-semibold transition-all transform hover:-translate-y-0.5 cursor-pointer text-left"
            >
              <Lightbulb size={22} className="text-amber-400 shrink-0" />
              <div>
                <div className="text-xs sm:text-sm font-bold leading-tight">{t.btnStartGuide}</div>
                <div className="text-[11px] text-slate-400 font-normal">{t.btnStartGuideSub}</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("script-generator")}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400/80 text-cyan-300 font-semibold shadow-md shadow-cyan-500/10 transition-all transform hover:-translate-y-0.5 cursor-pointer text-left"
            >
              <Terminal size={22} className="text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs sm:text-sm font-bold leading-tight">{t.btnAutomatedScript}</div>
                <div className="text-[11px] text-cyan-400/70 font-normal">{t.btnAutomatedScriptSub}</div>
              </div>
            </button>
          </div>

          {/* Quick Jump Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
              {isBn ? "দ্রুত নেভিগেশন:" : "Quick Jumps:"}
            </span>
            <button
              type="button"
              onClick={() => scrollToSection("fundamentals")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {isBn ? "অধ্যায় ১: পরিচিতি" : "#1 Fundamentals"}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("prerequisites")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {isBn ? "VC++ প্যাকেজসমূহ" : "#2 VC++ Packages"}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("wizard-guide")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {isBn ? "ইনস্টলেশন পর্যায় (১-৯)" : "#3 Wizard (1-9)"}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("first-project")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {isBn ? "প্রথম PHP প্রজেক্ট" : "#4 First PHP Project"}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("mysql-root-password")}
              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-white transition cursor-pointer font-bold flex items-center gap-1 shadow-sm"
            >
              <Key size={11} className="text-amber-400" />
              <span>{isBn ? "MySQL root পাসওয়ার্ড ('sukantahui')" : "MySQL Root Pass ('sukantahui')"}</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("troubleshooting")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {isBn ? "সমস্যা সমাধান" : "#Troubleshooting"}
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ================= CHAPTER 1: FUNDAMENTALS ================= */}
        <section id="fundamentals" className="scroll-mt-32 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
              <Lightbulb size={14} />
              <span>{t.ch1Tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.ch1Title}</h2>
            <p className="text-slate-400 text-sm mt-1">{t.ch1Subtitle}</p>
          </div>

          {/* W-A-M-P Breakdown Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* W */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-all space-y-3 relative group">
              <div className="text-3xl font-black text-sky-400 font-mono">W</div>
              <h3 className="font-bold text-white text-base">{t.wampWTitle}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.wampWDesc}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-sky-400 font-medium pt-1">
                <Laptop size={13} />
                <span>{t.wampWRole}</span>
              </div>
            </div>

            {/* A */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all space-y-3 relative group">
              <div className="text-3xl font-black text-rose-400 font-mono">A</div>
              <h3 className="font-bold text-white text-base">{t.wampATitle}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.wampADesc}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-rose-400 font-medium pt-1">
                <Globe size={13} />
                <span>{t.wampARole}</span>
              </div>
            </div>

            {/* M */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 relative group">
              <div className="text-3xl font-black text-amber-400 font-mono">M</div>
              <h3 className="font-bold text-white text-base">{t.wampMTitle}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.wampMDesc}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium pt-1">
                <Database size={13} />
                <span>{t.wampMRole}</span>
              </div>
            </div>

            {/* P */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3 relative group">
              <div className="text-3xl font-black text-purple-400 font-mono">P</div>
              <h3 className="font-bold text-white text-base">{t.wampPTitle}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.wampPDesc}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-purple-400 font-medium pt-1">
                <Code2 size={13} />
                <span>{t.wampPRole}</span>
              </div>
            </div>
          </div>

          {/* Layperson's VC++ Explainer */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold flex items-center gap-1.5">
                <HelpCircle size={14} />
                {t.explainerBadge}
              </span>
              <h3 className="text-lg font-bold text-white">{t.explainerTitle}</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{t.explainerText}</p>

            {/* Analogy Box */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <Car size={24} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                <strong className="text-amber-300 block mb-1">{t.analogyTitle}</strong>
                {t.analogyText}
              </div>
            </div>
          </div>

          {/* 3 Golden Rules */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 font-bold text-sm flex items-center justify-center border border-sky-500/20">
                1
              </div>
              <h4 className="font-bold text-white text-sm">{t.rule1Title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{t.rule1Text}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-sm flex items-center justify-center border border-indigo-500/20">
                2
              </div>
              <h4 className="font-bold text-white text-sm">{t.rule2Title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{t.rule2Text}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-sm flex items-center justify-center border border-emerald-500/20">
                3
              </div>
              <h4 className="font-bold text-white text-sm">{t.rule3Title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{t.rule3Text}</p>
            </div>
          </div>
        </section>

        {/* ================= STEP 0: OS ENVIRONMENT SELECTOR ================= */}
        <section id="step-0" className="scroll-mt-32 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1">
              <Laptop size={14} />
              <span>{t.step0Tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.step0Title}</h2>
            <p className="text-slate-400 text-sm mt-1">{t.step0Subtitle}</p>
          </div>

          {/* Quick 64-bit Architecture Tip */}
          <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-start gap-3 text-xs sm:text-sm text-sky-200">
            <Info size={20} className="text-sky-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-sky-300">
                {isBn ? "সহজ চেকিং টিপস:" : "Quick Bitness Tip:"}{" "}
              </strong>
              {t.bitnessCheck}
            </div>
          </div>

          {/* OS Selector Tabs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.keys(osData).map((key) => {
              const os = osData[key];
              const isSelected = selectedOs === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedOs(key)}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-sky-500/15 border-sky-500 text-white shadow-lg shadow-sky-500/10 font-bold"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{os.label}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">
                    {key === "win11" || key === "win10"
                      ? isBn
                        ? "সরাসরি সাপোর্ট"
                        : "Full Support"
                      : isBn
                      ? "প্যাচ প্রয়োজন"
                      : "Patches Needed"}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected OS Details Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Laptop size={18} className="text-sky-400" />
                {isBn ? currentOs.title_bn : currentOs.title_en}
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 self-start sm:self-auto">
                {isBn ? "টার্গেট আর্কিটেকচার: ৬৪-বিট" : "Target Architecture: x64"}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {isBn ? currentOs.desc_bn : currentOs.desc_en}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {(isBn ? currentOs.reqs_bn : currentOs.reqs_en).map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300"
                >
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{req.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MANDATORY PREREQUISITES: VC++ MATRIX ================= */}
        <section id="prerequisites" className="scroll-mt-32 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <Boxes size={14} />
              <span>{t.vcTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.vcTitle}</h2>
            <p className="text-slate-400 text-sm mt-1">{t.vcSubtitle}</p>
          </div>

          {/* Crucial Golden Rule Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-200">
              <strong className="text-amber-300 block mb-0.5">{t.goldenRuleTitle}</strong>
              <span>{t.goldenRuleText}</span>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: t.filterAll },
                { id: "x64", label: t.filterX64 },
                { id: "x86", label: t.filterX86 },
                { id: "recent", label: t.filterRecent },
                { id: "legacy", label: t.filterLegacy },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setFilterCategory(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    filterCategory === filter.id
                      ? "bg-sky-500 text-white shadow-sm"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bulk Action Buttons */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>
              {isBn ? "প্রদর্শিত প্যাকেজ:" : "Showing Packages:"}{" "}
              <strong className="text-white">{filteredPackages.length}</strong> / 10
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={markAllVcInstalled}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
              >
                <CheckCheck size={14} />
                {t.markAllBtn}
              </button>
              <button
                type="button"
                onClick={resetVcChecklist}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                {t.resetBtn}
              </button>
            </div>
          </div>

          {/* 10 VC++ Packages Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredPackages.map((pkg) => {
              const isDone = !!checklist[pkg.id];
              return (
                <div
                  key={pkg.id}
                  className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between space-y-4 ${
                    isDone
                      ? "bg-emerald-950/20 border-emerald-500/40 shadow-sm shadow-emerald-500/10"
                      : "bg-slate-900/90 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-2">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => toggleCheckItem(pkg.id)}
                          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title={isDone ? "Unmark package" : "Mark as installed"}
                        >
                          {isDone ? (
                            <CheckCircle2 size={20} className="text-emerald-400" />
                          ) : (
                            <Circle size={20} className="text-slate-600 hover:text-sky-400" />
                          )}
                        </button>
                        <div>
                          <h4 className="font-bold text-white text-base leading-tight">
                            {pkg.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {pkg.version}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                          pkg.arch === "x64"
                            ? "bg-sky-500/10 text-sky-400 border-sky-500/30"
                            : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                        }`}
                      >
                        {pkg.archLabel}
                      </span>
                    </div>

                    {/* DLLs Info */}
                    <div className="text-xs bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 font-mono text-slate-300">
                      <span className="text-slate-500 block text-[10px] uppercase font-sans font-semibold">
                        Target DLLs:
                      </span>
                      {pkg.dll}
                    </div>

                    {/* Note */}
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {isBn ? pkg.notes_bn : pkg.notes_en}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <button
                      type="button"
                      onClick={() => toggleCheckItem(pkg.id)}
                      className={`text-xs font-semibold transition-colors cursor-pointer ${
                        isDone ? "text-emerald-400" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {isDone
                        ? isBn
                          ? "✓ ইনস্টল সম্পন্ন"
                          : "✓ Installed"
                        : isBn
                        ? "ইনস্টল সম্পন্ন চিহ্নিত করুন"
                        : "Mark Installed"}
                    </button>

                    <a
                      href={pkg.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-semibold transition-colors"
                    >
                      <Download size={13} />
                      <span>{isBn ? "ডাউনলোড" : "Download EXE"}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diagnostic Utility Card: check_vcredist.exe */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                  <ShieldCheck size={14} />
                  <span>{isBn ? "অফিসিয়াল ডায়াগনস্টিক টুল" : "Official Diagnostic Utility"}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{t.diagTitle}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {t.diagDesc}
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-start sm:items-end gap-1.5">
                <a
                  href="https://wampserver.aviatechno.net/files/tools/check_vcredist.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Download size={16} />
                  <span>{t.diagDownload}</span>
                </a>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck size={12} className="text-indigo-400" />
                  {isBn ? "Run as Administrator হিসেবে চালান" : "Run as Administrator"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 1-CLICK POWERSHELL SCRIPT ================= */}
        <section id="script-generator" className="scroll-mt-32 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>{t.scriptTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.scriptTitle}</h2>
            <p className="text-slate-400 text-sm mt-1">{t.scriptSubtitle}</p>
          </div>

          {/* 3 Step Beginner Instructions */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Terminal size={16} className="text-cyan-400" />
              <span>{t.scriptHowTo}</span>
            </h4>

            <div className="grid md:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">{t.scriptStep1}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">{t.scriptStep2}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">{t.scriptStep3}</div>
              </div>
            </div>
          </div>

          {/* Terminal Window Box */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-slate-400 ml-2 font-medium">
                  PowerShell (Administrator) — Install-All-VCRedist.ps1
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyScript}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
              >
                {copiedScript ? <Check size={14} /> : <Copy size={14} />}
                <span>
                  {copiedScript
                    ? isBn
                      ? "কপি সম্পন্ন!"
                      : "Copied!"
                    : isBn
                    ? "স্ক্রিপ্ট কপি করুন"
                    : "Copy Script"}
                </span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 overflow-x-auto max-h-[380px] text-xs font-mono leading-relaxed text-slate-300">
              <pre>
                <code>{psBatchScript}</code>
              </pre>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-slate-900/50 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lightbulb size={13} className="text-amber-400" />
              <span>
                {isBn
                  ? "টিপস: স্ক্রিপ্ট রান শেষে কম্পিউটার একবার রিস্টার্ট করে নেওয়া ভালো।"
                  : "Tip: After running this script, you can restart your computer to refresh Windows handles."}
              </span>
            </div>
          </div>
        </section>

        {/* ================= STEP-BY-STEP INSTALLATION WIZARD ================= */}
        <section id="wizard-guide" className="scroll-mt-32 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Layers size={14} />
              <span>{t.wizardTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.wizardTitle}</h2>
            <p className="text-slate-400 text-sm mt-1">{t.wizardSubtitle}</p>
          </div>

          <div className="space-y-6">
            {/* STAGE 1 */}
            <div
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                checklist["check-step-1"]
                  ? "bg-slate-900/40 border-emerald-500/40"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleCheckItem("check-step-1")}
                    className="cursor-pointer"
                  >
                    {checklist["check-step-1"] ? (
                      <CheckCircle2 size={24} className="text-emerald-400" />
                    ) : (
                      <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 font-bold text-sm flex items-center justify-center border border-sky-500/30">
                        01
                      </span>
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {isBn
                        ? "পর্যায় ১: প্রি-ইনস্টলেশন পোর্ট ও সিস্টেম চেক"
                        : "Stage 1: Pre-Installation Environment & Port Check"}
                    </h3>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> ~3 mins
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300">
                {isBn
                  ? "ইনস্টলার চালানোর আগে নিশ্চিত হন অন্য কোনো প্রোগ্রাম যেন পোর্ট ৮০ ও ৩৩০৬ দখল করে না থাকে:"
                  : "Before launching the installer, ensure that no other background services are using standard web server ports:"}
              </p>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                  <strong className="text-amber-400 block font-semibold">
                    {isBn
                      ? "পোর্ট ৮০ ও ৪৪৩ (Apache HTTP/HTTPS):"
                      : "Port 80 & 443 (Apache HTTP/HTTPS):"}
                  </strong>
                  <p className="text-slate-400">
                    {isBn
                      ? "উইন্ডোজ IIS (World Wide Web Publishing Service) অথবা স্কাইপ চালু থাকলে অ্যাপাচি স্টার্ট হবে না।"
                      : "Check if Windows IIS (World Wide Web Publishing Service) or Skype is running. If IIS is active, it blocks Apache."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                  <strong className="text-amber-400 block font-semibold">
                    {isBn
                      ? "পোর্ট ৩৩০৬ ও ৩৩০৭ (MySQL / MariaDB):"
                      : "Port 3306 & 3307 (MySQL / MariaDB):"}
                  </strong>
                  <p className="text-slate-400">
                    {isBn
                      ? "আগে থেকে আলাদা MySQL বা XAMPP ইনস্টল থাকলে তাদের সার্ভিসগুলো আগে বন্ধ (Stop) করে নিন।"
                      : "If you already have a standalone MySQL server or XAMPP installed, make sure their services are stopped first."}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono text-cyan-300">
                <code className="truncate">
                  Get-NetTCPConnection -LocalPort 80,443,3306,3307 -ErrorAction SilentlyContinue
                </code>
                <button
                  type="button"
                  onClick={() =>
                    handleCopySnippet(
                      "portCheck",
                      "Get-NetTCPConnection -LocalPort 80,443,3306,3307 -ErrorAction SilentlyContinue"
                    )
                  }
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0 cursor-pointer font-sans"
                >
                  {copiedSnippets["portCheck"] ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* STAGE 2 */}
            <div
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                checklist["check-step-2"]
                  ? "bg-slate-900/40 border-emerald-500/40"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleCheckItem("check-step-2")}
                  className="cursor-pointer"
                >
                  {checklist["check-step-2"] ? (
                    <CheckCircle2 size={24} className="text-emerald-400" />
                  ) : (
                    <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 font-bold text-sm flex items-center justify-center border border-sky-500/30">
                      02
                    </span>
                  )}
                </button>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isBn
                      ? "পর্যায় ২: সকল Visual C++ রানটাইম ইনস্টল করুন"
                      : "Stage 2: Install All Visual C++ Redistributables"}
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> ~5 mins
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300">
                {isBn
                  ? "২০০৮ থেকে ২০২২ পর্যন্ত সকল ১০টি প্যাকেজ (৩২-বিট x86 এবং ৬৪-বিট x64 উভয়ই) ইনস্টল করুন।"
                  : "Install all 10 required VC++ packages (both 32-bit x86 and 64-bit x64)."}
              </p>

              <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-xs text-sky-200">
                <strong>{isBn ? "যাচাইকরণ টুল:" : "Verify with check_vcredist.exe:"}</strong>{" "}
                {isBn
                  ? "ইনস্টল শেষে check_vcredist.exe চালিয়ে নিশ্চিত হয়ে নিন সবকটি DLL সবুজ দেখাচ্ছে।"
                  : "Run the verification tool after installing runtimes to confirm that all required DLLs are green."}
              </div>
            </div>

            {/* STAGE 3 */}
            <div
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                checklist["check-step-3"]
                  ? "bg-slate-900/40 border-emerald-500/40"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleCheckItem("check-step-3")}
                  className="cursor-pointer"
                >
                  {checklist["check-step-3"] ? (
                    <CheckCircle2 size={24} className="text-emerald-400" />
                  ) : (
                    <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 font-bold text-sm flex items-center justify-center border border-sky-500/30">
                      03
                    </span>
                  )}
                </button>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isBn
                      ? "পর্যায় ৩: WampServer 3.4.0 (x64) ইনস্টলার ডাউনলোড"
                      : "Stage 3: Download WampServer 3.4.0 (x64) Installer"}
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> ~2 mins
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 grid sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">{isBn ? "ফাইলের নাম:" : "File Name:"}</span>
                  <span className="font-mono text-white font-bold">wampserver3.4.0_x64.exe</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{isBn ? "ফাইলের সাইজ:" : "File Size:"}</span>
                  <span className="text-white">~600 MB (Apache 2.4, PHP 8.x, MySQL, MariaDB)</span>
                </div>
              </div>

              <a
                href="https://wampserver.aviatechno.net/files/install/wampserver3.4.0_x64.exe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/20 cursor-pointer"
              >
                <Download size={14} />
                <span>{isBn ? "সরাসরি ডাউনলোড লিঙ্ক (Aviatechno)" : "Direct Download Link (Aviatechno)"}</span>
              </a>
            </div>

            {/* STAGE 4: SCREENS 1 TO 9 */}
            <div
              className={`p-6 rounded-2xl border transition-all space-y-6 ${
                checklist["check-step-4"]
                  ? "bg-slate-900/40 border-emerald-500/40"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleCheckItem("check-step-4")}
                  className="cursor-pointer"
                >
                  {checklist["check-step-4"] ? (
                    <CheckCircle2 size={24} className="text-emerald-400" />
                  ) : (
                    <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 font-bold text-sm flex items-center justify-center border border-sky-500/30">
                      04
                    </span>
                  )}
                </button>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isBn
                      ? "পর্যায় ৪: উইজার্ড সেটআপ ও স্ক্রিনভিত্তিক নির্দেশিকা"
                      : "Stage 4: Step-by-Step Installation Wizard Walkthrough"}
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> ~5 mins
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300">
                {isBn
                  ? 'ডাউনলোড করা wampserver3.4.0_x64.exe ফাইলটিতে রাইট-ক্লিক করে "Run as administrator" করুন। নিচের ৯টি স্ক্রিন অনুসরণ করুন:'
                  : 'Right-click wampserver3.4.0_x64.exe in your Downloads folder and select "Run as administrator". Follow each screen carefully:'}
              </p>

              {/* 9 Screens Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {/* Screen 1 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">{isBn ? "স্ক্রিন ১" : "Screen 1"}</span>
                    <span className="text-[11px] text-slate-400 font-semibold">{isBn ? "ভাষা নির্বাচন" : "Language"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBn
                      ? 'ড্রপডাউন থেকে English বেছে নিয়ে OK চাপুন।'
                      : 'Choose English from dropdown and click OK.'}
                  </p>
                </div>

                {/* Screen 2 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">{isBn ? "স্ক্রিন ২" : "Screen 2"}</span>
                    <span className="text-[11px] text-slate-400 font-semibold">{isBn ? "লাইসেন্স চুক্তি" : "Agreement"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBn
                      ? 'Select "I accept the agreement" → Next >'
                      : 'Select "I accept the agreement" → click Next >'}
                  </p>
                </div>

                {/* Screen 3 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">{isBn ? "স্ক্রিন ৩" : "Screen 3"}</span>
                    <span className="text-[11px] text-slate-400 font-semibold">{isBn ? "VC++ নোটিশ" : "VC++ Notice"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBn
                      ? "প্যাকেজ রিমাইন্ডার স্ক্রিন আসবে। Next > চাপুন।"
                      : "VC++ reminder list. Click Next >."}
                  </p>
                </div>

                {/* Screen 4 (Critical) */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/40 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">{isBn ? "স্ক্রিন ৪ (গুরুত্বপূর্ণ)" : "Screen 4 (CRITICAL)"}</span>
                    <span className="text-[11px] text-amber-300 font-semibold">{isBn ? "ইনস্টলেশন পাথ" : "Path"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBn ? "ডিফল্ট পাথ রাখুন: " : "Recommended Path: "}
                    <code className="text-amber-300">C:\wamp64</code>
                  </p>
                  <p className="text-[11px] text-rose-400">
                    {isBn
                      ? "সতর্কতা: C:\\Program Files এ স্পেস থাকার কারণে Apache নষ্ট হবে।"
                      : "NEVER install to C:\\Program Files due to space issues."}
                  </p>
                </div>

                {/* Screen 5 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">{isBn ? "স্ক্রিন ৫" : "Screen 5"}</span>
                    <span className="text-[11px] text-slate-400 font-semibold">{isBn ? "কম্পোনেন্ট" : "Components"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBn
                      ? "ডিফল্ট অপশন সিলেক্ট রেখে Next > চাপুন।"
                      : "Keep default components selected → click Next >."}
                  </p>
                </div>

                {/* Screen 6 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">{isBn ? "স্ক্রিন ৬" : "Screen 6"}</span>
                    <span className="text-[11px] text-slate-400 font-semibold">{isBn ? "ফাইল এক্সট্রাকশন" : "Install"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBn
                      ? "Start Menu Folder এ Wampserver64 রেখে Install চাপুন।"
                      : "Keep Wampserver64 and click Install."}
                  </p>
                </div>

                {/* Screen 7 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">{isBn ? "স্ক্রিন ৭" : "Screen 7"}</span>
                    <span className="text-[11px] text-sky-300 font-semibold">{isBn ? "ব্রাউজার নির্বাচন" : "Browser"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBn
                      ? "পপআপে YES চাপুন → Chrome বা Edge বেছে নিন:"
                      : "Popup asks for default browser → Click YES → Select Chrome/Edge:"}
                  </p>
                  <code className="text-[10px] block text-sky-300 bg-slate-900 p-1.5 rounded truncate">
                    C:\Program Files\Google\Chrome\Application\chrome.exe
                  </code>
                </div>

                {/* Screen 8 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">{isBn ? "স্ক্রিন ৮" : "Screen 8"}</span>
                    <span className="text-[11px] text-sky-300 font-semibold">{isBn ? "এডিটর নির্বাচন" : "Editor"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBn
                      ? "পপআপে YES চাপুন → Notepad++ বা VS Code বেছে নিন (অথবা NO চাপুন)।"
                      : "Click YES for Notepad++ / VS Code (or NO for default Notepad)."}
                  </p>
                  <code className="text-[10px] block text-sky-300 bg-slate-900 p-1.5 rounded truncate">
                    C:\Program Files\Notepad++\notepad++.exe
                  </code>
                </div>

                {/* Screen 9 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">{isBn ? "স্ক্রিন ৯" : "Screen 9"}</span>
                    <span className="text-[11px] text-emerald-300 font-semibold">{isBn ? "সমাপ্তি" : "Finish"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBn
                      ? "তথ্য স্ক্রিনে Next > চেপে Finish বাটনে ক্লিক করে শেষ করুন।"
                      : "Click Next > on the info screen, then Finish."}
                  </p>
                </div>
              </div>
            </div>

            {/* STAGE 5: SYSTEM TRAY DIAGNOSTICS */}
            <div
              className={`p-6 rounded-2xl border transition-all space-y-6 ${
                checklist["check-step-5"]
                  ? "bg-slate-900/40 border-emerald-500/40"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleCheckItem("check-step-5")}
                  className="cursor-pointer"
                >
                  {checklist["check-step-5"] ? (
                    <CheckCircle2 size={24} className="text-emerald-400" />
                  ) : (
                    <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 font-bold text-sm flex items-center justify-center border border-sky-500/30">
                      05
                    </span>
                  )}
                </button>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isBn
                      ? "পর্যায় ৫: প্রথমবার চালু ও সিস্টেম ট্রে আইকন গাইড"
                      : "Stage 5: First Launch & System Tray Icon Guide"}
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> ~3 mins
                  </span>
                </div>
              </div>

              {/* 3 Color States Cards */}
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs font-mono">
                      W
                    </span>
                    <strong className="text-emerald-300 text-xs font-bold">
                      {isBn ? "সবুজ (GREEN - সম্পূর্ণ প্রস্তুত)" : "GREEN (3/3 Online)"}
                    </strong>
                  </div>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    {isBn
                      ? "Apache, MySQL ও MariaDB সম্পূর্ণ সচল ও প্রস্তুত।"
                      : "All 3 services (Apache, MySQL, MariaDB) active and listening."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs font-mono">
                      W
                    </span>
                    <strong className="text-amber-300 text-xs font-bold">
                      {isBn ? "কমলা (ORANGE - আংশিক)" : "ORANGE (1 or 2 Offline)"}
                    </strong>
                  </div>
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    {isBn
                      ? "সাধারণত পোর্ট ৮০ (IIS) বা পোর্ট ৩৩০৬ ব্লকের কারণে ঘটে।"
                      : "Usually Port 80 is occupied by IIS/Skype or MySQL port collision."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white font-black text-xs font-mono">
                      W
                    </span>
                    <strong className="text-rose-300 text-xs font-bold">
                      {isBn ? "লাল (RED - বন্ধ)" : "RED (0/3 Offline)"}
                    </strong>
                  </div>
                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    {isBn
                      ? "Visual C++ রানটাইম অনুপস্থিত বা কনফিগারেশন ত্রুটি।"
                      : "Missing Visual C++ runtimes or blocked system permissions."}
                  </p>
                </div>
              </div>

              {/* Left vs Right Click Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-sky-400">
                    <MousePointer size={16} />
                    <span>{isBn ? "সবুজ W তে লেফট-ক্লিক (Left-Click):" : "LEFT-CLICK on Green W Icon:"}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {isBn ? "সার্ভিস নিয়ন্ত্রণ ও পিএইচপি সংস্করণ মেনু:" : "Service Administration Menu:"}
                  </p>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>{isBn ? "Localhost বা phpMyAdmin সরাসরি ওপেন করা" : "Open Localhost or phpMyAdmin"}</li>
                    <li>{isBn ? "PHP সংস্করণ পরিবর্তন (PHP 8.1 → PHP 8.3)" : "Switch PHP versions"}</li>
                    <li>{isBn ? "PHP এক্সটেনশন অন/অফ করা (curl, gd, openssl)" : "Toggle PHP extensions"}</li>
                    <li>{isBn ? "এক ক্লিকে Restart All Services করা" : "Restart All Services"}</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-indigo-400">
                    <MousePointer size={16} />
                    <span>{isBn ? "সবুজ W তে রাইট-ক্লিক (Right-Click):" : "RIGHT-CLICK on Green W Icon:"}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {isBn ? "WampServer সেটিংস ও শাটডাউন মেনু:" : "Settings & Configuration Menu:"}
                  </p>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>{isBn ? "WampServer ভাষা পরিবর্তন" : "Change Wamp language"}</li>
                    <li>{isBn ? "ভার্চুয়াল হোস্ট (Virtual Hosts) কনফিগার" : "Manage Virtual Hosts"}</li>
                    <li>{isBn ? "হেল্প ও ভার্সন ডিটেইলস দেখা" : "View Help & Version Info"}</li>
                    <li>{isBn ? "WampServer নিরাপদে বন্ধ (Exit) করা" : "Safely Exit / Quit WampServer"}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* STAGE 6: VERIFY LOCALHOST & PHPMYADMIN */}
            <div
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                checklist["check-step-6"]
                  ? "bg-slate-900/40 border-emerald-500/40"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleCheckItem("check-step-6")}
                  className="cursor-pointer"
                >
                  {checklist["check-step-6"] ? (
                    <CheckCircle2 size={24} className="text-emerald-400" />
                  ) : (
                    <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 font-bold text-sm flex items-center justify-center border border-sky-500/30">
                      06
                    </span>
                  )}
                </button>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isBn
                      ? "পর্যায় ৬: Localhost ও phpMyAdmin ব্রাউজারে যাচাই"
                      : "Stage 6: Verify Localhost & phpMyAdmin in Browser"}
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> ~2 mins
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <a
                  href="http://localhost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 transition-all space-y-2 block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-sky-400">{isBn ? "হোমপেজ" : "Homepage"}</span>
                    <ExternalLink size={13} className="text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-sm font-mono">http://localhost</h4>
                  <p className="text-xs text-slate-400">
                    {isBn ? "WampServer ড্যাশবোর্ড ও সক্রিয় PHP মডিউল প্রদর্শন করে।" : "Displays active PHP modules & projects."}
                  </p>
                </a>

                <a
                  href="http://localhost/phpmyadmin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 transition-all space-y-2 block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-amber-400">{isBn ? "ডেটাবেস ম্যানেজার" : "phpMyAdmin"}</span>
                    <ExternalLink size={13} className="text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-sm font-mono">http://localhost/phpmyadmin</h4>
                  <p className="text-xs text-slate-400">
                    {isBn ? "ইউজারনেম: root, পাসওয়ার্ড: ফাঁকা রাখুন।" : "Login: Username: root, Password: blank"}
                  </p>
                </a>

                <a
                  href="http://localhost/add_vhost.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-2 block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-indigo-400">{isBn ? "ভার্চুয়াল হোস্ট" : "Virtual Hosts"}</span>
                    <ExternalLink size={13} className="text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-sm font-mono">http://localhost/add_vhost.php</h4>
                  <p className="text-xs text-slate-400">
                    {isBn ? "কাস্টম লোকাল ডোমেইন যোগ করার জন্য।" : "Add custom local domains."}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CHAPTER 3: FIRST PHP PROJECT ================= */}
        <section id="first-project" className="scroll-mt-32 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
              <Code2 size={14} />
              <span>{t.firstProjTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.firstProjTitle}</h2>
            <p className="text-slate-400 text-sm mt-1">{t.firstProjSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Step A */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs font-bold font-mono">
                  {isBn ? "ধাপ ক" : "Step A"}
                </span>
                <span className="text-xs text-slate-400">{isBn ? "রুট ফোল্ডার" : "Root Directory"}</span>
              </div>
              <h4 className="font-bold text-white text-sm">{isBn ? "রুট ওয়েব ফোল্ডার ওপেন করুন" : "Open Root Directory"}</h4>
              <p className="text-xs text-slate-400">
                {isBn ? "আপনার সকল ওয়েবসাইট এই www ফোল্ডারে থাকবে:" : "Store your websites in the www directory:"}
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 font-mono text-xs text-sky-300">
                <FolderOpen size={16} className="text-sky-400 shrink-0" />
                <code>C:\wamp64\www\</code>
              </div>
            </div>

            {/* Step B */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-bold font-mono">
                  {isBn ? "ধাপ খ" : "Step B"}
                </span>
                <span className="text-xs text-slate-400">{isBn ? "প্রজেক্ট ফোল্ডার" : "Project Folder"}</span>
              </div>
              <h4 className="font-bold text-white text-sm">{isBn ? "নতুন প্রজেক্ট ফোল্ডার বানান" : "Create Project Folder"}</h4>
              <p className="text-xs text-slate-400">
                {isBn ? "myproject নামে একটি ফোল্ডার তৈরি করুন:" : "Create a folder named myproject:"}
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 font-mono text-xs text-amber-300">
                <FolderOpen size={16} className="text-amber-400 shrink-0" />
                <code>C:\wamp64\www\myproject\</code>
              </div>
            </div>

            {/* Step C */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-xs font-bold font-mono">
                  {isBn ? "ধাপ গ" : "Step C"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopySnippet(
                      "phpHello",
                      `<?php\n  echo "<h1>${
                        isBn ? "হ্যালো বাংলাদেশ / Hello World!" : "Hello, World!"
                      }</h1>";\n  echo "<p>WampServer 3.4.0 is working perfectly!</p>";\n  echo "<p>PHP Version: " . phpversion() . "</p>";\n?>`
                    )
                  }
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={12} />
                  <span>{copiedSnippets["phpHello"] ? "Copied!" : "Copy PHP"}</span>
                </button>
              </div>
              <h4 className="font-bold text-white text-sm">{isBn ? "index.php ফাইল তৈরি করুন" : "Create index.php"}</h4>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 leading-relaxed overflow-x-auto">
                <pre>
                  <code>{`<?php
  echo "<h1>${isBn ? "হ্যালো বাংলাদেশ / Hello World!" : "Hello, World!"}</h1>";
  echo "<p>WampServer 3.4.0 is working!</p>";
  echo "<p>PHP Version: " . phpversion() . "</p>";
?>`}</code>
                </pre>
              </div>
            </div>

            {/* Step D */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono">
                  {isBn ? "ধাপ ঘ" : "Step D"}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">{isBn ? "ব্রাউজারে রান" : "Run in Browser"}</span>
              </div>
              <h4 className="font-bold text-white text-sm">{isBn ? "ওয়েব ব্রাউজারে ওপেন করুন" : "Open in Web Browser"}</h4>
              <a
                href="http://localhost/myproject/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 flex items-center justify-between text-xs font-mono text-emerald-300 hover:bg-slate-900 transition-colors block"
              >
                <span>http://localhost/myproject/</span>
                <ExternalLink size={14} className="text-emerald-400" />
              </a>
              <p className="text-xs text-emerald-300/80 flex items-center gap-1.5 pt-1">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>{isBn ? "অভিনন্দন! আপনার লোকাল পিএইচপি ডেভেলপমেন্ট পরিবেশ প্রস্তুত!" : "Congratulations! Your local PHP stack is live!"}</span>
              </p>
            </div>
          </div>
        </section>

        {/* ================= CHAPTER 4: MYSQL ROOT PASSWORD & SECURITY ================= */}
        <section id="mysql-root-password" className="scroll-mt-32 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Key size={14} />
              <span>{t.rootPassTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.rootPassTitle}</h2>
            <p className="text-slate-400 text-sm mt-1">{t.rootPassSubtitle}</p>
          </div>

          {/* Credentials Status Cards (Default vs Target) */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Default State Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Unlock size={13} className="text-amber-400" />
                  {isBn ? "WAMP ডিফল্ট স্টেট" : "Default WAMP State"}
                </span>
                <span className="text-[11px] text-amber-400 font-mono font-semibold">
                  {isBn ? "পাসওয়ার্ড ফাঁকা (Empty)" : "Password is Blank"}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Username / ব্যবহারকারী:</span>
                  <code className="text-sky-300 font-bold">root</code>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Password / পাসওয়ার্ড:</span>
                  <span className="text-amber-300 italic font-mono">{isBn ? "'' (ফাঁকা / খালি)" : "'' (Blank / Empty)"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Host / হোস্ট:</span>
                  <code className="text-slate-300">localhost (127.0.0.1)</code>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Default Ports:</span>
                  <code className="text-slate-300">MySQL: 3306 | MariaDB: 3307</code>
                </div>
              </div>
            </div>

            {/* Target Secured State Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/30 border border-amber-500/40 space-y-3 relative overflow-hidden shadow-xl shadow-amber-500/5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Lock size={13} className="text-amber-400" />
                  {isBn ? "লক্ষ্য: আপডেট পাসওয়ার্ড" : "Target Secured State"}
                </span>
                <span className="text-[11px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  {isBn ? "পাসওয়ার্ড সেট" : "Password Set"}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-amber-500/20">
                  <span className="text-slate-300">Username / ব্যবহারকারী:</span>
                  <code className="text-sky-300 font-bold">root</code>
                </div>
                <div className="flex justify-between py-1 border-b border-amber-500/20">
                  <span className="text-slate-300">New Password / নতুন পাসওয়ার্ড:</span>
                  <code className="text-amber-300 font-extrabold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40 text-sm">
                    sukantahui
                  </code>
                </div>
                <div className="flex justify-between py-1 border-b border-amber-500/20">
                  <span className="text-slate-300">phpMyAdmin Login:</span>
                  <span className="text-emerald-300 font-semibold">{isBn ? "ইউজার: root, পাসওয়ার্ড: sukantahui" : "User: root, Pass: sukantahui"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-300">PHP Projects:</span>
                  <code className="text-emerald-300">mysqli_connect(..., "sukantahui", ...)</code>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Step Switcher Tabs */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-5">
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setRootPassTab("console")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  rootPassTab === "console"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Terminal size={14} />
                <span>{t.rootMethod1Tab}</span>
              </button>

              <button
                type="button"
                onClick={() => setRootPassTab("phpmyadmin")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  rootPassTab === "phpmyadmin"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Globe size={14} />
                <span>{t.rootMethod2Tab}</span>
              </button>

              <button
                type="button"
                onClick={() => setRootPassTab("config")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  rootPassTab === "config"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <FileCode size={14} />
                <span>{t.rootMethod3Tab}</span>
              </button>

              <button
                type="button"
                onClick={() => setRootPassTab("phpcode")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  rootPassTab === "phpcode"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Code2 size={14} />
                <span>{t.rootMethod4Tab}</span>
              </button>
            </div>

            {/* TAB CONTENT 1: CONSOLE */}
            {rootPassTab === "console" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                  <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {isBn
                      ? "পদ্ধতি ১ সবচেয়ে দ্রুত ও নিরাপদ। মাত্র ৩টি ধাপে MySQL কনসোল দিয়ে পাসওয়ার্ড সেট করুন:"
                      : "Method 1 is the fastest and most reliable method for local environments. Follow these 3 simple steps:"}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">1</span>
                    <h5 className="font-bold text-white text-xs">{isBn ? "MySQL Console ওপেন করুন" : "Open MySQL Console"}</h5>
                    <p className="text-[11px] text-slate-400">
                      {isBn
                        ? "টাস্কবারের সবুজ WAMP আইকনে লেফট-ক্লিক করুন → MySQL → MySQL Console এ ক্লিক করুন।"
                        : "Left-click the green WAMP tray icon → MySQL → MySQL Console."}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">2</span>
                    <h5 className="font-bold text-white text-xs">{isBn ? "Enter প্রেস করুন (খালি পাসওয়ার্ড)" : "Press Enter (Blank Password)"}</h5>
                    <p className="text-[11px] text-slate-400">
                      {isBn
                        ? "কালো উইন্ডোতে Enter password: এলে কোনো কিছু না লিখে সরাসরি কিবোর্ডে Enter চাপুন।"
                        : "When prompted with 'Enter password:', press Enter directly without typing anything."}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">3</span>
                    <h5 className="font-bold text-white text-xs">{isBn ? "SQL কমান্ড রান করুন" : "Execute SQL Commands"}</h5>
                    <p className="text-[11px] text-slate-400">
                      {isBn
                        ? "নিচের SQL কোডটি কপি করে কনসোলে পেস্ট করুন এবং Enter চাপুন।"
                        : "Copy the SQL snippet below, paste into the console, and press Enter."}
                    </p>
                  </div>
                </div>

                {/* Code Block with Copy */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 flex items-center gap-1.5">
                      <Terminal size={13} className="text-amber-400" />
                      <span>MySQL 8.0+ / 8.4+ / MariaDB Command:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopySnippet("sqlRootPass", mysqlRootPasswordGuide.sqlCommands)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedSnippets["sqlRootPass"] ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedSnippets["sqlRootPass"] ? (isBn ? "কপি হয়েছে!" : "Copied!") : (isBn ? "SQL কোড কপি করুন" : "Copy SQL Code")}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 font-mono text-xs text-amber-300 leading-relaxed overflow-x-auto shadow-inner">
                    <pre>
                      <code>{mysqlRootPasswordGuide.sqlCommands}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: PHPMYADMIN GUI */}
            {rootPassTab === "phpmyadmin" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 text-xs text-sky-200 flex items-start gap-2.5">
                  <Info size={16} className="text-sky-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {isBn
                      ? "ব্রাউজারের phpMyAdmin ইন্টারফেস থেকে গ্রাফিক্যাল উপায়ে পাসওয়ার্ড পরিবর্তন করতে নিচের ৬টি পদক্ষেপ সম্পন্ন করুন:"
                      : "Follow these 6 steps to change the root password visually through the phpMyAdmin browser interface:"}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-sky-400 font-mono">1. Open phpMyAdmin</div>
                    <p className="text-slate-300">
                      {isBn ? "ব্রাউজারে http://localhost/phpmyadmin ওপেন করুন।" : "Visit http://localhost/phpmyadmin in your browser."}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-sky-400 font-mono">2. Login as root</div>
                    <p className="text-slate-300">
                      {isBn ? "Username এ root দিন, Password খালি রাখুন, Go চাপুন।" : "Enter 'root' as username, leave password blank, click Go."}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-sky-400 font-mono">3. User Accounts Tab</div>
                    <p className="text-slate-300">
                      {isBn ? "শীর্ষ নেভিগেশন বার থেকে 'User Accounts' ট্যাবে ক্লিক করুন।" : "Click the 'User Accounts' tab at the top navigation bar."}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-sky-400 font-mono">4. Edit Privileges</div>
                    <p className="text-slate-300">
                      {isBn ? "root (localhost) এর ডানপাশে 'Edit privileges' বাটনে ক্লিক করুন।" : "Find user 'root' with host 'localhost' and click 'Edit privileges'."}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-sky-400 font-mono">5. Change Password</div>
                    <p className="text-slate-300">
                      {isBn ? "পৃষ্ঠার উপরে 'Change password' ট্যাবে ক্লিক করুন।" : "Click 'Change password' tab located near the top of the privilege page."}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-sky-400 font-mono">6. Enter sukantahui & Go</div>
                    <p className="text-slate-300">
                      {isBn ? "উভয় পাসওয়ার্ড বক্সে sukantahui লিখুন এবং 'Go' বাটনে ক্লিক করুন।" : "Enter 'sukantahui' in both password fields and click the 'Go' button."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: CONFIG.INC.PHP SYNC & STARTUP FLOW */}
            {rootPassTab === "config" && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2.5 shadow-sm">
                  <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h6 className="font-bold text-rose-300 text-sm">
                      {isBn
                        ? "কেন পাসওয়ার্ড বদলানোর পর phpMyAdmin খুলবে না এবং কীভাবে চালু করবেন?"
                        : "Why phpMyAdmin fails to open after password change & How to start it:"}
                    </h6>
                    <p className="leading-relaxed">
                      {isBn
                        ? "WAMP-এর ডিফল্ট সেটিংসে phpMyAdmin স্বয়ংক্রিয়ভাবে খালি পাসওয়ার্ড দিয়ে লগইন করার চেষ্টা করে। MySQL-এর পাসওয়ার্ড 'sukantahui' হয়ে যাওয়ার ফলে phpMyAdmin লাল এরর (Error #1045 Access Denied) প্রদর্শন করে। phpMyAdmin সঠিকভাবে চালু করতে নিচের ৪টি সহজ পর্যায় অনুসরণ করুন:"
                        : "By default, phpMyAdmin is configured to attempt auto-login with an empty password. Once you set MySQL root password to 'sukantahui', phpMyAdmin will show a red Error #1045 (Access Denied). Follow these 4 steps to start phpMyAdmin cleanly:"}
                    </p>
                  </div>
                </div>

                {/* 4-Step Visual Flow Cards */}
                <div className="space-y-3">
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <RotateCcw size={14} className="text-sky-400" />
                    <span>{isBn ? "phpMyAdmin পুনরায় চালু করার ৪টি সহজ ধাপ:" : "4-Step Flow to Start phpMyAdmin Cleanly:"}</span>
                  </h5>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {(isBn ? mysqlRootPasswordGuide.restartWampGuide.bn : mysqlRootPasswordGuide.restartWampGuide.en).map((item) => (
                      <div key={item.step} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative overflow-hidden group hover:border-sky-500/40 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-mono font-bold flex items-center justify-center text-xs">
                            {item.step}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">Step {item.step}</span>
                        </div>
                        <h6 className="font-bold text-white text-xs leading-snug">{item.title}</h6>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Path Indicator */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 font-mono text-xs text-sky-300">
                  <FolderOpen size={16} className="text-sky-400 shrink-0" />
                  <span className="text-slate-400">Target File:</span>
                  <code className="text-white font-bold">{mysqlRootPasswordGuide.configIncPath}</code>
                </div>

                {/* Two Configuration Approaches */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Option A: Auto-Login */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1">
                        <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono">Option A</span>
                        <span>Auto-Login with Password</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopySnippet("configAuto", mysqlRootPasswordGuide.configIncSnippet)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer"
                      >
                        {copiedSnippets["configAuto"] ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedSnippets["configAuto"] ? "Copied!" : "Copy Option A"}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isBn ? "phpMyAdmin এ সরাসরি 'sukantahui' পাসওয়ার্ড দিয়ে অটো-লগইন হবে।" : "Directly hardcodes 'sukantahui' password for silent auto-login."}
                    </p>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-sky-300 overflow-x-auto">
                      <pre><code>{mysqlRootPasswordGuide.configIncSnippet}</code></pre>
                    </div>
                  </div>

                  {/* Option B: Interactive Cookie Login */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-300 flex items-center gap-1">
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">Option B</span>
                        <span>Interactive Login Prompt (Recommended)</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopySnippet("configCookie", mysqlRootPasswordGuide.configIncCookieSnippet)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer"
                      >
                        {copiedSnippets["configCookie"] ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedSnippets["configCookie"] ? "Copied!" : "Copy Option B"}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isBn ? "ব্রাউজারে একটি সুন্দর লগইন পেজ আসবে যেখানে ইউজারনেম ও পাসওয়ার্ড লিখতে হবে।" : "Displays a secure browser login form asking for username & password."}
                    </p>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto">
                      <pre><code>{mysqlRootPasswordGuide.configIncCookieSnippet}</code></pre>
                    </div>
                  </div>
                </div>

                {/* Interactive phpMyAdmin Login Preview Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 size={14} />
                      <span>{isBn ? "phpMyAdmin লগইন স্ক্রিন প্রিভিউ ও ক্রেডেনশিয়াল:" : "phpMyAdmin Login Screen Preview & Credentials:"}</span>
                    </span>
                    <a
                      href="http://localhost/phpmyadmin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                    >
                      <span>http://localhost/phpmyadmin</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Server Choice:</span>
                      <code className="text-sky-300 font-bold">MySQL (Port 3306)</code>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Username:</span>
                      <code className="text-sky-300 font-bold">root</code>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Password:</span>
                      <code className="text-amber-300 font-extrabold">sukantahui</code>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <Info size={13} className="text-sky-400 shrink-0" />
                    <span>
                      {isBn
                        ? "টিপস: ব্রাউজারে পুরনো এরর ক্যাশ হয়ে থাকলে Ctrl + F5 চাপুন অথবা নতুন Incognito উইন্ডোতে ওপেন করুন।"
                        : "Pro Tip: If your browser still caches the old Error 1045 page, press Ctrl + F5 or open in an Incognito / Private window."}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: PHP CODE CONNECTIONS */}
            {rootPassTab === "phpcode" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 flex items-start gap-2.5">
                  <Code2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {isBn
                      ? "আপনার তৈরি করা PHP ফাইল থেকে নতুন 'sukantahui' পাসওয়ার্ড ব্যবহার করে ডেটাবেস সংযোগ করার দুটি স্ট্যান্ডার্ড কোড উদাহরণ:"
                      : "Here are modern, production-ready code examples to connect your PHP projects using your new 'sukantahui' password:"}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* MySQLi Code */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5 font-mono">
                        <span>1. MySQLi Connection</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopySnippet("phpMysqli", mysqlRootPasswordGuide.phpMysqliSnippet)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer"
                      >
                        {copiedSnippets["phpMysqli"] ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedSnippets["phpMysqli"] ? "Copied!" : "Copy MySQLi"}</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300 leading-relaxed overflow-x-auto h-72">
                      <pre>
                        <code>{mysqlRootPasswordGuide.phpMysqliSnippet}</code>
                      </pre>
                    </div>
                  </div>

                  {/* PDO Code */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5 font-mono">
                        <span>2. Modern PDO Connection</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopySnippet("phpPdo", mysqlRootPasswordGuide.phpPdoSnippet)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer"
                      >
                        {copiedSnippets["phpPdo"] ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedSnippets["phpPdo"] ? "Copied!" : "Copy PDO"}</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300 leading-relaxed overflow-x-auto h-72">
                      <pre>
                        <code>{mysqlRootPasswordGuide.phpPdoSnippet}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================= TROUBLESHOOTING MATRIX ================= */}
        <section id="troubleshooting" className="scroll-mt-32 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
              <AlertTriangle size={14} />
              <span>{t.troubleshootTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.troubleshootTitle}</h2>
            <p className="text-slate-400 text-sm mt-1">{t.troubleshootSubtitle}</p>
          </div>

          <div className="space-y-3">
            {/* Accordion 1: Missing DLL */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 font-bold text-sm text-white">
                  <AlertTriangle size={16} className="text-rose-400 shrink-0" />
                  <span>
                    {isBn
                      ? "ত্রুটি: MSVCR110.dll বা VCRUNTIME140.dll Missing দেখাচ্ছে"
                      : "Error: MSVCR110.dll or VCRUNTIME140.dll is missing"}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${
                    openAccordion === 1 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === 1 && (
                <div className="p-4 pt-0 text-xs text-slate-300 space-y-2 border-t border-slate-800/80 bg-slate-950/40">
                  <p>
                    {isBn
                      ? "কারণ: WampServer চালানোর আগেই প্রয়োজনীয় Visual C++ রানটাইম ইনস্টল করা হয়নি।"
                      : "Cause: Visual C++ Redistributable was not installed before running WAMP."}
                  </p>
                  <p className="text-emerald-400 font-semibold">
                    {isBn
                      ? "সমাধান: উপরের ম্যাট্রিক্স থেকে ৩২-বিট (x86) ও ৬৪-বিট (x64) উভয় প্যাকেজ ইনস্টল করে WAMP রিস্টার্ট করুন।"
                      : "Fix: Install BOTH x86 and x64 packages from the VC++ matrix above, then restart WampServer."}
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 2: Port 80 IIS Conflict */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 font-bold text-sm text-white">
                  <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                  <span>
                    {isBn
                      ? "ট্রে আইকন কমলা (Orange) হয়ে আছে / পোর্ট ৮০ তে উইন্ডোজ IIS দখল করে রেখেছে"
                      : "Tray Icon stays Orange / Port 80 occupied by Windows IIS"}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${
                    openAccordion === 2 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === 2 && (
                <div className="p-4 pt-0 text-xs text-slate-300 space-y-3 border-t border-slate-800/80 bg-slate-950/40">
                  <p>
                    {isBn
                      ? "PowerShell (Admin) এ নিচের কমান্ডগুলো দিয়ে IIS সার্ভিস বন্ধ করুন:"
                      : "Run these commands in PowerShell as Administrator to disable IIS:"}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-amber-300 space-y-1">
                    <div>Stop-Service W3SVC</div>
                    <div>Set-Service W3SVC -StartupType Disabled</div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: phpMyAdmin 403 */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 font-bold text-sm text-white">
                  <AlertTriangle size={16} className="text-sky-400 shrink-0" />
                  <span>
                    {isBn
                      ? "phpMyAdmin এ 403 Forbidden এরর দেখাচ্ছে"
                      : "phpMyAdmin gives '403 Forbidden' Error"}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${
                    openAccordion === 3 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === 3 && (
                <div className="p-4 pt-0 text-xs text-slate-300 space-y-2 border-t border-slate-800/80 bg-slate-950/40">
                  <p>
                    {isBn
                      ? "কনফিগারেশন ফাইল C:\\wamp64\\alias\\phpmyadmin.conf খুলে Require local নিশ্চিত করুন এবং Apache রিস্টার্ট করুন।"
                      : "Open C:\\wamp64\\alias\\phpmyadmin.conf, make sure 'Require local' is enabled, then restart Apache."}
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 4: MySQL Error #1045 Access Denied */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 4 ? null : 4)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 font-bold text-sm text-white">
                  <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                  <span>
                    {isBn
                      ? "MySQL / phpMyAdmin এ #1045 Access denied for user 'root'@'localhost'"
                      : "MySQL / phpMyAdmin shows '#1045 Access denied for user root@localhost'"}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${
                    openAccordion === 4 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === 4 && (
                <div className="p-4 pt-0 text-xs text-slate-300 space-y-3 border-t border-slate-800/80 bg-slate-950/40">
                  <p>
                    {isBn
                      ? "কারণ: MySQL root পাসওয়ার্ড 'sukantahui' করা হয়েছে কিন্তু phpMyAdmin-এর config.inc.php ফাইলে এখনও পাসওয়ার্ড খালি রয়ে গেছে।"
                      : "Cause: You changed the MySQL root password to 'sukantahui', but phpMyAdmin's config.inc.php still holds an empty password."}
                  </p>
                  <p className="text-emerald-400 font-semibold">
                    {isBn
                      ? "সমাধান: C:\\wamp64\\apps\\phpmyadmin...\\config.inc.php ফাইলটি খুলে $cfg['Servers'][$i]['password'] = 'sukantahui'; লিখে সেভ করুন।"
                      : "Fix: Open C:\\wamp64\\apps\\phpmyadmin...\\config.inc.php, set $cfg['Servers'][$i]['password'] = 'sukantahui'; and save."}
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 5: Safe Exit */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 5 ? null : 5)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 font-bold text-sm text-white">
                  <Info size={16} className="text-emerald-400 shrink-0" />
                  <span>
                    {isBn
                      ? "কীভাবে WampServer নিরাপদে বন্ধ (Exit) করবেন?"
                      : "How to properly exit / turn off WampServer?"}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${
                    openAccordion === 5 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === 5 && (
                <div className="p-4 pt-0 text-xs text-slate-300 space-y-2 border-t border-slate-800/80 bg-slate-950/40">
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>{isBn ? "WampServer ট্রে আইকনে Right-Click করুন।" : "Right-click the WampServer tray icon."}</li>
                    <li>{isBn ? "মেনুর একদম নিচের Exit বাটনে চাপুন।" : "Click Exit at the bottom of the menu."}</li>
                    <li>{isBn ? "WampServer ব্যাকগ্রাউন্ডের সব সার্ভিস নিরাপদে বন্ধ করে দেবে।" : "WampServer cleanly shuts down Apache and MySQL services."}</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="pt-10 border-t border-slate-800/80 space-y-6 text-slate-400 text-xs">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Server size={18} className="text-sky-400" />
                <span>WampServer 3.4.0 Setup Hub</span>
              </div>
              <p className="leading-relaxed">{t.footerDesc}</p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs">{t.footerDownloads}</h5>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="https://wampserver.aviatechno.net/files/install/wampserver3.4.0_x64.exe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                  >
                    <Download size={12} /> WampServer 3.4.0 (x64)
                  </a>
                </li>
                <li>
                  <a
                    href="https://wampserver.aviatechno.net/files/tools/check_vcredist.exe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                  >
                    <ShieldCheck size={12} /> check_vcredist.exe Tool
                  </a>
                </li>
                <li>
                  <a
                    href="https://wampserver.aviatechno.net/?lang=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                  >
                    <Globe size={12} /> Aviatechno Official Portal
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs">{t.footerDocs}</h5>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="https://httpd.apache.org/docs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Apache HTTP Server Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.php.net/docs.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors"
                  >
                    PHP Official Manual
                  </a>
                </li>
                <li>
                  <a
                    href="https://dev.mysql.com/doc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors"
                  >
                    MySQL Reference Manual
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>{t.footerCopyright}</div>
            <div>Coder &amp; AccoTax • Technical Education Division</div>
          </div>
        </footer>
      </div>

      {/* ================= CHECKLIST SLIDE-OVER DRAWER ================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-sky-400" />
                  <h3 className="font-bold text-white text-base">{t.drawerTitle}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Progress Summary Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">{t.drawerReadiness}</span>
                  <span className="text-sky-400 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500 text-right">
                  {completedCount} of {totalTasks} items completed
                </div>
              </div>

              {/* VC++ Items */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.drawerVcHeader}
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {vcPackages.map((pkg) => {
                    const isDone = !!checklist[pkg.id];
                    return (
                      <label
                        key={pkg.id}
                        className={`flex items-center gap-2.5 p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                          isDone
                            ? "bg-emerald-950/30 text-emerald-300"
                            : "bg-slate-950/60 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleCheckItem(pkg.id)}
                          className="rounded border-slate-700 text-sky-500 focus:ring-0"
                        />
                        <span className="truncate">
                          {pkg.name} ({pkg.arch})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Stage Milestones */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.drawerStepHeader}
                </h4>
                <div className="space-y-1.5">
                  {stepsList.map((step) => {
                    const isDone = !!checklist[step.id];
                    return (
                      <label
                        key={step.id}
                        className={`flex items-center gap-2.5 p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                          isDone
                            ? "bg-emerald-950/30 text-emerald-300"
                            : "bg-slate-950/60 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleCheckItem(step.id)}
                          className="rounded border-slate-700 text-sky-500 focus:ring-0"
                        />
                        <span className="truncate">
                          {isBn ? step.label_bn : step.label_en}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={resetAllChecklist}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                {t.drawerReset}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-sky-600/20 cursor-pointer"
              >
                <Printer size={13} />
                {t.drawerExport}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING SCROLL TOP BUTTON ================= */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-xl shadow-sky-500/25 transition-all transform hover:scale-110 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-sky-500/40 text-sky-200 text-xs sm:text-sm font-medium shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 flex items-center gap-2">
          <Info size={16} className="text-sky-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
