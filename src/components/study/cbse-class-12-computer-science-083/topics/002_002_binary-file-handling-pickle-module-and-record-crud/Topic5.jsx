import React from 'react';
import {
  Database, Layers, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, ArrowRight, ListPlus, FolderTree, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/complex_records_storage_lab.py?raw";

export default function Topic5() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Database Schema Design
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Writing Complex Data: Storing Lists of Dictionaries and Nested Records
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore advanced schema design for binary persistence. Compare sequential record streaming versus container list serializations, manage nested dictionary hierarchies, and perform statistical aggregations.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: Two Core Patterns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <Layers size={18} /> Pattern A: Sequential Record Dumps
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Each record dictionary is pickled individually. Allows appending new records to disk without loading existing records into RAM.
            </p>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-purple-300 space-y-1">
              <p>for rec in records: pickle.dump(rec, f)</p>
              <p className="text-slate-500"># Read with try ... while True ... except EOFError</p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <ListPlus size={18} /> Pattern B: Container List Dump
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All records are stored in a single Python list. One <code>pickle.dump(list, f)</code> call writes everything; one <code>pickle.load(f)</code> retrieves all.
            </p>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-sky-300 space-y-1">
              <p>pickle.dump(students_list, f) # Single call</p>
              <p className="text-slate-500"># Read with students = pickle.load(f)</p>
            </div>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: Nested Dictionary Schema */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <FolderTree size={18} /> Real-World CBSE Student Record Schema
          </h3>
          <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-1.5 border border-slate-800">
            <p className="text-purple-400 font-bold">student_record = &#123;</p>
            <p className="pl-4">"roll": <span className="text-amber-300">101</span>,</p>
            <p className="pl-4">"name": <span className="text-emerald-300">"Mamata"</span>,</p>
            <p className="pl-4">"locality": <span className="text-emerald-300">"Barrackpore"</span>,</p>
            <p className="pl-4">"marks": [<span className="text-amber-300">96</span>, <span className="text-amber-300">98</span>, <span className="text-amber-300">92</span>], <span className="text-slate-500"># Nested list</span></p>
            <p className="pl-4">"is_eligible": <span className="text-sky-300">True</span></p>
            <p className="text-purple-400 font-bold">&#125;</p>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database size={18} className="text-purple-400" /> Complex Records Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">complex_records_storage_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="complex_records_storage_lab.py"
            highlightLines={[21, 30, 44, 49]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Mixing Pattern A and Pattern B in the same file, causing unpickling schema confusion.</li>
              <li>• Accessing nested keys without checking existence, triggering <code>KeyError</code>.</li>
              <li>• Forgetting that <code>pickle.load()</code> on a container list returns a list, not individual dictionaries.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• In CBSE board exams, stick to <strong>Pattern A (Sequential individual dumps)</strong> unless specified otherwise.</li>
              <li>• Use <code>dict.get('key', default)</code> for safe access to optional fields.</li>
              <li>• When averaging lists of marks, use <code>sum(marks) / len(marks)</code>.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Structure
          </h4>
          <p>
            CBSE questions typically specify: "A binary file <code>STUDENT.DAT</code> has structure <code>[RollNo, Name, Marks]</code>." Representing each record as a dictionary <code>&#123;'roll': r, 'name': n, 'marks': m&#125;</code> and pickling sequentially is the industry and board gold standard.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 5 FAQs: Complex Records Storage"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 5 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic5_complex_records.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="To all students at Barrackpore: Storing records as dictionaries makes searching and filtering incredibly intuitive! When we build Search, Update, and Delete in the upcoming topics, you will see how easy it is to test rec['roll'] == search_roll. Master this schema! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
