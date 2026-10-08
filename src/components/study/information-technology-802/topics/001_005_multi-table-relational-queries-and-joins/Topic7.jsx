import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, Award, Target 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

const BoardProblemSolver = () => {
  const [selectedProblem, setSelectedProblem] = useState(0);

  const problems = [
    {
      year: 'CBSE 2023 Board Paper',
      question: "To display Student Name, Class, and Father Name of all students whose Father's name starts with 'R'.",
      solution: "SELECT S.Name, S.Class, P.FatherName\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND P.FatherName LIKE 'R%';",
      output: [
        { name: 'Amit Kumar', class: 'XII', father: 'Rajesh Kumar' },
        { name: 'Mamata Sharma', class: 'X', father: 'Rajesh Kumar' }
      ]
    },
    {
      year: 'CBSE 2022 Term-2 Board Paper',
      question: "To display Student RollNo, Name, and Parent Contact Number for all students having Marks > 90 in descending order of marks.",
      solution: "SELECT S.RollNo, S.Name, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND S.Marks > 90\nORDER BY S.Marks DESC;",
      output: [
        { roll: 103, name: 'Debangshu Pal', phone: '9832233445', marks: 95.00 },
        { roll: 101, name: 'Amit Kumar', phone: '9830011223', marks: 92.50 },
        { roll: 104, name: 'Mamata Sharma', phone: '9830011223', marks: 91.00 }
      ]
    },
    {
      year: 'CBSE Sample Paper 2024',
      question: "To count total number of students enrolled under each Parent Father Name.",
      solution: "SELECT P.FatherName, COUNT(S.RollNo) AS TotalChildren\nFROM PARENTS P, STUDENT S\nWHERE P.ParentID = S.ParentID\nGROUP BY P.FatherName;",
      output: [
        { father: 'Rajesh Kumar', count: 2 },
        { father: 'Bimal Roy', count: 1 },
        { father: 'Chandan Pal', count: 1 },
        { father: 'Tapan Sen', count: 1 }
      ]
    }
  ];

  const current = problems[selectedProblem];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Target size={20} />
          <span>CBSE Board Examination Multi-Table Query Solver</span>
        </div>

        {/* Problem Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {problems.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedProblem(idx)}
              className={"px-4 py-2 rounded-xl text-xs font-bold cursor-pointer " + (
                selectedProblem === idx 
                  ? "bg-sky-500 text-white shadow-lg" 
                  : "bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
              )}
            >
              {p.year}
            </button>
          ))}
        </div>

        {/* Question Statement */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Board Question Statement</span>
          <p className="text-sm font-semibold text-white leading-relaxed">{current.question}</p>
        </div>

        {/* Verified Solution Code */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Standard Model Solution (Full Marks)</span>
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-300">
            <code>{current.solution}</code>
          </pre>
        </div>

        {/* Expected Output Table */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Predicted Query Output</span>
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-2">
            <pre className="text-xs font-mono text-slate-300 p-2 leading-relaxed">
              {JSON.stringify(current.output, null, 2)}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic7() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001_005 · Topic 7
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                Board Question Drills
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Solving Board Exam Multi-Table Query Problems with Complete Precision
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master step-by-step techniques to write flawless multi-table SQL queries and accurately predict query outputs in CBSE Class XII Board Examinations.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Board Problem Drills', icon: BookOpen },
            { id: 'code', label: '2. Past Papers Benchmark', icon: Code },
            { id: 'pitfalls', label: '3. Board Tips & Pitfalls', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Plain Text Notes', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={"flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer " + (
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                )}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1 */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <BoardProblemSolver />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="When predicting query output in board exams, draw the joined table on your rough sheet by matching the common keys first, apply the WHERE filter row-by-row, and finally project the requested columns!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                <Terminal size={18} />
                <span>Past 5 Years CBSE Board Multi-Table Queries</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Problem 1: Output Prediction\nSELECT S.Name, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND S.Class = 'XII';\n\n-- Problem 2: Query Writing with Pattern Matching\nSELECT S.RollNo, S.Name, P.FatherName\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND P.Phone LIKE '9830%';"}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3 */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <p>• <strong>Output Table Headers:</strong> In board answer sheets, always write column headers exactly as they appear in the SELECT clause (e.g. <code>S.Name</code> or alias <code>StudentName</code>).</p>
                <p>• <strong>String Match Precision:</strong> Remember that SQL strings are sensitive to exact spacing.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 7 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic7_Board_Exam_MultiTable_Problems_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
