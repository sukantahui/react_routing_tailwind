import React, { useState } from 'react';
import { 
  Award, CheckCircle2, XCircle, Clock, AlertTriangle, 
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw, Sparkles, ChevronRight, ChevronLeft, Layers, Terminal, Play 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

export default function Topic14() {
  const [activeSection, setActiveSection] = useState('mcq');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Live Pattern Matching Sandbox State
  const [testPattern, setTestPattern] = useState('%Kumar%');
  const sampleData = [
    { roll: 101, name: 'Amit Kumar Sharma', city: 'Barrackpore', marks: 92 },
    { roll: 102, name: 'Susmita Roy', city: 'Shyamnagar', marks: 88 },
    { roll: 103, name: 'Debangshu Pal', city: 'Kolkata', marks: 95 },
    { roll: 104, name: 'Mamata Sharma', city: 'Barrackpore', marks: 91 },
    { roll: 105, name: 'Ajoy Kumar Sen', city: 'Naihati', marks: 78 }
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

  const matchPattern = (text, pat) => {
    try {
      const regexStr = '^' + pat.replace(/%/g, '.*').replace(/_/g, '.') + '$';
      const re = new RegExp(regexStr, 'i');
      return re.test(text);
    } catch {
      return false;
    }
  };

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 003 · Topic 14
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Interactive DML Examination Simulator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Practice your Skill here: 35-Question DML & Pattern Matching Challenge
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your mastery of Module 003 with this authentic 35-mark interactive assessment covering INSERT, UPDATE percentage calculations, DELETE WHERE, LIKE pattern matching, and ORDER BY.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'mcq', label: '1. 35 MCQs Exam Simulator', icon: Award },
            { id: 'sandbox', label: '2. Live LIKE Pattern Sandbox', icon: Terminal },
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

        {/* SECTION 1: 35 MCQ SIMULATOR */}
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
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg transition"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow-lg transition"
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
                    Accuracy: <span className="font-bold text-sky-300">{percentage}%</span> · {percentage >= 75 ? "🎉 Superb! Mastered SQL DML & Filtering." : "Keep revising the DML notes & operators below!"}
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
                        className={"text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition flex items-start gap-3 " + (
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
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold text-slate-300 rounded-xl transition"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button
                    disabled={currentQIndex === questions.length - 1}
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-30 text-xs font-bold text-white rounded-xl transition"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: LIVE PATTERN MATCHING SANDBOX */}
        {activeSection === 'sandbox' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-sky-400">
                <Terminal size={22} />
                <h3 className="text-lg font-bold text-white">Live SQL LIKE Pattern Matching Simulator</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Type any wildcard pattern using <code className="text-amber-300 font-mono">%</code> (any characters) and <code className="text-emerald-300 font-mono">_</code> (single character) to see instant matching records in real time:
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 font-mono">
                  <span className="absolute left-3 top-3 text-xs text-sky-400 font-bold">SELECT * FROM Student WHERE FullName LIKE</span>
                  <input 
                    type="text" 
                    value={testPattern} 
                    onChange={(e) => setTestPattern(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pt-8 pb-3 px-3 text-sm text-amber-300 font-bold focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {['%Kumar%', 'A%', '%a', '_u%', 'S%'].map(pat => (
                    <button
                      key={pat}
                      onClick={() => setTestPattern(pat)}
                      className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white rounded-lg cursor-pointer"
                    >
                      '{pat}'
                    </button>
                  ))}
                </div>
              </div>

              {/* Matching Table */}
              <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800 p-3">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-sky-400">
                      <th className="p-2">RollNo</th>
                      <th className="p-2">FullName</th>
                      <th className="p-2">City</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    {sampleData.map((s) => {
                      const isMatched = matchPattern(s.name, testPattern);
                      return (
                        <tr key={s.roll} className={isMatched ? 'bg-emerald-500/10 text-emerald-300' : 'opacity-40'}>
                          <td className="p-2 font-bold">{s.roll}</td>
                          <td className="p-2 font-bold">{s.name}</td>
                          <td className="p-2">{s.city}</td>
                          <td className="p-2">
                            {isMatched ? (
                              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">
                                MATCHED
                              </span>
                            ) : (
                              <span className="text-slate-600 text-[10px]">No match</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
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
              <h3 className="text-lg font-bold text-white">CBSE Class XII IT (802) High-Yield Subjective Drills</h3>
              <div className="space-y-4 text-xs sm:text-sm">
                
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400">Q1. Write a query to increase the BasicSalary of all employees in 'IT' Department by 15%.</h4>
                  <div className="p-3 bg-slate-950 rounded-lg text-sky-300 font-mono text-xs">
                    UPDATE Employee <br />
                    SET BasicSalary = BasicSalary * 1.15 <br />
                    WHERE Department = 'IT';
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400">Q2. Write a query to list all students whose name contains 'Sharma' and who have scored more than 85 marks.</h4>
                  <div className="p-3 bg-slate-950 rounded-lg text-sky-300 font-mono text-xs">
                    SELECT * FROM Student <br />
                    WHERE FullName LIKE '%Sharma%' AND Marks &gt; 85;
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400">Q3. Why does 'WHERE Commission = NULL' return zero rows in SQL?</h4>
                  <p className="text-slate-300">
                    Because NULL represents an unknown value. Under SQL Three-Valued Logic (3VL), comparing anything with NULL using '=' evaluates to <strong>UNKNOWN</strong> (not TRUE). In a WHERE clause, only expressions evaluating strictly to TRUE are returned. The correct syntax is <code className="text-emerald-300 font-mono">WHERE Commission IS NULL</code>.
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: FAQS */}
        {activeSection === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) Module 003 Practice FAQs" questions={questions} />
          </div>
        )}

        {/* SECTION 5: PRINTABLE NOTES */}
        {activeSection === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Module 003 Comprehensive Revision Sheet"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download DML Master Notes"
              downloadFileName="topic14_module003_exam_practice_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="In board exams, double-check string quotes in INSERT and LIKE clauses ('%Kumar%'), arithmetic percentages (* 1.25), and always write IS NULL instead of = NULL! — Sukanta Hui" />

      </div>
    </div>
  );
}
