import React, { useState } from 'react';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, Ban
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const BoundsCheckerSimulator = () => {
  const [testIndex, setTestIndex] = useState(5);
  const arrayLength = 5;

  const isValid = testIndex >= 0 && testIndex < arrayLength;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Runtime Boundary Verification Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Detecting `ArrayIndexOutOfBoundsException`
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          Array Capacity = 5 (Indices: 0..4)
        </div>
      </div>

      {/* Index Slider */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
          <label className="font-bold text-slate-200 uppercase tracking-wider">
            Attempted Target Index: <span className={`font-mono text-sm font-bold ${isValid ? 'text-emerald-400' : 'text-rose-400'}`}>{testIndex}</span>
          </label>
          <span>Valid Bounds: <strong className="text-emerald-400 font-mono">0 to 4</strong></span>
        </div>
        <input
          type="range"
          min="-2"
          max="8"
          value={testIndex}
          onChange={(e) => setTestIndex(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span className="text-rose-400 font-bold">-2 (Invalid)</span>
          <span className="text-emerald-400 font-bold">0 (Valid)</span>
          <span className="text-emerald-400 font-bold">4 (Max Valid)</span>
          <span className="text-rose-400 font-bold">5 (Length/Invalid)</span>
          <span className="text-rose-400 font-bold">8 (Invalid)</span>
        </div>
      </div>

      {/* Code & Exception Status */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Executing Java Statement:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`int[] scores = new int[5]; // Valid: scores[0] to scores[4]

// Accessing index ${testIndex}:
int value = scores[${testIndex}];`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            isValid
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {isValid ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Ban className="w-4 h-4 text-rose-400" />}
              <span>{isValid ? "Valid Access (Within Bounds)" : "Exception Thrown at Runtime"}</span>
            </div>
            <p className="text-[11px] leading-relaxed font-mono">
              {isValid 
                ? `Index ${testIndex} is safely inside [0, 4]. Returns scores[${testIndex}].`
                : `Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index ${testIndex} out of bounds for length 5`}
            </p>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            💡 In loops, always write <code className="text-emerald-400 font-mono">i &lt; arr.length</code> instead of <code className="text-rose-400 font-mono">i &lt;= arr.length</code>.
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_002 • Topic 3
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Array Bounds Checking & <code className="text-rose-400 font-mono">ArrayIndexOutOfBoundsException</code>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand how Java prevents memory buffer overruns through runtime bounds checking, and learn how to avoid off-by-one errors in loop terminations.
          </p>
        </div>

        {/* Simulator */}
        <BoundsCheckerSimulator />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • ArrayIndexOutOfBoundsException"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Array Bounds Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Note (.txt)"
          downloadFileName="004_002_topic3_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Whenever you see a for-loop iterating over an array in the question paper, look closely at the condition! If it says `i <= arr.length` instead of `i < arr.length`, the program will crash on the last iteration with an `ArrayIndexOutOfBoundsException`. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic3;
