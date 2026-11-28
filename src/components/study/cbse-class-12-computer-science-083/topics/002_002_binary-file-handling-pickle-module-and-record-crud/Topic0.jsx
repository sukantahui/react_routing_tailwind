import React from 'react';
import {
  Binary, Cpu, HardDrive, ShieldCheck, CheckCircle2,
  AlertTriangle, HelpCircle, Layers, ArrowRight, Zap, FileCode
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/binary_file_concept_lab.py?raw";

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 0
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Serialization Architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Concept of Binary Files: Byte-level Storage, Structure &amp; Performance Advantages
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Step into the byte-level realm of persistent data. Discover how binary files mirror computer RAM bit-for-bit, eliminate character translation delays, and empower record-based data storage for CBSE Class 12 CS.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <FileCode size={18} /> Text Files (Character Translation)
            </h3>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-1.5 border border-slate-800">
              <p>RAM Object: <span className="text-amber-300">1000000</span> (Integer)</p>
              <p className="text-slate-500">  ↓ String conversion &amp; EOL formatting</p>
              <p>Disk Storage: <span className="text-pink-400">'1', '0', '0', '0', '0', '0', '0', '\n'</span></p>
              <p className="text-red-400 font-bold">Total: 8 Bytes + Translation Lag!</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every numeric value must be converted to strings and parsed back, incurring CPU cycle overhead.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <Binary size={18} /> Binary Files (Direct Memory Image)
            </h3>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-1.5 border border-purple-500/20">
              <p>RAM Object: <span className="text-amber-300">1000000</span> (Integer)</p>
              <p className="text-slate-500">  ↓ Direct memory block dump (pickle)</p>
              <p>Disk Storage: <span className="text-emerald-400">0x00 0x0F 0x42 0x40</span> (Raw bytes)</p>
              <p className="text-emerald-400 font-bold">Total: 4 Bytes + ZERO Conversion Delay!</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Raw bytes transfer directly between memory and storage with maximum performance and zero rounding errors.
            </p>
          </div>
        </div>

        {/* 3. Semantic SVG Pipeline Illustration */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> Text vs Binary File Storage Architecture
          </h3>
          <div className="flex justify-center py-4 overflow-x-auto">
            <svg viewBox="0 0 760 200" className="w-full max-w-2xl h-auto">
              <rect x="20" y="25" width="200" height="150" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2" />
              <text x="120" y="55" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="bold">Python Memory (RAM)</text>
              <rect x="40" y="75" width="160" height="35" rx="6" fill="#1e293b" />
              <text x="120" y="97" textAnchor="middle" fill="#38bdf8" fontSize="11 font-mono">&#123;'roll': 1, 'marks': 98.5&#125;</text>
              <text x="120" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">Python Dictionary Object</text>

              <path d="M 220 92 L 340 92" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#bin-arrow)" />
              <text x="280" y="80" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">pickle.dump()</text>
              <text x="280" y="112" textAnchor="middle" fill="#64748b" fontSize="9 font-mono">Byte Serialization</text>

              <rect x="350" y="25" width="180" height="150" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <text x="440" y="55" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="bold">student.dat (Disk)</text>
              <rect x="370" y="75" width="140" height="35" rx="6" fill="#1e293b" />
              <text x="440" y="97" textAnchor="middle" fill="#34d399" fontSize="11 font-mono">0x80 0x04 0x95 ...</text>
              <text x="440" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">Raw Byte Sequence</text>

              <path d="M 540 92 L 660 92" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#bin-arrow)" />
              <text x="600" y="80" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">pickle.load()</text>
              <text x="600" y="112" textAnchor="middle" fill="#64748b" fontSize="9 font-mono">Deserialization</text>

              <rect x="670" y="55" width="70" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="705" y="95" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Restored</text>
              <text x="705" y="112" textAnchor="middle" fill="#94a3b8" fontSize="9 font-mono">Dict</text>

              <defs>
                <marker id="bin-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#a78bfa" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* 4. Deep Technical Breakdown */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
            <Zap size={18} /> Why Binary Files Excel in CBSE Class 12 Board Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-bold text-sky-300">1. Record CRUD Mastery</span>
              <p className="text-slate-400 leading-relaxed">
                Allows students to build student/employee databases storing lists of dictionaries with instantaneous key lookup (e.g. <code>rec['roll'] == 101</code>).
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-bold text-purple-300">2. No Delimiter Clashes</span>
              <p className="text-slate-400 leading-relaxed">
                In text files, commas or spaces inside a student name (e.g. "Roy, Debangshu") break word splits. Binary files store strings as encapsulated objects without delimiter issues.
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-bold text-emerald-300">3. Constant I/O Speed</span>
              <p className="text-slate-400 leading-relaxed">
                Direct block memory writes bypass CPU string parsing overhead, providing optimal execution speed during practical exams.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Binary size={18} className="text-purple-400" /> Byte Storage Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">binary_file_concept_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="binary_file_concept_lab.py"
            highlightLines={[18, 20, 29]}
          />
        </div>

        {/* 6. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Opening a binary file without the <code>'b'</code> flag (e.g. <code>'w'</code> instead of <code>'wb'</code>).</li>
              <li>• Trying to open <code>student.dat</code> in Notepad and panicking because it looks like gibberish.</li>
              <li>• Passing standard string literals to binary <code>write()</code> without byte encoding.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Pro Tips
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Always use the <code>.dat</code> file extension for binary records in CBSE Class 12 exams.</li>
              <li>• Always remember the binary mode pairs: <code>'wb'</code> for writing, <code>'rb'</code> for reading, and <code>'ab'</code> for appending.</li>
              <li>• In theory questions, emphasize <strong>zero EOL translation</strong> as the core architectural difference!</li>
            </ul>
          </div>
        </div>

        {/* 7. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE 2-Mark Board Exam Question
          </h4>
          <p>
            "Why is a binary file preferred over a text file for storing complex records?" Key points: 1) Binary files store data in exact in-memory byte format without character conversion delays, 2) Binary files preserve complex Python objects (dictionaries, lists) directly via serialization.
          </p>
        </div>

        {/* 8. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 0 FAQs: Concept of Binary Files"
          questions={questions}
        />

        {/* 9. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 0 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic0_binary_concept.txt"
        />

        {/* 10. Teacher's Note */}
        <Teacher
          note="Welcome to Binary Files! In the CBSE Class 12 CS Board Exam, Binary File Handling accounts for 8 Marks in practicals and a guaranteed 3 or 4 marks in Section C/D theory. Master the concept of byte-level storage first, because pickle.dump and pickle.load operate directly on these bytes! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
