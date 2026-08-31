/* eslint-disable react-refresh/only-export-components */
"use client";

import React, { useEffect } from "react";
import { Globe, Sparkles } from "lucide-react";

export const LANGUAGE_STORAGE_KEY = "tally_001_002_lang";

export function useTopicLanguage() {
  const [language, setLanguage] = React.useState(() => {
    try {
      return localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail && (e.detail === "en" || e.detail === "bn")) {
        setLanguage(e.detail);
      }
    };
    window.addEventListener("tally_lang_change", handleSync);
    return () => window.removeEventListener("tally_lang_change", handleSync);
  }, []);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      window.dispatchEvent(new CustomEvent("tally_lang_change", { detail: newLang }));
    } catch (err) {
      console.warn("Could not save language preference:", err);
    }
  };

  return { language, setLanguage: changeLanguage, isBengali: language === "bn" };
}

export default function LanguageToggle({ language, onLanguageChange }) {
  const isBn = language === "bn";

  return (
    <div className="w-full max-w-5xl mx-auto mb-8">
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Language Indicator Info */}
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Globe className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Bilingual Learning Hub · দ্বিভাষিক শিক্ষা
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                <Sparkles className="w-2.5 h-2.5" />
                English Terms Kept Intact
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {isBn
                ? "বাংলায় সহজ ব্যাখ্যা এবং ইংরেজি টেকনিক্যাল টার্মের সমন্বয় (Default: English)"
                : "Switch to Bengali for natural conceptual explanations with standard English accounting terms"}
            </p>
          </div>
        </div>

        {/* Right: Segmented Switcher Controls */}
        <div className="inline-flex p-1 rounded-xl bg-slate-950/80 border border-slate-800/80 shrink-0 shadow-inner">
          <button
            type="button"
            onClick={() => onLanguageChange("en")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              !isBn
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20 scale-[1.02]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <span>🇬🇧</span>
            <span>English (Default)</span>
          </button>

          <button
            type="button"
            onClick={() => onLanguageChange("bn")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              isBn
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20 scale-[1.02]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <span>🇧🇳</span>
            <span>বাংলা (Bengali)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
