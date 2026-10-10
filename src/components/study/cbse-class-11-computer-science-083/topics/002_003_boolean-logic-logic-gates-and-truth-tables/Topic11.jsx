import React, { useState } from 'react';
import {
  Award, CheckCircle2, XCircle, Clock, AlertTriangle,
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw,
  Sparkles, ChevronRight, ChevronLeft, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

export default function Topic11() {
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
                Module 002 · Topic 11
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Interactive Examination Simulator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Practice your Skill here: 30-Question Board Exam Challenge
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your complete mastery of Boolean Logic, Logic Gates, Truth Tables, Universal Realizations, Boolean Postulates, and De Morgan&apos;s Laws with this 30-mark interactive board exam simulator aligned with CBSE Class XI Computer Science (083) standards.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'mcq', label: '1. 30 MCQs Exam Simulator', icon: Award },
            { id: 'subjective', label: '2. High-Yield Subjective Drills', icon: BookOpen },
            { id: 'faqs', label: '3. Practice FAQs (30 Qs)', icon: HelpCircle },
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
            {/* Score & Progress Ribbon */}
            <div className="bg-slate-800/60 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg">
                  {currentQIndex + 1}
                </div>
                <div>
                  <div className="text-xs text-slate-400">Current Question</div>
                  <div className="text-sm font-bold text-white">
                    Question {currentQIndex + 1} of {questions.length}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-slate-400">Attempted</div>
                  <div className="text-sm font-bold text-amber-400">
                    {Object.keys(selectedAnswers).length} / {questions.length}
                  </div>
                </div>

                {submitted && (
                  <div>
                    <div className="text-xs text-slate-400">Final Score</div>
                    <div className="text-sm font-extrabold text-emerald-400">
                      {score} / {questions.length} ({percentage}%)
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {!submitted ? (
                  <button
                    onClick={() => setSubmitted(true)}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer"
                  >
                    Submit Exam
                  </button>
                ) : (
                  <button
                    onClick={handleResetQuiz}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
                  >
                    <RefreshCw size={14} /> Retake Test
                  </button>
                )}
              </div>
            </div>

            {/* Question Quick Jump Grid */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="text-xs font-semibold text-slate-400">Question Palette:</div>
              <div className="flex flex-wrap gap-1.5">
                {questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = currentQIndex === idx;
                  let bgClass = "bg-slate-900 text-slate-400 border-slate-800";
                  if (isCurrent) bgClass = "ring-2 ring-sky-500 bg-sky-500/20 text-white font-bold border-sky-400";
                  else if (submitted) {
                    bgClass = selectedAnswers[q.id] === q.answer
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold"
                      : "bg-rose-500/20 text-rose-400 border-rose-500/40";
                  } else if (isAnswered) {
                    bgClass = "bg-sky-500/10 text-sky-300 border-sky-500/30";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono border transition flex items-center justify-center cursor-pointer ${bgClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Card */}
            {currentQ && (
              <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                      Question #{currentQ.id} · 1 Mark
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      {currentQ.question}
                    </h2>
                  </div>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQ.id] === option;
                    const isCorrect = option === currentQ.answer;

                    let btnStyle = "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900";
                    if (isSelected) {
                      btnStyle = "bg-sky-500/10 border-sky-500 text-white shadow-md";
                    }
                    if (submitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQ.id, option)}
                        disabled={submitted}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-bold font-mono text-slate-400 shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="text-xs sm:text-sm font-medium">{option}</span>
                        </div>
                        {submitted && isCorrect && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
                        {submitted && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Explanation (Show if submitted or checked) */}
                {submitted && (
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-400" />
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Detailed Solution &amp; Insight</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {currentQ.explanation}
                    </p>
                    {currentQ.explanationBn && (
                      <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2 font-sans italic">
                        বাংলা ব্যাখ্যা: {currentQ.explanationBn}
                      </p>
                    )}
                  </div>
                )}

                {/* Pagination Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 transition cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>

                  <button
                    onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    disabled={currentQIndex === questions.length - 1}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow transition cursor-pointer"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: SUBJECTIVE DRILLS */}
        {activeSection === 'subjective' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    High-Yield Subjective Board Questions &amp; Marking Schemes
                  </h2>
                  <p className="text-xs text-slate-400">
                    2-mark and 3-mark analytical, proof, and circuit drawing problems.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Q1 */}
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Question 1 · Algebraic Proof</span>
                    <span className="text-xs font-mono text-amber-400 font-bold">2 Marks</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Prove algebraically: A + A&apos;B = A + B</h3>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <div>LHS = A + A&apos;B</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;= (A + A&apos;)(A + B) &nbsp;&nbsp;&nbsp;&nbsp;[Distributive Law: X + YZ = (X+Y)(X+Z)]</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;= (1) · (A + B) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Complement Law: A + A&apos; = 1]</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;= A + B &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Identity Law: 1 · X = X]</div>
                    <div className="text-emerald-400 font-bold">&nbsp;&nbsp;&nbsp;&nbsp;= RHS (Hence Proved)</div>
                  </div>
                </div>

                {/* Q2 */}
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Question 2 · Universal Realization</span>
                    <span className="text-xs font-mono text-amber-400 font-bold">3 Marks</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    Why are NAND and NOR called Universal Gates? Realize an OR gate using only NAND gates with an algebraic proof.
                  </h3>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <p>
                      <strong>Definition (1M):</strong> They can synthesize any Boolean function or primary gate (NOT, AND, OR) without needing any other gate type.
                    </p>
                    <p className="font-mono text-sky-300">
                      <strong>Realization (2M):</strong> Invert A &rarr; (A·A)&apos; = A&apos;; Invert B &rarr; (B·B)&apos; = B&apos;; Feed into 3rd NAND &rarr; Y = (A&apos; · B&apos;)&apos; = (A&apos;)&apos; + (B&apos;)&apos; = A + B (By De Morgan&apos;s Law).
                    </p>
                  </div>
                </div>

                {/* Q3 */}
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Question 3 · Duality</span>
                    <span className="text-xs font-mono text-amber-400 font-bold">2 Marks</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Write the duals of: (a) A + B&apos;C + 0, (b) (X+Y)(X&apos;+Z) = XZ + X&apos;Y</h3>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <div>(a) Dual = A · (B&apos; + C) · 1 = A(B&apos; + C)</div>
                    <div>(b) Dual = (X · Y) + (X&apos; · Z) = (X + Z) · (X&apos; + Y)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: PRACTICE FAQS */}
        {activeSection === 'faqs' && (
          <FAQTemplate
            title="CBSE Class XI Computer Science (083) – Board Examination Practice FAQs"
            questions={questions}
          />
        )}

        {/* SECTION 4: PRINTABLE DOCUMENT */}
        {activeSection === 'notes' && (
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XI CS 083 – 30-Mark Practice Exam & Subjective Solutions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Practice Solutions Document"
            downloadFileName="topic11_practice_drills.txt"
          />
        )}

        {/* Teacher Note */}
        <Teacher
          note="Excellent work! Completing Module 002 (Boolean Logic, Postulates, Logic Gates & Circuit Design) builds a solid foundation for your CBSE Class XI Computer Science (083) curriculum. Review your mistakes in the 30-MCQ challenge, memorize the universal gate counts (1-2-3-4-5), and keep practicing circuit drawing with pencil and ruler! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
