import React from 'react';
import {
  BookOpen, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Table, ListOrdered
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/csv_reader_traversal_lab.py?raw";

export default function Topic5() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · CSV Files · Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Input Mechanics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reading CSV Files: <code className="text-cyan-300 font-mono">csv.reader()</code> Iterable &amp; Row Traversal
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Step into the read pipeline. Master the iterable mechanics of <code className="text-cyan-300 font-mono">csv.reader()</code>, stream iteration, header extraction using <code className="text-cyan-300 font-mono">next()</code>, and robust blank row guards.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit">
              <Table size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Iterable Stream</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-cyan-300">csv.reader(f)</code> does not load everything into RAM at once. It yields one parsed row list at a time as your loop requests it.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <ListOrdered size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">next(reader) for Header</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calling <code className="text-emerald-300">header = next(reader)</code> consumes the first line, keeping it separate from the numerical and data rows.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">String Casting Rule</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every value inside <code className="text-amber-300">row[i]</code> is parsed as string (<code className="text-amber-300">str</code>). Numeric comparisons require explicit casting!
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Architecture */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-cyan-400" size={22} />
            The Standard CBSE CSV Reading Pattern
          </h2>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="text-sky-400 font-semibold">import csv</p>
            <p><span className="text-purple-400">def</span> <span className="text-amber-300">DisplayEmployees</span>():</p>
            <p className="pl-4 text-slate-400"># Open in read mode with newline=''</p>
            <p className="pl-4"><span className="text-purple-400">with</span> open(<span className="text-emerald-300">"employees.csv"</span>, <span className="text-emerald-300">"r"</span>, newline=<span className="text-emerald-300">""</span>) <span className="text-purple-400">as</span> f:</p>
            <p className="pl-8">reader = csv.reader(f)</p>
            <p className="pl-8 text-slate-400"># Skip header row</p>
            <p className="pl-8">header = next(reader)</p>
            <p className="pl-8"><span className="text-purple-400">for</span> row <span className="text-purple-400">in</span> reader:</p>
            <p className="pl-12"><span className="text-purple-400">if not</span> row: <span className="text-purple-400">continue</span>  <span className="text-slate-500"># Guard empty lines</span></p>
            <p className="pl-12">print(<span className="text-emerald-300">f"ID: </span>&#123;row[0]&#125;<span className="text-emerald-300"> | Name: </span>&#123;row[1]&#125;<span className="text-emerald-300"> | Salary: </span>&#123;row[2]&#125;<span className="text-emerald-300">"</span>)</p>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">csv_reader_traversal_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="csv_reader_traversal_lab.py"
            title="Complete CSV Traversal & Header Handling"
          />
        </div>

        {/* 5. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Common Pitfall: Printing the Reader Object Directly
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-red-400">Don't Do This in Board Exams:</p>
            <p className="text-slate-300 font-mono">
              print(csv.reader(f))
            </p>
            <p className="text-slate-400 leading-relaxed">
              This outputs: <code className="text-red-400">&lt;_csv.reader object at 0x00000...&gt;</code>! Beginners often think csv.reader() returns the file contents. You must iterate through it using a <code className="text-emerald-300">for row in reader:</code> loop!
            </p>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Whenever you write a reading function in CBSE examinations, always check whether the question states 'assuming the first line contains the header'. If so, calling next(reader) is mandatory before your loop. If you forget next(reader), your program will try to cast column headers like 'Marks' into float('Marks'), throwing an immediate ValueError!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_csv_reading_methods.txt"
          title="Download Topic 5 Concise Revision Notes"
        />

        {/* 8. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
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