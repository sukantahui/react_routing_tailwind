import React from 'react';
import {
  FileCode, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Table, Flame, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/binary_access_modes_lab.py?raw";

export default function Topic4() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 4
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Core Protocol Flags
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Binary File Access Modes: 'rb', 'wb', 'ab', 'rb+', 'wb+', 'ab+'
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the six binary access modes in Python. Understand pointer initialization, non-truncating record appending, in-place update streams (<code>'rb+'</code>), and unrestricted relative byte seeking.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Matrix */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Table size={18} /> Official CBSE Class 12 Binary Access Modes Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-300 bg-slate-900/60">
                  <th className="p-3">Mode</th>
                  <th className="p-3">Operation</th>
                  <th className="p-3">If File Missing?</th>
                  <th className="p-3">Initial Pointer Location</th>
                  <th className="p-3">Truncates Existing Data?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-400">
                <tr>
                  <td className="p-3 font-mono font-bold text-sky-300">'rb'</td>
                  <td className="p-3">Binary Read-only</td>
                  <td className="p-3 text-red-400 font-semibold">FileNotFoundError</td>
                  <td className="p-3">Beginning (byte 0)</td>
                  <td className="p-3 text-emerald-400">No (Preserved)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">'wb'</td>
                  <td className="p-3">Binary Write-only</td>
                  <td className="p-3 text-emerald-400">Creates new file</td>
                  <td className="p-3">Beginning (byte 0)</td>
                  <td className="p-3 text-red-400 font-bold">YES (Wipes to 0 bytes!)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-emerald-300">'ab'</td>
                  <td className="p-3">Binary Append-only</td>
                  <td className="p-3 text-emerald-400">Creates new file</td>
                  <td className="p-3 text-emerald-300">End of file</td>
                  <td className="p-3 text-emerald-400">No (Preserved)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-purple-300">'rb+'</td>
                  <td className="p-3">Binary Read &amp; Write</td>
                  <td className="p-3 text-red-400 font-semibold">FileNotFoundError</td>
                  <td className="p-3">Beginning (byte 0)</td>
                  <td className="p-3 text-emerald-400">No (Overwrites in-place)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-rose-300">'wb+'</td>
                  <td className="p-3">Binary Write &amp; Read</td>
                  <td className="p-3 text-emerald-400">Creates new file</td>
                  <td className="p-3">Beginning (byte 0)</td>
                  <td className="p-3 text-red-400 font-bold">YES (Wipes to 0 bytes!)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-teal-300">'ab+'</td>
                  <td className="p-3">Binary Append &amp; Read</td>
                  <td className="p-3 text-emerald-400">Creates new file</td>
                  <td className="p-3 text-teal-300">End of file</td>
                  <td className="p-3 text-emerald-400">No (Preserved)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: wb vs ab */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
              <Flame size={18} /> Mode 'wb' — Destructive Creation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If an existing database with 500 student records is opened in <code>'wb'</code> mode, <strong className="text-red-400">ALL 500 RECORDS ARE DESTROYED INSTANTLY</strong>. Only use <code>'wb'</code> when initializing a fresh file!
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <ShieldCheck size={18} /> Mode 'ab' — Safe Record Accumulator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Positions pointer at EOF. Preserves historical student records and appends new pickled dictionaries safely at the end of the file.
            </p>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCode size={18} className="text-purple-400" /> Binary Modes Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">binary_access_modes_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="binary_access_modes_lab.py"
            highlightLines={[16, 24, 32, 44]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Using <code>'wb'</code> instead of <code>'ab'</code> when asked to add a new record to an existing file.</li>
              <li>• Forgetting the <code>'b'</code> flag (e.g. writing <code>'r'</code> instead of <code>'rb'</code>).</li>
              <li>• Attempting to read in <code>'ab'</code> mode without '+' (append is write-only).</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Pro Tips
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Always use <code>'ab'</code> for adding records and <code>'rb'</code> for searching/reading.</li>
              <li>• For updating records in place, use <code>'rb+'</code>.</li>
              <li>• In binary mode, relative seeks like <code>f.seek(-10, 2)</code> are fully legal and supported.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Strategy
          </h4>
          <p>
            In Section B 2-mark questions, examiners frequently ask: "What is the difference between 'rb+' and 'wb+'?" Always answer: <code>'rb+'</code> opens an existing file for reading and writing without truncation; <code>'wb+'</code> creates a file or wipes existing content to 0 bytes!
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 4 FAQs: Binary Access Modes"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 4 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic4_binary_modes.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="To Mamata and Susmita: Remember that 'wb' truncates! If the board exam question says 'add records without losing previous data', the mode MUST be 'ab'. If you write 'wb', all prior student marks vanish! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
