import React, { useState } from 'react';
import { 
  ArrowUpDown, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, RefreshCw, Shuffle
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const SortingVisualizer = () => {
  const [data, setData] = useState([88, 42, 95, 60, 75, 12]);
  const [isSorted, setIsSorted] = useState(false);

  const handleSort = () => {
    const sorted = [...data].sort((a, b) => a - b);
    setData(sorted);
    setIsSorted(true);
  };

  const handleShuffle = () => {
    const shuffled = [88, 42, 95, 60, 75, 12].sort(() => Math.random() - 0.5);
    setData(shuffled);
    setIsSorted(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <ArrowUpDown className="w-3.5 h-3.5" /> In-Place Sorting Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Sorting Arrays via <code className="text-emerald-400 font-mono">Arrays.sort()</code>
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleSort}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950"
          >
            <ArrowUpDown className="w-3.5 h-3.5" /> Execute `Arrays.sort()`
          </button>
          <button
            onClick={handleShuffle}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2 px-3 rounded-xl transition flex items-center gap-1 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" /> Shuffle
          </button>
        </div>
      </div>

      {/* Array Element Blocks */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Array State: <strong className={isSorted ? "text-emerald-400" : "text-amber-400"}>{isSorted ? "Ascending Sorted" : "Unsorted"}</strong></span>
          <span className="font-mono">Length: {data.length}</span>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {data.map((val, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center transition ${
                isSorted
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-500 block mb-1">Index [{idx}]</span>
              <span className="text-xl font-black font-mono">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code & Logic */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Java Sorting Execution Code:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`import java.util.Arrays;

int[] marks = { ${data.join(", ")} };
Arrays.sort(marks); // Sorts array in-place into ascending order!

// Resulting elements:
// [${data.join(", ")}]`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
              Ascending Order Guarantee:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              `Arrays.sort()` rearranges elements in natural ascending sequence ($O(N \log N)$ average time). Once sorted, array elements are ready for lightning-fast Binary Search operations.
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400">
            💡 Minimum element is now at <code className="text-white font-mono">marks[0]</code>, and maximum element is at <code className="text-white font-mono">marks[marks.length - 1]</code>.
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_002 • Topic 5
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Sorting Arrays using <code className="text-emerald-400 font-mono">Arrays.sort(array)</code> in Ascending Order
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand in-place ascending sorting of numeric and string arrays using the <code className="text-emerald-400 font-mono">Arrays.sort()</code> static utility method.
          </p>
        </div>

        {/* Visualizer */}
        <SortingVisualizer />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Arrays.sort() Method"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Arrays.sort() Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Note (.txt)"
          downloadFileName="004_002_topic5_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Remember: `Arrays.sort()` sorts in ASCENDING order by default. After sorting, the minimum value is always at index 0, and the maximum value is at index `length - 1`! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic5;
