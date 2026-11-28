import React from 'react';
import {
  Search, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, UserCheck, Database, Filter
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/binary_search_records_lab.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 6
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Core CRUD Query
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Searching Records: Locating Records by Roll Number, Employee ID, or Name
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master sequential record querying in binary files. Implement linear search traversal, utilize the <code>found</code> tracking flag, differentiate unique vs non-unique queries, and handle missing record boundaries gracefully.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: Unique vs Non-Unique */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <UserCheck size={18} /> Unique Key Search (Roll No / ID)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When searching by a primary key (like Roll Number), execute <code>break</code> immediately upon discovering the match to skip remaining file bytes.
            </p>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-sky-300 space-y-1">
              <p>if rec['roll'] == search_roll:</p>
              <p className="pl-4">print(rec); found = True; <strong className="text-white">break</strong></p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <Filter size={18} /> Non-Unique Query (City / Stream)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When multiple students can match (e.g. City = 'Barrackpore'), <strong className="text-purple-300">DO NOT BREAK</strong>! Traverse until <code>EOFError</code> to display all matching entries.
            </p>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-purple-300 space-y-1">
              <p>if rec['city'].lower() == target.lower():</p>
              <p className="pl-4">print(rec); matches += 1 <strong className="text-slate-400"># No break!</strong></p>
            </div>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: Found Flag Pattern */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> The 'found = False' Flag Pattern (Anti-Pitfall Design)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl space-y-2">
              <span className="font-bold text-red-400">Deadly Student Mistake</span>
              <div className="p-2 bg-slate-900 rounded font-mono text-slate-300">
                if rec['roll'] == target:<br />
                &nbsp;&nbsp;print(rec)<br />
                else:<br />
                &nbsp;&nbsp;print("Not Found!") <span className="text-red-400"># WRONG!</span>
              </div>
              <p className="text-slate-400">
                This prints "Not Found!" for <strong>every single student</strong> in the file who isn't the target before finally reaching the match!
              </p>
            </div>
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
              <span className="font-bold text-emerald-400">Correct Board Solution</span>
              <div className="p-2 bg-slate-900 rounded font-mono text-slate-300">
                found = False<br />
                # Loop through all records...<br />
                if rec['roll'] == target: found = True; break<br />
                # AFTER loop finishes:<br />
                if not found: print("Record Not Found!")
              </div>
              <p className="text-slate-400">
                Guarantees the "Not Found" message is printed <strong>exactly once</strong> only if the key was truly absent across the entire file.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Search size={18} className="text-purple-400" /> Binary Search Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">binary_search_records_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="binary_search_records_lab.py"
            highlightLines={[27, 28, 29, 31, 50]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Putting <code>else: print("Not found")</code> inside the while loop.</li>
              <li>• Forgetting <code>found = True</code> when a match occurs.</li>
              <li>• Breaking out of the loop when searching by non-unique fields like City or Subject.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Open exclusively in <code>'rb'</code> mode for search functions.</li>
              <li>• Use <code>.lower()</code> on string keys to ensure case-insensitive matching.</li>
              <li>• Always test <code>if not found:</code> outside the loop after EOF.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Practical Examination Standard (Program #4)
          </h4>
          <p>
            "Search for a given roll number in <code>STUDENT.DAT</code> and display name and marks. If not found, display appropriate message." This is the official CBSE practical syllabus program! Master the <code>found = False</code> pattern to get full marks.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 6 FAQs: Searching Binary Records"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 6 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic6_binary_search.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="To Mamata and Mahima: When writing the search function in your board exam paper, remember where 'if not found:' goes! It belongs AFTER the loop, outside the while block. Placing it inside is the #1 mistake students make. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
