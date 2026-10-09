import React, { useState } from 'react';
import { 
  CaseSensitive, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, Type
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const CaseConversionStudio = () => {
  const [inputText, setInputText] = useState("Information Technology 802");
  const [activeCase, setActiveCase] = useState('upper'); // 'upper', 'lower'

  const converted = activeCase === 'upper' ? inputText.toUpperCase() : inputText.toLowerCase();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <CaseSensitive className="w-3.5 h-3.5" /> Character Case Transformer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Case Conversion: `toUpperCase()` & `toLowerCase()`
          </h2>
        </div>
        
        <div className="flex gap-2">
          {['upper', 'lower'].map(c => (
            <button
              key={c}
              onClick={() => setActiveCase(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer font-mono ${
                activeCase === c
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-950'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {c === 'upper' ? 'toUpperCase()' : 'toLowerCase()'}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Type custom text to transform:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full bg-slate-900 text-white font-mono text-sm px-4 py-2.5 rounded-xl border border-slate-700"
        />
      </div>

      {/* Code & Result */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Generated Java Statement:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`String str = "${inputText}";
String result = str.${activeCase === 'upper' ? 'toUpperCase()' : 'toLowerCase()'};

System.out.println(result); // Prints "${converted}"`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-2">
              Converted Output String:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-sky-300 font-bold">
              "{converted}"
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            Non-alphabetic characters (digits 8, 0, 2 and spaces) remain untouched.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic5 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_003 • Topic 5
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Case Conversion: <code className="text-sky-400 font-mono">str.toUpperCase()</code> and <code className="text-emerald-400 font-mono">str.toLowerCase()</code>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master uppercase and lowercase character transformations, understand how non-alphabetic symbols are preserved, and apply case conversion in search comparisons.
          </p>
        </div>

        {/* Studio */}
        <CaseConversionStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Case Conversion Methods"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Case Conversion Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Note (.txt)"
          downloadFileName="004_003_topic5_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Remember: `toUpperCase()` and `toLowerCase()` return a completely NEW string. If you want to change the variable permanently, you must assign it back: `str = str.toUpperCase();`. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic5;
