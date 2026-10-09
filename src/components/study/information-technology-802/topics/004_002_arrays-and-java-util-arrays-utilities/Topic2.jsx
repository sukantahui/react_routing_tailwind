import React, { useState } from 'react';
import { 
  Calculator, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, Hash
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const ArrayArithmeticWorkbench = () => {
  const array = [12, 18, 25, 30, 42, 55];
  const [idxA, setIdxA] = useState(5);
  const [idxB, setIdxB] = useState(0);
  const [op, setOp] = useState('-');

  const valA = array[idxA];
  const valB = array[idxB];
  
  let result = 0;
  if (op === '+') result = valA + valB;
  else if (op === '-') result = valA - valB;
  else if (op === '*') result = valA * valB;
  else if (op === '/') result = valB !== 0 ? Math.floor(valA / valB) : 'Division by zero';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Calculator className="w-3.5 h-3.5" /> Arithmetic Expression Calculator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Evaluating Array Arithmetic: `array[idxA] {op} array[idxB]`
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `int[] a = &#123;12, 18, 25, 30, 42, 55&#125;;`
        </div>
      </div>

      {/* Array Display */}
      <div className="grid grid-cols-6 gap-2 mb-6">
        {array.map((val, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl border text-center transition ${
              idx === idxA && idx === idxB
                ? 'bg-purple-500/20 border-purple-500 text-white'
                : idx === idxA
                ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                : idx === idxB
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-950/70 border-slate-800 text-slate-400'
            }`}
          >
            <div className="text-[10px] font-mono text-slate-500">a[{idx}]</div>
            <div className="text-base sm:text-lg font-bold font-mono">{val}</div>
          </div>
        ))}
      </div>

      {/* Operator & Index Selectors */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
            First Index (`idxA`):
          </label>
          <select
            value={idxA}
            onChange={(e) => setIdxA(Number(e.target.value))}
            className="w-full bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
          >
            {array.map((_, i) => (
              <option key={i} value={i}>Index [{i}] (Value: {array[i]})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">
            Arithmetic Operator:
          </label>
          <div className="flex gap-1.5">
            {['+', '-', '*', '/'].map(symbol => (
              <button
                key={symbol}
                onClick={() => setOp(symbol)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                  op === symbol
                    ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-950'
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
            Second Index (`idxB`):
          </label>
          <select
            value={idxB}
            onChange={(e) => setIdxB(Number(e.target.value))}
            className="w-full bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
          >
            {array.map((_, i) => (
              <option key={i} value={i}>Index [{i}] (Value: {array[i]})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Code & Evaluation Result */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Evaluated Java Statement:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`int result = a[${idxA}] ${op} a[${idxB}];
// Substitution:
// result = ${valA} ${op} ${valB};
System.out.println("Output: " + result); // Prints ${result}`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">
              Expression Output:
            </span>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-center space-y-1">
              <span className="text-slate-400 text-xs">Final Computed Value:</span>
              <div className="text-3xl font-black text-purple-400">{result}</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            CBSE Favorite: <code className="text-white font-mono font-bold">a[5] - a[0] = 55 - 12 = 43</code>.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_002 • Topic 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Accessing Array Elements via 0-Based Indexing & Arithmetic Operations
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Practice exact output calculations for array element lookups, arithmetic difference expressions, and index increment evaluations tested in CBSE IT 802 examinations.
          </p>
        </div>

        {/* Workbench */}
        <ArrayArithmeticWorkbench />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Array Indexing Arithmetic"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Array Arithmetic Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Note (.txt)"
          downloadFileName="004_002_topic2_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In array output questions (like `a[5] - a[0]`), always write down the 0-based index numbers directly above the array elements on your question paper before calculating! This prevents off-by-one errors. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic2;
