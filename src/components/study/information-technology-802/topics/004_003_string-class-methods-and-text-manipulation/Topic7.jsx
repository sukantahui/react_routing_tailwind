import React, { useState } from 'react';
import { 
  GitCompare, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

const StringComparisonStudio = () => {
  const [s1Mode, setS1Mode] = useState('literal'); // 'literal', 'new'
  const [s2Mode, setS2Mode] = useState('new'); // 'literal', 'new'
  const [caseMatch, setCaseMatch] = useState('match'); // 'match', 'different'

  const text1 = "Java";
  const text2 = caseMatch === 'match' ? "Java" : "java";

  // Comparison evaluations
  const isRefEqual = s1Mode === 'literal' && s2Mode === 'literal' && caseMatch === 'match';
  const isEqual = text1 === text2;
  const isIgnoreCase = text1.toLowerCase() === text2.toLowerCase();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <GitCompare className="w-3.5 h-3.5" /> Reference vs Content Equality Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            String Comparison: `==` vs `.equals()` vs `.equalsIgnoreCase()`
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          Memory Pointer vs Character Content
        </div>
      </div>

      {/* Selectors */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            String 1 Creation:
          </label>
          <div className="flex gap-2">
            {['literal', 'new'].map(m => (
              <button
                key={m}
                onClick={() => setS1Mode(m)}
                className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                  s1Mode === m ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {m === 'literal' ? '"Java"' : 'new String("Java")'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            String 2 Creation:
          </label>
          <div className="flex gap-2">
            {['literal', 'new'].map(m => (
              <button
                key={m}
                onClick={() => setS2Mode(m)}
                className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                  s2Mode === m ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {m === 'literal' ? `"${text2}"` : `new String("${text2}")`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Casing Match:
          </label>
          <div className="flex gap-2">
            {[
              { id: 'match', label: 'Same Case ("Java")' },
              { id: 'diff', label: 'Diff Case ("java")' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setCaseMatch(c.id)}
                className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  caseMatch === c.id ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Code & 3-Way Test Matrix */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Generated Java Setup Code:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`String s1 = ${s1Mode === 'literal' ? '"Java";' : 'new String("Java");'}
String s2 = ${s2Mode === 'literal' ? `"${text2}";` : `new String("${text2}");`}

// 1. Reference equality (==)
System.out.println(s1 == s2); // Output: ${isRefEqual}

// 2. Content equality (.equals)
System.out.println(s1.equals(s2)); // Output: ${isEqual}

// 3. Case-insensitive equality (.equalsIgnoreCase)
System.out.println(s1.equalsIgnoreCase(s2)); // Output: ${isIgnoreCase}`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Comparison Diagnostic Results:
            </span>

            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
              isRefEqual ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <span>s1 == s2 (Reference):</span>
              <strong className="text-sm font-bold">{isRefEqual ? "TRUE" : "FALSE"}</strong>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
              isEqual ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <span>s1.equals(s2) (Content):</span>
              <strong className="text-sm font-bold">{isEqual ? "TRUE" : "FALSE"}</strong>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
              isIgnoreCase ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <span>s1.equalsIgnoreCase(s2):</span>
              <strong className="text-sm font-bold">{isIgnoreCase ? "TRUE" : "FALSE"}</strong>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            Never use `==` to verify passwords or user entries; always use `.equals()`.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic7 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_003 • Topic 7
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            String Comparison: <code className="text-sky-400 font-mono">==</code> vs <code className="text-emerald-400 font-mono">.equals()</code> vs <code className="text-purple-400 font-mono">.equalsIgnoreCase()</code>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand the distinction between memory reference equality and character sequence value equality in Java String comparisons.
          </p>
        </div>

        {/* Studio */}
        <StringComparisonStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • String Equality"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – String Comparison Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 7 Note (.txt)"
          downloadFileName="004_003_topic7_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In Java, `s1 == s2` checks if both variables hold the same memory address, while `s1.equals(s2)` checks if they contain the same characters. In board exam MCQs with `new String()`, remember that `==` evaluates to false while `.equals()` evaluates to true! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic7;
