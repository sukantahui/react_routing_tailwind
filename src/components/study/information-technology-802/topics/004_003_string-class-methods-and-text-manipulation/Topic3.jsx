import React, { useState } from 'react';
import { 
  Crosshair, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, Search
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const IndexOfVisualizer = () => {
  const sample = "Information Technology";
  const [query, setQuery] = useState("o");

  const foundIndex = sample.indexOf(query);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Crosshair className="w-3.5 h-3.5" /> Character Index Finder
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Finding Character Positions with <code className="text-sky-400 font-mono">str.indexOf()</code>
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `str = "Information Technology"`
        </div>
      </div>

      {/* Target query input */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Search Character / Substring:
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-32 bg-slate-900 text-sky-300 font-mono text-base font-bold px-3 py-1.5 rounded-xl border border-slate-700 text-center"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {['I', 'o', 'T', 'Tech', 'z', ' '].map(q => (
            <button
              key={q}
              onClick={() => setQuery(q)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                query === q
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              '{q}'
            </button>
          ))}
        </div>
      </div>

      {/* Character Ribbon with Indices */}
      <div className="space-y-1 mb-6 overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-[600px]">
          {sample.split("").map((ch, idx) => {
            const isMatch = foundIndex !== -1 && idx >= foundIndex && idx < foundIndex + query.length;
            return (
              <div
                key={idx}
                className={`flex-1 p-2 rounded-xl border text-center transition ${
                  isMatch
                    ? 'bg-sky-500/20 border-sky-500 text-white font-bold'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-[9px] font-mono text-slate-500">{idx}</div>
                <div className="text-xs sm:text-sm font-mono">{ch === ' ' ? '␣' : ch}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code & Result */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Evaluated Java Statement:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`String str = "Information Technology";
int index = str.indexOf("${query}");

System.out.println(index); // Prints ${foundIndex}`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className={`p-4 rounded-xl border text-xs space-y-1 ${
            foundIndex !== -1
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <span className="font-bold text-sm block">
              {foundIndex !== -1 ? `First match at index ${foundIndex}` : "Target not found (-1)"}
            </span>
            <p className="text-[11px] leading-relaxed opacity-90">
              {foundIndex !== -1
                ? `The 0-based first occurrence of "${query}" begins at index ${foundIndex}.`
                : `Character sequence "${query}" is absent from the string, so indexOf() returns -1.`}
            </p>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            CBSE Golden Rule: <code className="text-white font-mono font-bold">str.indexOf('o') = 3</code> (First occurrence!).
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic3 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_003 • Topic 3
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Finding Character / Substring Positions: <code className="text-sky-400 font-mono">str.indexOf()</code>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master 0-based position lookups with <code className="text-sky-400 font-mono">str.indexOf()</code>, understand first-occurrence matching, and handle -1 return values for missing characters.
          </p>
        </div>

        {/* Studio */}
        <IndexOfVisualizer />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • String indexOf() Method"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – String indexOf() Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Note (.txt)"
          downloadFileName="004_003_topic3_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Remember: `str.indexOf('o')` always finds the FIRST occurrence from the left (index 3 in 'Information Technology'). If you are asked what it returns when a character does NOT exist, the answer is ALWAYS `-1`. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic3;
