import React from 'react';
import {
  PenTool, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, ListPlus, FileSpreadsheet
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/csv_writer_operations_lab.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · CSV Files · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Output Mechanics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Writing to CSV Files: <code className="text-teal-300 font-mono">csv.writer()</code>, <code className="text-teal-300 font-mono">writerow()</code> &amp; <code className="text-teal-300 font-mono">writerows()</code>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the exact techniques for exporting Python data structures into persistent CSV spreadsheets. Learn when to use single-row <code className="text-teal-300 font-mono">writerow()</code> versus batch matrix <code className="text-teal-300 font-mono">writerows()</code>.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-teal-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-teal-400 flex items-center gap-2">
              <PenTool size={18} /> writerow(1D_sequence)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accepts a single list or tuple. Writes exactly ONE line to the CSV file with comma delimiters between items.
            </p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 border border-teal-500/20">
              <p className="text-teal-400"># Input: 1D List</p>
              <p>writer.writerow([101, 'Tanmay', 95.5])</p>
              <p className="text-slate-500 mt-1"># File Output:</p>
              <p className="text-emerald-300">101,Tanmay,95.5
</p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <ListPlus size={18} /> writerows(2D_matrix)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accepts a sequence of sequences (list of lists). Writes multiple records in a single high-efficiency call.
            </p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 border border-sky-500/20">
              <p className="text-sky-400"># Input: 2D Nested List</p>
              <p>data = [[101, 'A', 90], [102, 'B', 85]]</p>
              <p>writer.writerows(data)</p>
              <p className="text-slate-500 mt-1"># File Output: 2 Consecutive Lines</p>
              <p className="text-emerald-300">101,A,90
102,B,85
</p>
            </div>
          </div>
        </div>

        {/* 3. Deep Dive into Syntax & Append Mode */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-teal-400" size={22} />
            Write Mode ('w') vs Append Mode ('a') in Board Examination Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-sky-400">Creating a New CSV with Header ('w' Mode):</h4>
              <pre className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto">
{`with open("students.csv", "w", newline="") as f:
    writer = csv.writer(f)
    # Write column names first
    writer.writerow(["RollNo", "Name", "Marks"])
    # Write initial data
    writer.writerow([101, "Aarav", 98])`}
              </pre>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-400">Appending New Records ('a' Mode):</h4>
              <pre className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto">
{`with open("students.csv", "a", newline="") as f:
    writer = csv.writer(f)
    # Do NOT write header again!
    writer.writerow([102, "Diya Sen", 94])`}
              </pre>
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
            <span className="text-xs text-slate-400 font-mono">csv_writer_operations_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="csv_writer_operations_lab.py"
            title="writerow() vs writerows() Practical Implementation"
          />
        </div>

        {/* 5. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Fatal Board Examination Trap: Passing 1D List to writerows()
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-red-400">Disastrous Output Warning:</p>
            <p className="text-slate-300">
              If you write <code className="text-red-400">writer.writerows([101, 'Aarav', 95])</code>:
            </p>
            <p className="text-slate-400 leading-relaxed font-mono">
              Python iterates over each item in the list! Since 'Aarav' is a string of characters, it iterates over each character, writing 'A','a','r','a','v' as individual rows!
            </p>
            <p className="text-emerald-400 font-semibold pt-1">
              Correct Rule: Use <code className="text-teal-300">writerow()</code> for 1 row. Use <code className="text-teal-300">writerows()</code> only when you have a list of lists!
            </p>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In 3-mark questions where you are asked to write a function 'CreateStudentCSV()', remember that taking input in a while loop and calling writerow() inside each iteration is much simpler and more memory-friendly than storing everything in a giant 2D list for writerows(). Both are valid, but row-by-row writing protects data if the program halts unexpectedly!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_csv_writing_methods.txt"
          title="Download Topic 3 Concise Revision Notes"
        />

        {/* 8. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/10 rounded-xl text-teal-400">
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