import React, { useState } from 'react';
import { 
  Ruler, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, Hash
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const StringLengthStudio = () => {
  const [text, setText] = useState("Information Technology");

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Ruler className="w-3.5 h-3.5" /> Character Meter & Index Range Explorer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            String Character Count via <code className="text-emerald-400 font-mono">str.length()</code>
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `int len = str.length();`
        </div>
      </div>

      {/* Input */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Type custom text to evaluate length:
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-slate-900 text-white font-mono text-sm px-4 py-2.5 rounded-xl border border-slate-700"
        />
      </div>

      {/* Metrics Card */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Length (`str.length()`):</span>
          <div className="text-3xl font-black text-emerald-400 font-mono">{text.length}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">First Index:</span>
          <div className="text-3xl font-black text-sky-400 font-mono">{text.length > 0 ? 0 : 'N/A'}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">Last Index (`length - 1`):</span>
          <div className="text-3xl font-black text-amber-400 font-mono">{text.length > 0 ? text.length - 1 : 'N/A'}</div>
        </div>
      </div>

      {/* Code & Examination Trap */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Java Execution Statement:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`String str = "${text}";
int totalCharacters = str.length();

System.out.println("Total Length: " + totalCharacters); // Prints ${text.length}`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-xs space-y-1">
            <strong className="block font-bold">Array vs String Comparison:</strong>
            <ul className="space-y-1 text-[11px] leading-relaxed font-mono">
              <li>• Array: <span className="text-white">arr.length</span> (No parentheses)</li>
              <li>• String: <span className="text-white">str.length()</span> (With parentheses)</li>
            </ul>
          </div>

          <div className="text-[11px] text-slate-400">
            For "Information Technology": 11 letters + 1 space + 10 letters = <strong>22 characters</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic4 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_003 • Topic 4
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Finding String Length: <code className="text-emerald-400 font-mono">str.length()</code>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master total character counting with <code className="text-emerald-400 font-mono">str.length()</code>, count spaces accurately, and distinguish array length from String length().
          </p>
        </div>

        {/* Studio */}
        <StringLengthStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • String length() Method"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – String length() Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note (.txt)"
          downloadFileName="004_003_topic4_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Never forget to count the SPACE character when calculating string lengths! In 'Information Technology', there is a space between the words, giving a total of 11 + 1 + 10 = 22 characters. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic4;
