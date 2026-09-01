"use client";
import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

function renderFormattedText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function FAQTemplate({ title = "Frequently Asked Questions & Assessment", questions = [] }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-6 font-sans">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <HelpCircle size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-xs text-slate-400">Self-assessment questions &amp; technical diagnostic practice</p>
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isOpen = openId === q.id;
          return (
            <div
              key={q.id || idx}
              className="rounded-xl border border-slate-800 bg-slate-950/70 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggle(q.id)}
                className="w-full p-4 text-left flex items-start justify-between gap-4 text-slate-200 hover:text-white hover:bg-slate-900/50 transition-colors"
              >
                <span className="text-sm font-semibold leading-relaxed flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">Q{idx + 1}.</span>
                  <span>{renderFormattedText(q.question)}</span>
                </span>
                <span className="shrink-0 text-slate-400 mt-0.5">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {isOpen && (
                <div className="p-4 pt-0 border-t border-slate-800/60 bg-slate-900/40 space-y-3 text-xs sm:text-sm">
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {q.options.map((opt, oIdx) => {
                        const isAnswer = opt === q.answer;
                        return (
                          <div
                            key={oIdx}
                            className={
                              isAnswer
                                ? "p-2.5 rounded-lg border text-xs flex items-center justify-between bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold"
                                : "p-2.5 rounded-lg border text-xs flex items-center justify-between bg-slate-950 border-slate-800/80 text-slate-400"
                            }
                          >
                            <span>{renderFormattedText(opt)}</span>
                            {isAnswer && <CheckCircle2 size={14} className="text-emerald-400 shrink-0 ml-2" />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.explanation && (
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-slate-300 text-xs leading-relaxed space-y-1">
                      <div className="font-bold text-sky-400 text-[11px] uppercase tracking-wider">Detailed Technical Explanation:</div>
                      <p>{renderFormattedText(q.explanation)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
