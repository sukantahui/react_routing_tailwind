import React, { useState } from 'react';
import { 
  Layers, HardDrive, Cpu, Sparkles, CheckCircle2, 
  AlertTriangle, HelpCircle, BookOpen, ArrowRight, 
  ShieldCheck, Terminal, Code, Zap, Hash
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const ContiguousMemoryVisualizer = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const elements = [
    { idx: 0, val: 93.0, address: "0x4000" },
    { idx: 1, val: 87.5, address: "0x4008" },
    { idx: 2, val: 97.5, address: "0x4010" },
    { idx: 3, val: 65.0, address: "0x4018" },
    { idx: 4, val: 70.0, address: "0x4020" }
  ];

  const curr = elements[selectedIndex];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <HardDrive className="w-3.5 h-3.5" /> 1D Contiguous Memory Visualizer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Contiguous Memory Layout & 0-Based Indexing
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `double[] Marks = &#123;93.0, 87.5, 97.5, 65.0, 70.0&#125;;`
        </div>
      </div>

      {/* Interactive Array Ribbon */}
      <div className="space-y-3 mb-6">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Click an element block to inspect memory and index offset:
        </label>
        
        <div className="grid grid-cols-5 gap-2">
          {elements.map((el) => (
            <button
              key={el.idx}
              onClick={() => setSelectedIndex(el.idx)}
              className={`p-4 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-between ${
                selectedIndex === el.idx
                  ? 'bg-sky-500/20 border-sky-500 text-white shadow-lg shadow-sky-950/50'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-900'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-500 mb-1">Index [{el.idx}]</span>
              <span className="text-lg sm:text-xl font-bold font-mono text-sky-300">{el.val}</span>
              <span className="text-[9px] font-mono text-slate-500 mt-1">{el.address}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Inspection Details */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Element Access Expression:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`// Selected index: ${selectedIndex}
double val = Marks[${selectedIndex}]; // Returns ${curr.val}

// Memory calculation formula:
// Address = BaseAddress + (Index * ElementSize)
// Address = 0x4000 + (${selectedIndex} * 8 bytes) = ${curr.address}`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
              Array Properties & Metrics:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Array Length (`Marks.length`):</span>
                <span className="text-emerald-400 font-bold">5</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Valid Index Range:</span>
                <span className="text-sky-300 font-bold">0 to 4</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Data Type:</span>
                <span className="text-white font-bold">double (8 bytes/elem)</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            💡 Contiguous storage gives array lookups $O(1)$ constant time access!
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic0 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_002 • Topic 0
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Concept of 1D Arrays in Java & Contiguous Memory Allocation
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand how 1D arrays store homogeneous elements in contiguous memory, explore 0-based indexing, and master the array length property in Java.
          </p>
        </div>

        {/* Visualizer */}
        <ContiguousMemoryVisualizer />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Java 1D Arrays"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Array Fundamentals Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Note (.txt)"
          downloadFileName="004_002_topic0_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Remember this board exam distinction: An array uses the `.length` property without parentheses (e.g. `arr.length`), whereas a String object uses the `.length()` method with parentheses (e.g. `str.length()`). This is one of CBSE's most frequent 1-mark objective questions! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic0;
