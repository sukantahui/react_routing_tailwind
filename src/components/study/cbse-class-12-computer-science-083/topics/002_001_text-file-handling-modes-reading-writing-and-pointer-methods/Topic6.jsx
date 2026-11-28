import React from 'react';
import {
  Compass, Navigation, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, FileText, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/file_pointer_seek_tell_lab.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · File Handling · Topic 6
              </span>
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold rounded-full">
                Random Access Mechanics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Manipulating the File Pointer: tell() Method &amp; seek(offset, whence) Mechanics
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master random-access file streaming in Python. Understand byte offset cursors, the reference modes of the <code>whence</code> parameter (0, 1, 2), and Python 3 text mode relative seeking constraints.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: tell vs seek */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
              <Compass size={18} /> f.tell() — The Location Sensor
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>• <span className="font-semibold text-white">Zero Arguments:</span> Takes no parameters whatsoever.</li>
              <li>• <span className="font-semibold text-white">Return Value:</span> Returns integer representing current byte offset from byte 0.</li>
              <li>• <span className="font-semibold text-white">Inspection Utility:</span> Use it after reads or writes to discover cursor advancement.</li>
            </ul>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-cyan-300">
              current_byte = f.tell() # e.g. returns 12
            </div>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <Navigation size={18} /> f.seek(offset, whence) — The Cursor Navigator
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>• <span className="font-semibold text-white">offset:</span> Number of bytes to move.</li>
              <li>• <span className="font-semibold text-white">whence = 0:</span> From beginning of file (default).</li>
              <li>• <span className="font-semibold text-white">whence = 1:</span> From current pointer (binary mode only).</li>
              <li>• <span className="font-semibold text-white">whence = 2:</span> From end of file (<code>seek(0, 2)</code> lands at EOF).</li>
            </ul>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-sky-300">
              f.seek(0) # Rewind to start of file
            </div>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: whence table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> The Three 'whence' Modes (CBSE 2-Mark Standard Question)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-mono font-bold text-amber-300">whence = 0 (os.SEEK_SET)</span>
              <p className="text-slate-400 leading-relaxed">
                Calculates offset starting from the <strong>beginning of the file</strong> (byte 0). Offset must be positive or zero.
              </p>
              <span className="text-[10px] text-slate-500 font-mono">f.seek(10, 0) # byte 10</span>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-mono font-bold text-sky-300">whence = 1 (os.SEEK_CUR)</span>
              <p className="text-slate-400 leading-relaxed">
                Calculates offset starting from the <strong>current cursor location</strong>. Offset can be positive (forward) or negative (backward).
              </p>
              <span className="text-[10px] text-slate-500 font-mono">f.seek(5, 1) # binary only</span>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-mono font-bold text-emerald-300">whence = 2 (os.SEEK_END)</span>
              <p className="text-slate-400 leading-relaxed">
                Calculates offset starting from the <strong>end of the file</strong>. In text mode, only <code>f.seek(0, 2)</code> is permitted.
              </p>
              <span className="text-[10px] text-slate-500 font-mono">f.seek(0, 2) # jump to EOF</span>
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-sky-400" /> Pointer Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">file_pointer_seek_tell_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="file_pointer_seek_tell_lab.py"
            highlightLines={[21, 26, 31, 35, 39]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Passing arguments to <code>tell()</code> like <code>f.tell(0)</code>: raises <code>TypeError</code>!</li>
              <li>• Attempting non-zero seeks from current position in text mode (e.g. <code>f.seek(3, 1)</code>).</li>
              <li>• Confusing byte offsets with line numbers (seek operates on raw bytes, not lines).</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Rewind with <code>f.seek(0)</code> before re-reading a file in <code>'r+'</code> or <code>'w+'</code> mode.</li>
              <li>• Compute total file size cleanly using <code>f.seek(0, 2)</code> followed by <code>f.tell()</code>.</li>
              <li>• For arbitrary relative seeks, open the file in binary mode (<code>'rb'</code> or <code>'wb'</code>).</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE 2-Mark Board Exam Question
          </h4>
          <p>
            "Explain the purpose of seek() and tell() methods with syntax and suitable examples." Answer formula: 1) State definition, 2) Provide syntax: <code>f.tell()</code> vs <code>f.seek(offset, whence)</code>, 3) Mention that <code>tell()</code> returns position while <code>seek()</code> alters position, 4) Give <code>f.seek(0)</code> example.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 6 FAQs: tell() & seek() Methods"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 6 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic6_seek_tell.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Remember this catch: In CBSE Class 12, questions frequently show: 'f.seek(10); f.seek(5, 1)'. In text mode, Python raises an error on f.seek(5, 1)! If you want relative seeks, the file must be opened as 'rb' or 'wb'. Keep this in mind for Section A trick questions! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
