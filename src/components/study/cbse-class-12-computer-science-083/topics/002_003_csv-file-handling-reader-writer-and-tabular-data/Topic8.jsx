import React from 'react';
import {
  FolderKanban, PlusCircle, Eye, Search, Edit3, Trash2,
  CheckCircle2, AlertTriangle, HelpCircle, Layers, ArrowRight, Zap
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/csv_crud_system_lab.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · CSV Files · Topic 8
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Capstone Project Architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Menu-Driven Student Marks / Product Inventory CSV Management System
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Synthesize all CSV concepts into a robust, industry-grade menu-driven application. Implement modular Create, Read, Search, Update, and Delete (CRUD) operations adhering strictly to CBSE Class 12 examination rubrics.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <PlusCircle size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">1. Add Record</h4>
            <p className="text-xs text-slate-400">Open in 'a' mode, take input, call writer.writerow().</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Eye size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">2. Display All</h4>
            <p className="text-xs text-slate-400">Open in 'r' mode, skip header, tabular columnar alignment.</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 w-fit">
              <Search size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">3. Search Record</h4>
            <p className="text-xs text-slate-400">Match primary key, found boolean flag, early loop break.</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <Edit3 size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">4. Update Record</h4>
            <p className="text-xs text-slate-400">Read into memory list, modify row, rewrite with writerows().</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400 w-fit">
              <Trash2 size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">5. Delete Record</h4>
            <p className="text-xs text-slate-400">Filter out matching row, rewrite file with remaining records.</p>
          </div>
        </div>

        {/* 3. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">csv_crud_system_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="csv_crud_system_lab.py"
            title="Complete Menu-Driven CRUD CSV Management System"
          />
        </div>

        {/* 4. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Critical Update / Delete Pitfall
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-red-400">Why in-place updates fail on CSV:</p>
            <p className="text-slate-400 leading-relaxed">
              Unlike fixed-length binary records, CSV records are variable-length text strings. If you try to update <code className="text-slate-200">"101,Roy,90"</code> with <code className="text-slate-200">"101,Bhattacharya,98.5"</code>, the new string is longer and overwrites the start of the next row!
            </p>
            <p className="text-emerald-400 font-semibold pt-1">
              Golden Pattern: Always load records into a list, update the matched item, and rewrite the file completely using <code className="text-emerald-300">writerows()</code>!
            </p>
          </div>
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="For your Class 12 board practical project, organizing your script into clear functions (Add, ShowAll, Search, Modify, Remove) with a while True menu guarantees maximum presentation marks. External examiners love seeing defensive programming—handling empty files and displaying friendly error messages!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_csv_menu_driven_system.txt"
          title="Download Topic 8 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400">
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