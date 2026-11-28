import React from 'react';
import {
  FileText, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, ShieldAlert, MonitorCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/csv_newline_handling_lab.py?raw";

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · CSV Files · Topic 2
              </span>
              <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-semibold rounded-full">
                Crucial Board Concept
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Opening CSV Files: Importance of <code className="text-amber-300 font-mono">newline=''</code> Parameter to Prevent Blank Lines
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Why does Excel or Notepad show an empty blank line between every row when created on Windows? Master universal newline translation mechanics and how <code className="text-amber-300 font-mono">newline=''</code> completely cures the blank line anomaly.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
              <ShieldAlert size={18} /> Without newline='' (Flawed Flow)
            </h3>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-1.5 border border-red-500/20">
              <p>csv.writer writes: <span className="text-amber-300">"101,Aarav\r\n"</span></p>
              <p className="text-slate-500">  ↓ Python text mode translates '\n' to '\r\n'</p>
              <p>Disk receives: <span className="text-red-400">"101,Aarav\r\r\n"</span></p>
              <p className="text-red-400 font-bold">Result: 
 creates an unwanted BLANK ROW in Excel/Notepad!</p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <MonitorCheck size={18} /> With newline='' (Clean Standard Flow)
            </h3>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-1.5 border border-emerald-500/20">
              <p>csv.writer writes: <span className="text-amber-300">"101,Aarav\r\n"</span></p>
              <p className="text-slate-500">  ↓ Universal newline translation is SUPPRESSED</p>
              <p>Disk receives: <span className="text-emerald-400">"101,Aarav\r\n"</span></p>
              <p className="text-emerald-400 font-bold">Result: Perfectly packed consecutive tabular records!</p>
            </div>
          </div>
        </div>

        {/* 3. Detailed Theory */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-amber-400" size={22} />
            Why Does This Happen on Windows Specifically?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm">Operating System Line Ending Differences:</h4>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-slate-400">
                <li><strong className="text-slate-200">Windows OS:</strong> Uses Carriage Return + Line Feed (<code className="text-amber-300">
</code> - ASCII 13 followed by ASCII 10).</li>
                <li><strong className="text-slate-200">Linux / macOS:</strong> Uses single Line Feed (<code className="text-amber-300">
</code> - ASCII 10).</li>
                <li><strong className="text-slate-200">Python default text mode:</strong> Automatically translates <code className="text-amber-300">
</code> to the host OS format.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm">The Collision with csv.writer:</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Python's <code className="text-emerald-300">csv.writer</code> already knows about Excel and adheres to RFC 4180 by appending <code className="text-emerald-300">
</code> to every row. If you leave universal newline translation on (<code className="text-red-400">newline=None</code>), Python interprets the <code className="text-emerald-300">
</code> inside the <code className="text-emerald-300">
</code> and converts it into another <code className="text-red-400">
</code>, producing <code className="text-red-400">
</code>!
              </p>
            </div>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">csv_newline_handling_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="csv_newline_handling_lab.py"
            title="Demonstrating the Impact of newline='' on Disk Bytes"
          />
        </div>

        {/* 5. Board Traps & Rules */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            CBSE Examination Marking Rubric Alert
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-amber-400">Board Marking Scheme Notice:</p>
            <p className="text-slate-400 leading-relaxed">
              When writing a user-defined function for CSV writing (e.g. <code className="text-emerald-300">def AddRecord():</code>), CBSE examiners specifically look for <code className="text-amber-300">open("file.csv", "w", newline="")</code> or <code className="text-amber-300">open("file.csv", "a", newline="")</code>. Omitting <code className="text-amber-300">newline=""</code> can lead to a ½ mark deduction! Always write it by muscle memory.
            </p>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Here is the golden rule for CBSE Class 12: Whenever you write open() for CSV files, always include newline=''. When writing, it prevents blank lines; when reading, it allows multi-line quoted fields to parse properly. Make this a permanent programming habit."
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_csv_newline_rules.txt"
          title="Download Topic 2 Concise Revision Notes"
        />

        {/* 8. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
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