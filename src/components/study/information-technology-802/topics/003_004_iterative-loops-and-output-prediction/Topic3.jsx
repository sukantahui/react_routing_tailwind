import React, { useState } from 'react';
import { 
  Terminal, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Zap, Layers, Check, Play, ArrowDown, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import javaCode from "./topic3_files/PrintNto1.java?raw";

const ReverseCounterLab = () => {
  const [nVal, setNVal] = useState(6);
  const [stepFilter, setStepFilter] = useState('all'); // 'all', 'even', 'odd'

  // Generate sequence
  const list = [];
  let curr = nVal;
  while (curr >= 1 && list.length < 20) {
    if (stepFilter === 'all' || (stepFilter === 'even' && curr % 2 === 0) || (stepFilter === 'odd' && curr % 2 !== 0)) {
      list.push(curr);
    }
    curr--;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Play className="w-3.5 h-3.5" /> Countdown Workbench
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            N to 1 Reverse Countdown Console Simulation
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `int i = n; while (i &gt;= 1) &#123; i--; &#125;`
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Starting Value N: <span className="font-mono text-emerald-400 text-sm font-bold">{nVal}</span>
          </label>
          <input
            type="range"
            min="1"
            max="15"
            value={nVal}
            onChange={(e) => setNVal(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>1</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Filter Sequence:
          </label>
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All Numbers' },
              { id: 'even', label: 'Even Only' },
              { id: 'odd', label: 'Odd Only' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setStepFilter(f.id)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition cursor-pointer ${
                  stepFilter === f.id
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Output Stream */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" /> Standard Console Output
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Total Printed: <strong className="text-emerald-300">{list.length}</strong> items
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-emerald-400 flex flex-wrap gap-2 items-center">
          {list.map((item, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-white font-bold">
              {item}
            </span>
          ))}
          {list.length === 0 && <span className="text-slate-500 italic">No numbers generated.</span>}
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 003_004 • Topic 3
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Writing Java Programs to Print Numbers from N to 1 using a While Loop
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Learn how to accept integer inputs with the <code className="text-emerald-400 font-mono">Scanner</code> class and execute countdown iterations from N down to 1 using a decrementing while loop.
          </p>
        </div>

        {/* Interactive Workbench */}
        <ReverseCounterLab />

        {/* Java Code Loader */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-sky-400" />
            Complete Executable Java Program
          </h3>
          <JavaFileLoader
            fileModule={javaCode}
            title="PrintNto1.java"
            highlightLines={[16, 17, 18, 19, 20]}
          />
        </div>

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Reverse While Loop Programs"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – N to 1 Program Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Note (.txt)"
          downloadFileName="003_004_topic3_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In countdown programs, remember that the loop control variable decreases (i--), and the condition uses greater-than-or-equal-to (i >= 1). If you accidentally write i <= 1 with i=5, the condition evaluates to false immediately and prints nothing! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic3;
