import React, { useState } from 'react';
import {
  Award, CheckCircle2, XCircle, Clock, AlertTriangle,
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw,
  Sparkles, ChevronRight, ChevronLeft, Binary, Calculator
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
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002.001 · Topic 10 / 10
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Interactive Examination Simulator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Practice your Skill: 30-Question Board Benchmark Assessment
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your comprehensive mastery of Number Systems, Base Conversions (Binary, Octal, Decimal, Hexadecimal, Fractional conversions), and Binary Arithmetic with this authentic 30-mark examination simulator.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'mcq', label: '1. 30 MCQs Exam Simulator', icon: Award },
            { id: 'subjective', label: '2. High-Yield Subjective Drills', icon: BookOpen },
            { id: 'faqs', label: '3. Practice FAQs', icon: HelpCircle },
            { id: 'notes', label: '4. Printable Solutions', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 border-b-2 border-indigo-400'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
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
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-2xl p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/40">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Examination Benchmark Result</h3>
                <div className="text-3xl font-extrabold text-indigo-300 font-mono">
                  {score} / {questions.length} Marks ({percentage}%)
                </div>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {percentage >= 90
                    ? "🌟 Outstanding! You have achieved complete mastery of Number Systems and Base Conversions."
                    : percentage >= 75
                    ? "✓ Great job! Review the step-by-step explanations for any missed questions below."
                    : "⚠ Keep practicing! Re-read the revision notes and re-attempt the quiz to build confidence."}
                </p>
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Retake 30-Mark Test
                </button>
              </div>
            )}

            {/* Question Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold rounded-lg border border-indigo-500/20">
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
                        className={`w-7 h-7 text-[11px] font-mono rounded-lg transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-indigo-600 text-white font-bold'
                            : isAnswered
                            ? 'bg-slate-800 text-indigo-300 border border-indigo-500/30'
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

                  let optionStyle = "bg-slate-900/80 border-slate-800 hover:border-indigo-500/50 text-slate-300";
                  if (submitted) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "bg-rose-950/40 border-rose-500/50 text-rose-300";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-indigo-600/20 border-indigo-500 text-indigo-200 font-semibold";
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
                  <div className="text-indigo-400 font-bold uppercase tracking-wider">Detailed Technical Explanation:</div>
                  <p className="text-slate-300">{currentQ.explanation}</p>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => prev - 1)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-850 hover:bg-slate-800 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer border border-slate-800"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                {!submitted ? (
                  currentQIndex === questions.length - 1 ? (
                    <button
                      onClick={() => setSubmitted(true)}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                    >
                      Submit 30-Mark Examination
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  )
                ) : (
                  currentQIndex < questions.length - 1 && (
                    <button
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                    >
                      Next Question
                      <ChevronRight size={16} />
                    </button>
                  )
                )}
              </div>
            </div>

            <Teacher
              topicName="30-Question Assessment & Practice Simulator"
              subject="CBSE Class 11 Computer Science (083)"
            />
          </div>
        )}

        {/* SECTION 2: SUBJECTIVE DRILLS */}
        {activeSection === 'subjective' && (
          <div className="space-y-4">
            {[
              {
                q: "Q1. Convert decimal number (254.375)₁₀ into Binary, Octal, and Hexadecimal.",
                ans: "1. Integer Part (254)₁₀:\n   • Binary: 128+64+32+16+8+4+2 = (11111110)₂\n   • Octal: 254 / 8 = 31 R 6; 31 / 8 = 3 R 7; 3 / 8 = 0 R 3 => (376)₈\n   • Hex: 254 / 16 = 15 R 14 ('E'); 15 / 16 = 0 R 15 ('F') => (FE)₁₆\n\n2. Fractional Part (0.375)₁₀:\n   • Binary: 0.375 × 2 = 0.75 (0); 0.75 × 2 = 1.5 (1); 0.5 × 2 = 1.0 (1) => (.011)₂\n   • Octal: 0.375 × 8 = 3.00 => (.3)₈\n   • Hex: 0.375 × 16 = 6.00 => (.6)₁₆\n\nFinal Results:\nBinary: (11111110.011)₂\nOctal: (376.3)₈\nHexadecimal: (FE.6)₁₆"
              },
              {
                q: "Q2. Convert (ABC.D8)₁₆ to Octal without calculating the intermediate decimal value.",
                ans: "Step 1: Expand Hexadecimal characters into 4-bit nibbles:\n   A=1010, B=1011, C=1100, . , D=1101, 8=1000\n   Binary = 1010 1011 1100 . 1101 1000₂\n\nStep 2: Regroup into 3-bit triplets:\n   Integer: 101 010 111 100\n   Fraction: 110 110 000 (padded with zero at far right)\n\nStep 3: Replace triplets with Octal digits:\n   101→5, 010→2, 111→7, 100→4 . 110→6, 110→6, 000→0\n   Final Answer: (5274.66)₈"
              },
              {
                q: "Q3. Add binary numbers (111011)₂ and (101110)₂. Verify your result in decimal.",
                ans: "Binary Column Addition:\n  Carries:  1 1 1 1 1 0\n            1 1 1 0 1 1  (= 59₁₀)\n          + 1 0 1 1 1 0  (= 46₁₀)\n          -------------\n          1 1 0 1 0 0 1  (= 105₁₀)\n\nDecimal Verification:\n59 + 46 = 105₁₀.\n(1101001)₂ = 64 + 32 + 8 + 1 = 105₁₀ (Verified!)."
              }
            ].map((item, idx) => (
              <details key={idx} className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-5 open:bg-slate-900/80 transition">
                <summary className="font-bold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="text-indigo-400 text-xs font-mono group-open:rotate-90 transition-transform">▸ Solution</span>
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
            <FAQTemplate questions={questions.slice(0, 10)} />
          </div>
        )}

        {/* SECTION 4: PRINTABLE NOTES */}
        {activeSection === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              fileName="topic10_practice_exam_drills.txt"
            />
          </div>
        )}

      </div>
    </div>
  );
}
