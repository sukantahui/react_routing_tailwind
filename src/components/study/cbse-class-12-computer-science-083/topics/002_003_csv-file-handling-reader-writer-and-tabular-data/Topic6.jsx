import React from 'react';
import {
  Filter, Search, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Target, Columns
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/csv_filtering_extraction_lab.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · CSV Files · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Search &amp; Projection
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Filtering &amp; Extracting Specific Columns from CSV Records
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the heart of board examination CSV questions: searching records by primary key, filtering rows by numeric thresholds, performing case-insensitive string lookups, and projecting specific columns.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-blue-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 w-fit">
              <Search size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Primary Key Search</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Matching unique roll numbers or admission codes. Utilize a boolean <code className="text-blue-300">found = False</code> flag and <code className="text-blue-300">break</code> once matched.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <Filter size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Threshold Filtering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Checking <code className="text-emerald-300">float(row[3]) &gt;= 90.0</code>. Type casting is mandatory because CSV parses all values as strings.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
              <Columns size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Column Projection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Selecting only required fields like <code className="text-purple-300">print(row[1], row[3])</code> instead of cluttering output with all columns.
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
            <span className="text-xs text-slate-400 font-mono">csv_filtering_extraction_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="csv_filtering_extraction_lab.py"
            title="Filtering, Searching & Column Projection Mechanics"
          />
        </div>

        {/* 4. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Board Examination Traps in Filtering
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: String comparison of numbers</p>
              <p className="text-slate-400">
                In string comparison: <code className="text-red-400">'9' &gt; '80'</code> evaluates to <strong className="text-red-400">True</strong> because characters are compared lexicographically! Always convert: <code className="text-emerald-300">float(row[3]) &gt; 80</code>!
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Forgetting the 'Not Found' flag</p>
              <p className="text-slate-400">
                If the search key does not exist and you haven't implemented a <code className="text-amber-300">found = False</code> tracker, nothing prints. CBSE examiners deduct 1 mark for missing failure feedback.
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
          tip="In 3-mark board questions like 'Write a function SearchRecord(stream) to display details of students enrolled in that stream', make sure you handle case variations by using stream.upper() == row[2].upper(). Also, maintain a match counter: if matches == 0, print 'No records found'. These small details guarantee 100% marks!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_csv_filtering_rules.txt"
          title="Download Topic 6 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
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