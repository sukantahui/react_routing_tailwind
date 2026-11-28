import React from 'react';
import {
  Package, PackageOpen, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/serialization_mechanics_lab.py?raw";

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Protocol
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Object Serialization and Deserialization (Pickling vs Unpickling)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand the symmetrical mechanics of object transformation in Python. Learn how in-memory hierarchies are converted into contiguous byte streams (Pickling) and reconstructed into live objects (Unpickling).
            </p>
          </div>
        </div>

        {/* 2. Symmetrical Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <Package size={18} /> Pickling (Serialization)
            </h3>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-purple-300 space-y-1">
              <p>RAM Object → <strong className="text-white">Byte Stream</strong></p>
              <p className="text-slate-400">File target: <code className="text-purple-300">pickle.dump(obj, f)</code></p>
              <p className="text-slate-400">Memory target: <code className="text-purple-300">pickle.dumps(obj)</code></p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Encodes structured Python objects into a serialized byte stream with metadata detailing types and nesting.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <PackageOpen size={18} /> Unpickling (Deserialization)
            </h3>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-sky-300 space-y-1">
              <p>Byte Stream → <strong className="text-white">RAM Object</strong></p>
              <p className="text-slate-400">File source: <code className="text-sky-300">obj = pickle.load(f)</code></p>
              <p className="text-slate-400">Memory source: <code className="text-sky-300">obj = pickle.loads(bytes)</code></p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Parses the byte stream, allocates memory cells, and recreates the original Python object hierarchy.
            </p>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: 4 Core Methods */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> The Four Methods of the 'pickle' Module (Cheat Sheet)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-purple-300">pickle.dump(obj, file_handle)</span>
              <p className="text-slate-400">Serializes <code>obj</code> and writes directly to an open binary file handle in <code>'wb'</code> or <code>'ab'</code> mode.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-sky-300">pickle.load(file_handle)</span>
              <p className="text-slate-400">Reads the next serialized byte sequence from an open binary file handle in <code>'rb'</code> mode and returns the object.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-amber-300">pickle.dumps(obj)</span>
              <p className="text-slate-400">"Dump String": Serializes <code>obj</code> and returns an in-memory <code>bytes</code> object without touching any disk file.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-emerald-300">pickle.loads(byte_data)</span>
              <p className="text-slate-400">"Load String": Deserializes an in-memory <code>bytes</code> sequence and returns the reconstructed Python object.</p>
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap size={18} className="text-purple-400" /> Serialization Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">serialization_mechanics_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="serialization_mechanics_lab.py"
            highlightLines={[23, 30]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Confusing <code>dump()</code> (requires file handle) with <code>dumps()</code> (returns bytes).</li>
              <li>• Confusing <code>load()</code> (reads from file) with <code>loads()</code> (reads from bytes).</li>
              <li>• Attempting to pickle open file handles, database connections, or socket streams.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Always remember: in CBSE Class 12, questions exclusively use <strong>pickle.dump()</strong> and <strong>pickle.load()</strong>.</li>
              <li>• Import the module cleanly: <code>import pickle</code>.</li>
              <li>• Ensure the target file is opened in binary mode: <code>'wb'</code> or <code>'rb'</code>.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination 2-Mark Definition
          </h4>
          <p>
            "What is the difference between pickling and unpickling? Name the module used for these processes." Answer formula: 1) Define Pickling (converting Python object to byte stream), 2) Define Unpickling (converting byte stream back to object), 3) State the module name: <code>pickle</code>.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 1 FAQs: Serialization & Deserialization"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 1 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic1_serialization.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Susmita and Mahima: The 's' in dumps() and loads() stands for 'String' (historic term for bytes sequence). When working with disk files, remember NO 's': use pickle.dump(obj, f) and pickle.load(f)! This single letter difference is a classic MCQ distractor. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
