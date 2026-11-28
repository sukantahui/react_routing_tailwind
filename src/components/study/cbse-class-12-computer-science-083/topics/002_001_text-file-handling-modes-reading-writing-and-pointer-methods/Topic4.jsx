import React from 'react';
import {
  BookOpen, Eye, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, FileCode, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/text_file_reading_methods_lab.py?raw";

export default function Topic4() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · File Handling · Topic 4
              </span>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full">
                Core Data Extraction
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reading from Text Files: read(), read(n), readline(), and readlines()
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the four essential reading primitives in Python. Dissect return types (string vs list), chunk parsing mechanics, EOF empty-string detection, and memory-efficient streaming iteration.
            </p>
          </div>
        </div>

        {/* 2. Visual Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 text-[11px] font-mono rounded font-bold">read()</span>
            <h4 className="text-sm font-bold text-white">Full String</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Reads entire file into a single string. Fast for small config files; risks MemoryError on huge logs.</p>
            <span className="text-[10px] text-slate-500 font-mono">Returns: str</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[11px] font-mono rounded font-bold">read(n)</span>
            <h4 className="text-sm font-bold text-white">Character Chunk</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Reads at most <code>n</code> characters from current pointer. Successive calls continue sequentially.</p>
            <span className="text-[10px] text-slate-500 font-mono">Returns: str (len ≤ n)</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono rounded font-bold">readline()</span>
            <h4 className="text-sm font-bold text-white">Single Line</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Reads characters up to and including <code>\n</code>. Returns empty string <code>''</code> upon reaching EOF.</p>
            <span className="text-[10px] text-slate-500 font-mono">Returns: str</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[11px] font-mono rounded font-bold">readlines()</span>
            <h4 className="text-sm font-bold text-white">List of Lines</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Reads all remaining lines into a Python list of strings, preserving trailing <code>\n</code> characters.</p>
            <span className="text-[10px] text-slate-500 font-mono">Returns: list[str]</span>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: EOF Logic */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> Deep Technical Breakdown: The Blank Line vs EOF Trap
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-amber-300">1. A Blank Line in File</span>
              <p className="text-slate-400 leading-relaxed">
                Contains a newline character: <code>readline()</code> returns <code>"\n"</code>. Its length is 1, so <code>bool("\n")</code> evaluates to <strong>True</strong>! The loop does not terminate.
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-emerald-300">2. True End of File (EOF)</span>
              <p className="text-slate-400 leading-relaxed">
                When pointer passes the terminal byte, <code>readline()</code> returns an empty string <code>""</code>. Its length is 0, so <code>bool("")</code> evaluates to <strong>False</strong>!
              </p>
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCode size={18} className="text-sky-400" /> Reading Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">text_file_reading_methods_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="text_file_reading_methods_lab.py"
            highlightLines={[19, 29, 39, 49]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Forgetting that <code>readline()</code> retains trailing <code>\n</code>, leading to double-spaced output when used with <code>print()</code>.</li>
              <li>• Calling <code>f.read()</code> twice and wondering why the second call returns nothing (pointer was already at EOF).</li>
              <li>• Using <code>readlines()</code> to count words instead of <code>f.read().split()</code>.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Use <code>print(line, end='')</code> to avoid duplicate line breaks when printing lines read from files.</li>
              <li>• Use <code>for line in f:</code> for the cleanest and most memory-efficient line traversal.</li>
              <li>• Always use <code>line.rstrip('\n')</code> before testing line ending conditions or matching keywords.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Tracing Pattern
          </h4>
          <p>
            CBSE questions often ask: "What will be the output of <code>print(len(f.readlines()))</code> vs <code>print(len(f.read()))</code>?" Remember: <code>readlines()</code> returns a <strong>list of lines</strong>, so <code>len()</code> gives the <strong>number of lines</strong>. <code>read()</code> returns a <strong>string</strong>, so <code>len()</code> gives the <strong>total character count</strong>!
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 4 FAQs: Text File Reading Methods"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 4 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic4_reading_methods.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Swadeep and Tuhina, memorize this well: In board practicals, when asked to count the number of lines starting with 'A' or 'M', use 'for line in f:' followed by 'if line.startswith('A'):'. Never use f.read() for line problems! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
