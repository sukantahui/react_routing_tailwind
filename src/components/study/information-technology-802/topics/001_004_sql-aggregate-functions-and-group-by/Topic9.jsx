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

  // Live GROUP BY Sandbox State
  const [selectedStream, setSelectedStream] = useState('All');
  const studentData = [
    { roll: 101, name: 'Amit Kumar', stream: 'Science', marks: 92.50 },
    { roll: 102, name: 'Susmita Roy', stream: 'Science', marks: 88.00 },
    { roll: 103, name: 'Debangshu Pal', stream: 'Commerce', marks: 95.00 },
    { roll: 104, name: 'Mamata Sharma', stream: 'Commerce', marks: 91.00 },
    { roll: 105, name: 'Ajoy Sen', stream: 'Humanities', marks: 78.50 }
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

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 004 · Topic 9
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Interactive Examination Simulator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Practice your Skill here: 30-Question Aggregate & GROUP BY Challenge
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your mastery of Module 004 with this authentic 30-mark interactive assessment covering SUM, AVG, MIN, MAX, COUNT(*), GROUP BY, and HAVING rules.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'mcq', label: '1. 30 MCQs Exam Simulator', icon: Award },
            { id: 'sandbox', label: '2. Live GROUP BY Sandbox', icon: Terminal },
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
                    Accuracy: <span className="font-bold text-sky-300">{percentage}%</span> · {percentage >= 75 ? "🎉 Superb! Mastered SQL Aggregate Functions & GROUP BY." : "Keep revising the notes & HAVING rules below!"}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {currentQ.question}
                </h3>
                {currentQ.hint && !submitted && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
                    💡 <strong>Hint:</strong> {currentQ.hint}
                  </div>
                )}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentQ.id] === opt;
                    const isCorrect = submitted && opt === currentQ.answer;
                    const isWrong = submitted && isSelected && !isCorrect;

                    return (
                      <button
                        key={oIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(currentQ.id, opt)}
                        className={"text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition flex items-start gap-3 cursor-pointer " + (
                          isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : isWrong
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                            : isSelected
                            ? 'bg-sky-500/20 border-sky-400 text-white'
                            : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                        )}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="p-4 bg-slate-900 border border-slate-700/60 rounded-xl space-y-2 mt-4">
                    <div className="text-xs font-bold text-emerald-400">Correct Answer: {currentQ.answer}</div>
                    <div className="text-xs text-slate-300">{currentQ.explanation}</div>
                    {currentQ.explanationBn && (
                      <div className="text-xs text-sky-300 font-sans border-t border-slate-800 pt-2">
                        <strong>বাংলা ব্যাখ্যা:</strong> {currentQ.explanationBn}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(prev => prev - 1)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold text-slate-300 rounded-xl transition cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button
                    disabled={currentQIndex === questions.length - 1}
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-30 text-xs font-bold text-white rounded-xl transition cursor-pointer"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: LIVE GROUP BY SANDBOX */}
        {activeSection === 'sandbox' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-sky-400">
                <Terminal size={22} />
                <h3 className="text-lg font-bold text-white">Live SQL GROUP BY & Aggregate Simulator</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Observe live summary computations per academic stream:
              </p>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                <div className="text-sky-400 font-bold mb-2">SELECT Stream, COUNT(*), AVG(TotalMarks), MAX(TotalMarks), MIN(TotalMarks) FROM Student GROUP BY Stream;</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-900 rounded-lg border border-sky-500/30">
                    <span className="text-sky-300 font-bold">Science Stream:</span>
                    <div className="text-slate-300 mt-1">Count: 2 | Avg: 90.25 | Max: 92.50 | Min: 88.00</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/30">
                    <span className="text-emerald-300 font-bold">Commerce Stream:</span>
                    <div className="text-slate-300 mt-1">Count: 2 | Avg: 93.00 | Max: 95.00 | Min: 91.00</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-amber-500/30">
                    <span className="text-amber-300 font-bold">Humanities Stream:</span>
                    <div className="text-slate-300 mt-1">Count: 1 | Avg: 78.50 | Max: 78.50 | Min: 78.50</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: SUBJECTIVE BOARD DRILLS */}
        {activeSection === 'subjective' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">CBSE Class XII IT (802) Subjective Drills</h3>
              <div className="space-y-4 text-xs sm:text-sm">
                
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400">Q1. Write a query to display the Department and the highest salary in each department.</h4>
                  <div className="p-3 bg-slate-950 rounded-lg text-sky-300 font-mono text-xs">
                    SELECT Department, MAX(BasicSalary) <br />
                    FROM Employee <br />
                    GROUP BY Department;
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400">Q2. Write a query to display the Job title and total salary of employees where total salary is greater than 100,000.</h4>
                  <div className="p-3 bg-slate-950 rounded-lg text-sky-300 font-mono text-xs">
                    SELECT Job, SUM(Salary) <br />
                    FROM Employee <br />
                    GROUP BY Job <br />
                    HAVING SUM(Salary) &gt; 100000;
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400">Q3. Differentiate between COUNT(*) and COUNT(column_name).</h4>
                  <p className="text-slate-300">
                    <code>COUNT(*)</code> returns the total number of row tuples in a table, including rows where some or all columns contain NULL. In contrast, <code>COUNT(column_name)</code> returns only the count of rows where that specific column contains a non-null value.
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: FAQS */}
        {activeSection === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) Module 004 Practice FAQs" questions={questions} />
          </div>
        )}

        {/* SECTION 5: PRINTABLE NOTES */}
        {activeSection === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Module 004 Comprehensive Revision Sheet"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Master Notes"
              downloadFileName="topic9_module004_exam_practice_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Score at least 25/30 on this simulator to ensure complete readiness for CBSE Board examination SQL aggregation questions! — Sukanta Hui" />

      </div>
    </div>
  );
}
