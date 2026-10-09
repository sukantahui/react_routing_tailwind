import React, { useState } from 'react';
import { 
  Search, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, Calculator
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const BinarySearchStudio = () => {
  const sortedArray = [10, 20, 30, 40, 50, 60, 70];
  const [searchKey, setSearchKey] = useState(30);

  // Compute binarySearch
  const exactIndex = sortedArray.indexOf(searchKey);
  let result = exactIndex;
  let insertionPoint = 0;

  if (exactIndex === -1) {
    // calculate insertion point
    let idx = 0;
    while (idx < sortedArray.length && sortedArray[idx] < searchKey) {
      idx++;
    }
    insertionPoint = idx;
    result = -insertionPoint - 1;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Search className="w-3.5 h-3.5" /> Binary Search & Insertion Point Explorer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Predicting <code className="text-sky-400 font-mono">Arrays.binarySearch()</code> Return Values
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `int idx = Arrays.binarySearch(a, key);`
        </div>
      </div>

      {/* Target Key Input */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Search Target Key:
          </label>
          <input
            type="number"
            value={searchKey}
            onChange={(e) => setSearchKey(Number(e.target.value))}
            className="w-28 bg-slate-900 text-sky-300 font-mono text-base font-bold px-3 py-1.5 rounded-xl border border-slate-700 text-center"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {[10, 25, 30, 45, 70, 85].map(v => (
            <button
              key={v}
              onClick={() => setSearchKey(v)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                searchKey === v
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              key={v}
            </button>
          ))}
        </div>
      </div>

      {/* Array Elements Graphic */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {sortedArray.map((val, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl border text-center transition ${
              val === searchKey
                ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-950/70 border-slate-800 text-slate-400'
            }`}
          >
            <div className="text-[10px] font-mono text-slate-500">[{idx}]</div>
            <div className="text-base font-bold font-mono text-slate-200">{val}</div>
          </div>
        ))}
      </div>

      {/* Code & Return Value Calculation */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Java Binary Search Statement:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`import java.util.Arrays;

int[] a = { 10, 20, 30, 40, 50, 60, 70 };
int key = ${searchKey};

int result = Arrays.binarySearch(a, key);
// Result: ${result}`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
            exactIndex !== -1
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              <Calculator className="w-4 h-4" />
              <span>Return Value: <strong className="font-mono text-lg">{result}</strong></span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {exactIndex !== -1
                ? `Key ${searchKey} is found at index ${exactIndex}.`
                : `Key ${searchKey} not found. Insertion point = ${insertionPoint}. Formula: -(${insertionPoint}) - 1 = ${result}.`}
            </p>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            CBSE Golden Formula: <code className="text-amber-400 font-mono font-bold">return = -insertion_point - 1</code>.
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_002 • Topic 6
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Binary Search using <code className="text-sky-400 font-mono">Arrays.binarySearch(array, key)</code>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master the logarithmic binary search algorithm in Java, explore return values for found vs missing keys, and calculate negative insertion points accurately.
          </p>
        </div>

        {/* Studio */}
        <BinarySearchStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Arrays.binarySearch() Method"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Binary Search Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 6 Note (.txt)"
          downloadFileName="004_002_topic6_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In CBSE board exams, when a search key is NOT found, remember the exact formula: `-(insertion_point) - 1`. If an element belongs at index 2, the return value is -3. If it belongs at index 0, the return value is -1! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic6;
