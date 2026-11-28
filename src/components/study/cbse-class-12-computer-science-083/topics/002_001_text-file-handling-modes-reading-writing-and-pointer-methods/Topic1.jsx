import React from 'react';
import {
  FileCode, FileSpreadsheet, Binary, ShieldCheck, CheckCircle2,
  AlertTriangle, HelpCircle, Layers, Table, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/file_types_comparison_lab.py?raw";

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · File Handling · Topic 1
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                File Types Taxonomy
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Types of Files: Text Files (ASCII/Unicode) vs Binary Files (Bytes) vs CSV Files
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Dissect the architectural taxonomy of storage files. Compare encoding translations, end-of-line (EOL) delimiter semantics, serialization needs, and performance benchmarks.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-950/80 border border-sky-500/20 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
              <FileCode size={22} />
            </div>
            <h3 className="text-base font-bold text-white">Text Files (.txt)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Human-readable ASCII/Unicode streams organized into lines. Automatically translates OS-dependent line endings (<code>\r\n</code> into <code>\n</code>).
            </p>
            <span className="inline-block px-2 py-0.5 bg-sky-500/10 text-sky-300 text-[10px] font-mono rounded">open('doc.txt', 'r')</span>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/20 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Binary size={22} />
            </div>
            <h3 className="text-base font-bold text-white">Binary Files (.dat)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Raw in-memory byte representations. No EOL translation. Stores complex Python objects (dictionaries, lists) directly via <code>pickle</code>.
            </p>
            <span className="inline-block px-2 py-0.5 bg-purple-500/10 text-purple-300 text-[10px] font-mono rounded">open('data.dat', 'rb')</span>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/20 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet size={22} />
            </div>
            <h3 className="text-base font-bold text-white">CSV Files (.csv)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tabular records where rows are lines and fields are separated by delimiters (commas). Seamlessly exchanged with Microsoft Excel and Pandas.
            </p>
            <span className="inline-block px-2 py-0.5 bg-emerald-500/10 text-emerald-300 text-[10px] font-mono rounded">import csv</span>
          </div>
        </div>

        {/* 3. Comprehensive Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Table size={18} /> Detailed Comparative Analysis (CBSE 3-Mark Question Model)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-300 bg-slate-900/60">
                  <th className="p-3">Evaluation Parameter</th>
                  <th className="p-3 text-sky-300">Text Files (.txt)</th>
                  <th className="p-3 text-purple-300">Binary Files (.dat)</th>
                  <th className="p-3 text-emerald-300">CSV Files (.csv)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-400">
                <tr>
                  <td className="p-3 font-semibold text-white">Stored Representation</td>
                  <td className="p-3">Human-readable characters (ASCII/UTF-8)</td>
                  <td className="p-3">Direct binary bytes (0x00 - 0xFF)</td>
                  <td className="p-3">Delimited plain text strings</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">EOL Delimiter Translation</td>
                  <td className="p-3 text-emerald-400">Yes (Normalized to '\n')</td>
                  <td className="p-3 text-red-400">No (Byte sequence unchanged)</td>
                  <td className="p-3 text-emerald-400">Yes (Requires newline='')</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Direct Human Readability</td>
                  <td className="p-3 text-emerald-400">High (Open in any editor)</td>
                  <td className="p-3 text-red-400">None (Shows scrambled glyphs)</td>
                  <td className="p-3 text-emerald-400">High (Spreadsheets &amp; Notepad)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Python Core Module</td>
                  <td className="p-3 font-mono text-sky-300">Built-in open()</td>
                  <td className="p-3 font-mono text-purple-300">pickle</td>
                  <td className="p-3 font-mono text-emerald-300">csv</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Relative Processing Speed</td>
                  <td className="p-3">Moderate (Parsing overhead)</td>
                  <td className="p-3 font-bold text-emerald-400">Fastest (Direct RAM image)</td>
                  <td className="p-3">Moderate (Tokenizing rows)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCode size={18} className="text-sky-400" /> Multi-File Type Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">file_types_comparison_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="file_types_comparison_lab.py"
            highlightLines={[12, 23, 27, 40]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Dangerous Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Opening a binary file without the <code>'b'</code> flag (e.g. <code>'w'</code> instead of <code>'wb'</code>) corrupts data due to EOL character tampering.</li>
              <li>• Forgetting <code>newline=''</code> when writing CSV files on Windows, which generates unwanted blank empty lines between rows.</li>
              <li>• Trying to read a <code>.dat</code> file using <code>f.read()</code> expecting plain Python dictionaries.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> CBSE Scoring Tips
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• For binary files: remember the pair <code>import pickle</code>, <code>pickle.dump()</code>, and <code>pickle.load()</code>.</li>
              <li>• In theory questions, always mention <strong>End-Of-Line (EOL) translation</strong> when explaining text vs binary files.</li>
              <li>• State clearly that binary files are faster because they skip character translation layers.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE 2-Mark Board Question Pattern
          </h4>
          <p>
            "Differentiate between a text file and a binary file. Give an example of each." Always formulate your answer around: 1) Human readability, 2) EOL character conversion, and 3) Corresponding Python module / mode flag.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 1 FAQs: Text, Binary & CSV Files"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 1 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic1_file_types.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Make sure every student remembers this: Text files normalize newlines to \n, whereas binary files preserve every single byte with zero alteration. In the CBSE board exam, mentioning EOL translation guarantees full marks on file comparison questions! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
