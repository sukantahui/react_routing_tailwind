import React, { useState } from 'react';
import {
  Award, CheckCircle2, XCircle, Clock, AlertTriangle,
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw,
  Sparkles, ChevronRight, ChevronLeft
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
              Test your mastery of Module 001 (Basic Computer Organisation, CPU Architecture &amp; Memory Units) with this authentic 30-mark interactive assessment aligned with CBSE Class XI Computer Science (083) board standards.
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
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
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
                        className={`w-7 h-7 text-[11px] font-mono rounded-lg transition-all cursor-pointer ${
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
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                {!submitted ? (
                  currentQIndex === questions.length - 1 ? (
                    <button
                      onClick={() => setSubmitted(true)}
                      className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                    >
                      Submit 30-Mark Examination
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  )
                ) : (
                  currentQIndex < questions.length - 1 && (
                    <button
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                    >
                      Next Question
                      <ChevronRight size={16} />
                    </button>
                  )
                )}
              </div>
            </div>

            <Teacher note="Completing all 30 questions under timed conditions prepares you for Section A of the CBSE Class XI Computer Science (083) theory paper. Aim for 100% accuracy! — Sukanta Hui" />
          </div>
        )}

        {/* SECTION 2: SUBJECTIVE DRILLS */}
        {activeSection === 'subjective' && (
          <div className="space-y-4">
            {[
              {
                q: "Q1. An address bus has 36 address lines. Calculate the maximum directly addressable physical memory in Gigabytes.",
                ans: "Formula: Capacity = 2^N Bytes (where N is the number of address lines).\nCapacity = 2^36 Bytes = 2^6 × 2^30 Bytes = 64 × 1 GB = 64 Gigabytes (GB).\nFinal Answer: 64 GB."
              },
              {
                q: "Q2. Calculate the average rotational latency and total access time for a 7200 RPM hard disk drive having an average seek time of 8.5 ms and transfer time of 0.5 ms.",
                ans: "1. Rotational Latency (ms) = (30,000 / RPM) = 30,000 / 7200 = 4.167 ms ≈ 4.17 ms.\n2. Total Access Time = Seek Time + Rotational Latency + Transfer Time\n   = 8.5 ms + 4.17 ms + 0.5 ms = 13.17 milliseconds.\nFinal Answer: Rotational Latency = 4.17 ms, Total Access Time = 13.17 ms."
              },
              {
                q: "Q3. Differentiate between OMR, OCR, and MICR input devices with one specific practical application of each.",
                ans: "• OMR (Optical Mark Reader): Senses the presence or absence of pencil/ink marks on pre-printed forms. Application: Evaluating CBSE multiple-choice answer sheets.\n• OCR (Optical Character Recognition): Scans printed/handwritten text and translates image bitmaps into editable ASCII/Unicode digital text. Application: Scanning books and passport reading at airports.\n• MICR (Magnetic Ink Character Recognition): Reads characters printed in magnetized iron oxide ink. Application: Fast, fraud-resistant bank cheque clearance."
              },
              {
                q: "Q4. Explain why SSDs are immune to fragmentation slowdowns whereas mechanical HDDs degrade severely when files are fragmented.",
                ans: "In mechanical HDDs, file fragments scattered across non-contiguous tracks require the physical actuator arm to repeatedly perform mechanical seek movements and wait for platter rotations, creating severe millisecond latency delays.\nIn SSDs, access is purely electronic solid-state addressing with zero moving parts; reading fragmented flash blocks takes the exact same microsecond latency (~0.02 ms) as reading contiguous blocks."
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
              title="Topic 10 · Practice &amp; Board Examination FAQs"
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
              title="CBSE Class XI CS 083 – Topic 10 Practice Drills Handbook"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
