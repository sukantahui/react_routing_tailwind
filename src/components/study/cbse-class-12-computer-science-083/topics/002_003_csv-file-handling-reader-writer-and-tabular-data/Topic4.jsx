import React from 'react';
import {
  Split, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Sliders, FileSpreadsheet
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/csv_custom_delimiter_lab.py?raw";

export default function Topic4() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · CSV Files · Topic 4
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Custom Delimiters
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Custom Delimiters: Using the <code className="text-indigo-300 font-mono">delimiter</code> Parameter (Tab <code className="text-indigo-300 font-mono">'	'</code>, Pipe <code className="text-indigo-300 font-mono">'|'</code>, Semicolon <code className="text-indigo-300 font-mono">';'</code>)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Step beyond standard commas. Master the <code className="text-indigo-300 font-mono">delimiter</code> argument in <code className="text-indigo-300 font-mono">csv.reader()</code> and <code className="text-indigo-300 font-mono">csv.writer()</code> to process TSV, Pipe-separated (PSV), and European semicolon datasets.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 w-fit">
              <Split size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Pipe Separated ('|')</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Popular in database dumps and Unix pipelines because pipes rarely occur in natural text names and descriptions.
            </p>
            <div className="p-2 bg-slate-900 rounded-lg font-mono text-xs text-indigo-300 border border-indigo-500/20">
              101|Aarav|Science|98.5
            </div>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Sliders size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Tab Separated ('	')</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              TSV format is common in bioinformatics and bioinformatics pipelines. Python also supports it via <code className="text-sky-300">dialect='excel-tab'</code>.
            </p>
            <div className="p-2 bg-slate-900 rounded-lg font-mono text-xs text-sky-300 border border-sky-500/20">
              101	Aarav	Science	98.5
            </div>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <FileSpreadsheet size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Semicolon Separated (';')</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard in European enterprise exports where commas serve as mathematical decimal markers (e.g. 19,95 €).
            </p>
            <div className="p-2 bg-slate-900 rounded-lg font-mono text-xs text-amber-300 border border-amber-500/20">
              101;Aarav;Science;98.5
            </div>
          </div>
        </div>

        {/* 3. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">csv_custom_delimiter_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="csv_custom_delimiter_lab.py"
            title="Custom Delimiter Read & Write Mechanics"
          />
        </div>

        {/* 4. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Delimiter Mismatch Pitfall
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-red-400">The Silent Failure Bug:</p>
            <p className="text-slate-400 leading-relaxed">
              If a file was created using <code className="text-indigo-300">delimiter='|'</code>, but you open it for reading using default <code className="text-emerald-300">csv.reader(f)</code> (which expects commas), Python will NOT throw an error! Instead, <code className="text-amber-300">row</code> will be a list with ONLY 1 element containing the entire line: <code className="text-slate-200">['101|Aarav|Science']</code>. Accessing <code className="text-red-400">row[1]</code> will immediately raise <code className="text-red-400 font-bold">IndexError: list index out of range</code>!
            </p>
            <p className="text-emerald-400 font-semibold pt-1">
              Always ensure reader and writer specify the EXACT same delimiter parameter!
            </p>
          </div>
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE theory questions, watch for questions like: 'Write a Python statement to read a file where fields are separated by colon (:).' The answer is simply: csv.reader(f, delimiter=':'). Remember that the delimiter must always be a 1-character string—attempting multi-character delimiters will raise a TypeError!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_csv_custom_delimiters.txt"
          title="Download Topic 4 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
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