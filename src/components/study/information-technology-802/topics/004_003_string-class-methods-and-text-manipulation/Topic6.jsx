import React, { useState } from 'react';
import { 
  Scissors, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, Sliders
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const SubstringSlicerStudio = () => {
  const sample = "Information";
  const [startIdx, setStartIdx] = useState(3);
  const [endIdx, setEndIdx] = useState(7);

  const safeStart = Math.min(startIdx, endIdx);
  const safeEnd = Math.max(startIdx, endIdx);
  const extracted = sample.substring(safeStart, safeEnd);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Scissors className="w-3.5 h-3.5" /> Substring Slice Workbench
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Substring Extraction: `str.substring(start, end)`
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `str = "Information"`
        </div>
      </div>

      {/* Ribbon with indices */}
      <div className="space-y-2 mb-6">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Visual Character Slices (Green = Included, Gray = Excluded):
        </label>
        <div className="grid grid-cols-11 gap-1.5">
          {sample.split("").map((ch, idx) => {
            const isIncluded = idx >= safeStart && idx < safeEnd;
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center transition ${
                  isIncluded
                    ? 'bg-purple-500/20 border-purple-500 text-white font-bold shadow-md shadow-purple-950/40'
                    : 'bg-slate-950/70 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-500">{idx}</div>
                <div className="text-base font-bold font-mono">{ch}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sliders */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <label className="font-bold text-slate-200">Start Index (Inclusive):</label>
            <span className="font-mono text-purple-400 font-bold text-sm">{safeStart}</span>
          </div>
          <input
            type="range"
            min="0"
            max="11"
            value={safeStart}
            onChange={(e) => setStartIdx(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <label className="font-bold text-slate-200">End Index (Exclusive):</label>
            <span className="font-mono text-sky-400 font-bold text-sm">{safeEnd}</span>
          </div>
          <input
            type="range"
            min="0"
            max="11"
            value={safeEnd}
            onChange={(e) => setEndIdx(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
        </div>
      </div>

      {/* Code & Result */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Java Statement & Result:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`String s = "Information";
String sub = s.substring(${safeStart}, ${safeEnd});

System.out.println(sub); // Prints "${extracted}"`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">
              Extracted Slice:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-center space-y-1">
              <span className="text-slate-400 text-xs">Output String:</span>
              <div className="text-2xl font-black text-purple-300">"{extracted}"</div>
              <span className="text-[10px] text-slate-500">Extracted {safeEnd - safeStart} characters</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            Rule: The character at <code className="text-amber-400 font-mono">endIndex ({safeEnd})</code> is NOT included!
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic6 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_003 • Topic 6
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Substring Extraction: <code className="text-purple-400 font-mono">str.substring()</code>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand how Java slices strings, master the inclusive-start and exclusive-end rule, and solve CBSE board exam substring tracing questions.
          </p>
        </div>

        {/* Studio */}
        <SubstringSlicerStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • String substring() Method"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Substring Extraction Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 6 Note (.txt)"
          downloadFileName="004_003_topic6_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="The most common mistake in `substring(start, end)` is including the character at `end`! Always remember: `substring(3, 7)` takes indices 3, 4, 5, 6 (a total of 7 - 3 = 4 characters) and STOP before 7! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic6;
