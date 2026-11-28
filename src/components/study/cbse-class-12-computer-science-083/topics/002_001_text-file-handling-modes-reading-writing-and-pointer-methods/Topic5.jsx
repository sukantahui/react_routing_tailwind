import React from 'react';
import {
  PenTool, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, FileText, Check, X, Flame
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/writing_methods_lab.py?raw";

export default function Topic5() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · File Handling · Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Output Mechanics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Writing to Text Files: write() vs writelines() &amp; Handling Newline Characters
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master file writing methods in Python. Uncover the infamous <code>writelines()</code> delimiter pitfall, understand string conversion rules, and harness <code>print(file=f)</code> for formatted persistent output.
            </p>
          </div>
        </div>

        {/* 2. Visual Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-sky-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <PenTool size={18} /> Method 1: f.write(string)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>• <span className="font-semibold text-white">String Input Only:</span> Passing numbers raises <code>TypeError</code>. Use <code>str(num)</code>.</li>
              <li>• <span className="font-semibold text-white">No Automatic Newline:</span> Must append <code>'\n'</code> explicitly, or lines will glue together.</li>
              <li>• <span className="font-semibold text-white">Return Value:</span> Evaluates to the integer count of characters written.</li>
            </ul>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-sky-300">
              chars = f.write("Score: " + str(95) + "\n")
            </div>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <Layers size={18} /> Method 2: f.writelines(iterable)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>• <span className="font-semibold text-white">Iterable of Strings:</span> Accepts lists, tuples, or generators of strings.</li>
              <li>• <span className="font-semibold text-rose-400">THE NOTORIOUS TRAP:</span> Does NOT insert newlines between items automatically!</li>
              <li>• <span className="font-semibold text-white">Correct Pattern:</span> Must append <code>'\n'</code> to each item in list comprehension.</li>
            </ul>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-purple-300">
              f.writelines([x + "\n" for x in student_list])
            </div>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: The writelines Trap */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
            <Flame size={18} /> The Infamous CBSE writelines() Trap (Board Exam Favorite)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl space-y-2">
              <span className="font-bold text-red-400">Common Student Mistake</span>
              <div className="p-2 bg-slate-900 rounded font-mono text-slate-300">
                L = ['Mamata', 'Susmita', 'Mahima']<br />
                f.writelines(L)
              </div>
              <p className="text-slate-400">
                <strong>Result on Disk:</strong> <code className="text-red-300">"MamataSusmitaMahima"</code><br />
                All names are glued into one unbroken string with ZERO spaces or line breaks!
              </p>
            </div>
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
              <span className="font-bold text-emerald-400">Correct Board Solution</span>
              <div className="p-2 bg-slate-900 rounded font-mono text-slate-300">
                L = ['Mamata', 'Susmita', 'Mahima']<br />
                f.writelines([x + '\n' for x in L])
              </div>
              <p className="text-slate-400">
                <strong>Result on Disk:</strong> Three distinct lines with clean terminal newline characters!
              </p>
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-sky-400" /> Writing Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">writing_methods_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="writing_methods_lab.py"
            highlightLines={[15, 20, 31, 41]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Passing an integer to <code>f.write(score)</code> instead of <code>f.write(str(score))</code>.</li>
              <li>• Expecting <code>writelines()</code> to add newlines between elements.</li>
              <li>• Opening in <code>'w'</code> mode to add new records, inadvertently destroying all prior contents.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Use formatted string literals (f-strings) like <code>f.write(f"&#123;name&#125;|&#123;roll&#125;\n")</code>.</li>
              <li>• Leverage <code>print("Record", file=f)</code> when you want automatic string conversion and newline addition.</li>
              <li>• Explicitly flush or close to ensure written lines don't stay trapped in RAM buffers.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Question
          </h4>
          <p>
            "Write a function <code>ADD_REC(RollNo, Name, Marks)</code> to write records of students to a text file <code>STUDENT.TXT</code>. Each record should be stored on a separate line with values separated by commas." Remember to concatenate <code>str(RollNo) + ',' + Name + ',' + str(Marks) + '\n'</code>!
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 5 FAQs: File Writing Methods"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 5 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic5_writing_methods.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Remember this rule for the board exam: write() takes ONE string; writelines() takes a LIST of strings. Neither adds a newline automatically! You must supply \n yourself. Keep this in mind when solving Section C 3-mark file handling questions. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
