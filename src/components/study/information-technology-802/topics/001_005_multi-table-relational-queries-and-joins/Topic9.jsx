import React, { useState } from 'react';
import { 
  Award, CheckCircle2, XCircle, Clock, AlertTriangle, 
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw, Sparkles, ChevronRight, ChevronLeft, Layers, Terminal, Play 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

export default function Topic9() {
  const [activeSection, setActiveSection] = useState('mcq');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Live Join Query Sandbox State
  const [filterClass, setFilterClass] = useState('All');
  const [sortOrder, setSortOrder] = useState('ASC');

  const studentData = [
    { roll: 101, name: 'Amit Kumar', pid: 'P1', class: 'XII', father: 'Rajesh Kumar', phone: '9830011223' },
    { roll: 102, name: 'Susmita Roy', pid: 'P2', class: 'XI', father: 'Bimal Roy', phone: '9831122334' },
    { roll: 103, name: 'Debangshu Pal', pid: 'P3', class: 'XII', father: 'Chandan Pal', phone: '9832233445' },
    { roll: 104, name: 'Mamata Sharma', pid: 'P1', class: 'X', father: 'Rajesh Kumar', phone: '9830011223' },
    { roll: 105, name: 'Ajoy Sen', pid: 'P4', class: 'XII', father: 'Tapan Sen', phone: '9833344556' }
  ];

  const handleSelectOption = (qId, option) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQIndex(0);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) score++;
    });
    return score;
  };

  const currentQ = questions[currentQIndex];
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  const sandboxResults = studentData
    .filter(s => filterClass === 'All' || s.class === filterClass)
    .sort((a, b) => sortOrder === 'ASC' ? a.roll - b.roll : b.roll - a.roll);

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001_005 · Topic 9
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Interactive Examination Simulator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Practice your Skill here: 30-Question Multi-Table Joins Challenge
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your mastery of Module 005 with this authentic 30-mark interactive assessment covering Cartesian products, Equi-Joins, aliases, compound WHERE filters, and ORDER BY sorting.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'mcq', label: '1. 30 MCQs Exam Simulator', icon: Award },
            { id: 'sandbox', label: '2. Live Joins SQL Sandbox', icon: Terminal },
            { id: 'subjective', label: '3. Subjective Board Drills', icon: BookOpen },
            { id: 'faqs', label: '4. Practice FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Printable Notes', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={"flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer " + (
                  activeSection === tab.id
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

        {/* SECTION 1: 30 MCQ SIMULATOR */}
        {activeSection === 'mcq' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-sky-400 tracking-wider uppercase">
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded font-medium">
                      {currentQ.topic}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded font-medium">
                      {currentQ.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-400 font-medium">
                    Answered: <span className="text-white font-bold">{Object.keys(selectedAnswers).length}</span> / {questions.length}
                  </div>
                  {!submitted ? (
                    <button
                      onClick={() => setSubmitted(true)}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg transition cursor-pointer"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow-lg transition cursor-pointer"
                    >
                      <RefreshCw size={14} /> Retake Test
                    </button>
                  )}
                </div>
              </div>

              {submitted && (
                <div className="bg-gradient-to-r from-slate-900 to-sky-950/60 border border-sky-500/30 rounded-2xl p-6 text-center space-y-3">
                  <h3 className="text-xl font-extrabold text-white">Assessment Result</h3>
                  <div className="text-4xl font-black text-amber-400">{score} / {questions.length}</div>
                  <p className="text-xs text-slate-300">
                    Accuracy: <span className="font-bold text-sky-300">{percentage}%</span> &middot; {percentage >= 75 ? "Superb! Mastered Multi-Table Joins & Relational Queries." : "Keep revising the equi-join rules & aliases below!"}
                  </p>
                </div>
              )}

              {/* Question Text */}
              <div className="space-y-4">
                <div className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.question}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQ.id] === option;
                    const isCorrect = option === currentQ.answer;
                    let optionStyle = "bg-slate-900/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600";

                    if (submitted) {
                      if (isCorrect) {
                        optionStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        optionStyle = "bg-rose-500/20 border-rose-500 text-rose-200";
                      }
                    } else if (isSelected) {
                      optionStyle = "bg-sky-500/20 border-sky-500 text-sky-200 font-semibold shadow-md shadow-sky-500/10";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(currentQ.id, option)}
                        disabled={submitted}
                        className={"w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-150 flex items-start gap-3 cursor-pointer " + optionStyle}
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{option}</span>
                        {submitted && isCorrect && <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />}
                        {submitted && isSelected && !isCorrect && <XCircle className="text-rose-400 shrink-0 mt-0.5" size={18} />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanations */}
                {submitted && (
                  <div className="p-4 bg-slate-900 border border-slate-700/60 rounded-xl space-y-2 text-xs">
                    <div className="font-bold text-sky-400 flex items-center gap-1.5">
                      <Sparkles size={14} /> Explanation:
                    </div>
                    <p className="text-slate-300">{currentQ.explanation}</p>
                    {currentQ.explanationBn && (
                      <div className="text-emerald-300/90 pt-1 border-t border-slate-800 font-serif text-xs">
                        বাংলা ব্যাখ্যা: {currentQ.explanationBn}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQIndex === 0}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <span className="text-xs text-slate-500 font-medium">
                    {currentQIndex + 1} of {questions.length}
                  </span>
                  <button
                    onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    disabled={currentQIndex === questions.length - 1}
                    className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: LIVE SQL JOIN SANDBOX */}
        {activeSection === 'sandbox' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
                <Terminal size={20} />
                <span>Live Interactive STUDENT &times; PARENTS SQL Query Sandbox</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold">Filter by Class:</span>
                  <div className="flex gap-2">
                    {['All', 'X', 'XI', 'XII'].map(c => (
                      <button
                        key={c}
                        onClick={() => setFilterClass(c)}
                        className={"px-3 py-1 rounded text-xs font-bold cursor-pointer " + (
                          filterClass === c ? "bg-sky-500 text-white" : "bg-slate-950 text-slate-400 border border-slate-800"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold">Order by RollNo:</span>
                  <div className="flex gap-2">
                    {['ASC', 'DESC'].map(d => (
                      <button
                        key={d}
                        onClick={() => setSortOrder(d)}
                        className={"px-3 py-1 rounded text-xs font-bold cursor-pointer " + (
                          sortOrder === d ? "bg-emerald-500 text-white" : "bg-slate-950 text-slate-400 border border-slate-800"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Live Query */}
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-300">
                <code>{"SELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID" + (filterClass !== 'All' ? "\n  AND S.Class = '" + filterClass + "'" : "") + "\nORDER BY S.RollNo " + sortOrder + ";"}</code>
              </pre>

              {/* Output Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                      <th className="p-3 text-sky-400">RollNo</th>
                      <th className="p-3 text-sky-400">Student Name</th>
                      <th className="p-3">Class</th>
                      <th className="p-3 text-emerald-400">Father Name</th>
                      <th className="p-3 text-emerald-400">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    {sandboxResults.map(s => (
                      <tr key={s.roll} className="hover:bg-slate-900/40">
                        <td className="p-3 font-bold text-sky-300">#{s.roll}</td>
                        <td className="p-3 text-white font-semibold">{s.name}</td>
                        <td className="p-3">{s.class}</td>
                        <td className="p-3 text-slate-200">{s.father}</td>
                        <td className="p-3 text-slate-400">{s.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 3: SUBJECTIVE BOARD DRILLS */}
        {activeSection === 'subjective' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 text-sky-400">
                <BookOpen size={20} />
                <span>Subjective Board Examination Output & Query Practice</span>
              </h3>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-amber-400">Drill 1: Write SQL Query (2 Marks)</span>
                  <p className="text-slate-200">
                    "Write an SQL query to display the RollNo, Name, and Phone of all students in Class 'XII' whose Father Name ends with 'Kumar'."
                  </p>
                  <pre className="p-2 bg-slate-950 rounded text-emerald-300 font-mono text-xs">
                    <code>{"SELECT S.RollNo, S.Name, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND S.Class = 'XII'\n  AND P.FatherName LIKE '%Kumar';"}</code>
                  </pre>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-sky-400">Drill 2: Output Prediction (2 Marks)</span>
                  <p className="text-slate-200">
                    "Predict the output of: <code>SELECT COUNT(DISTINCT P.City) FROM STUDENT S, PARENTS P WHERE S.ParentID = P.ParentID;</code>"
                  </p>
                  <p className="text-emerald-300 font-bold">Output: 3 (Cities: Kolkata, Barrackpore, Shyamnagar)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: FAQS */}
        {activeSection === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 9 FAQs" questions={questions} />
          </div>
        )}

        {/* SECTION 5: NOTES */}
        {activeSection === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic9_Practice_Skill_Joins_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
