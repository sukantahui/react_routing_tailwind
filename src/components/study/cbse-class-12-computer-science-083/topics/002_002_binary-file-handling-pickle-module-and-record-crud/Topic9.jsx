import React from 'react';
import {
  Cpu, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Terminal, Database, Play, Check, X, Award
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/menu_driven_binary_crud_lab.py?raw";

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 9
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Capstone CRUD Architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Complete Menu-Driven Binary File Management System (Create, Display, Search, Update, Delete)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Integrate all five binary file operations into a production-grade, modular CLI application. Master the Capstone Project architecture tested in CBSE Class 12 practical examinations (8 Marks).
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: 5 CRUD Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-4 bg-slate-950/80 border border-emerald-500/30 rounded-xl space-y-1">
            <span className="font-bold text-emerald-400 font-mono">1. CREATE</span>
            <p className="text-slate-400">Mode: <code>'ab'</code></p>
            <p className="text-slate-500">Appends dictionary records sequentially.</p>
          </div>
          <div className="p-4 bg-slate-950/80 border border-sky-500/30 rounded-xl space-y-1">
            <span className="font-bold text-sky-400 font-mono">2. READ</span>
            <p className="text-slate-400">Mode: <code>'rb'</code></p>
            <p className="text-slate-500">Traverses database via EOFError loop.</p>
          </div>
          <div className="p-4 bg-slate-950/80 border border-purple-500/30 rounded-xl space-y-1">
            <span className="font-bold text-purple-400 font-mono">3. SEARCH</span>
            <p className="text-slate-400">Mode: <code>'rb'</code></p>
            <p className="text-slate-500">Linear search with found flag &amp; break.</p>
          </div>
          <div className="p-4 bg-slate-950/80 border border-amber-500/30 rounded-xl space-y-1">
            <span className="font-bold text-amber-400 font-mono">4. UPDATE</span>
            <p className="text-slate-400">Mode: <code>'rb' + 'wb'</code></p>
            <p className="text-slate-500">Staging file pattern for safe rewriting.</p>
          </div>
          <div className="p-4 bg-slate-950/80 border border-rose-500/30 rounded-xl space-y-1">
            <span className="font-bold text-rose-400 font-mono">5. DELETE</span>
            <p className="text-slate-400">Mode: <code>'rb' + 'wb'</code></p>
            <p className="text-slate-500">Exclusion filtering via staging file.</p>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: Menu Loop Architecture */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> Modular Menu Dispatcher Architecture
          </h3>
          <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-1.5 border border-slate-800">
            <p className="text-purple-400 font-bold">while True:</p>
            <p className="pl-4">display_menu_options()</p>
            <p className="pl-4">choice = input("Enter choice (1-6): ").strip()</p>
            <p className="pl-4 text-emerald-400 font-bold">if choice == '1': add_record()</p>
            <p className="pl-4 text-sky-400 font-bold">elif choice == '2': display_all()</p>
            <p className="pl-4 text-purple-400 font-bold">elif choice == '3': search_record()</p>
            <p className="pl-4 text-amber-400 font-bold">elif choice == '4': update_marks()</p>
            <p className="pl-4 text-rose-400 font-bold">elif choice == '5': delete_record()</p>
            <p className="pl-4 text-slate-400 font-bold">elif choice == '6': break</p>
            <p className="pl-4 text-red-400">else: print("Invalid Choice! Please enter 1-6.")</p>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal size={18} className="text-purple-400" /> Complete CRUD System Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">menu_driven_binary_crud_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="menu_driven_binary_crud_lab.py"
            highlightLines={[12, 34, 57, 85, 114]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Writing all logic in one massive 200-line function without modular abstraction.</li>
              <li>• Not validating numeric inputs, causing process crashes when users type letters.</li>
              <li>• Forgetting <code>break</code> on Option 6, creating an inescapable loop!</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Use string comparison (<code>choice == '1'</code>) to avoid <code>ValueError</code> on input.</li>
              <li>• Check <code>os.path.exists()</code> in Read/Search/Update/Delete functions.</li>
              <li>• Display formatted column headers with f-string width specifiers.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Class 12 Practical Examination Standard (8 Marks)
          </h4>
          <p>
            In your practical exam, the external examiner will ask you to demonstrate running your code in Python IDLE. Having a clean menu-driven structure with options 1 through 6 impresses examiners immediately and ensures full 8/8 marks!
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 9 FAQs: Menu-Driven CRUD System"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 9 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic9_menu_crud.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="To all my students at Coder & AccoTax: This menu-driven binary program is the crown jewel of Unit I! When Mamata, Mahima, and Susmita sit for their practical examination, this exact program structure will guarantee maximum marks. Copy this script and run it locally! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
