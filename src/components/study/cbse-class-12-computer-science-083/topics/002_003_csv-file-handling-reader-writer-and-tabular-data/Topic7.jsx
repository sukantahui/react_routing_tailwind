import React from 'react';
import {
  Calculator, TrendingUp, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Sigma, Award
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/csv_math_aggregations_lab.py?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · CSV Files · Topic 7
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Mathematical Analysis
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mathematical Aggregations on CSV Data (Sum, Average, Min, Max Calculations)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Transform raw tabular rows into actionable statistical insights. Learn to calculate column totals, class averages, identify top and lowest performers, and protect against zero-division errors in Python.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <Sigma size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Sum / Total</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accumulates numeric values: <code className="text-emerald-300">total += float(row[3])</code>. Initialize outside loop.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Calculator size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Mean / Average</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-sky-300">total / count</code>. Always guard with <code className="text-sky-300">if count &gt; 0:</code> to prevent crash on empty file.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <Award size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Maximum / Top Scorer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track both score and name: <code className="text-amber-300">if val &gt; max_val: max_val = val; topper = row[1]</code>.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Minimum / Lowest</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Initialize with <code className="text-purple-300">float('inf')</code> so any real value replaces it on first encounter.
            </p>
          </div>
        </div>

        {/* 3. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">csv_math_aggregations_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="csv_math_aggregations_lab.py"
            title="Single-Pass Statistical Aggregations on CSV Dataset"
          />
        </div>

        {/* 4. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Critical Trap: ZeroDivisionError &amp; Header Omission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Omission of next(reader)</p>
              <p className="text-slate-400">
                Attempting to cast <code className="text-red-400">float("Salary")</code> or <code className="text-red-400">float("Marks")</code> in the header row will crash your program with <code className="text-red-400 font-bold">ValueError</code> immediately! Always skip the header with <code className="text-emerald-300">next(reader)</code> before starting arithmetic.
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Division by Zero</p>
              <p className="text-slate-400">
                If the file has only a header and no data rows, <code className="text-amber-300">count</code> will be 0. Direct calculation <code className="text-red-400">avg = total / count</code> crashes with <code className="text-red-400 font-bold">ZeroDivisionError</code>. Guard with <code className="text-emerald-300">if count &gt; 0:</code>!
              </p>
            </div>
          </div>
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In practical examination questions where you are asked to compute average marks or total sales, perform all aggregations in one single loop traversal. It demonstrates algorithmic maturity to the external examiner and ensures optimal O(N) performance!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_csv_aggregations.txt"
          title="Download Topic 7 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
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