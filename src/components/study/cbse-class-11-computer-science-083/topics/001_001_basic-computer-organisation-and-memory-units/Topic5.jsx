import React, { useState } from 'react';
import {
  Zap, Layers, Activity, CheckCircle2, AlertTriangle,
  HelpCircle, FileText, Terminal, BookOpen, Calculator,
  Sparkles, Database, Cpu, ArrowRight, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/cache_hit_miss_simulator.py?raw";

// Interactive Cache Hierarchy & AMAT Calculator
const CacheHierarchyVisualizer = () => {
  const [hitRate, setHitRate] = useState(92);
  const [selectedLevel, setSelectedLevel] = useState('l1');

  const levels = {
    l1: {
      name: "Level 1 (L1) Cache",
      tag: "Ultra-Fast Internal Core Cache",
      color: "border-sky-500/40 text-sky-400 bg-sky-500/10",
      location: "Directly embedded inside CPU execution core die",
      capacity: "32 KB – 128 KB (Split into L1-Instruction & L1-Data)",
      latency: "1 – 4 Clock Cycles (~0.5 – 1.0 Nanosecond)",
      technology: "6-Transistor SRAM Cells (Zero Refresh)",
      cbseTip: "L1 cache is the fastest memory inside the processor, divided into Instruction and Data caches."
    },
    l2: {
      name: "Level 2 (L2) Cache",
      tag: "Dedicated Per-Core Mid-Tier Cache",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      location: "On-die next to CPU core pipeline",
      capacity: "512 KB – 2 MB per Core",
      latency: "10 – 20 Clock Cycles (~3 – 5 Nanoseconds)",
      technology: "High-density SRAM",
      cbseTip: "L2 cache acts as a secondary buffer; if L1 misses, L2 is checked before accessing L3 or RAM."
    },
    l3: {
      name: "Level 3 (L3) Cache",
      tag: "Large Shared Multi-Core Cache Pool",
      color: "border-purple-500/40 text-purple-400 bg-purple-500/10",
      location: "Shared across ALL CPU cores on the silicon package",
      capacity: "16 MB – 96 MB (Up to 128 MB with 3D V-Cache)",
      latency: "40 – 75 Clock Cycles (~10 – 20 Nanoseconds)",
      technology: "High-density multi-banked SRAM",
      cbseTip: "L3 cache is shared among all CPU cores to prevent redundant RAM fetches across threads."
    },
    ram: {
      name: "Main System RAM (DDR4 / DDR5)",
      tag: "External Main Memory",
      color: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      location: "Motherboard DIMM Slots (External to CPU package)",
      capacity: "8 GB – 64 GB+",
      latency: "200+ Clock Cycles (~50 – 80 Nanoseconds)",
      technology: "Dynamic RAM (DRAM) with Micro-Capacitors",
      cbseTip: "When a Cache Miss occurs across L1, L2, and L3, the CPU must fetch data from slow DRAM across the system bus."
    }
  };

  // AMAT Calculation (Hit Time = 1ns, Miss Penalty = 60ns)
  const missRate = (100 - hitRate) / 100;
  const amat = (1.0 + missRate * 60).toFixed(2);

  return (
    <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Zap size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Cache Memory Hierarchy &amp; AMAT Calculator
            </h3>
            <p className="text-xs text-slate-400">
              Inspect L1, L2, L3 cache levels and adjust Hit Ratio to observe Average Memory Access Time scaling.
            </p>
          </div>
        </div>
      </div>

      {/* Cache Level Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          { key: 'l1', label: '1. L1 Cache', sub: 'Core Internal (~1ns)' },
          { key: 'l2', label: '2. L2 Cache', sub: 'Dedicated (~4ns)' },
          { key: 'l3', label: '3. L3 Cache', sub: 'Shared Pool (~15ns)' },
          { key: 'ram', label: '4. Main RAM', sub: 'External DRAM (~60ns)' }
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setSelectedLevel(item.key)}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
              selectedLevel === item.key
                ? 'bg-purple-500/15 border-purple-500 text-purple-200 shadow-lg shadow-purple-500/10'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="font-bold text-xs sm:text-sm text-white truncate">{item.label}</div>
            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{item.sub}</span>
          </button>
        ))}
      </div>

      {/* Selected Level Deep Dive */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span className="text-purple-400 font-mono">▸</span> {levels[selectedLevel].name}
          </h4>
          <span className="px-3 py-1 bg-slate-800 text-purple-300 font-mono text-xs rounded-full border border-slate-700">
            {levels[selectedLevel].tag}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">Physical Location on Die:</span>
            <span className="text-slate-300">{levels[selectedLevel].location}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-sky-400 font-bold block mb-1">Typical Storage Capacity:</span>
            <span className="text-white font-mono font-semibold">{levels[selectedLevel].capacity}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">Access Latency (Clock Cycles):</span>
            <span className="text-emerald-300 font-mono font-bold">{levels[selectedLevel].latency}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-rose-400 font-bold block mb-1">Silicon Semiconductor Tech:</span>
            <span className="text-slate-300">{levels[selectedLevel].technology}</span>
          </div>
        </div>

        <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-3 text-xs text-purple-200 flex items-start gap-2">
          <Sparkles size={16} className="text-purple-400 shrink-0 mt-0.5" />
          <span>{levels[selectedLevel].cbseTip}</span>
        </div>
      </div>

      {/* AMAT Performance Interactive Slider */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-white">Average Memory Access Time (AMAT) Simulator</h4>
            <p className="text-xs text-slate-400">Formula: AMAT = Hit Time (1ns) + (Miss Rate × Miss Penalty 60ns)</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Effective Access Latency:</span>
            <div className="text-lg font-mono font-extrabold text-emerald-400">{amat} ns</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Cache Hit Ratio (H): <strong className="text-sky-400">{hitRate}%</strong></span>
            <span className="text-slate-400">Miss Rate (M): <strong className="text-rose-400">{(100 - hitRate).toFixed(0)}%</strong></span>
          </div>
          <input
            type="range"
            min="50"
            max="99"
            value={hitRate}
            onChange={(e) => setHitRate(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default function Topic5() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 5
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Unit I: Computer Systems and Organisation (10 Marks)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              High-Speed Cache Memory: L1, L2, L3 Cache &amp; Principle of Locality of Reference
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Discover how modern microprocessors overcome the "Memory Wall". Understand the multi-tiered L1/L2/L3 SRAM cache hierarchy and how Temporal and Spatial Locality of Reference allow CPUs to achieve near-instantaneous memory retrieval.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Zap className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">1. The Principle of Locality of Reference</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                <RefreshCw size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Temporal Locality (Locality in Time)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If an instruction or data item is accessed once, it is highly likely to be accessed again in the near future.
              </p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-sky-300">
                # Example: Loop counter &amp; accumulator<br/>
                total = 0<br/>
                for i in range(1000):<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;total += i  # 'total' &amp; 'i' accessed repeatedly
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Layers size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Spatial Locality (Locality in Space)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If a specific memory address is accessed, nearby contiguous memory addresses are highly likely to be accessed soon.
              </p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300">
                # Example: Sequential Array traversal<br/>
                scores = [95, 88, 92, 79, 100]<br/>
                for s in scores:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;print(s)  # Fetches contiguous 64-byte block
              </div>
            </div>
          </div>
        </div>

        {/* 3. Interactive Visualizer */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="text-purple-400" size={20} />
            <h2 className="text-lg font-bold text-white">2. Interactive Cache Memory Hierarchy &amp; AMAT Calculator</h2>
          </div>
          <CacheHierarchyVisualizer />
        </div>

        {/* 4. Deep Technical Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Calculator className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">3. Technical Formulae: Hit Ratio &amp; AMAT</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-amber-400 font-bold block text-sm">Hit Ratio (H) &amp; Miss Rate (M)</span>
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-emerald-300 border border-slate-800 text-xs">
                Hit Ratio (H) = Cache Hits / Total Memory Requests<br/>
                Miss Rate (M) = 1 - Hit Ratio = Misses / Total
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A 95% hit ratio means only 5 out of every 100 requests must suffer slow DRAM bus roundtrips.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-sky-400 font-bold block text-sm">Average Memory Access Time (AMAT)</span>
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-sky-300 border border-slate-800 text-xs">
                AMAT = Hit Time + (Miss Rate × Miss Penalty)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Quantifies average memory delay seen by the CPU pipeline.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Code Demonstration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-white">4. Python Code Demonstration: Cache Simulator</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="cache_hit_miss_simulator.py"
            highlightLines={[20, 28, 36, 45, 62]}
          />
        </div>

        {/* 6. Real-World Case Studies */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <BookOpen className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">5. Real-World Case Studies &amp; Scenarios</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Case 1: AMD 3D V-Cache in Gaming</span>
              <h4 className="text-sm font-bold text-white">96 MB L3 Cache on Ryzen 7 7800X3D</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                By vertically stacking an extra 64 MB of SRAM on top of the CPU core, game physics and world assets fit entirely in L3, boosting framerates by 25% without changing clock speed.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Case 2: 2D Matrix Multiplication Loop</span>
              <h4 className="text-sm font-bold text-white">Row-Major vs Column-Major Performance</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Iterating over matrices row-by-row accesses contiguous addresses (Spatial Locality), running 10x faster than column-by-column iteration which causes constant cache misses.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Case 3: Apple M3 Unified Memory Cache</span>
              <h4 className="text-sm font-bold text-white">System Level Cache (SLC)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Apple Silicon integrates a massive System Level Cache shared between CPU, GPU, and Neural Engine cores, preventing power-draining memory bus transfers on mobile laptops.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Case 4: Web Browser Tab Switching</span>
              <h4 className="text-sm font-bold text-white">Cold Cache Misses on Context Switches</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Switching tabs in Google Chrome evicts previous page data from L1/L2 cache, causing brief millisecond cold misses while the new tab's DOM tree is reloaded into cache.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <AlertTriangle className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">6. Common Exam Pitfalls &amp; Best Practices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle size={18} />
                <span>Beginner Mistakes</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Confusing Temporal and Spatial locality:</strong> Temporal is <em>time</em> (reusing same variable); Spatial is <em>space</em> (accessing adjacent array index).</li>
                <li><strong>Claiming L3 cache is faster than L1:</strong> L1 is the fastest and smallest; L3 is the largest and slowest of the on-die caches.</li>
                <li><strong>Thinking Cache is Secondary Storage:</strong> Cache is high-speed primary SRAM memory.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Full-Mark Strategies</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Provide Clear Examples:</strong> When explaining Locality of Reference, always give a loop example for Temporal and an array example for Spatial.</li>
                <li><strong>State AMAT Formula:</strong> Write <code>AMAT = Hit Time + (Miss Rate × Miss Penalty)</code> in numerical questions.</li>
                <li><strong>Mention SRAM:</strong> Explicitly state that cache is constructed using Static RAM (SRAM).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <Sparkles size={18} />
            <span>Analogy to Remember Locality</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Think of studying at your desk: <strong>Temporal Locality</strong> is keeping your active notebook right open in front of you because you'll write in it again in 10 seconds. <strong>Spatial Locality</strong> is opening a textbook chapter because after reading page 45, you are almost certainly going to read page 46 next!
          </p>
        </div>

        {/* 9. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate
            title="Topic 5 · Cache Memory &amp; Locality of Reference FAQs"
            questions={questions}
          />
        </div>

        {/* 10. Plain Text Printable Document */}
        <div className="space-y-4">
          <PlainTextPrint
            content={noteText}
            filename="topic5_cache_memory_note.txt"
            title="CBSE Class XI CS 083 – Topic 5 Revision Handbook"
            hidePreview={false}
            showDownload={true}
          />
        </div>

        {/* 11. Teacher's Note */}
        <Teacher
          note="Locality of Reference is one of the most frequently asked conceptual questions in CBSE Class XI Computer Science (083) Unit 1. Always be prepared to define Temporal vs Spatial locality with concrete loop and array examples! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
