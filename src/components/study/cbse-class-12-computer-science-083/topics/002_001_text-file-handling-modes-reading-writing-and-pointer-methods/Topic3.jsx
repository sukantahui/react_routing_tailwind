import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, Table, Flame, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/file_access_modes_lab.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · File Handling · Topic 3
              </span>
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full">
                High-Frequency Exam Topic
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              File Access Modes: 'r', 'w', 'a', 'r+', 'w+', 'a+' and Their Differences
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Demystify Python file access modes. Understand pointer placement, automatic file creation, in-place overwriting, and the catastrophic risk of inadvertent file truncation with <code>'w'</code> and <code>'w+'</code>.
            </p>
          </div>
        </div>

        {/* 2. Comprehensive Comparison Matrix */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Table size={18} /> Official CBSE Class 12 CS Access Modes Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-300 bg-slate-900/60">
                  <th className="p-3">Mode</th>
                  <th className="p-3">Operation</th>
                  <th className="p-3">If File Does Not Exist?</th>
                  <th className="p-3">Initial Pointer Location</th>
                  <th className="p-3">Truncates Existing Data?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-400">
                <tr>
                  <td className="p-3 font-mono font-bold text-sky-300">'r'</td>
                  <td className="p-3">Read-only</td>
                  <td className="p-3 text-red-400 font-semibold">FileNotFoundError</td>
                  <td className="p-3">Beginning (byte 0)</td>
                  <td className="p-3 text-emerald-400">No (Preserved)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">'w'</td>
                  <td className="p-3">Write-only</td>
                  <td className="p-3 text-emerald-400">Creates new file</td>
                  <td className="p-3">Beginning (byte 0)</td>
                  <td className="p-3 text-red-400 font-bold">YES (Wipes to 0 bytes!)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-emerald-300">'a'</td>
                  <td className="p-3">Append-only</td>
                  <td className="p-3 text-emerald-400">Creates new file</td>
                  <td className="p-3 text-emerald-300">End of file</td>
                  <td className="p-3 text-emerald-400">No (Preserved)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-purple-300">'r+'</td>
                  <td className="p-3">Read and Write</td>
                  <td className="p-3 text-red-400 font-semibold">FileNotFoundError</td>
                  <td className="p-3">Beginning (byte 0)</td>
                  <td className="p-3 text-emerald-400">No (Overwrites in-place)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-rose-300">'w+'</td>
                  <td className="p-3">Write and Read</td>
                  <td className="p-3 text-emerald-400">Creates new file</td>
                  <td className="p-3">Beginning (byte 0)</td>
                  <td className="p-3 text-red-400 font-bold">YES (Wipes to 0 bytes!)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-teal-300">'a+'</td>
                  <td className="p-3">Append and Read</td>
                  <td className="p-3 text-emerald-400">Creates new file</td>
                  <td className="p-3 text-teal-300">End of file</td>
                  <td className="p-3 text-emerald-400">No (Preserved)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: r+ vs w+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-sky-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <ShieldCheck size={18} /> Mode 'r+' (Update in Place)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Targeted for updating records inside an existing file. If the file exists, it remains intact. Writes overwrite only the bytes at the current file pointer without deleting subsequent text.
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-sky-300">
              f = open('scores.txt', 'r+') # Safe from truncation
            </div>
          </div>

          <div className="bg-slate-950/80 border border-rose-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <Flame size={18} /> Mode 'w+' (Destructive Overwrite)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Creates a brand new file for reading and writing. If the file already exists, <strong className="text-rose-400">EVERY SINGLE BYTE IS INSTANTLY TRUNCATED TO ZERO</strong> the moment open() is called!
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-rose-300">
              f = open('scores.txt', 'w+') # ALL OLD DATA LOST!
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-sky-400" /> Access Modes Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">file_access_modes_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="file_access_modes_lab.py"
            highlightLines={[15, 23, 31, 40]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Deadly Board Mistakes
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Thinking <code>'w+'</code> preserves data because of the plus sign. (It wipes the file!).</li>
              <li>• Using <code>'r+'</code> on a file that doesn't exist yet, triggering <code>FileNotFoundError</code>.</li>
              <li>• Using <code>'w'</code> when asked to append a new record to an existing log.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Pro Tips
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• For adding records: always choose <code>'a'</code> or <code>'a+'</code>.</li>
              <li>• When reading immediately after appending in <code>'a+'</code>, always rewind the pointer using <code>f.seek(0)</code>.</li>
              <li>• In question papers, underline whether the file "already exists" and if previous data "must be preserved".</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Golden Rule
          </h4>
          <p>
            The difference between <code>'r+'</code> and <code>'w+'</code> is tested almost every single year! <code>'r+'</code> requires an existing file and preserves data (overwrites in place). <code>'w+'</code> creates a file if missing and truncates any existing data to 0 bytes.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 3 FAQs: File Access Modes"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 3 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic3_access_modes.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Susmita and Debangshu, take note: In Section B questions, when CBSE asks 'Write the difference between r+ and w+', never just say 'both can read and write'. Mention truncation and whether FileNotFoundError is raised if the file doesn't exist! That is what examiners grade for. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
