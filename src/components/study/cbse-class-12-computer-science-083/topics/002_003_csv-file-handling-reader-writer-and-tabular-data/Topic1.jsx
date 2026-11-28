import React from 'react';
import {
  Code2, Package, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Sliders, FileCode2
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/csv_module_core_lab.py?raw";

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
                Unit I · CSV Files · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Standard Library Architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The 'csv' Module in Python Standard Library
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore Python's native <code className="text-sky-300 font-mono">csv</code> module. Master its internal architecture, built-in readers and writers, quoting constants, and the Excel dialect specifications without installing any external packages.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Code2 size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">csv.reader()</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Creates an iterable stream parser that reads row by row, returning each line as a clean list of strings.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <FileCode2 size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">csv.writer()</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Takes lists or tuples and formats them into delimited CSV records, quoting special characters automatically.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
              <Sliders size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Quoting Modes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Constants like <code className="text-purple-300">QUOTE_MINIMAL</code>, <code className="text-purple-300">QUOTE_ALL</code>, and <code className="text-purple-300">QUOTE_NONNUMERIC</code> configure field encapsulation.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <Package size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Zero Setup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comes pre-packaged with Python 3. No pip install needed. Works out of the box on Windows, macOS, and Linux.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive into Quoting Modes */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-sky-400" size={22} />
            Understanding CSV Quoting Modes (quoting=...)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Constant</th>
                  <th className="py-3 px-4">Value</th>
                  <th className="py-3 px-4">Behavior on Writing</th>
                  <th className="py-3 px-4">Typical Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                <tr>
                  <td className="py-3 px-4 text-sky-400 font-bold">csv.QUOTE_MINIMAL</td>
                  <td className="py-3 px-4">0</td>
                  <td className="py-3 px-4 font-sans text-xs">Only quotes fields containing delimiters or quote characters (Default).</td>
                  <td className="py-3 px-4 font-sans text-xs text-slate-400">Standard spreadsheet export.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-emerald-400 font-bold">csv.QUOTE_ALL</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4 font-sans text-xs">Quotes every single field regardless of its datatype or content.</td>
                  <td className="py-3 px-4 font-sans text-xs text-slate-400">Strict legacy database ingestion.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-amber-400 font-bold">csv.QUOTE_NONNUMERIC</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4 font-sans text-xs">Quotes all strings. On reading, converts unquoted fields directly to float!</td>
                  <td className="py-3 px-4 font-sans text-xs text-slate-400">Numeric analysis without manual casting.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-red-400 font-bold">csv.QUOTE_NONE</td>
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4 font-sans text-xs">Never quotes fields. Raises csv.Error if delimiter is found without escapechar.</td>
                  <td className="py-3 px-4 font-sans text-xs text-slate-400">Specialized raw stream pipelines.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">csv_module_core_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="csv_module_core_lab.py"
            title="Introspecting the 'csv' Module & Dialects"
          />
        </div>

        {/* 5. Pitfalls & CBSE Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Common Pitfalls &amp; Exam Traps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Confusing module functions with file methods</p>
              <p className="text-slate-400">
                You do NOT do <code className="text-red-400">file_handle.reader()</code> or <code className="text-red-400">file_handle.csv_write()</code>. The functions belong to the module: <code className="text-emerald-300">csv.reader(file_handle)</code> and <code className="text-emerald-300">csv.writer(file_handle)</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Forgetting that csv.reader returns an iterator, not a list</p>
              <p className="text-slate-400">
                Printing <code className="text-red-400">print(csv.reader(f))</code> prints an object address like <code className="text-slate-400">&lt;_csv.reader object at 0x...&gt;</code>. You must loop over it with <code className="text-emerald-300">for row in reader:</code> or cast it with <code className="text-emerald-300">list(reader)</code>!
              </p>
            </div>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="When writing code in your Class 12 board answer sheets, always start with 'import csv'. Remember that reader and writer take the file object returned by open(), not the filename string directly! Knowing the difference between the module name and the returned object is a frequent 1-mark question in Section A."
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_csv_module_core.txt"
          title="Download Topic 1 Concise Revision Notes"
        />

        {/* 8. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400">
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Practice &amp; FAQs</h2>
              <p className="text-xs text-slate-400">25 Authentic Questions with Complete Explanations &amp; Hints</p>
            </div>
          </div>
          <FAQTemplate questions={questions} />
        </div>

      </div>
    </div>
  );
}