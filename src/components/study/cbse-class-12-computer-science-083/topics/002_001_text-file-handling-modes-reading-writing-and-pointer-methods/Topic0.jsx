import React from 'react';
import {
  Database, HardDrive, Cpu, ShieldCheck, CheckCircle2,
  AlertTriangle, HelpCircle, Layers, ArrowRight, RefreshCw, FileText
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/persistent_storage_intro_lab.py?raw";

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · File Handling · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Foundation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Introduction to Persistent Storage: Volatile Memory vs Secondary Storage Files
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand why computing architectures require secondary storage. Explore the architectural distinction between transient RAM allocations and permanent disk-based file streams in Python.
            </p>
          </div>
        </div>

        {/* 2. Conceptual Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-red-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
              <Cpu size={18} className="text-red-400" /> Volatile Primary Memory (RAM)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>• <span className="font-semibold text-white">Temporary State:</span> All variables, active data structures, and function frames reside here.</li>
              <li>• <span className="font-semibold text-white">Loss on Exit:</span> Terminating a script or losing electrical power instantly zeroes memory cells.</li>
              <li>• <span className="font-semibold text-white">Speed vs Longevity:</span> Ultra-fast nanosecond read/write operations, but zero permanence.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <HardDrive size={18} className="text-emerald-400" /> Persistent Secondary Storage (Disk)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>• <span className="font-semibold text-white">Permanent State:</span> Bits are stored in magnetic, optical, or NAND flash media.</li>
              <li>• <span className="font-semibold text-white">Survives Termination:</span> Output files remain intact across distinct runs, reboots, and days.</li>
              <li>• <span className="font-semibold text-white">Data Sharing:</span> Permits multiple programs or sessions to read and update standard records.</li>
            </ul>
          </div>
        </div>

        {/* 3. Semantic SVG Diagram */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> Memory Hierarchy &amp; Stream Pipeline Architecture
          </h3>
          <div className="flex justify-center py-4 overflow-x-auto">
            <svg viewBox="0 0 760 220" className="w-full max-w-2xl h-auto">
              <rect x="20" y="30" width="180" height="150" rx="14" fill="#0f172a" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <text x="110" y="60" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">Primary Memory (RAM)</text>
              <rect x="40" y="80" width="140" height="35" rx="6" fill="#1e293b" />
              <text x="110" y="102" textAnchor="middle" fill="#94a3b8" fontSize="11 font-mono">Python Variables</text>
              <rect x="40" y="125" width="140" height="35" rx="6" fill="#1e293b" />
              <text x="110" y="147" textAnchor="middle" fill="#fca5a5" fontSize="10">VOLATILE (Disappears)</text>

              <path d="M 200 85 L 340 85" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
              <text x="270" y="75" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Output Stream</text>
              <text x="270" y="100" textAnchor="middle" fill="#64748b" fontSize="9 font-mono">f.write()</text>

              <path d="M 340 135 L 200 135" stroke="#34d399" strokeWidth="3" markerEnd="url(#arrow)" />
              <text x="270" y="128" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Input Stream</text>
              <text x="270" y="152" textAnchor="middle" fill="#64748b" fontSize="9 font-mono">f.read()</text>

              <rect x="350" y="65" width="120" height="90" rx="10" fill="#0f172a" stroke="#eab308" strokeWidth="2" />
              <text x="410" y="95" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">I/O Buffer</text>
              <text x="410" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9 font-mono">RAM Cache</text>
              <text x="410" y="135" textAnchor="middle" fill="#ca8a04" fontSize="9">flush() on full/close</text>

              <path d="M 470 110 L 550 110" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow)" />

              <rect x="560" y="30" width="180" height="150" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <text x="650" y="60" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Secondary Storage</text>
              <rect x="580" y="80" width="140" height="35" rx="6" fill="#1e293b" />
              <text x="650" y="102" textAnchor="middle" fill="#6ee7b7" fontSize="11 font-mono">data.txt on SSD/HDD</text>
              <rect x="580" y="125" width="140" height="35" rx="6" fill="#1e293b" />
              <text x="650" y="147" textAnchor="middle" fill="#34d399" fontSize="10">PERSISTENT (Saved)</text>

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#94a3b8" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* 4. Deep Technical Breakdown */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Database size={18} /> Deep Technical Breakdown: Streams &amp; OS File Descriptors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-amber-300">1. File Handle Creation</span>
              <p className="text-slate-400 leading-relaxed">
                When <code>open()</code> is executed, the OS kernel allocates a file descriptor table entry and returns a file pointer wrapper to Python.
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-sky-300">2. Intermediate Buffering</span>
              <p className="text-slate-400 leading-relaxed">
                Data is not transferred byte-by-byte to slow physical disks. Python writes to an internal memory buffer that flushes automatically.
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-emerald-300">3. Resource Deallocation</span>
              <p className="text-slate-400 leading-relaxed">
                Invoking <code>close()</code> flushes any lingering dirty buffer bits and releases the OS file descriptor back to the kernel.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-sky-400" /> Laboratory Implementation
            </h3>
            <span className="text-xs text-slate-400 font-mono">persistent_storage_intro_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="persistent_storage_intro_lab.py"
            highlightLines={[25, 26, 37, 38]}
          />
        </div>

        {/* 6. Real-World Case Studies */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
            <ShieldCheck size={18} /> 4 Real-World Software Engineering Case Studies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900/90 border border-slate-800/80 rounded-xl space-y-1.5">
              <span className="font-bold text-sky-300">1. School Examination Ledger</span>
              <p className="text-slate-400">Stores terminal term scores across 1,500 students so grading reports can be re-printed anytime without re-entry.</p>
            </div>
            <div className="p-4 bg-slate-900/90 border border-slate-800/80 rounded-xl space-y-1.5">
              <span className="font-bold text-sky-300">2. Banking Audit Logs</span>
              <p className="text-slate-400">Maintains append-only persistent audit trails of financial debit/credit events across Barrackpore branch terminals.</p>
            </div>
            <div className="p-4 bg-slate-900/90 border border-slate-800/80 rounded-xl space-y-1.5">
              <span className="font-bold text-sky-300">3. Video Game Save States</span>
              <p className="text-slate-400">Serializes character inventory, coordinates, and health into disk files allowing users to resume gameplay later.</p>
            </div>
            <div className="p-4 bg-slate-900/90 border border-slate-800/80 rounded-xl space-y-1.5">
              <span className="font-bold text-sky-300">4. IoT Sensor Telemetry</span>
              <p className="text-slate-400">Edge weather stations buffer temperature and humidity measurements locally during internet disconnects.</p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Beginner Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Assuming Python global variables will retain their values next time the script is run in terminal.</li>
              <li>• Omitting <code>close()</code> leading to uncommitted trailing writes stuck inside memory buffers.</li>
              <li>• Relying on relative file paths without knowing the current script working directory.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Pro Board Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Use the <code>with open(...) as f:</code> context manager to guarantee automatic buffer flushing.</li>
              <li>• Specify explicit character encoding (e.g. <code>encoding='utf-8'</code>) for cross-platform stability.</li>
              <li>• Verify file existence via <code>os.path.exists()</code> prior to destructive write attempts.</li>
            </ul>
          </div>
        </div>

        {/* 8. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Hint
          </h4>
          <p>
            In Section A (MCQs) and Section B (2-mark definitions), questions frequently test the difference between RAM variables and disk files, or ask what happens to buffered data when an unclosed program halts. Remember: <strong>RAM is volatile, disk files are persistent</strong>.
          </p>
        </div>

        {/* 9. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 0 FAQs: Persistent Storage Concepts"
          questions={questions}
        />

        {/* 10. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 0 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic0_persistent_storage.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="Welcome to Segment 2 of CBSE Class 12 Computer Science! Persistent file handling is the highest-weightage programming unit in Section C, D, and practical exams. Master the stream concept here, because binary pickling and CSV parsing in upcoming modules build directly on this foundation! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
