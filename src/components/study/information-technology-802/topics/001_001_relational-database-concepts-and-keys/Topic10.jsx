import React, { useState } from 'react';
import { 
  Award, CheckCircle2, XCircle, Clock, AlertTriangle, 
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw, Sparkles, ChevronRight, ChevronLeft 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

export default function Topic10() {
  const [activeSection, setActiveSection] = useState('mcq');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId, option) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: option
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQIndex(0);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const currentQ = questions[currentQIndex];
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 10
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Interactive Examination Simulator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Practice your Skill here: 30-Question Board Exam Challenge
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your mastery of Module 001 with this authentic 30-mark interactive assessment aligned with CBSE Class XII IT (802) board standards.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'mcq', label: '1. 30 MCQs Exam Simulator', icon: Award },
            { id: 'subjective', label: '2. High-Yield Subjective Drills', icon: BookOpen },
            { id: 'faqs', label: '3. Practice FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '4. Printable Document', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                }`}
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
            
            {/* Score Banner when Submitted */}
            {submitted && (
              <div className="bg-gradient-to-r from-slate-900 to-sky-950/60 border border-sky-500/30 rounded-2xl p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto border border-sky-500/40">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Examination Benchmark Result</h3>
                <div className="text-3xl font-extrabold text-sky-300 font-mono">
                  {score} / {questions.length} Marks ({percentage}%)
                </div>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {percentage >= 90
                    ? "🌟 Outstanding! You have achieved complete mastery of Module 001."
                    : percentage >= 75
                    ? "✓ Great job! Review the explanations for any missed questions below."
                    : "⚠ Keep practicing! Re-read the revision notes and re-attempt the quiz."}
                </p>
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition"
                >
                  Retake 30-Mark Test
                </button>
              </div>
            )}

            {/* Question Card */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-sky-500/10 text-sky-400 text-xs font-mono font-bold rounded-lg border border-sky-500/20">
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                  <span className="text-xs text-slate-400">1 Mark</span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1">
                  {questions.map((q, idx) => {
                    const isAnswered = !!selectedAnswers[q.id];
                    const isCurrent = currentQIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQIndex(idx)}
                        className={`w-7 h-7 text-[11px] font-mono rounded-lg transition-all ${
                          isCurrent
                            ? 'bg-sky-500 text-white font-bold'
                            : isAnswered
                            ? 'bg-slate-800 text-sky-300 border border-sky-500/30'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === opt;
                  const isCorrect = opt === currentQ.answer;
                  
                  let optionStyle = "bg-slate-900 border-slate-800 hover:border-sky-500/50 text-slate-300";
                  if (submitted) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "bg-rose-950/40 border-rose-500/50 text-rose-300";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-sky-500/20 border-sky-500 text-sky-200 font-semibold";
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(currentQ.id, opt)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between gap-3 transition-all cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && isCorrect && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
                      {submitted && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {submitted && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs leading-relaxed">
                  <div className="text-sky-400 font-bold uppercase tracking-wider">Detailed Technical Explanation:</div>
                  <p className="text-slate-300">{currentQ.explanation}</p>
                  {currentQ.explanationBn && (
                    <p className="text-emerald-300 pt-1 border-t border-slate-800/80">
                      🇧🇩 বাংলা: {currentQ.explanationBn}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => prev - 1)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-xl transition"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                {!submitted ? (
                  currentQIndex === questions.length - 1 ? (
                    <button
                      onClick={() => setSubmitted(true)}
                      className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition"
                    >
                      Submit 30-Mark Examination
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  )
                ) : (
                  currentQIndex < questions.length - 1 && (
                    <button
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition"
                    >
                      Next Question
                      <ChevronRight size={16} />
                    </button>
                  )
                )}
              </div>
            </div>

            <Teacher note="Completing 30 timed questions builds speed and precision. In the actual CBSE board exam, you have only 20 minutes for Section A objective questions. Practice until you achieve 30/30! — Sukanta Hui" />
          </div>
        )}

        {/* SECTION 2: SUBJECTIVE DRILLS */}
        {activeSection === 'subjective' && (
          <div className="space-y-4">
            {[
              {
                q: "Q1. A table 'LIBRARY' has 7 columns and 30 rows. After deleting 5 rows and adding 2 columns, calculate the new Degree and Cardinality.",
                ans: "New Degree = Initial Degree + Added - Dropped = 7 + 2 = 9.\nNew Cardinality = Initial Cardinality + Inserted - Deleted = 30 - 5 = 25.\nFinal Answer: Degree = 9, Cardinality = 25."
              },
              {
                q: "Q2. Explain why the SQL expression 'WHERE Salary = NULL' returns 0 rows, and provide the correct query.",
                ans: "Under SQL Three-Valued Logic (3VL), comparing any value with NULL using '=' yields UNKNOWN. Since WHERE requires TRUE to return rows, 0 rows are returned.\nCorrect Query: SELECT * FROM Employee WHERE Salary IS NULL;"
              },
              {
                q: "Q3. Define Foreign Key and describe the effect of 'ON DELETE CASCADE'.",
                ans: "A Foreign Key is an attribute in a child table whose values match the Primary Key of a parent table. 'ON DELETE CASCADE' ensures that when a parent row is deleted, all corresponding child rows referencing that parent key are automatically deleted to maintain referential integrity."
              }
            ].map((item, idx) => (
              <details key={idx} className="group bg-slate-800/40 border border-slate-800 rounded-2xl p-5 open:bg-slate-800/60 transition">
                <summary className="font-bold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="text-sky-400 text-xs font-mono group-open:rotate-90 transition-transform">▸ Solution</span>
                </summary>
                <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-line bg-slate-950 p-4 rounded-xl">
                  {item.ans}
                </div>
              </details>
            ))}
          </div>
        )}

        {/* SECTION 3: FAQS */}
        {activeSection === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 10 · Practice & Board Examination FAQs"
              questions={questions}
            />
          </div>
        )}

        {/* SECTION 4: PRINTABLE NOTES */}
        {activeSection === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic10_practice_exam_drills.txt"
              title="CBSE Class XII IT 802 – Topic 10 Practice Drills Handbook"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
